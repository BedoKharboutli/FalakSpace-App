import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Sphere, shaderMaterial } from '@react-three/drei';
import { extend } from '@react-three/fiber';
import * as THREE from 'three';

// Advanced Solar Surface Shader with realistic solar granulation
const SolarSurfaceShader = shaderMaterial(
  {
    time: 0,
    sunCore: new THREE.Color('#FFFFF0'), // Very hot white core
    sunSurface: new THREE.Color('#FFA500'), // Orange surface
    sunSpots: new THREE.Color('#8B4513'), // Dark sunspots
    sunFlares: new THREE.Color('#FF6347'), // Red flares
    granuleScale: 15.0,
    convectionScale: 5.0,
    temperature: 5778.0, // Sun's actual surface temperature in Kelvin
  },
  // Vertex shader
  `
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    
    void main() {
      vUv = uv;
      vPosition = position;
      vNormal = normalize(normalMatrix * normal);
      vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader with realistic solar physics
  `
    uniform float time;
    uniform vec3 sunCore;
    uniform vec3 sunSurface;
    uniform vec3 sunSpots;
    uniform vec3 sunFlares;
    uniform float granuleScale;
    uniform float convectionScale;
    uniform float temperature;
    
    varying vec2 vUv;
    varying vec3 vPosition;
    varying vec3 vNormal;
    varying vec3 vWorldPosition;
    
    // Improved noise functions for realistic solar granulation
    float hash(vec3 p) {
      p = fract(p * 0.3183099 + 0.1);
      p *= 17.0;
      return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
    }
    
    float noise(vec3 x) {
      vec3 i = floor(x);
      vec3 f = fract(x);
      f = f * f * (3.0 - 2.0 * f);
      return mix(mix(mix(hash(i + vec3(0,0,0)), 
                         hash(i + vec3(1,0,0)), f.x),
                     mix(hash(i + vec3(0,1,0)), 
                         hash(i + vec3(1,1,0)), f.x), f.y),
                 mix(mix(hash(i + vec3(0,0,1)), 
                         hash(i + vec3(1,0,1)), f.x),
                     mix(hash(i + vec3(0,1,1)), 
                         hash(i + vec3(1,1,1)), f.x), f.y), f.z);
    }
    
    float fbm(vec3 p) {
      float value = 0.0;
      float amplitude = 0.5;
      float frequency = 1.0;
      for(int i = 0; i < 6; i++) {
        value += amplitude * noise(p * frequency);
        frequency *= 2.0;
        amplitude *= 0.5;
      }
      return value;
    }
    
    // Solar granulation pattern
    float granulation(vec3 p, float t) {
      vec3 pos = p * granuleScale + vec3(t * 0.02, t * 0.015, t * 0.01);
      float base = fbm(pos);
      float detail = fbm(pos * 2.0) * 0.5;
      return smoothstep(0.3, 0.7, base + detail);
    }
    
    // Convection cells (larger scale movement)
    float convection(vec3 p, float t) {
      vec3 pos = p * convectionScale + vec3(t * 0.005, t * 0.003, t * 0.007);
      return fbm(pos);
    }
    
    // Sunspot generation
    float sunspots(vec3 p) {
      float spots = 0.0;
      // Create several sunspot regions
      for(int i = 0; i < 3; i++) {
        vec3 center = vec3(
          sin(float(i) * 2.1 + time * 0.1) * 0.8,
          cos(float(i) * 1.7 + time * 0.08) * 0.6,
          sin(float(i) * 3.3 + time * 0.12) * 0.4
        );
        float dist = length(p - center);
        spots += smoothstep(0.3, 0.1, dist) * (0.3 + 0.2 * sin(time + float(i)));
      }
      return clamp(spots, 0.0, 1.0);
    }
    
    // Solar flare activity
    float solarFlares(vec3 p, float t) {
      vec3 pos = p * 8.0 + vec3(t * 0.3, t * 0.2, t * 0.25);
      float flare = fbm(pos);
      flare = pow(flare, 3.0);
      flare *= sin(t * 2.0 + fbm(p * 20.0) * 10.0) * 0.5 + 0.5;
      return flare;
    }
    
    void main() {
      vec3 pos = normalize(vWorldPosition);
      float t = time;
      
      // Generate solar surface features
      float gran = granulation(pos, t);
      float conv = convection(pos, t);
      float spots = sunspots(pos);
      float flares = solarFlares(pos, t);
      
      // Fresnel effect for realistic edge lighting
      float fresnel = 1.0 - abs(dot(vNormal, normalize(-vWorldPosition)));
      fresnel = pow(fresnel, 1.5);
      
      // Temperature-based color mixing (black body radiation)
      float tempVariation = (gran * 0.3 + conv * 0.2 - spots * 0.8 + flares * 0.5);
      float effectiveTemp = temperature + tempVariation * 500.0;
      
      // Realistic solar color based on temperature
      vec3 baseColor = sunCore;
      if(effectiveTemp < 5000.0) {
        baseColor = mix(sunSpots, sunSurface, (effectiveTemp - 3000.0) / 2000.0);
      } else if(effectiveTemp < 6000.0) {
        baseColor = mix(sunSurface, sunCore, (effectiveTemp - 5000.0) / 1000.0);
      } else {
        baseColor = mix(sunCore, sunFlares, min((effectiveTemp - 6000.0) / 2000.0, 1.0));
      }
      
      // Apply granulation and convection effects
      vec3 color = baseColor;
      color = mix(color, sunSurface * 1.2, gran * 0.6);
      color = mix(color, sunCore * 0.8, conv * 0.3);
      
      // Apply sunspots (cooler, darker regions)
      color = mix(color, sunSpots, spots * 0.7);
      
      // Apply solar flares (hot, bright regions)
      color = mix(color, sunFlares * 2.0, flares * 0.4);
      
      // Enhanced rim lighting for solar corona effect
      color += sunFlares * fresnel * 0.8;
      
      // Add subtle atmospheric scattering effect
      float scattering = pow(1.0 - fresnel, 2.0);
      color = mix(color, sunCore * 1.5, scattering * 0.2);
      
      // Gamma correction for realistic appearance
      color = pow(color, vec3(0.8));
      
      gl_FragColor = vec4(color, 1.0);
    }
  `
);

// Enhanced Corona Shader with realistic solar wind simulation
const CoronaShader = shaderMaterial(
  {
    time: 0,
    coronaColor: new THREE.Color('#FFE5B4'),
    solarWindColor: new THREE.Color('#FFF8DC'),
    magneticField: new THREE.Color('#FF69B4'),
    intensity: 0.4,
    streamers: 1.0,
  },
  // Vertex shader
  `
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vWorldPosition;
    
    void main() {
      vUv = uv;
      vNormal = normalize(normalMatrix * normal);
      vPosition = position;
      vWorldPosition = (modelMatrix * vec4(position, 1.0)).xyz;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // Fragment shader with solar wind and magnetic field effects
  `
    uniform float time;
    uniform vec3 coronaColor;
    uniform vec3 solarWindColor;
    uniform vec3 magneticField;
    uniform float intensity;
    uniform float streamers;
    
    varying vec2 vUv;
    varying vec3 vNormal;
    varying vec3 vPosition;
    varying vec3 vWorldPosition;
    
    // Improved noise for corona effects
    float hash(vec3 p) {
      p = fract(p * 0.3183099 + 0.1);
      p *= 17.0;
      return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
    }
    
    float noise(vec3 x) {
      vec3 i = floor(x);
      vec3 f = fract(x);
      f = f * f * (3.0 - 2.0 * f);
      return mix(mix(mix(hash(i + vec3(0,0,0)), 
                         hash(i + vec3(1,0,0)), f.x),
                     mix(hash(i + vec3(0,1,0)), 
                         hash(i + vec3(1,1,0)), f.x), f.y),
                 mix(mix(hash(i + vec3(0,0,1)), 
                         hash(i + vec3(1,0,1)), f.x),
                     mix(hash(i + vec3(0,1,1)), 
                         hash(i + vec3(1,1,1)), f.x), f.y), f.z);
    }
    
    float fbm(vec3 p) {
      float value = 0.0;
      float amplitude = 0.5;
      for(int i = 0; i < 4; i++) {
        value += amplitude * noise(p);
        p *= 2.0;
        amplitude *= 0.5;
      }
      return value;
    }
    
    // Corona streamers (following magnetic field lines)
    float coronaStreamers(vec3 p, float t) {
      vec3 pos = normalize(p);
      float latitude = asin(pos.y);
      float longitude = atan(pos.z, pos.x);
      
      // Create streamer patterns based on solar magnetic field
      float streamerPattern = 0.0;
      for(int i = 0; i < 6; i++) {
        float angle = longitude + float(i) * 1.047; // 60 degree spacing
        float streamer = sin(angle * 2.0 + t * 0.1) * 0.5 + 0.5;
        streamer *= smoothstep(0.8, 0.2, abs(latitude)); // More prominent at equator
        streamerPattern += streamer;
      }
      
      return clamp(streamerPattern, 0.0, 1.0);
    }
    
    // Solar wind simulation
    float solarWind(vec3 p, float t) {
      vec3 windPos = p + vec3(t * 0.05, t * 0.03, t * 0.07);
      float wind = fbm(windPos * 3.0);
      wind *= fbm(windPos * 0.5) * 2.0; // Large scale variations
      return wind;
    }
    
    void main() {
      vec3 pos = normalize(vWorldPosition);
      float t = time;
      
      // Distance from sun center affects corona intensity
      float distance = length(vWorldPosition);
      float distanceFalloff = 1.0 / (distance * distance * 0.1 + 1.0);
      
      // Fresnel effect for corona visibility
      float fresnel = 1.0 - abs(dot(vNormal, normalize(-vWorldPosition)));
      fresnel = pow(fresnel, 0.8);
      
      // Corona streamers following magnetic field lines
      float streamers = coronaStreamers(pos, t);
      
      // Solar wind effect
      float wind = solarWind(pos, t);
      
      // Turbulence and plasma dynamics
      float turbulence = fbm(pos * 5.0 + vec3(t * 0.02, t * 0.015, t * 0.025));
      
      // Combine effects
      float coronaIntensity = fresnel * distanceFalloff;
      coronaIntensity *= (0.6 + streamers * 0.4);
      coronaIntensity *= (0.7 + turbulence * 0.3);
      coronaIntensity *= (0.8 + wind * 0.2);
      
      // Color mixing based on plasma temperature and magnetic field
      vec3 color = coronaColor;
      color = mix(color, solarWindColor, wind * 0.6);
      color = mix(color, magneticField, streamers * 0.3);
      
      // Dynamic brightness variations
      float brightness = 1.0 + sin(t * 0.3 + turbulence * 15.0) * 0.2;
      color *= brightness;
      
      float alpha = coronaIntensity * intensity;
      alpha *= (0.5 + sin(t * 0.8 + length(pos) * 20.0) * 0.3); // Flickering
      
      gl_FragColor = vec4(color, alpha);
    }
  `
);

extend({ SolarSurfaceShader, CoronaShader });

// TypeScript declarations
declare global {
  namespace JSX {
    interface IntrinsicElements {
      solarSurfaceShader: any;
      coronaShader: any;
    }
  }
}

interface Sun3DProps {
  position?: [number, number, number];
  scale?: number;
}

const Sun3D: React.FC<Sun3DProps> = ({ position = [0, 0, 0], scale = 1 }) => {
  const sunRef = useRef<THREE.Group>(null);
  const surfaceShaderRef = useRef<any>(null);
  const coronaShaderRef = useRef<any>(null);
  const flareRef = useRef<THREE.Mesh>(null);

  // Animate the sun
  useFrame((state) => {
    if (surfaceShaderRef.current) {
      surfaceShaderRef.current.time = state.clock.elapsedTime;
    }
    if (coronaShaderRef.current) {
      coronaShaderRef.current.time = state.clock.elapsedTime;
    }
    
    // Rotate the sun slowly
    if (sunRef.current) {
      sunRef.current.rotation.y = state.clock.elapsedTime * 0.1;
    }
    
    // Animate solar flares
    if (flareRef.current) {
      flareRef.current.rotation.z = state.clock.elapsedTime * 0.05;
      flareRef.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.05);
    }
  });

  return (
    <group ref={sunRef} position={position}>
      {/* Nuclear Core - Super hot innermost layer */}
      <Sphere args={[1.8 * scale, 64, 64]}>
        <meshBasicMaterial 
          color="#FFFFFF" 
          transparent 
          opacity={0.95}
        />
      </Sphere>

      {/* Main Solar Photosphere with realistic shader */}
      <Sphere args={[2.3 * scale, 128, 128]}>
        <solarSurfaceShader 
          ref={surfaceShaderRef}
          key={SolarSurfaceShader.key}
          time={0}
          sunCore={new THREE.Color('#FFFFF0')}
          sunSurface={new THREE.Color('#FFA500')}
          sunSpots={new THREE.Color('#8B4513')}
          sunFlares={new THREE.Color('#FF6347')}
          granuleScale={15.0}
          convectionScale={5.0}
          temperature={5778.0}
        />
      </Sphere>

      {/* Chromosphere - Lower atmosphere with temperature gradient */}
      <Sphere args={[2.6 * scale, 64, 64]}>
        <meshBasicMaterial 
          color="#FF4500"
          transparent 
          opacity={0.3}
          side={THREE.DoubleSide}
        />
      </Sphere>

      {/* Transition Region - Temperature spike layer */}
      <Sphere args={[2.8 * scale, 48, 48]}>
        <meshBasicMaterial 
          color="#FF69B4"
          transparent 
          opacity={0.15}
          side={THREE.DoubleSide}
        />
      </Sphere>

      {/* Corona - Outer atmosphere with magnetic field simulation */}
      <Sphere args={[3.8 * scale, 64, 64]}>
        <coronaShader 
          ref={coronaShaderRef}
          key={CoronaShader.key}
          time={0}
          coronaColor={new THREE.Color('#FFE5B4')}
          solarWindColor={new THREE.Color('#FFF8DC')}
          magneticField={new THREE.Color('#FF69B4')}
          intensity={0.4}
          streamers={1.0}
          transparent
          side={THREE.DoubleSide}
        />
      </Sphere>

      {/* Extended Corona - Far reaching corona */}
      <Sphere args={[5.5 * scale, 32, 32]}>
        <coronaShader 
          key={CoronaShader.key + '_extended'}
          time={0}
          coronaColor={new THREE.Color('#FFE5B4')}
          solarWindColor={new THREE.Color('#FFF8DC')}
          magneticField={new THREE.Color('#FF69B4')}
          intensity={0.15}
          streamers={0.8}
          transparent
          side={THREE.DoubleSide}
        />
      </Sphere>

      {/* Solar Wind Visualization */}
      <mesh ref={flareRef}>
        <sphereGeometry args={[7.0 * scale, 24, 24]} />
        <meshBasicMaterial 
          color="#FFF8DC"
          transparent 
          opacity={0.02}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Solar Prominences - Magnetic field line structures */}
      {Array.from({ length: 12 }, (_, i) => {
        const angle = (i / 12) * Math.PI * 2;
        const radius = 2.4 * scale;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const height = 0.8 + Math.sin(i * 0.7) * 0.4; // Varying heights
        
        return (
          <group key={i}>
            {/* Main prominence structure */}
            <mesh 
              position={[x, 0, z]}
              rotation={[Math.PI / 6, angle, Math.PI / 2]}
            >
              <cylinderGeometry args={[0.02 * scale, 0.15 * scale, height * scale, 6]} />
              <meshBasicMaterial 
                color="#FF6347"
                transparent 
                opacity={0.7}
                emissive="#FF4500"
                emissiveIntensity={0.3}
              />
            </mesh>
            
            {/* Prominence glow */}
            <mesh 
              position={[x, height * 0.3, z]}
              rotation={[0, angle, 0]}
            >
              <sphereGeometry args={[0.3 * scale, 8, 8]} />
              <meshBasicMaterial 
                color="#FF6347"
                transparent 
                opacity={0.2}
              />
            </mesh>
          </group>
        );
      })}

      {/* Coronal Mass Ejection Effects (occasional) */}
      {Array.from({ length: 3 }, (_, i) => {
        const angle = (i / 3) * Math.PI * 2 + Math.PI / 3;
        const radius = 4.0 * scale;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        
        return (
          <mesh 
            key={`cme_${i}`}
            position={[x, 0, z]}
            rotation={[0, angle, 0]}
          >
            <coneGeometry args={[0.8 * scale, 2.0 * scale, 8]} />
            <meshBasicMaterial 
              color="#FFB6C1"
              transparent 
              opacity={0.1}
              side={THREE.DoubleSide}
            />
          </mesh>
        );
      })}
    </group>
  );
};

export default Sun3D;
