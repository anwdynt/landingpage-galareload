import { ColourfulText } from '~/components/ui/colorfull-text';
import { BackgroundBeams } from '~/components/ui/background-beams';
import { Link } from 'react-router';
import { PhoneCall, Download } from 'lucide-react';

export default function CTA() {
    return (
        <div className="h-auto py-30 w-full bg-primary relative flex flex-col items-center justify-center antialiased">
            <div className="p-4 relative z-10 text-center">
                <h2 className="relative z-10 text-lg md:text-6xl bg-clip-text max-w-4xl text-transparent bg-linear-to-b from-white to-neutral-400 text-center font-metropolis font-semibold mb-6">
                    Siap Untuk Mendapatkan Passive Income?
                </h2>
                <p className="text-neutral-200 mx-auto mb-8 text-lg font-google-sans max-w-2xl leading-relaxed">
                    Jangan lewatkan kesempatan menjadi <span className="font-bold text-white">Master Dealer</span> prioritas.
                    Daftar sekarang, gratis biaya pendaftaran, dan mulai bangun kerajaan bisnis pulsa Anda.
                </p>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Link to="#" className="w-full sm:w-auto">
                        <button className="p-0.75 relative cursor-pointer z-20 w-full">
                            <div className="absolute inset-0 bg-linear-to-r from-indigo-500 to-purple-500 rounded-lg pointer-events-none" />
                            <div className="px-8 py-2 font-metropolis font-medium bg-black rounded-[6px] relative group transition duration-200 text-neutral-200 hover:bg-transparent flex items-center justify-center gap-2">
                                <Download className="w-5 h-5" />
                                <span>Download Aplikasi</span>
                            </div>
                        </button>
                    </Link>
                    <Link
                        to="#"
                        target="_blank"
                        rel="noreferrer"
                        className="w-full sm:w-auto"
                    >
                        <button className="p-0.75 relative cursor-pointer z-20 w-full">
                            <div className="absolute inset-0 bg-linear-to-r from-indigo-500 to-purple-500 rounded-lg pointer-events-none" />
                            <div className="px-8 py-2 font-metropolis font-medium bg-black rounded-[6px] relative group transition duration-200 text-neutral-200 hover:bg-transparent flex items-center justify-center gap-2">
                                <PhoneCall className="w-5 h-5" />
                                <span>Hubungi WhatsApp</span>
                            </div>
                        </button>
                    </Link>
                </div>
            </div>
            <BackgroundBeams />
        </div>
    );
}
