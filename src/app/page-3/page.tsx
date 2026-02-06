"use client";

import { MinimalNav } from "@/components/ui/minimal-nav";

export default function Page3() {
    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center relative overflow-hidden">
            <MinimalNav />

            <div className="z-10 text-center space-y-6">
                <h1 className="text-6xl font-serif tracking-tight">Phase 3</h1>
                <p className="font-sans text-neutral-400 max-w-md mx-auto">
                    Deep space exploration module initialized.
                    <br />
                    Waiting for further instructions.
                </p>
            </div>

            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-neutral-900 to-black -z-10" />
        </div>
    );
}
