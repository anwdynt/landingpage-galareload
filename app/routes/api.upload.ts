import { type ActionFunctionArgs } from "react-router";
import path from "path";
import fs from "fs-extra";

import { requireUserId } from "~/server/session.server";

export async function action({ request }: ActionFunctionArgs) {
    await requireUserId(request);

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.ensureDir(uploadDir);

    try {
        const formData = await request.formData();
        const file = formData.get("image");

        if (!file || typeof file === "string") {
            return { success: 0, file: null };
        }

        const fileObj = file as File;

        // Security Validation
        const ALLOWED_MIME_TYPES = ["image/jpeg", "image/png", "image/gif", "image/webp"];
        const MAX_SIZE = 5 * 1024 * 1024; // 5MB

        if (fileObj.size > MAX_SIZE) {
            return Response.json({ success: 0, error: "File too large (Max 5MB)" });
        }

        if (!ALLOWED_MIME_TYPES.includes(fileObj.type)) {
            return Response.json({ success: 0, error: "Invalid file type. Only Images allowed." });
        }

        const ext = path.extname(fileObj.name).toLowerCase();
        // Whitelist extension check
        if (![".jpg", ".jpeg", ".png", ".gif", ".webp"].includes(ext)) {
            return Response.json({ success: 0, error: "Invalid file extension." });
        }

        const name = path.basename(fileObj.name, ext);
        // Sanitize filename to prevent path traversal or invalid characters
        const sanitizedName = name.replace(/[^a-zA-Z0-9-_.]/g, '');
        const filename = `${Date.now()}-${sanitizedName}${ext}`;
        const filePath = path.join(uploadDir, filename);

        // Convert to buffer and write
        const arrayBuffer = await fileObj.arrayBuffer();
        await fs.writeFile(filePath, Buffer.from(arrayBuffer));

        return Response.json({
            success: 1,
            file: {
                url: `/uploads/${filename}`,
            },
        });
    } catch (error) {
        console.error("Upload failed", error);
        return Response.json({ success: 0 });
    }
}
