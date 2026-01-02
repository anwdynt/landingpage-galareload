import { motion } from 'framer-motion';
import { ColourfulText } from '~/components/ui/colorfull-text';
import { AnimatedTestimonials } from '~/components/ui/animated-testimonials';

export default function Testimonials() {
    const testimonials = [
        {
            quote: 'Koneksi H2H-nya stabil banget. Response time di bawah 1 detik bikin transaksi member saya lancar jaya. Recommended buat yang cari supplier utama.',
            name: 'Andi Pratama',
            designation: 'Owner Server "Maju Jaya Cell" - Jakarta',
            src: '/images/people.png',
        },
        {
            quote: 'Support regex-nya sangat membantu. Tinggal copy-paste format, langsung connect di Otomax. Hemat waktu setting parsing, jadi bisa fokus marketing.',
            name: 'Dedi Kurniawan',
            designation: 'Pemilik "Berkah Reload" - Semarang',
            src: '/images/people.png',
        },
        {
            quote: 'Stok nasionalnya aman terkendali. Jarang banget ada gangguan atau stok kosong. Harga juga sangat bersaing untuk level H2H.',
            name: 'Cindy Larasati',
            designation: 'Agen H2H & PPOB - Bandung',
            src: '/images/people.png',
        },
        {
            quote: 'Tim support teknisnya fast respon. Pas awal integrasi ada kendala IP, langsung dibantu solve dalam hitungan menit. Layanan prima!',
            name: 'Rudi Hartono',
            designation: 'Developer Software Pulsa - Surabaya',
            src: '/images/people.png',
        },
        {
            quote: 'Sudah coba banyak supplier H2H, tapi Galareload yang paling konsisten performanya. Member saya puas karena transaksi jarang pending.',
            name: 'Budi Santoso',
            designation: 'Owner "Giga Cell" - Medan',
            src: '/images/people.png',
        },
    ];

    return (
        <div className="py-8 md:py-12 lg:py-20 space-y-5 px-2 md:px-0 dark:bg-black">
            <motion.div
                className="max-w-7xl container mx-auto text-start"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: 'easeOut' }}
            >
                <h2 className="lg:text-4xl text-xl font-metropolis font-medium leading-tight mb-4">
                    Apa kata mitra H2H kami<ColourfulText text="?" />
                </h2>
                <p className="text-lg md:text-xl mt-0 font-extralight dark:text-white text-left font-google-sans text-primary leading-normal max-w-5xl">
                    Server pulsa dan aggregator yang telah membuktikan kestabilan koneksi kami.
                </p>
            </motion.div>
            <AnimatedTestimonials testimonials={testimonials} />
        </div>
    );
}
