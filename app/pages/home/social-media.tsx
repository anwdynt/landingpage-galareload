import { GlareCard } from "~/components/ui/glare-card";
import FormatImage from "~/components/ui/formatImage";
import { Youtube, Instagram, Facebook, Music2 } from "lucide-react";
import { ColourfulText } from "~/components/ui/colorfull-text";

export default function SocialMedia() {
    const items = [
        {
            title: "TikTok",
            icon: <Music2 className="h-5 w-5 text-white" />,
            image: "/images/social/tiktok.png",
            description: "Ikuti tren terbaru dan konten seru di TikTok kami.",
        },
        {
            title: "Instagram",
            icon: <Instagram className="h-5 w-5 text-white" />,
            image: "/images/social/instagram.png",
            description: "Dapatkan inspirasi harian dan update promo menarik.",
        },
        {
            title: "Facebook",
            icon: <Facebook className="h-5 w-5 text-white" />,
            image: "/images/social/facebook.png",
            description: "Bergabung dengan komunitas kami di Facebook.",
        },
        {
            title: "YouTube",
            icon: <Youtube className="h-5 w-5 text-white" />,
            image: "/images/social/youtube.png",
            description: "Tonton tutorial dan video edukasi seputar bisnis pulsa.",
        },
    ];

    return (
        <section className="py-20 dark:bg-black/50 px-2 md:px-0">
            <div className="max-w-7xl mx-auto container space-y-10">
                <div
                    className="justify-center items-center flex flex-col space-y-6"
                >
                    {' '}
                    <h2 className="lg:text-4xl text-xl font-metropolis font-medium leading-tight max-w-[18rem] lg:max-w-lg">
                        Ikuti Sosial Media Kami<ColourfulText text="." />
                    </h2>{' '}
                    <p className="text-lg md:text-xl mt-0 font-extralight dark:text-white text-left font-google-sans text-primary leading-normal max-w-5xl">
                        Jangan lewatkan update terbaru dan promo menarik dari Galareload.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 justify-items-center">
                    {items.map((item, idx) => (
                        <GlareCard key={idx} className="flex flex-col items-start justify-end relative w-full">
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
                    ))}
                </div>
            </div>
        </section>
    );
}
