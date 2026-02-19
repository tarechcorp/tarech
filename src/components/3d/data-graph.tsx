"use client";

import { useFrame } from "@react-three/fiber";
import { useRef, useMemo } from "react";
import * as THREE from "three";

export function DataGraph({ visible = false }: { visible?: boolean }) {
    const pointsRef = useRef<THREE.Points>(null);

    // Generate random data points clustered in specific "sectors"
    // ... [same memorized logic] ...

    // START VISIBILITY FIX:
    // We will handle visibility in the parent page.tsx to avoid Hook errors.
    // if (!visible) return null;

    // ... [existing logic] ...
    const particlesCount = 2000;
    const positions = useMemo(() => {
        const pos = new Float32Array(particlesCount * 3);
        for (let i = 0; i < particlesCount; i++) {
            // Create 3 main clusters
            const cluster = i % 3;
            let cx = 0, cy = 0, cz = 0;

            if (cluster === 0) { cx = 3; cy = 1; } // Fintech
            if (cluster === 1) { cx = -3; cy = -1; } // AgriTech
            if (cluster === 2) { cx = 0; cy = 2; } // Consumer

            const r = 1.5; // spread
            const u = Math.random();
            const v = Math.random();
            const theta = 2 * Math.PI * u;
            const phi = Math.acos(2 * v - 1);
            const x = cx + (r * Math.sin(phi) * Math.cos(theta));
            const y = cy + (r * Math.sin(phi) * Math.sin(theta));
            const z = cz + (r * Math.cos(phi));

            pos[i * 3] = x;
            pos[i * 3 + 1] = y;
            pos[i * 3 + 2] = z;
        }
        return pos;
    }, []);

    useFrame((state, delta) => {
        if (pointsRef.current) {
            pointsRef.current.rotation.y += delta * 0.02; // Slow gentle rotation
        }
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={particlesCount}
                    array={positions}
                    itemSize={3}
                    args={[positions, 3]}
                />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                color="#E0A64E" // Electric Savannah Amber
                sizeAttenuation
                transparent
                opacity={0.8}
                blending={THREE.AdditiveBlending}
            />
        </points>
    );
}
