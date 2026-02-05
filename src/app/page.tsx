"use client";

import { useEffect, useRef, useState, useMemo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { AsciiEarth } from "@/components/3d/ascii-earth";
import { DataGraph } from "@/components/3d/data-graph";
import { GlassSidebar } from "@/components/ui/glass-sidebar";
import { cn } from "@/lib/utils";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

// Scene orchestrator to handle camera movement and object visibility
function SceneOrchestrator({ setValues }: { setValues: (v: any) => void }) {
  const earthRef = useRef<THREE.Group>(null);
  const dataGraphRef = useRef<THREE.Group>(null);
  const { camera } = useThree();
  const [dataVisible, setDataVisible] = useState(false);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: "#main-scroll-container",
        start: "top top",
        end: "+=2000",
        scrub: 1.5,
        pin: true,
        onUpdate: (self) => {
          setValues({ progress: self.progress });
          // Toggle visibility based on progress threshold
          if (self.progress > 0.4 && !dataVisible) setDataVisible(true);
          if (self.progress < 0.4 && dataVisible) setDataVisible(false);
        },
      },
    });

    // 1. Zoom into Africa (Camera Z movement)
    tl.to(camera.position, {
      z: 3.5,
      ease: "power2.inOut",
      duration: 5,
    });

    // 2. Earth Dissolve (Scale up & Opacity down)
    if (earthRef.current) {
      tl.to(earthRef.current.scale, {
        x: 5, y: 5, z: 5,
        duration: 5,
        ease: "power2.inOut"
      }, 0);

      tl.to(earthRef.current.position, {
        x: -1,
        duration: 5
      }, 0);

      // Fade out Earth
      if (earthRef.current.children[0]) {
        const earthMesh = earthRef.current.children[0] as THREE.Mesh;
        // Note: We need to access the material safely. 
        // For now, let's assume standard material opacity animation separate or rely on Scale/Z-index
      }
    }

    // 3. Data Graph Reveal is now mostly handled by the React "visible" prop mount/unmount
    // but we can still animate the scale in if it is present.
    // Note: ScrollTrigger runs logic effectively, but React state updates inside onUpdate
    // might cause re-renders. This is acceptable for this transition speed.

  }, { scope: "#canvas-wrapper" });

  return (
    <>
      <group ref={earthRef} visible={!dataVisible}>
        <AsciiEarth />
      </group>
      <group ref={dataGraphRef}>
        {dataVisible && <DataGraph />}
      </group>
    </>
  );
}


export default function Home() {
  const container = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState({ progress: 0 });

  // UI Visibility Logic
  const showSidebar = scrollState.progress > 0.6;
  const showHeroText = scrollState.progress < 0.2;

  useGSAP(() => {
    // Intro Text Animation
    const tl = gsap.timeline();
    tl.from(".char", {
      y: 100,
      opacity: 0,
      rotateZ: 5,
      stagger: 0.05,
      duration: 1,
      ease: "power4.out",
    });
  }, { scope: container });

  return (
    <main
      ref={container}
      id="main-scroll-container"
      className={cn(
        "h-[300vh] relative",
        "bg-obsidian text-neutral-100" // Deep Obsidian Background
      )}
    >
      {/* Fixed Canvas Layer */}
      <div id="canvas-wrapper" className="fixed inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
          <ambientLight intensity={0.5} />
          <SceneOrchestrator setValues={setScrollState} />
        </Canvas>
      </div>

      {/* Fixed UI Layer: Hero Text */}
      <div
        className={cn(
          "fixed inset-0 z-10 flex flex-col items-center justify-center pointer-events-none transition-opacity duration-1000",
          showHeroText ? "opacity-100" : "opacity-0"
        )}
      >
        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-center mix-blend-difference">
          <span className="block overflow-hidden">
            {"Translating".split("").map((char, i) => (
              <span key={i} className="char inline-block">{char}</span>
            ))}
          </span>
          <span className="block overflow-hidden text-savannah">
            {"Innovation".split("").map((char, i) => (
              <span key={i} className="char inline-block">{char}</span>
            ))}
          </span>
        </h1>
        <p className="mt-6 text-xl text-neutral-400 font-mono tracking-widest uppercase">
          Deep-tech research • Localized
        </p>
      </div>

      {/* Fixed UI Layer: Sidebar */}
      <GlassSidebar visible={showSidebar} />

      {/* Scroll Spacers (Invisible) */}
      <div className="absolute top-0 w-full h-[100vh]" />
      <div className="absolute top-[100vh] w-full h-[100vh]" />
      <div className="absolute top-[200vh] w-full h-[100vh]" />

    </main>
  );
}
