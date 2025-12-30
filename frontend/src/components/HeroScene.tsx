'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Sphere, MeshDistortMaterial, Float, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

function AnimatedSphere() {
    const meshRef = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <Float speed={2} rotationIntensity={1} floatIntensity={1}>
            <Sphere ref={meshRef} args={[1, 100, 200]} scale={2.4}>
                <MeshDistortMaterial
                    color="#4f46e5"
                    attach="material"
                    distort={0.4}
                    speed={1.5}
                    roughness={0}
                    metalness={1}
                />
            </Sphere>
        </Float>
    );
}

export default function HeroScene() {
    return (
        <div className="absolute inset-0 -z-10 h-full w-full bg-slate-950">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 5]} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />

                <AnimatedSphere />

                <gridHelper args={[100, 50, '#1e293b', '#0f172a']} rotation={[Math.PI / 2.5, 0, 0]} position={[0, -2, 0]} />
            </Canvas>
        </div>
    );
}
