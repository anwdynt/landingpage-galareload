export default function AboutHero() {
    return (
        <section className="relative min-h-[70vh] flex items-center justify-center bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 overflow-hidden">
            {/* Animated background grid */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(255,255,255,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.05) 1px, transparent 1px)',
                        backgroundSize: '50px 50px'
                    }}
                />
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-6xl mx-auto px-6 py-20 text-center">
                <div className="inline-block px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-8">
                    <span className="text-primary text-sm font-semibold tracking-wide">TENTANG KAMI</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                    Partner Terpercaya untuk<br />
                    <span className="bg-gradient-to-r from-primary to-pink-500 bg-clip-text text-transparent">
                        Transformasi Digital
                    </span>
                </h1>

                <p className="text-xl text-neutral-300 max-w-3xl mx-auto leading-relaxed">
                    Sejak 2015, kami membantu ribuan bisnis Indonesia berkembang melalui solusi server pulsa, PPOB, dan teknologi digital yang inovatif.
                </p>

                {/* Scroll indicator */}
                <div className="mt-16 animate-bounce">
                    <svg className="w-6 h-6 mx-auto text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </div>
        </section>
    );
}
