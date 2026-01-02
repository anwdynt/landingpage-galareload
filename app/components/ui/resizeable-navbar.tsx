import { cn } from '~/lib/utils';
import { X, Menu, ChevronDown } from 'lucide-react';
import {
    motion,
    AnimatePresence,
    useScroll,
    useMotionValueEvent,
} from 'framer-motion';
import FormatImage from './formatImage';
import { Link } from 'react-router';
import React, { useRef, useState, memo } from 'react';
import type {
    NavbarProps,
    NavBodyProps,
    NavItemsProps,
    MobileNavProps,
    MobileNavMenuProps,
} from '~/types/nav';

/* ================= NAVBAR ================= */

export const Navbar = memo(({ children, className }: NavbarProps) => {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollY } = useScroll({
        target: ref,
        offset: ['start start', 'end start'],
    });

    const [visible, setVisible] = useState(false);

    useMotionValueEvent(scrollY, 'change', (latest) => {
        setVisible(latest > 100);
    });

    return (
        <motion.div
            ref={ref}
            className={cn('sticky top-5 z-50 w-full', className)}
        >
            {React.Children.map(children, (child) =>
                React.isValidElement(child)
                    ? React.cloneElement(
                        child as React.ReactElement<{ visible?: boolean }>,
                        { visible }
                    )
                    : child
            )}
        </motion.div>
    );
});

/* ================= DESKTOP ================= */

export const NavBody = memo(({ children, visible }: NavBodyProps) => (
    <motion.div
        animate={{
            backdropFilter: visible ? 'blur(10px)' : 'none',
            width: visible ? '40%' : '100%',
            y: visible ? 20 : 0,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 40 }}
        className={cn(
            'mx-auto hidden max-w-7xl items-center justify-between rounded-full px-6 py-2 lg:flex',
            visible && 'bg-white/80 dark:bg-neutral-950/80'
        )}
    >
        {children}
    </motion.div>
));

export const NavItems = memo(({ items }: NavItemsProps) => {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div
            className="relative flex flex-1 justify-center gap-2"
            onMouseLeave={() => setOpenIndex(null)}
        >
            {items.map((item, idx) => (
                <div
                    key={idx}
                    className="relative"
                    onMouseEnter={() => setOpenIndex(idx)}
                >
                    <a
                        href={item.link || '#'}
                        className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
                    >
                        {item.name}
                        {item.children && (
                            <ChevronDown className="h-4 w-4 opacity-70" />
                        )}
                    </a>

                    <AnimatePresence>
                        {openIndex === idx && item.children && (
                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 10 }}
                                className="absolute -left-4 top-full mt-2 w-max min-w-[500px] max-w-[700px] overflow-hidden rounded-xl border-2 border-b-8 border-r-8 border-primary bg-white shadow-xl dark:bg-neutral-900"
                            >
                                <div className="grid grid-cols-2 gap-x-8 gap-y-6 p-6">
                                    {item.children.map((child) => (
                                        <a
                                            key={child.name}
                                            href={child.link}
                                            className="group block space-y-1"
                                        >
                                            <div className="text-sm font-semibold text-primary transition-colors group-hover:text-primary dark:text-neutral-100">
                                                {child.name}
                                            </div>
                                            {child.description && (
                                                <div className="text-xs leading-relaxed text-neutral-500 dark:text-neutral-400">
                                                    {child.description}
                                                </div>
                                            )}
                                        </a>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
});

/* ================= MOBILE ================= */

export const MobileNav = memo(({ children, visible }: MobileNavProps) => (
    <motion.div
        animate={{
            backdropFilter: visible ? 'blur(10px)' : 'none',
            y: visible ? 20 : 0,
        }}
        className={cn(
            'relative mx-auto flex w-full max-w-[calc(100vw-2rem)] flex-col gap-4 rounded-2xl px-4 py-2 lg:hidden',
            visible && 'bg-white/80 dark:bg-neutral-950/80'
        )}
    >
        {children}
    </motion.div>
));

export const MobileNavMenu = memo(({ isOpen, children }: MobileNavMenuProps) => (
    <AnimatePresence>
        {isOpen && (
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-full left-0 right-0 mt-2 z-50 flex flex-col gap-4 rounded-lg bg-white p-4 shadow-xl border border-neutral-100 dark:border-neutral-800 dark:bg-neutral-950"
            >
                {children}
            </motion.div>
        )}
    </AnimatePresence>
));

export const MobileNavToggle = memo(({
    isOpen,
    onClick,
}: {
    isOpen: boolean;
    onClick: () => void;
}) => (isOpen ? <X onClick={onClick} /> : <Menu onClick={onClick} />));

/* ================= UTIL ================= */

export const NavbarLogo = memo(() => (
    <Link to="/">
        <FormatImage
            src="/icons/logo_gala_A.png"
            srcWebp="/icons/logo_gala_A.webp"
            alt="Galareload"
            className="h-10 w-auto"
        />
    </Link>
));

export const NavbarButton = memo(({ children }: { children: React.ReactNode }) => (
    <button className="rounded-md bg-black px-4 py-2 text-sm text-white">
        {children}
    </button>
));
