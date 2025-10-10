import React, { useRef, useEffect, useState } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls as DreiOrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface EnhancedSpaceControlsProps {
  enableDamping?: boolean;
  dampingFactor?: number;
  enableZoom?: boolean;
  enablePan?: boolean;
  enableRotate?: boolean;
  minDistance?: number;
  maxDistance?: number;
  zoomSpeed?: number;
  panSpeed?: number;
  rotateSpeed?: number;
  enableKeyboardNavigation?: boolean;
  keyboardSpeed?: number;
  enableTouchGestures?: boolean;
  enableSmoothTransitions?: boolean;
  onCameraMove?: (position: THREE.Vector3, target: THREE.Vector3) => void;
}

const EnhancedSpaceControls = React.forwardRef<any, EnhancedSpaceControlsProps>(({
  enableDamping = true,
  dampingFactor = 0.05,
  enableZoom = true,
  enablePan = true,
  enableRotate = true,
  minDistance = 10,
  maxDistance = 300,
  zoomSpeed = 0.8,
  panSpeed = 1.0,
  rotateSpeed = 0.5,
  enableKeyboardNavigation = true,
  keyboardSpeed = 8,
  enableTouchGestures = true,
  enableSmoothTransitions = true,
  onCameraMove
}, ref) => {
  const controlsRef = useRef<any>();
  const { camera, gl } = useThree();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [keys, setKeys] = useState<Set<string>>(new Set());
  
  // Touch gesture state
  const touchState = useRef({
    lastTouchDistance: 0,
    lastTouchCenter: { x: 0, y: 0 },
    isMultiTouch: false
  });

  // Smooth camera transition function
  const smoothTransitionTo = (
    targetPosition: THREE.Vector3,
    targetLookAt: THREE.Vector3,
    duration: number = 1500
  ) => {
    if (!controlsRef.current || isTransitioning) return;
    
    setIsTransitioning(true);
    
    const startPosition = camera.position.clone();
    const startTarget = controlsRef.current.target.clone();
    const startTime = Date.now();
    
    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Smooth easing function
      const easeInOutCubic = (t: number) => 
        t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
      
      const easedProgress = easeInOutCubic(progress);
      
      // Interpolate position and target
      camera.position.lerpVectors(startPosition, targetPosition, easedProgress);
      controlsRef.current.target.lerpVectors(startTarget, targetLookAt, easedProgress);
      controlsRef.current.update();
      
      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setIsTransitioning(false);
      }
    };
    
    animate();
  };

  // Enhanced keyboard navigation
  useEffect(() => {
    if (!enableKeyboardNavigation) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      setKeys(prev => new Set(prev).add(key));
      
      // Prevent default for navigation keys
      if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright', ' ', 'shift'].includes(key)) {
        event.preventDefault();
      }
    };

    const handleKeyUp = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      setKeys(prev => {
        const newKeys = new Set(prev);
        newKeys.delete(key);
        return newKeys;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [enableKeyboardNavigation]);

  // Enhanced touch gesture handling
  useEffect(() => {
    if (!enableTouchGestures) return;

    const handleTouchStart = (event: TouchEvent) => {
      if (event.touches.length === 2) {
        touchState.current.isMultiTouch = true;
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        
        touchState.current.lastTouchDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        
        touchState.current.lastTouchCenter = {
          x: (touch1.clientX + touch2.clientX) / 2,
          y: (touch1.clientY + touch2.clientY) / 2
        };
      }
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length === 2 && touchState.current.isMultiTouch) {
        event.preventDefault();
        
        const touch1 = event.touches[0];
        const touch2 = event.touches[1];
        
        const currentDistance = Math.hypot(
          touch2.clientX - touch1.clientX,
          touch2.clientY - touch1.clientY
        );
        
        const currentCenter = {
          x: (touch1.clientX + touch2.clientX) / 2,
          y: (touch1.clientY + touch2.clientY) / 2
        };
        
        // Zoom based on pinch
        if (touchState.current.lastTouchDistance > 0) {
          const zoomDelta = (currentDistance - touchState.current.lastTouchDistance) * 0.01;
          const currentDistance = camera.position.distanceTo(controlsRef.current.target);
          const newDistance = Math.max(minDistance, Math.min(maxDistance, currentDistance - zoomDelta * 10));
          
          const direction = camera.position.clone().sub(controlsRef.current.target).normalize();
          camera.position.copy(controlsRef.current.target).add(direction.multiplyScalar(newDistance));
        }
        
        touchState.current.lastTouchDistance = currentDistance;
        touchState.current.lastTouchCenter = currentCenter;
      }
    };

    const handleTouchEnd = () => {
      touchState.current.isMultiTouch = false;
      touchState.current.lastTouchDistance = 0;
    };

    gl.domElement.addEventListener('touchstart', handleTouchStart, { passive: false });
    gl.domElement.addEventListener('touchmove', handleTouchMove, { passive: false });
    gl.domElement.addEventListener('touchend', handleTouchEnd);

    return () => {
      gl.domElement.removeEventListener('touchstart', handleTouchStart);
      gl.domElement.removeEventListener('touchmove', handleTouchMove);
      gl.domElement.removeEventListener('touchend', handleTouchEnd);
    };
  }, [enableTouchGestures, camera, gl.domElement, minDistance, maxDistance]);

  // Continuous keyboard movement
  useFrame((state, delta) => {
    if (!controlsRef.current || !enableKeyboardNavigation || isTransitioning) return;

    const moveSpeed = keyboardSpeed * delta * 60; // Normalize for 60fps
    const position = camera.position;
    const target = controlsRef.current.target;
    
    // Get camera's forward, right, and up vectors
    const forward = new THREE.Vector3();
    const right = new THREE.Vector3();
    const up = new THREE.Vector3(0, 1, 0);
    
    camera.getWorldDirection(forward);
    right.crossVectors(forward, up).normalize();
    up.crossVectors(right, forward).normalize();

    let moved = false;

    // Movement controls
    if (keys.has('w') || keys.has('arrowup')) {
      position.add(forward.multiplyScalar(moveSpeed));
      target.add(forward.multiplyScalar(moveSpeed));
      moved = true;
    }
    if (keys.has('s') || keys.has('arrowdown')) {
      position.add(forward.multiplyScalar(-moveSpeed));
      target.add(forward.multiplyScalar(-moveSpeed));
      moved = true;
    }
    if (keys.has('a') || keys.has('arrowleft')) {
      position.add(right.multiplyScalar(-moveSpeed));
      target.add(right.multiplyScalar(-moveSpeed));
      moved = true;
    }
    if (keys.has('d') || keys.has('arrowright')) {
      position.add(right.multiplyScalar(moveSpeed));
      target.add(right.multiplyScalar(moveSpeed));
      moved = true;
    }
    if (keys.has(' ')) {
      position.add(up.multiplyScalar(moveSpeed));
      target.add(up.multiplyScalar(moveSpeed));
      moved = true;
    }
    if (keys.has('shift')) {
      position.add(up.multiplyScalar(-moveSpeed));
      target.add(up.multiplyScalar(-moveSpeed));
      moved = true;
    }

    if (moved) {
      controlsRef.current.update();
      onCameraMove?.(position.clone(), target.clone());
    }
  });

  // Expose control methods
  useEffect(() => {
    if (controlsRef.current) {
      // Add smooth transition method to controls
      controlsRef.current.smoothTransitionTo = smoothTransitionTo;
    }
  }, []);

  // Combine refs
  React.useImperativeHandle(ref, () => controlsRef.current);

  return (
    <DreiOrbitControls
      ref={controlsRef}
      enableDamping={enableDamping}
      dampingFactor={dampingFactor}
      enableZoom={enableZoom}
      enablePan={enablePan}
      enableRotate={enableRotate}
      minDistance={minDistance}
      maxDistance={maxDistance}
      zoomSpeed={zoomSpeed}
      panSpeed={panSpeed}
      rotateSpeed={rotateSpeed}
      makeDefault
    />
  );
});

EnhancedSpaceControls.displayName = 'EnhancedSpaceControls';

export default EnhancedSpaceControls;