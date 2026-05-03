"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Float, 
  ContactShadows, 
  Preload, 
  AdaptiveDpr, 
  AdaptiveEvents 
} from "@react-three/drei";
import * as THREE from "three";
import { useScroll } from "framer-motion";

function WebGLScene() {
  const { scrollYProgress } = useScroll();
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      const scrollVal = scrollYProgress.get();
      // Ultra-efficient lerping
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, scrollVal * 1.2, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, scrollVal * Math.PI * 0.4, 0.03);
    }
  });

  return (
    <>
      <group ref={groupRef}>
        {/* Optimized Bottle - Using Standard Material for max FPS */}
        <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.8} position={[1.1, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.45, 0.45, 1.8, 16]} /> {/* Lower polygon count */}
            <meshStandardMaterial 
              color="#d4f3e1" 
              transparent 
              opacity={0.6} 
              roughness={0.1} 
              metalness={0.2} 
            />
          </mesh>
          <mesh position={[0, 1, 0]}>
            <cylinderGeometry args={[0.46, 0.46, 0.15, 16]} />
            <meshStandardMaterial color="#8c6f2c" metalness={0.5} roughness={0.4} />
          </mesh>
        </Float>

        {/* Optimized Jar */}
        <Float speed={0.8} rotationIntensity={0.4} floatIntensity={0.8} position={[-1.1, -0.4, 0.5]}>
          <mesh>
            <cylinderGeometry args={[0.7, 0.7, 0.9, 16]} />
            <meshStandardMaterial 
              color="#1f4634" 
              transparent 
              opacity={0.8} 
              roughness={0.3} 
              metalness={0.1} 
            />
          </mesh>
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.72, 0.72, 0.12, 16]} />
            <meshStandardMaterial color="#8c6f2c" metalness={0.5} roughness={0.4} />
          </mesh>
        </Float>
      </group>

      <ContactShadows position={[0, -2, 0]} opacity={0.25} scale={6} blur={2.5} far={3} />
      
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} intensity={0.5} />
    </>
  );
}

export function HeroWebGL() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-50">
      <Canvas 
        dpr={1} // Force 1x pixel ratio for maximum stability
        camera={{ position: [0, 0, 5], fov: 35 }}
        gl={{ 
          antialias: false,
          powerPreference: "high-performance",
          depth: false, // Save memory
          stencil: false,
          alpha: true 
        }}
      >
        <Suspense fallback={null}>
          <WebGLScene />
          <Preload all />
          <AdaptiveDpr pixelated />
          <AdaptiveEvents />
        </Suspense>
      </Canvas>
    </div>
  );
}
