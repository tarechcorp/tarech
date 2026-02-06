"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useThree } from "@react-three/fiber";
import { AsciiEarth } from "@/components/3d/ascii-earth";
import { DataGraph } from "@/components/3d/data-graph";
import { GlassSidebar } from "@/components/ui/glass-sidebar";
import { FloatingGallery } from "@/components/FloatingGallery"; // Screen 2
import { cn } from "@/lib/utils";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

// Component to handle Earth transition logic inside Canvas
function EarthScene({ setProgress }: { setProgress: (v: number) => void }) {
  const earthRef = useRef<THREE.Group>(null);
  const { camera } = useThree();

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#hero-scroll-trigger",
        start: "top top",
        end: "+=3000",
        scrub: 1.5,
        onUpdate: (self) => {
          setProgress(self.progress);
        },
      },
    });

    // Zoom and Dissolve Earth
    tl.to(camera.position, { z: 4, duration: 2, ease: "power2.inOut" }, 0);

    if (earthRef.current) {
      tl.to(earthRef.current.scale, { x: 4, y: 4, z: 4, duration: 2 }, 0);
      tl.to(earthRef.current.position, { x: -2, duration: 2 }, 0);
      tl.to(earthRef.current.rotation, { y: Math.PI, duration: 2 }, 0);
    }

  }, { scope: "#canvas-wrapper" });

  return (
    <group ref={earthRef}>
      <AsciiEarth />
    </group>
  );
}

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Transition Logic
  // 0.0 - 0.5: Earth Hero
  // 0.5 - 1.0: Transition to Space Gallery
  const showHero = scrollProgress < 0.9;
  const showGallery = scrollProgress > 0.4; // Overlap slightly for smoothness?

  // Opacity for fade transition
  const heroOpacity = Math.max(0, 1 - (scrollProgress - 0.4) * 3);
  const galleryOpacity = Math.min(1, (scrollProgress - 0.4) * 2);

  return (
    <main ref={container} className="relative bg-[#050505] min-h-[400vh]">

      {/* SCROLL TRIGGER SPACER */}
      <div id="hero-scroll-trigger" className="absolute top-0 left-0 w-full h-[300vh] pointer-events-none" />

      {/* STAGE 1: EARTH HERO */}
      <div
        id="canvas-wrapper"
        className="fixed inset-0 z-10 transition-opacity duration-500"
        style={{ opacity: heroOpacity, pointerEvents: showHero ? "auto" : "none" }}
      >
        {showHero && (
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <ambientLight intensity={0.5} />
            <EarthScene setProgress={setScrollProgress} />
          </Canvas>
        )}
      </div>

      {/* HERO TEXT */}
      <div
        className="fixed inset-0 z-20 flex items-center justify-center pointer-events-none transition-opacity duration-500"
        style={{ opacity: Math.max(0, 1 - scrollProgress * 3) }}
      >
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-center mix-blend-difference text-white">
          Translating <span className="text-savannah">Innovation</span>
        </h1>
      </div>

      {/* STAGE 2: FLOATING SPACE GALLERY */}
      <div
        className="fixed inset-0 z-30 transition-opacity duration-1000"
        style={{
          opacity: galleryOpacity,
          pointerEvents: showGallery ? "auto" : "none",
          visibility: showGallery ? "visible" : "hidden"
        }}
      >
        {/* FloatingGallery has its own interactive layer */}
        <FloatingGallery />
      </div>

      {/* UI SIDEBAR (Shared or Specific?) */}
      {/* FloatingGallery has its own Sidebar, so we might not need the global one here.
          The previous global one was for "Sector Analysis". 
          If Phase 4 instructions said "Update GlassSidebar", FloatingGallery uses it.
      */}

    </main>
  );
}
