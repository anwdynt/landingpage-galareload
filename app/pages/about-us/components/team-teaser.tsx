import { AnimatedTooltip } from '~/components/ui/animated-tooltip';
import { Link } from 'react-router';

export default function AboutTeamTeaser() {
    const people = [
        {
            id: 1,
            name: "John Doe",
            designation: "CEO & Founder",
            image:
                "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
        },
        {
            id: 2,
            name: "Robert Johnson",
            designation: "CTO",
            image:
                "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        },
        {
            id: 3,
            name: "Jane Smith",
            designation: "Head of Marketing",
            image:
                "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
        },
        {
            id: 4,
            name: "Emily Davis",
            designation: "Lead Developer",
            image:
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
        },
    ];

    return (
        <div className="py-20 w-full bg-black flex flex-col items-center justify-center">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 font-metropolis text-center">
                Meet the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Team</span>
            </h2>
            <div className="flex flex-row items-center justify-center mb-10 w-full">
                <AnimatedTooltip items={people} />
            </div>
            <Link
                to="/our-team"
                className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-purple-600 text-white font-bold transition duration-200 hover:shadow-lg hover:shadow-primary/50"
            >
                Lihat Seluruh Tim
            </Link>
        </div>
    );
}
