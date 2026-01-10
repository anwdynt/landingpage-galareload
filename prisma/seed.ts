import 'dotenv/config'; // Keep for safety if running standalone
import { prisma } from '../app/server/db.server';
import bcrypt from 'bcryptjs';
import { BLOG_POSTS } from '../app/data/blog-posts';

const ROLES = [
    { name: 'Super Admin', slug: 'super_admin', description: 'Access to all features.' },
    { name: 'Administrator', slug: 'administrator', description: 'Access to administration features.' },
    { name: 'Editor', slug: 'editor', description: 'Can publish and manage posts including others.' },
    { name: 'Author', slug: 'author', description: 'Can publish and manage their own posts.' },
    { name: 'Contributor', slug: 'contributor', description: 'Can write and manage their own posts but cannot publish.' },
    { name: 'Subscriber', slug: 'subscriber', description: 'Can only manage their profile.' },
];

const PERMISSIONS = [
    // User Management
    { name: 'Manage Users', slug: 'manage_users' },
    { name: 'Create Users', slug: 'create_users' },
    { name: 'Edit Users', slug: 'edit_users' },
    { name: 'Delete Users', slug: 'delete_users' },
    { name: 'Manage Roles', slug: 'manage_roles' },

    // Post Management
    { name: 'View Posts', slug: 'view_posts' }, // NEW
    { name: 'Create Posts', slug: 'create_posts' },
    { name: 'Edit Posts', slug: 'edit_posts' },
    { name: 'Edit Others Posts', slug: 'edit_others_posts' },
    { name: 'Publish Posts', slug: 'publish_posts' },
    { name: 'Delete Posts', slug: 'delete_posts' },
    { name: 'Read Private Posts', slug: 'read_private_posts' },
    { name: 'Manage Categories', slug: 'manage_categories' }, // NEW

    // Settings
    { name: 'Manage Settings', slug: 'manage_settings' },
];

const ROLE_PERMISSIONS: Record<string, string[]> = {
    super_admin: PERMISSIONS.map(p => p.slug),
    administrator: [
        'manage_users', 'create_users', 'edit_users', 'delete_users',
        'view_posts', 'create_posts', 'edit_posts', 'edit_others_posts', 'publish_posts', 'delete_posts', 'read_private_posts', 'manage_categories',
        'manage_settings'
    ],
    editor: [
        'view_posts', 'create_posts', 'edit_posts', 'edit_others_posts', 'publish_posts', 'delete_posts', 'read_private_posts', 'manage_categories'
    ],
    author: [
        'view_posts', 'create_posts', 'edit_posts', 'publish_posts', 'delete_posts'
    ],
    contributor: [
        'view_posts', 'create_posts', 'edit_posts'
    ],
    subscriber: []
};

async function main() {
    console.log('Seeding database...');

    // 1. Seed Roles
    for (const role of ROLES) {
        await prisma.role.upsert({
            where: { slug: role.slug },
            update: {},
            create: role,
        });
    }
    console.log('Roles seeded.');

    // 2. Seed Permissions
    for (const perm of PERMISSIONS) {
        await prisma.permission.upsert({
            where: { slug: perm.slug },
            update: {},
            create: perm,
        });
    }
    console.log('Permissions seeded.');

    // 3. Assign Permissions to Roles
    for (const roleSlug of Object.keys(ROLE_PERMISSIONS)) {
        const role = await prisma.role.findUnique({ where: { slug: roleSlug } });
        if (!role) continue;

        const permissionSlugs = ROLE_PERMISSIONS[roleSlug];
        for (const permSlug of permissionSlugs) {
            const permission = await prisma.permission.findUnique({ where: { slug: permSlug } });
            if (!permission) continue;

            await prisma.rolePermission.upsert({
                where: {
                    roleId_permissionId: {
                        roleId: role.id,
                        permissionId: permission.id
                    }
                },
                update: {},
                create: {
                    roleId: role.id,
                    permissionId: permission.id
                }
            });
        }
    }
    console.log('Role Permissions assigned.');

    // 4. Create/Update Admin User
    const email = 'admin@galareload.id';
    const hashedPassword = await bcrypt.hash('password123', 10);

    // We try to find first to get ID if strictly needed, but upsert is fine
    // Note: We are keeping the legacy 'role' field as 'ADMIN' for backward compatibility
    const adminUser = await prisma.user.upsert({
        where: { email },
        update: {
            password: hashedPassword, // Ensure password is set
        },
        create: {
            email,
            username: 'admin',
            name: 'Super Admin',
            password: hashedPassword,
            role: 'ADMIN',
        },
    });
    console.log('Admin User ensured.');

    // 5. Assign Super Admin Role (New System)
    const superAdminRole = await prisma.role.findUnique({ where: { slug: 'super_admin' } });
    if (superAdminRole) {
        await prisma.userRole.upsert({
            where: {
                userId_roleId: {
                    userId: adminUser.id,
                    roleId: superAdminRole.id
                }
            },
            update: {},
            create: {
                userId: adminUser.id,
                roleId: superAdminRole.id
            }
        });
        console.log('Assigned Super Admin role to user.');
    }

    // 6. Migrate Blog Posts
    // 6. Seed Categories
    const categories = ['Bisnis', 'Tips', 'Fitur', 'Teknis', 'Strategi'];
    for (const catName of categories) {
        await prisma.category.upsert({
            where: { slug: catName.toLowerCase() },
            update: {},
            create: {
                name: catName,
                slug: catName.toLowerCase(),
            }
        });
    }

    // 7. Migrate Blog Posts
    for (const post of BLOG_POSTS) {
        const exists = await prisma.post.findUnique({ where: { slug: post.slug } });
        if (!exists) {
            // Find or create category (simplified)
            const catSlug = post.category.toLowerCase();
            let category = await prisma.category.findUnique({ where: { slug: catSlug } });
            if (!category) {
                category = await prisma.category.create({
                    data: { name: post.category, slug: catSlug }
                });
            }

            // Create basic blocks from content HTML
            // This is a rough conversion for seeding purposes
            const blocks = [
                {
                    id: 'seed-' + Math.random().toString(36).substring(7),
                    type: 'paragraph',
                    data: {
                        text: post.content // EditorJS paragraph supports HTML text
                    }
                }
            ];

            await prisma.post.create({
                data: {
                    title: post.title,
                    slug: post.slug,
                    excerpt: post.excerpt,
                    content: post.content,
                    content_raw: {
                        time: Date.now(),
                        blocks: blocks,
                        version: "2.29.0"
                    },
                    image: post.image,
                    status: 'PUBLISHED', // Enum value
                    publishedAt: new Date(),
                    authorId: adminUser.id,
                    categories: {
                        create: {
                            category: {
                                connect: { id: category.id }
                            }
                        }
                    }
                }
            });
        }
    }
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
