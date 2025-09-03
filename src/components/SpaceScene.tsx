import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Text } from '@react-three/drei';
import { Vector3 } from 'three';
import Planet3D from './Planet3D';
import PlanetInfoPanel from './PlanetInfoPanel';
import SpaceControls from './SpaceControls';
import { planetData } from '../data/planetData';

interface SpaceSceneProps {
  onPlanetSelect?: (planetId: string | null) => void;
  selectedPlanet?: string | null;
  favoritePlanets?: string[];
  onToggleFavorite?: (planetId: string) => void;
}

const SpaceScene: React.FC<SpaceSceneProps> = ({
  onPlanetSelect,
  selectedPlanet,
  favoritePlanets = [],
  onToggleFavorite
}) => {
  const controlsRef = useRef<any>();
  const [cameraTarget, setCameraTarget] = useState(new Vector3(0, 0, 0));
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handlePlanetClick = (planetId: string, position: Vector3) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    onPlanetSelect?.(planetId);
    
    // Smoothly move camera to planet
    if (controlsRef.current) {
      controlsRef.current.target.copy(position);
      controlsRef.current.object.position.set(
        position.x + 15,
        position.y + 10,
        position.z + 15
      );
      controlsRef.current.update();
    }

    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const handleBackToOverview = () => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    onPlanetSelect?.(null);
    
    // Return to overview position
    if (controlsRef.current) {
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.object.position.set(50, 30, 50);
      controlsRef.current.update();
    }

    setTimeout(() => setIsTransitioning(false), 1000);
  };

  const focusOnPlanet = (planetId: string) => {
    const planet = planetData.find(p => p.id === planetId);
    if (planet && planet.position) {
      handlePlanetClick(planetId, new Vector3(...planet.position));
    }
  };

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (isTransitioning || !controlsRef.current) return;

      const moveDistance = 5;
      const position = controlsRef.current.object.position;
      const target = controlsRef.current.target;

      switch (e.key.toLowerCase()) {
        case 'arrowup':
        case 'w':
          position.z -= moveDistance;
          target.z -= moveDistance;
          break;
        case 'arrowdown':
        case 's':
          position.z += moveDistance;
          target.z += moveDistance;
          break;
        case 'arrowleft':
        case 'a':
          position.x -= moveDistance;
          target.x -= moveDistance;
          break;
        case 'arrowright':
        case 'd':
          position.x += moveDistance;
          target.x += moveDistance;
          break;
        case 'escape':
          handleBackToOverview();
          break;
      }
      
      controlsRef.current.update();
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isTransitioning]);

  return (
    <div className="relative w-full h-screen bg-black">
                <Canvas
            camera={{ position: [50, 30, 50], fov: 60 }}
            onCreated={({ camera, gl }) => {
              camera.lookAt(0, 0, 0);
              gl.setClearColor('#000011'); // Deep space color
              gl.shadowMap.enabled = true;
              gl.shadowMap.type = 2; // PCFSoftShadowMap
            }}
          >
            {/* Enhanced Lighting */}
            <ambientLight intensity={0.15} color="#112244" />
            
            {/* Sun Light */}
            <pointLight 
              position={[0, 0, 0]} 
              intensity={2} 
              color="#FFFF99" 
              distance={100}
              decay={2}
              castShadow
              shadow-mapSize={[2048, 2048]}
              shadow-camera-near={0.1}
              shadow-camera-far={200}
            />
            
            {/* Additional directional light for better illumination */}
            <directionalLight
              position={[50, 50, 50]}
              intensity={0.3}
              color="#FFFFFF"
              castShadow
              shadow-mapSize={[1024, 1024]}
              shadow-camera-left={-50}
              shadow-camera-right={50}
              shadow-camera-top={50}
              shadow-camera-bottom={-50}
            />

        {/* Stars Background */}
        <Stars 
          radius={300} 
          depth={50} 
          count={5000} 
          factor={4} 
          saturation={0} 
          fade={true}
        />

                    {/* Enhanced Sun */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[2.5, 64, 64]} />
              <meshStandardMaterial 
                color="#FFDD44" 
                emissive="#FF8800"
                emissiveIntensity={0.8}
                transparent
                opacity={0.9}
              />
            </mesh>
            
            {/* Sun Corona Effect */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[3.2, 32, 32]} />
              <meshBasicMaterial 
                color="#FFAA00" 
                transparent 
                opacity={0.15}
              />
            </mesh>

            {/* Sun Label */}
            <Text
              position={[0, -5, 0]}
              fontSize={1.2}
              color="#FFD700"
              anchorX="center"
              anchorY="middle"
              outlineWidth={0.1}
              outlineColor="#000000"
            >
              Sun
            </Text>

        {/* Planets */}
        {planetData.map((planet) => (
          <Planet3D
            key={planet.id}
            planet={planet}
            onClick={handlePlanetClick}
            isSelected={selectedPlanet === planet.id}
            isFavorited={favoritePlanets.includes(planet.id)}
          />
        ))}

        {/* Orbit Controls */}
        <OrbitControls
          ref={controlsRef}
          enablePan={true}
          enableZoom={true}
          enableRotate={true}
          zoomSpeed={0.6}
          panSpeed={0.8}
          rotateSpeed={0.4}
          minDistance={10}
          maxDistance={200}
          enableDamping={true}
          dampingFactor={0.05}
        />
      </Canvas>

      {/* UI Overlays */}
      <SpaceControls 
        onBackToOverview={handleBackToOverview}
        onFocusPlanet={focusOnPlanet}
        selectedPlanet={selectedPlanet}
        isTransitioning={isTransitioning}
      />

      {/* Planet Info Panel */}
      {selectedPlanet && (
        <PlanetInfoPanel
          planetId={selectedPlanet}
          onClose={() => onPlanetSelect?.(null)}
        />
      )}

      {/* Instructions */}
      <div className="absolute bottom-4 left-4 glass-card p-4 max-w-sm">
        <h3 className="font-orbitron font-bold text-sm mb-2 text-primary">Navigation</h3>
        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Mouse: Click & drag to rotate, scroll to zoom</p>
          <p>• Keys: WASD or Arrow keys to move</p>
          <p>• Click planets to explore details</p>
          <p>• ESC to return to overview</p>
        </div>
      </div>
    </div>
  );
};

export default SpaceScene;