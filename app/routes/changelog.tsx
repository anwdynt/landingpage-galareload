import { ChevronDown, Tag, GitCommit, CheckCircle2, Wrench, Zap, Rocket, Clock } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useLoaderData } from 'react-router';
import { getPublishedChangelogs, getUpcomingChangelog } from '~/server/changelog.server';
import type { Changelog } from '~/types/changelog';

//Loader function
export async function loader() {
    const [rawChangelogs, rawUpcoming] = await Promise.all([
        getPublishedChangelogs(),
        getUpcomingChangelog(),
    ]);

    // Cast JsonValue to string[] for proper typing
    const allChangelogs = rawChangelogs.map(changelog => ({
        ...changelog,
        features: changelog.features as string[],
        fixes: changelog.fixes as string[],
        improvements: changelog.improvements as string[],
    }));

    const upcoming = rawUpcoming ? {
        ...rawUpcoming,
        features: rawUpcoming.features as string[],
        fixes: rawUpcoming.fixes as string[],
        improvements: rawUpcoming.improvements as string[],
    } : null;

    // Split into recent (5 latest) and archive (rest)
    const recent = allChangelogs.slice(0, 5);
    const archive = allChangelogs.slice(5);

    // Group archive by year
    const archiveByYear: Record<number, typeof allChangelogs> = {};
    archive.forEach(changelog => {
        const year = changelog.releaseDate ? new Date(changelog.releaseDate).getFullYear() : new Date().getFullYear();
        if (!archiveByYear[year]) {
            archiveByYear[year] = [];
        }
        archiveByYear[year].push(changelog);
    });

    // Sort years descending
    const years = Object.keys(archiveByYear).map(Number).sort((a, b) => b - a);

    return { recent, archiveByYear, years, upcoming };
}

// Metadata
export function meta() {
    return [
        { title: "Developer Notes - Gala Reload" },
        { name: "description", content: "Catatan pengembangan dan pembaruan fitur platform Gala Reload" },
    ];
}

