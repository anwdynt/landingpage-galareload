import { type LoaderFunctionArgs, redirect } from "react-router";
import { useLoaderData, Link } from "react-router";
import { getPostBySlug } from "~/server/post.server";
import { BlockRenderer } from "~/components/blog/block-renderer";
import { Clock, User, ArrowLeft, Calendar, Tag, Share2 } from "lucide-react";
import { Button } from "~/components/ui/button";
import { JsonLd } from "~/components/seo/json-ld";

export async function loader({ params }: LoaderFunctionArgs) {
    const slug = params.slug;
    if (!slug) throw redirect("/blog");

    const post = await getPostBySlug(slug);
    if (!post || post.status !== 'PUBLISHED') {
        throw new Response("Not Found", { status: 404 });
    }

    return { post };
}

export function meta({ data }: { data: { post: any } | undefined }) {
    if (!data?.post) return [{ title: "Artikel Tidak Ditemukan" }];
    const { post } = data;
    const metaDesc = post.excerpt || post.title;
    const metaImage = post.image || 'https://galareload.id/og-blog.jpg';

    return [
        { title: `${post.title} - Blog Gala Reload` },
        { name: "description", content: metaDesc },
        { property: "og:title", content: post.title },
        { property: "og:description", content: metaDesc },
        { property: "og:image", content: metaImage },
        { name: "twitter:card", content: "summary_large_image" },
    ];
}

export default function BlogDetail() {
    const { post } = useLoaderData<typeof loader>();
    console.log(post)
    const contentBlocks = (post.content_raw as any)?.blocks || [];

    // Date formatting
    const publishDate = new Date(post.publishedAt || post.createdAt).toLocaleDateString("id-ID", {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });

    const categoryName = post.categories?.[0]?.category?.name || "Umum";

    return (
        <div className="min-h-screen bg-white dark:bg-black font-google-sans">

            {/* JSON-LD Structured Data */}
            <JsonLd data={{
                "@context": "https://schema.org",
                "@type": "BlogPosting",
                "headline": post.title,
                "image": [post.image],
                "datePublished": post.publishedAt, // ideally ISO 8601
                "dateModified": post.updatedAt,
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
            }} />

            {/* Header / Hero */}
            <div className="relative pt-32 pb-20 px-4 md:px-8 dark:bg-neutral-900/50 border-b border-neutral-200 dark:border-neutral-800">
                <div className="max-w-4xl mx-auto">

                    <Link to="/blog" className="inline-flex items-center text-neutral-500 hover:text-primary mb-8 transition-colors text-sm font-bold">
                        <ArrowLeft size={16} className="mr-2" />
                        Kembali ke Blog
                    </Link>

                    <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary font-bold uppercase tracking-wide text-xs">
                            {categoryName}
                        </span>
                        <div className="flex items-center text-neutral-500">
                            <Calendar size={14} className="mr-1.5" />
                            {publishDate}
                        </div>
                        <div className="flex items-center text-neutral-500">
                            <User size={14} className="mr-1.5" />
                            {post.author?.name || 'Admin'}
                        </div>
                        <div className="flex items-center text-neutral-500">
                            <Clock size={14} className="mr-1.5" />
                            5 min read
                        </div>
                    </div>

                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold font-metropolis text-neutral-900 dark:text-white leading-tight mb-8">
                        {post.title}
                    </h1>

                    {/* Featured Image */}
                    {post.image && (
                        <div className="rounded-3xl overflow-hidden shadow-xl aspect-video relative">
                            <img
                                src={post.image}
                                alt={post.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}
                </div>
            </div>

            {/* Content Area */}
            <div className="max-w-3xl mx-auto px-4 md:px-8 py-20">
                <article className="prose prose-lg dark:prose-invert prose-neutral max-w-none">
                    {/* Excerpt/Lead */}
                    {post.excerpt && (
                        <div className="text-xl md:text-2xl font-light leading-relaxed text-neutral-600 dark:text-neutral-300 mb-12 border-l-4 border-primary pl-6 italic">
                            {post.excerpt}
                        </div>
                    )}

                    {/* Main Content Blocks or Legacy HTML */}
                    {contentBlocks.length > 0 ? (
                        <BlockRenderer blocks={contentBlocks} />
                    ) : (
                        <div dangerouslySetInnerHTML={{ __html: post.content || '' }} />
                    )}
                </article>

                {/* Tags & Share */}
                <div className="mt-20 pt-10 border-t border-neutral-200 dark:border-neutral-800 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div>
                        {/* Placeholder for tags if needed */}
                        <div className="flex items-center gap-2 text-sm text-neutral-500">
                            <Tag size={16} />
                            <span>Tags:</span>
                            <span className="text-neutral-900 dark:text-white font-medium">{categoryName}</span>
                        </div>
                    </div>

                    <Button variant="outline" className="rounded-full gap-2 hover:text-primary hover:border-primary">
                        <Share2 size={16} />
                        Bagikan Artikel
                    </Button>
                </div>
            </div>

            {/* Future: Related Posts Section could go here */}
        </div>
    );
}
