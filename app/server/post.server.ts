import { prisma } from "~/server/db.server";
import { type PostStatus, type Prisma } from "../../generated/prisma/client";

export type CreatePostDTO = {
    title: string;
    slug: string;
    content?: string;
    excerpt?: string;
    content_raw?: Record<string, unknown> | object; // JSON
    status: PostStatus;
    authorId: number;
    categoryIds?: number[];
    meta?: Record<string, string>;
    image?: string;
    publishedAt?: string | Date | null;
};

export async function getPosts(status?: string) {
    const where = status ? { status: status as PostStatus } : {};

    return prisma.post.findMany({
        where,
        include: {
            author: true,
            categories: { include: { category: true } },
            tags: { include: { tag: true } }
        },
        orderBy: { createdAt: 'desc' }
    });
}

export async function getPost(id: number) {
    return prisma.post.findUnique({
        where: { id },
        include: {
            categories: { include: { category: true } },
            meta: true
        }
    });
}


async function ensureUniqueSlug(slug: string, tx: Prisma.TransactionClient) {
    let uniqueSlug = slug;
    let counter = 1;
    while (await tx.post.findUnique({ where: { slug: uniqueSlug } })) {
        uniqueSlug = `${slug}-${counter}`;
        counter++;
    }
    return uniqueSlug;
}

export async function createPost(data: CreatePostDTO) {
    return prisma.$transaction(async (tx) => {
        const uniqueSlug = await ensureUniqueSlug(data.slug, tx);

        const post = await tx.post.create({
            data: {
                title: data.title,
                slug: uniqueSlug,
                content: data.content,
                excerpt: data.excerpt,
                content_raw: data.content_raw ?? undefined,
                image: data.image ?? undefined,
                status: data.status,
                authorId: data.authorId,
                publishedAt: data.publishedAt ? new Date(data.publishedAt) : (data.status === 'PUBLISHED' ? new Date() : null),
            }
        });

        // Add Categories
        if (data.categoryIds && data.categoryIds.length > 0) {
            await tx.postCategory.createMany({
                data: data.categoryIds.map(catId => ({
                    postId: post.id,
                    categoryId: catId
                }))
            });
        }

        // Add Meta
        if (data.meta) {
            await tx.postMeta.createMany({
                data: Object.entries(data.meta).map(([key, value]) => ({
                    postId: post.id,
                    key,
                    value
                }))
            });
        }

        return post;
    });
}

export async function updatePost(id: number, data: Partial<CreatePostDTO>) {
    return prisma.$transaction(async (tx) => {
        const post = await tx.post.update({
            where: { id },
            data: {
                title: data.title,
                slug: data.slug,
                content: data.content,
                excerpt: data.excerpt,
                content_raw: data.content_raw ?? undefined,
                image: data.image ?? undefined,
                status: data.status,
                // If publishedAt is provided, use it. Otherwise if switching to PUBLISHED, use NOW.
                publishedAt: data.publishedAt ? new Date(data.publishedAt) : ((data.status === 'PUBLISHED') ? new Date() : undefined),
            }
        });

        // Update Categories (Wipe and Re-add)
        if (data.categoryIds) {
            await tx.postCategory.deleteMany({ where: { postId: id } });
            if (data.categoryIds.length > 0) {
                await tx.postCategory.createMany({
                    data: data.categoryIds.map(catId => ({
                        postId: id,
                        categoryId: catId
                    }))
                });
            }
        }

        // Update Meta (Upsert logic or Wipe/Add)
        if (data.meta) {
            // Wipe and Add is safer for consistency if we send full meta object
            await tx.postMeta.deleteMany({ where: { postId: id } });
            await tx.postMeta.createMany({
                data: Object.entries(data.meta).map(([key, value]) => ({
                    postId: id,
                    key,
                    value
                }))
            });
        }

        return post;
    });
}

export async function getCategories() {
    return prisma.category.findMany({ orderBy: { name: 'asc' } });
}

export async function getPublishedPosts({
    page = 1,
    limit = 9,
    search = '',
    category = ''
}: {
    page?: number;
    limit?: number;
    search?: string;
    category?: string;
}) {
    const skip = (page - 1) * limit;

    const andFilters: Prisma.PostWhereInput[] = [];

    if (search) {
        andFilters.push({
            OR: [
                { title: { contains: search } },
                { excerpt: { contains: search } }
            ]
        });
    }

    if (category) {
        andFilters.push({
            categories: {
                some: {
                    category: {
                        name: category
                    }
                }
            }
        });
    }

    const where: Prisma.PostWhereInput = {
        status: 'PUBLISHED',
    };

    if (andFilters.length > 0) {
        where.AND = andFilters;
    }

    const [posts, total] = await prisma.$transaction([
        prisma.post.findMany({
            where,
            include: {
                author: true,
                categories: { include: { category: true } },
            },
            orderBy: { publishedAt: 'desc' },
            skip,
            take: limit
        }),
        prisma.post.count({ where })
    ]);

    return { posts, total, totalPages: Math.ceil(total / limit) };
}

export async function getPostBySlug(slug: string) {
    return prisma.post.findUnique({
        where: { slug },
        include: {
            author: true,
            categories: { include: { category: true } },
            meta: true
        }
    });
}

export async function deletePost(id: number) {
    return prisma.post.delete({
        where: { id }
    });
}
