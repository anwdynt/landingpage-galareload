import { AuroraBackground } from '~/components/ui/aurora-background';
import { Button } from '~/components/ui/button';
import { TextGenerateEffect } from '~/components/ui/text-generate-effect';
import { motion } from 'framer-motion';
import { ColourfulText } from '~/components/ui/colorfull-text';
import { Link } from 'react-router';

export default function Hero() {
    return (
        <AuroraBackground className="-mt-14 space-y-1">
            <motion.div
                initial={{ opacity: 0.0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
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
        </AuroraBackground>
    );
}
