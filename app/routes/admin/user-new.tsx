import { type ActionFunctionArgs, redirect, Form, useActionData, useLoaderData } from "react-router";
import { createUser } from "~/server/user.server";
import { getAllRoles } from "~/server/rbac.server";
import { PermissionGuard } from "~/components/rbac/permission-guard";
import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { toast } from "sonner";
import { useEffect } from "react";

export async function loader() {
    // We only need roles for the dropdown/checkboxes
    const roles = await getAllRoles();
    return { roles };
}

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData();
    const name = formData.get("name");
    const username = formData.get("username");
    const email = formData.get("email");
    const password = formData.get("password");
    const roles = formData.getAll("roles");

    try {
        await createUser({
            name,
            username,
            email,
            password,
            roles
        });
        return { success: true };
    } catch (e: any) {
        return { error: e.message };
    }
}

export default function NewUserPage() {
    const { roles } = useLoaderData<typeof loader>();
    const actionData = useActionData<typeof action>();

    useEffect(() => {
        if (actionData?.success) {
            toast.success("User created successfully");
            // Optional: redirect or clear form. 
            // For now, let's redirect to list
            window.location.href = "/admin/users";
        } else if (actionData?.error) {
            toast.error(actionData.error);
        }
    }, [actionData]);

    return (
        <PermissionGuard require="create_users" fallback={<div className="p-4">Access Denied</div>}>
            <div className="max-w-2xl mx-auto p-6 bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-800">
                <h1 className="text-2xl font-bold mb-6">Create New User</h1>

                <Form method="post" className="space-y-6">
                    <div className="space-y-4">
                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="name">Full Name</Label>
                            <Input type="text" id="name" name="name" placeholder="John Doe" required />
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="username">Username</Label>
                            <Input type="text" id="username" name="username" placeholder="johndoe" required />
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="email">Email</Label>
                            <Input type="email" id="email" name="email" placeholder="john@example.com" required />
                        </div>

                        <div className="grid w-full items-center gap-1.5">
                            <Label htmlFor="password">Password</Label>
                            <Input type="password" id="password" name="password" required />
                        </div>

                        <div className="space-y-2">
                            <Label>Roles</Label>
                            <div className="grid grid-cols-2 gap-2 p-4 border rounded-md">
                                {roles.map(role => (
                                    <div key={role.slug} className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            id={role.slug}
                                            name="roles"
                                            value={role.slug}
                                            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <Label htmlFor={role.slug} className="cursor-pointer font-normal">
                                            {role.name}
                                        </Label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-end gap-2">
                        <Button type="button" variant="outline" onClick={() => window.history.back()}>
                            Cancel
                        </Button>
                        <Button type="submit">
                            Create User
                        </Button>
                    </div>
                </Form>
            </div>
        </PermissionGuard>
    );
}
