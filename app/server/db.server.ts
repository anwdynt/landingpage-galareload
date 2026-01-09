import "dotenv/config";
import { PrismaMariaDb } from '@prisma/adapter-mariadb';
import { PrismaClient } from '../../generated/prisma/client';

let prisma: PrismaClient;

declare global {
    var __db__: PrismaClient;
}

// Ensure connection settings are present
if (!process.env.DATABASE_URL && (!process.env.DATABASE_HOST || !process.env.DATABASE_USER)) {
    throw new Error("Validation Error: Missing database credentials in environment variables.");
}

function createClient() {
    const adapter = new PrismaMariaDb({
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_NAME,
        port: Number(process.env.DATABASE_PORT),
        connectionLimit: 5
    });
    return new PrismaClient({ adapter });
}

// Check if we are in production
if (process.env.NODE_ENV === "production") {
    prisma = createClient();
} else {
    // In development, put prisma on the global object to prevent 
    // multiple connections during hot reloading
    if (!global.__db__) {
        global.__db__ = createClient();
    }
    prisma = global.__db__;
}

export { prisma };
