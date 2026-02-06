"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function SphereMesh() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.2;
            meshRef.current.rotation.x += delta * 0.05;
        }
    });

    return (
        <mesh ref={meshRef} scale={2}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial
                color="black"
                wireframe
                transparent
                opacity={0.15}
            />
        </mesh>
    );
}

export function WireframeSphere() {
    return (
        <div className="w-full h-full min-h-[400px]">
            <Canvas camera={{ position: [0, 0, 4] }} gl={{ alpha: true }}>
                <SphereMesh />
            </Canvas>
        </div>
    );
}
