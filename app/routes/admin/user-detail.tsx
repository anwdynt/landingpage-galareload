import { type LoaderFunctionArgs, type ActionFunctionArgs, redirect, Form, useLoaderData, useActionData } from "react-router";
import { getUser, updateUserRoles } from "~/server/user.server";
import { getAllRoles } from "~/server/rbac.server";
import { PermissionGuard } from "~/components/rbac/permission-guard";
import { Button } from "~/components/ui/button";
import { Label } from "~/components/ui/label";
import { toast } from "sonner";

export async function loader({ params }: LoaderFunctionArgs) {
    const userId = Number(params.id);
    const user = await getUser(userId);
    const roles = await getAllRoles();

    if (!user) {
        throw redirect("/admin/users");
    }

    return { user, roles };
}

export async function action({ request, params }: ActionFunctionArgs) {
    const userId = Number(params.id);
    const formData = await request.formData();

    // Get all checked roles
    // Since checkboxes with same name return array, but here we might just iterate
    // Or we name them "roles" and getAll
    const roleSlugs = formData.getAll("roles") as string[];

    await updateUserRoles(userId, roleSlugs);

    return { success: true };
}

export default function UserDetailPage() {
    const { user, roles } = useLoaderData<typeof loader>();
    const actionData = useActionData<typeof action>();

    // Current user roles as Set for easy lookup
    const userRoleSlugs = new Set(user.userRoles.map(ur => ur.role.slug));

    if (actionData?.success) {
        toast.success("User roles updated successfully");
    }

    return (
        <PermissionGuard require="manage_users" fallback={<div className="p-4">Access Denied</div>}>
            <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800">
                <h1 className="text-2xl font-bold mb-6">Edit User: {user.name}</h1>

                <div className="mb-6">
                    <p className="text-sm text-neutral-500">Email</p>
                    <p className="font-medium">{user.email}</p>
                </div>

                <Form method="post" className="space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold mb-3">Assign Roles</h3>
                        <div className="space-y-2">
                            {roles.map(role => (
                                <div key={role.slug} className="flex items-center space-x-2">
                                    <input
                                        type="checkbox"
                                        id={role.slug}
                                        name="roles"
                                        value={role.slug}
                                        defaultChecked={userRoleSlugs.has(role.slug)}
                                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                    />
                                    <Label htmlFor={role.slug} className="cursor-pointer">
                                        {role.name}
                                        <span className="ml-2 text-xs text-neutral-400 font-normal">
                                            ({role.description})
                                        </span>
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => window.history.back()}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            Save Changes
                        </Button>
                    </div>
                </Form>
            </div>
        </PermissionGuard>
    );
}
