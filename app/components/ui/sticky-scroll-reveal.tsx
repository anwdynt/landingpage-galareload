'use client';
import React, { useRef, useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { cn } from '~/lib/utils';

export const StickyScroll = ({
    content,
    contentClassName,
}: {
    content: {
        title: string;
        description: string;
        content?: React.ReactNode;
    }[];
    contentClassName?: string;
}) => {
    const ref = useRef<HTMLDivElement>(null);
    const [activeCard, setActiveCard] = useState(0);

    const { scrollY } = useScroll({ container: ref });
    const cardLength = content.length;

    useMotionValueEvent(scrollY, 'change', (latest) => {
        if (!ref.current || cardLength === 0) return;

        const containerHeight =
            ref.current.scrollHeight - ref.current.clientHeight;
        if (containerHeight <= 0) return;

        const progress = latest / containerHeight;

        const index = Math.min(
            cardLength - 1,
            Math.floor(progress * cardLength)
        );

        setActiveCard(index);
    });

    return (
        <motion.div
            ref={ref}
            className="
        relative
        w-full
        h-120
        overflow-y-auto
        [&::-webkit-scrollbar]:w-0
        [&::-webkit-scrollbar]:h-0
        py-10
      "
        >
            {/* INNER WRAPPER */}
            <div className="mx-auto flex max-w-7xl justify-between px-10 lg:px-0">
                {/* LEFT CONTENT */}
                <div className="relative flex items-start">
                    <div className="max-w-2xl">
                        {content.map((item, index) => (
                            <div key={index} className="my-15">
                                <motion.h2
                                    animate={{
                                        opacity: activeCard === index ? 1 : 0.3,
                                    }}
                                    className="text-2xl font-medium text-primary font-metropolis"
                                >
                                    {item.title}
                                </motion.h2>

                                <motion.p
                                    animate={{
                                        opacity: activeCard === index ? 1 : 0.3,
                                    }}
                                    className="mt-10 text-primary"
                                >
                                    {item.description}
                                </motion.p>
                            </div>
                        ))}
                        {/* SPACE UNTUK ITEM TERAKHIR */}
                        <div className="h-1" />
                    </div>
                </div>

                {/* RIGHT STICKY */}
                <div
                    className={cn(
                        'sticky top-10 hidden h-80 w-full max-w-lg overflow-hidden rounded-md bg-white lg:block',
                        contentClassName
                    )}
                >
                    {content[activeCard]?.content}
                </div>
            </div>
        </motion.div>
    );
};
