import Hero from './hero';
import type { Post } from '~/types/blog';
// import Partners from './partners';
import Welcome from './welcome';
import Product from './product';
import Advantages from './advantages';
import CTA from './cta';
import Testimoni from './testimoni';
import SocialMedia from './social-media';
import FAQ from './faq';
import Blog from './blog';
import Partners from '~/components/ui/partners';

export function Index({ posts }: { posts: Post[] }) {
    return (
        <>
            <Hero />
            {/* <Welcome /> */}
            {/* <Product /> */}
            <Advantages />
            <SocialMedia />
            <CTA />
            <Partners />
            <Blog posts={posts} />
            <Testimoni />
            <FAQ />
        </>
    );
}
