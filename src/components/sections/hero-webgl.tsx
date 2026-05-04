"use client";

import { useRef, Suspense, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Float,
  ContactShadows,
  Preload,
  AdaptiveDpr,
  AdaptiveEvents,
  PerformanceMonitor,
} from "@react-three/drei";
import * as THREE from "three";
import { useScroll, useInView } from "framer-motion";
import Image from "next/image";
import { useIsMobile } from "@/hooks/use-mobile";
import { useWebGLFallback } from "@/hooks/use-webgl-fallback";

// ─── Scene (isolated so it only mounts inside a live Canvas) ──────────────────

function WebGLScene({ isMobile }: { isMobile: boolean }) {
  const { scrollYProgress } = useScroll();
  const groupRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!groupRef.current) return;
    const sv = scrollYProgress.get();
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      sv * 1.2,
      0.05,
    );
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      sv * Math.PI * 0.4,
      0.03,
    );
  });

  // Reduce polygon complexity on mobile even further
  const segments = isMobile ? 10 : 16;

  return (
    <>
      <group ref={groupRef}>
        {/* Bottle */}
        <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.8} position={[1.1, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.45, 0.45, 1.8, segments]} />
            <meshStandardMaterial color="#d4f3e1" transparent opacity={0.6} roughness={0.1} metalness={0.2} />
          </mesh>
          <mesh position={[0, 1, 0]}>
            <cylinderGeometry args={[0.46, 0.46, 0.15, segments]} />
            <meshStandardMaterial color="#8c6f2c" metalness={0.5} roughness={0.4} />
          </mesh>
        </Float>

        {/* Jar */}
        <Float speed={0.8} rotationIntensity={0.4} floatIntensity={0.8} position={[-1.1, -0.4, 0.5]}>
          <mesh>
            <cylinderGeometry args={[0.7, 0.7, 0.9, segments]} />
            <meshStandardMaterial color="#1f4634" transparent opacity={0.8} roughness={0.3} metalness={0.1} />
          </mesh>
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.72, 0.72, 0.12, segments]} />
            <meshStandardMaterial color="#8c6f2c" metalness={0.5} roughness={0.4} />
          </mesh>
        </Float>
      </group>

      {/* Skip expensive contact shadows on mobile */}
      {!isMobile && (
        <ContactShadows position={[0, -2, 0]} opacity={0.25} scale={6} blur={2.5} far={3} />
      )}

      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={isMobile ? 0.3 : 0.5} castShadow={false} />
    </>
  );
}

// ─── CSS Fallback (pure compositor path, no WebGL) ────────────────────────────

function CSSFallback() {
  return (
    <div
      className="absolute inset-0 z-0 pointer-events-none opacity-50"
      aria-hidden="true"
    >
      <Image
        src="/images/hero-webgl-fallback.webp"
        alt=""
        fill
        className="object-cover webgl-float-fallback"
        priority={false}
        sizes="100vw"
      />
    </div>
  );
}

// ─── Main Export (lazy-loaded via next/dynamic in hero-section.tsx) ───────────

export function HeroWebGL() {
  const isMobile = useIsMobile();

  // Intersection observer — suspend Canvas when not in viewport
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { margin: "200px 0px 200px 0px" });

  // Adaptive DPR range — start conservative, let PerformanceMonitor adjust
  const [dpr, setDpr] = useState<[number, number]>([0.75, 1.5]);

  // FPS fallback — only monitor when the canvas is actually mounted
  const shouldFallback = useWebGLFallback(isInView);

  const handleDecline = useCallback(() => {
    // GPU struggling → clamp max DPR downward
    // Uses functional setDpr to always read latest state — no stale closure
    setDpr(([min, max]) => [min, Math.max(0.5, max - 0.25)]);
  }, []);

  const handleIncline = useCallback(() => {
    // GPU has headroom → allow slightly higher DPR, cap at 1.5
    setDpr(([min, max]) => [min, Math.min(1.5, max + 0.1)]);
  }, []);

  // If FPS monitor triggered a fallback, render the CSS float animation instead
  if (shouldFallback) {
    return <CSSFallback />;
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none opacity-50"
      aria-hidden="true"
    >
      {/*
       * Only mount the Canvas when the section is visible.
       * When isInView flips to false (user scrolled away), React unmounts the
       * Canvas and THREE.WebGLRenderer.dispose() is called automatically,
       * freeing the GPU context, VRAM, and stopping the render loop entirely.
       */}
      {isInView && (
        <Canvas
          dpr={dpr}
          camera={{ position: [0, 0, 5], fov: 35 }}
          gl={{
            antialias: !isMobile,     // Disable on mobile — single biggest GPU win
            powerPreference: "high-performance",
            depth: true,
            stencil: false,           // We don't use stencil — always disable
            alpha: true,
          }}
          shadows={false}             // No real-time shadows — ContactShadows bakes them
        >
          <PerformanceMonitor
            onDecline={handleDecline}
            onIncline={handleIncline}
            flipflops={3}             // Tolerate 3 flip-flops before settling
            threshold={0.9}           // Target 90% of frame budget
          >
            <Suspense fallback={null}>
              <WebGLScene isMobile={isMobile} />
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
