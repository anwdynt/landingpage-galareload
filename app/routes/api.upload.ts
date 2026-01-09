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
        const ext = path.extname(fileObj.name);
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
