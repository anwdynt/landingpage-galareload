import { motion } from 'framer-motion';
import { ColourfulText } from '~/components/ui/colorfull-text';
import { BackgroundBeams } from '~/components/ui/background-beams';
import { Link } from 'react-router';
import { Button } from '~/components/ui/button';
import { TrendingUp, Users, ShieldCheck } from 'lucide-react';
import { TextGenerateEffect } from '~/components/ui/text-generate-effect';

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
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <span className="px-3 py-1 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 text-xs font-semibold tracking-wide uppercase border border-red-200 dark:border-red-800">
                                Program Kemitraan
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-7xl font-bold font-metropolis text-center text-black dark:text-white leading-tight">
                            Bergabunglah Sebagai Master Dealer
                            <ColourfulText text="." />
                        </h1>
                        <TextGenerateEffect
                            className="text-lg md:text-2xl font-light font-google-sans text-neutral-600 dark:text-neutral-300 max-w-3xl mx-auto text-center"
                            words="Naik level sekarang, bangun jaringan agen Anda sendiri, dan maksimalkan potensi passive income tanpa batas bersama Galareload."
                        />
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                        <Link
                            to="#"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Button className="px-8 py-0.5 font-google-sans border-2 border-black dark:border-white uppercase bg-white text-black transition hover:bg-inherit cursor-pointer duration-200 text-sm shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)] ">
                                Daftar Master Dealer
                            </Button>
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-12 mt-8 w-full max-w-4xl">
                        <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
                            <TrendingUp className="w-8 h-8 text-green-500" />
                            <h3 className="font-bold text-lg dark:text-white">Passive Income</h3>
                            <p className="text-sm text-neutral-500 text-center">Komisi transaksi downline seumur hidup.</p>
                        </div>
                        <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
                            <Users className="w-8 h-8 text-blue-500" />
                            <h3 className="font-bold text-lg dark:text-white">Unlimited Agen</h3>
                            <p className="text-sm text-neutral-500 text-center">Bebas rekrut agen sebanyak-banyaknya.</p>
                        </div>
                        <div className="flex flex-col items-center gap-2 p-4 rounded-xl bg-neutral-50 dark:bg-neutral-900/50 border border-neutral-200 dark:border-neutral-800">
                            <ShieldCheck className="w-8 h-8 text-red-500" />
                            <h3 className="font-bold text-lg dark:text-white">Harga Lebih Murah</h3>
                            <p className="text-sm text-neutral-500 text-center">Selisih harga modal lebih kompetitif.</p>
                        </div>
                    </div>
                </motion.div>
            </div>
            <BackgroundBeams />
        </div>
    );
}
