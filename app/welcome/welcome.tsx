import { AuroraBackground } from '~/components/ui/aurora-background';
import { Button } from '~/components/ui/button';
import { LinkPreview } from '~/components/ui/link-preview';
import { motion } from 'framer-motion';
import { TextGenerateEffect } from '~/components/ui/text-generate-effect';

export function Welcome() {
    return (
        <>
            <AuroraBackground className="-mt-14">
                <motion.div
                    initial={{ opacity: 0.0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{
                        delay: 0.3,
                        duration: 0.8,
                        ease: 'easeInOut',
                    }}
                    className="relative flex flex-col gap-4 items-start justify-start px-4 max-w-7xl"
                >
                    <h2 className="text-3xl md:text-7xl font-semibold dark:text-white text-left font-metropolis">
                        Satu Platform untuk Mengembangkan Bisnis Server Pulsa
                        Anda
                    </h2>

                    <div>
                        <TextGenerateEffect words="" />
                        <span className="text-lg md:text-2xl font-extralight dark:text-white text-left font-roboto text-gray-700">
                            Kelola jaringan{' '}
                            <LinkPreview
                                url="https://md.galareload.com/"
                                className="font-light text-gray-800"
                            >
                                Master Dealer
                            </LinkPreview>
                            , gunakan{' '}
                            <LinkPreview
                                url="https://whitelabelmurah.com/"
                                className="font-light text-gray-800"
                            >
                                Whitelabel{' '}
                            </LinkPreview>
                            brand sendiri, dan koneksi{' '}
                            <LinkPreview
                                url="https://h2h.serverpmk.com/"
                                className="font-light text-gray-800"
                            >
                                Host to Host
                            </LinkPreview>{' '}
                            yang siap membantu berkembang dari level pemula
                            sampai enterprise.
                        </span>
                    </div>

                    <Button className="bg-black dark:bg-white rounded-full w-fit text-white dark:text-black px-4 py-2 cursor-pointer">
                        Mulai Sekarang
                    </Button>
                </motion.div>
            </AuroraBackground>
        </>
    );
}
