import { AuroraBackground } from '~/components/ui/aurora-background';
import { Button } from '~/components/ui/button';
import { TextGenerateEffect } from '~/components/ui/text-generate-effect';
import { motion } from 'framer-motion';
import { ColourfulText } from '~/components/ui/colorfull-text';
import { Link } from 'react-router';
import { useIsMobile } from '~/hooks/use-mobile';

export default function Hero() {
    const isMobile = useIsMobile();

    return (
        <div className="relative w-full">
            {/* Mobile: Simple White BG */}
            <div className="md:hidden -mt-14 space-y-1 bg-white dark:bg-zinc-900 flex flex-col items-center justify-center min-h-[80vh] pt-20">
                <HeroContent />
            </div>

            {/* Desktop: Aurora Background. Only render if NOT mobile to save resources. */}
            <div className="hidden md:block">
                {!isMobile ? (
                    <AuroraBackground className="-mt-14 space-y-1">
                        <HeroContent />
                    </AuroraBackground>
                ) : (
                    // Fallback to prevent layout shift if needed, or just nothing since the mobile view is handling it?
                    // But wait, the mobile view is in a md:hidden block.
                    // The desktop view is in a hidden md:block.
                    // If isMobile is true (mobile device), we are in the md:hidden block visible.
                    // The hidden md:block is hidden via CSS anyway.
                    // So we just want to ensure Aurora is NOT mounted.
                    null
                )}
            </div>
        </div>
    );
}

function HeroContent() {
    const isMobile = useIsMobile();

    return (
        <motion.div
            initial={isMobile ? { opacity: 1, y: 0 } : { opacity: 0.0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={isMobile ? { duration: 0 } : {
                delay: 0.3,
                duration: 0.8,
                ease: 'easeInOut',
            }}
            className="relative flex flex-col gap-4 items-start justify-start px-4 max-w-7xl"
        >
            <h1 className="text-3xl md:text-7xl font-semibold dark:text-white text-left font-metropolis leading-tight">
                Aplikasi pulsa yang dibuat untuk konter pulsa
                <ColourfulText text="." />
            </h1>
            <TextGenerateEffect
                className="text-xl md:text-2xl mt-0 font-extralight dark:text-white text-left font-google-sans text-parimary"
                words="Produk berkualitas dengan harga terbaik."
            />
            <Link target="_blank" to="https://api.whatsapp.com/send/?phone=6281329701020&text=Saya+butuh+informasi+terkait+produk+Gala+Reload&type=phone_number&app_absent=0" className="gap-2 flex">
                <Button className="px-8 py-0.5 font-google-sans border-2 border-black dark:border-white uppercase bg-white text-black transition hover:bg-inherit cursor-pointer duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] ">
                    Mulai Sekarang
                </Button>
            </Link>
        </motion.div>
    );
}
