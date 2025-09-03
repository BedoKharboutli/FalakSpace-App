import React, { useRef, useState, useMemo } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { TextureLoader, Vector3, Color } from 'three';
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
  const atmosphereRef = useRef<any>();
  const [hovered, setHovered] = useState(false);
  
  // Load texture if available
  let texture;
  try {
    if (planet.textureUrl) {
      texture = useLoader(TextureLoader, planet.textureUrl);
      console.log(`Loading texture for ${planet.name}:`, planet.textureUrl);
    }
  } catch (error) {
    // Fallback to color if texture fails to load
    console.warn(`Failed to load texture for ${planet.name}:`, error);
    console.warn('Texture URL:', planet.textureUrl);
    texture = null;
  }

  // Enhanced planet-specific properties
  const planetProperties: {
    hasAtmosphere?: boolean;
    atmosphereColor?: Color;
    atmosphereOpacity?: number;
    emissiveIntensity: number;
    shininess: number;
    hasRings?: boolean;
  } = useMemo(() => {
    switch (planet.id) {
      case 'earth':
        return {
          hasAtmosphere: true,
          atmosphereColor: new Color(0.5, 0.8, 1.0),
          atmosphereOpacity: 0.15,
          emissiveIntensity: 0.05,
          shininess: 30
        };
      case 'venus':
        return {
          hasAtmosphere: true,
          atmosphereColor: new Color(1.0, 0.9, 0.3),
          atmosphereOpacity: 0.3,
          emissiveIntensity: 0.1,
          shininess: 100
        };
      case 'mars':
        return {
          hasAtmosphere: true,
          atmosphereColor: new Color(0.8, 0.4, 0.2),
          atmosphereOpacity: 0.05,
          emissiveIntensity: 0.02,
          shininess: 10
        };
      case 'jupiter':
        return {
          hasAtmosphere: false,
          emissiveIntensity: 0.15,
          shininess: 5
        };
      case 'saturn':
        return {
          hasAtmosphere: false,
          emissiveIntensity: 0.1,
          shininess: 3,
          hasRings: true
        };
      case 'uranus':
        return {
          hasAtmosphere: true,
          atmosphereColor: new Color(0.3, 0.8, 0.9),
          atmosphereOpacity: 0.1,
          emissiveIntensity: 0.05,
          shininess: 2
        };
      case 'neptune':
        return {
          hasAtmosphere: true,
          atmosphereColor: new Color(0.2, 0.4, 0.9),
          atmosphereOpacity: 0.08,
          emissiveIntensity: 0.05,
          shininess: 2
        };
      default:
        return {
          hasAtmosphere: false,
          emissiveIntensity: 0.02,
          shininess: 1
        };
    }
  }, [planet.id]);

  // Animation for planet rotation and orbit
  useFrame((state, delta) => {
    if (meshRef.current) {
      // Planet rotation - different speeds for different planets
      const rotationSpeed = planet.id === 'jupiter' ? 2.0 : 0.5;
      meshRef.current.rotation.y += delta * rotationSpeed;
      
      // Atmosphere rotation (slightly different speed)
      if (atmosphereRef.current) {
        atmosphereRef.current.rotation.y += delta * rotationSpeed * 0.9;
      }
      
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
          castShadow
          receiveShadow
        >
          <sphereGeometry args={[1, 64, 64]} />
          <meshPhongMaterial 
            color={texture ? '#FFFFFF' : planet.color}
            map={texture}
            transparent={hovered || isSelected}
            opacity={hovered || isSelected ? 0.95 : 1.0}
            emissive={isSelected ? planet.color : '#000000'}
            emissiveIntensity={isSelected ? 0.3 : planetProperties.emissiveIntensity}
            shininess={planetProperties.shininess}
            specular={planet.id === 'earth' ? '#4488AA' : '#333333'}
          />
        </mesh>

        {/* Atmosphere */}
        {planetProperties.hasAtmosphere && (
          <mesh
            ref={atmosphereRef}
            scale={isSelected ? planet.size * 1.25 : planet.size * 1.05}
          >
            <sphereGeometry args={[1, 32, 32]} />
            <meshPhongMaterial 
              color={planetProperties.atmosphereColor}
              transparent
              opacity={planetProperties.atmosphereOpacity}
              side={2} // DoubleSide
            />
          </mesh>
        )}

        {/* Saturn's Rings */}
        {planetProperties.hasRings && (
          <>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[planet.size * 1.5, planet.size * 2.5, 64]} />
              <meshPhongMaterial 
                color="#C4A571" 
                transparent 
                opacity={0.7}
                side={2} // DoubleSide
              />
            </mesh>
            <mesh rotation={[Math.PI / 2, 0, 0]}>
              <ringGeometry args={[planet.size * 2.6, planet.size * 3.0, 64]} />
              <meshPhongMaterial 
                color="#D4B681" 
                transparent 
                opacity={0.5}
                side={2} // DoubleSide
              />
            </mesh>
          </>
        )}

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