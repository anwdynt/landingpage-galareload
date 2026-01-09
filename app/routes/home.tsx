import type { Route } from './+types/home';
import { Index } from '../pages/home/index';
import { getPublishedPosts } from '~/server/post.server';

export function meta({ }: Route.MetaArgs) {
    return [
        { title: 'New React Router App' },
        { name: 'description', content: 'Home to React Router!' },
    ];
}

export async function loader() {
    // Fetch latest 3 posts
    const { posts } = await getPublishedPosts({ limit: 5 });
    return { posts };
}

export default function Home({ loaderData }: Route.ComponentProps) {
    const { posts } = loaderData;
    return <Index posts={posts} />;
}
