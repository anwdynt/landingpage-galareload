import CTA from './cta';
import Features from './features';
import Hero from './hero';
import Partners from '../app-galareload/partners';
import Testimonials from './testimonials';

export function Index() {
    return (
        <>
            <Hero />
            <Features />
            <Partners />
            <CTA />
            <Testimonials />
        </>
    );
}