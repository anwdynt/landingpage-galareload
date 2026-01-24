import AboutHero from './components/hero';
import AboutStory from './components/story';
import AboutValues from './components/values';
import AboutTimeline from './components/timeline';
import AboutCTA from './components/cta';

export default function AboutUs() {
    return (
        <main className="min-h-screen">
            <AboutHero />
            <AboutStory />
            <AboutValues />
            <AboutTimeline />
            <AboutCTA />
        </main>
    );
}
