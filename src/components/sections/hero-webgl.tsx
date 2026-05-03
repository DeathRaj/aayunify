"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial, ContactShadows } from "@react-three/drei";
import * as THREE from "three";
import { useScroll } from "framer-motion";

function WebGLScene() {
  const { scrollYProgress } = useScroll();
  const groupRef = useRef<THREE.Group>(null);

  // Scroll scrubbing for Z-axis and subtle rotation
  useFrame(() => {
    if (groupRef.current) {
      // Map scroll progress (0 to 1) to rotation and position
      const scrollVal = scrollYProgress.get();
      groupRef.current.position.y = THREE.MathUtils.lerp(groupRef.current.position.y, scrollVal * 2, 0.1);
      groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, scrollVal * Math.PI, 0.05);
      groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, scrollVal * 0.5, 0.05);
    }
  });

  return (
    <>
      <Environment preset="city" />
      
      <group ref={groupRef}>
        {/* Main "Bottle" Placeholder */}
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5} position={[1, 0, 0]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.5, 0.5, 2, 32]} />
            <MeshTransmissionMaterial 
              backside 
              samples={4} 
              thickness={0.5} 
              chromaticAberration={0.05} 
              anisotropy={0.1} 
              distortion={0.1} 
              distortionScale={0.3} 
              temporalDistortion={0.1} 
              color="#c8ebd8" 
            />
          </mesh>
          {/* Cap */}
          <mesh position={[0, 1.1, 0]}>
            <cylinderGeometry args={[0.51, 0.51, 0.2, 32]} />
            <meshStandardMaterial color="#8c6f2c" metalness={0.8} roughness={0.2} />
          </mesh>
        </Float>

        {/* Secondary "Jar" Placeholder */}
        <Float speed={1.5} rotationIntensity={1} floatIntensity={2} position={[-1.5, -0.5, 1]}>
          <mesh castShadow receiveShadow>
            <cylinderGeometry args={[0.8, 0.8, 1, 32]} />
            <MeshTransmissionMaterial 
              backside 
              samples={4} 
              thickness={0.8} 
              chromaticAberration={0.1} 
              color="#1f4634" 
            />
          </mesh>
          {/* Cap */}
          <mesh position={[0, 0.55, 0]}>
            <cylinderGeometry args={[0.82, 0.82, 0.15, 32]} />
            <meshStandardMaterial color="#8c6f2c" metalness={0.8} roughness={0.2} />
          </mesh>
        </Float>

        {/* Floating particles/icons */}
        <Float speed={3} rotationIntensity={2} floatIntensity={3} position={[0, 1.5, -1]}>
          <mesh>
            <octahedronGeometry args={[0.2]} />
            <meshStandardMaterial color="#c9a24d" metalness={1} roughness={0.1} />
          </mesh>
        </Float>
        <Float speed={2.5} rotationIntensity={2} floatIntensity={2} position={[2, -1, 0.5]}>
          <mesh>
            <tetrahedronGeometry args={[0.15]} />
            <meshStandardMaterial color="#c9a24d" metalness={1} roughness={0.1} />
          </mesh>
        </Float>
      </group>

      <ContactShadows position={[0, -2.5, 0]} opacity={0.4} scale={10} blur={2} far={4} />
      
      {/* Soft studio lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <spotLight position={[-10, 10, -5]} intensity={0.8} color="#c8ebd8" />
    </>
  );
}

export function HeroWebGL() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none">
      <Canvas shadows camera={{ position: [0, 0, 6], fov: 45 }}>
        <WebGLScene />
      </Canvas>
    </div>
  );
}