function VersionSection({ release, index }: { release: Changelog; index: number }) {
    const [isOpen, setIsOpen] = useState(index === 0); // First item open by default

    // Format date
    const formattedDate = release.releaseDate
        ? new Date(release.releaseDate).toISOString().split('T')[0]
        : '';

    const features = release.features as string[];
    const fixes = release.fixes as string[];
    const improvements = release.improvements as string[];

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="border-b border-neutral-200 dark:border-neutral-800 last:border-b-0"
        >
            {/* Collapsible Header */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors group"
            >
                <div className="flex items-center gap-4">
                    <ChevronDown
                        className={`w-5 h-5 text-neutral-400 transition-transform ${isOpen ? 'rotate-0' : '-rotate-90'
                            }`}
                    />

                    {/* Version Badge */}
                    <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4 text-neutral-600 dark:text-neutral-400" />
                        <code className="text-base font-mono font-semibold text-neutral-900 dark:text-white">
                            v{release.version}
                        </code>
                        {release.tag && (
                            <span className="px-2 py-0.5 text-xs font-medium bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full">
                                {release.tag}
                            </span>
                        )}
                    </div>
                </div>

                <time className="text-sm text-neutral-500 dark:text-neutral-500 font-mono">
                    {formattedDate}
                </time>
            </button>

            {/* Collapsible Content */}
            {isOpen && (
                <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    transition={{ duration: 0.2 }}
                    className="px-6 pb-6"
                >
                    <div className="ml-9 space-y-6 pt-2">
                        {/* Features */}
                        {features.length > 0 && (
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <CheckCircle2 className="w-4 h-4 text-neutral-700 dark:text-neutral-400" />
                                    <h3 className="text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-400 uppercase">
                                        Features
                                    </h3>
                                </div>
                                <ul className="space-y-1.5">
                                    {features.map((feature: string, i: number) => (
                                        <li
                                            key={i}
                                            className="text-sm text-neutral-700 dark:text-neutral-300 flex items-start gap-2 font-mono"
                                        >
                                            <GitCommit className="w-4 h-4 mt-0.5 text-neutral-400 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Bug Fixes */}
                        {fixes.length > 0 && (
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <Wrench className="w-4 h-4 text-neutral-700 dark:text-neutral-400" />
                                    <h3 className="text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-400 uppercase">
                                        Bug Fixes
                                    </h3>
                                </div>
                                <ul className="space-y-1.5">
                                    {fixes.map((fix: string, i: number) => (
                                        <li
                                            key={i}
                                            className="text-sm text-neutral-700 dark:text-neutral-300 flex items-start gap-2 font-mono"
                                        >
                                            <GitCommit className="w-4 h-4 mt-0.5 text-neutral-400 flex-shrink-0" />
                                            <span>{fix}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Improvements */}
                        {improvements.length > 0 && (
                            <div>
                                <div className="flex items-center gap-2 mb-3">
                                    <Zap className="w-4 h-4 text-neutral-700 dark:text-neutral-400" />
                                    <h3 className="text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-400 uppercase">
                                        Improvements
                                    </h3>
                                </div>
                                <ul className="space-y-1.5">
                                    {improvements.map((improvement: string, i: number) => (
                                        <li
                                            key={i}
                                            className="text-sm text-neutral-700 dark:text-neutral-300 flex items-start gap-2 font-mono"
                                        >
                                            <GitCommit className="w-4 h-4 mt-0.5 text-neutral-400 flex-shrink-0" />
                                            <span>{improvement}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
}

export default function Changelog() {
    const { recent, archiveByYear, years, upcoming } = useLoaderData<typeof loader>();
    const [expandedYears, setExpandedYears] = useState<number[]>([]);

    // Cast upcoming features
    const upcomingFeatures = upcoming ? {
        version: upcoming.version,
        expectedDate: upcoming.expectedDate || '',
        planned: upcoming.features as string[],
    } : null;

    const toggleYear = (year: number) => {
        setExpandedYears(prev =>
            prev.includes(year) ? prev.filter(y => y !== year) : [...prev, year]
        );
    };

    return (
        <div className="min-h-screen bg-white dark:bg-neutral-950">
            {/* Header */}
            <div className="border-b border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-950">
                <div className="max-w-5xl mx-auto px-6 py-8">
                    <h1 className="text-3xl font-bold font-mono text-neutral-900 dark:text-white mb-2">
                        Development Notes
                    </h1>
                    <p className="text-neutral-600 dark:text-neutral-400 font-mono text-sm">
                        Catatan pengembangan dan pembaruan fitur terbaru dari platform kami.
                    </p>
                </div>
            </div>

            <div className="max-w-5xl mx-auto px-6 py-8">
                {/* Next Update Section */}
                {upcomingFeatures && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-8 p-6 bg-gradient-to-br from-neutral-50 to-neutral-100 dark:from-neutral-900 dark:to-neutral-800 border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-lg"
                    >
                        <div className="flex items-center gap-2 mb-3">
                            <Rocket className="w-5 h-5 text-neutral-900 dark:text-white" />
                            <h2 className="text-lg font-mono font-bold text-neutral-900 dark:text-white">
                                Next Update
                            </h2>
                        </div>

                        <div className="bg-white dark:bg-neutral-950 p-4 rounded-md border border-neutral-200 dark:border-neutral-800">
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2">
                                    <code className="text-base font-mono font-semibold text-neutral-900 dark:text-white">
                                        v{upcomingFeatures.version}
                                    </code>
                                    <span className="px-2 py-0.5 text-xs font-medium bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 rounded-full">
                                        Coming Soon
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-400">
                                    <Clock className="w-4 h-4" />
                                    <span className="font-mono">{upcomingFeatures.expectedDate}</span>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-xs font-mono font-semibold text-neutral-700 dark:text-neutral-400 uppercase mb-3">
                                    Fitur Yang Direncanakan
                                </h3>
                                <ul className="space-y-1.5">
                                    {upcomingFeatures.planned.map((feature: string, i: number) => (
                                        <li
                                            key={i}
                                            className="text-sm text-neutral-700 dark:text-neutral-300 flex items-start gap-2 font-mono"
                                        >
                                            <GitCommit className="w-4 h-4 mt-0.5 text-neutral-400 flex-shrink-0" />
                                            <span>{feature}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Recent Updates */}
                <div className="mb-12">
                    <h2 className="text-xl font-mono font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                        <Zap className="w-5 h-5" />
                        Update Terbaru
                    </h2>
                    <div className="bg-white dark:bg-neutral-950 border border-neutral-200 dark:border-neutral-800">
                        {recent.map((release: Changelog, index: number) => (
                            <VersionSection key={release.id} release={release} index={index} />
                        ))}
                    </div>
                </div>

                {/* Archive Section */}
                {years.length > 0 && (
                    <div id="archive" className="scroll-mt-8">
                        <h2 className="text-xl font-mono font-bold text-neutral-900 dark:text-white mb-4 flex items-center gap-2">
                            <Tag className="w-5 h-5" />
                            Arsip Versi Lama
                        </h2>
                        <div className="space-y-4">
                            {years.map(year => (
                                <div key={year} className="border border-neutral-200 dark:border-neutral-800 rounded-lg overflow-hidden">
                                    {/* Year Header */}
                                    <button
                                        onClick={() => toggleYear(year)}
                                        className="w-full px-6 py-4 bg-neutral-50 dark:bg-neutral-900 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors flex items-center justify-between"
                                    >
                                        <div className="flex items-center gap-3">
                                            <span className="text-2xl font-mono font-bold text-neutral-900 dark:text-white">
                                                {year}
                                            </span>
                                            <span className="px-2 py-0.5 text-xs font-medium bg-neutral-200 dark:bg-neutral-700 text-neutral-700 dark:text-neutral-300 rounded-full">
                                                {archiveByYear[year].length} {archiveByYear[year].length === 1 ? 'release' : 'releases'}
                                            </span>
                                        </div>
                                        <ChevronDown
                                            className={`w-5 h-5 text-neutral-600 dark:text-neutral-400 transition-transform ${expandedYears.includes(year) ? 'rotate-180' : ''
                                                }`}
                                        />
                                    </button>

                                    {/* Year Content */}
                                    {expandedYears.includes(year) && (
                                        <motion.div
                                            initial={{ opacity: 0, height: 0 }}
                                            animate={{ opacity: 1, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0 }}
                                            className="border-t border-neutral-200 dark:border-neutral-800"
                                        >
                                            {archiveByYear[year].map((release: Changelog, index: number) => (
                                                <VersionSection key={release.id} release={release} index={index} />
                                            ))}
                                        </motion.div>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Footer */}
                {years.length === 0 && (
                    <div className="mt-8 text-center">
                        <p className="text-xs text-neutral-500 dark:text-neutral-600 font-mono">
                            Semua update ditampilkan di atas.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
