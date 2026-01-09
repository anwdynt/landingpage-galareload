import { motion } from 'framer-motion';
import { ArrowRight, Calendar, User } from 'lucide-react';
import { Link } from 'react-router';
import { ColourfulText } from '~/components/ui/colorfull-text';
import { cn } from '~/lib/utils';
import { Button } from '~/components/ui/button';

interface BlogProps {
    posts: any[];
}

export default function Blog({ posts = [] }: BlogProps) {
    if (!posts || posts.length === 0) return null;

    return (
        <section className="py-24 dark:bg-black relative overflow-hidden" id="blog">
            <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <span className="text-primary font-bold tracking-wider uppercase text-sm mb-4 block">
                        Wawasan & Berita
                    </span>
                    <h2 className="lg:text-4xl text-xl font-metropolis font-medium leading-tight mb-6">
                        Artikel Terbaru Galareload<ColourfulText text="." />
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 font-google-sans text-lg">
                        Dapatkan informasi terkini seputar dunia server pulsa, tips bisnis, dan update teknologi terbaru.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {posts.map((post, index) => {
                        const date = new Date(post.publishedAt || post.createdAt).toLocaleDateString("id-ID", {
                            day: 'numeric', month: 'long', year: 'numeric'
                        });
                        const authorName = post.author?.name || 'Admin';
                        const categoryName = post.categories?.[0]?.category?.name || 'Umum';
                        const imageUrl = post.image || 'https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80'; // Fallback

                        return (
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
                                        src={imageUrl}
                                        alt={post.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    <div className="absolute top-4 left-4 z-10">
                                        <span className={cn("px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-white/90 backdrop-blur-sm shadow-sm text-neutral-800")}>
                                            {categoryName}
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
                                                {date}
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <User size={14} />
                                                {authorName}
                                            </div>
                                        </div>

                                        <h3 className={cn(
                                            "font-bold font-metropolis text-neutral-900 dark:text-white mb-3 group-hover:text-primary transition-colors",
                                            index === 0 ? "text-2xl" : "text-xl"
                                        )}>
                                            <Link to={`/blog/${post.slug}`}>
                                                {post.title}
                                            </Link>
                                        </h3>

                                        <p className="text-neutral-600 dark:text-neutral-400 text-sm line-clamp-3 mb-6">
                                            {post.excerpt}
                                        </p>
                                    </div>

                                    <Link
                                        to={`/blog/${post.slug}`}
                                        className="inline-flex items-center gap-2 text-sm font-bold text-primary hover:gap-3 transition-all mt-auto"
                                    >
                                        Baca Selengkapnya
                                        <ArrowRight size={16} />
                                    </Link>
                                </div>
                            </motion.article>
                        );
                    })}
                </div>

                <div className="mt-16 text-center">
                    <Link to="/blog">
                        <Button className="px-8 py-3 cursor-pointer rounded-full bg-black dark:bg-white text-white dark:text-black font-bold text-sm tracking-wide shadow-lg hover:translate-y-[-2px] hover:shadow-xl transition-all duration-200">
                            Lihat Semua Artikel
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
}
