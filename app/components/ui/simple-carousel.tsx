import React, { useEffect, useRef, useState, type JSX } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface SimpleCarouselProps {
    items: JSX.Element[];
    autoplay?: boolean;
    autoplayInterval?: number;
}

export const SimpleCarousel = ({ items, autoplay = false, autoplayInterval = 3000 }: SimpleCarouselProps) => {
    const carouselRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [isHovered, setIsHovered] = useState(false);

    const checkScrollability = () => {
        if (carouselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(Math.ceil(scrollLeft) < scrollWidth - clientWidth);
        }
    };

    useEffect(() => {
        checkScrollability();
        window.addEventListener('resize', checkScrollability);
        return () => window.removeEventListener('resize', checkScrollability);
    }, []);

    const scrollLeft = () => {
        if (carouselRef.current) {
            carouselRef.current.scrollBy({ left: -320, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (carouselRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

            // Check if we reached the end
            if (Math.ceil(scrollLeft + clientWidth) >= scrollWidth) {
                // Loop back to start
                carouselRef.current.scrollTo({ left: 0, behavior: 'smooth' });
            } else {
                carouselRef.current.scrollBy({ left: 320, behavior: 'smooth' });
            }
        }
    };

    // Autoplay Logic
    useEffect(() => {
        if (!autoplay || isHovered) return;

        const interval = setInterval(() => {
            scrollRight();
        }, autoplayInterval);

        return () => clearInterval(interval);
    }, [autoplay, isHovered, autoplayInterval]);

    return (
        <div
            className="relative w-full group"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className="flex overflow-x-auto gap-6 px-4 py-4 snap-x snap-mandatory -mx-4 md:mx-0 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
                ref={carouselRef}
                onScroll={checkScrollability}
            >
                {items.map((item, idx) => (
                    <motion.div
                        key={idx}
                        className="snap-center shrink-0"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.4, delay: idx * 0.1 }}
                    >
                        {item}
                    </motion.div>
                ))}
            </div>

            <div className="flex justify-end gap-2 mt-4 px-4 md:px-0">
                <button
                    className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 disabled:opacity-50 transition-opacity hover:bg-neutral-200 dark:hover:bg-neutral-700"
                    onClick={scrollLeft}
                    disabled={!canScrollLeft}
                    aria-label="Scroll left"
                >
                    <ArrowLeft className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
                </button>
                <button
                    className="p-2 rounded-full bg-neutral-100 dark:bg-neutral-800 transition-opacity hover:bg-neutral-200 dark:hover:bg-neutral-700"
                    onClick={scrollRight}
                    // Disabled logic removed for infinite loop feel (wrap around)
                    aria-label="Scroll right"
                >
                    <ArrowRight className="w-5 h-5 text-neutral-600 dark:text-neutral-300" />
                </button>
            </div>
        </div>
    );
};
