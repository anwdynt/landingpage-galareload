import type { JSX } from "react";
import { cn } from "~/lib/utils";

export function BlockRenderer({ blocks }: { blocks: any[] }) {
    if (!blocks || !Array.isArray(blocks)) return null;

    return (
        <div className="space-y-6 text-neutral-700 dark:text-neutral-300">
            {blocks.map((block) => {
                switch (block.type) {
                    case 'header':
                        const Level = `h${block.data.level}` as keyof JSX.IntrinsicElements;
                        return (
                            <Level key={block.id} className={cn("font-bold font-metropolis text-neutral-900 dark:text-white mt-8 mb-4", {
                                "text-4xl": block.data.level === 1,
                                "text-3xl": block.data.level === 2,
                                "text-2xl": block.data.level === 3,
                                "text-xl": block.data.level === 4,
                            })} dangerouslySetInnerHTML={{ __html: block.data.text }} />
                        );
                    case 'paragraph':
                        return (
                            <p key={block.id} className="leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: block.data.text }} />
                        );
                    case 'list':
                        const ListTag = block.data.style === 'ordered' ? 'ol' : 'ul';
                        return (
                            <ListTag key={block.id} className={cn("pl-6 space-y-2 mb-6", block.data.style === 'ordered' ? "list-decimal" : "list-disc")}>
                                {block.data.items.map((item: string, i: number) => (
                                    <li key={i} dangerouslySetInnerHTML={{ __html: item }} />
                                ))}
                            </ListTag>
                        );
                    case 'image':
                        return (
                            <figure key={block.id} className="my-8">
                                <div className="rounded-2xl overflow-hidden shadow-sm border border-neutral-100 dark:border-neutral-800">
                                    <img
                                        src={block.data.file?.url}
                                        alt={block.data.caption || "Blog image"}
                                        className="w-full h-auto object-cover"
                                    />
                                </div>
                                {block.data.caption && (
                                    <figcaption className="text-center text-sm text-neutral-500 mt-3 italic">
                                        {block.data.caption}
                                    </figcaption>
                                )}
                            </figure>
                        );
                    case 'quote':
                        return (
                            <blockquote key={block.id} className="border-l-4 border-primary pl-6 py-2 my-8 italic text-xl text-neutral-600 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-900/50 rounded-r-xl">
                                <p dangerouslySetInnerHTML={{ __html: block.data.text }} />
                                {block.data.caption && <cite className="block text-sm font-bold mt-2 not-italic text-neutral-800 dark:text-neutral-200">- {block.data.caption}</cite>}
                            </blockquote>
                        );
                    case 'delimiter':
                        return <hr key={block.id} className="my-12 border-neutral-200 dark:border-neutral-800" />;
                    default:
                        console.warn("Unknown block type", block.type);
                        return null;
                }
            })}
        </div>
    );
}
