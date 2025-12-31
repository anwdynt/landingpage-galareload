import { motion, easeOut } from 'framer-motion';
import { TypewriterEffect } from '~/components/ui/typewriter-effect';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from '~/components/ui/accordion';

interface FAQItem {
    id: string;
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        id: 'what-is-galareload',
        question: 'Apa itu Galareload?',
        answer: 'Galareload adalah platform server pulsa terintegrasi yang mendukung sistem Master Dealer, Whitelabel, dan koneksi Host to Host untuk membantu bisnis berkembang secara terstruktur dan berkelanjutan.',
    },
    {
        id: 'for-beginner',
        question: 'Apakah Galareload cocok untuk pemula?',
        answer: 'Ya. Galareload dirancang fleksibel untuk berbagai skala bisnis. Anda dapat memulai dari paket dasar dengan biaya ringan dan meningkatkan layanan seiring pertumbuhan bisnis.',
    },
    {
        id: 'support-24-7',
        question: 'Apakah tersedia layanan support 24 jam?',
        answer: 'Tersedia. Tim support Galareload siap mendampingi Anda 24 jam / 7 hari dengan respons cepat, analisis yang akurat, dan komunikasi profesional.',
    },
    {
        id: 'whitelabel',
        question: 'Apakah bisa menggunakan brand sendiri (whitelabel)?',
        answer: 'Bisa. Sistem whitelabel memungkinkan Anda menjalankan bisnis dengan identitas brand sendiri secara penuh.',
    },
    {
        id: 'security',
        question: 'Bagaimana keamanan data dan transaksi?',
        answer: 'Kami menerapkan standar keamanan yang ketat untuk melindungi data dan transaksi bisnis Anda, memastikan integritas sistem dan keandalan operasional.',
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
        <section className="w-full py-8 md:py-12 lg:py-20">
            <div className="max-w-4xl mx-auto px-4">
                {/* HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    viewport={{ once: true }}
                    className="mb-14 text-center"
                >
                    <h2 className="text-3xl md:text-4xl font-metropolis font-semibold">
                        <TypewriterEffect words={words} className="text-xl" />
                    </h2>
                    <p className="mt-4 text-primary font-google-sans font-light text-lg lg:text-xl">
                        Informasi penting seputar layanan dan platform
                        Galareload.
                    </p>
                </motion.div>

                {/* FAQ LIST */}
                <Accordion type="single" collapsible className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={faq.id}
                            custom={index}
                            initial="hidden"
                            whileInView="visible"
                            variants={itemVariants}
                            viewport={{ once: true }}
                        >
                            <AccordionItem value={faq.id} className="px-5">
                                <AccordionTrigger className="text-left text-base md:text-lg font-medium font-metropolis">
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-primary leading-relaxed text-base font-google-sans font-light">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        </motion.div>
                    ))}
                </Accordion>
            </div>
        </section>
    );
}
