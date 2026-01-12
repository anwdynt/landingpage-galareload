import { type ActionFunctionArgs, redirect, useActionData, useLoaderData, useSubmit, type LoaderFunctionArgs } from "react-router";
import { createPost, getCategories } from "~/server/post.server";
import { parseEditorJson } from "~/lib/editor.server";
import { uploadImage } from "~/server/upload.server";
import { PermissionGuard } from "~/components/rbac/permission-guard";
import { toast } from "sonner";
import { useEffect, useCallback, useState } from "react";
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

    // Handle File Upload
    const featuredImageFile = formData.get("featuredImageFile");
    let imageUrl = payload.featuredImage;

    if (featuredImageFile && (featuredImageFile as File).size > 0) {
        const uploadedPath = await uploadImage(featuredImageFile as File);
        if (uploadedPath) {
            imageUrl = uploadedPath;
        }
    }

    try {
        const parsedContent = parseEditorJson(payload.content);

        const post = await createPost({
            title: payload.title,
            slug: payload.slug,
            content: parsedContent,
            content_raw: payload.content,
            status: payload.status,
            authorId: Number(userId),
            categoryIds: payload.categoryIds,
            meta: payload.meta,
            excerpt: payload.excerpt,
            image: imageUrl
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

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    // Reset state on mount for new post
    useEffect(() => {
        dispatch(setTitle(''));
        dispatch(setSlug(''));
        dispatch(setContent({}));
        dispatch(resetPostSettings());
        setSelectedFile(null);
    }, [dispatch]);

    // Handle Save
    const handleSave = useCallback((status: string) => {
        dispatch(setSaving(true));

        const payload = {
            title,
            slug: slug || slugify(title),
            content,
            status: status,
            categoryIds: settings.categoryIds,
            meta: settings.meta,
            excerpt: settings.excerpt,
            featuredImage: settings.featuredImage // This might be a URL string if not changed
        };

        const formData = new FormData();
        formData.append("payload", JSON.stringify(payload));

        if (selectedFile) {
            formData.append("featuredImageFile", selectedFile);
        }

        // Submit as FormData (encType multipart/form-data inferred by browser)
        submit(formData, { method: "post", encType: "multipart/form-data" });

    }, [title, slug, content, settings, selectedFile, submit, dispatch]);

    // Autosave Logic (Debounced)
    useEffect(() => {
        const timer = setTimeout(() => {
            if (title && content) {
                dispatch(setLastAutosave(new Date().toLocaleTimeString()));
            }
        }, 5000);

        return () => clearTimeout(timer);
    }, [title, content, dispatch]);

    useEffect(() => {
        if (actionData?.success && actionData?.postId) {
            toast.success("Post saved successfully!");
            dispatch(setSaving(false));
            window.location.href = `/admin/posts/${actionData.postId}`;
        } else if (actionData?.error) {
            toast.error(actionData.error);
            dispatch(setSaving(false));
        }
    }, [actionData, dispatch]);

    return (
        <EditorLayout
            sidebar={
                <PostSettingsSidebar
                    categories={categories}
                    onFileSelect={(file) => setSelectedFile(file)}
                />
            }
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
