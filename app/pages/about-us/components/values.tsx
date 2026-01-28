'use client';
import { motion } from 'framer-motion';

export default function AboutValues() {
    const values = [
        {
            number: "01",
            title: "Inovasi Berkelanjutan",
            description: "Kami terus mengembangkan teknologi terbaru untuk memberikan solusi yang lebih baik dan efisien bagi mitra kami."
        },
        {
            number: "02",
            title: "Kepercayaan & Transparansi",
            description: "Membangun hubungan jangka panjang melalui kejujuran, transparansi, dan komitmen terhadap kesuksesan bersama."
        },
        {
            number: "03",
            title: "Pertumbuhan Bersama",
            description: "Kesuksesan kami adalah kesuksesan mitra kami. Kami berkomitmen untuk tumbuh dan berkembang bersama."
        },
        {
            number: "04",
            title: "Layanan Terbaik",
            description: "Support responsif 24/7 dengan tim yang memahami kebutuhan bisnis dan siap membantu kapan pun dibutuhkan."
        }
    ];

    return (
        <section className="py-24 md:py-32 bg-white dark:bg-neutral-950">
            <div className="max-w-7xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-6 rounded-full bg-neutral-900/10 dark:bg-white/10 border border-neutral-900/20 dark:border-white/20">
                        <div className="w-1.5 h-1.5 bg-neutral-900 dark:bg-white rounded-full animate-pulse" />
                        <span className="text-xs font-semibold text-neutral-900 dark:text-white uppercase tracking-wider">Our Values</span>
                    </div>

                    <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-6">
                        Nilai-Nilai Kami
                    </h2>
                    <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                        Prinsip yang menjadi fondasi setiap langkah kami
                    </p>
                </motion.div>

                {/* Values Grid */}
                <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                    {values.map((value, index) => (
                        <motion.div
                            key={index}
                            className="group relative bg-neutral-50 dark:bg-neutral-900 p-8 lg:p-10 rounded-3xl border-2 border-transparent hover:border-neutral-900 dark:hover:border-white transition-all duration-300 overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                        >
                            {/* Gradient background on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                            {/* Content */}
                            <div className="relative flex items-start gap-6">
                                <div className="text-7xl font-bold bg-gradient-to-br from-neutral-300 to-neutral-400 dark:from-neutral-700 dark:to-neutral-600 bg-clip-text text-transparent group-hover:from-neutral-400 group-hover:to-neutral-500 dark:group-hover:from-neutral-600 dark:group-hover:to-neutral-500 transition-all duration-300 select-none">
                                    {value.number}
                                </div>
                                <div className="flex-1 pt-2">
                                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-4 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors duration-300">
                                        {value.title}
                                    </h3>
                                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
