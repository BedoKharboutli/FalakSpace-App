import React, { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointMaterial } from '@react-three/drei';
import * as THREE from 'three';

interface DynamicStarfieldProps {
  count?: number;
  radius?: number;
  depth?: number;
  speed?: number;
  enableTwinkle?: boolean;
  enableParallax?: boolean;
}

const DynamicStarfield: React.FC<DynamicStarfieldProps> = ({
  count = 1500,
  radius = 400,
  depth = 100,
  speed = 0.0005,
  enableTwinkle = true,
  enableParallax = true
}) => {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.PointsMaterial>(null);
  const timeRef = useRef(0);

  // Create multiple layers of stars for depth
  const starLayers = useMemo(() => {
    const layers = [];
    const layerCount = 4;
    
    for (let layer = 0; layer < layerCount; layer++) {
      const layerStars = count / layerCount;
      const positions = new Float32Array(layerStars * 3);
      const colors = new Float32Array(layerStars * 3);
      const sizes = new Float32Array(layerStars);
      const twinklePhases = new Float32Array(layerStars);
      
      const layerRadius = radius * (0.3 + layer * 0.25);
      const layerDepth = depth * (0.5 + layer * 0.5);
      
      for (let i = 0; i < layerStars; i++) {
        const i3 = i * 3;
        
        // Spherical distribution with some clustering
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        const r = layerRadius * (0.7 + Math.random() * 0.3);
        
        positions[i3] = r * Math.sin(phi) * Math.cos(theta);
        positions[i3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        positions[i3 + 2] = r * Math.cos(phi) * (Math.random() - 0.5) * layerDepth;
        
        // Star colors - mix of white, blue, and warm tones
        const starType = Math.random();
        if (starType < 0.6) {
          // White stars
          colors[i3] = 0.9 + Math.random() * 0.1;
          colors[i3 + 1] = 0.9 + Math.random() * 0.1;
          colors[i3 + 2] = 1.0;
        } else if (starType < 0.8) {
          // Blue-white stars
          colors[i3] = 0.7 + Math.random() * 0.2;
          colors[i3 + 1] = 0.8 + Math.random() * 0.2;
          colors[i3 + 2] = 1.0;
        } else {
          // Warm yellow-orange stars
          colors[i3] = 1.0;
          colors[i3 + 1] = 0.8 + Math.random() * 0.2;
          colors[i3 + 2] = 0.6 + Math.random() * 0.3;
        }
        
        // Size based on distance and brightness
        const distance = Math.sqrt(positions[i3] ** 2 + positions[i3 + 1] ** 2 + positions[i3 + 2] ** 2);
        const brightness = 1 - (distance / (layerRadius * 1.2));
        sizes[i] = Math.max(0.5, brightness * (2 + Math.random() * 2)) * (layer === 0 ? 1.5 : 1);
        
        // Random twinkle phase
        twinklePhases[i] = Math.random() * Math.PI * 2;
      }
      
      layers.push({
        positions,
        colors,
        sizes,
        twinklePhases,
        speed: speed * (1 + layer * 0.3),
        opacity: 0.6 + layer * 0.1
      });
    }
    
    return layers;
  }, [count, radius, depth, speed]);

  useFrame((state, delta) => {
    if (!enableTwinkle && !enableParallax) return;
    
    timeRef.current += delta;
    
    starLayers.forEach((layer, layerIndex) => {
      const points = pointsRef.current?.children[layerIndex] as THREE.Points;
      if (!points) return;
      
      const geometry = points.geometry as THREE.BufferGeometry;
      const material = points.material as THREE.PointsMaterial;
      
      if (enableTwinkle) {
        // Update twinkle effect
        const sizes = geometry.attributes.size.array as Float32Array;
        const originalSizes = layer.sizes;
        
        for (let i = 0; i < sizes.length; i++) {
          const phase = layer.twinklePhases[i];
          const twinkle = 0.7 + 0.3 * Math.sin(timeRef.current * 2 + phase);
          sizes[i] = originalSizes[i] * twinkle;
        }
        
        geometry.attributes.size.needsUpdate = true;
      }
      
      if (enableParallax) {
        // Subtle parallax movement based on camera position
        const camera = state.camera;
        const parallaxStrength = 0.02 * (layerIndex + 1);
        
        points.position.x = -camera.position.x * parallaxStrength;
        points.position.y = -camera.position.y * parallaxStrength;
        points.position.z = -camera.position.z * parallaxStrength * 0.5;
      }
    });
  });

  return (
    <group ref={pointsRef}>
      {starLayers.map((layer, index) => (
        <points key={index}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={layer.positions.length / 3}
              array={layer.positions}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-color"
              count={layer.colors.length / 3}
              array={layer.colors}
              itemSize={3}
            />
            <bufferAttribute
              attach="attributes-size"
              count={layer.sizes.length}
              array={layer.sizes}
              itemSize={1}
            />
          </bufferGeometry>
          <pointsMaterial
            size={1}
            sizeAttenuation={true}
            vertexColors={true}
            transparent={true}
            opacity={layer.opacity}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </points>
      ))}
    </group>
  );
};

export default DynamicStarfield;