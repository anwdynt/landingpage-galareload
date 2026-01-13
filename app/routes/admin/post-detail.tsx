import { type LoaderFunctionArgs, type ActionFunctionArgs, redirect, useActionData, useLoaderData, useSubmit } from "react-router";
import { getPost, updatePost, getCategories } from "~/server/post.server";
import { parseEditorJson } from "~/lib/editor.server";
import { uploadImage } from "~/server/upload.server";
import { PermissionGuard } from "~/components/rbac/permission-guard";
import { toast } from "sonner";
import { useEffect, useCallback, useState, useRef } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setTitle, setSlug, setContent } from '~/store/slices/editorSlice';
import { setStatus, setPostSettings, setMeta } from '~/store/slices/postSettingsSlice';
import { setSaving } from '~/store/slices/uiSlice';
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

        await updatePost(id, {
            title: payload.title,
            slug: payload.slug,
            content: parsedContent,
            content_raw: payload.content,
            status: payload.status,
            categoryIds: payload.categoryIds,
            meta: payload.meta,
            excerpt: payload.excerpt,
            image: imageUrl,
            publishedAt: payload.publishedAt
        });
        return { success: true };
    } catch (e: unknown) {
        const errorMessage = e instanceof Error ? e.message : "Unknown error occurred";
        return { error: errorMessage };
    }
}

function EditEditorWrapper() {
    const { post, categories } = useLoaderData<typeof loader>();
    const actionData = useActionData<typeof action>();
    const dispatch = useDispatch();
    const submit = useSubmit();

    const { title, slug, content } = useSelector((state: RootState) => state.editor);
    const settings = useSelector((state: RootState) => state.postSettings);

    const [selectedFile, setSelectedFile] = useState<File | null>(null);

    const editorRef = useRef<import("~/components/editor/editor-block").EditorBlockHandle>(null);

    // Initialize Redux state with post data
    useEffect(() => {
        if (post) {
            dispatch(setTitle(post.title));
            dispatch(setSlug(post.slug));
            // Ensure content_raw is passed as object/array, not string if using Prisma JSON
            dispatch(setContent((post.content_raw as Record<string, unknown>) || {}));

            dispatch(setStatus(post.status as "DRAFT" | "PUBLISHED" | "PENDING" | "PRIVATE" | "TRASH"));

            // Explicitly verify image is not null
            const initialImage = post.image && post.image.trim() !== '' ? post.image : null;

            dispatch(setPostSettings({
                categoryIds: post.categories.map(c => c.categoryId),
                excerpt: post.excerpt || '',
                featuredImage: initialImage,
                publishedAt: post.publishedAt ? new Date(post.publishedAt).toISOString() : null
            }));

            // Meta
            const metaTitle = post.meta.find(m => m.key === 'title')?.value || '';
            const metaDesc = post.meta.find(m => m.key === 'description')?.value || '';
            dispatch(setMeta({ title: metaTitle, description: metaDesc }));
        }
    }, [post, dispatch]);

    const handleSave = useCallback(async (status: string) => {
        dispatch(setSaving(true));

        // Force save to get latest data
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let currentContent: any = content;
        if (editorRef.current) {
            currentContent = await editorRef.current.save();
        }

        const payload = {
            title,
            slug: slug || slugify(title),
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            content: currentContent as any, // EditorJS JSON
            status: status,
            categoryIds: settings.categoryIds,
            meta: settings.meta,
            excerpt: settings.excerpt,
            featuredImage: settings.featuredImage,
            publishedAt: settings.publishedAt
        };

        const formData = new FormData();
        formData.append("payload", JSON.stringify(payload));

        if (selectedFile) {
            formData.append("featuredImageFile", selectedFile);
        }

        submit(formData, { method: "post", encType: "multipart/form-data" });
    }, [title, slug, content, settings, selectedFile, submit, dispatch]);

    useEffect(() => {
        if (actionData?.success) {
            toast.success("Post updated successfully!");
            dispatch(setSaving(false));
            // Clear selected file after successful save
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setSelectedFile(null);
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
                    }}
                />
            }
        >
            <div className="min-h-[500px]">
                <ClientOnly fallback={<div>Loading Editor...</div>}>
                    {() => {
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        const content = post?.content_raw as any;
                        return <EditorBlock ref={editorRef} initialData={content} />;
                    }}
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
