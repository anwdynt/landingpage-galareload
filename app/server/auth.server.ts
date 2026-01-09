import { prisma } from "~/server/db.server";
import bcrypt from 'bcryptjs';

export async function login({ email, password }: { email: string; password: string }) {
    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) return null;

    const isCorrectPassword = await bcrypt.compare(password, user.password);

    if (!isCorrectPassword) return null;

    if (!user.isActive) {
        throw new Error("Akun Anda telah dinonaktifkan. Silakan hubungi admin.");
    }

    return { id: user.id, email: user.email, name: user.name, role: user.role };
}

export async function getUserById(userId: number) {
    return prisma.user.findUnique({
        where: { id: userId }
    });
}
