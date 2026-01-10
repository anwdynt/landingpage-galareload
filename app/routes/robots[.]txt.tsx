
import type { LoaderFunctionArgs } from "react-router";

export const loader = ({ request }: LoaderFunctionArgs) => {
    const baseUrl = new URL(request.url).origin;

    const robotText = `User-agent: *
Allow: /

Sitemap: ${baseUrl}/sitemap.xml
`;

    return new Response(robotText, {
        status: 200,
        headers: {
            "Content-Type": "text/plain",
        },
    });
};
