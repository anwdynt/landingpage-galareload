import { usePermission } from "~/hooks/use-permission";
import type { ReactNode } from "react";

interface PermissionGuardProps {
    require: string;
    children: ReactNode;
    fallback?: ReactNode;
}

export function PermissionGuard({ require, children, fallback = null }: PermissionGuardProps) {
    const { can } = usePermission();

    if (!can(require)) {
        return <>{fallback}</>;
    }

    return <>{children}</>;
}
