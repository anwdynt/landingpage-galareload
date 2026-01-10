import { type LoaderFunctionArgs } from 'react-router';
import type { Post } from '~/types/blog';
import { useLoaderData, Link, useSearchParams, Form } from 'react-router';
import { Search, ChevronLeft, ChevronRight, Clock, User, ArrowRight } from 'lucide-react';
import { getPublishedPosts, getCategories } from '~/server/post.server';
import { cn } from '~/lib/utils';
import { AuroraBackground } from '~/components/ui/aurora-background';
import { TextGenerateEffect } from '~/components/ui/text-generate-effect';
import { ColourfulText } from '~/components/ui/colorfull-text';
import { motion } from 'framer-motion';
import { JsonLd } from "~/components/seo/json-ld";

// Metadata
export function meta({ data }: { data: { url: string } | undefined }) {
    const url = data?.url || '';
    return [
        { title: 'Blog & Wawasan - Gala Reload' },
        { name: 'description', content: 'Artikel terbaru seputar bisnis pulsa, teknologi, dan tips sukses agen.' },
        { rel: 'canonical', href: url },
        { property: 'og:url', content: url },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: 'Blog & Wawasan - Gala Reload' },
        { property: 'og:description', content: 'Artikel terbaru seputar bisnis pulsa, teknologi, dan tips sukses agen.' },
        { property: 'og:image', content: 'https://galareload.id/og-blog.jpg' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'Blog & Wawasan - Gala Reload' },
        { name: 'twitter:description', content: 'Artikel terbaru seputar bisnis pulsa, teknologi, dan tips sukses agen.' },
    ];
}

// Loader for Pagination & Filtering
export async function loader({ request }: LoaderFunctionArgs) {
    const url = new URL(request.url);
    const page = Number(url.searchParams.get('page')) || 1;
    const search = url.searchParams.get('q') || '';
    const category = url.searchParams.get('category') || '';
    const limit = 6;

    // Fetch from DB
    const { posts, total, totalPages } = await getPublishedPosts({ page, limit, search, category });
    const allCategories = await getCategories();

    return {
        posts,
        pagination: { page, totalPages, totalPosts: total },
        categories: allCategories.map(c => c.name),
        currentCategory: category,
        searchQuery: search
    };
}

// Components

