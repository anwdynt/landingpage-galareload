import { useState } from "react";
import { TeamCard } from "./teamCard";
import { motion, AnimatePresence } from "framer-motion";
import { TeamHeader } from "./teamHeader";

export interface TeamMember {
    name: string;
    role: string;
    category: "Management" | "Product" | "Design" | "Marketing" | "Sales" | "Customer Success";
    image: string;
}

const TEAM_MEMBERS: TeamMember[] = [
    {
        name: "Emmy Rosum",
        role: "Co-Founder and CEO",
        category: "Management",
        image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
        name: "Orlando Diggs",
        role: "Co-Founder and COO",
        category: "Management",
        image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
        name: "Sophie",
        role: "Head of Sales",
        category: "Sales",
        image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
        name: "Lana Steiner",
        role: "Customer Success",
        category: "Customer Success",
        image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
        name: "Emily Donnavan",
        role: "Product Lead",
        category: "Product",
        image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
        name: "Sasha Kindred",
        role: "VP of Marketing",
        category: "Marketing",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
    {
        name: "Drew Cano",
        role: "Head of UX",
        category: "Design",
        image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80",
    },
];

const CATEGORIES = ["View all", "Management", "Product", "Design", "Marketing", "Sales", "Customer Success"];

export function TeamGrid() {
    const [activeCategory, setActiveCategory] = useState("View all");

    const filteredMembers = activeCategory === "View all"
        ? TEAM_MEMBERS
        : TEAM_MEMBERS.filter(member => member.category === activeCategory);

    return (
        <div className="bg-white min-h-screen font-sans">
            <TeamHeader />

            {/* Filter Section */}
            <div className="max-w-7xl mx-auto px-6 mb-16 overflow-x-auto">
                <div className="flex flex-nowrap md:flex-wrap justify-center gap-4 md:gap-8 pb-4">
                    {CATEGORIES.map((category) => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`text-sm md:text-base font-semibold transition-colors duration-200 whitespace-nowrap px-4 py-2 ${activeCategory === category
                                ? "text-black border-2 border-black rounded-2xl bg-white"
                                : "text-neutral-500 hover:text-black"
                                }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {/* Grid Section */}
            <div className="max-w-7xl mx-auto px-6 pb-32">
                <motion.div
                    layout
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
                >
                    <AnimatePresence mode="popLayout">
                        {filteredMembers.map((member) => (
                            <motion.div
                                key={member.name}
                                layout
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                            >
                                <TeamCard member={member} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
}
