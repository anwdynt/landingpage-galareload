import { useEffect, useState } from 'react';
import { type LoaderFunctionArgs } from 'react-router';
import { useLoaderData, Link } from 'react-router';
import { motion, useScroll, useSpring } from 'framer-motion';
import {
    Calendar, User, Clock, Share2, ChevronRight,
    Smartphone, ArrowRight, CheckCircle2, Star
} from 'lucide-react';
import { BLOG_POSTS, type BlogPost } from '~/data/blog-posts';
import { cn } from '~/lib/utils';

// --- Meta Function ---
export function meta({ data }: { data: { post: BlogPost; url: string } | undefined }) {
    if (!data || !data.post) {
        return [{ title: 'Artikel Tidak Ditemukan - Gala Reload' }];
    }
    const { post, url } = data;
    const image = post.image;

    return [
        { title: `${post.title} - Gala Reload Blog` },
        { name: 'description', content: post.excerpt },
        { rel: 'canonical', href: url },

        // Open Graph / Facebook
        { property: 'og:type', content: 'article' },
        { property: 'og:url', content: url },
        { property: 'og:title', content: post.title },
        { property: 'og:description', content: post.excerpt },
        { property: 'og:image', content: image },
        { property: 'article:published_time', content: post.date }, // Note: date format might need parsing if strictly ISO
        { property: 'article:author', content: post.author },
        { property: 'article:section', content: post.category },

        // Twitter
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:url', content: url },
        { name: 'twitter:title', content: post.title },
        { name: 'twitter:description', content: post.excerpt },
        { name: 'twitter:image', content: image },
    ];
}

// --- Loader ---
export function loader({ params, request }: LoaderFunctionArgs) {
    const post = BLOG_POSTS.find((p) => p.slug === params.slug);
    if (!post) {
        throw new Response('Not Found', { status: 404 });
    }
    // Get related posts (excluding current one)
    const relatedPosts = BLOG_POSTS.filter(p => p.id !== post.id).slice(0, 3);
    return { post, relatedPosts, url: request.url };
}

// --- Components ---

function TableOfContents() {
    const [headings, setHeadings] = useState<{ id: string; text: string; level: number }[]>([]);
    const [activeId, setActiveId] = useState<string>('');

    useEffect(() => {
        const elements = Array.from(document.querySelectorAll('.prose h2, .prose h3'));
        const items = elements.map((elem, index) => {
            if (!elem.id) {
                elem.id = `heading-${index}`;
            }
            return {
                id: elem.id,
                text: elem.textContent || '',
                level: parseInt(elem.tagName.substring(1)),
            };
        });
        setHeadings(items);

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setActiveId(entry.target.id);
                    }
                });
            },
            { rootMargin: '-100px 0px -66% 0px' }
        );

        elements.forEach((elem) => observer.observe(elem));
        return () => observer.disconnect();
    }, []);

    if (headings.length === 0) return null;

    return (
        <div className="hidden lg:block sticky top-24 space-y-4">
            <h4 className="font-bold text-neutral-900 dark:text-white uppercase tracking-wider text-xs mb-4">
                Daftar Isi
            </h4>
            <nav className="flex flex-col gap-2 border-l border-neutral-200 dark:border-neutral-800 ml-2">
                {headings.map((heading) => (
                    <a
                        key={heading.id}
                        href={`#${heading.id}`}
                        className={cn(
                            "text-sm hover:text-primary transition-colors pl-4 py-1 border-l-2 -ml-[2px] block line-clamp-2",
                            activeId === heading.id
                                ? "border-primary text-primary font-medium"
                                : "border-transparent text-neutral-500 dark:text-neutral-400"
                        )}
                        onClick={(e) => {
                            e.preventDefault();
                            document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                            setActiveId(heading.id);
                        }}
                    >
                        {heading.text}
                    </a>
                ))}
            </nav>
        </div>
    );
}

