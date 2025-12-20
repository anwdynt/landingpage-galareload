import { motion } from 'framer-motion';
import { ColourfulText } from '~/components/ui/colorfull-text';
import { AnimatedTestimonials } from '~/components/ui/animated-testimonials';
export default function Testimoni() {
    const testimonials = [
        {
            quote: 'Galareload membantu kami membangun jaringan master dealer dengan sistem yang stabil dan mudah dikelola. Operasional jadi jauh lebih rapi dan terkontrol.',
            name: 'Andi Pratama',
            designation: 'Owner Server Pulsa – Jawa Barat',
            src: '/images/people.png',
        },
        {
            quote: 'Sejak menggunakan sistem whitelabel dari Galareload, kami bisa fokus membesarkan brand sendiri tanpa ribet teknis. Support-nya cepat dan solutif.',
            name: 'Rizky Maulana',
            designation: 'Founder Digital Payment Network',
            src: '/images/people.png',
        },
        {
            quote: 'Koneksi host to host berjalan stabil meskipun trafik transaksi meningkat. Platform ini cocok untuk bisnis yang ingin scale dengan aman.',
            name: 'Budi Santoso',
            designation: 'Technical Lead – Payment Aggregator',
            src: '/images/people.png',
        },
        {
            quote: 'Onboarding dan training dilakukan dengan sangat terstruktur. Tim kami bisa langsung operasional tanpa trial-error yang memakan waktu.',
            name: 'Dewi Lestari',
            designation: 'Operations Manager – Distributor Pulsa Nasional',
            src: '/images/people.png',
        },
        {
            quote: 'Yang kami rasakan bukan hanya platform, tapi partner teknologi. Galareload benar-benar memahami kebutuhan bisnis server pulsa.',
            name: 'Hendra Wijaya',
            designation: 'CEO – Multi Channel Reload Platform',
            src: '/images/people.png',
        },
    ];

    return (
        <div className="py-8 md:py-12 lg:py-20 space-y-5 px-4 lg:px-0">
            <motion.div
                className="max-w-7xl container mx-auto"
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                {' '}
                <h2 className="lg:text-4xl text-xl font-metropolis font-medium leading-tight max-w-[18rem] lg:max-w-lg">
                    {' '}
                    <ColourfulText text="Kepercayaan" /> yang dibangun dari
                    <ColourfulText text=" hasil nyata ." />{' '}
                </h2>{' '}
                <p className="text-lg md:text-xl mt-0 font-extralight dark:text-white text-left font-google-sans text-primary leading-normal max-w-5xl">
                    Cerita langsung dari mitra yang telah merasakan stabilitas,
                    layanan, dan skalabilitas platform Galareload.
                </p>
            </motion.div>
            <AnimatedTestimonials testimonials={testimonials} />
        </div>
    );
}
