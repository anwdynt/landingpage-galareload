export default function AboutStats() {
    const stats = [
        {
            label: 'Total Mitra Aktif',
            value: '30K+',
            description: 'Di seluruh Indonesia',
        },
        {
            label: 'Transaksi Harian',
            value: '500K+',
            description: 'Real-time & stabil',
        },
        {
            label: 'Produk Digital',
            value: '2,500+',
            description: 'Lengkap & termurah',
        },
        {
            label: 'Uptime Server',
            value: '99.9%',
            description: 'Monitoring 24/7',
        },
    ];

    return (
        <div className="py-12 md:py-20 w-full bg-white dark:bg-zinc-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <h3 className="text-xl md:text-2xl font-bold text-primary mb-12 font-metropolis">
                    Numbers
                </h3>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
                    {stats.map((stat, index) => (
                        <div key={index} className="flex flex-col">
                            <span className="text-sm md:text-base font-semibold text-neutral-500 mb-2 font-google-sans">
                                {stat.label}
                            </span>
                            <span className="text-4xl md:text-6xl font-bold text-black dark:text-white mb-2 font-metropolis tracking-tight">
                                {stat.value}
                            </span>
                            <span className="text-xs md:text-sm text-neutral-400 font-medium font-google-sans">
                                {stat.description}
                            </span>
                        </div>
                    ))}
                </div>

                {/* Horizontal Divider */}
                <div className="w-full h-px bg-neutral-200 dark:bg-neutral-800 mt-20" />
            </div>
        </div>
    );
}
