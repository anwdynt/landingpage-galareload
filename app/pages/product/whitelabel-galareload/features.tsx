import { TracingBeam } from '~/components/ui/tracing-beams';
import { ColourfulText } from '~/components/ui/colorfull-text';
import FormatImage from '~/components/ui/formatImage';
import { motion } from 'framer-motion';

const content = [
    {
        title: 'Full Custom Branding',
        description:
            'Identitas bisnis Anda sepenuhnya milik Anda. Gunakan Nama Aplikasi, Logo, Warna Tema, hingga Contact Support atas nama brand Anda sendiri. Kami bekerja di balik layar, pelanggan Anda hanya mengenal Anda.',
        image: '/images/whitelabel/branding.png',
    },
    {
        title: 'Sistem Serba Otomatis',
        description:
            'Lupakan ribetnya mengurus stok dan server. Sistem kami bekerja 24/7 jam auto-pilot menangani ribuan transaksi, update produk, hingga laporan keuangan secara real-time tanpa perlu intervensi manual.',
        image: '/images/whitelabel/system.png',
    },
    {
        title: 'Potensi Cashback 100%',
        description:
            'Investasi Anda aman. Kami memberikan garansi pengembalian biaya setup 100% jika bisnis Anda mencapai target transaksi tertentu dalam 6 bulan pertama. Bisnis tanpa resiko!',
        image: '/images/whitelabel/cashback.png',
    },
    {
        title: 'Keamanan Level Bank',
        description:
            'Ketenangan pikiran adalah prioritas. Data dan saldo Anda dilindungi enkripsi tingkat tinggi, sistem proteksi ganda, dan backup data harian otomatis di server cloud terpercaya.',
        image: '/images/whitelabel/security.png',
    },
    {
        title: 'Produk Digital Lengkap',
        description:
            'Tersedia ribuan SKU produk siap jual: Pulsa All Operator, Paket Data, Token PLN, E-Wallet, Voucher Game, hingga PPOB. Semua stok dikelola oleh kami, Anda tinggal jualan.',
        image: '/images/whitelabel/products.png',
    },
    {
        title: 'Support Prioritas',
        description:
            'Anda tidak berjalan sendiri. Tim teknis dan Customer Service kami siap membantu kendala operasional Anda. Dukungan penuh untuk memastikan bisnis Anda berjalan lancar.',
        image: '/images/whitelabel/support.png',
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
                <h2 className="lg:text-4xl text-xl font-metropolis font-medium leading-tight max-w-md">
                    Kenapa memilih white label kami<ColourfulText text="?" />
                </h2>
                <p className="text-neutral-600 dark:text-neutral-400 max-w-2xl font-google-sans text-lg">
                    Platform yang didesain untuk pertumbuhan, efisiensi, dan skalabilitas bisnis Anda.
                </p>
            </motion.div>

            <TracingBeam className="mt-10">
                <div className="antialiased space-y-24">
                    {content.map((item, index) => {
                        const isEven = index % 2 === 0;

                        return (
                            <div
                                key={index}
                                className={`max-w-5xl ${isEven ? 'mr-auto' : 'ml-auto'
                                    }`}
                            >
                                <div className={`flex flex-col md:flex-row gap-8 items-center ${isEven ? '' : 'md:flex-row-reverse'
                                    }`}>
                                    {/* IMAGE */}
                                    <div className="flex-1 w-full relative group">
                                        <div className="absolute -inset-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl opacity-10 group-hover:opacity-20 blur-xl transition duration-500"></div>
                                        <FormatImage
                                            src={item.image}
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
