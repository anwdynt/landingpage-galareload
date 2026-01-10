import type { Route } from './+types/home';
import { Index } from '../pages/home/index';
import { getPublishedPosts } from '~/server/post.server';

import { JsonLd } from "~/components/seo/json-ld";

export function meta({ }: Route.MetaArgs) {
    return [
        { title: 'Gala Reload | Aplikasi Server Pulsa, PPOB & Tiket Termurah' },
        { name: 'description', content: 'Gala Reload adalah aplikasi server pulsa dan PPOB termurah, terlengkap, dan terpercaya. Daftar sekarang gratis dan nikmati transaksi 24 jam nonstop.' },
        { name: 'keywords', content: 'server pulsa termurah, agen pulsa, bisnis ppob, tiket pesawat murah, token listrik murah, voucher game, gala reload app' },
        { property: 'og:title', content: 'Gala Reload | Aplikasi Server Pulsa, PPOB & Tiket Termurah' },
        { property: 'og:description', content: 'Gabung Gala Reload untuk bisnis pulsa dan PPOB paling menguntungkan. Transaksi cepat, produk lengkap, harga bersaing.' },
    ];
}

export async function loader() {
    // Fetch latest 3 posts
    const { posts } = await getPublishedPosts({ limit: 5 });
    return { posts };
}

export default function Home({ loaderData }: Route.ComponentProps) {
    const websiteSchema = {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Gala Reload",
        "url": "https://galareload.id",
        "potentialAction": {
            "@type": "SearchAction",
            "target": "https://galareload.id/search?q={search_term_string}",
            "query-input": "required name=search_term_string"
        }
    };
    const { posts } = loaderData;
    return (
        <>
            <JsonLd data={websiteSchema} />
            <Index posts={posts} />
        </>
    );
}
