export interface Category {
    id: number; // Prisma ID is Int
    name: string;
    slug: string;
    description?: string | null;
}

export interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt?: string | null;
    content?: string | null;
    /** content_raw is usually either a string or a JSON object depending on how it's typed in Prisma/App */
    content_raw?: any;
    image?: string | null;
    status: string;
    publishedAt?: string | Date | null;
    createdAt: string | Date;
    updatedAt: string | Date;
    author?: {
        name: string;
    } | null;
    categories: {
        category: Category;
    }[];
}
