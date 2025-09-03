import React, { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader, Vector3 } from 'three';
import { Text } from '@react-three/drei';
import { planetData } from '../data/planetData';

interface Planet3DProps {
  planet: {
    id: string;
    name: string;
    position: [number, number, number];
    size: number;
    color: string;
    textureUrl?: string;
    orbitSpeed: number;
  };
  onClick: (planetId: string, position: Vector3) => void;
  isSelected?: boolean;
  isFavorited?: boolean;
}

const Planet3D: React.FC<Planet3DProps> = ({
  planet,
  onClick,
  isSelected = false,
  isFavorited = false
}) => {
  const meshRef = useRef<any>();
  const orbitRef = useRef<any>();
  const [hovered, setHovered] = useState(false);
  
  // Load texture if available
  let texture;
  try {
    if (planet.textureUrl) {
      texture = useLoader(TextureLoader, planet.textureUrl);
    }
  } catch (error) {
    // Fallback to color if texture fails to load
    texture = null;
  }

  // Animation for planet rotation and orbit
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Planet rotation
      meshRef.current.rotation.y += delta * 0.5;
      
      // Orbit animation
      if (orbitRef.current && planet.orbitSpeed > 0) {
        orbitRef.current.rotation.y += delta * planet.orbitSpeed * 0.1;
      }
    }
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    const worldPosition = new Vector3();
    meshRef.current?.getWorldPosition(worldPosition);
    onClick(planet.id, worldPosition);
  };

  const handlePointerEnter = () => setHovered(true);
  const handlePointerLeave = () => setHovered(false);

  return (
    <group ref={orbitRef}>
      <group position={planet.position}>
        {/* Planet Mesh */}
        <mesh
          ref={meshRef}
          onClick={handleClick}
          onPointerEnter={handlePointerEnter}
          onPointerLeave={handlePointerLeave}
          scale={isSelected ? planet.size * 1.2 : planet.size}
        >
          <sphereGeometry args={[1, 32, 32]} />
          <meshPhongMaterial 
            color={texture ? '#FFFFFF' : planet.color}
            map={texture}
            transparent={hovered || isSelected}
            opacity={hovered || isSelected ? 0.9 : 1.0}
            emissive={isSelected ? planet.color : '#000000'}
            emissiveIntensity={isSelected ? 0.2 : 0}
          />
        </mesh>

        {/* Selection Ring */}
        {isSelected && (
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry args={[planet.size * 1.5, planet.size * 1.7, 32]} />
            <meshBasicMaterial color="#00FFFF" transparent opacity={0.6} />
          </mesh>
        )}

        {/* Favorite Heart */}
        {isFavorited && (
          <Text
            position={[0, planet.size + 0.5, 0]}
            fontSize={0.5}
            color="#FF69B4"
            anchorX="center"
            anchorY="middle"
          >
            ♥
          </Text>
        )}

        {/* Planet Label */}
        <Text
          position={[0, -planet.size - 1, 0]}
          fontSize={hovered || isSelected ? 0.8 : 0.6}
          color={isSelected ? "#00FFFF" : hovered ? "#FFFFFF" : "#CCCCCC"}
          anchorX="center"
          anchorY="middle"
          outlineWidth={0.1}
          outlineColor="#000000"
        >
          {planet.name}
        </Text>

        {/* Hover Glow Effect */}
        {hovered && !isSelected && (
          <mesh>
            <sphereGeometry args={[planet.size * 1.1, 16, 16]} />
            <meshBasicMaterial 
              color={planet.color} 
              transparent 
              opacity={0.3}
            />
          </mesh>
        )}

        {/* Orbit Path */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[
            Math.sqrt(planet.position[0] ** 2 + planet.position[2] ** 2) - 0.1,
            Math.sqrt(planet.position[0] ** 2 + planet.position[2] ** 2) + 0.1,
            64
          ]} />
          <meshBasicMaterial 
            color="#444444" 
            transparent 
            opacity={hovered || isSelected ? 0.4 : 0.1} 
          />
        </mesh>
      </group>
    </group>
  );
};

export default Planet3D;