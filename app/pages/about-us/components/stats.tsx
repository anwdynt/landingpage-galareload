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
    const stats = [
        {
            value: 9,
            suffix: '+',
            label: 'Tahun Pengalaman',
            description: 'Melayani industri sejak 2015'
        },
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
    ];

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
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full bg-primary/10 border border-primary/20">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-pulse" />
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Achievements</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
                        Pencapaian Kami
                    </h2>
                    <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                        Angka-angka yang membuktikan dedikasi kami untuk memberikan layanan terbaik
                    </p>
                </motion.div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            className="relative group bg-white dark:bg-white rounded-2xl p-8 border-2 border-neutral-200 hover:border-primary/50 transition-all duration-300 text-center"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -8 }}
                        >
                            {/* Hover gradient background */}
                            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl" />

                            <div className="relative">
                                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent mb-2">
                                    <Counter end={stat.value} />
                                    {stat.suffix}
                                </div>
                                <div className="text-lg font-semibold text-neutral-900 mb-1">
                                    {stat.label}
                                </div>
                                <div className="text-sm text-neutral-600">
                                    {stat.description}
                                </div>
                            </div>

                            {/* Decorative corner */}
                            <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-bl from-primary/10 to-transparent rounded-tr-2xl" />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
