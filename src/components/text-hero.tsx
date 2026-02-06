"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

interface TextHeroProps {
    opacity: number;
}

export function TextHero({ opacity }: TextHeroProps) {
    const container = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const subRef = useRef<HTMLParagraphElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

        tl.fromTo(titleRef.current,
            { y: 100, opacity: 0, scale: 0.9 },
            { y: 0, opacity: 1, scale: 1, duration: 1.5, delay: 0.2 }
        );

        tl.fromTo(subRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, delay: -0.8 }
        );

    }, { scope: container });

    return (
        <div
            ref={container}
            className="fixed inset-0 z-20 flex flex-col items-center justify-center pointer-events-none"
            style={{ opacity, filter: `blur(${(1 - opacity) * 20}px)` }}
        >
            <div className="flex flex-col items-center text-center mix-blend-difference px-4">
                <h1
                    ref={titleRef}
                    className="font-display font-extrabold text-[8vw] leading-[0.85] tracking-tight text-white uppercase opacity-0"
                >
                    Research <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                        Corp
                    </span>
                </h1>

                <div className="mt-12 overflow-hidden">
                    <p
                        ref={subRef}
                        className="font-sans text-sm md:text-base font-medium tracking-[0.2em] text-neutral-400 uppercase opacity-0 max-w-md"
                    >
                        The Operating System for <br />
                        African Consumer Technology
                    </p>
                </div>
            </div>

            {/* SCROLL INDICATOR */}
            <div
                className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-50"
                style={{ opacity: Math.max(0, opacity - 0.2) }}
            >
                <div className="w-[1px] h-12 bg-white/20 overflow-hidden">
                    <div className="w-full h-full bg-white animate-fade-down" />
                </div>
            </div>
        </div>
    );
}
