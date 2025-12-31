import { motion } from 'framer-motion';
import { ColourfulText } from '~/components/ui/colorfull-text';
import { AnimatedTestimonials } from '~/components/ui/animated-testimonials';

export default function Testimonials() {
    const testimonials = [
        {
            quote: 'Aplikasi ini sangat membantu saya jualan pulsa di rumah. Transaksinya cepat, dan harganya bersaing banget. Sangat recommended buat ibu rumah tangga!',
            name: 'Siti Aminah',
            designation: 'Ibu Rumah Tangga - Surabaya',
            src: '/images/people.png',
        },
        {
            quote: 'Sebagai pemilik konter, kestabilan server itu nomor satu. Galareload jarang gangguan, CS-nya juga fast respon kalau ada kendala. Mantap!',
            name: 'Budi Santoso',
            designation: 'Pemilik Konter "Berkah Cell" - Jakarta',
            src: '/images/people.png',
        },
        {
            quote: 'Fiturnya lengkap banget, nggak cuma pulsa tapi bisa bayar tagihan listrik dan BPJS juga. Satu aplikasi buat semua kebutuhan.',
            name: 'Rina Kartika',
            designation: 'Mahasiswi & Agen PPOB - Bandung',
            src: '/images/people.png',
        },
        {
            quote: 'Top up saldo gampang, bisa lewat Alfamart atau transfer bank. Prosesnya otomatis masuk hitungan detik. Bisnis jadi makin lancar.',
            name: 'Agus Wijaya',
            designation: 'Wiraswasta - Medan',
            src: '/images/people.png',
        },
        {
            quote: 'Tampilan aplikasinya modern dan mudah dipahami. Saya yang gaptek aja bisa langsung ngerti cara pakainya. Sukses terus Galareload!',
            name: 'Pak Bambang',
            designation: 'Pensiunan - Yogyakarta',
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
                    Apa kata <ColourfulText text="mitra kami?" />
                </h2>
                <p className="text-lg md:text-xl mt-0 font-extralight dark:text-white text-left font-google-sans text-primary leading-normal max-w-5xl">
                    Ribuan agen telah membuktikan kemudahan bertransaksi dengan Galareload.
                </p>
            </motion.div>
            <AnimatedTestimonials testimonials={testimonials} />
        </div>
    );
}
