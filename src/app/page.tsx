"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FloatingGallery } from "@/components/FloatingGallery"; // Screen 2
import { LoadingScreen } from "@/components/ui/loading-screen";
import { NoiseOverlay } from "@/components/ui/noise-overlay";
import { GrainientBackground } from "@/components/ui/grainient-background";
import { useLenis } from "lenis/react";
import { MinimalNav } from "@/components/ui/minimal-nav";
import { TextHero } from "@/components/text-hero";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const lenis = useLenis();

  // Scroll Trigger to track progress
  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: "#hero-scroll-trigger",
        start: "top top",
        end: "+=2000", // Shorter scroll distance for quicker transition
        scrub: true,
        onUpdate: (self) => {
          setScrollProgress(self.progress);
        }
      });
    }, container);

    return () => ctx.revert();
  }, []);

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
  // 0.0 - 0.4: Text Hero (Fade out 0.2-0.5)
  // 0.4 - 1.0: Transition to Space Gallery

  const showHero = scrollProgress < 0.6;
  const showGallery = scrollProgress > 0.3;

  // Hero Fades out quickly as you scroll
  const heroOpacity = isLoaded ? Math.max(0, 1 - (scrollProgress * 2.5)) : 0;

  // Gallery Fades in
  const galleryOpacity = Math.min(1, Math.max(0, (scrollProgress - 0.3) * 2));

  return (
    <main ref={container} className="relative min-h-[300vh]">
      <MinimalNav visible={!isSidebarOpen} />

      <GrainientBackground
        color1="#3F3934"
        color2="#000542"
        color3="#E59952"
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
      <div id="hero-scroll-trigger" className="absolute top-0 left-0 w-full h-[200vh] pointer-events-none" />

      {/* STAGE 1: TEXT HERO */}
      {showHero && (
        <TextHero opacity={heroOpacity} />
      )}

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
        <FloatingGallery onSidebarOpenChange={setIsSidebarOpen} />
      </div>

    </main>
  );
}
