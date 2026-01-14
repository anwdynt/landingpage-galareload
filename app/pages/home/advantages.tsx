import { TracingBeam } from '~/components/ui/tracing-beams';
import { ColourfulText } from '~/components/ui/colorfull-text';
import FormatImage from '~/components/ui/formatImage';
import { motion } from 'framer-motion';

const content = [
    {
        title: 'Dikembangkan Khusus untuk Menjawab Kebutuhan Konter',
        description:
            'Setiap fitur kami rancang berdasarkan kebutuhan operasional konter sehari-hari, mulai dari transaksi, pengelolaan produk, hingga pengembangan bisnis agar berjalan lebih mudah dan efisien.',
        image: '/images/advantages-needs.png',
        imageWebp: '/images/advantages-needs.png',
    },
    {
        title: 'Menjamin kelancaran Transaksi untuk Mendukung Pertumbuhan Konter',
        description:
            'Transaksi yang cepat dan stabil, ditambah kualitas produk yang terjaga, membuat operasional konter lebih efisien, minim kendala, dan siap mendukung bisnis Anda berkembang lebih besar.',
        image: '/images/advantages-transaction.png',
        imageWebp: '/images/advantages-transaction.png',
    },
    {
        title: 'Struktur Harga yang Transparan',
        description:
            'Kami menerapkan sistem harga yang jelas dan terbuka sejak awal, tanpa biaya tersembunyi. Setiap komponen biaya dijelaskan secara rinci, sehingga konter Anda tahu persis apa yang dibayar, layanan apa yang didapat, dan nilai yang diterima untuk mendukung operasional serta pertumbuhan bisnis.',
        image: '/images/advantages-pricing.png',
        imageWebp: '/images/advantages-pricing.png',
    },
    {
        title: 'Support Responsif & Berpengalaman',
        description:
            'Tim support kami siap membantu konter Anda selama 24 jam. Dengan respons cepat dan pemahaman yang kuat terhadap operasional konter, kami membantu menyelesaikan kendala dengan tepat agar transaksi tetap lancar dan bisnis terus berjalan.',
        image: '/images/advantages-support.png',
        imageWebp: '/images/advantages-support.png',
    },
    {
        title: 'Deposit Aman & Proses Cepat',
        description:
            'Proses deposit dirancang dengan sistem yang aman dan terkontrol, memastikan saldo masuk tepat waktu dan siap digunakan. Dengan alur yang jelas dan stabil, konter Anda dapat beroperasi tanpa khawatir gangguan deposit.',
        image: '/images/advantages-deposit.png',
        imageWebp: '/images/advantages-deposit.png',
    },
    {
        title: 'Jadilah Pemilik Aplikasi, Bangun Brand Sendiri',
        description:
            'Dengan solusi Whitelabel, Anda dapat mengelola jaringan Anda menggunakan aplikasi dengan brand sendiri untuk mendukung pertumbuhan bisnis yang lebih besar.',
        image: '/images/advantages-whitelabel.png',
        imageWebp: '/images/advantages-whitelabel.png',
    },
];

export default function Advantages() {
    return (
        <div className="w-full py-20 px-4 md:px-8 overflow-hidden">
            <motion.div
                className="max-w-7xl container mx-auto mb-20 text-center"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <h2 className="lg:text-4xl text-2xl font-metropolis font-bold leading-tight max-w-4xl mx-auto mb-6">
                    Partner teknologi yang tumbuh bersama bisnis anda
                    <ColourfulText text="." />
                </h2>
                <p className="text-lg md:text-xl font-light dark:text-gray-300 text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                    Dengan pendekatan layanan yang fleksibel, personal, dan
                    berorientasi jangka panjang, kami mendukung setiap tahap
                    pertumbuhan bisnis Anda.
                </p>
            </motion.div>

            <TracingBeam className="px-6">
                <div className="max-w-7xl mx-auto flex flex-col space-y-24 relative pb-10">
                    {content.map((item, index) => (
                        <div
                            key={index}
                            className={`flex flex-col md:flex-row items-center gap-12 lg:gap-24 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''
                                }`}
                        >
                            {/* Image Section */}
                            <div className="flex-1 w-full relative group perspective-1000">
                                <div className="absolute -inset-4 bg-gradient-to-r from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 rounded-[2rem]" />
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl transform transition-transform duration-500 group-hover:scale-[1.02] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                                    <div className="aspect-[4/3] w-full overflow-hidden">
                                        <FormatImage
                                            src={item.image}
                                            srcWebp={item.imageWebp}
                                            alt={item.title}
                                            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Text Section */}
                            <div className="flex-1 space-y-6">
                                <div className="inline-block px-4 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
                                    <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">
                                        0{index + 1}
                                    </span>
                                </div>
                                <h3 className="text-2xl lg:text-3xl font-bold font-metropolis leading-tight text-neutral-900 dark:text-white">
                                    {item.title}
                                </h3>
                                <p className="text-lg text-neutral-600 dark:text-neutral-400 font-google-sans leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </TracingBeam>
        </div>
    );
}
