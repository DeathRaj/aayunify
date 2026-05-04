"use client";

import { useRef, Suspense, useState, useCallback, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  Float,
  ContactShadows,
  Preload,
  AdaptiveDpr,
  AdaptiveEvents,
  PerformanceMonitor,
  Environment,
  MeshTransmissionMaterial,
  useScroll,
} from "@react-three/drei";
import * as THREE from "three";
import { useInView } from "framer-motion";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";
import { useWebGLFallback } from "@/hooks/use-webgl-fallback";

// --- Types ---

interface SceneProps {
  isMobile: boolean;
}

// --- 3D Components ---

/**
 * Luminous Glass Bottle with refraction and transmission
 */
function LuminousBottle({ position, rotation, scale = 1 }: { position: [number, number, number]; rotation?: [number, number, number]; scale?: number }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const isMobile = useIsMobile();
  
  // High-end transmission config for "Luminous Glass" effect
  const transmissionConfig = useMemo(() => ({
    backside: true,
    samples: isMobile ? 4 : 16,
    resolution: isMobile ? 256 : 512,
    transmission: 1,
    roughness: 0.05,
    thickness: 1.2,
    ior: 1.5,
    chromaticAberration: 0.06,
    anisotropy: 0.1,
    distortion: 0.1,
    distortionScale: 0.2,
    temporalDistortion: 0.1,
    clearcoat: 1,
    attenuationDistance: 0.5,
    attenuationColor: "#ffffff",
    color: "#e8f7ee", // Subtle botanical mint tint
  }), [isMobile]);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={meshRef} castShadow>
          <cylinderGeometry args={[0.45, 0.45, 1.8, 32]} />
          <MeshTransmissionMaterial {...transmissionConfig} />
        </mesh>
        
        {/* Premium Gold Cap */}
        <mesh position={[0, 1, 0]} castShadow>
          <cylinderGeometry args={[0.46, 0.46, 0.18, 32]} />
          <meshStandardMaterial 
            color="#8c6f2c" 
            metalness={0.9} 
            roughness={0.1} 
            envMapIntensity={1.5}
          />
        </mesh>
      </Float>
    </group>
  );
}

/**
 * Luminous Glass Jar
 */
function LuminousJar({ position, rotation, scale = 1 }: { position: [number, number, number]; rotation?: [number, number, number]; scale?: number }) {
  const isMobile = useIsMobile();
  
  const transmissionConfig = useMemo(() => ({
    backside: true,
    samples: isMobile ? 4 : 16,
    transmission: 1,
    roughness: 0.1,
    thickness: 1.5,
    ior: 1.4,
    chromaticAberration: 0.04,
    color: "#1f4634", // Deep botanical green
  }), [isMobile]);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <Float speed={1.2} rotationIntensity={0.8} floatIntensity={0.6}>
        <mesh castShadow>
          <cylinderGeometry args={[0.7, 0.7, 0.9, 32]} />
          <MeshTransmissionMaterial {...transmissionConfig} />
        </mesh>
        
        {/* Premium Gold Lid */}
        <mesh position={[0, 0.5, 0]} castShadow>
          <cylinderGeometry args={[0.72, 0.72, 0.14, 32]} />
          <meshStandardMaterial 
            color="#a68a44" 
            metalness={0.8} 
            roughness={0.2} 
            envMapIntensity={1.2}
          />
        </mesh>
      </Float>
    </group>
  );
}

/**
 * The 3D Scene Layer
 */
