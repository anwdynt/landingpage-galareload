import {
    type RouteConfig,
    index,
    layout,
    route,
    prefix,
} from '@react-router/dev/routes';

export default [
    // Public Routes (Main Layout)
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

    // Auth Routes
    route('/admin-panel', 'routes/login.tsx'),
    route('/logout', 'routes/logout.tsx'),
    route('/api/upload', 'routes/api.upload.ts'), // Endpoint for file uploads

    // Admin Routes
    layout('routes/admin/layout.tsx', [
        route('/admin/dashboard', 'routes/admin/dashboard.tsx'),
        route('/admin/posts', 'routes/admin/post-list.tsx'),
        route('/admin/posts/new', 'routes/admin/post-new.tsx'),
        route('/admin/posts/:id', 'routes/admin/post-detail.tsx'),
        route('/admin/users', 'routes/admin/users.tsx'),
        route('/admin/users/new', 'routes/admin/user-new.tsx'),
        route('/admin/users/:id', 'routes/admin/user-detail.tsx'),
        route('/admin/categories', 'routes/admin/categories.tsx'),
        // Add more admin routes here later
    ]),

    // SEO Routes
    route('/sitemap.xml', 'routes/sitemap[.]xml.tsx'),
    route('/robots.txt', 'routes/robots[.]txt.tsx'),
] satisfies RouteConfig;
