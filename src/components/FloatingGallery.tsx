"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import * as THREE from "three";
import { GraphScene, ClusterId, generateGraphData } from "@samoramachel/netuniverse";
import { GalleryItem } from "./GalleryItem";
import { GlassSidebar } from "@/components/ui/glass-sidebar";

interface GalleryImage {
    id: string;
    url: string;
    position: [number, number, number];
    title: string;
    sector: string;
    description?: string;
}

// Mock Data Generator for Gallery Items (Positions)
const generateGalleryData = (count = 20): GalleryImage[] => {
    return Array.from({ length: count }).map((_, i) => {
        const phi = Math.acos(-1 + (2 * i) / count);
        const theta = Math.sqrt(count * Math.PI) * phi;
        const radius = 200 + (i % 5) * 20;

        const x = radius * Math.sin(phi) * Math.cos(theta);
        const y = radius * Math.sin(phi) * Math.sin(theta);
        const z = radius * Math.cos(phi);

        return {
            id: `img-${i}`,
            url: `https://picsum.photos/seed/${i}/800/600`, // Placeholder
            position: [x, y, z],
            title: `Project Node ${i + 1}`,
            sector: ["Fintech", "AgriTech", "Health", "Logistics"][i % 4],
            description: `Analyzing deep-space signals from sector ${i + 1}. Pattern recognition alpha: ${Math.random().toFixed(2)}.`
        };
    });
};

import { usePageTransition } from "@/components/providers/transition-provider";

interface FloatingGalleryProps {
    onSidebarOpenChange?: (isOpen: boolean) => void;
}

export function FloatingGallery({ onSidebarOpenChange }: FloatingGalleryProps) {
    // const router = useRouter(); // Removed in favor of transition
    const { transitionTo } = usePageTransition();
    const graphRef = useRef<any>(null);
    const [images] = useState(() => generateGalleryData(20));

    // Use library's generator
    const [graphData] = useState(() => {
        const data = generateGraphData(100);
        // Force Cast valid ClusterId if needed or ensure data aligns
        return data;
    });

    const [selectedItem, setSelectedItem] = useState<GalleryImage | null>(null);

    // Sync sidebar state with parent
    useEffect(() => {
        onSidebarOpenChange?.(!!selectedItem);
    }, [selectedItem, onSidebarOpenChange]);

    const handleImageClick = (img: GalleryImage) => {
        if (!graphRef.current) return;
        setSelectedItem(img);

        // Fly camera to image
        const imgVec = new THREE.Vector3(...img.position);
        const targetVec = imgVec.clone().normalize().multiplyScalar(imgVec.length() - 80);
        if (graphRef.current.flyTo) {
            graphRef.current.flyTo([targetVec.x, targetVec.y, targetVec.z], 2);
            graphRef.current.lookAt(img.position, 2);
        }
    };

    const handleCloseSidebar = () => setSelectedItem(null);

    const handleExit = () => {
        console.log("Exiting Universe -> Grade 3");
        transitionTo("/about");
    };

    const customConfig = {
        graph: {
            controls: {
                enableZoom: false
            }
        }
    }

    return (
        <div className="fixed top-0 left-0 w-full h-full -z-10">
            {/* 3D Scene */}
            <GraphScene ref={graphRef} data={graphData} config={customConfig} style={{ background: "transparent" }}>
                {/* Note: StarField is not exported yet. Using dark background. */}

                {images.map((img) => (
                    <GalleryItem
                        key={img.id}
                        url={img.url}
                        position={img.position}
                        onClick={() => handleImageClick(img)}
                    />
                ))}
            </GraphScene>

            {/* Sidebar */}
            <GlassSidebar
                visible={!!selectedItem}
                title={selectedItem?.title}
                sector={selectedItem?.sector}
                description={selectedItem?.description}
                onClose={handleCloseSidebar}
                onExit={handleExit}
            />

            {/* EXIT BUTTON */}
            
        </div>
    );
}
