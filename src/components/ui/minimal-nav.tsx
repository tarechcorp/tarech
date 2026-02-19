"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { MagneticButton } from "./magnetic-button";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
];

import { usePageTransition } from "@/components/providers/transition-provider";

interface MinimalNavProps {
    visible?: boolean;
}

export function MinimalNav({ visible = true }: MinimalNavProps) {
    const pathname = usePathname();
    const { transitionTo } = usePageTransition();

    const handleLinkClick = (e: React.MouseEvent, href: string) => {
        e.preventDefault();
        transitionTo(href);
    };

    return (
        <AnimatePresence>
            {visible && (
                <motion.nav
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5, ease: "circOut" }}
                    className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-6 mix-blend-difference text-white pointer-events-none"
                >
                    {/* Brand - Serif Font for "Theory" vibe */}
                    <div className="pointer-events-auto group">
                        <MagneticButton strength={0.4}>
                            <Link
                                href="/"
                                onClick={(e) => handleLinkClick(e, "/")}
                                className="font-display text-4xl font-bold tracking-tight hover:opacity-80 transition-opacity flex items-center gap-2 py-4"
                            >
                                <span className="w-3 h-3 bg-orange-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                Tarech
                            </Link>
                        </MagneticButton>
                    </div>

                    {/* Navigation Links - Sans Serif for "Technical" vibe */}
                    <div className="pointer-events-auto flex items-center gap-2 bg-white/5 backdrop-blur-sm px-2 py-1.5 rounded-full border border-white/10">
                        {NAV_ITEMS.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <MagneticButton key={item.name} strength={0.2}>
                                    <Link
                                        href={item.href}
                                        onClick={(e) => handleLinkClick(e, item.href)}
                                        className={cn(
                                            "relative px-4 py-2 font-sans text-xs font-medium tracking-wide transition-colors z-10",
                                            isActive ? "text-black" : "text-white/70 hover:text-white"
                                        )}
                                    >
                                        {isActive && (
                                            <motion.div
                                                layoutId="nav-pill"
                                                className="absolute inset-0 bg-white rounded-full -z-10 mix-blend-difference"
                                                transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                            />
                                        )}
                                        {item.name}
                                    </Link>
                                </MagneticButton>
                            );
                        })}
                    </div>
                </motion.nav>
            )}
        </AnimatePresence>
    );
}
