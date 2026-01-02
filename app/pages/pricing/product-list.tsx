import { memo } from "react";
import { motion } from "framer-motion";
import { cn } from "~/lib/utils";
import type { ProductItem } from "~/types/pricing";

interface ProductListProps {
    groupedData: Record<string, ProductItem[]>;
}

export const ProductList = memo(function ProductList({ groupedData }: ProductListProps) {
    return (
        <>
            {Object.keys(groupedData).length > 0 ? (
                Object.entries(groupedData).map(([provider, items]) => (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-50px" }}
                        key={provider}
                        className="bg-white dark:bg-neutral-900 rounded-2xl shadow-sm border border-neutral-100 dark:border-neutral-800 overflow-hidden"
                    >
                        <div className="px-6 py-4 border-b border-neutral-100 dark:border-neutral-800 bg-neutral-50/50 dark:bg-neutral-950/50 flex justify-between items-center">
                            <h3 className="font-metropolis font-bold text-lg text-neutral-900 dark:text-white flex items-center gap-2">
                                <motion.span
                                    className="w-1.5 h-6 rounded-full inline-block"
                                    animate={{
                                        backgroundColor: [
                                            'rgb(131, 179, 32)',
                                            'rgb(47, 195, 106)',
                                            'rgb(42, 169, 210)',
                                            'rgb(4, 112, 202)',
                                            'rgb(107, 10, 255)',
                                            'rgb(183, 0, 218)',
                                            'rgb(218, 0, 171)',
                                            'rgb(230, 64, 92)',
                                            'rgb(232, 98, 63)',
                                            'rgb(249, 129, 47)'
                                        ]
                                    }}
                                    transition={{
                                        duration: 10,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        ease: "linear"
                                    }}
                                />
                                {provider}
                            </h3>
                            <span className="text-xs font-mono text-neutral-400 bg-neutral-100 dark:bg-neutral-800 px-2 py-1 rounded-md">
                                {items.length} Produk
                            </span>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left font-google-sans">
                                <thead className="bg-neutral-50 dark:bg-neutral-950 text-xs uppercase text-neutral-500 font-medium">
                                    <tr>
                                        <th className="px-6 py-3 whitespace-nowrap">Kode</th>
                                        <th className="px-6 py-3 min-w-[200px]">Produk</th>
                                        <th className="px-6 py-3 whitespace-nowrap">Harga</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                                    {items.map((item, idx) => (
                                        <tr
                                            key={idx}
                                            className={cn(
                                                "hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors",
                                                idx % 2 === 0 ? "bg-white dark:bg-neutral-900" : "bg-neutral-50/30 dark:bg-neutral-900/50"
                                            )}
                                        >
                                            <td className="px-6 py-4 text-sm font-mono text-neutral-600 dark:text-neutral-400 font-semibold whitespace-nowrap">
                                                {item.code}
                                            </td>
                                            <td className="px-6 py-4 text-sm text-neutral-900 dark:text-neutral-200 font-medium">
                                                {item.product}
                                            </td>
                                            <td className="px-6 py-4 text-sm font-bold text-primary whitespace-nowrap">
                                                Rp {item.price}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </motion.div>
                ))
            ) : (
                <div className="text-center py-12 bg-white dark:bg-neutral-900 rounded-2xl border border-dashed border-neutral-200 dark:border-neutral-800">
                    <p className="text-neutral-500 dark:text-neutral-400">Tidak ada produk ditemukan</p>
                </div>
            )}
        </>
    );
});
