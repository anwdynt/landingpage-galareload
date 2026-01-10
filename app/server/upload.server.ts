import path from "path";
import fs from "fs-extra";

const UPLOAD_DIR = "public/uploads";

// Ensure directory exists
fs.ensureDirSync(UPLOAD_DIR);

// Allowed mime types
const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export async function uploadImage(file: File) {
    if (!file || file.size === 0) return null;

    // Security Check 1: File Size
    if (file.size > MAX_FILE_SIZE) {
        throw new Error("File too large. Max 5MB allowed.");
    }

    // Security Check 2: MIME Type
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
        throw new Error(`Invalid file type: ${file.type}. Only JPG, PNG, GIF, WEBP allowed.`);
    }

    const ext = path.extname(file.name).toLowerCase();

    // Security Check 3: Extension Whitelist (Double verification)
    const ALLOWED_EXTS = [".jpg", ".jpeg", ".png", ".gif", ".webp"];
    if (!ALLOWED_EXTS.includes(ext)) {
        throw new Error("Invalid file extension.");
    }

    const name = path.basename(file.name, ext).replace(/[^a-z0-9]/gi, '-').toLowerCase();
    const filename = `${Date.now()}-${name}${ext}`;
    const filepath = path.join(UPLOAD_DIR, filename);

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    await fs.writeFile(filepath, buffer);

    // Return public URL (relative)
    return `/uploads/${filename}`;
}

// Deprecated or unused helpers removed

