import type { JSX } from "react";
import { cn } from "~/lib/utils";
import FormatImage from "~/components/ui/formatImage";

export interface Block {
    id?: string;
    type: string;
    data: {
        text?: string;
        level?: number;
        items?: string[];
        caption?: string;
        file?: { url: string };
        code?: string;
        style?: string;
    };
}

export function BlockRenderer({ blocks }: { blocks: Block[] }) {
    if (!blocks || !Array.isArray(blocks)) return null;

    return (
        <div className="space-y-6 text-neutral-700 dark:text-neutral-300">
            {blocks.map((block, index) => {
                // Use index as fallback key if id is missing
                const key = block.id || index;

                switch (block.type) {
                    case 'header': {
                        const level = block.data.level || 2;
                        const Tag = `h${level}` as keyof JSX.IntrinsicElements;
                        return (
                            <Tag key={key} className={cn("font-bold font-metropolis text-neutral-900 dark:text-white mt-8 mb-4", {
                                "text-4xl": level === 1,
                                "text-3xl": level === 2,
                                "text-2xl": level === 3,
                                "text-xl": level >= 4,
                            })} dangerouslySetInnerHTML={{ __html: block.data.text || '' }} />
                        );
                    }
                    case 'paragraph':
                        return (
                            <p key={key} className="leading-relaxed text-lg" dangerouslySetInnerHTML={{ __html: block.data.text || '' }} />
                        );
                    case 'list': {
                        const ListTag = block.data.style === 'ordered' ? 'ol' : 'ul';
                        const items = block.data.items || [];
                        return (
                            <ListTag key={key} className={cn("pl-6 space-y-2 mb-6", block.data.style === 'ordered' ? "list-decimal" : "list-disc")}>
                                {items.map((item: any, i: number) => {
                                    const content = typeof item === 'string'
                                        ? item
                                        : (item?.content || item?.text || JSON.stringify(item));
                                    return <li key={i} dangerouslySetInnerHTML={{ __html: content }} />;
                                })}
                            </ListTag>
                        );
                    }
                    case 'image':
                        return (
                            <figure key={key} className="my-8">
                                <div className="rounded-2xl overflow-hidden shadow-sm border border-neutral-100 dark:border-neutral-800">
                                    <FormatImage
                                        src={block.data.file?.url || ''}
                                        srcWebp={block.data.file?.url?.endsWith('.webp') ? block.data.file?.url : undefined}
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
                            <blockquote key={key} className="border-l-4 border-primary pl-6 py-2 my-8 italic text-xl text-neutral-600 dark:text-neutral-400 bg-neutral-50 dark:bg-neutral-900/50 rounded-r-xl">
                                <p dangerouslySetInnerHTML={{ __html: block.data.text || '' }} />
                                {block.data.caption && <cite className="block text-sm font-bold mt-2 not-italic text-neutral-800 dark:text-neutral-200">- {block.data.caption}</cite>}
                            </blockquote>
                        );
                    case 'delimiter':
                        return <hr key={key} className="my-12 border-neutral-200 dark:border-neutral-800" />;
                    case 'code':
                        return (
                            <div key={key} className="bg-neutral-900 text-neutral-100 p-4 rounded-xl overflow-x-auto my-6 font-mono text-sm relative">
                                <div className="absolute top-2 right-2 flex gap-2">
                                    <div className="w-3 h-3 rounded-full bg-red-500" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                                    <div className="w-3 h-3 rounded-full bg-green-500" />
                                </div>
                                <pre className="mt-4">{block.data.code || ''}</pre>
                            </div>
                        );
                    default:
                        // Unknown block type
                        return null;
                }
            })}
        </div>
    );
}
