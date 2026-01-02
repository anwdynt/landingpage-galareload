import { GlareCard } from '~/components/ui/glare-card';
import { ColourfulText } from '~/components/ui/colorfull-text';
import FormatImage from '~/components/ui/formatImage';

const data = [
    {
        category: 'Langkah 1',
        title: 'Daftar Layanan',
        src: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?q=80&w=1470&auto=format&fit=crop',
        description: 'Hubungi tim sales kami untuk konsultasi paket dan pendaftaran layanan White Label.',
    },
    {
        category: 'Langkah 2',
        title: 'Setup Branding',
        src: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=1470&auto=format&fit=crop',
        description: 'Kirimkan logo, nama aplikasi, dan skema warna yang Anda inginkan.',
    },
    {
        category: 'Langkah 3',
        title: 'Proses Develop',
        src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1470&auto=format&fit=crop',
        description: 'Tim teknis kami akan membangun aplikasi dan mengurus perizinan upload.',
    },
    {
        category: 'Langkah 4',
        title: 'Siap Mengudara',
        src: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1415&auto=format&fit=crop',
        description: 'Aplikasi rilis di Google Play Store dan Anda siap menerima transaksi member.',
    },
];

export default function HowItWorks() {
    return (
        <section className="py-20 dark:bg-black/50 px-2 md:px-0">
            <div className="max-w-7xl mx-auto container">
                <div className="mb-12 text-center">
                    <h2 className="lg:text-4xl text-xl font-metropolis font-medium leading-tight mb-4">
                        Punya brand sendiri dalam 4 langkah
                        <ColourfulText text="." />
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg md:text-xl font-extralight font-google-sans text-primary leading-normal">
                        Proses transformasi bisnis konter menjadi perusahaan digital profesional.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 justify-items-center">
                    {data.map((card, index) => (
                        <GlareCard key={index} className="flex flex-col items-start justify-end relative">
                            <div className="absolute top-4 right-4 z-40 bg-black dark:bg-white text-white dark:text-black font-bold h-10 w-10 flex items-center justify-center rounded-full shadow-lg">
                                {index + 1}
                            </div>
                            <div className="h-full w-full absolute inset-0">
                                <FormatImage
                                    src={card.src}
                                    srcWebp={card.src}
                                    alt={card.title}
                                    className="h-full w-full object-cover opacity-80"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                            <div className="relative z-40 p-6 w-full text-left">
                                <p className="text-white text-sm font-medium font-sans mb-1 opacity-80">
                                    {card.category}
                                </p>
                                <h3 className="text-white text-2xl font-bold font-metropolis mb-2">
                                    {card.title}
                                </h3 >
                                <p className="text-neutral-200 text-sm font-light font-google-sans leading-relaxed">
                                    {card.description}
                                </p>
                            </div>
                        </GlareCard>
                    ))}
                </div>
            </div>
        </section>
    );
}
