import { BackgroundBeams } from '~/components/ui/background-beams';
import { ColourfulText } from '~/components/ui/colorfull-text';

export default function CTA() {
    return (
        <div className="h-auto py-30 w-full bg-primary relative flex flex-col items-center justify-center antialiased">
            <div className="p-4">
                <h2 className="relative z-10 text-lg md:text-6xl bg-clip-text text-transparent bg-linear-to-b from-white to-neutral-400 text-center font-metropolis font-semibold">
                    Mulai Bisnis Anda Sekarang
                    <ColourfulText text="!" />
                </h2>
                <p className="text-neutral-200 mx-auto my-4 text-lg text-center relative z-10 font-google-sans max-w-lg">
                    Bergabung dengan Galareload untuk mendapatkan keuntungan
                    terbaik bagi bisnis anda.
                </p>
                <div className="flex justify-center">
                    <button className="p-0.75 relative cursor-pointer z-20">
                        <div className="absolute inset-0 bg-linear-to-r from-indigo-500 to-purple-500 rounded-lg pointer-events-none" />
                        <div className="px-12 py-2 font-metropolis font-medium bg-black rounded-[6px] relative group transition duration-200 text-neutral-200 hover:bg-transparent">
                            Hubungi Kami
                        </div>
                    </button>
                </div>
            </div>
            <BackgroundBeams />
        </div>
    );
}
