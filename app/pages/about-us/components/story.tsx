export default function AboutStory() {
    return (
        <section className="py-20 md:py-32 bg-white dark:bg-neutral-950">
            <div className="max-w-7xl mx-auto px-6">
                {/* Main Story */}
                <div className="grid md:grid-cols-2 gap-16 items-center mb-24">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-6 leading-tight">
                            Perjalanan Kami Dimulai dari Visi Sederhana
                        </h2>
                        <div className="w-20 h-1 bg-primary mb-8"></div>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 mb-6 leading-relaxed">
                            Pada tahun 2015, kami memulai dengan misi sederhana: <strong className="text-neutral-900 dark:text-white">membuat teknologi finansial dapat diakses oleh semua orang</strong>.
                        </p>
                        <p className="text-lg text-neutral-600 dark:text-neutral-400 leading-relaxed">
                            Dari sebuah kantor kecil di Semarang, kini kami melayani lebih dari 30.000 mitra di seluruh Indonesia. Kami tidak hanya menyediakan teknologi, tetapi membangun ekosistem yang memberdayakan bisnis untuk tumbuh.
                        </p>
                    </div>

                    <div className="relative">
                        <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-purple-500/20 p-1">
                            <div className="w-full h-full rounded-2xl bg-white dark:bg-neutral-900 p-8 flex items-center justify-center">
                                <div className="text-center">
                                    <div className="text-6xl font-bold text-primary mb-4">2015</div>
                                    <div className="text-xl text-neutral-600 dark:text-neutral-400">Tahun Berdiri</div>
                                    <div className="mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800">
                                        <div className="text-5xl font-bold text-neutral-900 dark:text-white mb-2">30K+</div>
                                        <div className="text-neutral-600 dark:text-neutral-400">Mitra Aktif</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                    <div className="text-center p-6 rounded-xl bg-neutral-50 dark:bg-neutral-900">
                        <div className="text-4xl font-bold text-primary mb-2">500K+</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-400">Transaksi Harian</div>
                    </div>
                    <div className="text-center p-6 rounded-xl bg-neutral-50 dark:bg-neutral-900">
                        <div className="text-4xl font-bold text-primary mb-2">99.9%</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-400">Server Uptime</div>
                    </div>
                    <div className="text-center p-6 rounded-xl bg-neutral-50 dark:bg-neutral-900">
                        <div className="text-4xl font-bold text-primary mb-2">2.5K+</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-400">Produk Digital</div>
                    </div>
                    <div className="text-center p-6 rounded-xl bg-neutral-50 dark:bg-neutral-900">
                        <div className="text-4xl font-bold text-primary mb-2">24/7</div>
                        <div className="text-sm text-neutral-600 dark:text-neutral-400">Customer Support</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
