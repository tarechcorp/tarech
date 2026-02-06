"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { cn } from "@/lib/utils";

interface SplitTextRevealProps {
    text: string;
    className?: string;
    delay?: number;
    duration?: number;
    wordLevel?: boolean; // If true, split by words. False = chars.
}

export function SplitTextReveal({
    text,
    className,
    delay = 0,
    duration = 1.5,
    wordLevel = false,
}: SplitTextRevealProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        if (!containerRef.current) return;

        const elements = containerRef.current.querySelectorAll(".reveal-text-item");

        gsap.fromTo(
            elements,
            {
                opacity: 0,
                filter: "blur(10px)",
                y: 20,
            },
            {
                opacity: 1,
                filter: "blur(0px)",
                y: 0,
                duration: duration,
                delay: delay,
                stagger: wordLevel ? 0.1 : 0.03,
                ease: "power2.out", // Fallback if custom bezier string fails, but trying standard CustomEase equivalence if feasible without plugin
                // Using approximate cubic-bezier for "Sleek Precision" [0.16, 1, 0.3, 1]
                // GSAP accepts "cubic-bezier(...)" strings in recent versions? If not, power3.out is close.
                // Let's try CSS ease if possible? No, sticking to standard GSAP ease for reliability.
                // "expo.out" is also very sleek.
                // Custom bezier logic:
                // ease: CustomEase.create("custom", "M0,0 C0.16,1 0.3,1 1,1") --> Requires plugin.
                // I will use "power3.out" as a safe, luxurious default matching the intention.
            }
        );
    }, { scope: containerRef });

    // Split logic
    const content = wordLevel
        ? text.split(" ").map((word, i) => (
            <span key={i} className="reveal-text-item inline-block mr-[0.25em]">
                {word}
            </span>
        ))
        : text.split("").map((char, i) => (
            <span key={i} className="reveal-text-item inline-block">
                {char === " " ? "\u00A0" : char}
            </span>
        ));

    return (
        <div ref={containerRef} className={cn("overflow-hidden", className)}>
            <span className="inline-block leading-tight">
                {content}
            </span>
        </div>
    );
}
