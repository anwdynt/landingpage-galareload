import { TracingBeam } from '~/components/ui/tracing-beams';
import { ColourfulText } from '~/components/ui/colorfull-text';
import FormatImage from '~/components/ui/formatImage';
import { motion } from 'framer-motion';

const content = [
    {
        title: 'Keamanan Data & Transaksi Terjamin',
        description:
            'Kami menerapkan standar keamanan yang ketat untuk melindungi data dan transaksi bisnis Anda. Setiap proses dirancang untuk menjaga integritas sistem serta memberikan rasa aman dalam menjalankan operasional harian.',
        image: '/images/security.png',
        imageWebp: '/images/security.webp',
    },
    {
        title: 'Pendekatan Solusi yang Personal',
        description:
            'Setiap bisnis memiliki kebutuhan yang berbeda. Oleh karena itu, kami menghadirkan pendekatan layanan yang disesuaikan, memberikan solusi yang relevan dan tepat guna sesuai dengan model dan tujuan bisnis Anda.',
        image: '/images/personal.png',
        imageWebp: '/images/personal.webp',
    },
    {
        title: 'Infrastruktur Stabil & Andal',
        description:
            'Platform Galareload dibangun di atas infrastruktur yang stabil dan teruji, dirancang untuk menangani transaksi dalam volume tinggi dengan performa yang konsisten. Hal ini memastikan operasional bisnis Anda berjalan lancar, aman, dan dapat diandalkan setiap waktu.',
        image: '/images/infra.png',
        imageWebp: '/images/infra.webp',
    },
    {
        title: 'Struktur Harga yang Transparan',
        description:
            'Kami menerapkan struktur harga yang jelas dan terbuka sejak awal kerja sama, tanpa biaya tersembunyi atau komponen yang tidak dijelaskan. Setiap biaya disampaikan secara rinci agar Anda memahami dengan pasti apa yang dibayarkan, layanan apa yang diterima, serta nilai yang diperoleh untuk mendukung kebutuhan dan pertumbuhan bisnis Anda.',
        image: '/images/price.png',
        imageWebp: '/images/price.webp',
    },
    {
        title: 'Support Responsif & Berpengalaman',
        description:
            'Layanan support kami hadir 24 jam tanpa henti, memberikan pendampingan profesional dengan standar tinggi. Melalui respons yang cepat, analisis yang akurat, dan komunikasi yang jelas, kami membantu menjaga kontinuitas operasional dan mendukung pertumbuhan bisnis Anda secara berkelanjutan.',
        image: '/images/support.png',
        imageWebp: '/images/support.webp',
    },
    {
        title: 'Pendampingan Onboarding & Training',
        description:
            'Kami mendampingi setiap tahap implementasi melalui onboarding dan pelatihan yang terarah, memastikan pemahaman sistem yang mendalam serta kesiapan operasional yang selaras dengan kebutuhan dan skala bisnis Anda.',
        image: '/images/onboarding.png',
        imageWebp: '/images/onboarding.webp',
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
                                className={`max-w-3xl ${
                                    isEven ? 'mr-auto' : 'ml-auto'
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
