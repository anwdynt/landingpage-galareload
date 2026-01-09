export interface Role {
    id: number;
    name: string;
    slug: string;
    description?: string | null;
}

export interface UserRole {
    role: Role;
}

export interface User {
    id: number;
    email: string;
    username: string;
    name: string;
    role: string;
    isActive: boolean;
    createdAt: string | Date;
    userRoles: UserRole[];
}
