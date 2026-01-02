import { ColourfulText } from '~/components/ui/colorfull-text';
import { FocusCards } from '~/components/ui/focus-cards';

export default function Benefits() {
    const items = [
        {
            title: 'Passive Income Tanpa Batas',
            description: 'Dapatkan komisi dari setiap transaksi yang dilakukan oleh agen dalam jaringan Anda.',
            src: '/images/benefits/passive-income.png',
        },
        {
            title: 'Full Kontrol Manajemen',
            description: 'Fitur lengkap untuk mendaftarkan agen, transfer saldo, dan setting markup.',
            src: '/images/benefits/full-control.png',
        },
        {
            title: 'Proses Transaksi Kilat',
            description: 'Server berkapasitas tinggi menjamin kecepatan transaksi hitungan detik.',
            src: '/images/benefits/fast-transaction.png',
        },
        {
            title: 'Reward Bulanan',
            description: 'Kumpulkan poin transaksi dan tukarkan dengan hadiah menarik.',
            src: '/images/benefits/monthly-reward.png',
        },
        {
            title: 'Sistem Aman',
            description: 'Keamanan data dan saldo terjamin dengan enkripsi mutakhir.',
            src: '/images/benefits/secure-system.png',
        },
        {
            title: 'Support 24/7',
            description: 'CS standby membantu Anda via WhatsApp dan Telegram.',
            src: '/images/benefits/support-247.png',
        },
    ];

    return (
        <div className="px-8 py-20  dark:bg-neutral-950">
            <div className='max-w-7xl mx-auto'>
                <div className="text-start mb-16">
                    <h2 className="text-3xl max-w-xl md:text-5xl font-bold font-metropolis dark:text-white mb-4">
                        Keuntungan menjadi master dealer<ColourfulText text="." />
                    </h2>
                    <p className="text-lg text-neutral-600 dark:text-neutral-400 font-google-sans">
                        Fasilitas eksklusif yang kami siapkan untuk mendukung percepatan bisnis pulsa Anda.
                    </p>
                </div>

                <FocusCards cards={items} />
            </div>
        </div>
    );
}
