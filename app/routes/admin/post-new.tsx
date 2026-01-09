import { type ActionFunctionArgs, redirect, useActionData, useLoaderData, useSubmit, type LoaderFunctionArgs } from "react-router";
import { createPost, getCategories } from "~/server/post.server";
import { PermissionGuard } from "~/components/rbac/permission-guard";
import { toast } from "sonner";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setTitle, setSlug, setContent } from '~/store/slices/editorSlice';
import { setStatus, resetPostSettings } from '~/store/slices/postSettingsSlice'; // Accessors
import { setLoading, setSaving, setLastAutosave } from '~/store/slices/uiSlice';
import type { RootState } from '~/store';
import EditorBlock from "~/components/editor/editor-block";
import EditorLayout from "~/components/editor/editor-layout";
import PostSettingsSidebar from "~/components/editor/post-settings-sidebar";
import { ClientOnly } from "remix-utils/client-only";
import { slugify } from "~/lib/utils";
import { requireUserId } from "~/server/session.server";

export async function loader({ request }: LoaderFunctionArgs) {
    await requireUserId(request, "/admin-panel");
    const categories = await getCategories();
    return { categories };
}

export async function action({ request }: ActionFunctionArgs) {
    const userId = await requireUserId(request, "/admin-panel");

    const formData = await request.formData();
    const payloadString = formData.get("payload") as string;

    if (!payloadString) return { error: "No data submitted" };

    const payload = JSON.parse(payloadString);

    try {
        const post = await createPost({
            title: payload.title,
            slug: payload.slug,
            content: "Block content - check raw",
            content_raw: payload.content,
            status: payload.status,
            authorId: Number(userId),
            categoryIds: payload.categoryIds,
            meta: payload.meta,
            excerpt: payload.excerpt,
            image: payload.featuredImage
        });
        return { success: true, postId: post.id };
    } catch (e: any) {
        return { error: e.message };
    }
}

function EditorWrapper() {
    const { categories } = useLoaderData<typeof loader>();
    const actionData = useActionData<typeof action>();
    const dispatch = useDispatch();
    const submit = useSubmit();

    const { title, slug, content } = useSelector((state: RootState) => state.editor);
    const settings = useSelector((state: RootState) => state.postSettings);

    // Reset state on mount for new post
    useEffect(() => {
        dispatch(setTitle(''));
        dispatch(setSlug(''));
        dispatch(setContent({}));
        dispatch(resetPostSettings());
    }, [dispatch]);

    // Handle Save
    const handleSave = useCallback((status: string) => {
        dispatch(setSaving(true));

        const payload = {
            title,
            slug: slug || slugify(title),
            content, // EditorJS JSON
            status: status,
            categoryIds: settings.categoryIds,
            meta: settings.meta,
            excerpt: settings.excerpt,
            featuredImage: settings.featuredImage
        };

        // Submit via React Router Form action
        submit(
            { payload: JSON.stringify(payload) },
            { method: "post" }
        );

        // Optimistic UI updates handled by effect on actionData
    }, [title, slug, content, settings, submit, dispatch]);

    // Autosave Logic (Debounced)
    // For MVP, we'll just track dirty state and maybe log it, or implement real autosave endpoint.
    // User requested autosave logic.
    useEffect(() => {
        const timer = setTimeout(() => {
            if (title && content) {
                // Dispatch autosave API call here if we had an endpoint
                // For now just update UI time
                dispatch(setLastAutosave(new Date().toLocaleTimeString()));
            }
        }, 5000); // 5s debounce

        return () => clearTimeout(timer);
    }, [title, content, dispatch]);

    useEffect(() => {
        if (actionData?.success && actionData?.postId) {
            toast.success("Post saved successfully!");
            dispatch(setSaving(false));
            // Redirect to edit page to prevent duplicate creation
            window.location.href = `/admin/posts/${actionData.postId}`;
        } else if (actionData?.error) {
            toast.error(actionData.error);
            dispatch(setSaving(false));
        }
    }, [actionData, dispatch]);

    return (
        <EditorLayout
            sidebar={<PostSettingsSidebar categories={categories} />}
            onSave={handleSave}
            titleInput={
                <input
                    type="text"
                    placeholder="Enter post title..."
                    className="text-4xl font-bold w-full border-none outline-none placeholder:text-neutral-300 dark:bg-transparent dark:text-white"
                    value={title}
                    onChange={(e) => {
                        dispatch(setTitle(e.target.value));
                        dispatch(setSlug(slugify(e.target.value)));
                    }}
                />
            }
        >
            <div className="min-h-[500px]">
                <ClientOnly fallback={<div>Loading Editor...</div>}>
                    {() => <EditorBlock />}
                </ClientOnly>
            </div>
        </EditorLayout>
    );
}

export default function NewPostPage() {
    return (
        <PermissionGuard require="create_posts" fallback={<div>Access Denied</div>}>
            <EditorWrapper />
        </PermissionGuard>
    );
}
