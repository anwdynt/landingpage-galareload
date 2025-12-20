import fs from 'fs-extra';
import path from 'path';
import sharp from 'sharp';
import type { Plugin } from 'vite';

interface WebpConverterOptions {
    inputDirs?: string[];
    outputBase?: string;
    quality?: number;
    deleteOriginal?: boolean;
}

export default function webpConverterPlugin(
    options: WebpConverterOptions = {}
): Plugin {
    const {
        inputDirs = ['public/images', 'public/icons'],
        outputBase = 'build/client',
        quality = 80,
        deleteOriginal = false,
    } = options;

    return {
        name: 'vite-webp-converter',
        apply: 'build',

        async buildStart() {
            console.log('🔍 Starting WebP conversion...');

            for (const inputDir of inputDirs) {
                const absInput = path.resolve(inputDir);
                const outDir = path.resolve(
                    outputBase,
                    inputDir.replace(/^public\//, '')
                );

                // Skip jika folder sumber tidak ada
                if (!(await fs.pathExists(absInput))) {
                    console.warn(`⚠️  Folder tidak ditemukan: ${absInput}`);
                    continue;
                }

                // Pastikan folder output ada
                await fs.ensureDir(outDir);

                const files = await fs.readdir(absInput);

                for (const file of files) {
                    const ext = path.extname(file).toLowerCase();
                    const base = path.basename(file, ext);
                    const inputFile = path.join(absInput, file);
                    const outputFile = path.join(outDir, `${base}.webp`);

                    // Skip jika bukan gambar atau sudah webp
                    if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;
                    if (await fs.pathExists(outputFile)) continue;

                    try {
                        await sharp(inputFile)
                            .webp({ quality })
                            .toFile(outputFile);

                        if (deleteOriginal) {
                            await fs.remove(inputFile);
                        }

                        console.log(`✅ Converted: ${file} → ${base}.webp`);
                    } catch (err: any) {
                        console.error(
                            `❌ Failed to convert ${file}:`,
                            err.message
                        );
                    }
                }
            }

            console.log('✨ WebP conversion done.');
        },
    };
}
