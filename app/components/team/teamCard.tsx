import type { TeamMember } from "./teamGrid"; // Import type from Grid or shared definition
import { motion } from "framer-motion";

interface TeamCardProps {
    member: TeamMember;
}

export function TeamCard({ member }: TeamCardProps) {
    return (
        <motion.div
            className="relative group w-full aspect-[3/4] overflow-hidden rounded-none" // Adjust rounded if needed, reference cards look possibly square/rect
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
        >
            {/* Image */}
            <img
                src={member.image}
                alt={member.name}
                className="w-full h-full object-cover object-center bg-gray-100"
            />

            {/* Pill Label */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] md:w-auto min-w-[200px] max-w-full">
                <div className="bg-white border-2 border-black rounded-2xl py-2 px-6 text-center shadow-sm relative z-10 group-hover:shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)]  transition-shadow">
                    <h3 className="font-bold text-black text-lg leading-tight font-metropolis">
                        {member.name}
                    </h3>
                    <p className="text-neutral-600 text-xs font-medium uppercase tracking-wide mt-0.5 font-google-sans">
                        {member.role}
                    </p>
                </div>
            </div>

            {/* Optional: Simple overlay tint on hover */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors pointer-events-none" />
        </motion.div>
    );
}
