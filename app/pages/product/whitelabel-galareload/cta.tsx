import { ColourfulText } from '~/components/ui/colorfull-text';
import { BackgroundBeams } from '~/components/ui/background-beams';
import { Link } from 'react-router';
import { PhoneCall, Globe } from 'lucide-react';

export default function CTA() {
    return (
        <div className="h-auto py-30 w-full bg-primary relative flex flex-col items-center justify-center antialiased">
            <div className="p-4">
                <h2 className="relative z-10 text-lg md:text-6xl bg-clip-text max-w-4xl text-transparent bg-linear-to-b from-white to-neutral-400 text-center font-metropolis font-semibold">
                    Siap Punya Aplikasi Dengan Nama Brand Sendiri
                    <ColourfulText text="?" />
                </h2>
                <p className="text-neutral-200 mx-auto my-4 text-lg text-center relative z-10 font-google-sans max-w-2xl">
                    Jangan buang waktu mengurusi teknis. Bergabunglah dengan 30.000+ mitra sukses lainnya.
                    Kunjungi website resmi kami untuk detail paket dan demo aplikasi.
                </p>
                <div className="flex flex-col md:flex-row justify-center gap-4 pt-4">
                    <Link to="#" className="w-full md:w-auto">
                        <button className="p-0.75 relative cursor-pointer z-20 w-full">
                            <div className="absolute inset-0 bg-linear-to-r from-indigo-500 to-purple-500 rounded-lg pointer-events-none" />
                            <div className="px-8 py-2 font-metropolis font-medium bg-black rounded-[6px] relative group transition duration-200 text-neutral-200 hover:bg-transparent flex items-center justify-center gap-2">
                                <PhoneCall className="w-5 h-5" />
                                <span>Hubungi Kami</span>
                            </div>
                        </button>
                    </Link>
                    <Link
                        to="https://whitelabelmurah.com/"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full md:w-auto"
                    >
                        <button className="p-0.75 relative cursor-pointer z-20 w-full">
                            <div className="absolute inset-0 bg-linear-to-r from-indigo-500 to-purple-500 rounded-lg pointer-events-none" />
                            <div className="px-8 py-2 font-metropolis font-medium bg-black rounded-[6px] relative group transition duration-200 text-neutral-200 hover:bg-transparent flex items-center justify-center gap-2">
                                <Globe className="w-5 h-5" />
                                <span>Selengkapnya</span>
                            </div>
                        </button>
                    </Link>
                </div>
            </div>
            <BackgroundBeams />
        </div>
    );
}
