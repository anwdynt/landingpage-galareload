import {
    type RouteConfig,
    index,
    layout,
    route,
    prefix,
} from '@react-router/dev/routes';

export default [
    layout('./layouts/main.tsx', [
        index('routes/home.tsx'),
        ...prefix('/product', [
            route('/aplikasi-galareload', 'routes/product/app-galareload.tsx'),
            route('/webreport-galareload', 'routes/product/webreport-galareload.tsx'),
            route('/whitelabel-galareload', 'routes/product/whitelabel-galareload.tsx'),
            route('/host-to-host-galareload', 'routes/product/h2h-galareload.tsx'),
            route('/master-dealer-galareload', 'routes/product/masterdealer-galareload.tsx'),
        ]),
        route('/blog', 'routes/blog/index.tsx'),
        route('/blog/:slug', 'routes/blog/detail.tsx'),
        route('/pricing', 'routes/pricing.tsx'),
    ]),
    route('/sitemap.xml', 'routes/sitemap[.]xml.tsx'),
    route('/robots.txt', 'routes/robots[.]txt.tsx'),
] satisfies RouteConfig;
