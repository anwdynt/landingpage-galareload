import { GlareCard } from '~/components/ui/glare-card';
import { ColourfulText } from '~/components/ui/colorfull-text';
import FormatImage from '~/components/ui/formatImage';

const data = [
    {
        category: 'Langkah 1',
        title: 'Download Aplikasi',
        src: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1470&auto=format&fit=crop',
        description: 'Unduh aplikasi Galareload gratis di Google Play Store dan install di smartphone Anda.',
        content: 'https://play.google.com/store/apps/details?id=com.galareload.app&hl=id',
    },
    {
        category: 'Langkah 2',
        title: 'Registrasi Mudah',
        src: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1470&auto=format&fit=crop',
        description: 'Cukup masukkan nomor HP active untuk mendaftar. Proses cepat tanpa syarat ribet.',
        content: 'https://play.google.com/store/apps/details?id=com.galareload.app&hl=id',
    },
    {
        category: 'Langkah 3',
        title: 'Isi Saldo (Deposit)',
        src: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?q=80&w=1470&auto=format&fit=crop',
        description: 'Top up saldo mulai Rp 50.000 via Transfer Bank, E-Wallet, atau Alfamart/Indomaret.',
        content: 'https://play.google.com/store/apps/details?id=com.galareload.app&hl=id',
    },
    {
        category: 'Langkah 4',
        title: 'Mulai Transaksi',
        src: 'https://images.unsplash.com/photo-1556740758-90de374c12ad?q=80&w=1470&auto=format&fit=crop',
        description: 'Pilih produk yang diinginkan dan lakukan transaksi. Raih keuntungan dari setiap penjualan.',
        content: 'https://play.google.com/store/apps/details?id=com.galareload.app&hl=id',
    },
];

export default function HowItWorks() {
    return (
        <section className="py-20 dark:bg-black/50 px-2 md:px-0">
            <div className="max-w-7xl mx-auto container">
                <div className="mb-12 text-center">
                    <h2 className="lg:text-4xl text-xl font-metropolis font-medium leading-tight mb-4">
                        Mulai bisnis dalam 4 langkah
                        <ColourfulText text="." />
                    </h2>
                    <p className="mx-auto max-w-5xl text-lg md:text-xl font-extralight font-google-sans text-primary leading-normal">
                        Proses mudah dan cepat untuk segera memulai bisnis digital Anda bersama kami.
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
                                    className="h-full w-full object-cover opacity-70"
                                />
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                            <div className="relative z-40 p-6 w-full">
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
