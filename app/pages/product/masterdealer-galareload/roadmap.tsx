import { Timeline } from '~/components/ui/timeline';
import { CheckCircle2 } from 'lucide-react';

export default function Roadmap() {
    const data = [
        {
            title: 'Master Konter',
            content: (
                <div>
                    <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm mb-4">
                        <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-google-sans mb-4">
                            Level awal untuk Anda yang memiliki konter fisik atau ingin memulai bisnis jualan pulsa skala kecil-menengah.
                        </p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                'Harga modal distributor (Termurah)',
                                'Bisa mendaftarkan agen/downline',
                                'Komisi transaksi agen cair tiap bulan',
                                'Akses aplikasi & webreport 24 jam'
                            ].map((benefit, idx) => (
                                <li key={idx} className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300 font-google-sans text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-blue-500" />
                                    {benefit}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            ),
        },
        {
            title: 'Master Dealer',
            content: (
                <div>
                    <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm mb-4">
                        <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-google-sans mb-4">
                            Level bisnis sesungguhnya. Fokus membangun jaringan tanpa batas wilayah. Anda adalah bos dari ribuan agen Anda.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                'Selisih harga lebih murah Rp 25 - Rp 50',
                                'Akses Master Dealer Panel (Web/App)',
                                'Fitur Markup Global (Otomatis cuan)',
                                'Berhak mengikuti program Reward Bulanan',
                                'Prioritas Support Jalur Khusus'
                            ].map((benefit, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300 font-google-sans text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-red-500" />
                                    {benefit}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ),
        },
        {
            title: 'White Label',
            content: (
                <div>
                    <div className="p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl shadow-sm mb-4">
                        <p className="text-neutral-800 dark:text-neutral-200 text-base md:text-lg font-google-sans mb-4">
                            Level tertinggi. Miliki server dan aplikasi brand sendiri. Kami urus teknisnya, Anda fokus besarkan brand Anda.
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                'Full Branding (Nama Aplikasi & Logo Sendiri)',
                                'Aplikasi rilis di Google Playstore',
                                'Web Report dengan Domain Sendiri (.com)',
                                'Manajemen User & Admin Full Control',
                                'Bebas atur harga & produk sedetail mungkin'
                            ].map((benefit, idx) => (
                                <div key={idx} className="flex items-center gap-2 text-neutral-700 dark:text-neutral-300 font-google-sans text-sm">
                                    <CheckCircle2 className="w-4 h-4 text-amber-500" />
                                    {benefit}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            ),
        },
    ];

    return (
        <div className="w-full">
            <Timeline data={data} />
        </div>
    );
}
