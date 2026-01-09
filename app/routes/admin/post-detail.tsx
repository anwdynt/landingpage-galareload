import { type LoaderFunctionArgs, type ActionFunctionArgs, redirect, useActionData, useLoaderData, useSubmit } from "react-router";
import { getPost, updatePost, getCategories } from "~/server/post.server";
import { PermissionGuard } from "~/components/rbac/permission-guard";
import { toast } from "sonner";
import { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setTitle, setSlug, setContent } from '~/store/slices/editorSlice';
import { setStatus, setPostSettings, setMeta, setFeaturedImage } from '~/store/slices/postSettingsSlice';
import { setSaving, setLastAutosave } from '~/store/slices/uiSlice';
import type { RootState } from '~/store';
import EditorBlock from "~/components/editor/editor-block";
import EditorLayout from "~/components/editor/editor-layout";
import PostSettingsSidebar from "~/components/editor/post-settings-sidebar";
import { ClientOnly } from "remix-utils/client-only";
import { slugify } from "~/lib/utils";
import { requireUserId } from "~/server/session.server";

export async function loader({ params, request }: LoaderFunctionArgs) {
    await requireUserId(request, "/admin-panel");
    const id = Number(params.id);
    const post = await getPost(id);
    const categories = await getCategories();

    if (!post) {
        throw redirect("/admin/posts");
    }

    return { post, categories };
}

export async function action({ request, params }: ActionFunctionArgs) {
    await requireUserId(request, "/admin-panel");
    const id = Number(params.id);
    const formData = await request.formData();
    const payloadString = formData.get("payload") as string;

    if (!payloadString) return { error: "No data submitted" };

    const payload = JSON.parse(payloadString);

    try {
        await updatePost(id, {
            title: payload.title,
            slug: payload.slug,
            content: "Block content - check raw",
            content_raw: payload.content,
            status: payload.status,
            categoryIds: payload.categoryIds,
            meta: payload.meta,
            excerpt: payload.excerpt,
            image: payload.featuredImage
        });
        return { success: true };
    } catch (e: any) {
        return { error: e.message };
    }
}

function EditEditorWrapper() {
    const { post, categories } = useLoaderData<typeof loader>();
    const actionData = useActionData<typeof action>();
    const dispatch = useDispatch();
    const submit = useSubmit();

    const { title, slug, content } = useSelector((state: RootState) => state.editor);
    const settings = useSelector((state: RootState) => state.postSettings);

    // Initialize Redux state with post data
    useEffect(() => {
        if (post) {
            dispatch(setTitle(post.title));
            dispatch(setSlug(post.slug));
            // Ensure content_raw is passed as object/array, not string if using Prisma JSON
            dispatch(setContent(post.content_raw || {}));

            dispatch(setStatus(post.status as any));
            dispatch(setPostSettings({
                categoryIds: post.categories.map(c => c.categoryId),
                excerpt: post.excerpt || '',
                featuredImage: post.image || null
            }));

            // Meta
            const metaTitle = post.meta.find(m => m.key === 'title')?.value || '';
            const metaDesc = post.meta.find(m => m.key === 'description')?.value || '';
            dispatch(setMeta({ title: metaTitle, description: metaDesc }));
        }
    }, [post, dispatch]);

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

        submit(
            { payload: JSON.stringify(payload) },
            { method: "post" }
        );
    }, [title, slug, content, settings, submit, dispatch]);

    useEffect(() => {
        if (actionData?.success) {
            toast.success("Post updated successfully!");
            dispatch(setSaving(false));
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
                        // Only auto-update slug if user hasn't manually edited it? 
                        // For now, mirroring create behavior: update slug on title change if desired, 
                        // BUT for edit, usually we don't want to change slug automatically to preserve SEO.
                        // So let's NOT dispatch setSlug here unless we want that behavior.
                        // Actually, let's leave slug distinct.
                    }}
                />
            }
        >
            <div className="min-h-[500px]">
                <ClientOnly fallback={<div>Loading Editor...</div>}>
                    {() => <EditorBlock initialData={post?.content_raw} />}
                </ClientOnly>
            </div>
        </EditorLayout>
    );
}

export default function EditPostPage() {
    return (
        <PermissionGuard require="edit_posts" fallback={<div>Access Denied</div>}>
            <EditEditorWrapper />
        </PermissionGuard>
    );
}
