import { AuroraBackground } from '~/components/ui/aurora-background';
import { Button } from '~/components/ui/button';
import { TextGenerateEffect } from '~/components/ui/text-generate-effect';
import { motion } from 'framer-motion';
import { ColourfulText } from '~/components/ui/colorfull-text';
import { Link } from 'react-router';
import { ChartAreaIcon } from 'lucide-react';

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
                    Solusi Aplikasi Server Pulsa untuk Bisnis Transaksi Digital
                    <ColourfulText text="." />
                </h1>
                <TextGenerateEffect
                    className="text-xl md:text-2xl mt-0 font-extralight dark:text-white text-left font-google-sans text-parimary"
                    words="Mendukung berbagai layanan transaksi digital seperti pulsa, paket data, PPOB, dan e-money dengan proses yang cepat dan dukungan sistem yang stabil."
                />
                <div className="flex gap-4">
                    <Link
                        to="https://play.google.com/store/apps/details?id=com.galareload.app&hl=id"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <Button className="px-8 py-0.5 font-google-sans border-2 border-black dark:border-white uppercase bg-white text-black transition hover:bg-inherit cursor-pointer duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                className="w-5 h-5"
                            >
                                <path d="M5.3323 1.0772C4.9455 0.8872 4.41703 1.0264 4.18023 1.0852C3.79343 1.1892 2.66223 1.7088 2.66223 1.7088L12.597 11.6436L16.489 7.7516L5.3323 1.0772Z" />
                                <path d="M22.5647 11.1616L18.0647 8.6616L13.8447 12.8816L18.0647 17.1016L22.5647 14.6016C23.1447 14.2816 23.5447 13.6816 23.5447 12.8816C23.5447 12.0816 23.1447 11.4816 22.5647 11.1616Z" />
                                <path d="M12.5969 14.1192L2.66211 24.054C2.66211 24.054 3.79331 24.5736 4.18011 24.6776C4.41691 24.7364 4.94531 24.8756 5.33211 24.6856L16.4889 18.0112L12.5969 14.1192Z" />
                                <path d="M1.49844 2.8724C1.31204 3.3228 1.15764 4.0704 1.15764 5.228V20.534C1.15764 21.6916 1.31204 22.4392 1.49844 22.8896L11.3592 12.8812L1.49844 2.8724Z" />
                            </svg>
                            Download
                        </Button>
                    </Link>
                    <Link
                        to="/product/webreport-galareload"
                    >
                        <Button className="px-8 py-0.5 font-google-sans border-2 border-black dark:border-white uppercase bg-white text-black transition hover:bg-inherit cursor-pointer duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] ">
                            <ChartAreaIcon className="w-5 h-5" />
                            Webreport
                        </Button>
                    </Link>
                </div>
            </motion.div>
        </AuroraBackground>
    );
}