function SidebarPromo() {
    return (
        <div className="sticky top-24 space-y-8">

            {/* Popular Articles */}
            <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800">
                <h3 className="font-bold font-metropolis text-lg mb-4 flex items-center gap-2">
                    <Star size={18} className="text-yellow-500 fill-yellow-500" />
                    Artikel Populer
                </h3>
                <div className="space-y-4">
                    {[1, 2, 3].map((_, i) => (
                        <div key={i} className="group cursor-pointer">
                            <div className="text-xs text-neutral-500 mb-1 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-neutral-300 group-hover:bg-primary transition-colors" />
                                <span className="text-neutral-500 group-hover:text-primary transition-colors">Tips Bisnis</span>
                            </div>
                            <h4 className="font-bold text-sm text-neutral-800 dark:text-neutral-200 group-hover:text-primary transition-colors line-clamp-2">
                                Cara Mengatasi Transaksi Pending di Jam Sibuk
                            </h4>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

// --- Main Page Component ---
export default function BlogDetail() {
    const { post, relatedPosts } = useLoaderData<typeof loader>();
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <article className="min-h-screen bg-neutral-50 dark:bg-black relative">
            {/* Reading Progress Bar */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 origin-left z-50"
                style={{ scaleX }}
            />

            {/* JSON-LD Structured Data */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "BlogPosting",
                    "headline": post.title,
                    "image": [post.image],
                    "datePublished": post.date, // ideally ISO 8601
                    "dateModified": post.date,
                    "author": [{
                        "@type": "Person",
                        "name": post.author,
                        "url": "https://galareload.id/team"
                    }],
                    "publisher": {
                        "@type": "Organization",
                        "name": "Gala Reload",
                        "logo": {
                            "@type": "ImageObject",
                            "url": "https://galareload.id/logo.png"
                        }
                    },
                    "description": post.excerpt
                })}
            </script>

            {/* Header / Hero Section */}
            <header className="pt-32 pb-16 px-4 md:px-8 bg-white dark:bg-neutral-900 border-b border-neutral-200 dark:border-neutral-800 relative overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
                    <div className="md:col-span-8">
                        {/* Breadcrumbs */}
                        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-neutral-500 mb-6">
                            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
                            <ChevronRight size={12} />
                            <Link to="/blog" className="hover:text-primary transition-colors">Blog</Link>
                            <ChevronRight size={12} />
                            <span className="text-primary">{post.category}</span>
                        </div>

                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-black font-metropolis text-neutral-900 dark:text-white leading-tight mb-8">
                            {post.title}
                        </h1>

                        <div className="flex items-center flex-wrap gap-6 text-sm text-neutral-600 dark:text-neutral-400 font-medium">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                    <User size={16} />
                                </div>
                                {post.author}
                            </div>
                            <div className="flex items-center gap-2">
                                <Calendar size={16} />
                                {post.date}
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={16} />
                                5 min read
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* Content Container */}
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-20">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Sidebar: TOC */}
                    <aside className="hidden lg:block lg:col-span-3 relative">
                        <TableOfContents />
                    </aside>

                    {/* Main Content (Center) */}
                    <main className="lg:col-span-6">
                        {/* Featured Image */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="rounded-3xl overflow-hidden shadow-sm mb-12 aspect-[16/10] relative isolate"
                        >
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10" />
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </motion.div>

                        {/* Article Text */}
                        <div
                            className="prose prose-lg dark:prose-invert prose-headings:font-metropolis prose-p:font-google-sans prose-img:rounded-3xl prose-img:shadow-lg prose-a:text-primary hover:prose-a:text-primary/80 prose-headings:scroll-mt-24 max-w-none prose-p:leading-loose [&>p]:mb-8 [&>h3]:mt-12 [&>h3]:mb-6"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                        />

                        {/* Share Section */}
                        <div className="mt-16 pt-8 border-t border-neutral-200 dark:border-neutral-800">
                            <h4 className="font-bold text-neutral-900 dark:text-white mb-4">Bagikan artikel ini:</h4>
                            <div className="flex gap-3">
                                {['Twitter', 'Facebook', 'LinkedIn', 'WhatsApp'].map((platform) => (
                                    <button
                                        key={platform}
                                        className="px-4 py-2 rounded-full border border-neutral-200 dark:border-neutral-700 text-sm font-medium hover:bg-neutral-50 dark:hover:bg-neutral-800 transition-colors flex items-center gap-2"
                                    >
                                        <Share2 size={14} />
                                        {platform}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </main>

                    {/* Right Sidebar: Promo */}
                    <aside className="lg:col-span-3 space-y-12">
                        <SidebarPromo />
                    </aside>

                </div>
            </div>

            {/* Related Posts Bottom Section */}
            <section className="bg-white dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 py-16 mt-16">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <h3 className="text-2xl font-bold font-metropolis mb-8 text-neutral-900 dark:text-white">
                        Artikel Lainnya
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {relatedPosts.map(post => (
                            <Link to={`/blog/${post.slug}`} key={post.id} className="group block">
                                <div className="rounded-2xl overflow-hidden mb-4 aspect-video relative">
                                    <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                                </div>
                                <h4 className="font-bold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2 dark:text-white">{post.title}</h4>
                                <div className="flex items-center gap-2 text-xs text-neutral-500">
                                    <span>{post.date}</span>
                                    <span>•</span>
                                    <span>{post.category}</span>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section>
        </article>
    );
}
