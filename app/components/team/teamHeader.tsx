import { motion } from 'framer-motion';

export function TeamHeader() {
    return (
        <div className="relative w-full py-20 flex flex-col items-center justify-center bg-white text-center">

            {/* Pill Title Area */}
            <div className="relative inline-block mb-8 ">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="border-2 border-black rounded-2xl px-8 py-3 bg-white relative z-10 shadow-[1px_1px_rgba(0,0,0),2px_2px_rgba(0,0,0),3px_3px_rgba(0,0,0),4px_4px_rgba(0,0,0),5px_5px_0px_0px_rgba(0,0,0)] dark:shadow-[1px_1px_rgba(255,255,255),2px_2px_rgba(255,255,255),3px_3px_rgba(255,255,255),4px_4px_rgba(255,255,255),5px_5px_0px_0px_rgba(255,255,255)]"
                >
                    <h1 className="text-3xl md:text-5xl font-bold text-black font-metropolis tracking-tight ">
                        Tim Galareload
                    </h1>
                </motion.div>
            </div>

            <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-lg text-neutral-600 max-w-2xl font-google-sans px-4 leading-relaxed"
            >
                Meet our diverse team of world-class creators, designers, and problem solvers.
            </motion.p>
        </div>
    );
}
