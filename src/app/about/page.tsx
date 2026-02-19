"use client";

import Link from "next/link";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { WireframeSphere } from "@/components/ui/wireframe-sphere";
import { cn } from "@/lib/utils";
import { usePageTransition } from "@/components/providers/transition-provider";

export default function AboutPage() {
    const { transitionTo } = usePageTransition();

    return (
        <main className="min-h-screen bg-[#f4f1ee] text-black font-serif selection:bg-orange-500 selection:text-white">
            {/* HEADER GRID */}
            <header className="grid grid-cols-12 border-b border-black/10 sticky top-0 bg-[#f4f1ee]/90 backdrop-blur-sm z-50">
                <div className="col-span-6 md:col-span-3 border-r border-black/10 p-6 flex items-center group">
                    <MagneticButton strength={0.4}>
                        <Link
                            href="/"
                            className="font-display text-3xl tracking-tight font-bold flex items-center gap-2"
                            onClick={(e) => {
                                e.preventDefault();
                                transitionTo("/");
                            }}
                        >
                            <span className="w-3 h-3 bg-orange-600 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            Tarech
                        </Link>
                    </MagneticButton>
                </div>
                <div className="col-span-6 md:col-span-9 p-6 flex justify-end gap-8 font-sans text-xs tracking-widest uppercase opacity-60">
                    <span>Nairobi</span>
                    <span>Cape Town</span>
                </div>
            </header>

            {/* HERO SECTION */}
            <section className="grid grid-cols-1 md:grid-cols-2 border-b border-black/10 min-h-[80vh]">
                {/* LEFT: CONTENT */}
                <div className="border-r border-black/10 p-8 md:p-16 flex flex-col justify-between">
                    <div className="font-sans text-xs font-bold tracking-widest mb-12">01</div>

                    <div className="space-y-8 max-w-xl">
                        <h2 className="text-4xl md:text-5xl leading-[1.1] font-medium">
                            Radical Access. Continental Scale.
                        </h2>
                        <p className="text-lg md:text-xl leading-relaxed opacity-70 font-sans font-light">
                            Research Corp is the bridge between the lab and the living room. We dismantle barriers to advanced technology, engineering a future where high-impact R&D fuels the accelerated growth of the African consumer market.
                        </p>
                    </div>

                    <div className="mt-12">
                        <button className="px-8 py-4 bg-black text-white rounded-full font-sans text-xs font-bold uppercase tracking-widest hover:bg-orange-500 transition-colors">
                            Explore Our Projects
                        </button>
                    </div>
                </div>

                {/* RIGHT: VISUAL */}
                <div className="relative overflow-hidden bg-[#ebe8e5]">
                    <div className="absolute inset-0 flex items-center justify-center opacity-80 mix-blend-multiply">
                        <WireframeSphere />
                    </div>
                    <div className="absolute bottom-8 right-8 font-sans text-[10px] tracking-widest opacity-40 rotate-90 origin-bottom-right">
                        FIG 2.4 — NETWORK TOPOLOGY
                    </div>
                </div>
            </section>

            {/* DATA GRID */}
            <section className="grid grid-cols-2 md:grid-cols-4 border-b border-black/10">
                {[
                    { label: "Founded", value: "2023" },
                    { label: "Reach", value: "Pan-African" },
                    { label: "Focus", value: "Consumer Tech" },
                    { label: "Status", value: "Lab to Market" }
                ].map((item, i) => (
                    <div key={i} className={cn("p-8 border-r border-black/10", i === 3 && "border-r-0")}>
                        <div className="font-sans text-[10px] uppercase tracking-widest opacity-50 mb-2">{item.label}</div>
                        <div className="text-2xl md:text-3xl">{item.value}</div>
                    </div>
                ))}
            </section>

            {/* FOOTER */}
            <footer className="grid grid-cols-1 md:grid-cols-2 min-h-[40vh]">
                <div className="border-r border-black/10 p-12 flex flex-col justify-end">
                    <a href="mailto:hello@researchcorp.africa" className="text-2xl hover:underline decoration-1 underline-offset-4">hello@researchcorp.africa</a>
                </div>
                <div className="p-12 flex flex-col justify-end">
                    <div className="font-sans text-xs opacity-50 uppercase tracking-widest">
                        © 2026 Research Corp. All Rights Reserved.
                    </div>
                </div>
            </footer>
        </main>
    );
}
