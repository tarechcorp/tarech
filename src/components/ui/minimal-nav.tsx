"use client";

import Link from "next/link";

export function MinimalNav() {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-8 py-6 mix-blend-difference text-white pointer-events-none">
            {/* Brand - Serif Font for "Theory" vibe */}
            <div className="pointer-events-auto">
                <Link href="/" className="font-serif text-xl tracking-tight hover:opacity-80 transition-opacity">
                    Research Corp
                </Link>
            </div>

            {/* Navigation Links - Sans Serif for "Technical" vibe */}
            <div className="pointer-events-auto">
                <Link
                    href="/about"
                    className="font-sans text-sm font-medium tracking-wide hover:underline decoration-1 underline-offset-4 opacity-90 hover:opacity-100 transition-all"
                >
                    About
                </Link>
            </div>
        </nav>
    );
}
