export default function AboutCTA() {
    return (
        <section className="py-20 md:py-32 bg-gradient-to-br from-primary to-pink-600 relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                <h2 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                    Siap Memulai Transformasi Digital?
                </h2>
                <p className="text-xl text-white/90 mb-10 leading-relaxed">
                    Bergabunglah dengan ribuan mitra sukses kami dan rasakan kemudahan berbisnis dengan teknologi terdepan.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                        href="/product/whitelabel-galareload"
                        className="px-8 py-4 bg-white text-primary rounded-full font-bold text-lg hover:bg-neutral-100 transition-all transform hover:scale-105 shadow-xl"
                    >
                        Konsultasi Gratis
                    </a>
                    <a
                        href="/pricing"
                        className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all"
                    >
                        Lihat Harga
                    </a>
                </div>

                {/* Trust badges */}
                <div className="mt-16 flex flex-wrap justify-center gap-8 text-white/80">
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="font-semibold">30K+ Mitra Aktif</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="font-semibold">99.9% Uptime</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="font-semibold">Support 24/7</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
