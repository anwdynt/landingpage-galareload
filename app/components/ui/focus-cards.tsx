import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "~/lib/utils";
import FormatImage from "./formatImage";

type Card = {
    title: string;
    src?: string;
    description?: string;
    icon?: React.ReactNode;
};

export const Card = React.memo(
    ({
        card,
        index,
        hovered,
        setHovered,
    }: {
        card: Card;
        index: number;
        hovered: number | null;
        setHovered: React.Dispatch<React.SetStateAction<number | null>>;
    }) => (
        <div
            onMouseEnter={() => setHovered(index)}
            onMouseLeave={() => setHovered(null)}
            className={cn(
                "rounded-xl relative bg-neutral-100 dark:bg-neutral-900 overflow-hidden h-60 md:h-96 w-full transition-all duration-300 ease-out border border-neutral-200 dark:border-neutral-800",
                hovered !== null && hovered !== index && "blur-sm scale-[0.98]"
            )}
        >
            {card.src ? (
                <FormatImage
                    src={card.src}
                    alt={card.title}
                    className="object-cover absolute inset-0 w-full h-full"
                />
            ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100 flex items-center justify-center">
                    {card.icon ? <div className="scale-150 transform opacity-50 grayscale">{card.icon}</div> : null}
                </div>
            )}

            <div
                className={cn(
                    "absolute inset-0 bg-black/50 flex items-end py-8 px-4 transition-opacity duration-300",
                    hovered === index ? "opacity-100" : "opacity-0"
                )}
            >
                <div>
                    <div className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-neutral-50 to-neutral-200">
                        {card.title}
                    </div>
                    {card.description && (
                        <p className="text-sm text-neutral-300 mt-2 font-normal">
                            {card.description}
                        </p>
                    )}
                </div>
            </div>
            <div
                className={cn(
                    "absolute inset-0 flex items-end py-8 px-4 transition-opacity duration-300",
                    hovered === index ? "opacity-0" : "opacity-100"
                )}
            >
                <div className="w-full">
                    {card.icon && <div className="mb-4">{card.icon}</div>}
                    <div className="text-xl md:text-2xl font-medium bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-200 dark:from-neutral-50 dark:to-neutral-200 shadow-black drop-shadow-md">
                        {card.title}
                    </div>
                </div>
            </div>
        </div>
    )
);

Card.displayName = "Card";

export function FocusCards({ cards }: { cards: Card[] }) {
    const [hovered, setHovered] = useState<number | null>(null);

    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto w-full">
            {cards.map((card, index) => (
                <Card
                    key={card.title}
                    card={card}
                    index={index}
                    hovered={hovered}
                    setHovered={setHovered}
                />
            ))}
        </div>
    );
}
