import { TextGenerateEffect } from '~/components/ui/text-generate-effect';
import FormatImage from '~/components/ui/formatImage';
import { cn } from '~/lib/utils';
import { ColourfulText } from '~/components/ui/colorfull-text';
import { MacbookScroll } from '~/components/ui/macbook-scroll';

const features = [
    {
        title: 'Dashboard Real-Time',
        description:
            'Pantau saldo, transaksi, dan performa penjualan secara langsung tanpa delay. Semua data tersaji dalam tampilan visual yang ringkas dan mudah dipahami.',
        image:
            'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2670&auto=format&fit=crop',
    },
    {
        title: 'Laporan Transaksi Lengkap',
        description:
            'Akses riwayat transaksi pulsa, PPOB, e-money, dan layanan lainnya dengan detail yang lengkap, tersusun rapi, dan siap untuk kebutuhan audit maupun evaluasi.',
        image:
            'https://images.unsplash.com/photo-1551033406-611cf9a28f67?q=80&w=2670&auto=format&fit=crop', // Reusing the good chart one or similar
    },
    {
        title: 'Rekap & Analisis Keuangan',
        description:
            'Lihat rekap harian, mingguan, hingga bulanan untuk membantu analisis arus kas, margin keuntungan, dan pertumbuhan bisnis secara menyeluruh.',
        image:
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
    },
    {
        title: 'Manajemen Agen & Jaringan',
        description:
            'Kelola data agen, master dealer, dan sub-agen dalam satu sistem terpusat. Pantau aktivitas, saldo, dan performa masing-masing jaringan dengan mudah.',
        image:
            'https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=2670&auto=format&fit=crop',
    },
    {
        title: 'Export Laporan Fleksibel',
        description:
            'Unduh laporan dalam berbagai format (Excel / CSV) untuk keperluan administrasi, pembukuan, atau integrasi dengan sistem internal perusahaan Anda.',
        image:
            'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop',
    },
    {
        title: 'Performa Cepat & Stabil',
        description:
            'Web report dibangun dengan infrastruktur yang andal, memastikan akses data tetap cepat dan stabil meski digunakan oleh banyak pengguna secara bersamaan.',
        image:
            'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop',
    },
];

export default function Features() {
    return (
        <div className="py-20 lg:py-40 max-w-7xl mx-auto container px-2 lg:px-0">
            <div className="px-8 mb-20">
                <h2 className="lg:text-4xl text-xl font-metropolis font-medium leading-tight max-w-lg">
                    Fitur unggulan <ColourfulText text="web report." />
                </h2>
                <TextGenerateEffect
                    className="text-lg md:text-xl mt-0 font-extralight dark:text-white font-google-sans text-primary leading-normal max-w-3xl"
                    words="Dirancang khusus untuk memaksimalkan produktivitas pengelolaan server pulsa dan loket pembayaran melalui perangkat Desktop/PC."
                />
            </div>

            <MacbookScroll
                src="/images/webreportgala.png"
                srcWebp="/images/webreportgala.png"
                alt="Web Report Dashboard"
                showGradient={false}
            />

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
                                    <FormatImage
                                        src={feature.image}
                                        // srcWebp={feature.image} // Removed to force simple img rendering
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
                            <h3 className="text-xl lg:text-2xl font-medium font-metropolis leading-tight dark:text-white">
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
    );
}
