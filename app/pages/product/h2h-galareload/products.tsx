import { ColourfulText } from '~/components/ui/colorfull-text';
import { FocusCards } from '~/components/ui/focus-cards';

export default function Products() {
    const cards = [
        {
            title: 'Pulsa All Operator',
            src: '/images/h2h/pulsa-all-operator.png',
            description: 'Stok nasional lengkap Telkomsel, Indosat, XL, Axis, Three, Smartfren.',
        },
        {
            title: 'Token PLN 24 Jam',
            src: '/images/h2h/token-pln.png',
            description: 'Denom 20k - 1jt. Response super cepat hitungan detik.',
        },
        {
            title: 'E-Money & E-Wallet',
            src: '/images/h2h/emoney-wallet.png',
            description: 'Topup saldo GoPay, OVO, DANA, ShopeePay, LinkAja instan.',
        },
        {
            title: 'Voucher Game',
            src: '/images/h2h/voucher-game.png',
            description: 'Diamond ML, FF, PUBG, dan ratusan game lainnya jalur resmi.',
        },
        {
            title: 'Paket Data & Voucher',
            src: '/images/h2h/paket-data.png',
            description: 'Inject kuota langsung dan voucher fisik semua operator terlengkap.',
        },
        {
            title: 'PPOB & Multipayment',
            src: '/images/h2h/ppob-multipayment.png',
            description: 'Pembayaran tagihan BPJS, PDAM, Telkom, dan Multifinance.',
        },
    ];

    return (
        <div className="py-20 bg-neutral-50 dark:bg-black w-full">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-start mb-16">
                    <h2 className="lg:text-4xl text-xl font-metropolis font-medium leading-tight max-w-2xl">
                        Produk Digital Terlengkap<ColourfulText text="." />
                    </h2>
                    <p className="text-primary font-google-sans font-light text-base lg:text-lg leading-relaxed max-w-4xl">
                        Satu koneksi H2H membuka akses ke ribuan SKU produk digital yang siap dijual kembali.
                    </p>
                </div>

                <FocusCards cards={cards} />
            </div>
        </div>
    );
}
