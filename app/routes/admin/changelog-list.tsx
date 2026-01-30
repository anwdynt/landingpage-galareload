import { type LoaderFunctionArgs, type ActionFunctionArgs } from "react-router";
import { useLoaderData, Link, useFetcher } from "react-router";
import { getAllChangelogs, deleteChangelog, togglePublishChangelog } from "~/server/changelog.server";
import { requireUserId } from "~/server/session.server";
import { PermissionGuard } from "~/components/rbac/permission-guard";
import { Button } from "~/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "~/components/ui/dialog";
import { Plus, Pencil, Trash2, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import { useEffect, useState } from "react";

export async function loader({ request }: LoaderFunctionArgs) {
    await requireUserId(request, "/admin-panel");

    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const limit = Number(url.searchParams.get('limit')) || 10;
    const search = url.searchParams.get('search') || '';
    const status = (url.searchParams.get('status') as 'all' | 'published' | 'draft' | 'upcoming') || 'all';

    const data = await getAllChangelogs(page, limit, search, status);
    return { ...data, search, status };
}

export async function action({ request }: ActionFunctionArgs) {
    await requireUserId(request, "/admin-panel");
    const formData = await request.formData();
    const intent = formData.get("intent");
    const id = formData.get("id");

    if (intent === "delete" && id) {
        try {
            await deleteChangelog(Number(id));
            return { success: true, message: "Changelog berhasil dihapus" };
        } catch {
            return { error: "Gagal menghapus changelog" };
        }
    }

    if (intent === "toggle-publish" && id) {
        try {
            await togglePublishChangelog(Number(id));
            return { success: true, message: "Status publish berhasil diubah" };
        } catch {
            return { error: "Gagal mengubah status publish" };
        }
    }

    return null;
}

export default function ChangelogListPage() {
    const loaderData = useLoaderData<typeof loader>();
    const { changelogs = [], totalCount = 0, page = 1, limit = 10, totalPages = 1, search = '', status = 'all' } = loaderData || {};
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

    const handleTogglePublish = (id: number) => {
        fetcher.submit({ intent: "toggle-publish", id }, { method: "post" });
    };

    const formatDate = (date: Date | null) => {
        if (!date) return '-';
        return new Date(date).toLocaleDateString('id-ID', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <PermissionGuard require="view_changelogs" fallback={<div>Access Denied</div>}>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold font-metropolis">Developer Notes</h1>
                        <p className="text-neutral-500">Kelola catatan pengembangan dan update versi dari sini.</p>
                    </div>
                    <PermissionGuard require="create_changelogs">
                        <Button asChild className="gap-2">
                            <Link to="/admin/changelog/new">
                                <Plus size={16} /> Tambah Version
                            </Link>
                        </Button>
                    </PermissionGuard>
                </div>

                {/* Filters */}
                <div className="flex gap-4 items-center">
                    {/* Search */}
                    <input
                        type="text"
                        placeholder="Cari version... (tekan Enter)"
                        defaultValue={search}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                const value = e.currentTarget.value;
                                const params = new URLSearchParams();
                                if (value) params.set('search', value);
                                if (status !== 'all') params.set('status', status);
                                params.set('page', '1');
                                params.set('limit', limit.toString());
                                window.location.href = `/admin/changelog?${params.toString()}`;
                            }
                        }}
                        className="flex-1 px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    />

                    {/* Status Filter */}
                    <select
                        value={status}
                        onChange={(e) => {
                            const params = new URLSearchParams();
                            if (search) params.set('search', search);
                            if (e.target.value !== 'all') params.set('status', e.target.value);
                            params.set('page', '1');
                            params.set('limit', limit.toString());
                            window.location.href = `/admin/changelog?${params.toString()}`;
                        }}
                        className="px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    >
                        <option value="all">Semua Status</option>
                        <option value="published">Published</option>
                        <option value="draft">Draft</option>
                        <option value="upcoming">Upcoming</option>
                    </select>
                </div>

                <div className="bg-white rounded-lg border border-neutral-200">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-neutral-50 border-b border-neutral-200">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                        Version
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                        Release Date
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                        Tag
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-neutral-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-neutral-200">
                                {changelogs.length === 0 ? (
                                    <tr>
                                        <td colSpan={5} className="px-6 py-12 text-center text-neutral-500">
                                            Belum ada catatan developer. Tambahkan versi pertama!
                                        </td>
                                    </tr>
                                ) : (
                                    changelogs.map((changelog) => (
                                        <tr key={changelog.id} className="hover:bg-neutral-50">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <div className="flex items-center gap-2">
                                                    <span className="font-mono font-semibold">v{changelog.version}</span>
                                                    {changelog.isUpcoming && (
                                                        <span className="px-2 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">
                                                            Upcoming
                                                        </span>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                                                {changelog.isUpcoming ? (
                                                    <span className="text-neutral-500 italic">{changelog.expectedDate || 'TBA'}</span>
                                                ) : (
                                                    formatDate(changelog.releaseDate)
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <button
                                                    onClick={() => handleTogglePublish(changelog.id)}
                                                    className={`flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full ${changelog.isPublished
                                                        ? 'bg-green-100 text-green-800'
                                                        : 'bg-neutral-100 text-neutral-800'
                                                        }`}
                                                >
                                                    {changelog.isPublished ? (
                                                        <>
                                                            <Eye size={12} /> Published
                                                        </>
                                                    ) : (
                                                        <>
                                                            <EyeOff size={12} /> Draft
                                                        </>
                                                    )}
                                                </button>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-neutral-700">
                                                {changelog.tag ? (
                                                    <span className="px-2 py-0.5 text-xs bg-neutral-900 text-white rounded-full">
                                                        {changelog.tag}
                                                    </span>
                                                ) : (
                                                    <span className="text-neutral-400">-</span>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                <div className="flex items-center justify-end gap-2">
                                                    <PermissionGuard require="edit_changelogs">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            asChild
                                                            className="h-8 w-8 p-0"
                                                        >
                                                            <Link to={`/admin/changelog/${changelog.id}`}>
                                                                <Pencil size={16} />
                                                            </Link>
                                                        </Button>
                                                    </PermissionGuard>
                                                    <PermissionGuard require="delete_changelogs">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => setDeleteId(changelog.id)}
                                                            className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50"
                                                        >
                                                            <Trash2 size={16} />
                                                        </Button>
                                                    </PermissionGuard>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="px-6 py-4 border-t border-neutral-200 flex items-center justify-between">
                            <div className="text-sm text-neutral-600">
                                Menampilkan {((page - 1) * limit) + 1} - {Math.min(page * limit, totalCount)} dari {totalCount} catatan
                            </div>
                            <div className="flex gap-2">
                                {page > 1 && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        asChild
                                    >
                                        <Link to={`/admin/changelog?page=${page - 1}&limit=${limit}${search ? `&search=${search}` : ''}${status !== 'all' ? `&status=${status}` : ''}`}>
                                            Previous
                                        </Link>
                                    </Button>
                                )}
                                <span className="px-4 py-2 text-sm">
                                    Page {page} of {totalPages}
                                </span>
                                {page < totalPages && (
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        asChild
                                    >
                                        <Link to={`/admin/changelog?page=${page + 1}&limit=${limit}${search ? `&search=${search}` : ''}${status !== 'all' ? `&status=${status}` : ''}`}>
                                            Next
                                        </Link>
                                    </Button>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Delete Dialog */}
                <Dialog open={deleteId !== null} onOpenChange={() => setDeleteId(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Hapus Catatan Developer?</DialogTitle>
                            <DialogDescription>
                                Apakah Anda yakin ingin menghapus catatan ini? Tindakan ini tidak dapat dibatalkan.
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setDeleteId(null)}>
                                Batal
                            </Button>
                            <Button variant="destructive" onClick={handleDelete}>
                                Hapus
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </PermissionGuard>
    );
}
