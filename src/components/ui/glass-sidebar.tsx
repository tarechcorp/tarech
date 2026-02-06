import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

interface GlassSidebarProps {
    visible: boolean;
    title?: string;
    subtitle?: string;
    sector?: string; // New Sector Prop
    description?: string;
    onClose?: () => void;
}

export function GlassSidebar({
    visible,
    title = "Fintech",
    subtitle = "Sector Analysis",
    sector = "Finance",
    description = "Mobile money penetration in Sub-Saharan Africa has reached 72%. Our cluster analysis reveals emerging opportunities in localized micro-lending.",
    onClose
}: GlassSidebarProps) {
    const sidebarRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState({ x: 0, y: 0 });
    const [opacity, setOpacity] = useState(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!sidebarRef.current) return;
        const div = sidebarRef.current;
        const rect = div.getBoundingClientRect();
        setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    };

    const handleMouseEnter = () => setOpacity(1);
    const handleMouseLeave = () => setOpacity(0);

    return (
        <AnimatePresence>
            {visible && (
                <motion.div
                    ref={sidebarRef}
                    initial={{ x: "100%", opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: "100%", opacity: 0 }}
                    transition={{ type: "spring", stiffness: 90, damping: 20 }} // Slightly softer spring
                    onMouseMove={handleMouseMove}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    className={cn(
                        "fixed right-0 top-0 h-full w-[400px] z-20", // Widened slightly
                        "bg-[#050505]/80 backdrop-blur-3xl border-l border-white/5", // Darker, cleaner glass
                        "p-10 flex flex-col shadow-2xl",
                        "font-light text-neutral-300"
                    )}
                >
                    {/* SPOTLIGHT OVERLAY */}
                    <div
                        className="pointer-events-none absolute -inset-px opacity-0 transition duration-300"
                        style={{
                            opacity,
                            background: `radial-gradient(600px circle at ${position.x}px ${position.y}px, rgba(255,255,255,0.06), transparent 40%)`,
                        }}
                    />

                    {/* CLOSE BUTTON */}
                    {onClose && (
                        <button
                            onClick={onClose}
                            className="absolute top-8 right-8 p-2 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-all z-30 backdrop-blur-md"
                            aria-label="Close Sidebar"
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                <path d="M18 6L6 18M6 6l12 12" />
                            </svg>
                        </button>
                    )}

                    {/* CONTENT CONTAINER - Relative to sit above spotlight */}
                    <div className="relative z-10 flex flex-col h-full mt-12 gap-8">

                        {/* HEADER */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <span className="px-2 py-1 text-[10px] uppercase font-mono tracking-widest text-[#CBACF9] bg-[#CBACF9]/10 rounded border border-[#CBACF9]/20">
                                    {sector}
                                </span>
                                <div className="h-px bg-white/10 flex-grow" />
                            </div>

                            <div className="space-y-1">
                                <h3 className="text-xs font-mono text-neutral-500 uppercase tracking-widest">
                                    {subtitle}
                                </h3>
                                <h2 className="text-4xl font-light tracking-tight text-white leading-[1.1]">
                                    {title}
                                </h2>
                            </div>
                        </div>

                        {/* DESCRIPTION */}
                        <p className="text-sm font-light leading-relaxed text-neutral-400 border-l-2 border-white/10 pl-4 py-1">
                            {description}
                        </p>

                        {/* DATA VISUALIZATION MOCK */}
                        <div className="space-y-6 mt-4">
                            <h4 className="text-xs font-mono text-neutral-600 uppercase tracking-widest">
                                Market Signals
                            </h4>
                            <div className="grid grid-cols-2 gap-3">
                                {[
                                    { label: "Growth", value: "+24%" },
                                    { label: "Volume", value: "8.2M" },
                                    { label: "Risk", value: "Low" },
                                    { label: "Sentiment", value: "POS" }
                                ].map((stat, i) => (
                                    <div key={i} className="bg-white/5 border border-white/5 p-3 rounded hover:bg-white/10 transition-colors">
                                        <div className="text-[10px] uppercase text-neutral-500 font-mono mb-1">{stat.label}</div>
                                        <div className="text-lg text-white font-light">{stat.value}</div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div className="flex-grow" />

                        {/* FOOTER */}
                        {/* <div className="pt-6 border-t border-white/5">
                            <button className="w-full py-4 bg-white text-black font-mono text-xs uppercase tracking-widest hover:bg-neutral-200 transition-colors">
                                Access Full Report
                            </button>
                        </div> */}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
