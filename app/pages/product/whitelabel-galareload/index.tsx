import Hero from './hero';
import Features from './features';
import CTA from './cta';
import Partners from '../app-galareload/partners';
import HowItWorks from './how-it-works';
import Testimonials from './testimonials';

export function Index() {
    return (
        <>
            <Hero />
            <Features />
            <HowItWorks />
            <Partners />
            <CTA />
            <Testimonials />
        </>
    );
}