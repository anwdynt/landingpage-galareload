
import type { LoaderFunctionArgs } from "react-router";

export const loader = async ({ request }: LoaderFunctionArgs) => {
    const baseUrl = new URL(request.url).origin;

    // List of static routes
    const routes = [
        "",
        "/pricing",
        "/blog",
        "/contact",
    ];

    // In a real app, you would fetch dynamic routes (e.g., blog posts) here
    // const posts = await getPosts();
    // posts.forEach(post => routes.push(\`/blog/\${post.slug}\`));

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  ${routes
            .map((route) => {
                return `
    <url>
      <loc>${baseUrl}${route}</loc>
      <lastmod>${new Date().toISOString()}</lastmod>
      <changefreq>daily</changefreq>
      <priority>${route === "" ? "1.0" : "0.8"}</priority>
    </url>`;
            })
            .join("")}
</urlset>`;

    return new Response(sitemap, {
        status: 200,
        headers: {
            "Content-Type": "application/xml",
            "xml-version": "1.0",
            "encoding": "UTF-8",
        },
    });
};
