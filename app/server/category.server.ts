import { prisma } from "~/server/db.server";
import { type Category } from "../../generated/prisma/client";
import { slugify } from "~/lib/utils";

export type CreateCategoryDTO = {
    name: string;
    slug?: string;
    description?: string;
};

export type UpdateCategoryDTO = Partial<CreateCategoryDTO>;

// --- Read ---

export async function getCategories() {
    return prisma.category.findMany({
        orderBy: { name: 'asc' },
        include: {
            _count: {
                select: { posts: true }
            }
        }
    });
}

export async function getCategory(id: number) {
    return prisma.category.findUnique({
        where: { id }
    });
}

// --- Create ---

async function ensureUniqueSlug(slug: string, tx: any) {
    let uniqueSlug = slug;
    let counter = 1;
    while (await tx.category.findUnique({ where: { slug: uniqueSlug } })) {
        uniqueSlug = `${slug}-${counter}`;
        counter++;
    }
    return uniqueSlug;
}

export async function createCategory(data: CreateCategoryDTO) {
    const baseSlug = data.slug || slugify(data.name);

    return prisma.$transaction(async (tx) => {
        const uniqueSlug = await ensureUniqueSlug(baseSlug, tx);
        return tx.category.create({
            data: {
                name: data.name,
                slug: uniqueSlug,
                description: data.description
            }
        });
    });
}

// --- Update ---

export async function updateCategory(id: number, data: UpdateCategoryDTO) {
    return prisma.$transaction(async (tx) => {
        let uniqueSlug = undefined;

        if (data.slug || data.name) {
            const baseSlug = data.slug || (data.name ? slugify(data.name) : undefined);
            if (baseSlug) {
                // Check if slug acts differently or is same
                const current = await tx.category.findUnique({ where: { id } });
                if (current && current.slug !== baseSlug) {
                    uniqueSlug = await ensureUniqueSlug(baseSlug, tx);
                } else {
                    uniqueSlug = baseSlug;
                }
            }
        }

        return tx.category.update({
            where: { id },
            data: {
                name: data.name,
                slug: uniqueSlug,
                description: data.description
            }
        });
    });
}

// --- Delete ---

export async function deleteCategory(id: number) {
    // Optional: Check if used by posts? Prisma typically handles this via relations tables.
    // Logic: If we delete a category, PostCategory records are deleted (cascade), ensuring referential integrity.
    return prisma.category.delete({
        where: { id }
    });
}
