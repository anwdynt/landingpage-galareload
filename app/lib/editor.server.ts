
interface Block {
    type: string;
    data: {
        text?: string;
        level?: number;
        style?: string;
        items?: string[];
        caption?: string;
        file?: {
            url?: string;
        };
        withBorder?: boolean;
        withBackground?: boolean;
        stretched?: boolean;
        code?: string;
    };
}

export function blocksToHtml(blocks: Block[]) {
    if (!blocks || !Array.isArray(blocks)) {
        return "";
    }

    let html = "";

    blocks.forEach((block) => {
        switch (block.type) {
            case "header":
                html += `<h${block.data.level} class="text-2xl font-bold mb-4">${block.data.text}</h${block.data.level}>`;
                break;
            case "paragraph":
                html += `<p class="mb-4 text-neutral-700 dark:text-neutral-300 leading-relaxed">${block.data.text}</p>`;
                break;
            case "list": {
                const tag = block.data.style === "ordered" ? "ol" : "ul";
                const listItems = block.data.items
                    ? block.data.items.map((item: any) => {
                        if (typeof item === 'string') return `<li>${item}</li>`;
                        // Handle object items (e.g., from nested-list or different versions)
                        if (typeof item === 'object' && item !== null) {
                            // Try common properties: content, text
                            const content = item.content || item.text || '';
                            // If dealing with nested lists, you might want to handle 'items' property recursively here,
                            // but for now let's just fix the basic text display.
                            return `<li>${content}</li>`;
                        }
                        return `<li>${String(item)}</li>`;
                    }).join("")
                    : "";
                html += `<${tag} class="mb-4 ml-6 list-disc">${listItems}</${tag}>`;
                break;
            }
            case "quote":
                html += `<blockquote class="border-l-4 border-primary pl-4 italic my-4">${block.data.text}</blockquote>`;
                if (block.data.caption) {
                    html += `<p class="text-sm text-gray-500 -mt-2 mb-4">${block.data.caption}</p>`;
                }
                break;
            case "image": {
                if (!block.data.file || !block.data.file.url) {
                    // Skip invalid image blocks
                    break;
                }
                const caption = block.data.caption ? `<figcaption class="text-center text-sm text-gray-500 mt-2">${block.data.caption}</figcaption>` : "";
                const classes = [
                    "my-6 rounded-lg",
                    block.data.withBorder ? "border" : "",
                    block.data.withBackground ? "bg-gray-100 p-2" : "",
                    block.data.stretched ? "w-full" : ""
                ].join(" ");

                html += `<figure class="my-6"><img src="${block.data.file.url}" alt="${block.data.caption || ''}" class="${classes}" />${caption}</figure>`;
                break;
            }
            case "code":
                html += `<pre class="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto my-4"><code>${block.data.code}</code></pre>`;
                break;
            case "delimiter":
                html += `<hr class="my-8 border-t border-gray-300 dark:border-gray-700" />`;
                break;
            default:
                console.warn("Unknown or invalid block type:", block.type, JSON.stringify(block));
                break;
        }
    });

    return html;
}

export function parseEditorJson(json: { blocks: Block[] } | null | undefined) {
    if (!json || !json.blocks) return "";
    return blocksToHtml(json.blocks);
}
