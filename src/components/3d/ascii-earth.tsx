"use client";

import { useFrame, useLoader, useThree } from "@react-three/fiber";
import { useRef, useMemo, useEffect, useState } from "react";
import * as THREE from "three";
import { TextureLoader } from "three";

// The characters to use for the ASCII effect, ordered by "brightness"
// Derived from the user's provided ascii-art.txt density
const ASCII_CHARS = " .:-=+*#%@";

export function AsciiEarth(props: any) {
    const meshRef = useRef<THREE.Mesh>(null);
    const canvasRef = useRef<HTMLCanvasElement>(document.createElement("canvas"));

    // Load the Earth texture
    const [sourceTexture] = useLoader(TextureLoader, [
        "https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg"
    ]);

    // Create a dynamic texture from the canvas
    const asciiTexture = useMemo(() => {
        const texture = new THREE.CanvasTexture(canvasRef.current);
        texture.minFilter = THREE.NearestFilter;
        texture.magFilter = THREE.NearestFilter;
        return texture;
    }, []);

    // Effect to draw the ASCII version onto the canvas
    useEffect(() => {
        if (!sourceTexture || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Resolution of the ASCII grid (columns x rows)
        // Higher = more detailed, Lower = more abstract/retro
        const cols = 120;
        const rows = 60;

        // Internal processing canvas (to read pixel data)
        // We render the image small here to get average brightness for "blocks"
        const pCanvas = document.createElement("canvas");
        pCanvas.width = cols;
        pCanvas.height = rows;
        const pCtx = pCanvas.getContext("2d");
        if (!pCtx) return;

        // Draw source image to processing canvas
        // Wait for image to be fully available? TextureLoader handles this mostly.
        const image = sourceTexture.image;
        if (!image) return;

        pCtx.drawImage(image, 0, 0, cols, rows);
        const imageData = pCtx.getImageData(0, 0, cols, rows);
        const pixels = imageData.data;

        // Setup target ASCII canvas
        // It needs to be large enough to hold the text cleanly
        const charSize = 24;
        canvas.width = cols * (charSize * 0.6); // Aspect ratio fix for fonts
        canvas.height = rows * charSize;

        // Fill Background
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = `bold ${charSize}px monospace`;
        ctx.textBaseline = "top";

        // "Electric Savannah" Palette generator
        // We'll alternate colors or map brightness to color

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const i = (y * cols + x) * 4;
                const r = pixels[i];
                const g = pixels[i + 1];
                const b = pixels[i + 2];
                // const a = pixels[i + 3];

                const brightness = (r + g + b) / 3;

                // Map brightness to character index
                // 255 brightness -> last char
                const charIndex = Math.floor((brightness / 255) * (ASCII_CHARS.length - 1));
                const char = ASCII_CHARS[charIndex];

                if (brightness > 20) { // Skip black/empty space
                    // Color Logic
                    if (brightness > 220) {
                        ctx.fillStyle = "#F4D03F"; // Gold/Amber (Savannah)
                    } else if (brightness > 100) {
                        ctx.fillStyle = "#1ABC5D"; // Teal (Innovation)
                    } else {
                        ctx.fillStyle = "#115544"; // Dark Teal
                    }

                    ctx.fillText(char, x * (charSize * 0.6), y * charSize);
                }
            }
        }

        asciiTexture.needsUpdate = true;

    }, [sourceTexture, asciiTexture]);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.05;
        }
    });

    return (
        <mesh ref={meshRef} {...props}>
            <sphereGeometry args={[2.5, 64, 64]} />
            <meshBasicMaterial
                map={asciiTexture}
                transparent
                opacity={0.9}
                blending={THREE.AdditiveBlending}
            />
        </mesh>
    );
}
