import { GlareCard } from "~/components/ui/glare-card";
import FormatImage from "~/components/ui/formatImage";
import { Youtube, Instagram, Facebook, Music2, MessageCircle, Send } from "lucide-react";
import { ColourfulText } from "~/components/ui/colorfull-text";
import { Link } from "react-router";
import { SimpleCarousel } from "~/components/ui/simple-carousel";

export default function SocialMedia() {
    const items = [
        {
            title: "Instagram",
            icon: <Instagram className="h-5 w-5 text-white" />,
            image: "/images/social/instagram.png", // Placeholder: Image generation skipped due to quota
            description: "Dapatkan inspirasi harian dan update promo menarik.",
            link: "https://www.instagram.com/galareload_official"
        },
        {
            title: "TikTok",
            icon: <Music2 className="h-5 w-5 text-white" />,
            image: "/images/social/tiktok.png", // Placeholder
            description: "Ikuti tren terbaru dan konten seru di TikTok kami.",
            link: "https://www.tiktok.com/@galareload.official"
        },
        {
            title: "Facebook",
            icon: <Facebook className="h-5 w-5 text-white" />,
            image: "/images/social/facebook.png", // Placeholder
            description: "Bergabung dengan komunitas kami di Facebook.",
            link: "https://www.facebook.com/profile.php?id=61585199416921"
        },
        {
            title: "YouTube",
            icon: <Youtube className="h-5 w-5 text-white" />,
            image: "/images/social/youtube.png", // Placeholder
            description: "Tonton tutorial dan video edukasi seputar bisnis pulsa.",
            link: "https://youtube.com/@galareloadofficial"
        },
        {
            title: "WhatsApp",
            icon: <MessageCircle className="h-5 w-5 text-white" />,
            image: "/images/social/whatsapp.png", // Placeholder: Need to check if exists or use fallback
            description: "Dapatkan info terbaru langsung dari WhatsApp Channel kami.",
            link: "https://whatsapp.com/channel/0029Vb687cCI1rccWEIv1V3o"
        },
        {
            title: "Telegram",
            icon: <Send className="h-5 w-5 text-white" />,
            image: "/images/social/telegram.png", // Placeholder: Need to check if exists or use fallback
            description: "Gabung channel Telegram untuk update info real-time.",
            link: "https://t.me/galareloadofficial"
        },
    ];

    const carouselItems = items.map((item, idx) => (
        <Link
            key={idx}
            to={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block h-full"
        >
            <GlareCard className="flex flex-col items-start justify-end relative w-[320px] h-[400px]">
                <div className="h-full w-full absolute inset-0">
                    <FormatImage
                        src={item.image}
                        alt={item.title}
                        className="h-full w-full object-cover opacity-90"
                    />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

                <div className="relative z-40 p-6 w-full">
                    <div className="flex items-center gap-2 mb-2">
                        {item.icon}
                        <span className="text-white text-2xl font-bold font-metropolis">{item.title}</span>
                    </div>
                    <p className="text-neutral-200 text-sm font-light font-google-sans leading-relaxed">
                        {item.description}
                    </p>
                </div>
            </GlareCard>
        </Link>
    ));

    return (
        <section className="py-20 dark:bg-black/50 px-2 md:px-0">
            <div className="max-w-7xl mx-auto container space-y-10">
                <div className="justify-center items-center flex flex-col space-y-6">
                    <h2 className="lg:text-4xl text-xl font-metropolis font-medium leading-tight max-w-[18rem] lg:max-w-lg">
                        Ikuti Sosial Media Kami<ColourfulText text="." />
                    </h2>
                    <p className="text-lg md:text-xl mt-0 font-extralight dark:text-white text-left font-google-sans text-primary leading-normal max-w-5xl">
                        Jangan lewatkan update terbaru dan promo menarik dari Galareload.
                    </p>
                </div>

                {/* Carousel Component */}
                <SimpleCarousel items={carouselItems} autoplay={true} autoplayInterval={4000} />
            </div>
        </section>
    );
}
