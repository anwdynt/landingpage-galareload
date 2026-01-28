import { motion } from 'framer-motion';
import FormatImage from '~/components/ui/formatImage';

export default function AboutMissionVision() {
    return (
        <section className="py-20 md:py-32 bg-neutral-50 dark:bg-neutral-50 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-neutral-200/30 to-transparent rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-neutral-300/30 to-transparent rounded-full blur-3xl" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
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
                        <span className="text-xs font-semibold text-neutral-900 uppercase tracking-wider">Mission & Vision</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
                        Visi & Misi Kami
                    </h2>
                    <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                        Fondasi yang mengarahkan setiap langkah dan keputusan kami
                    </p>
                </motion.div>

                {/* Vision Section */}
                <motion.div
                    className="mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Vision Content */}
                        <div className="order-2 md:order-1">
                            <h3 className="text-3xl font-bold text-neutral-900 mb-6">Visi Kami</h3>
                            <p className="text-lg text-neutral-600 leading-relaxed mb-6">
                                Menjadi <strong className="text-neutral-900">enabler ekosistem digital terdepan di Indonesia</strong> yang menghubungkan teknologi finansial dengan kebutuhan nyata masyarakat, mendorong inklusi keuangan dan pemberdayaan ekonomi digital.
                            </p>
                            <div className="flex flex-wrap gap-3">
                                <span className="px-4 py-2 bg-neutral-900/10 text-neutral-900 rounded-full text-sm font-medium border border-neutral-900/20">
                                    Digital Ecosystem
                                </span>
                                <span className="px-4 py-2 bg-neutral-800/10 text-neutral-800 rounded-full text-sm font-medium border border-neutral-800/20">
                                    Financial Inclusion
                                </span>
                                <span className="px-4 py-2 bg-neutral-700/10 text-neutral-700 rounded-full text-sm font-medium border border-neutral-700/20">
                                    Economic Empowerment
                                </span>
                            </div>
                        </div>

                        {/* Vision Image/Visual */}
                        <div className="order-1 md:order-2">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-neutral-300/40 to-neutral-400/40 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
                                <div className="relative bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-3xl border-2 border-neutral-200 group-hover:border-neutral-300 transition-all duration-300">
                                    <FormatImage
                                        src="/images/about/vision.png"
                                        alt="Vision"
                                        className="w-full h-64 object-cover rounded-2xl"
                                    />
                                    {/* Overlay badge */}
                                    <div className="absolute top-12 right-12 bg-white px-4 py-2 rounded-full shadow-lg border border-neutral-200">
                                        <span className="text-neutral-900 font-bold">2030 Vision</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                {/* Divider */}
                <div className="flex items-center justify-center my-16">
                    <div className="h-px bg-gradient-to-r from-transparent via-neutral-300 to-transparent w-full max-w-md" />
                </div>

                {/* Mission Section */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        {/* Mission Image/Visual */}
                        <div className="order-1">
                            <div className="relative group">
                                <div className="absolute inset-0 bg-gradient-to-br from-neutral-400/40 to-neutral-300/40 rounded-3xl blur-2xl group-hover:blur-3xl transition-all duration-500" />
                                <div className="relative bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-3xl border-2 border-neutral-200 group-hover:border-neutral-300 transition-all duration-300">
                                    <FormatImage
                                        src="/images/about/mission.png"
                                        alt="Mission"
                                        className="w-full h-64 object-cover rounded-2xl"
                                    />
                                    {/* Overlay badge */}
                                    <div className="absolute bottom-12 left-12 bg-white px-4 py-2 rounded-full shadow-lg border border-neutral-200">
                                        <span className="text-neutral-900 font-bold">Our Mission</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Mission Content */}
                        <div className="order-2">
                            <h3 className="text-3xl font-bold text-neutral-900 mb-8">Misi Kami</h3>

                            <div className="space-y-6">
                                {[
                                    {
                                        number: '01',
                                        title: 'Infrastruktur Terpercaya',
                                        desc: 'Menyediakan server yang stabil, aman, dan terpercaya'
                                    },
                                    {
                                        number: '02',
                                        title: 'Layanan Responsif',
                                        desc: 'Memberikan customer service yang cepat dan solusi tepat'
                                    },
                                    {
                                        number: '03',
                                        title: 'Inovasi Berkelanjutan',
                                        desc: 'Mengembangkan produk dan fitur yang lebih baik'
                                    }
                                ].map((mission, index) => (
                                    <motion.div
                                        key={index}
                                        className="relative overflow-visible group "
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.5, delay: index * 0.1 }}
                                    >
                                        {/* Button-style wrapper with border glow */}
                                        <div className="p-0.75 relative cursor-pointer rounded-xl shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] transition-all duration-300">
                                            {/* Animated border glow on hover */}

                                            {/* Content card */}
                                            <div className="relative bg-white rounded-[14px] p-6">
                                                {/* Number Badge */}
                                                <div className="inline-flex items-center justify-center w-12 h-12 bg-neutral-900 text-white rounded-xl font-bold text-lg mb-4">
                                                    {mission.number}
                                                </div>

                                                {/* Title */}
                                                <h4 className="text-xl font-bold text-neutral-900 mb-2">
                                                    {mission.title}
                                                </h4>

                                                {/* Description */}
                                                <p className="text-neutral-600 leading-relaxed">
                                                    {mission.desc}
                                                </p>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
