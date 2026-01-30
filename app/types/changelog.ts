// Changelog Types

export interface Changelog {
    id: number;
    version: string;
    releaseDate: Date | null;
    isUpcoming: boolean;
    expectedDate: string | null;
    tag: string | null;
    features: string[];
    fixes: string[];
    improvements: string[];
    isPublished: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateChangelogInput {
    version: string;
    releaseDate?: Date | null;
    isUpcoming?: boolean;
    expectedDate?: string | null;
    tag?: string | null;
    features: string[];
    fixes: string[];
    improvements: string[];
    isPublished?: boolean;
}

export interface UpdateChangelogInput {
    version?: string;
    releaseDate?: Date | null;
    isUpcoming?: boolean;
    expectedDate?: string | null;
    tag?: string | null;
    features?: string[];
    fixes?: string[];
    improvements?: string[];
    isPublished?: boolean;
}
