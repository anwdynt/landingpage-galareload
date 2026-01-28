'use client';
import { BackgroundBeams } from '~/components/ui/background-beams';
import { ColourfulText } from '~/components/ui/colorfull-text';
import { Link } from 'react-router';
import { PhoneCall, Calendar } from 'lucide-react';

export default function AboutCTA() {
    return (
        <div className="h-auto py-30 w-full bg-neutral-900 relative flex flex-col items-center justify-center antialiased overflow-hidden">
            <div className="p-4 relative z-10">
                {/* Badge */}
                <div className="flex justify-center mb-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                        <span className="text-sm font-semibold text-white uppercase tracking-wider">
                            Konsultasi Gratis
                        </span>
                    </div>
                </div>

                {/* Heading */}
                <h2 className="relative z-10 text-3xl md:text-6xl max-w-4xl bg-clip-text text-transparent bg-linear-to-b from-white to-neutral-400 text-center font-metropolis font-semibold mb-4">
                    Konsultasi Gratis untuk Bisnis Anda
                    <ColourfulText text="!" />
                </h2>

                {/* Description */}
                <p className="text-neutral-200 mx-auto my-6 text-lg text-center relative z-10 font-google-sans max-w-2xl">
                    Tidak yakin mulai dari mana? Tim expert kami siap membantu Anda menemukan solusi digital yang tepat untuk bisnis Anda, tanpa biaya apapun!
                </p>

                {/* Benefits */}
                <div className="flex flex-wrap items-center justify-center gap-4 mb-8 text-neutral-300 text-sm relative z-10">
                    <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">100% Gratis</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">Tanpa Komitmen</span>
                    </div>
                    <div className="flex items-center gap-2 bg-white/5 px-4 py-2 rounded-full backdrop-blur-sm border border-white/10">
                        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="font-medium">Tanpa Tekanan</span>
                    </div>
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-col md:flex-row justify-center gap-4 pt-4">
                    <Link target="_blank" to="https://api.whatsapp.com/send/?phone=6281329701020&text=Saya+butuh+informasi+terkait+produk+Gala+Reload&type=phone_number&app_absent=0" className="w-full md:w-auto">
                        <button className="px-8 py-3 font-metropolis font-medium bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-lg border border-white/20 transition-all duration-300 flex items-center justify-center gap-2 relative z-20">
                            <PhoneCall className="w-5 h-5" />
                            <span>Hubungi Sekarang</span>
                        </button>
                    </Link>
                </div>

                {/* Additional Info */}
                <p className="text-neutral-300 text-sm text-center mt-8 relative z-10">
                    Respon dalam <strong className="text-white">1 jam kerja</strong> | Available <strong className="text-white">7 hari seminggu</strong>
                </p>
            </div>

            <BackgroundBeams />
        </div>
    );
}
