import { AspectRatio } from '~/components/ui/aspect-ratio';
import { LinkPreview } from '~/components/ui/link-preview';
import { ColourfulText } from '~/components/ui/colorfull-text';
import { motion } from 'framer-motion';
export default function Welcome() {
    return (
        <div className="space-y-20 py-8 md:py-12 lg:py-20 max-w-7xl container mx-auto px-4 lg:px-0">
            <AspectRatio ratio={9 / 4}>
                <iframe
                    src="https://www.youtube.com/embed/SVCBA-pBgt0"
                    title="YouTube video player"
                    className="w-full h-full rounded-2xl"
                    frameBorder={0}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerPolicy="strict-origin-when-cross-origin"
                    allowFullScreen
                />
            </AspectRatio>
            <motion.div
                initial={{ opacity: 0, x: -60 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{
                    duration: 0.8,
                    ease: 'easeOut',
                }}
                viewport={{ once: true }}
                className="mx-auto max-w-420 container"
            >
                <div className="space-y-2">
                    <h2 className="lg:text-4xl text-xl font-metropolis font-medium leading-tight max-w-4xl">
                        Galareload adalah satu platform yang mendampingi bisnis
                        anda tumbuh dari tahap <ColourfulText text="awal" />{' '}
                        hingga skala <ColourfulText text="enterprise." />
                    </h2>

                    <div className="text-lg md:text-xl font-extralight dark:text-white text-left font-google-sans text-gray-700 leading-normal max-w-5xl">
                        Kelola jaringan{' '}
                        <LinkPreview
                            url="https://md.galareload.com/"
                            className="font-normal text-gray-800"
                        >
                            Master Dealer
                        </LinkPreview>
                        , gunakan{' '}
                        <LinkPreview
                            url="https://whitelabelmurah.com/"
                            className="font-normal text-gray-800"
                        >
                            Whitelabel
                        </LinkPreview>{' '}
                        brand sendiri, dan koneksi{' '}
                        <LinkPreview
                            url="https://h2h.serverpmk.com/"
                            className="font-normal text-gray-800"
                        >
                            Host to Host.
                        </LinkPreview>{' '}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