function WebGLLayer({ isMobile }: SceneProps) {
  const scroll = useScroll();
  const groupRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (!groupRef.current) return;
    
    // Calculate scroll-based offsets
    const scrollOffset = scroll.offset; // 0 to 1
    
    // Vertical movement - items float up as we scroll down
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      scrollOffset * 4,
      0.1
    );
    
    // Rotation - items rotate as we scroll
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      scrollOffset * Math.PI,
      0.05
    );
    
    // Subtle mouse parallax if on desktop
    if (!isMobile) {
      const mouse = state.mouse;
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        mouse.y * 0.1,
        0.1
      );
      groupRef.current.rotation.z = THREE.MathUtils.lerp(
        groupRef.current.rotation.z,
        -mouse.x * 0.1,
        0.1
      );
    }
  });

  return (
    <>
      {/* Cinematic Lighting */}
      <Environment preset="city" />
      <ambientLight intensity={0.2} />
      <spotLight 
        position={[10, 10, 10]} 
        angle={0.15} 
        penumbra={1} 
        intensity={2} 
        castShadow 
      />
      <pointLight position={[-10, -10, -10]} intensity={1} color="#d4f3e1" />
      
      <group ref={groupRef}>
        <LuminousBottle 
          position={[1.8, 0, -1]} 
          rotation={[0.2, 0.5, 0]} 
          scale={isMobile ? 0.8 : 1} 
        />
        <LuminousJar 
          position={[-1.6, -0.5, 1]} 
          rotation={[-0.3, -0.4, 0.1]} 
          scale={isMobile ? 0.7 : 0.9} 
        />
        
        {!isMobile && (
          <LuminousBottle 
            position={[-2.5, 2, -2]} 
            rotation={[0.5, -0.2, 0.4]} 
            scale={0.6} 
          />
        )}
      </group>

      {/* Ground shadows for depth */}
      {!isMobile && (
        <ContactShadows 
          position={[0, -3.5, 0]} 
          opacity={0.3} 
          scale={10} 
          blur={2.4} 
          far={4.5} 
        />
      )}
    </>
  );
}

// --- Fallback Component ---

function CSSFallback() {
  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
      aria-hidden="true"
    >
      <div className="absolute inset-0 opacity-40">
        <Image
          src="/images/hero-webgl-fallback.webp"
          alt=""
          fill
          className="object-cover webgl-float-fallback"
          priority={false}
          sizes="100vw"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-botanical-50/20 to-cream/40" />
    </div>
  );
}

// --- Main Export ---

/**
 * AntigravityHero - A premium, performance-optimized WebGL background layer.
 * 
 * Features:
 * - Render Suspension: Unmounts when out of viewport.
 * - Dynamic DPR: Scales from 0.5 to 1.5 based on GPU load.
 * - Adaptive Complexity: Simplifies shaders on mobile.
 * - FPS Fallback: Switches to CSS if < 30fps after 3s monitoring.
 */
export function AntigravityHero() {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  
  // 1. Render Suspension - Only mount when in or near viewport
  const isInView = useInView(containerRef, { margin: "400px 0px 400px 0px" });

  // 2. Performance Monitoring & DPR Scaling
  const [dpr, setDpr] = useState<number>(1);
  
  // 3. FPS Degradation Fallback
  const shouldFallback = useWebGLFallback(isInView);

  const onDecline = useCallback(() => {
    setDpr((prev) => Math.max(0.5, prev - 0.25));
  }, []);

  const onIncline = useCallback(() => {
    setDpr((prev) => Math.min(1.5, prev + 0.1));
  }, []);

  if (shouldFallback) {
    return <CSSFallback />;
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none select-none touch-none"
      aria-hidden="true"
    >
      {isInView && (
        <Canvas
          dpr={dpr}
          camera={{ position: [0, 0, 5], fov: 35 }}
          gl={{
            antialias: !isMobile,
            powerPreference: "high-performance",
            alpha: true,
            stencil: false,
            depth: true,
          }}
          shadows
          eventSource={typeof document !== 'undefined' ? document.getElementById('root') || undefined : undefined}
          eventPrefix="client"
        >
          <PerformanceMonitor
            onDecline={onDecline}
            onIncline={onIncline}
            threshold={0.9}
            flipflops={3}
          >
            <Suspense fallback={null}>
              <WebGLLayer isMobile={isMobile} />
              <Preload all />
              <AdaptiveDpr pixelated />
              <AdaptiveEvents />
            </Suspense>
          </PerformanceMonitor>
        </Canvas>
      )}
    </div>
  );
}
