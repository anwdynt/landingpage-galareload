import { memo } from "react";
import { Check } from "lucide-react";
import { cn } from "~/lib/utils";
import type { Category } from "~/types/pricing";

interface SidebarProps {
    categories: Category[];
    activeCategory: string;
    onCategoryChange: (id: string) => void;
}

export const Sidebar = memo(function Sidebar({ categories, activeCategory, onCategoryChange }: SidebarProps) {
    return (
        <div className="hidden lg:block lg:col-span-1 lg:sticky lg:top-32 space-y-4">
            <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-800 lg:max-h-[50vh] 2xl:max-h-[60vh] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-track]:my-2 [&::-webkit-scrollbar-thumb]:bg-gradient-to-b [&::-webkit-scrollbar-thumb]:from-[#eea2fb] [&::-webkit-scrollbar-thumb]:via-[#8957E5] [&::-webkit-scrollbar-thumb]:to-[#2DD4BF]">
                <h3 className="font-metropolis font-bold p-4 text-lg mb-4 dark:text-white sticky top-0 bg-white dark:bg-neutral-900 z-10 pb-2">Kategori</h3>
                <div className="space-y-2 p-4">
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            onClick={() => onCategoryChange(cat.id)}
                            className={cn(
                                "w-full text-left px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                                activeCategory === cat.id
                                    ? "bg-primary text-white shadow-md transform scale-[1.02]"
                                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 hover:text-primary dark:hover:text-primary"
                            )}
                        >
                            <div className="flex justify-between items-center">
                                {cat.name}
                                {activeCategory === cat.id && <Check size={16} />}
                            </div>
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
});
