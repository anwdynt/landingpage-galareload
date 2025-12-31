import { ColourfulText } from '~/components/ui/colorfull-text';
import { BackgroundBeams } from '~/components/ui/background-beams';
import { Link } from 'react-router';
import { Play, PhoneCall } from 'lucide-react';

export default function CTA() {
    return (
        <div className="h-auto py-30 w-full bg-primary relative flex flex-col items-center justify-center antialiased">
            <div className="p-4">
                <h2 className="relative z-10 text-lg md:text-6xl bg-clip-text text-transparent bg-linear-to-b from-white to-neutral-400 text-center font-metropolis font-semibold max-w-3xl">
                    Siap Membawa Bisnis ke Level Selanjutnya?
                    <ColourfulText text="!" />
                </h2>
                <p className="text-neutral-200 mx-auto my-4 text-lg text-center relative z-10 font-google-sans max-w-xl">
                    Akses data real-time, pantau performa agen, dan cetak laporan keuangan dengan mudah melalui Web Report Galareload.
                </p>
                <div className="flex justify-center gap-4">
                    <Link to="#">
                        <button className="p-0.75 relative cursor-pointer z-20">
                            <div className="absolute inset-0 bg-linear-to-r from-indigo-500 to-purple-500 rounded-lg pointer-events-none" />
                            <div className="px-8 py-2 font-metropolis font-medium bg-black rounded-[6px] relative group transition duration-200 text-neutral-200 hover:bg-transparent flex items-center gap-2">
                                <PhoneCall className="w-5 h-5" />
                                <span>Hubungi Kami</span>
                            </div>
                        </button>
                    </Link>
                    <Link
                        to="#"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <button className="p-0.75 relative cursor-pointer z-20">
                            <div className="absolute inset-0 bg-linear-to-r from-indigo-500 to-purple-500 rounded-lg pointer-events-none" />
                            <div className="px-8 py-2 font-metropolis font-medium bg-black rounded-[6px] relative group transition duration-200 text-neutral-200 hover:bg-transparent flex items-center gap-2">
                                <Play className="w-5 h-5" />
                                <span>Demo Web Report</span>
                            </div>
                        </button>
                    </Link>
                </div>
            </div>
            <BackgroundBeams />
        </div>
    );
}
