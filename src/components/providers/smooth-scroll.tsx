"use client";

import { ReactLenis } from "lenis/react";
import { ReactNode, useEffect, useRef } from "react";
import gsap from "gsap";

interface SmoothScrollProps {
    children: ReactNode;
}

export function SmoothScroll({ children }: SmoothScrollProps) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const lenisRef = useRef<any>(null);

    useEffect(() => {
        const update = (time: number) => {
            lenisRef.current?.lenis?.raf(time * 1000);
        };

        gsap.ticker.add(update);
        gsap.ticker.lagSmoothing(0); // Disable lag smoothing for smoother scroll

        return () => {
            gsap.ticker.remove(update);
        };
    }, []);

    return (
        <ReactLenis
            ref={lenisRef}
            autoRaf={false}
            root
            options={{ lerp: 0.1, duration: 1.5, smoothWheel: true }}
        >
            {children}
        </ReactLenis>
    );
}
