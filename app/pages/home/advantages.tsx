import { TracingBeam } from '~/components/ui/tracing-beams';
import { ColourfulText } from '~/components/ui/colorfull-text';
import FormatImage from '~/components/ui/formatImage';
import { motion } from 'framer-motion';

const content = [
    {
        title: 'UI Sederhana, Transaksi Cepat Tanpa Ribet',
        description:
            'Dengan tampilan antarmuka yang intuitif dan modern, Gala Reload dirancang agar mudah digunakan oleh siapa pun. Proses transaksi jadi lebih cepat, minim kesalahan, dan efisien—membantu pemula langsung jalan dan profesional bekerja lebih produktif setiap hari.',
        image: '/images/feature-ui.png',
        imageWebp: '/images/feature-ui.png',
    },
    {
        title: 'Fitur Transaksi Favorit untuk Transaksi Berulang',
        description:
            'Fitur Transaksi Favorit di Gala Reload memungkinkan Anda menyimpan produk dan nomor tujuan yang sering digunakan. Dengan sekali klik, transaksi dapat dilakukan lebih cepat, praktis, dan minim kesalahan input, sehingga operasional konter menjadi lebih efisien dan pelayanan ke pelanggan semakin optimal.',
        image: '/images/feature-favorite.png',
        imageWebp: '/images/feature-favorite.png',
    },
    {
        title: 'Fitur Transaksi Terjadwal, Otomatis & Tepat Waktu',
        description:
            'Fitur Transaksi Terjadwal di Gala Reload membantu Anda menjadwalkan pengisian pulsa atau PPOB secara otomatis sesuai waktu yang ditentukan. Tanpa perlu input ulang, transaksi tetap berjalan tepat waktu, lebih terkontrol, dan mendukung operasional konter agar tetap lancar dan profesional.',
        image: '/images/feature-scheduled.png',
        imageWebp: '/images/feature-scheduled.png',
    },
    {
        title: 'Custom Struk Penjualan untuk Maksimalkan Omzet',
        description:
            'Fitur custom struk penjualan di Gala Reload memungkinkan Anda menampilkan nama konter, promo, hingga kontak usaha langsung di struk transaksi. Setiap struk menjadi media promosi gratis yang meningkatkan kepercayaan pelanggan, memperkuat branding, dan mendorong penjualan ulang secara konsisten.',
        image: '/images/feature-receipt.png',
        imageWebp: '/images/feature-receipt.png',
    },
    {
        title: 'Catatan Piutang, Arus Kas Tetap Aman',
        description:
            'Fitur Catatan Piutang di Gala Reload membantu Anda mencatat transaksi hutang pelanggan secara otomatis dan terstruktur. Pantau pelanggan yang belum bayar, jumlah piutang, serta riwayat pembayaran dengan mudah agar keuangan konter lebih terkontrol.',
        image: '/images/feature-piutang.png',
        imageWebp: '/images/feature-piutang.png',
    },
    {
        title: 'Fitur Keuangan, Omzet & Keuntungan Terukur',
        description:
            'Fitur keuangan di Gala Reload membantu Anda menghitung omzet secara otomatis dan real-time dari seluruh transaksi. Tanpa hitung manual dan tanpa risiko salah catat, performa konter bisa dipantau dengan jelas untuk pengambilan keputusan bisnis yang lebih cepat.',
        image: '/images/feature-finance.png',
        imageWebp: '/images/feature-finance.png',
    },
    {
        title: 'Web Report Canggih, Kontrol dari Jarak Jauh',
        description:
            'Kelola bisnis dengan lebih leluasa melalui PC atau laptop. Pantau jaringan agen, cek mutasi saldo secara detail, dan unduh laporan keuangan lengkap kapan saja melalui dashboard Web Report Gala Reload yang informatif dan mudah digunakan.',
        image: '/images/feature-webreport.png',
        imageWebp: '/images/feature-webreport.png',
    },
    {
        title: 'Double Report Transaksi via Email',
        description:
            'Fitur double report transaksi di Gala Reload secara otomatis mengirim laporan transaksi ke email pemilik konter. Data tetap aman, mudah dicek kapan saja, dan membantu pemilik memantau penjualan tanpa harus selalu membuka aplikasi.',
        image: '/images/feature-email-report.png',
        imageWebp: '/images/feature-email-report.png',
    },
];


export default function Advantages() {
    return (
        <div className="w-full py-20 px-4 md:px-8 overflow-hidden">
            <motion.div
                className="max-w-7xl mx-auto container mb-20"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <h2 className="lg:text-4xl text-xl font-metropolis font-medium leading-tight max-w-5xl">
                    Partner teknologi yang tumbuh bersama bisnis anda
                    <ColourfulText text="." />
                </h2>
                <p className="text-lg md:text-xl font-light dark:text-gray-300 text-neutral-600 max-w-3xl leading-relaxed">
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
