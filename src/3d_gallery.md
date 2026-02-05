# Replication Guide: Floating 3D Space Gallery (Screen 2: The Universe)

This guide provides detailed instructions to integrate the "Space Gallery" feature—a 3D interactive scene with floating images and 2D overlay—into the application.

> **Context**: This component serves as the **Second Screen** in the user journey.
> 1.  **Earth Hero**: User scrolls past the Earth.
> 2.  **The Universe (This Component)**: User is "trapped" in this 3D space to explore. The `GlassSidebar` describes selected nodes.
> 3.  **Page 3**: User exits via the specific button to proceed.

## 1. Integration Prerequisites

### 1.1 Libraries
Install the required dependencies.
```bash
npm install three @types/three @react-three/fiber @react-three/drei lucide-react @samoramachel/netuniverse
```

## 2. Configuration

### 2.1 CSS & Canvas
Ensure your global CSS allows the canvas to fill the viewport and matches the "Industrial Elegance" aesthetic.

```css
/* src/app/globals.css or equivalent */
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #050505; /* Deep space */
}

canvas {
  width: 100vw !important;
  height: 100vh !important;
  position: fixed !important;
  top: 0;
  left: 0;
  display: block;
}
```

## 3. Components

### 3.1 Update Glass-Sidebar
Enhance the existing `src/components/ui/glass-sidebar.tsx` to handle dynamic content triggering from the 3D gallery interaction.

```tsx
// Suggested Enhancement to GlassSidebar Props
interface GlassSidebarProps {
    visible: boolean;
    title?: string;       // New
    subtitle?: string;    // New
    description?: string; // New
    onClose?: () => void; // New
}

// Update the component to render these props dynamically if provided, 
// defaulting to the "Sector Analysis" static content if not.
```

### 3.2 Gallery Item (3D Image Panel)
Create [src/components/GalleryItem.tsx](file:///home/batman/Documents/Programming/react/reserch_corp/src/components/GalleryItem.tsx). Renders floating image panels in the universe.

```tsx
"use client";

import { useRef, useState } from "react";
import { useTexture } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

interface GalleryItemProps {
    url: string;
    position: [number, number, number];
    onClick: () => void;
}

export function GalleryItem({ url, position, onClick }: GalleryItemProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const texture = useTexture(url);
    const [hovered, setHovered] = useState(false);

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.lookAt(0, 0, 0); // Always face center
            const targetScale = hovered ? 1.1 : 1;
            meshRef.current.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 0.1);
        }
    });

    return (
        <mesh
            ref={meshRef}
            position={position}
            onClick={(e) => {
                e.stopPropagation();
                onClick();
            }}
            onPointerOver={() => {
                document.body.style.cursor = 'pointer';
                setHovered(true);
            }}
            onPointerOut={() => {
                document.body.style.cursor = 'auto';
                setHovered(false);
            }}
        >
            <planeGeometry args={[40, 30]} />
            <meshBasicMaterial map={texture} side={THREE.DoubleSide} transparent opacity={0.9} />
        </mesh>
    );
}
```

### 3.3 Floating Universe (Orchestrator)
Create [src/components/FloatingGallery.tsx](file:///home/batman/Documents/Programming/react/reserch_corp/src/components/FloatingGallery.tsx).
**Enhancement**: Uses `GlassSidebar` for item details instead of the overlay.

```tsx
"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import * as THREE from "three";
import { GraphScene } from "@/lib/netuniverse/GraphScene"; 
import { generateGraphData } from "@/lib/netuniverse/data/generator"; 
import { GalleryItem } from "./GalleryItem";
import { GlassSidebar } from "@/components/ui/glass-sidebar"; // Existing component

interface GalleryImage {
    id: string;
    url: string;
    position: [number, number, number];
    title: string;
    description?: string;
}

const generateGalleryData = (count = 20): GalleryImage[] => { 
    /* ... See previous implementation for data generation logic ... */ 
    return []; 
};

export function FloatingGallery() {
    const router = useRouter();
    const graphRef = useRef<any>(null);
    const [images] = useState(() => generateGalleryData(20));
    const [graphData] = useState(() => generateGraphData());
    const [selectedItem, setSelectedItem] = useState<GalleryImage | null>(null);

    const handleImageClick = (img: GalleryImage) => {
        if (!graphRef.current) return;
        setSelectedItem(img);
        
        // Fly camera to image
        const imgVec = new THREE.Vector3(...img.position);
        const targetVec = imgVec.clone().normalize().multiplyScalar(imgVec.length() - 80); 
        graphRef.current.flyTo([targetVec.x, targetVec.y, targetVec.z], 2);
        graphRef.current.lookAt(img.position, 2);
    };

    const handleCloseSidebar = () => setSelectedItem(null);

    const handleExit = () => {
        console.log("Exiting Universe -> Grade 3");
        router.push("/page-3");
    };

    return (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "#050505" }}>
            {/* 3D Scene */}
            <GraphScene ref={graphRef} data={graphData}>
                {images.map((img) => (
                    <GalleryItem
                        key={img.id}
                        url={img.url}
                        position={img.position}
                        onClick={() => handleImageClick(img)}
                    />
                ))}
            </GraphScene>

            {/* Sidebar instead of Overlay */}
            <GlassSidebar 
                visible={!!selectedItem} 
                // Note: You will need to update GlassSidebar to accept these props
                // title={selectedItem?.title}
                // description={selectedItem?.description}
                // onClose={handleCloseSidebar}
            />

            {/* EXIT BUTTON */}
            <div className="fixed bottom-8 right-8 z-50">
                <button
                    onClick={handleExit}
                    className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-mono hover:bg-white/20 transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]"
                >
                    PROCEED TO NEXT PHASE →
                </button>
            </div>
        </div>
    );
}
```

### 3.4 Main Page Integration
Update `src/app/page.tsx` to include the gallery.

```tsx
import { FloatingGallery } from "@/components/FloatingGallery";

export default function Home() {
  return (
    <main>
      <FloatingGallery />
    </main>
  );
}
```

## 4. Verification
1.  **3D Universe**: Scene renders.
2.  **Sidebar Integration**: Clicking an image opens the `GlassSidebar`.
3.  **Exit Flow**: Bottom-right button navigates to page 3.
