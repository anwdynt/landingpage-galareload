import { TextGenerateEffect } from '~/components/ui/text-generate-effect';
import Marquee from '~/components/ui/marquee';
// Produk Pulsa & Payment
const clients = [
    // Operator & provider
    { image: '/icons/axis.png', imageWebp: '/icons/axis.webp' },
    { image: '/icons/byu.png', imageWebp: '/icons/byu.webp' },
    { image: '/icons/icon_indosat.png', imageWebp: '/icons/icon_indosat.webp' },
    {
        image: '/icons/icon_telkomsel.png',
        imageWebp: '/icons/icon_telkomsel.webp',
    },
    { image: '/icons/smartfren.png', imageWebp: '/icons/smartfren.webp' },
    { image: '/icons/tri.png', imageWebp: '/icons/tri.webp' },
    { image: '/icons/xl.png', imageWebp: '/icons/xl.webp' },
];

// Produk Lain (Games, Apps, Entertainment)
const partners = [
    // Pembayaran digital / e-wallet / bank
    { image: '/icons/icon_dana.png', imageWebp: '/icons/icon_dana.webp' },
    { image: '/icons/icon_gopay.png', imageWebp: '/icons/icon_gopay.webp' },
    { image: '/icons/icon_grab.png', imageWebp: '/icons/icon_grab.webp' },
    { image: '/icons/icon_linkaja.png', imageWebp: '/icons/icon_linkaja.webp' },
    { image: '/icons/icon_maxim.png', imageWebp: '/icons/icon_maxim.webp' },
    { image: '/icons/icon_ovo.png', imageWebp: '/icons/icon_ovo.webp' },
    {
        image: '/icons/icon_shopeepay.png',
        imageWebp: '/icons/icon_shopeepay.webp',
    },
    { image: '/icons/icon_uob.png', imageWebp: '/icons/icon_uob.webp' },
    { image: '/icons/icon_bpjs.png', imageWebp: '/icons/icon_bpjs.webp' },
    // Games & Entertainment
    { image: '/icons/aov.png', imageWebp: '/icons/aov.webp' },
    { image: '/icons/call_of_duty.png', imageWebp: '/icons/call_of_duty.webp' },
    { image: '/icons/free_fire.png', imageWebp: '/icons/free_fire.webp' },
    {
        image: '/icons/mobile_legend.png',
        imageWebp: '/icons/mobile_legend.webp',
    },
    {
        image: '/icons/pointblank_zeppeto.png',
        imageWebp: '/icons/pointblank_zeppeto.webp',
    },
    { image: '/icons/pubg.png', imageWebp: '/icons/pubg.webp' },
    { image: '/icons/roblox.png', imageWebp: '/icons/roblox.webp' },
    { image: '/icons/steam.png', imageWebp: '/icons/steam.webp' },
];

export default function Partners() {
    return (
        <section id="partners" className="space-y-5 py-8 md:py-12 lg:py-20">
            <div className="flex items-center justify-center">
                <div className="ml-4 mb-8">
                    <h2 className="font-bold font-metropolis uppercase tracking-wide text-xl lg:text-4xl text-center lg:text-center text-slate-800">
                        Kepercayaan yang Dibangun dari Hasil Nyata
                    </h2>
                    <TextGenerateEffect
                        className="text-second font-roboto text-center text-lg font-extralight"
                        words="Cerita langsung dari mitra yang telah merasakan stabilitas, layanan, dan skalabilitas platform Galareload."
                    />
                </div>
            </div>
            <div className="mx-auto px-2 xl:px-0 2xl:container 2xl:max-w-7xl xl:max-w-280 space-y-12">
                <div>
                    <Marquee items={clients} speed={35} direction="left" />
                    <Marquee items={partners} speed={35} direction="right" />
                </div>
            </div>
        </section>
    );
}
