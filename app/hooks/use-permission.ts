import { useRouteLoaderData } from "react-router";
import type { loader } from "~/routes/admin/layout";

export function usePermission() {
    const data = useRouteLoaderData<typeof loader>("routes/admin/layout");

    // Default to empty if data not loaded (e.g. outside admin layout)
    const permissions = data?.permissions || [];
    const roles = data?.roles || [];

    const can = (permission: string) => {
        // Super Admin Bypass via Role if needed, but ideally we rely on the permission list
        if (roles.includes("super_admin")) return true;
        return permissions.includes(permission);
    };

    const hasRole = (role: string) => {
        return roles.includes(role);
    };

    return { can, hasRole, user: data?.user };
}
