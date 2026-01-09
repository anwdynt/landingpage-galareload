import { type LoaderFunctionArgs, type ActionFunctionArgs } from "react-router";
import { useLoaderData, Link, useFetcher } from "react-router";
import { getPosts, deletePost } from "~/server/post.server";
import { requireUserId } from "~/server/session.server";
import { PermissionGuard } from "~/components/rbac/permission-guard";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "~/components/ui/dialog";
import { Plus, Pencil, Eye, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export async function loader({ request }: LoaderFunctionArgs) {
    await requireUserId(request, "/admin-panel");
    const posts = await getPosts();
    return { posts };
}

export async function action({ request }: ActionFunctionArgs) {
    await requireUserId(request, "/admin-panel");
    const formData = await request.formData();
    const intent = formData.get("intent");
    const id = formData.get("id");

    if (intent === "delete" && id) {
        try {
            await deletePost(Number(id));
            return { success: true, message: "Post deleted successfully" };
        } catch (error) {
            return { error: "Failed to delete post" };
        }
    }
    return null;
}

export default function PostListPage() {
    const { posts } = useLoaderData<typeof loader>();
    const fetcher = useFetcher();
    const [deleteId, setDeleteId] = useState<number | null>(null);

    useEffect(() => {
        if (fetcher.data?.success) {
            toast.success(fetcher.data.message);
            setDeleteId(null);
        } else if (fetcher.data?.error) {
            toast.error(fetcher.data.error);
        }
    }, [fetcher.data]);

    const handleDelete = () => {
        if (deleteId) {
            fetcher.submit({ intent: "delete", id: deleteId }, { method: "post" });
        }
    };

    return (
        <PermissionGuard require="view_posts" fallback={<div>Access Denied</div>}>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold font-metropolis">Artikel Blog</h1>
                        <p className="text-neutral-500">Kelola semua artikel blog Anda dari sini.</p>
                    </div>
                    <Button asChild className="gap-2">
                        <Link to="/admin/posts/new">
                            <Plus size={16} /> Tambah Artikel
                        </Link>
                    </Button>
                </div>

                <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-neutral-50 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-neutral-900 dark:text-white">Judul</th>
                                <th className="px-6 py-4 font-semibold text-neutral-900 dark:text-white">Status</th>
                                <th className="px-6 py-4 font-semibold text-neutral-900 dark:text-white">Penulis</th>
                                <th className="px-6 py-4 font-semibold text-neutral-900 dark:text-white">Tanggal</th>
                                <th className="px-6 py-4 font-semibold text-neutral-900 dark:text-white text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                            {posts.map((post) => (
                                <tr key={post.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-neutral-900 dark:text-white">
                                        {post.title}
                                        <div className="text-xs text-neutral-500 font-normal mt-0.5 max-w-xs truncate">
                                            {post.slug}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${post.status === 'PUBLISHED' ? 'bg-green-100 text-green-800' :
                                            post.status === 'DRAFT' ? 'bg-gray-100 text-gray-800' :
                                                'bg-yellow-100 text-yellow-800'
                                            }`}>
                                            {post.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-neutral-500">{post.author?.name || 'Unknown'}</td>
                                    <td className="px-6 py-4 text-neutral-500">
                                        {new Date(post.createdAt).toLocaleDateString("id-ID")}
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <Button variant="ghost" size="icon" asChild>
                                            <a href={`/blog/${post.slug}`} target="_blank" rel="noreferrer">
                                                <Eye size={16} className="text-neutral-500" />
                                            </a>
                                        </Button>
                                        <Button variant="ghost" size="icon" asChild>
                                            <Link to={`/admin/posts/${post.id}`}>
                                                <Pencil size={16} className="text-blue-500" />
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => setDeleteId(post.id)}>
                                            <Trash2 size={16} className="text-red-500" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Hapus Artikel?</DialogTitle>
                            <DialogDescription>
                                Apakah Anda yakin ingin menghapus artikel ini? Tindakan ini tidak dapat dibatalkan.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setDeleteId(null)}>Batal</Button>
                            <Button variant="destructive" onClick={handleDelete} disabled={fetcher.state !== "idle"}>
                                {fetcher.state !== "idle" ? "Menghapus..." : "Hapus"}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </PermissionGuard>
    );
}
