import AboutHero from './components/hero';
import AboutStory from './components/story';
import AboutMissionVision from './components/mission-vision';
import AboutStats from './components/stats';
import AboutValues from './components/values';
import AboutFAQ from './components/faq';
import AboutCTA from './components/cta';

export default function AboutUs() {
    return (
        <main className="min-h-screen bg-white dark:bg-neutral-50">
            <AboutHero />
            <AboutStory />
            <AboutMissionVision />
            {/* <AboutStats /> */}
            <AboutValues />
            <AboutCTA />
            <AboutFAQ />
        </main>
    );
}
