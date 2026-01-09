import { prisma } from "~/server/db.server";
import { getUserById } from "./auth.server";

export async function getUserPermissions(userId: number) {
    // 1. Get User with Roles
    const user = await prisma.user.findUnique({
        where: { id: userId },
        include: {
            userRoles: {
                include: {
                    role: {
                        include: {
                            rolePermissions: {
                                include: {
                                    permission: true
                                }
                            }
                        }
                    }
                }
            },
            userPermissions: {
                include: {
                    permission: true
                }
            }
        }
    });

    if (!user) return [];

    // 2. Collect Permissions from Roles
    const permissions = new Set<string>();

    // From Roles
    for (const userRole of user.userRoles) {
        for (const rolePerm of userRole.role.rolePermissions) {
            permissions.add(rolePerm.permission.slug);
        }
        // Also add the role itself as a "capability" if needed, usually mostly relying on permissions
        // But sometimes we check hasRole
    }

    // From Direct User Permissions (Override)
    for (const userPerm of user.userPermissions) {
        permissions.add(userPerm.permission.slug);
    }

    return Array.from(permissions);
}

export async function getUserRoles(userId: number) {
    const userRoleRelations = await prisma.userRole.findMany({
        where: { userId },
        include: { role: true }
    });
    return userRoleRelations.map(ur => ur.role.slug);
}

export async function userCan(userId: number, permissionSlug: string): Promise<boolean> {
    const permissions = await getUserPermissions(userId);

    // Super Admin Bypass
    const roles = await getUserRoles(userId);
    if (roles.includes('super_admin')) return true;

    return permissions.includes(permissionSlug);
}

export async function hasRole(userId: number, roleSlug: string): Promise<boolean> {
    const roles = await getUserRoles(userId);
    return roles.includes(roleSlug);
}

export async function getAllRoles() {
    return prisma.role.findMany({
        orderBy: { name: 'asc' }
    });
}
