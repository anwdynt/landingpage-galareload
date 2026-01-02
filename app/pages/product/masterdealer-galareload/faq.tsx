import { motion, easeOut } from 'framer-motion';
import { TypewriterEffect } from '~/components/ui/typewriter-effect';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '~/components/ui/accordion';

const faqs = [
    {
        question: 'Apa syarat menjadi Master Dealer?',
        answer: 'Tidak ada syarat khusus. Siapapun bisa bergabung menjadi Master Dealer Galareload secara GRATIS. Cukup mendaftar melalui aplikasi atau menghubungi CS kami.',
    },
    {
        question: 'Berapa modal awal yang dibutuhkan?',
        answer: 'Deposit awal sangat terjangkau, mulai dari Rp 50.000 saja Anda sudah bisa mulai bertransaksi dan mendaftarkan agen baru.',
    },
    {
        question: 'Bagaimana cara mendapatkan komisi?',
        answer: 'Komisi didapatkan dari selisih harga (markup) yang Anda atur untuk setiap agen di bawah Anda. Komisi akan otomatis masuk ke saldo Anda setiap awal bulan.',
    },
    {
        question: 'Apakah bisa mendaftarkan agen di luar kota?',
        answer: 'Tentu bisa! Sistem kami online 24 jam dan menjangkau seluruh Indonesia. Anda bisa memiliki agen dari Sabang sampai Merauke tanpa batasan wilayah.',
    },
    {
        question: 'Bagaimana jika lupa PIN atau ada kendala?',
        answer: 'Tim Customer Service kami standby 24 jam untuk membantu. Anda bisa menghubungi kami via WhatsApp center atau menu bantuan di aplikasi.',
    },
];

const itemVariants = {
    hidden: { opacity: 0, y: 12 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.4,
            ease: easeOut,
            delay: i * 0.08,
        },
    }),
};

export default function FAQ() {
    const words = [
        {
            text: 'Pertanyaan',
        },
        {
            text: 'yang',
        },
        {
            text: 'Sering',
        },
        {
            text: 'Diajukan',
        },
    ];
    return (
        <div className="py-20 w-full dark:bg-black">
            <div className="max-w-4xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-medium font-metropolis dark:text-white mb-4">
                        <TypewriterEffect words={words} className="text-xl" />
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 font-google-sans">
                        Informasi yang sering ditanyakan oleh calon mitra Master Dealer.
                    </p>
                </div>

                <Accordion type="single" collapsible className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            custom={index}
                            initial="hidden"
                            whileInView="visible"
                            variants={itemVariants}
                            viewport={{ once: true }}
                        >
                            <AccordionItem value={`item-${index}`} className="px-5 border-none dark:border-neutral-800 rounded-2xl bg-white dark:bg-neutral-900 overflow-hidden">
                                <AccordionTrigger className="text-left text-base md:text-lg font-medium font-metropolis hover:no-underline">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-neutral-600 dark:text-neutral-400 leading-relaxed text-base font-google-sans font-light">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        </motion.div>
                    ))}
                </Accordion>
            </div>
        </div>
    );
}
