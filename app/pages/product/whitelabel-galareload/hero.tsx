import { BackgroundBeams } from '~/components/ui/background-beams';
import { ColourfulText } from '~/components/ui/colorfull-text';
import { TextGenerateEffect } from '~/components/ui/text-generate-effect';
import { Link } from 'react-router';
import { Button } from '~/components/ui/button';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';

export default function Hero() {
    return (
        <div className="relative flex flex-col items-center justify-center min-h-[90vh] w-full px-4 overflow-hidden bg-white dark:bg-black">
            <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0.0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: 'easeInOut',
                    }}
                    className="flex flex-col items-center gap-8"
                >
                    <div className="space-y-4">
                        <h1 className="text-4xl md:text-7xl font-bold font-metropolis text-center text-black dark:text-white leading-tight">
                            Punya Aplikasi Pulsa <br />
                            dengan Brand Sendiri<ColourfulText text="." />
                        </h1>
                        <TextGenerateEffect
                            className="text-lg md:text-2xl font-light font-google-sans text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto text-center"
                            words="Solusi White Label terima beres. Tanpa ribet coding, tanpa pusing server. Anda fokus jualan, kami urus teknisnya."
                        />
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <Link
                            to="https://whitelabelmurah.com"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Button className="px-8 py-0.5 font-google-sans border-2 border-black dark:border-white uppercase bg-white text-black transition hover:bg-inherit cursor-pointer duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] ">
                                <Globe className="w-5 h-5" />
                                Lihat Selengkapnya
                            </Button>
                        </Link>
                    </div>

                    <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-neutral-500 text-sm font-medium pt-4">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500" />
                            <span>30.000+ Mitra</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-blue-500" />
                            <span>15+ Tahun Pengalaman</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-purple-500" />
                            <span>Setup Cepat</span>
                        </div>
                    </div>
                </motion.div>
            </div>
            <BackgroundBeams />
        </div>
    );
}
