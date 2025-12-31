import { ContainerScroll } from '~/components/ui/container-scroll-animation';
import FormatImage from '~/components/ui/formatImage';
import { ColourfulText } from '~/components/ui/colorfull-text';
import { motion } from 'framer-motion';

const features = [
    {
        title: 'UI Sederhana & Mudah Digunakan',
        description:
            'Dirancang dengan antarmuka yang intuitif dan modern, Galareload memudahkan siapa pun baik pemula maupun profesional untuk mengelola transaksi dengan cepat, efisien, dan tanpa proses yang rumit.',
        image:
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
    },
    {
        title: 'Fitur Lengkap dalam Satu Aplikasi',
        description:
            'Mulai dari isi ulang pulsa & paket data, top up e-money, pembayaran PPOB, hingga pengelolaan jaringan agen—semua tersedia dalam satu platform terintegrasi tanpa perlu aplikasi tambahan.',
        image:
            'https://images.unsplash.com/photo-1661956602116-aa6865609028?q=80&w=2664&auto=format&fit=crop',
    },
    {
        title: 'Transaksi Cepat & Stabil',
        description:
            'Didukung sistem server yang andal dan koneksi real-time, setiap transaksi diproses dengan cepat dan akurat, memastikan pengalaman pengguna yang lancar kapan pun dibutuhkan.',
        image:
            'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop',
    },
    {
        title: 'Manajemen Bisnis yang Fleksibel',
        description:
            'Pantau saldo, riwayat transaksi, laporan penjualan, dan performa agen secara real-time langsung dari aplikasi, membantu Anda mengambil keputusan bisnis dengan lebih tepat.',
        image:
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
    },
    {
        title: 'Aman & Terpercaya',
        description:
            'Setiap transaksi dilindungi dengan sistem keamanan berlapis untuk menjaga data dan saldo Anda tetap aman, sehingga Anda dapat fokus mengembangkan bisnis tanpa rasa khawatir.',
        image:
            'https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1470&auto=format&fit=crop',
    },
    {
        title: 'Siap Tumbuh Bersama Bisnis Anda',
        description:
            'Baik untuk penggunaan personal, agen, hingga skala enterprise, Galareload dirancang scalable dan siap mendukung pertumbuhan bisnis Anda dari waktu ke waktu.',
        image:
            'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2670&auto=format&fit=crop',
    },
    {
        title: 'Dukungan Web Report Canggih',
        description:
            'Kelola bisnis lebih leluasa melalui PC/Laptop. Pantau jaringan agen, cek mutasi saldo, dan unduh laporan keuangan komprehensif via dashboard Web Report yang informatif.',
        image:
            'https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=2670&auto=format&fit=crop',
    },
];


export default function Features() {
    return (
        <div className='max-w-7xl mx-auto container py-20 px-2 lg:px-0'>
            <div className="flex flex-col bg-white dark:bg-black overflow-hidden relative">
                <motion.div
                    className="mb-10"
                    initial={{ opacity: 0, x: -60 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: 'easeOut' }}
                >
                    {' '}
                    <h2 className="lg:text-4xl text-xl font-metropolis font-medium leading-tight max-w-lg">
                        {' '}
                        Semua fitur penting, dalam satu aplikasi
                        <ColourfulText text="." />{' '}
                    </h2>{' '}
                    <p className="text-lg md:text-xl mt-0 font-extralight dark:text-white text-left font-google-sans text-primary leading-normal max-w-5xl">
                        Kelola transaksi, agen, dan laporan bisnis dengan mudah, cepat, dan aman.
                    </p>
                </motion.div>

                <div className="flex flex-col mb-32 mt-0">
                    <ContainerScroll
                        titleComponent={<></>}
                    >
                        <div className="h-full w-full flex items-center justify-center">
                            <FormatImage
                                src="/images/app-galareload.png"
                                srcWebp="/images/app-galareload.webp"
                                alt="App Dashboard"
                                className="h-full w-auto object-contain"
                            />
                        </div>
                    </ContainerScroll>
                </div>

                <div className="flex flex-col space-y-24">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`flex flex-col md:flex-row items-center gap-12 lg:gap-24 ${index % 2 === 1 ? 'md:flex-row-reverse' : ''
                                }`}
                        >
                            <div className="flex-1 w-full relative group perspective-1000">
                                <div className="absolute -inset-4 bg-gradient-to-r from-neutral-100 to-neutral-200 dark:from-neutral-800 dark:to-neutral-900 opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 rounded-[2rem]" />
                                <div className="relative rounded-3xl overflow-hidden shadow-2xl transform transition-transform duration-500 group-hover:scale-[1.02] bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
                                    <div className="aspect-[4/3] w-full overflow-hidden">
                                        <img
                                            src={feature.image}
                                            alt={feature.title}
                                            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="flex-1 space-y-6">
                                <div className="inline-block px-4 py-1.5 rounded-full border border-neutral-200 dark:border-neutral-800 bg-neutral-50 dark:bg-neutral-900">
                                    <span className="text-sm font-semibold text-neutral-600 dark:text-neutral-400">
                                        0{index + 1}
                                    </span>
                                </div>
                                <h3 className="text-xl lg:text-2xl font-medium font-metropolis leading-tight">
                                    {feature.title}
                                </h3>
                                <p className="text-lg text-neutral-600 dark:text-neutral-400 font-google-sans leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
