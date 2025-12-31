import { AuroraBackground } from '~/components/ui/aurora-background';
import { Button } from '~/components/ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router';
import { ColourfulText } from '~/components/ui/colorfull-text';
import { TextGenerateEffect } from '~/components/ui/text-generate-effect';
import { Play } from 'lucide-react';

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
                    Web Report Terintegrasi untuk Pengelolaan Bisnis yang Optimal
                    <ColourfulText text="." />
                </h1>
                <TextGenerateEffect
                    className="text-xl md:text-2xl mt-0 font-extralight dark:text-white text-left font-google-sans text-parimary"
                    words="Pantau performa transaksi, keuangan, dan jaringan bisnis Anda secara real-time melalui dashboard web yang komprehensif, akurat, dan mudah dianalisis."
                />
                <div className="flex gap-4">
                    <Link
                        to="https://play.google.com/store/apps/details?id=com.galareload.app&hl=id"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Button className="px-8 py-0.5 font-google-sans border-2 border-black dark:border-white uppercase bg-white text-black transition hover:bg-inherit cursor-pointer duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] ">
                            <Play className="w-5 h-5" />
                            Lihat Demo
                        </Button>
                    </Link>
                </div>
            </motion.div>
        </AuroraBackground>
    );
}
