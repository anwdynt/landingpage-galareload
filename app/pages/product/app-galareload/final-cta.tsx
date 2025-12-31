import { ColourfulText } from '~/components/ui/colorfull-text';
import { BackgroundBeams } from '~/components/ui/background-beams';
import { Link } from 'react-router';
import { PhoneCall } from 'lucide-react';

export default function FinalCTA() {
    return (
        <div className="h-auto py-30 w-full bg-primary relative flex flex-col items-center justify-center antialiased">
            <div className="p-4">
                <h2 className="relative z-10 text-lg md:text-6xl bg-clip-text max-w-4xl text-transparent bg-linear-to-b from-white to-neutral-400 text-center font-metropolis font-semibold">
                    Siap Mengembangkan Bisnis Anda?
                    <ColourfulText text="!" />
                </h2>
                <p className="text-neutral-200 mx-auto my-4 text-lg text-center relative z-10 font-google-sans max-w-xl">
                    Bergabunglah dengan ribuan mitra sukses lainnya. Download aplikasi Galareload sekarang dan rasakan kemudahannya.
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
                        to="https://play.google.com/store/apps/details?id=com.galareload.app&hl=id"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <button className="p-0.75 relative cursor-pointer z-20">
                            <div className="absolute inset-0 bg-linear-to-r from-indigo-500 to-purple-500 rounded-lg pointer-events-none" />
                            <div className="px-8 py-2 font-metropolis font-medium bg-black rounded-[6px] relative group transition duration-200 text-neutral-200 hover:bg-transparent flex items-center gap-2">
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
                                <span>Download Aplikasi</span>
                            </div>
                        </button>
                    </Link>
                </div>
            </div>
            <BackgroundBeams />
        </div>
    );
}
