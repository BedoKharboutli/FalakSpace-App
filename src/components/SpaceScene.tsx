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

    // Center the planet in the camera view
    if (controlsRef.current) {
      // Disable damping temporarily for instant camera movement
      controlsRef.current.enableDamping = false;

      // Set camera target to planet position (centers the planet)
      controlsRef.current.target.copy(position);
      
      // Position camera at a good viewing distance and angle
      const distance = 8; // Closer distance for better planet viewing
      controlsRef.current.object.position.set(
        position.x + distance,
        position.y + distance * 0.6,
        position.z + distance
      );
      
      // Force immediate update
      controlsRef.current.update();

      // Re-enable damping after a short delay
      setTimeout(() => {
        if (controlsRef.current) {
          controlsRef.current.enableDamping = true;
        }
      }, 100);
    }

    // Increase timeout to allow for proper camera movement
    setTimeout(() => setIsTransitioning(false), 1500);
  };

  const handleBackToOverview = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    onPlanetSelect?.(null);

    // Return to overview position
    if (controlsRef.current) {
      // Disable damping temporarily for instant camera movement
      controlsRef.current.enableDamping = false;

      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.object.position.set(50, 30, 50);
      controlsRef.current.update();

      // Re-enable damping after a short delay
      setTimeout(() => {
        if (controlsRef.current) {
          controlsRef.current.enableDamping = true;
        }
      }, 100);
    }

    setTimeout(() => setIsTransitioning(false), 1500);
  };

  const focusOnPlanet = (planetId: string) => {
    console.log('Quick Planet Access: Focusing on planet:', planetId);
    const planet = planetData.find(p => p.id === planetId);
    if (planet && planet.position) {
      console.log('Planet found:', planet.name, 'at position:', planet.position);
      const positionVector = new Vector3(...planet.position);
      console.log('Position vector:', positionVector);
      handlePlanetClick(planetId, positionVector);
    } else {
      console.error('Planet not found or missing position:', planetId);
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
    <>
    <div className="relative w-full h-[65vh] bg-black">
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
            
            {/* Sun Light - More realistic color temperature */}
            <pointLight 
              position={[0, 0, 0]} 
              intensity={2.2} 
              color="#FFF8DC" 
              distance={120}
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

            {/* Realistic Sun with Multiple Layers */}
            
            {/* Sun Core - Brightest center */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[2.2, 64, 64]} />
              <meshBasicMaterial 
                color="#FFF5B7"
                transparent
                opacity={1.0}
              />
            </mesh>

            {/* Sun Surface - Main visible layer */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[2.5, 64, 64]} />
              <meshStandardMaterial 
                color="#FFD700"
                emissive="#FFA500"
                emissiveIntensity={0.6}
                roughness={1.0}
                metalness={0.0}
                transparent
                opacity={0.95}
              />
            </mesh>

            {/* Sun Chromosphere - Middle atmosphere layer */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[2.8, 48, 48]} />
              <meshBasicMaterial 
                color="#FF6B35"
                transparent 
                opacity={0.3}
                side={2}
              />
            </mesh>

            {/* Sun Corona - Outer atmosphere */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[3.5, 32, 32]} />
              <meshBasicMaterial 
                color="#FFE5B4"
                transparent 
                opacity={0.08}
                side={2}
              />
            </mesh>

            {/* Sun Solar Flares - Dynamic outer glow */}
            <mesh position={[0, 0, 0]}>
              <sphereGeometry args={[4.0, 24, 24]} />
              <meshBasicMaterial 
                color="#FFAA44"
                transparent 
                opacity={0.04}
                side={2}
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
      {/* Modern Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center group cursor-pointer transition-all duration-500 hover:scale-105">
        <div className="relative">
          {/* Outer Glow Ring */}
          <div className="absolute inset-0 w-20 h-20 border border-primary/20 rounded-full animate-pulse opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          
          
          {/* Central Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/20 backdrop-blur-sm rounded-full border border-white/10">
            <div className="text-[10px] font-orbitron font-bold text-transparent bg-gradient-to-r from-primary via-blue-400 to-purple-400 bg-clip-text animate-pulse tracking-wider">DISCOVER</div>
            <div className="flex space-x-1 mt-1">
              <div className="w-1 h-1 bg-gradient-to-r from-primary to-blue-400 rounded-full animate-bounce shadow-sm"></div>
              <div className="w-1 h-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-bounce shadow-sm" style={{animationDelay: '0.15s'}}></div>
              <div className="w-1 h-1 bg-gradient-to-r from-purple-400 to-primary rounded-full animate-bounce shadow-sm" style={{animationDelay: '0.3s'}}></div>
            </div>
          </div>
          
          {/* Enhanced Glow Effects */}
          <div className="absolute inset-0 bg-gradient-radial from-primary/10 via-transparent to-transparent rounded-full blur-xl group-hover:from-primary/20 transition-all duration-500"></div>
          <div className="absolute inset-0 bg-gradient-radial from-blue-400/5 via-transparent to-transparent rounded-full blur-2xl animate-pulse"></div>
        </div>
        
        {/* Enhanced Text Section */}
        <div className="mt-4 space-y-1 backdrop-blur-sm bg-black/20 rounded-lg px-3 py-2 border border-white/10 group-hover:border-primary/30 transition-all duration-300">
          <div className="text-xs font-orbitron font-bold text-transparent bg-gradient-to-r from-white via-primary to-blue-400 bg-clip-text group-hover:from-primary group-hover:via-blue-400 group-hover:to-purple-400 transition-all duration-300 tracking-wider">NASA MISSIONS</div>
          <div className="text-xs text-white/60 group-hover:text-white/80 transition-colors duration-300 font-medium">& SPACE DATA</div>
        </div>
        
        {/* Enhanced Animated Arrow */}
        <div className="mt-3 flex justify-center">
          <div className="relative">
            <svg 
              className="w-5 h-7 text-primary/80 group-hover:text-primary animate-bounce drop-shadow-lg group-hover:drop-shadow-xl transition-all duration-300" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
            {/* Arrow Glow */}
            <div className="absolute inset-0 w-5 h-7 blur-sm opacity-60 group-hover:opacity-100 transition-opacity duration-300">
              <svg 
                className="w-5 h-7 text-primary/40" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </div>
      </div>
   </>
  );
};

export default SpaceScene;