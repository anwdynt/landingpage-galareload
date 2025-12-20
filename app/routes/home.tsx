import type { Route } from './+types/home';
import { Index } from '../pages/home/index';

export function meta({}: Route.MetaArgs) {
    return [
        { title: 'New React Router App' },
        { name: 'description', content: 'Home to React Router!' },
    ];
}

export default function Home() {
    return <Index />;
}
