import { motion } from 'framer-motion';
import { ColourfulText } from '~/components/ui/colorfull-text';
import { AnimatedTestimonials } from '~/components/ui/animated-testimonials';

export default function Testimonials() {
    const testimonials = [
        {
            quote: 'Dulu cuma jaga konter, sekarang punya aplikasi sendiri. Omzet naik berkali-kali lipat karena agen lebih percaya dengan brand saya sendiri. Terima kasih Galareload!',
            name: 'Rudi Hermawan',
            designation: 'CEO "Raja Pulsa" - Semarang',
            src: '/images/people.png',
        },
        {
            quote: 'Server stabil, transaksi hitungan detik. Gak pusing mikirin maintenance server atau coding, tinggal fokus marketing cari agen. Solusi terbaik buat yang mau upgrade bisnis.',
            name: 'Dedi Kurniawan',
            designation: 'Owner "Dedi Cell Group" - Jakarta',
            src: '/images/people.png',
        },
        {
            quote: 'Modal terjangkau buat punya startup digital sekelas unicorn. Setup branding cuma butuh beberapa hari, aplikasi langsung bisa listing di Play Store. Keren banget!',
            name: 'Putri Andriani',
            designation: 'Founder "PastiPay" - Malang',
            src: '/images/people.png',
        },
        {
            quote: 'Bisa ditinggal jalan-jalan, sistem jalan terus 24 jam. Laporan keuangan transparan, profit real-time. Beneran definisi passive income yang sesungguhnya.',
            name: 'Bayu Saputra',
            designation: 'Digital Entrepreneur - Bali',
            src: '/images/people.png',
        },
        {
            quote: 'Supportnya sigap banget. Request fitur dilayani, komplain teknis cepat beres. Udah 2 tahun pake Whitelabel Gala, gak pernah kepikiran buat pindah vendor lain.',
            name: 'Irfan Hakim',
            designation: 'Owner "FastTronik" - Bandung',
            src: '/images/people.png',
        },
    ];

    return (
        <div className="py-8 md:py-12 lg:py-20 space-y-5 px-2 md:px-0">
            <motion.div
                className="max-w-7xl container mx-auto text-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <h2 className="lg:text-4xl text-xl font-metropolis font-medium leading-tight mb-4">
                    Apa kata partner kami<ColourfulText text="?" />
                </h2>
                <p className="text-lg md:text-xl mt-0 font-extralight dark:text-white text-left font-google-sans text-primary leading-normal max-w-5xl">
                    Kisah sukses para pengusaha yang telah membangun brand digital mereka sendiri.
                </p>
            </motion.div>
            <AnimatedTestimonials testimonials={testimonials} />
        </div>
    );
}
