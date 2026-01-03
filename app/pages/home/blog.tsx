import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { ColourfulText } from '~/components/ui/colorfull-text';
import { cn } from '~/lib/utils';

const BLOG_POSTS = [
    {
        id: 1,
        title: "Cara Memulai Bisnis Pulsa dari Nol",
        excerpt: "Panduan lengkap bagi pemula yang ingin terjun ke dunia bisnis server pulsa dengan modal minim namun keuntungan maksimal.",
        date: "12 Okt 2025",
        author: "Admin Gala",
        category: "Bisnis",
        image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80",
        color: "bg-blue-100 text-blue-800"
    },
    {
        id: 2,
        title: "Keuntungan Fitur Web Report bagi Agen",
        excerpt: "Optimalkan pembukuan dan monitoring transaksi Anda dengan fitur Web Report yang realtime dan akurat.",
        date: "15 Okt 2025",
        author: "Tech Team",
        category: "Fitur",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80",
        color: "bg-purple-100 text-purple-800"
    },
    {
        id: 3,
        title: "Tips Aman Transaksi Digital di Era Modern",
        excerpt: "Jaga keamanan akun dan saldo Anda dengan mengikuti praktik terbaik keamanan siber yang kami rekomendasikan.",
        date: "20 Okt 2025",
        author: "Security",
        category: "Tips",
        image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80",
        color: "bg-green-100 text-green-800"
    },
    {
        id: 4,
        title: "Mengenal Jalur Transaksi: Jabber, IP, & SMS",
        excerpt: "Perbandingan mendalam mengenai berbagai jalur transaksi yang tersedia di Gala Reload untuk kecepatan maksimal.",
        date: "25 Okt 2025",
        author: "Dev Ops",
        category: "Teknis",
        image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&q=80",
        color: "bg-orange-100 text-orange-800"
    },
    {
        id: 5,
        title: "Strategi Marketing untuk Konter Pulsa",
        excerpt: "Tingkatkan omzet konter Anda dengan strategi pemasaran sederhana yang sering dilupakan oleh pebisnis pemula.",
        date: "01 Nov 2025",
        author: "Marketing",
        category: "Strategi",
        image: "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&q=80",
        color: "bg-pink-100 text-pink-800"
    }
];

export default function Blog() {
    return (
        <section className="py-24 bg-neutral-50 dark:bg-black relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
                        Wawasan & Berita
                    </span>
                    <h2 className="lg:text-4xl text-xl font-metropolis font-medium leading-tight mb-6">
                        Artikel Terbaru <ColourfulText text="Galareload." />
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 font-google-sans text-lg">
                        Dapatkan informasi terkini seputar dunia server pulsa, tips bisnis, dan update teknologi terbaru.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {BLOG_POSTS.map((post, index) => (
                        <motion.article
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className={cn(
                                "group bg-white dark:bg-neutral-900 rounded-2xl overflow-hidden border border-neutral-100 dark:border-neutral-800 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col h-full",
                                index === 0 ? "lg:col-span-2 lg:flex-row lg:h-[400px]" : "h-full"
                            )}
                        >
                            <div className={cn(
                                "relative overflow-hidden w-full",
                                index === 0 ? "lg:w-1/2 min-h-[250px] lg:min-h-full" : "h-56"
                            )}>
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                <div className="absolute top-4 left-4 z-10">
                                    <span className={cn("px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-white/90 backdrop-blur-sm shadow-sm", post.color)}>
                                        {post.category}
                                    </span>
                                </div>
                            </div>

                            <div className={cn(
                                "p-6 flex flex-col justify-between flex-1",
                                index === 0 ? "lg:w-1/2 lg:p-8" : ""
                            )}>
                                <div>
                                    <div className="flex items-center gap-4 text-xs text-neutral-500 dark:text-neutral-400 mb-3 font-medium">
                                        <div className="flex items-center gap-1">
                                            <Calendar size={14} />
                                            {post.date}
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <User size={14} />
                                            {post.author}
                                        </div>
                                    </div>

                                    <h3 className={cn(
                                        "font-bold font-metropolis text-neutral-900 dark:text-white mb-3 group-hover:text-primary transition-colors",
                                        index === 0 ? "text-2xl" : "text-xl"
                                    )}>
                                        {post.title}
                                    </h3>

                                    <p className="text-neutral-600 dark:text-neutral-400 text-sm line-clamp-3 mb-6">
                                        {post.excerpt}
                                    </p>
                                </div>

                                <button className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all mt-auto">
                                    Baca Selengkapnya
                                    <ArrowRight size={16} />
                                </button>
                            </div>
                        </motion.article>
                    ))}
                </div>

                <div className="mt-16 text-center">
                    <button className="px-8 py-3 rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-sm tracking-wide shadow-lg hover:translate-y-[-2px] hover:shadow-xl transition-all duration-200">
                        Lihat Semua Artikel
                    </button>
                </div>
            </div>
        </section>
    );
}
