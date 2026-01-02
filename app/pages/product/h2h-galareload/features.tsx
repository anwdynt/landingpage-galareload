import { TracingBeam } from '~/components/ui/tracing-beams';
import { ColourfulText } from '~/components/ui/colorfull-text';
import FormatImage from '~/components/ui/formatImage';
import { motion } from 'framer-motion';

const content = [
    {
        title: 'Infrastruktur Pusat & Jalur Aggregator',
        description: 'Terhubung langsung dengan biller utama tanpa perantara. Satu koneksi API membuka akses ke ribuan produk digital (Pulsa, PLN, E-Money) dengan response time < 1 detik. Efisiensi maksimal untuk bisnis Anda.',
        image: '/images/infra.png',
        imageWebp: '/images/infra.webp',
    },
    {
        title: 'Support Regex & Integrasi Tanpa Ribet',
        description: 'Format parsing regex siap pakai (Copy-Paste) untuk OtomaX, IRS, FM, dan software lainnya. Tim teknis support standby membantu proses integrasi sampai live. Tidak perlu pusing setting parsing manual.',
        image: '/images/support.png',
        imageWebp: '/images/support.webp',
    },
    {
        title: 'Keamanan Transaksi & Stok Nasional',
        description: 'Perlindungan enkripsi end-to-end dengan validasi IP. Sistem backup multi-supplier otomatis menjamin stok selalu tersedia (Anti-Kosong) 24/7. Transaksi aman, hati tenang.',
        image: '/images/security.png',
        imageWebp: '/images/security.webp',
    },
];

export default function Features() {
    return (
        <div className="w-full space-y-5 pt-20 pb-32 px-2 lg:px-0 relative">
            <motion.div
                className="max-w-7xl container mx-auto text-start mb-16"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <h2 className="lg:text-4xl text-xl font-metropolis font-medium leading-tight max-w-xl">
                    Mengapa memilih host to host Galareload<ColourfulText text="?" />
                </h2>
                <p className="text-primary font-google-sans font-light text-base lg:text-lg leading-relaxed max-w-4xl">
                    Infrastruktur andal yang dirancang khusus untuk kebutuhan server pulsa skala besar.
                </p>
            </motion.div>

            <TracingBeam className="mt-10">
                <div className="antialiased space-y-24">
                    {content.map((item, index) => {
                        const isEven = index % 2 === 0;

                        return (
                            <div
                                key={index}
                                className={`max-w-5xl ${isEven ? 'mr-auto' : 'ml-auto'}`}
                            >
                                <div className={`flex flex-col md:flex-row gap-8 items-center ${isEven ? '' : 'md:flex-row-reverse'}`}>
                                    {/* IMAGE */}
                                    <div className="flex-1 w-full relative group">
                                        <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-10 group-hover:opacity-20 blur-xl transition duration-500"></div>
                                        <FormatImage
                                            src={item.image}
                                            srcWebp={item.imageWebp}
                                            alt={item.title}
                                            className="rounded-2xl w-full h-64 md:h-80 object-cover shadow-2xl overflow-hidden relative border border-white/20"
                                        />
                                    </div>

                                    {/* TEXT */}
                                    <div className="flex-1 text-left space-y-4">
                                        <div className="h-1 w-12 bg-blue-500 rounded-full mb-2"></div>
                                        <h3 className="text-2xl md:text-3xl font-metropolis font-medium dark:text-white">
                                            {item.title}
                                        </h3>
                                        <p className="text-primary font-google-sans font-light text-base lg:text-lg leading-relaxed max-w-4xl">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </TracingBeam>
        </div>
    );
}
