import { motion } from 'framer-motion';
import FormatImage from './formatImage';
type Client = {
    image: string;
    imageWebp?: string; // Optional WebP version of the image
};

type Props = {
    items: Client[];
    speed?: number;
    direction?: 'left' | 'right';
};

export default function MarqueeShadcn({
    items,
    speed = 40,
    direction = 'left',
}: Props) {
    // Duplikat item untuk animasi loop tanpa jeda
    const loopItems = [...items, ...items];
    const itemWidth = 220;
    const totalWidth = itemWidth * loopItems.length;
    const halfWidth = totalWidth / 2;
    const duration = (halfWidth / speed) * 1;

    // Tentukan arah animasi
    const animateFrom = direction === 'right' ? -halfWidth : 0;
    const animateTo = direction === 'right' ? 0 : -halfWidth;

    return (
        <div className="w-full overflow-hidden rounded-2xl p-2 relative">
            {/* Efek blur kiri */}
            <div
                className="absolute top-0 left-0 h-full w-16 lg:w-48 
        bg-linear-to-r from-white to-transparent 
        pointer-events-none z-20"
            />
            {/* Efek blur kanan */}
            <div
                className="absolute top-0 right-0 h-full w-16 lg:w-48 
        bg-linear-to-l from-white to-transparent 
        pointer-events-none z-20"
            />

            <motion.div
                className="flex items-center gap-4"
                initial={{ x: animateFrom }}
                animate={{ x: animateTo }}
                transition={{
                    repeat: Infinity,
                    repeatType: 'loop',
                    duration: Math.max(10, duration),
                    ease: 'linear',
                }}
                style={{ minWidth: '100%' }}
            >
                <div
                    className="flex items-center gap-4"
                    style={{ whiteSpace: 'nowrap' }}
                >
                    {loopItems.map((op, index) => (
                        <div
                            key={index}
                            className="inline-block"
                            style={{ width: itemWidth }}
                        >
                            <div className="flex items-center justify-center bg-white rounded-md overflow-hidden">
                                <FormatImage
                                    src={op.image}
                                    srcWebp={op.imageWebp}
                                    alt="partner_logo"
                                    className="max-w-full max-h-full object-contain w-36 h-auto"
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
}
