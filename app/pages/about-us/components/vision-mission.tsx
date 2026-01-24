import { GlareCard } from '~/components/ui/glare-card';
import { Target, Rocket } from 'lucide-react';

export default function AboutVisionMission() {
    return (
        <div className="py-20 w-full bg-neutral-900">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <div className="flex justify-center">
                        <GlareCard className="flex flex-col items-start justify-end py-8 px-6">
                            <div className="p-3 bg-primary/20 rounded-full w-fit mb-auto">
                                <Target className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <p className="font-bold text-white text-lg font-metropolis mb-2">Visi Kami</p>
                                <p className="font-normal text-base text-neutral-200 font-google-sans">
                                    Menjadi enabler ekosistem digital terdepan di Indonesia yang menghubungkan teknologi finansial dengan kebutuhan nyata masyarakat.
                                </p>
                            </div>
                        </GlareCard>
                    </div>

                    <div className="flex justify-center">
                        <GlareCard className="flex flex-col items-start justify-end py-8 px-6">
                            <div className="p-3 bg-purple-500/20 rounded-full w-fit mb-auto">
                                <Rocket className="w-8 h-8 text-purple-400" />
                            </div>
                            <div>
                                <p className="font-bold text-white text-lg font-metropolis mb-2">Misi Kami</p>
                                <ul className="font-normal text-base text-neutral-200 font-google-sans list-disc pl-4 space-y-1">
                                    <li>Infrastruktur server stabil & aman.</li>
                                    <li>Layanan pelanggan responsif.</li>
                                    <li>Inovasi fitur berkelanjutan.</li>
                                </ul>
                            </div>
                        </GlareCard>
                    </div>
                </div>
            </div>
        </div>
    );
}
