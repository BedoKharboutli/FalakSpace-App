import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Text } from '@react-three/drei';
import { Vector3 } from 'three';
import Planet3D from './Planet3D';
import Sun3D from './Sun3D';
import PlanetInfoPanel from './PlanetInfoPanel';
import SpaceControls from './SpaceControls';
import DynamicStarfield from './DynamicStarfield';
import EnhancedSpaceControls from './EnhancedSpaceControls';
import MotionSettingsPanel, { MotionSettings } from './MotionSettings';
import { planetData } from '../data/planetData';
import { Button } from '@/components/ui/button';
import { Settings, Navigation as NavigationIcon } from 'lucide-react';

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
  const [showMotionSettings, setShowMotionSettings] = useState(false);
  const [motionSettings, setMotionSettings] = useState<MotionSettings>({
    reduceMotion: false,
    disableParallax: false,
    disableTwinkle: false,
    animationSpeed: 1.0,
    enableSmoothTransitions: true,
    starfieldDensity: 1.0
  });
  const [navigationMode, setNavigationMode] = useState<'orbit' | 'free'>('orbit');

  const handlePlanetClick = (planetId: string, position: Vector3) => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    onPlanetSelect?.(planetId);

    // Enhanced smooth transition to planet
    if (controlsRef.current) {
      const distance = 8;
      const targetPosition = new Vector3(
        position.x + distance,
        position.y + distance * 0.6,
        position.z + distance
      );
      
      if (motionSettings.enableSmoothTransitions && controlsRef.current.smoothTransitionTo) {
        // Use smooth transition if available and enabled
        controlsRef.current.smoothTransitionTo(targetPosition, position, 1500 / motionSettings.animationSpeed);
        setTimeout(() => setIsTransitioning(false), 1500 / motionSettings.animationSpeed);
      } else {
        // Fallback to instant movement
        controlsRef.current.enableDamping = false;
        controlsRef.current.target.copy(position);
        controlsRef.current.object.position.copy(targetPosition);
        controlsRef.current.update();
        
        setTimeout(() => {
          if (controlsRef.current) {
            controlsRef.current.enableDamping = true;
          }
          setIsTransitioning(false);
        }, 100);
      }
    }
  };

  const handleBackToOverview = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    onPlanetSelect?.(null);

    // Enhanced smooth transition back to overview
    if (controlsRef.current) {
      const overviewPosition = new Vector3(50, 30, 50);
      const overviewTarget = new Vector3(0, 0, 0);
      
      if (motionSettings.enableSmoothTransitions && controlsRef.current.smoothTransitionTo) {
        controlsRef.current.smoothTransitionTo(overviewPosition, overviewTarget, 1500 / motionSettings.animationSpeed);
        setTimeout(() => setIsTransitioning(false), 1500 / motionSettings.animationSpeed);
      } else {
        controlsRef.current.enableDamping = false;
        controlsRef.current.target.copy(overviewTarget);
        controlsRef.current.object.position.copy(overviewPosition);
        controlsRef.current.update();
        
        setTimeout(() => {
          if (controlsRef.current) {
            controlsRef.current.enableDamping = true;
          }
          setIsTransitioning(false);
        }, 100);
      }
    }
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

  // Handle camera movement callback
  const handleCameraMove = (position: Vector3, target: Vector3) => {
    setCameraTarget(target);
  };

  // Handle motion settings changes
  const handleMotionSettingsChange = (newSettings: MotionSettings) => {
    setMotionSettings(newSettings);
  };

  // Toggle navigation mode
  const toggleNavigationMode = () => {
    setNavigationMode(prev => prev === 'orbit' ? 'free' : 'orbit');
  };

  // Add keyboard navigation for ESC key
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleBackToOverview();
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

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

        {/* Enhanced Dynamic Starfield */}
        <DynamicStarfield
          count={Math.round(1500 * motionSettings.starfieldDensity)}
          radius={400}
          depth={120}
          speed={0.0005 * motionSettings.animationSpeed}
          enableTwinkle={!motionSettings.disableTwinkle && !motionSettings.reduceMotion}
          enableParallax={!motionSettings.disableParallax && !motionSettings.reduceMotion}
        />

            {/* Professional Realistic Sun */}
            <Sun3D position={[0, 0, 0]} scale={1} />

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
          zoomSpeed={0.8}
          panSpeed={1.0}
          rotateSpeed={0.5}
          minDistance={10}
          maxDistance={300}
          enableDamping={true}
          dampingFactor={0.05}
          makeDefault
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


      {/* Enhanced Instructions */}
      <div className="absolute bottom-4 left-4 glass-card p-4 max-w-sm">
        <h3 className="font-orbitron font-bold text-sm mb-2 text-primary">Navigation</h3>
        <div className="text-xs text-muted-foreground space-y-1">
          <p>• Mouse: Click & drag to rotate, scroll to zoom</p>
          {navigationMode === 'free' && (
            <p>• Keys: WASD/Arrow keys for free movement, Space/Shift for up/down</p>
          )}
          <p>• Click planets to explore details</p>
          <p>• Touch: Pinch to zoom, drag to rotate</p>
          <p>• ESC to return to overview</p>
        </div>
        
        {/* Visual Status Indicators */}
        <div className="mt-3 pt-2 border-t border-white/10">
          <div className="flex items-center justify-between text-xs">
            <span>Mode:</span>
            <span className={`px-2 py-1 rounded text-xs ${
              navigationMode === 'free' 
                ? 'bg-primary/20 text-primary' 
                : 'bg-muted/20 text-muted-foreground'
            }`}>
              {navigationMode === 'orbit' ? 'Orbit' : 'Free Flight'}
            </span>
          </div>
          {motionSettings.reduceMotion && (
            <div className="flex items-center justify-between text-xs mt-1">
              <span>Motion:</span>
              <span className="px-2 py-1 rounded text-xs bg-green-500/20 text-green-400">
                Reduced
              </span>
            </div>
          )}
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

      {/* Motion Settings Panel */}
      <MotionSettingsPanel
        isOpen={showMotionSettings}
        onClose={() => setShowMotionSettings(false)}
        onSettingsChange={handleMotionSettingsChange}
      />
   </>
  );
};

export default SpaceScene;