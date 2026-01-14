export async function processImage(
    file: File,
    quality: number = 0.8,
    maxWidth: number = 1920
): Promise<File> {
    return new Promise((resolve, reject) => {
        // If file is not an image, return original
        if (!file.type.startsWith('image/')) {
            resolve(file);
            return;
        }

        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target?.result as string;

            img.onload = () => {
                // Calculate new dimensions
                let width = img.width;
                let height = img.height;

                if (width > maxWidth) {
                    height = Math.round((height * maxWidth) / width);
                    width = maxWidth;
                }

                // Create canvas
                const canvas = document.createElement('canvas');
                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                if (!ctx) {
                    reject(new Error('Could not get canvas context'));
                    return;
                }

                // Draw image
                ctx.drawImage(img, 0, 0, width, height);

                // Convert to WebP blob
                canvas.toBlob(
                    (blob) => {
                        if (!blob) {
                            reject(new Error('Could not compress image'));
                            return;
                        }

                        // Create new file with .webp extension
                        const fileName = file.name.replace(/\.[^/.]+$/, "") + ".webp";
                        const newFile = new File([blob], fileName, {
                            type: 'image/webp',
                            lastModified: Date.now(),
                        });

                        resolve(newFile);
                    },
                    'image/webp',
                    quality // Quality between 0 and 1
                );
            };

            img.onerror = (error) => reject(error);
        };

        reader.onerror = (error) => reject(error);
    });
}
