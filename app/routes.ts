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
            // route('/host-to-host-galareload', 'routes/product/host-to-host-galareload.tsx'),
            // route('/master-dealer-galareload', 'routes/product/master-dealer-galareload.tsx'),
        ]),
    ]),
] satisfies RouteConfig;
