import { memo } from "react";
import { Filter, X, Check } from "lucide-react";
import { cn } from "~/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import type { Category } from "~/types/pricing";

interface MobileFilterProps {
    isOpen: boolean;
    setIsOpen: (open: boolean) => void;
    activeCategory: string;
    activeCategoryName: string;
    activeOperator: string;
    categories: Category[];
    operators: string[];
    onCategoryChange: (id: string) => void;
    onOperatorChange: (op: string) => void;
}

export const MobileFilter = memo(function MobileFilter({
    isOpen,
    setIsOpen,
    activeCategory,
    activeCategoryName,
    activeOperator,
    categories,
    operators,
    onCategoryChange,
    onOperatorChange
}: MobileFilterProps) {
    return (
        <>
            {/* Sticky Mobile Filter Bar */}
            <div className="lg:hidden sticky top-28 z-40 -mx-4 px-4 bg-white/80 dark:bg-black/80 backdrop-blur-md border-y border-neutral-100 dark:border-neutral-800 py-3 mb-6 transition-all">
                <div className="flex justify-between items-center">
                    <div className="flex flex-col">
                        <span className="text-xs text-neutral-500 font-medium">Kategori Aktif</span>
                        <span className="font-bold text-neutral-900 dark:text-white text-sm truncate max-w-[200px]">
                            {activeCategoryName}
                            {activeOperator !== 'all' && <span className="text-primary ml-1">• {activeOperator}</span>}
                        </span>
                    </div>
                    <button
                        onClick={() => setIsOpen(true)}
                        className="flex items-center gap-2 px-4 py-2 bg-neutral-900 dark:bg-white text-white dark:text-black rounded-full text-xs font-bold shadow-lg shadow-neutral-200 dark:shadow-neutral-900 active:scale-95 transition-all"
                    >
                        <Filter size={14} />
                        Filter
                    </button>
                </div>
            </div>

            {/* Mobile Filter Drawer */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                            className="fixed inset-0 bg-black/60 z-50 lg:hidden backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            className="fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-900 z-50 rounded-t-[2rem] lg:hidden max-h-[85vh] overflow-hidden flex flex-col shadow-2xl border-t border-neutral-100 dark:border-neutral-800"
                        >
                            <div className="p-4 border-b border-neutral-100 dark:border-neutral-800 flex justify-between items-center shrink-0">
                                <h3 className="font-metropolis font-bold text-lg dark:text-white">Filter Produk</h3>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-full transition-colors"
                                >
                                    <X size={20} className="text-neutral-500" />
                                </button>
                            </div>

                            <div className="overflow-y-auto p-4 space-y-6">
                                {/* Categories Section */}
                                <div>
                                    <h4 className="font-bold text-sm text-neutral-500 mb-3 uppercase tracking-wider">Kategori</h4>
                                    <div className="grid grid-cols-2 gap-2">
                                        {categories.map((cat) => (
                                            <button
                                                key={cat.id}
                                                onClick={() => {
                                                    onCategoryChange(cat.id);
                                                    // Don't close immediately to allow selecting operator
                                                }}
                                                className={cn(
                                                    "px-3 py-2.5 rounded-xl text-xs font-bold text-left transition-all border",
                                                    activeCategory === cat.id
                                                        ? "bg-primary/10 border-primary text-primary"
                                                        : "bg-neutral-50 dark:bg-neutral-800 border-transparent text-neutral-600 dark:text-neutral-400"
                                                )}
                                            >
                                                <div className="flex justify-between items-center">
                                                    {cat.name}
                                                    {activeCategory === cat.id && <Check size={14} />}
                                                </div>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Operators Section */}
                                {operators.length > 1 && (
                                    <div>
                                        <h4 className="font-bold text-sm text-neutral-500 mb-3 uppercase tracking-wider">Operator</h4>
                                        <div className="flex flex-wrap gap-2">
                                            {operators.map((op) => (
                                                <button
                                                    key={op}
                                                    onClick={() => {
                                                        onOperatorChange(op);
                                                        setIsOpen(false);
                                                    }}
                                                    className={cn(
                                                        "px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border",
                                                        activeOperator === op
                                                            ? "bg-neutral-900 border-neutral-900 text-white dark:bg-white dark:text-black"
                                                            : "bg-neutral-50 dark:bg-neutral-800 border-neutral-200 dark:border-neutral-700 text-neutral-600 dark:text-neutral-400"
                                                    )}
                                                >
                                                    {op === 'all' ? 'Semua Operator' : op}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
});
