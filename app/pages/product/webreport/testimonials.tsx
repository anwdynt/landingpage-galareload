import { motion } from 'framer-motion';
import { ColourfulText } from '~/components/ui/colorfull-text';
import { AnimatedTestimonials } from '~/components/ui/animated-testimonials';

export default function Testimonials() {
    const testimonials = [
        {
            quote: 'Web Report Gala sangat membantu saya rekap transaksi harian. Tinggal export ke Excel, laporan pembukuan toko jadi beres dalam hitungan menit.',
            name: 'Andi Pratama',
            designation: 'Owner "Andi Cell" - Jakarta',
            src: '/images/people.png',
        },
        {
            quote: 'Tampilannya luas dan enak dilihat di laptop. Pantau stok dan deposit downline jadi jauh lebih gampang dibanding lewat HP.',
            name: 'Dewi Sartika',
            designation: 'Master Dealer - Surabaya',
            src: '/images/people.png',
        },
        {
            quote: 'Sistemnya stabil, jarang maintenance. Buat saya yang punya ratusan agen, fitur monitoring jaringannya top markotop!',
            name: 'Budi Santoso',
            designation: 'Distributor Pulsa - Semarang',
            src: '/images/people.png',
        },
        {
            quote: 'Suka banget sama fitur cetak struk-nya. Bisa custom nama toko sendiri, terlihat lebih profesional di mata pelanggan.',
            name: 'Rina Marlina',
            designation: 'Loket PPOB - Bandung',
            src: '/images/people.png',
        },
        {
            quote: 'Sangat recommended buat yang serius bisnis server pulsa. Semua datanya transparan dan akurat, gak perlu takut ada saldo nyangkut.',
            name: 'Fajar Hidayat',
            designation: 'Agen Prioritas - Medan',
            src: '/images/people.png',
        },
    ];

    return (
        <div className="py-20 lg:py-40 space-y-5 px-4 md:px-0">
            <motion.div
                className="max-w-7xl container mx-auto text-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <h2 className="lg:text-4xl text-xl font-metropolis font-medium leading-tight mb-4">
                    Apa kata <ColourfulText text="pengguna web report?" />
                </h2>
                <p className="text-lg md:text-xl mt-0 font-extralight dark:text-white text-left font-google-sans text-primary leading-normal max-w-5xl">
                    Pengalaman nyata para mitra dalam mengelola bisnis mereka menggunakan dashboard Web Report.
                </p>
            </motion.div>
            <AnimatedTestimonials testimonials={testimonials} />
        </div>
    );
}
