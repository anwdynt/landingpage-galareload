import Hero from './hero';
// import Partners from './partners';
import Welcome from './welcome';
import Product from './product';
import Advantages from './advantages';
import CTA from './cta';
import Testimoni from './testimoni';
import FAQ from './faq';

export function Index() {
    return (
        <>
            <Hero />
            <Welcome />
            <Product />
            <Advantages />
            <CTA />
            <Testimoni />
            <FAQ />
        </>
    );
}
