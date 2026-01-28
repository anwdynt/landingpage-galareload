'use client';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function AboutFAQ() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqs = [
        {
            question: 'Apa itu Gala Reload?',
            answer: 'Gala Reload adalah platform server pulsa dan PPOB all-in-one yang menyediakan berbagai layanan digital seperti pulsa, paket data, token listrik, BPJS, dan produk digital lainnya. Kami melayani lebih dari 30,000 member di seluruh Indonesia sejak 2015.'
        },
        {
            question: 'Bagaimana cara menjadi member Gala Reload?',
            answer: 'Pendaftaran sangat mudah dan gratis! Anda bisa langsung mendaftar melalui website kami atau hubungi tim customer service kami untuk panduan lengkap. Tidak ada biaya pendaftaran atau komitmen awal.'
        },
        {
            question: 'Apa keuntungan bergabung dengan Gala Reload?',
            answer: 'Keuntungan yang Anda dapatkan antara lain: harga produk kompetitif, sistem yang stabil dan aman, support 24/7, fitur lengkap untuk bisnis, dashboard real-time, dan berbagai promosi menarik untuk member.'
        },
        {
            question: 'Apakah ada minimal deposit?',
            answer: 'Ya, kami memiliki sistem deposit yang fleksibel dengan minimal deposit yang terjangkau. Untuk informasi detail tentang minimal deposit dan metode pembayaran yang tersedia, silakan hubungi tim kami.'
        },
        {
            question: 'Bagaimana cara melakukan deposit?',
            answer: 'Deposit dapat dilakukan melalui transfer bank ke rekening resmi Gala Reload. Setelah transfer, konfirmasi melalui dashboard atau WhatsApp customer service kami. Saldo akan otomatis masuk ke akun Anda dalam hitungan menit.'
        },
        {
            question: 'Apakah Gala Reload menyediakan aplikasi mobile?',
            answer: 'Ya, kami menyediakan aplikasi mobile untuk Android yang memudahkan Anda melakukan transaksi kapan saja dan dimana saja. Aplikasi dapat diunduh langsung dari website kami atau melalui link yang diberikan oleh customer service.'
        },
        {
            question: 'Bagaimana jika terjadi masalah pada transaksi?',
            answer: 'Tim customer service kami siap membantu Anda 24/7. Anda bisa menghubungi kami melalui WhatsApp, telepon, atau sistem tiket di dashboard. Kami berkomitmen untuk menyelesaikan setiap masalah dengan cepat dan profesional.'
        },
        {
            question: 'Apakah Gala Reload aman dan terpercaya?',
            answer: 'Absolutely! Kami telah beroperasi sejak 2015 dan melayani puluhan ribu member di seluruh Indonesia. Sistem kami dilengkapi dengan keamanan berlapis, enkripsi data, dan backup otomatis untuk menjaga keamanan transaksi dan data Anda.'
        }
    ];

    return (
        <section className="py-20 md:py-32 bg-neutral-50 dark:bg-neutral-50">
            <div className="max-w-4xl mx-auto px-6">
                {/* Section Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 mb-4 rounded-full bg-neutral-900/10 border border-neutral-900/20">
                        <div className="w-1.5 h-1.5 bg-neutral-900 rounded-full animate-pulse" />
                        <span className="text-xs font-semibold text-neutral-900 uppercase tracking-wider">FAQ</span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-4">
                        Pertanyaan yang Sering Diajukan
                    </h2>
                    <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
                        Temukan jawaban untuk pertanyaan umum tentang Gala Reload
                    </p>
                </motion.div>

                {/* FAQ Accordion */}
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            className="bg-white rounded-2xl border-2 border-neutral-200 overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.05 }}
                        >
                            <button
                                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-neutral-50 transition-colors duration-200"
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                            >
                                <span className="text-lg font-semibold text-neutral-900 pr-8">
                                    {faq.question}
                                </span>
                                <ChevronDown
                                    className={`w-5 h-5 text-neutral-900 flex-shrink-0 transition-transform duration-300 ${openIndex === index ? 'rotate-180' : ''
                                        }`}
                                />
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-96' : 'max-h-0'
                                    }`}
                            >
                                <div className="px-6 pb-5 text-neutral-600 leading-relaxed">
                                    {faq.answer}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
