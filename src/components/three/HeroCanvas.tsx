"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Stars } from "@react-three/drei";
import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";

function GalaxyBackground() {
  const geometry = useMemo(() => {
    const geom = new THREE.BufferGeometry();
    const count = 1500;
    
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);
    const sizes = new Float32Array(count);
    
    for (let i = 0; i < count; i++) {
      const radius = 15 + Math.random() * 35;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      
      positions[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = radius * Math.cos(phi);
      
      colors[i * 3] = 0.4 + Math.random() * 0.6;
      colors[i * 3 + 1] = 0.1 + Math.random() * 0.4;
      colors[i * 3 + 2] = 0.7 + Math.random() * 0.3;
      
      sizes[i] = Math.random() * 2 + 0.5;
    }
    
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geom.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    
    return geom;
  }, []);
  
  const material = useMemo(() => 
    new THREE.PointsMaterial({
      vertexColors: true,
      transparent: true,
      sizeAttenuation: true,
      size: 1.5,
      opacity: 0.6,
    }), []);

  const ref = useRef<THREE.Points>(null);
  useFrame((_, dt) => {
    if (ref.current) {
      ref.current.rotation.y += dt * 0.02;
      ref.current.rotation.x += dt * 0.01;
    }
  });

  return (
    <points ref={ref}>
      <primitive object={geometry} attach="geometry" />
      <primitive object={material} attach="material" />
    </points>
  );
}

function FloatingOrbs() {
  const refs = useRef<THREE.Mesh[]>([]);
  useFrame((_, dt) => {
    refs.current.forEach((mesh, i) => {
      if (mesh) {
        mesh.rotation.y += dt * (0.1 + i * 0.05);
        mesh.rotation.x += dt * (0.05 + i * 0.03);
        mesh.position.y += Math.sin(performance.now() * 0.001 + i) * dt * 0.5;
      }
    });
  });

  return (
    <group>
      <mesh ref={(el) => { if (el) refs.current[0] = el; }} position={[-4, 2, -5]}>
        <sphereGeometry args={[1.5, 24, 24]} />
        <meshStandardMaterial
          color="#7C3AED"
          transparent
          opacity={0.15}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
      <mesh ref={(el) => { if (el) refs.current[1] = el; }} position={[4, -1, -6]}>
        <sphereGeometry args={[1, 24, 24]} />
        <meshStandardMaterial
          color="#8B5CF6"
          transparent
          opacity={0.1}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
      <mesh ref={(el) => { if (el) refs.current[2] = el; }} position={[-2, -3, -4]}>
        <torusGeometry args={[0.8, 0.3, 12, 24]} />
        <meshStandardMaterial
          color="#A855F7"
          transparent
          opacity={0.15}
          roughness={0.3}
          metalness={0.1}
        />
      </mesh>
    </group>
  );
}

function HeroCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 15], fov: 50 }}
      style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      gl={{ antialias: false, alpha: true, preserveDrawingBuffer: false, powerPreference: "high-performance" }}
      shadows={false}
    >
      <color attach="background" args={["#08080B"]} />
      <fog attach="fog" args={["#08080B", 10, 50]} />
      
      <ambientLight intensity={0.4} color="#ffffff" />
      <directionalLight position={[5, 10, 7]} intensity={0.8} color="#7C3AED" />
      <directionalLight position={[-5, -5, -5]} intensity={0.4} color="#8B5CF6" />
      
      <Stars radius={80} depth={40} count={1000} factor={4} saturation={0} />
      
      <Suspense fallback={null}>
        <GalaxyBackground />
        <FloatingOrbs />
      </Suspense>
    </Canvas>
  );
}

export function HeroThreeJS() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <HeroCanvas />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--primary)_0%,_transparent_70%)] opacity-20" />
    </div>
  );
}