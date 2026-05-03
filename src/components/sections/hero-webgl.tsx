"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial, ContactShadows, Preload } from "@react-three/drei";
import * as THREE from "three";
import { useScroll } from "framer-motion";

function WebGLScene() {
  const { scrollYProgress } = useScroll();
  const groupRef = useRef<THREE.Group>(null);

  // Optimized animation loop
  useFrame((state, delta) => {
    if (groupRef.current) {
      const scrollVal = scrollYProgress.get();
      // Smoother lerping with lower values
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, scrollVal * 1.5, 0.05);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, scrollVal * Math.PI * 0.5, 0.03);
    }
  });

  return (
    <>
      <Environment preset="city" />
      
      <group ref={groupRef}>
        {/* Optimized Bottle */}
        <Float speed={1.5} rotationIntensity={0.3} floatIntensity={1} position={[1.2, 0, 0]}>
          <mesh>
            <cylinderGeometry args={[0.45, 0.45, 1.8, 24]} />
            <MeshTransmissionMaterial 
              backside 
              samples={2} // Reduced samples for performance
              thickness={0.2} 
              chromaticAberration={0.02} 
              anisotropy={0} 
              distortion={0} 
              color="#d4f3e1" 
              roughness={0.1}
            />
          </mesh>
          <mesh position={[0, 1, 0]}>
            <cylinderGeometry args={[0.46, 0.46, 0.15, 24]} />
            <meshStandardMaterial color="#8c6f2c" metalness={0.6} roughness={0.3} />
          </mesh>
        </Float>

        {/* Optimized Jar (Solid material is MUCH faster than transmission) */}
        <Float speed={1} rotationIntensity={0.5} floatIntensity={1} position={[-1.2, -0.4, 0.5]}>
          <mesh>
            <cylinderGeometry args={[0.7, 0.7, 0.9, 24]} />
            <meshStandardMaterial 
              color="#1f4634" 
              transparent 
              opacity={0.85} 
              roughness={0.2} 
              metalness={0.1} 
            />
          </mesh>
          <mesh position={[0, 0.5, 0]}>
            <cylinderGeometry args={[0.72, 0.72, 0.12, 24]} />
            <meshStandardMaterial color="#8c6f2c" metalness={0.6} roughness={0.3} />
          </mesh>
        </Float>

        {/* Simplifed Floating elements */}
        <Float speed={2} rotationIntensity={1} floatIntensity={2} position={[0, 1, -1.5]}>
          <mesh>
            <octahedronGeometry args={[0.15]} />
            <meshStandardMaterial color="#c9a24d" metalness={0.8} roughness={0.2} />
          </mesh>
        </Float>
      </group>

      <ContactShadows position={[0, -2, 0]} opacity={0.3} scale={8} blur={3} far={3} />
      
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
    </>
  );
}

export function HeroWebGL() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-60">
      <Canvas 
        dpr={[1, 1.5]} // Limit pixel ratio for mobile/low-end
        camera={{ position: [0, 0, 5], fov: 40 }}
        gl={{ 
          antialias: false, // Faster rendering
          powerPreference: "high-performance",
          alpha: true 
        }}
      >
        <Suspense fallback={null}>
          <WebGLScene />
          <Preload all />
        </Suspense>
      </Canvas>
    </div>
  );
}
