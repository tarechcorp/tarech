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
            meshRef.current.lookAt(0, 0, 0); // Always face center (or camera?) Instruction says center.
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
