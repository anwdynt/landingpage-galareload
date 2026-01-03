import Hero from './hero';
// import Partners from './partners';
import Welcome from './welcome';
import Product from './product';
import Advantages from './advantages';
import CTA from './cta';
import Testimoni from './testimoni';
import SocialMedia from './social-media';
import FAQ from './faq';
import Blog from './blog';

export function Index() {
    return (
        <>
            <Hero />
            <Welcome />
            <Product />
            <Advantages />
            <SocialMedia />
            <CTA />
            <Blog />
            <Testimoni />
            <FAQ />
        </>
    );
}
