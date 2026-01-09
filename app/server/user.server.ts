import { prisma } from "~/server/db.server";
import bcrypt from "bcryptjs";

export async function createUser(data: any) {
    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [
                { email: data.email },
                { username: data.username }
            ]
        }
    });

    if (existingUser) {
        throw new Error("Email or Username already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    return prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
            data: {
                name: data.name,
                username: data.username,
                email: data.email,
                password: hashedPassword,
                role: "USER", // Default legacy role
                isActive: true,
            }
        });

        if (data.roles && data.roles.length > 0) {
            const roles = await tx.role.findMany({
                where: { slug: { in: data.roles } }
            });

            if (roles.length > 0) {
                await tx.userRole.createMany({
                    data: roles.map(role => ({
                        userId: user.id,
                        roleId: role.id
                    }))
                });
            }
        }

        return user;
    });
}

export async function getUsers() {
    return prisma.user.findMany({
        include: {
            userRoles: {
                include: { role: true }
            }
        },
        orderBy: { createdAt: 'desc' }
    });
}

export async function updateUserRoles(userId: number, roleSlugs: string[]) {
    // 1. Find Roles by slugs
    const roles = await prisma.role.findMany({
        where: { slug: { in: roleSlugs } }
    });

    // 2. Transaction to wipe old roles and add new ones (simplified strategy)
    // Or we could do diffing. Wipe and Re-add is easier for this level of complexity.

    return prisma.$transaction(async (tx) => {
        // Remove all existing roles
        await tx.userRole.deleteMany({
            where: { userId }
        });

        // Add new roles
        if (roles.length > 0) {
            await tx.userRole.createMany({
                data: roles.map(role => ({
                    userId,
                    roleId: role.id
                }))
            });
        }

        return getUsers(); // Return fresh list or just success
    });
}

export async function getUser(userId: number) {
    return prisma.user.findUnique({
        where: { id: userId },
        include: {
            userRoles: {
                include: { role: true }
            }
        }
    });
}

export async function toggleUserStatus(userId: number, isActive: boolean) {
    return prisma.user.update({
        where: { id: userId },
        data: { isActive }
    });
}
