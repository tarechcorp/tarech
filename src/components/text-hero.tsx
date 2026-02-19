"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

interface TextHeroProps {
    opacity: number;
    isLoaded: boolean;
}

export function TextHero({ opacity, isLoaded }: TextHeroProps) {
    const container = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    // Refs for animation targets
    const titleLine1Ref = useRef<HTMLSpanElement>(null);
    const titleLine2Ref = useRef<HTMLSpanElement>(null);
    const descriptionRef = useRef<HTMLParagraphElement>(null);
    const dividerRef = useRef<HTMLDivElement>(null);
    const metaRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!isLoaded) return;

        const tl = gsap.timeline({ defaults: { ease: "power4.out" } });

        // 1. Panel Expands Width-wise (Cinematic)
        tl.fromTo(panelRef.current,
            { scaleX: 0.8, opacity: 0, filter: "blur(10px)" },
            { scaleX: 1, opacity: 1, filter: "blur(0px)", duration: 1.5, ease: "expo.out" }
        );

        // 2. Titles - Masked Slide Up
        // "Research"
        tl.fromTo(titleLine1Ref.current,
            { y: "100%", rotate: 2 },
            { y: "0%", rotate: 0, duration: 1.2, ease: "power3.out" },
            "-=1.1"
        );
        // "Corp"
        tl.fromTo(titleLine2Ref.current,
            { y: "150%", rotate: -2 },
            { y: "0%", rotate: 0, duration: 1.2, ease: "power3.out" },
            "-=1.0"
        );

        // 3. Description - Staggered Fade + Blur
        if (descriptionRef.current) {
            // Split layout check: if words were individual spans we'd stagger them.
            // For now, entire block slide up is clean.
            tl.fromTo(descriptionRef.current,
                { y: 20, opacity: 0, filter: "blur(5px)" },
                { y: 0, opacity: 1, filter: "blur(0px)", duration: 1 },
                "-=0.8"
            );
        }

        // 4. Divider & Meta
        tl.fromTo(dividerRef.current,
            { scaleX: 0, transformOrigin: "left" },
            { scaleX: 1, duration: 1.2, ease: "expo.inOut" },
            "-=1.0"
        );

        tl.fromTo(metaRef.current,
            { opacity: 0, x: -10 },
            { opacity: 1, x: 0, duration: 1 },
            "-=0.8"
        );

    }, { scope: container, dependencies: [isLoaded] });

    return (
        <div
            ref={container}
            className="fixed inset-0 z-20 flex flex-col justify-end pointer-events-none p-4 md:p-6"
            style={{ opacity, filter: `blur(${(1 - opacity) * 20}px)` }}
        >
            {/* FULL WIDTH GLASS PANEL */}
            <div
                ref={panelRef}
                className="glass-panel w-full bg-black/20 backdrop-blur-md border border-white/10 rounded-3xl p-8 md:p-12 mix-blend-difference flex flex-col md:flex-row items-end justify-between gap-8 md:gap-16 overflow-hidden"
            >

                {/* LEFT: TITLE - MASKED */}
                <h1 className="font-display font-bold text-[8vw] leading-[0.8] tracking-tight text-white uppercase flex flex-col items-start select-none">
                    <span className="block overflow-hidden pb-2 md:pb-4 -mb-2 md:-mb-4">
                        <span ref={titleLine1Ref} className="block origin-bottom-left">Tarech</span>
                    </span>
                    <span className="block overflow-hidden pb-2 md:pb-4 -mb-2 md:-mb-4">
                        <span ref={titleLine2Ref} className="block origin-bottom-left text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60">
                            {/* Corp */}
                        </span>
                    </span>
                </h1>

                {/* RIGHT: DESCRIPTION */}
                <div className="flex flex-col items-start md:items-end gap-5 opacity-100 max-w-lg">
                    <p
                        ref={descriptionRef}
                        className="font-sans text-lg md:text-xl font-medium text-white/90 leading-relaxed text-left md:text-right tracking-wide"
                    >
                        We build, back, and scale the technologies defining Africa&apos;s digital horizon.
                    </p>

                    <div ref={dividerRef} className="h-px w-24 bg-white/20 origin-left md:origin-right" />

                    <div ref={metaRef} className="font-mono text-xs text-white/50 uppercase tracking-widest">
                        Est. 2023 — Pan-African
                    </div>
                </div>
            </div>
        </div>
    );
}
