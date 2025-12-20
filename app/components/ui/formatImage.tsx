import { motion } from 'framer-motion';

interface FormatImageProps {
    src: string;
    srcWebp?: string;
    alt: string;
    className?: string;
}

export default function FormatImage({
    src,
    srcWebp,
    alt,
    className,
}: FormatImageProps) {
    // Check if we're in development mode
    const isDevelopment = import.meta.env.MODE === 'development';

    // If in development mode or no WebP source is provided, render regular img
    if (isDevelopment || !srcWebp) {
        return <img src={src} alt={alt} className={className} />;
    }

    // In production mode with WebP support
    return (
        <picture>
            <source srcSet={srcWebp} type="image/webp" />
            <img src={src} alt={alt} className={className} />
        </picture>
    );
}

// Helper function to handle motion images (for framer-motion compatibility)
interface MotionFormatImageProps extends FormatImageProps {
    initial?: any;
    animate?: any;
    transition?: any;
    key?: string;
}

export function MotionFormatImage({
    src,
    srcWebp,
    alt,
    className,
    initial,
    animate,
    transition,
    key,
}: MotionFormatImageProps) {
    const isDevelopment = import.meta.env.MODE === 'development';
    console.log(import.meta.env.MODE);
    if (isDevelopment || !srcWebp) {
        return (
            <motion.img
                key={key}
                src={src}
                alt={alt}
                className={className}
                initial={initial}
                animate={animate}
                transition={transition}
            />
        );
    }

    return (
        <motion.picture
            key={key}
            initial={initial}
            animate={animate}
            transition={transition}
        >
            <source srcSet={srcWebp} type="image/webp" />
            <img src={src} alt={alt} className={className} />
        </motion.picture>
    );
}
