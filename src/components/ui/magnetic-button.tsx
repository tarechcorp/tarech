"use client";

import { useRef, ReactElement, cloneElement } from "react";
import gsap from "gsap";

interface MagneticButtonProps {
    children: ReactElement;
    strength?: number; // 0 to 1 (0 = no pull, 1 = strong pull)
}

export function MagneticButton({ children, strength = 0.5 }: MagneticButtonProps) {
    const ref = useRef<HTMLElement>(null);

    const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
        const { clientX, clientY } = e;
        const { left, top, width, height } = ref.current!.getBoundingClientRect();

        const x = clientX - (left + width / 2);
        const y = clientY - (top + height / 2);

        gsap.to(ref.current, {
            x: x * strength,
            y: y * strength,
            duration: 1,
            ease: "power4.out",
        });
    };

    const handleMouseLeave = () => {
        gsap.to(ref.current, {
            x: 0,
            y: 0,
            duration: 1,
            ease: "elastic.out(1, 0.3)",
        });
    };

    return cloneElement(children as ReactElement<any>, {
        ref,
        onMouseMove: handleMouseMove,
        onMouseLeave: handleMouseLeave,
    });
}
