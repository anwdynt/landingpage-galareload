import {
    isRouteErrorResponse,
    Links,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
} from 'react-router';

import type { Route } from './+types/root';
import { Toaster } from '~/components/ui/sonner';
import './app.css'

export const links: Route.LinksFunction = () => [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com',
        crossOrigin: 'anonymous',
    },
    {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&family=Barlow:ital,wght@0,100..900;1,100..900&display=swap,https://fonts.googleapis.com/css2?family=Google+Sans:opsz,wght@17..18,400..700',
    },
];

import { JsonLd } from "~/components/seo/json-ld";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Gala Reload | Aplikasi Server Pulsa & PPOB Termurah" },
        { name: "description", content: "Platform agen pulsa dan PPOB termurah dan terpercaya. Layanan 24 jam untuk pulsa, paket data, token listrik, dan pembayaran tagihan." },
        { name: "keywords", content: "agen pulsa, server pulsa, ppob termurah, gala reload, pulsa murah, token listrik" },
        { property: "og:type", content: "website" },
        { property: "og:site_name", content: "Gala Reload" },
        { property: "og:title", content: "Gala Reload | Aplikasi Server Pulsa & PPOB Termurah" },
        { property: "og:description", content: "Platform agen pulsa dan PPOB termurah dan terpercaya. Layanan 24 jam." },
        { property: "twitter:card", content: "summary_large_image" },
        { property: "twitter:title", content: "Gala Reload | Aplikasi Server Pulsa & PPOB Termurah" },
        { property: "twitter:description", content: "Platform agen pulsa dan PPOB termurah dan terpercaya." },
    ];
};

export function Layout({ children }: { children: React.ReactNode }) {
    const organizationSchema = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Gala Reload",
        "url": "https://galareload.com",
        "logo": "https://galareload.com/icons/logo_gala_A.png",
        "sameAs": [
            "https://www.instagram.com/galareload_official",
            "https://www.facebook.com/profile.php?id=61585199416921",
            "https://tiktok.com/@galareload.official",
        ],
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+6281329701020",
            "contactType": "customer service",
            "areaServed": "ID",
            "availableLanguage": ["Indonesian", "English"]
        }
    };

    return (
        <html lang="en">
            <head>
                <meta charSet="utf-8" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <Meta />
                <Links />
                <JsonLd data={organizationSchema} />
            </head>
            <body className="overflow-x-hidden">
                {children}
                <ScrollRestoration />
                <Scripts />
                <Toaster />
            </body>
        </html>
    );
}

export default function App() {
    return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    let message = 'Oops!';
    let details = 'An unexpected error occurred.';
    let stack: string | undefined;

    if (isRouteErrorResponse(error)) {
        message = error.status === 404 ? '404' : 'Error';
        details =
            error.status === 404
                ? 'The requested page could not be found.'
                : error.statusText || details;
    } else if (import.meta.env.DEV && error && error instanceof Error) {
        details = error.message;
        stack = error.stack;
    }

    return (
        <main className="pt-16 p-4 container mx-auto">
            <h1>{message}</h1>
            <p>{details}</p>
            {stack && (
                <pre className="w-full p-4 overflow-x-auto">
                    <code>{stack}</code>
                </pre>
            )}
        </main>
    );
}
