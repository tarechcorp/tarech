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

import { LoadingScreen } from "@/components/ui/loading-screen";
import { NoiseOverlay } from "@/components/ui/noise-overlay";
import { SplitTextReveal } from "@/components/ui/split-text-reveal";
import { GrainientBackground } from "@/components/ui/grainient-background";

import { useLenis } from "lenis/react";

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const lenis = useLenis();

  // SCROLL TRAP LOGIC
  useEffect(() => {
    // If user has scrolled deep into the gallery (progress > 0.9), lock them there.
    if (scrollProgress > 0.9) {
      // Lock Smooth Scroll
      if (lenis) {
        lenis.stop();
        lenis.scrollTo("bottom", { immediate: true, force: true });
      }
      // Lock Native Scroll (Fallback)
      document.body.style.overflow = "hidden";
    } else {
      // Unlock
      if (lenis) lenis.start();
      document.body.style.overflow = "";
    }
  }, [scrollProgress, lenis]);

  // Transition Logic
  // 0.0 - 0.5: Earth Hero
  // 0.5 - 1.0: Transition to Space Gallery

  // FIXED REFRESH BUG:
  // Instead of unmounting the Canvas with `showHero && (...)`, we keep it mounted
  // but change visibility/events. This prevents race conditions on hydration.
  const showHero = scrollProgress < 0.6;
  const showGallery = scrollProgress > 0.4;

  const heroOpacity = isLoaded ? Math.max(0, 1 - (scrollProgress - 0.4) * 3) : 0;
  const galleryOpacity = Math.min(1, (scrollProgress - 0.4) * 2);

  return (
    <main ref={container} className="relative min-h-[400vh]">

      <GrainientBackground
        color1="#000000"
        color2="#000000"
        color3="#000000"
        timeSpeed={2.45}
        colorBalance={0.27}
        warpStrength={1.55}
        warpFrequency={8.1}
        warpSpeed={2}
        warpAmplitude={50}
        blendAngle={0}
        blendSoftness={0.05}
        rotationAmount={500}
        noiseScale={2}
        grainAmount={0.1}
        grainScale={2}
        grainAnimated={false}
        contrast={1.5}
        gamma={1}
        saturation={1}
        centerX={0}
        centerY={0}
        zoom={0.9}
      />
      <NoiseOverlay />
      <LoadingScreen onComplete={() => setIsLoaded(true)} />

      {/* SCROLL TRIGGER SPACER */}
      <div id="hero-scroll-trigger" className="absolute top-0 left-0 w-full h-[300vh] pointer-events-none" />

      {/* STAGE 1: EARTH HERO */}
      <div
        id="canvas-wrapper"
        className="fixed inset-0 z-10 transition-opacity duration-500"
        style={{ opacity: heroOpacity, pointerEvents: showHero ? "auto" : "none" }}
      >
        {/* Render Canvas Always, use CSS to hide if needed, but for hero it's fine */}
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <EarthScene setProgress={setScrollProgress} />
        </Canvas>
      </div>

      {/* HERO TEXT */}
      <div
        className="fixed inset-0 z-20 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-500"
        style={{ opacity: Math.max(0, 1 - scrollProgress * 3) }}
      >
        <div className="flex flex-col items-center gap-6 mix-blend-difference text-center max-w-5xl px-4">
          <div className="flex flex-col gap-0 items-center">
            <SplitTextReveal
              text="From Lab to Life."
              className="text-5xl md:text-7xl font-bold tracking-tighter text-white leading-[0.9]"
              delay={2.5}
              wordLevel={true}
            />
            <SplitTextReveal
              text="From Global to Grounded."
              className="text-5xl md:text-7xl font-bold tracking-tighter text-savannah leading-[0.9]"
              delay={3.2}
              wordLevel={true}
            />
          </div>

          <div className="overflow-hidden mt-4">
            <p className="text-lg md:text-xl font-light text-neutral-300 max-w-2xl animate-fade-up opacity-0"
              style={{ animation: "fadeUp 1s ease-out 4.5s forwards" }}>
              Bridging the world’s most advanced R&D with the heartbeat of the African market.
            </p>
          </div>
        </div>
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

    </main>
  );
}
