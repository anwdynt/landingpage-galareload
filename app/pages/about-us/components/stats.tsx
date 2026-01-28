'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

function Counter({ end, duration = 2 }: { end: number; duration?: number }) {
    const [count, setCount] = useState(0);
    const [isInView, setIsInView] = useState(false);

    useEffect(() => {
        if (!isInView) return;

        let startTime: number;
        let animationFrame: number;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);

            setCount(Math.floor(progress * end));

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration, isInView]);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            onViewportEnter={() => setIsInView(true)}
        >
            {count.toLocaleString()}
        </motion.div>
    );
}

export default function AboutStats() {
    return (
        <section className="py-20 md:py-32 bg-gradient-to-br from-neutral-50 to-white dark:from-neutral-50 dark:to-white">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full bg-neutral-900/10 border border-neutral-900/20">
                        <div className="w-1.5 h-1.5 bg-neutral-900 rounded-full animate-pulse" />
                        <span className="text-xs font-semibold text-neutral-900 uppercase tracking-wider">Achievements</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
                        Pencapaian Kami
                    </h2>
                    <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                        Angka-angka yang membuktikan dedikasi kami untuk memberikan layanan terbaik
                    </p>
                </motion.div>

                {/* 2-Column Layout: Left Card + Right Stack */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
                    {/* LEFT: Large Card - 9 Years */}
                    <motion.div
                        className="relative group"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="p-0.75 relative cursor-pointer rounded-xl shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] transition-all duration-300">
                            <div className="relative bg-white rounded-[14px] p-8 flex flex-col justify-center items-center text-center">
                                {/* Large decorative background number */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-5 overflow-hidden">
                                    <div className="text-[200px] font-black leading-none">9</div>
                                </div>

                                <div className="relative z-10">
                                    <div className="text-7xl md:text-8xl font-black bg-gradient-to-b from-neutral-900 to-neutral-700 bg-clip-text text-transparent mb-4">
                                        <Counter end={9} />+
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
                                        Tahun Pengalaman
                                    </h3>
                                    <p className="text-base text-neutral-600">
                                        Melayani industri dengan dedikasi penuh sejak tahun 2015
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* RIGHT: Three Cards Stacked */}
                    <div className="space-y-6">
                        {[
                            {
                                value: 30000,
                                suffix: '+',
                                label: 'Member Aktif',
                                description: 'Di seluruh Indonesia'
                            },
                            {
                                value: 500000,
                                suffix: '+',
                                label: 'Transaksi Harian',
                                description: 'Diproses setiap hari'
                            },
                            {
                                value: 2500,
                                suffix: '+',
                                label: 'Produk Digital',
                                description: 'Tersedia di platform'
                            }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                className="relative group"
                                initial={{ opacity: 0, x: 30 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                            >
                                <div className="p-0.75 relative cursor-pointer rounded-xl shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] transition-all duration-300">
                                    <div className="relative bg-neutral-50 rounded-[14px] p-6">
                                        <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-neutral-900 to-neutral-700 bg-clip-text text-transparent mb-2">
                                            <Counter end={stat.value} />
                                            {stat.suffix}
                                        </div>
                                        <div className="text-lg font-bold text-neutral-900 mb-1">
                                            {stat.label}
                                        </div>
                                        <div className="text-sm text-neutral-600">
                                            {stat.description}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
