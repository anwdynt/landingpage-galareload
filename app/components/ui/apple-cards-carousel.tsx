import React, { useEffect, useRef, useState, type JSX } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { AspectRatio } from './aspect-ratio';
import { ColourfulText } from './colorfull-text';
import { Link } from 'react-router';
import { ChevronRight } from 'lucide-react';
import FormatImage from './formatImage';

interface CardData {
    src: string;
    title: string;
    description: string;
    content: string; // youtube embed url (NO autoplay)
}

interface CarouselProps {
    items: JSX.Element[];
    cardsData: CardData[];
}

/* =========================
    CAROUSEL
========================= */
export const Carousel = ({ items, cardsData }: CarouselProps) => {
    const carouselRef = useRef<HTMLDivElement>(null);

    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [isHovering, setIsHovering] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);

    /* ---------- helpers ---------- */
    const getScrollAmount = () => {
        if (!carouselRef.current) return 0;
        const card =
            carouselRef.current.querySelector<HTMLElement>('[data-card]');
        if (!card) return 0;

        const style = window.getComputedStyle(card);
        const marginRight = parseFloat(style.marginRight || '0');
        return card.offsetWidth + marginRight;
    };

    const updateScrollState = () => {
        if (!carouselRef.current) return;
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;

        setCanScrollLeft(scrollLeft > 0);
        setCanScrollRight(scrollLeft < scrollWidth - clientWidth);
    };

    const updateActiveIndex = () => {
        if (!carouselRef.current) return;

        const cards = Array.from(
            carouselRef.current.querySelectorAll<HTMLElement>('[data-card]')
        );

        const containerRect = carouselRef.current.getBoundingClientRect();
        const containerCenter = containerRect.left + containerRect.width / 2;

        let closestIndex = 0;
        let closestDistance = Infinity;

        cards.forEach((card, index) => {
            const rect = card.getBoundingClientRect();
            const cardCenter = rect.left + rect.width / 2;
            const distance = Math.abs(cardCenter - containerCenter);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestIndex = index;
            }
        });

        setActiveIndex(closestIndex);
    };

    /* ---------- autoplay ---------- */
    useEffect(() => {
        if (isHovering) return;

        const interval = setInterval(() => {
            if (!carouselRef.current) return;

            const scrollAmount = getScrollAmount();
            if (!scrollAmount) return;

            const { scrollLeft, scrollWidth, clientWidth } =
                carouselRef.current;

            if (scrollLeft + clientWidth >= scrollWidth - scrollAmount) {
                carouselRef.current.scrollTo({
                    left: 0,
                    behavior: 'smooth',
                });
            } else {
                carouselRef.current.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth',
                });
            }

            setTimeout(updateActiveIndex, 350);
        }, 40000);

        return () => clearInterval(interval);
    }, [isHovering]);

    /* ---------- navigation ---------- */
    const scrollLeft = () => {
        if (!carouselRef.current) return;
        carouselRef.current.scrollBy({
            left: -getScrollAmount(),
            behavior: 'smooth',
        });
        setTimeout(updateActiveIndex, 350);
    };

    const scrollRight = () => {
        if (!carouselRef.current) return;
        carouselRef.current.scrollBy({
            left: getScrollAmount(),
            behavior: 'smooth',
        });
        setTimeout(updateActiveIndex, 350);
    };

    return (
        <div className="relative w-full">
            {/* CAROUSEL */}
            <div
                ref={carouselRef}
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                onScroll={() => {
                    updateScrollState();
                    updateActiveIndex();
                }}
                className="flex w-full overflow-x-scroll scroll-smooth pb-10 lg:pb-2 [scrollbar-width:none]"
            >
                <div className="mx-auto flex max-w-7xl gap-4 pl-4 lg:pl-0">
                    {items.map((item, index) => (
                        <motion.div
                            key={index}
                            data-card
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{
                                duration: 0.5,
                                delay: index * 0.15,
                            }}
                        >
                            {item}
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* TEXT + NAV */}
            <div className="mt-6 flex flex-col gap-4 font-google-sans lg:flex-row lg:items-start lg:justify-between">
                {/* ACTIVE TEXT */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeIndex}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-md pl-4 lg:pl-0"
                    >
                        <p className="lg:text-xl text-base text-primary font-semibold">
                            {cardsData[activeIndex]?.title}
                        </p>
                        <p className="lg:text-base text-sm text-neutral-500 dark:text-white">
                            {cardsData[activeIndex]?.description}
                        </p>
                        <Link to={cardsData[activeIndex]?.content}>
                            <p className="lg:text-base text-sm text-neutral-500 dark:text-white">
                                Selengkapnya{' '}
                                <ChevronRight className="inline-block w-4 h-4" />
                            </p>
                        </Link>
                    </motion.div>
                </AnimatePresence>

                {/* NAV BUTTONS */}
                <div className="flex w-full justify-center gap-2 lg:w-auto lg:justify-end">
                    <button
                        onClick={scrollLeft}
                        disabled={!canScrollLeft}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
                    >
                        <ArrowLeft />
                    </button>
                    <button
                        onClick={scrollRight}
                        disabled={!canScrollRight}
                        className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 disabled:opacity-50"
                    >
                        <ArrowRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

/* =========================
CARD
========================= */
export const Card = ({ card }: { card: CardData }) => {
    const [open, setOpen] = useState(false);

    // ESC close
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') setOpen(false);
        };
        if (open) window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [open]);

    return (
        <>
            {/* MODAL */}
            <AnimatePresence>
                {open && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center">
                        <motion.div
                            className="absolute inset-0 bg-black/80 backdrop-blur-lg"
                            onClick={() => setOpen(false)}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        />

                        <motion.div
                            initial={{ scale: 0.96, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.96, opacity: 0 }}
                            className="relative z-60 w-full max-w-5xl px-4"
                        >
                            <AspectRatio ratio={16 / 9}>
                                <iframe
                                    src={card.content}
                                    title={card.title}
                                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="h-full w-full rounded-2xl"
                                />
                            </AspectRatio>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* CARD */}
            <motion.button
                onClick={() => setOpen(true)}
                className="relative flex h-80 w-[85vw] overflow-hidden rounded-3xl bg-neutral-900 md:h-180 md:w-250"
            >
                {/* Image */}
                <FormatImage
                    src={card.src}
                    alt={card.title}
                    srcWebp={card.src.replace('.png', '.webp')}
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-b from-black/60 via-black/30 to-black/60" />

                {/* CENTER TEXT */}
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center text-white px-4">
                    <p className="opacity-80 text-base lg:text-4xl font-metropolis">
                        {card.title}
                        <ColourfulText text="." />
                    </p>
                </div>
            </motion.button>
        </>
    );
};
