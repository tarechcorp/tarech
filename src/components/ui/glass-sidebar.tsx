"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassSidebarProps {
    visible: boolean;
    title?: string;
    subtitle?: string;
    description?: string;
    onClose?: () => void;
}

export function GlassSidebar({
    visible,
    title = "Fintech",
    subtitle = "Sector Analysis",
    description = "Mobile money penetration in Sub-Saharan Africa has reached 72%. Our cluster analysis reveals emerging opportunities in localized micro-lending.",
    onClose
}: GlassSidebarProps) {
    return (
        <motion.div
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: visible ? 0 : 100, opacity: visible ? 1 : 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            className={cn(
                "fixed right-0 top-0 h-full w-80 z-20",
                "bg-black/60 backdrop-blur-2xl border-l border-white/10",
                "p-8 flex flex-col justify-center space-y-6 text-neutral-300"
            )}
        >
            {onClose && (
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 p-2 text-white bg-white/10 hover:bg-white/20 rounded-full transition-colors z-50 backdrop-blur-md"
                    aria-label="Close Sidebar"
                >
                    ✕
                </button>
            )}

            <div className="space-y-2">
                <h3 className="text-sm font-mono text-electric-teal uppercase tracking-widest">
                    {subtitle}
                </h3>
                <h2 className="text-3xl font-bold text-white">{title}</h2>
            </div>

            <p className="text-sm font-light leading-relaxed text-neutral-400">
                {description}
            </p>

            <div className="space-y-4 pt-8">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="group cursor-pointer">
                        <div className="flex items-center gap-4 py-2 border-b border-white/10 group-hover:border-savannah/50 transition-colors">
                            <span className="font-mono text-xs text-neutral-500">0{i}</span>
                            <span className="text-sm">Data Point Alpha</span>
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}
