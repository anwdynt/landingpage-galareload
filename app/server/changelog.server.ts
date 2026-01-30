import { prisma } from './db.server';
import type { CreateChangelogInput, UpdateChangelogInput } from '~/types/changelog';

/**
 * Get all published changelogs ordered by release date (newest first)
 */
export async function getPublishedChangelogs() {
    return await prisma.changelog.findMany({
        where: {
            isPublished: true,
            isUpcoming: false,
        },
        orderBy: {
            releaseDate: 'desc',
        },
    });
}

/**
 * Get upcoming changelog (next update)
 */
export async function getUpcomingChangelog() {
    return await prisma.changelog.findFirst({
        where: {
            isPublished: true,
            isUpcoming: true,
        },
    });
}

/**
 * Get all changelogs with pagination and filters (admin use)
 */
export async function getAllChangelogs(
    page: number = 1,
    limit: number = 10,
    search?: string,
    status?: 'all' | 'published' | 'draft' | 'upcoming'
) {
    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {};

    if (search) {
        where.version = {
            contains: search,
        };
    }

    if (status && status !== 'all') {
        if (status === 'upcoming') {
            where.isUpcoming = true;
        } else if (status === 'published') {
            where.isPublished = true;
            where.isUpcoming = false;
        } else if (status === 'draft') {
            where.isPublished = false;
        }
    }

    const [changelogs, totalCount] = await Promise.all([
        prisma.changelog.findMany({
            where,
            orderBy: [
                { isUpcoming: 'desc' },
                { releaseDate: 'desc' },
            ],
            skip,
            take: limit,
        }),
        prisma.changelog.count({ where }),
    ]);

    const totalPages = Math.ceil(totalCount / limit);

    return {
        changelogs,
        totalCount,
        page,
        limit,
        totalPages,
    };
}

/**
 * Get changelog by ID
 */
export async function getChangelogById(id: number) {
    return await prisma.changelog.findUnique({
        where: { id },
    });
}

/**
 * Create new changelog
 */
export async function createChangelog(data: CreateChangelogInput) {
    return await prisma.changelog.create({
        data: {
            version: data.version,
            releaseDate: data.releaseDate || null,
            isUpcoming: data.isUpcoming || false,
            expectedDate: data.expectedDate || null,
            tag: data.tag || null,
            features: data.features,
            fixes: data.fixes,
            improvements: data.improvements,
            isPublished: data.isPublished ?? true,
        },
    });
}

/**
 * Update changelog
 */
export async function updateChangelog(id: number, data: UpdateChangelogInput) {
    return await prisma.changelog.update({
        where: { id },
        data: {
            ...(data.version && { version: data.version }),
            ...(data.releaseDate !== undefined && { releaseDate: data.releaseDate }),
            ...(data.isUpcoming !== undefined && { isUpcoming: data.isUpcoming }),
            ...(data.expectedDate !== undefined && { expectedDate: data.expectedDate }),
            ...(data.tag !== undefined && { tag: data.tag }),
            ...(data.features && { features: data.features }),
            ...(data.fixes && { fixes: data.fixes }),
            ...(data.improvements && { improvements: data.improvements }),
            ...(data.isPublished !== undefined && { isPublished: data.isPublished }),
        },
    });
}

/**
 * Delete changelog
 */
export async function deleteChangelog(id: number) {
    return await prisma.changelog.delete({
        where: { id },
    });
}

/**
 * Toggle publish status
 */
export async function togglePublishChangelog(id: number) {
    const changelog = await getChangelogById(id);
    if (!changelog) {
        throw new Error('Changelog not found');
    }

    return await prisma.changelog.update({
        where: { id },
        data: {
            isPublished: !changelog.isPublished,
        },
    });
}
