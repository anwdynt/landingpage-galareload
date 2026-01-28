'use client';
import { motion } from 'framer-motion';
import { BackgroundBeams } from '~/components/ui/background-beams';

export default function AboutHero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-white dark:bg-black">
            {/* Content */}
            <div className="relative z-10 max-w-5xl mx-auto px-6 py-24 text-center">
                {/* Badge */}
                <motion.div
                    className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-neutral-900/10 dark:bg-white/10 backdrop-blur-md border border-neutral-900/20 dark:border-white/20"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <div className="w-2 h-2 bg-neutral-900 dark:bg-white rounded-full animate-pulse" />
                    <span className="text-sm font-semibold text-neutral-900 dark:text-white uppercase tracking-wider">
                        Tentang Kami
                    </span>
                </motion.div>

                {/* Main Heading */}
                <motion.h1
                    className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-neutral-900 dark:text-white"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                >
                    Membangun Masa Depan{' '}
                    <span className="block mt-2 bg-gradient-to-r from-neutral-700 via-neutral-600 to-neutral-500 dark:from-neutral-300 dark:via-neutral-200 dark:to-neutral-100 bg-clip-text text-transparent">
                        Digital Bersama Anda
                    </span>
                </motion.h1>

                {/* Description */}
                <motion.p
                    className="text-lg sm:text-xl md:text-2xl text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto leading-relaxed mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Kami hadir sebagai partner terpercaya dalam transformasi digital bisnis Anda. Dengan pengalaman bertahun-tahun, kami memahami kebutuhan unik setiap klien.
                </motion.p>

                {/* Stats Quick View */}
                <motion.div
                    className="flex flex-wrap items-center justify-center gap-8 mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                >
                    {[
                        { value: '9+', label: 'Tahun Pengalaman' },
                        { value: '30K+', label: 'Member Aktif' },
                        { value: '500K+', label: 'Transaksi Harian' }
                    ].map((stat, index) => (
                        <div key={index} className="text-center">
                            <div className="text-3xl md:text-4xl font-bold text-neutral-900 dark:text-white mb-1">
                                {stat.value}
                            </div>
                            <div className="text-sm text-neutral-600 dark:text-neutral-400">
                                {stat.label}
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>

            {/* Background Beams */}
            <BackgroundBeams />
        </section>
    );
}
