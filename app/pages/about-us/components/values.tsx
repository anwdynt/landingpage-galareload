export default function AboutValues() {
    const values = [
        {
            number: "01",
            title: "Inovasi Berkelanjutan",
            description: "Kami terus mengembangkan teknologi terbaru untuk memberikan solusi yang lebih baik dan efisien bagi mitra kami."
        },
        {
            number: "02",
            title: "Kepercayaan & Transparansi",
            description: "Membangun hubungan jangka panjang melalui kejujuran, transparansi, dan komitmen terhadap kesuksesan bersama."
        },
        {
            number: "03",
            title: "Pertumbuhan Bersama",
            description: "Kesuksesan kami adalah kesuksesan mitra kami. Kami berkomitmen untuk tumbuh dan berkembang bersama."
        },
        {
            number: "04",
            title: "Layanan Terbaik",
            description: "Support responsif 24/7 dengan tim yang memahami kebutuhan bisnis dan siap membantu kapan pun dibutuhkan."
        }
    ];

    return (
        <section className="py-20 md:py-32 bg-neutral-50 dark:bg-neutral-900">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-neutral-900 dark:text-white mb-4">
                        Nilai-Nilai Kami
                    </h2>
                    <p className="text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
                        Prinsip yang menjadi fondasi setiap langkah kami
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {values.map((value, index) => (
                        <div
                            key={index}
                            className="group relative bg-white dark:bg-neutral-950 p-8 rounded-2xl border border-neutral-200 dark:border-neutral-800 hover:border-primary transition-all duration-300"
                        >
                            <div className="flex items-start gap-6">
                                <div className="text-6xl font-bold text-primary/20 group-hover:text-primary/30 transition-colors">
                                    {value.number}
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold text-neutral-900 dark:text-white mb-3 group-hover:text-primary transition-colors">
                                        {value.title}
                                    </h3>
                                    <p className="text-neutral-600 dark:text-neutral-400 leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
