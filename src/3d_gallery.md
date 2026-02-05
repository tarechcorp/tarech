# Replication Guide: Floating 3D Space Gallery

This guide provides detailed instructions to integrate the "Space Gallery" feature—a 3D interactive scene with floating images and 2D overlay—into an existing React/Next.js application.

## 1. Integration Prerequisites

### 1.1 Libraries
Install the required dependencies for 3D rendering and the NetUniverse engine.
```bash
npm install three @types/three @react-three/fiber @react-three/drei lucide-react @samoramachel/netuniverse
```

## 2. Configuration

### 2.1 CSS & Canvas
Ensure your global CSS allows the canvas to fill the viewport. **Note:** The background color is handled by the `netuniverse` configuration (defaulting to a light cream), so no background color is needed on the body.

```css
/* src/app/globals.css or equivalent */
html, body {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  /* Background color is managed by NetUniverse config */
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

### 2.2 Hydration (Next.js)
If using Next.js App Router, update your root layout to handle potential hydration mismatches from browser extensions.
```tsx
// src/app/layout.tsx
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
```

## 3. Components

### 3.1 Description Overlay
Create [src/components/DescriptionOverlay.tsx](file:///home/batman/Documents/Programming/react/SpaceGallery/src/components/DescriptionOverlay.tsx). This component renders the 2D "Heads-Up Display" UI that appears when an image is selected.
```tsx
"use client";

import { X } from "lucide-react";
import { useEffect, useState } from "react";

interface DescriptionOverlayProps {
    title: string;
    description?: string;
    isOpen: boolean;
    onClose: () => void;
}

export function DescriptionOverlay({ title, description, isOpen, onClose }: DescriptionOverlayProps) {
    const [isVisible, setIsVisible] = useState(isOpen);

    useEffect(() => {
        if (isOpen) {
            setIsVisible(true);
        } else {
            const timer = setTimeout(() => setIsVisible(false), 500); // Animation duration
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isVisible && !isOpen) return null;

    return (
        <div 
            className={`fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl bg-black/80 backdrop-blur-md rounded-xl border border-white/10 text-white p-6 shadow-2xl transition-all duration-500 ease-out z-50 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}
        >
            <div className="flex justify-between items-start mb-2">
                <h2 className="text-2xl font-bold">{title}</h2>
                <button 
                    onClick={onClose}
                    className="p-2 hover:bg-white/10 rounded-full transition-colors"
                >
                    <X size={24} />
                </button>
            </div>
            {description && (
                <>
                    <div className="w-16 h-1 bg-blue-500 rounded-full mb-4" />
                    <p className="text-gray-200 leading-relaxed text-lg font-light">
                        {description}
                    </p>
                </>
            )}
        </div>
    );
}
```

### 3.2 Gallery Item
Create [src/components/GalleryItem.tsx](file:///home/batman/Documents/Programming/react/SpaceGallery/src/components/GalleryItem.tsx). This component renders a single image as a 3D plane in the scene.
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
            // Always face the center/camera
            meshRef.current.lookAt(0, 0, 0);

            // Hover scale animation
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

### 3.3 Floating Gallery (Main Container)
Create [src/components/FloatingGallery.tsx](file:///home/batman/Documents/Programming/react/SpaceGallery/src/components/FloatingGallery.tsx). This orchestrates the scene, data availability, and interactions.
```tsx
"use client";

import { useEffect, useState, useRef } from "react";
import * as THREE from "three";
import { GraphScene } from "@/lib/netuniverse/GraphScene"; // Ensure path matches your setup or library import
import { generateGraphData } from "@/lib/netuniverse/data/generator"; // Or use library's generator if available
import { GalleryItem } from "./GalleryItem";
import { DescriptionOverlay } from "./DescriptionOverlay";

interface GalleryImage {
    id: string;
    url: string;
    position: [number, number, number];
    title: string;
    description?: string;
}

// Deterministic generation of image sphere
const generateGalleryData = (count = 20): GalleryImage[] => {
    return Array.from({ length: count }).map((_, i) => {
        const phi = Math.acos(-1 + (2 * i) / count);
        const theta = Math.sqrt(count * Math.PI) * phi;
        const radius = 200 + (i % 5) * 20;

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);

        const hasDescription = i % 3 !== 0;
        
        return {
            id: `img-${i}`,
            url: `https://picsum.photos/seed/${i + 1}/800/600`, // Reliable seed-based images
            position: [x, y, z],
            title: `Cosmic View ${i + 1}`,
            description: hasDescription ? `This comprises a detailed view of sector ${i + 1}. The celestial alignment allows for optimal energy harvesting.` : undefined
        };
    });
};

export function FloatingGallery() {
    // Note: GraphScene from netuniverse usually accepts a ref to expose camera controls like flyTo
    const graphRef = useRef<any>(null);
    const [images] = useState(() => generateGalleryData(20));
    // If netuniverse doesn't export generateGraphData directly, you might need to implement a basic node generator
    const [graphData] = useState(() => generateGraphData());
    const [selectedItem, setSelectedItem] = useState<GalleryImage | null>(null);

    const handleImageClick = (img: GalleryImage) => {
        if (!graphRef.current) return;
        setSelectedItem(img);

        // Fly camera to a position in front of the image
        const imgVec = new THREE.Vector3(...img.position);
        // Position camera 80 units away from image, towards center
        const targetVec = imgVec.clone().normalize().multiplyScalar(imgVec.length() - 80); 

        graphRef.current.flyTo([targetVec.x, targetVec.y, targetVec.z], 2);
        graphRef.current.lookAt(img.position, 2);
    };

    const handleClosePanel = () => {
        setSelectedItem(null);
    };

    return (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%", background: "#FFFBF4" }}>
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

            <DescriptionOverlay
                title={selectedItem?.title || ""}
                description={selectedItem?.description}
                isOpen={!!selectedItem}
                onClose={handleClosePanel}
            />
        </div>
    );
}
```

### 3.4 Main Page
Update [src/app/page.tsx](file:///home/batman/Documents/Programming/react/SpaceGallery/src/app/page.tsx) (or your route's page component) to render the gallery.
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
Run your application.
1.  **3D Scene**: You should see a 3D network of nodes (from `netuniverse`) and 20 floating image panels.
2.  **Navigation**: You should be able to pan and zoom around the scene (standard `netuniverse` controls).
3.  **Interaction**: Click any image.
    *   The camera should smoothly fly to face the image.
    *   A 2D overlay card should appear at the bottom of the screen with the title (and description if available).
4.  **Close**: Click the 'X' on the overlay. The overlay should disappear.
