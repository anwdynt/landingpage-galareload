'use client';
import { motion } from 'framer-motion';

export default function AboutStory() {
    return (
        <section className="py-20 md:py-32 bg-white dark:bg-neutral-50">
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
                        <span className="text-xs font-semibold text-primary uppercase tracking-wider">Our Story</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-neutral-900 mb-4">
                        Perjalanan Kami
                    </h2>
                </motion.div>

                {/* Story Grid */}
                <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Image */}
                    <motion.div
                        className="relative"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                            <img
                                src="/images/about/company-story.png"
                                alt="Gala Reload Team Collaboration"
                                className="w-full h-auto"
                            />
                        </div>
                        {/* Decorative element */}
                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full blur-3xl -z-10" />
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-pink-500/20 to-primary/20 rounded-full blur-3xl -z-10" />
                    </motion.div>

                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="space-y-6">
                            <h3 className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-neutral-900">
                                Cerita Kami
                            </h3>

                            <div className="space-y-4 text-lg text-neutral-600 dark:text-neutral-700 leading-relaxed">
                                <p>
                                    Didirikan pada tahun <strong className="text-neutral-900 font-semibold">2015</strong>, kami lahir dari visi untuk membantu bisnis Indonesia bertransformasi digital. Dimulai dari tim kecil yang passionate tentang teknologi, kini kami telah melayani lebih dari <strong className="text-neutral-900 font-semibold">30,000 member</strong> di seluruh Indonesia.
                                </p>
                                <p>
                                    Perjalanan kami dipenuhi dengan inovasi, dedikasi, dan komitmen untuk memberikan yang terbaik bagi setiap klien. Setiap proyek adalah kesempatan baru untuk menciptakan solusi yang meaningful dan impactful.
                                </p>
                                <p className="text-primary font-medium italic">
                                    "Fondasi yang kuat membangun kepercayaan dan kesuksesan bersama."
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
