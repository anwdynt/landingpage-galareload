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
        <div className="w-full space-y-5 pt-20 pb-32 px-2 lg:px-0">
            {' '}
            <motion.div
                className="max-w-7xl container mx-auto"
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                {' '}
                <h2 className="lg:text-4xl text-xl font-metropolis font-medium leading-tight max-w-2xl">
                    {' '}
                    Partner teknologi yang tumbuh bersama bisnis anda{' '}
                    <ColourfulText text="." />{' '}
                </h2>{' '}
                <p className="text-lg md:text-xl mt-0 font-extralight dark:text-white text-left font-google-sans text-primary leading-normal max-w-5xl">
                    Dengan pendekatan layanan yang fleksibel, personal, dan
                    berorientasi jangka panjang, kami mendukung setiap tahap
                    pertumbuhan bisnis Anda.
                </p>
            </motion.div>
            <TracingBeam className="mt-16">
                <div className="antialiased space-y-16">
                    {content.map((item, index) => {
                        const isEven = index % 2 === 0;

                        return (
                            <div
                                key={index}
                                className={`max-w-3xl ${isEven ? 'mr-auto' : 'ml-auto'
                                    }`}
                            >
                                <div className="flex flex-col gap-6 items-center ">
                                    {/* IMAGE */}
                                    <FormatImage
                                        src={item.image}
                                        srcWebp={item.imageWebp}
                                        alt={item.title}
                                        className="rounded-xl w-120 h-80 object-cover shadow-lg"
                                    />

                                    {/* TEXT */}
                                    <div className="text-left">
                                        <h3 className="text-lg lg:text-xl font-metropolis font-medium mb-3">
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
