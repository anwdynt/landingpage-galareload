/* eslint-disable no-console */
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

            const processDir = async (dir: string, baseOutDir: string) => {
                if (!(await fs.pathExists(dir))) return;

                const entries = await fs.readdir(dir, { withFileTypes: true });

                for (const entry of entries) {
                    const fullPath = path.join(dir, entry.name);

                    if (entry.isDirectory()) {
                        await processDir(fullPath, path.join(baseOutDir, entry.name));
                    } else if (entry.isFile()) {
                        const ext = path.extname(entry.name).toLowerCase();
                        if (!['.png', '.jpg', '.jpeg'].includes(ext)) continue;

                        const baseName = path.basename(entry.name, ext);
                        const outputFile = path.join(baseOutDir, `${baseName}.webp`);

                        await fs.ensureDir(baseOutDir);

                        if (await fs.pathExists(outputFile)) continue;

                        try {
                            await sharp(fullPath)
                                .webp({ quality })
                                .toFile(outputFile);

                            if (deleteOriginal) {
                                await fs.remove(fullPath);
                            }

                            console.log(`✅ Converted: ${entry.name} → ${baseName}.webp`);
                        } catch (err: unknown) {
                            const message = err instanceof Error ? err.message : "Unknown error";
                            console.error(
                                `❌ Failed to convert ${entry.name}:`,
                                message
                            );
                        }
                    }
                }
            };

            for (const inputDir of inputDirs) {
                const absInput = path.resolve(inputDir);
                const outDir = path.resolve(
                    outputBase,
                    inputDir.replace(/^public\//, '')
                );

                if (!(await fs.pathExists(absInput))) {
                    console.warn(`⚠️  Folder tidak ditemukan: ${absInput}`);
                    continue;
                }

                await processDir(absInput, outDir);
            }

            console.log('✨ WebP conversion done.');
        },
    };
}
