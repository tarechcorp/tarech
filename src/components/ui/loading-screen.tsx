"use client";

import { useProgress } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

export function LoadingScreen() {
    const { active, progress } = useProgress();
    const [finished, setFinished] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // When loading is done (active becomes false or progress hits 100 and stays)
        // We add a small buffer to ensure no flicker
        if (progress === 100) {
            const timer = setTimeout(() => {
                // Animate out
                if (containerRef.current) {
                    const tl = gsap.timeline({
                        onComplete: () => setFinished(true)
                    });

                    // Text flies up
                    tl.to(textRef.current, {
                        y: -50,
                        opacity: 0,
                        duration: 0.8,
                        ease: "power3.inOut"
                    });

                    // Curtain lifts/fades
                    tl.to(containerRef.current, {
                        opacity: 0,
                        duration: 1,
                        ease: "power2.inOut"
                    }, "-=0.4");
                }
            }, 500); // 500ms hesitation for "weight"
            return () => clearTimeout(timer);
        }
    }, [progress]);

    if (finished) return null;

    return (
        <div
            ref={containerRef}
            className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center text-white"
        >
            <div ref={textRef} className="flex flex-col items-center gap-4">
                <div className="text-4xl font-mono font-bold tracking-tighter">
                    {Math.round(progress)}%
                </div>
                <div className="h-[2px] w-48 bg-white/10 overflow-hidden rounded-full">
                    <div
                        className="h-full bg-savannah transition-all duration-200 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
                <div className="text-xs text-neutral-500 font-mono uppercase tracking-[0.2em] mt-2">
                    Initializing Environment
                </div>
            </div>
        </div>
    );
}
