"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

interface TransitionContextType {
    transitionTo: (href: string) => void;
    isTransitioning: boolean;
}

const TransitionContext = createContext<TransitionContextType | null>(null);

export function usePageTransition() {
    const context = useContext(TransitionContext);
    if (!context) {
        throw new Error("usePageTransition must be used within a TransitionProvider");
    }
    return context;
}

export function TransitionProvider({ children }: { children: ReactNode }) {
    const router = useRouter();
    const pathname = usePathname();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const [targetUrl, setTargetUrl] = useState<string | null>(null);

    // Reset transition state when pathname changes (navigation complete)
    useEffect(() => {
        setIsTransitioning(false);
    }, [pathname]);

    const transitionTo = (href: string) => {
        if (href === pathname) return;
        setIsTransitioning(true);
        setTargetUrl(href);

        // Wait for shutter to close before pushing route
        setTimeout(() => {
            router.push(href);
        }, 800); // Match animation duration
    };

    return (
        <TransitionContext.Provider value={{ transitionTo, isTransitioning }}>
            {children}

            {/* SHUTTER OVERLAY */}
            <AnimatePresence mode="wait">
                {isTransitioning && (
                    <motion.div
                        className="fixed inset-0 z-[100] bg-black pointer-events-none"
                        initial={{ clipPath: "inset(0 0 100% 0)" }} // Open (content visible)
                        animate={{ clipPath: "inset(0 0 0% 0)" }}   // Closed (black screen)
                        exit={{ clipPath: "inset(100% 0 0 0)" }}    // Open (reveal new content)
                        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} // Custom Quint-like easing
                    />
                )}
            </AnimatePresence>
        </TransitionContext.Provider>
    );
}
