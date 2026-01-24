import { Timeline } from '~/components/ui/timeline';

export default function AboutJourney() {
    const data = [
        {
            title: "2015",
            content: (
                <div>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        Lahir di sebuah ruko kecil di Semarang. Fokus awal kami hanya sebagai distributor pulsa elektrik regional Jawa Tengah.
                    </p>
                </div>
            ),
        },
        {
            title: "2018",
            content: (
                <div>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        Meluncurkan sistem H2H (Host to Host) pertama kami, memungkinkan integrasi dengan aplikasi pihak ketiga secara real-time. Transaksi harian menembus 50.000 hit.
                    </p>
                </div>
            ),
        },
        {
            title: "2021",
            content: (
                <div>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        Pivot ke layanan White Label. Membantu ratusan mitra memiliki aplikasi Android sendiri dengan brand mereka. Ekosistem Gala Reload terbentuk.
                    </p>
                </div>
            ),
        },
        {
            title: "2024 - Sekarang",
            content: (
                <div>
                    <p className="text-neutral-800 dark:text-neutral-200 text-xs md:text-sm font-normal mb-8">
                        Menjadi salah satu penyedia infrastruktur server pulsa & PPOB terpercaya di Indonesia dengan 30.000+ mitra aktif dan tim yang terus bertumbuh.
                    </p>
                </div>
            ),
        },
    ];

    return (
        <div className="w-full bg-white dark:bg-neutral-950">
            <Timeline data={data} />
        </div>
    );
}
