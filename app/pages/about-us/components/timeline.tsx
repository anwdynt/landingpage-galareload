export default function AboutTimeline() {
    const milestones = [
        {
            year: "2015",
            title: "Awal Perjalanan",
            description: "Didirikan di Semarang dengan fokus distribusi pulsa elektrik regional Jawa Tengah."
        },
        {
            year: "2018",
            title: "Ekspansi Teknologi",
            description: "Meluncurkan sistem H2H pertama, memungkinkan integrasi real-time dengan 50K+ transaksi harian."
        },
        {
            year: "2021",
            title: "Era White Label",
            description: "Membantu ratusan mitra memiliki aplikasi sendiri. Ekosistem Gala Reload terbentuk."
        },
        {
            year: "2024",
            title: "Kepemimpinan Industri",
            description: "Melayani 30.000+ mitra aktif sebagai salah satu penyedia infrastruktur terpercaya di Indonesia."
        }
    ];

    return (
        <section className="py-20 md:py-32 bg-white dark:bg-neutral-950">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
                        Perjalanan Kami
                    </h2>
                    <p className="text-xl text-neutral-600 dark:text-neutral-400">
                        Milestone penting dalam sejarah Gala Reload
                    </p>
                </div>

                <div className="relative">
                    {/* Timeline line */}
                    <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-primary via-primary/50 to-primary"></div>

                    <div className="space-y-12">
                        {milestones.map((milestone, index) => (
                            <div
                                key={index}
                                className={`relative flex items-center ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                                    }`}
                            >
                                {/* Content */}
                                <div className="flex-1 md:px-8">
                                    <div className={`bg-neutral-50 dark:bg-neutral-900 p-6 rounded-2xl ${index % 2 === 0 ? 'md:mr-4' : 'md:ml-4'
                                        }`}>
                                        <div className="text-3xl font-bold text-primary mb-2">{milestone.year}</div>
                                        <h3 className="text-xl font-bold text-neutral-900 dark:text-white mb-2">
                                            {milestone.title}
                                        </h3>
                                        <p className="text-neutral-600 dark:text-neutral-400">
                                            {milestone.description}
                                        </p>
                                    </div>
                                </div>

                                {/* Center dot */}
                                <div className="hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-white dark:border-neutral-950 z-10"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
