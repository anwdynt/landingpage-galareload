import { type LoaderFunctionArgs, type ActionFunctionArgs, Link, useLoaderData, useFetcher } from "react-router";
import type { User } from '~/types/user';
import { getUsers, toggleUserStatus } from "~/server/user.server";
import { PermissionGuard } from "~/components/rbac/permission-guard";
import { Button } from "~/components/ui/button";
import { Badge } from "~/components/ui/badge";
import { Pencil, Plus, UserX, UserCheck } from "lucide-react";
import { requireUserId } from "~/server/session.server";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "~/components/ui/dialog";

export async function loader({ request }: LoaderFunctionArgs) {
    await requireUserId(request, "/admin-panel");
    const users = await getUsers();
    return { users };
}

export async function action({ request }: ActionFunctionArgs) {
    await requireUserId(request, "/admin-panel");
    const formData = await request.formData();
    const intent = formData.get("intent");
    const id = formData.get("id");

    try {
        if (intent === "toggle-status") {
            const isActive = formData.get("isActive") === "true";
            await toggleUserStatus(Number(id), isActive);
            return { success: true, message: isActive ? "User activated" : "User deactivated" };
        }
    } catch (e: any) {
        return { error: e.message };
    }
    return null;
}

// In component
export default function Users() {
    const { users } = useLoaderData<typeof loader>();
    const fetcher = useFetcher();

    // Dialog State
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    useEffect(() => {
        if (fetcher.state === "idle" && fetcher.data && (fetcher.data as any).success) {
            setConfirmOpen(false);
            toast.success((fetcher.data as any).message);
        } else if (fetcher.state === "idle" && fetcher.data && (fetcher.data as any).error) {
            toast.error((fetcher.data as any).error);
        }
    }, [fetcher.state, fetcher.data]);

    const initiateToggle = (user: User) => {
        setSelectedUser(user);
        setConfirmOpen(true);
    };

    const handleConfirmToggle = () => {
        if (!selectedUser) return;

        fetcher.submit(
            {
                intent: "toggle-status",
                id: selectedUser.id.toString(),
                isActive: (!selectedUser.isActive).toString()
            },
            { method: "post" }
        );
    };

    return (
        <PermissionGuard require="view_users" fallback={<div className="p-4">Access Denied</div>}>
            <div className="p-6 space-y-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">Users</h1>
                        <p className="text-neutral-500">Manage system users and access</p>
                    </div>
                    <Link to="/admin/users/new">
                        <Button className="gap-2">
                            <Plus size={16} />
                            Add User
                        </Button>
                    </Link>
                </div>

                <div className="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
                    <table className="w-full text-left">
                        <thead className="bg-neutral-50 dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800">
                            <tr>
                                <th className="p-4 font-medium text-neutral-500">Name</th>
                                <th className="p-4 font-medium text-neutral-500">Email</th>
                                <th className="p-4 font-medium text-neutral-500">Roles</th>
                                <th className="p-4 font-medium text-neutral-500 text-center">Status</th>
                                <th className="p-4 font-medium text-neutral-500 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-200 dark:divide-neutral-800 bg-white dark:bg-neutral-900">
                            {users.map((user: User) => (
                                <tr key={user.id} className="hover:bg-neutral-50 dark:hover:bg-neutral-800/50 transition">
                                    <td className="p-4 font-medium">
                                        {user.name}
                                        <div className="text-xs text-neutral-400 font-normal">@{user.username}</div>
                                    </td>
                                    <td className="p-4 text-neutral-500">{user.email}</td>
                                    <td className="p-4">
                                        <div className="flex gap-1 flex-wrap">
                                            {user.userRoles.map((ur) => (
                                                <Badge key={ur.role.slug} variant="secondary" className="text-xs">
                                                    {ur.role.name}
                                                </Badge>
                                            ))}
                                        </div>
                                    </td>
                                    <td className="p-4 text-center">
                                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${user.isActive
                                            ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
                                            : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                                            }`}>
                                            {user.isActive ? 'Active' : 'Inactive'}
                                        </span>
                                    </td>
                                    <td className="p-4 text-right space-x-2">
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            onClick={() => initiateToggle(user)}
                                            title={user.isActive ? "Deactivate User" : "Activate User"}
                                        >
                                            {user.isActive ? (
                                                <UserX size={16} className="text-red-500" />
                                            ) : (
                                                <UserCheck size={16} className="text-green-500" />
                                            )}
                                        </Button>

                                        <Link to={`/admin/users/${user.id}`}>
                                            <Button size="icon" variant="ghost">
                                                <Pencil size={16} className="text-blue-500" />
                                            </Button>
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Confirmation Dialog */}
                <Dialog open={confirmOpen} onOpenChange={setConfirmOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {selectedUser?.isActive ? "Nonaktifkan Pengguna?" : "Aktifkan Pengguna?"}
                            </DialogTitle>
                            <DialogDescription>
                                {selectedUser?.isActive
                                    ? `Apakah Anda yakin ingin menonaktifkan user ${selectedUser?.name}? Mereka tidak akan bisa login lagi.`
                                    : `Apakah Anda yakin ingin mengaktifkan kembali user ${selectedUser?.name}?`
                                }
                            </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                            <Button variant="outline" onClick={() => setConfirmOpen(false)}>Batal</Button>
                            <Button
                                variant={selectedUser?.isActive ? "destructive" : "default"}
                                onClick={handleConfirmToggle}
                                disabled={fetcher.state !== "idle"}
                            >
                                {fetcher.state !== "idle" ? "Memproses..." : (selectedUser?.isActive ? "Nonaktifkan" : "Aktifkan")}
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>
        </PermissionGuard>
    );
}
