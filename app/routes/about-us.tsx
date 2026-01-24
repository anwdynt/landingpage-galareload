import type { Route } from './+types/about-us';
import AboutUs from '~/pages/about-us';

export function meta() {
    return [
        { title: 'Tentang Kami | Gala Reload' },
        { name: 'description', content: 'Gala Reload adalah partner terpercaya dalam transformasi digital bisnis Anda. Melayani lebih dari 30.000 klien sejak 2015.' },
        { property: 'og:title', content: 'Tentang Kami | Gala Reload' },
        { property: 'og:description', content: 'Membangun Masa Depan Digital Bersama Anda. Kami hadir sebagai partner terpercaya dalam transformasi digital bisnis Anda.' },
    ];
}

export default function AboutUsRoute() {
    return <AboutUs />;
}