function BlogSidebar({ categories, currentCategory }: { categories: string[], currentCategory: string }) {
    return (
        <div className="sticky top-24 space-y-8">
            <div className="bg-white dark:bg-neutral-900 rounded-3xl p-6 border border-neutral-200 dark:border-neutral-800 shadow-sm">
                <h3 className="font-bold font-metropolis text-lg mb-4">Kategori</h3>
                <nav className="flex flex-col gap-1">
                    <Link
                        to="/blog"
                        className={cn(
                            "px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center justify-between group",
                            !currentCategory
                                ? "bg-primary/10 text-primary"
                                : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                        )}
                    >
                        Semua Artikel
                        {!currentCategory && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                    </Link>
                    {categories.map(cat => (
                        <Link
                            key={cat}
                            to={`/blog?category=${cat}`}
                            className={cn(
                                "px-4 py-2 rounded-xl text-sm font-medium transition-all flex items-center justify-between group",
                                currentCategory === cat
                                    ? "bg-primary/10 text-primary"
                                    : "text-neutral-600 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-800"
                            )}
                        >
                            {cat}
                            {currentCategory === cat && <div className="w-1.5 h-1.5 rounded-full bg-primary" />}
                        </Link>
                    ))}
                </nav>
            </div>
        </div>
    );
}

function BlogCard({ post }: { post: Post }) {
    // Determine category display
    const categoryName = post.categories && post.categories.length > 0
        ? post.categories[0].category.name
        : "Umum";

    // Fallback image
    const imageSrc = post.image || '/assets/images/placeholder-blog.jpg'; // Ensure you have a placeholder or handle this

    return (
        <Link to={`/blog/${post.slug}`} className="group flex flex-col bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden border border-neutral-100 dark:border-neutral-800 shadow-sm hover:shadow-xl transition-all duration-300 h-full">
            <div className="relative aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-800">
                {post.image ? (
                    <img
                        src={imageSrc}
                        alt={post.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center text-neutral-400">
                        <span className="text-xs uppercase font-bold tracking-widest">No Image</span>
                    </div>
                )}

                <div className="absolute top-4 left-4">
                    <span className={cn("px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide bg-white/90 backdrop-blur-sm shadow-sm text-primary")}>
                        {categoryName}
                    </span>
                </div>
            </div>
            <div className="p-6 flex flex-col flex-1">
                <div className="flex items-center gap-4 text-xs text-neutral-500 mb-3">
                    <div className="flex items-center gap-1.5">
                        <Clock size={14} />
                        {new Date(post.publishedAt || post.createdAt).toLocaleDateString("id-ID", { day: 'numeric', month: 'short', year: 'numeric' })}
                    </div>
                    <div className="flex items-center gap-1.5">
                        <User size={14} />
                        {post.author?.name || 'Admin'}
                    </div>
                </div>

                <h3 className="font-bold font-metropolis text-xl text-neutral-900 dark:text-white mb-2 leading-tight group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                </h3>

                <p className="text-neutral-600 dark:text-neutral-400 text-sm line-clamp-2 mb-6 flex-1">
                    {post.excerpt}
                </p>

                <div className="flex items-center text-primary font-bold text-sm">
                    Baca Selengkapnya
                    <ArrowRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
            </div>
        </Link>
    );
}

export default function BlogList() {
    const { posts, pagination, categories, currentCategory, searchQuery } = useLoaderData<typeof loader>();
    const [searchParams] = useSearchParams();

    return (
        <div className="min-h-screen dark:bg-black pb-24">
            {/* JSON-LD Structured Data */}
            <JsonLd data={{
                "@context": "https://schema.org",
                "@type": "CollectionPage",
                "headline": "Blog & Wawasan Gala Reload",
                "description": "Kumpulan artikel seputar bisnis pulsa, teknologi, dan tips sukses agen.",
                "url": "https://galareload.id/blog",
                "mainEntity": {
                    "@type": "ItemList",
                    "itemListElement": posts.map((post, index) => ({
                        "@type": "ListItem",
                        "position": index + 1,
                        "url": `https://galareload.id/blog/${post.slug}`,
                        "name": post.title
                    }))
                }
            }} />

            {/* Hero Section */}
            <AuroraBackground className="-mt-14 space-y-1 h-[60vh] min-h-[400px] mb-20 items-center justify-center py-24">
                <motion.div
                    initial={{ opacity: 0.0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: 'easeInOut',
                    }}
                    className="relative flex mt-14 flex-col gap-6 items-start justify-center px-4 md:px-8 max-w-7xl mx-auto w-full text-left"
                >
                    <h1 className="text-3xl md:text-7xl font-semibold dark:text-white text-left font-metropolis leading-tight">
                        Wawasan Bisnis & Teknologi untuk Era Digital<ColourfulText text="." />
                    </h1>
                    <TextGenerateEffect
                        className="text-lg md:text-xl mt-2 font-extralight dark:text-white font-google-sans max-w-2xl"
                        words="Temukan strategi bisnis pulsa, update teknologi, dan panduan sukses untuk agen modern masa kini."
                    />
                </motion.div>
            </AuroraBackground>

            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">

                    {/* Left Sidebar */}
                    <aside className="lg:col-span-3">
                        <BlogSidebar categories={categories} currentCategory={currentCategory} />
                    </aside>

                    {/* Main Content */}
                    <main className="lg:col-span-9">

                        {/* Search Bar */}
                        <div className="relative mb-10">
                            <Form method="get" action="/blog">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-neutral-400" size={20} />
                                <input
                                    type="text"
                                    name="q"
                                    defaultValue={searchQuery}
                                    placeholder="Cari artikel, tutorial, atau tips..."
                                    className="w-full pl-14 pr-6 py-4 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all outline-none font-medium"
                                />
                                {currentCategory && <input type="hidden" name="category" value={currentCategory} />}
                            </Form>
                        </div>

                        {/* Article Grid */}
                        {posts.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                                {posts.map((post: Post) => (
                                    <BlogCard key={post.id} post={post} />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-white dark:bg-neutral-900 rounded-3xl border border-neutral-200 dark:border-neutral-800 mb-16">
                                <p className="text-neutral-500 font-medium">Tidak ada artikel yang ditemukan.</p>
                            </div>
                        )}

                        {/* Pagination */}
                        {pagination.totalPages > 1 && (
                            <div className="flex justify-center items-center gap-2">
                                <Link
                                    to={`/blog?page=${Math.max(1, pagination.page - 1)}${currentCategory ? `&category=${currentCategory}` : ''}${searchQuery ? `&q=${searchQuery}` : ''}`}
                                    className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center border border-neutral-200 dark:border-neutral-800 transition-colors",
                                        pagination.page === 1
                                            ? "text-neutral-300 pointer-events-none"
                                            : "hover:bg-white hover:border-primary hover:text-primary bg-neutral-50 dark:bg-neutral-900"
                                    )}
                                >
                                    <ChevronLeft size={18} />
                                </Link>

                                {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map(page => (
                                    <Link
                                        key={page}
                                        to={`/blog?page=${page}${currentCategory ? `&category=${currentCategory}` : ''}${searchQuery ? `&q=${searchQuery}` : ''}`}
                                        className={cn(
                                            "w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all shadow-sm",
                                            pagination.page === page
                                                ? "bg-primary text-white scale-110"
                                                : "bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 text-neutral-600 hover:border-primary hover:text-primary"
                                        )}
                                    >
                                        {page}
                                    </Link>
                                ))}

                                <Link
                                    to={`/blog?page=${Math.min(pagination.totalPages, pagination.page + 1)}${currentCategory ? `&category=${currentCategory}` : ''}${searchQuery ? `&q=${searchQuery}` : ''}`}
                                    className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center border border-neutral-200 dark:border-neutral-800 transition-colors",
                                        pagination.page === pagination.totalPages
                                            ? "text-neutral-300 pointer-events-none"
                                            : "hover:bg-white hover:border-primary hover:text-primary bg-neutral-50 dark:bg-neutral-900"
                                    )}
                                >
                                    <ChevronRight size={18} />
                                </Link>
                            </div>
                        )}

                    </main>
                </div>
            </div>
        </div>
    );
}
