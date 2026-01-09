import { type LoaderFunctionArgs, type ActionFunctionArgs } from "react-router";
import { useLoaderData, useFetcher, Form } from "react-router";
import { getCategories, createCategory, updateCategory, deleteCategory } from "~/server/category.server";
import { requireUserId } from "~/server/session.server";
import { PermissionGuard } from "~/components/rbac/permission-guard";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogFooter
} from "~/components/ui/dialog"; // Assuming you have these or will create generic replacements if missing
import { Pencil, Trash2, Plus, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";

export async function loader({ request }: LoaderFunctionArgs) {
    await requireUserId(request, "/admin-panel");
    const categories = await getCategories();
    return { categories };
}

export async function action({ request }: ActionFunctionArgs) {
    await requireUserId(request, "/admin-panel");
    const formData = await request.formData();
    const intent = formData.get("intent");
    const id = formData.get("id");

    try {
        if (intent === "create") {
            const name = formData.get("name") as string;
            const slug = formData.get("slug") as string;
            const description = formData.get("description") as string;

            await createCategory({ name, slug, description });
            return { success: true, message: "Category created" };
        }

        if (intent === "update") {
            if (!id) throw new Error("ID required");
            const name = formData.get("name") as string;
            const slug = formData.get("slug") as string;
            const description = formData.get("description") as string;

            await updateCategory(Number(id), { name, slug, description });
            return { success: true, message: "Category updated" };
        }

        if (intent === "delete") {
            if (!id) throw new Error("ID required");
            await deleteCategory(Number(id));
            return { success: true, message: "Category deleted" };
        }
    } catch (e: any) {
        return { error: e.message };
    }

    return null;
}

export default function CategoriesPage() {
    const { categories } = useLoaderData<typeof loader>();
    const fetcher = useFetcher();

    // Dialog State
    const [isOpen, setIsOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<any>(null); // null = create mode
    const [deleteId, setDeleteId] = useState<number | null>(null); // State for delete dialog

    // Form State
    const [name, setName] = useState("");
    const [slug, setSlug] = useState("");
    const [description, setDescription] = useState("");

    // Reset form when dialog opens/closes
    useEffect(() => {
        if (isOpen) {
            if (editingCategory) {
                setName(editingCategory.name);
                setSlug(editingCategory.slug);
                setDescription(editingCategory.description || "");
            } else {
                setName("");
                setSlug("");
                setDescription("");
            }
        }
    }, [isOpen, editingCategory]);

    useEffect(() => {
        if (fetcher.data?.success) {
            setIsOpen(false);
            setEditingCategory(null);
            setDeleteId(null);
            toast.success(fetcher.data.message);
        } else if (fetcher.data?.error) {
            toast.error(fetcher.data.error);
        }
    }, [fetcher.data]);

    const handleEdit = (cat: any) => {
        setEditingCategory(cat);
        setIsOpen(true);
    };

    const handleDelete = () => {
        if (deleteId) {
            fetcher.submit({ intent: "delete", id: deleteId }, { method: "post" });
        }
    };

    return (
        <PermissionGuard require="manage_categories" fallback={<div>Access Denied</div>}>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold font-metropolis">Kategori Blog</h1>
                        <p className="text-neutral-500">Kelola kategori untuk pengelompokan artikel.</p>
                    </div>

                    <Dialog open={isOpen} onOpenChange={(open) => { setIsOpen(open); if (!open) setEditingCategory(null); }}>
                        <DialogTrigger asChild>
                            <Button className="gap-2">
                                <Plus size={16} /> Tambah Kategori
                            </Button>
                        </DialogTrigger>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>{editingCategory ? "Edit Kategori" : "Tambah Kategori Baru"}</DialogTitle>
                                <DialogDescription>
                                    Isi detail kategori di bawah ini. Slug akan digenerate otomatis jika kosong.
                                </DialogDescription>
                            </DialogHeader>

                            <fetcher.Form method="post" className="space-y-4">
                                <input type="hidden" name="intent" value={editingCategory ? "update" : "create"} />
                                {editingCategory && <input type="hidden" name="id" value={editingCategory.id} />}

                                <div className="space-y-2">
                                    <Label>Nama Kategori</Label>
                                    <Input
                                        name="name"
                                        placeholder="Mis: Tips Bisnis"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Slug (Opsional)</Label>
                                    <Input
                                        name="slug"
                                        placeholder="tips-bisnis"
                                        value={slug}
                                        onChange={(e) => setSlug(e.target.value)}
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label>Deskripsi</Label>
                                    <Textarea
                                        name="description"
                                        placeholder="Penjelasan singkat kategori..."
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />
                                </div>

                                <DialogFooter>
                                    <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>Batal</Button>
                                    <Button type="submit" disabled={fetcher.state !== "idle"}>
                                        {fetcher.state !== "idle" ? "Menyimpan..." : "Simpan"}
                                    </Button>
                                </DialogFooter>
                            </fetcher.Form>
                        </DialogContent>
                    </Dialog>
                </div>

                {/* List Categories */}
                <div className="bg-white dark:bg-neutral-900 rounded-xl border border-neutral-200 dark:border-neutral-800 overflow-hidden">
                    <table className="w-full text-left text-sm">
                        <thead className="bg-neutral-50 dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700">
                            <tr>
                                <th className="px-6 py-4 font-semibold text-neutral-900 dark:text-white">Nama</th>
                                <th className="px-6 py-4 font-semibold text-neutral-900 dark:text-white">Slug</th>
                                <th className="px-6 py-4 font-semibold text-neutral-900 dark:text-white">Jumlah Post</th>
                                <th className="px-6 py-4 font-semibold text-neutral-900 dark:text-white text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800">
                            {categories.map((cat: any) => (
                                <tr key={cat.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition-colors">
                                    <td className="px-6 py-4 font-medium text-neutral-900 dark:text-white">
                                        {cat.name}
                                        {cat.description && <div className="text-xs text-neutral-500 font-normal mt-0.5">{cat.description}</div>}
                                    </td>
                                    <td className="px-6 py-4 text-neutral-500 font-mono text-xs">{cat.slug}</td>
                                    <td className="px-6 py-4 text-neutral-500">
                                        <span className="bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded text-xs font-medium">
                                            {cat._count.posts} Artikel
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-2">
                                        <Button variant="ghost" size="icon" onClick={() => handleEdit(cat)}>
                                            <Pencil size={16} className="text-blue-500" />
                                        </Button>
                                        <Button variant="ghost" size="icon" onClick={() => setDeleteId(cat.id)}>
                                            <Trash2 size={16} className="text-red-500" />
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                            {categories.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-neutral-500">
                                        Belum ada kategori. Silakan buat baru.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Delete Confirmation Dialog */}
                <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Hapus Kategori?</DialogTitle>
                            <DialogDescription>
                                Apakah Anda yakin ingin menghapus kategori ini?
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
