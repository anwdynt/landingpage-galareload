import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { ColourfulText } from '~/components/ui/colorfull-text';
import { Filter, FileSpreadsheet, Loader2 } from 'lucide-react';
import { useSearchParams } from 'react-router';
import { toast } from 'sonner';
import { Button } from '~/components/ui/button';
// Components
import { exportPriceList } from '~/client/api/pricing';
import { Sidebar } from './sidebar';
import { OperatorFilter } from './operator-filter';
import { ProductList } from './product-list';
import { MobileFilter } from './mobile-filter';

import type { ProductItem, IndexProps } from '~/types/pricing';

export function Index({ pricingData, categories, operators, activeCategory, activeOperator }: IndexProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const [isDownloading, setIsDownloading] = useState(false);

    // Group Products by Provider (from prop data) - Memoized
    const groupedData = useMemo(() => {
        return pricingData.reduce((acc, item) => {
            if (!acc[item.provider]) {
                acc[item.provider] = [];
            }
            acc[item.provider].push(item);
            return acc;
        }, {} as Record<string, ProductItem[]>);
    }, [pricingData]);

    const handleCategoryChange = useCallback((catId: string) => {
        setSearchParams(prev => {
            prev.set("category", catId);
            prev.delete("operator");
            return prev;
        });
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [setSearchParams]);

    const handleOperatorChange = useCallback((op: string) => {
        setSearchParams(prev => {
            prev.set("operator", op);
            return prev;
        });
    }, [setSearchParams]);

    const handleDownloadExcel = async () => {
        setIsDownloading(true);
        try {
            const response = await exportPriceList();
            console.log("Excel Export Response:", response);

            const data = response.data || response;
            const base64Content = data.base64 || (typeof data === 'string' ? data : null);

            const date = new Date();
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            const fileName = `harga_produk_galareload_${year}${month}${day}.xlsx`;

            const mimeType = data.mimeType || 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';

            if (base64Content) {
                const linkSource = `data:${mimeType};base64,${base64Content}`;
                const downloadLink = document.createElement("a");
                downloadLink.href = linkSource;
                downloadLink.download = fileName;
                document.body.appendChild(downloadLink);
                downloadLink.click();
                document.body.removeChild(downloadLink);
            } else {
                console.error("Base64 content missing in response", response);
                toast.error('Gagal mengunduh file: Data tidak valid.');
            }
        } catch (error) {
            console.error('Download error:', error);
            toast.error('Terjadi kesalahan saat mengunduh file.');
        } finally {
            setIsDownloading(false);
        }
    };

    // Prevent body scroll when drawer is open
    useEffect(() => {
        if (isFilterOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        }
    }, [isFilterOpen]);

    const activeCategoryName = categories.find(c => c.id === activeCategory)?.name || 'Semua Produk';

    return (
        <div className="w-full dark:bg-black min-h-screen py-24 px-4 md:px-8 relative">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-8 md:mb-12">
                    <h1 className="text-4xl md:text-5xl font-bold font-metropolis dark:text-white mb-4">
                        Daftar Harga Produk<ColourfulText text="." />
                    </h1>
                    <p className="text-neutral-600 dark:text-neutral-400 font-google-sans text-lg mx-auto mb-8">
                        Temukan harga terbaik untuk kebutuhan bisnis Anda. Update harga realtime dan termurah.
                    </p>

                    <div className="flex justify-center">
                        <Button
                            onClick={handleDownloadExcel}
                            disabled={isDownloading}
                            className="flex rounded-lg items-center gap-2 px-8 py-2 font-google-sans border-2 border-black dark:border-white uppercase bg-white text-black transition hover:bg-inherit cursor-pointer duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] active:translate-x-[5px] active:translate-y-[5px] active:shadow-none disabled:opacity-50 disabled:cursor-not-allowed disabled:shadow-none disabled:translate-x-[2px] disabled:translate-y-[2px]"
                        >
                            {isDownloading ? <Loader2 className="w-5 h-5 animate-spin" /> : <FileSpreadsheet className="w-5 h-5" />}
                            {isDownloading ? 'Mengunduh...' : 'Download Excel'}
                        </Button>
                    </div>

                    <div className="text-center text-xs text-neutral-400 dark:text-neutral-600 font-google-sans pt-8 pb-4">
                        *Harga dan status dapat berubah sewaktu-waktu tanpa pemberitahuan. <br />
                        Update terakhir: {new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 items-start">

                    <MobileFilter
                        isOpen={isFilterOpen}
                        setIsOpen={setIsFilterOpen}
                        activeCategory={activeCategory}
                        activeCategoryName={activeCategoryName}
                        activeOperator={activeOperator}
                        categories={categories}
                        operators={operators}
                        onCategoryChange={handleCategoryChange}
                        onOperatorChange={handleOperatorChange}
                    />
                    {/* Sidebar Navigation (Desktop) */}

                    <Sidebar
                        categories={categories}
                        activeCategory={activeCategory}
                        onCategoryChange={handleCategoryChange}
                    />

                    {/* Main Content Area */}
                    <div className="lg:col-span-3 space-y-6">

                        <OperatorFilter
                            operators={operators}
                            activeOperator={activeOperator}
                            onOperatorChange={handleOperatorChange}
                        />

                        <ProductList groupedData={groupedData} />
                    </div>
                </div>
            </div>
        </div >
    );
}