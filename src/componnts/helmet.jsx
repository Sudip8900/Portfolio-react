import React, { useRef, useEffect } from 'react'
import { useGLTF } from '@react-three/drei'
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

export function Helmet({ IsReady, wireframeOnly = false, isMobile = false, isExploded = false, ...props }) {
  const shapeContainer = useRef(null);
  const mouseRotateRef = useRef(null);
  const { nodes, materials } = useGLTF('/Model/sci-fi_helmet (1K).glb');

  const explosionFactor = useRef({ value: 0 });
  const meshesRef = useRef([]);

  // Dedicated wireframe material for wireframeOnly mode
  const wireframeMaterialOnly = useRef(
    new THREE.MeshBasicMaterial({
      color: new THREE.Color('#ea580c'),
      wireframe: true,
      transparent: true,
      opacity: 0.20,
      depthWrite: true,
    })
  ).current;

  // Solid background material to block back-facing wireframe lines
  const solidBackgroundMaterial = useRef(
    new THREE.MeshBasicMaterial({
      color: new THREE.Color('#eae8e4'), // Matches the section background
      depthWrite: true,
    })
  ).current;

  useEffect(() => {
    return () => {
      if (wireframeMaterialOnly) {
        wireframeMaterialOnly.dispose();
      }
      if (solidBackgroundMaterial) {
        solidBackgroundMaterial.dispose();
      }
    };
  }, [wireframeMaterialOnly, solidBackgroundMaterial]);

  // Single world-space clipping plane for the scan reveal.
  // Normal (0,-1,0) clips everything where y > constant.
  // Animating constant from -5 (entire helmet hidden) → 5 (entire helmet visible)
  // sweeps the reveal cleanly from bottom to top in world space.
  const clipPlane = useRef(new THREE.Plane(new THREE.Vector3(0, -1, 0), -5)).current;

  // Shared glowing orange wireframe overlay material.
  // polygonOffset pushes it slightly in front of the solid mesh to prevent z-fighting.
  const wireframeMaterial = useRef(
    new THREE.MeshBasicMaterial({
      color: new THREE.Color('#888888'),
      wireframe: true,
      transparent: true,
      opacity: 0,          // starts invisible; will be set by GSAP
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
      clippingPlanes: [clipPlane],
    })
  ).current;

  // Set initial material states for transition
  if (materials.helmet && !wireframeOnly) {
    materials.helmet.transparent = true;
    if (!IsReady) {
      materials.helmet.opacity = 0;
    }
  }

  // Initialize directions and original positions once when model is loaded/mounted
  useEffect(() => {
    if (!mouseRotateRef.current) return;

    const meshes = [];
    mouseRotateRef.current.traverse((child) => {
      if (child.isMesh && !child.userData.isWireframe) {
        if (!child.userData.initialized) {
          child.userData.originalPosition = child.position.clone();
          
          // Compute geometry bounding box
          child.geometry.computeBoundingBox();
          const center = new THREE.Vector3();
          child.geometry.boundingBox.getCenter(center);
          
          // Add local position to find center relative to helmet origin
          center.add(child.position);

          if (center.length() > 0.1) {
            child.userData.direction = center.clone().normalize();
          } else {
            // Fallback direction if centered at origin
            child.userData.direction = new THREE.Vector3(
              Math.sin(child.id || Math.random()) * 0.5,
              Math.cos(child.id || Math.random()) * 0.5,
              0.5
            ).normalize();
          }
          child.userData.initialized = true;
        }
        meshes.push(child);
      }
    });
    meshesRef.current = meshes;
  }, [nodes, materials, wireframeOnly]);

  // Apply solid background and clone wireframe on top in wireframeOnly mode
  useEffect(() => {
    if (!wireframeOnly) return;
    if (!mouseRotateRef.current) return;

    const meshesToClone = [];
    mouseRotateRef.current.traverse((child) => {
      if (child.isMesh && !child.userData.isWireframe) {
        // Set main mesh material to solid background
        child.material = solidBackgroundMaterial;
        meshesToClone.push(child);
      }
    });

    const createdWireframeMeshes = [];
    meshesToClone.forEach((mesh) => {
      const wireframeMesh = new THREE.Mesh(mesh.geometry, wireframeMaterialOnly);
      wireframeMesh.userData.isWireframe = true;
      mesh.add(wireframeMesh);
      createdWireframeMeshes.push(wireframeMesh);
    });

    return () => {
      createdWireframeMeshes.forEach((wm) => {
        if (wm.parent) {
          wm.parent.remove(wm);
        }
      });
    };
  }, [wireframeOnly, wireframeMaterialOnly, solidBackgroundMaterial, nodes, materials]);

  // Clone original meshes to render wireframes overlapping them (standard mode only)
  useEffect(() => {
    if (wireframeOnly) return;
    if (!mouseRotateRef.current) return;

    const meshesToClone = [];
    mouseRotateRef.current.traverse((child) => {
      if (child.isMesh && !child.userData.isWireframe) {
        meshesToClone.push(child);
      }
    });

    const createdWireframeMeshes = [];
    meshesToClone.forEach((mesh) => {
      const wireframeMesh = new THREE.Mesh(mesh.geometry, wireframeMaterial);
      wireframeMesh.userData.isWireframe = true;
      mesh.add(wireframeMesh);
      createdWireframeMeshes.push(wireframeMesh);
    });

    return () => {
      createdWireframeMeshes.forEach((wm) => {
        if (wm.parent) {
          wm.parent.remove(wm);
        }
      });
      wireframeMaterial.dispose();
    };
  }, [materials.helmet, wireframeMaterial, wireframeOnly]);

  // Transition: wireframe scans in → solid fades in beneath → wireframe settles as a subtle overlay (standard mode only)
  useGSAP(() => {
    if (wireframeOnly) return;
    if (!IsReady) return;

    const tl = gsap.timeline();

    // Guarantee initial states
    if (materials.helmet) {
      tl.set(materials.helmet, { opacity: 0 });
    }
    tl.set(wireframeMaterial, { opacity: 1 })
      .set(clipPlane, { constant: -5 });

    // 1. Scan-draw the wireframe from bottom to top
    tl.to(clipPlane, {
      constant: 5,
      duration: 2.2,
      ease: "power2.out",
      // Once the scan finishes, remove the clipping plane so the
      // overlay covers the full mesh (no hard clip edge visible)
      onComplete: () => {
        wireframeMaterial.clippingPlanes = [];
        wireframeMaterial.needsUpdate = true;
      },
    })

    // 2. Solid mesh materialises beneath the wireframe overlay
    .to(materials.helmet, {
      opacity: 1,
      duration: 2,
      ease: "power3.out",
    }, "+=0.1")

    // 3. Wireframe settles to a soft glow overlay (not disappearing)
    .to(wireframeMaterial, {
      opacity: 0.18,
      duration: 2,
      ease: "power2.inOut",
    }, "<");
  }, { dependencies: [IsReady, wireframeOnly] });

  // Disassemble animation triggers for standard interactive model (on hover / click)
  useGSAP(() => {
    if (wireframeOnly) return;
    
    gsap.to(explosionFactor.current, {
      value: isExploded ? 1.15 : 0,
      duration: isExploded ? 1.2 : 1.4,
      ease: isExploded ? "power2.out" : "power2.inOut",
      overwrite: "auto"
    });
  }, { dependencies: [isExploded, wireframeOnly] });

  // Gentle floating looping disassemble animation for wireframeOnly model (bottom of page)
  useGSAP(() => {
    if (!wireframeOnly) return;
    
    gsap.to(explosionFactor.current, {
      value: 0.65,
      duration: 3.5,
      yoyo: true,
      repeat: -1,
      ease: "power1.inOut"
    });
  }, { dependencies: [wireframeOnly] });

  // Capture global mouse independently of Canvas overlay blocking (standard mode only)
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    if (wireframeOnly || isMobile) return;
    const onMouseMove = (e) => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener('mousemove', onMouseMove);
    return () => window.removeEventListener('mousemove', onMouseMove);
  }, [wireframeOnly, isMobile]);

  useFrame((state, delta) => {
    // 1. Handle rotation branches
    if (wireframeOnly) {
      if (mouseRotateRef.current) {
        // Slowly rotate clockwise (negative direction)
        mouseRotateRef.current.rotation.y -= delta * 0.35;
      }
    } else if (IsReady && mouseRotateRef.current) {
      if (isMobile) {
        // On mobile, the helmet remains static, facing directly forward towards the user
        mouseRotateRef.current.rotation.x = THREE.MathUtils.damp(mouseRotateRef.current.rotation.x, 0, 3, delta);
        mouseRotateRef.current.rotation.y = THREE.MathUtils.damp(mouseRotateRef.current.rotation.y, 0, 3, delta);
      } else {
        // Calculate target rotation based on normalized mouse coordinates
        const targetX = -(mouse.current.y * Math.PI) / 8; // pitch limits
        const targetY = (mouse.current.x * Math.PI) / 6; // yaw limits

        // Smoothly damp current rotation toward target
        mouseRotateRef.current.rotation.x = THREE.MathUtils.damp(mouseRotateRef.current.rotation.x, targetX, 3, delta);
        mouseRotateRef.current.rotation.y = THREE.MathUtils.damp(mouseRotateRef.current.rotation.y, targetY, 3, delta);
      }
    }

    // 2. Apply disassemble explosion offset to all meshes
    if (mouseRotateRef.current && meshesRef.current.length > 0) {
      const factor = explosionFactor.current.value;
      meshesRef.current.forEach((mesh) => {
        if (mesh.userData.initialized) {
          // Calculate new position: originalPosition + direction * factor * scaling
          mesh.position.copy(mesh.userData.originalPosition)
            .addScaledVector(mesh.userData.direction, factor * 0.45);
        }
      });
    }
  });

  return (
    <group ref={shapeContainer} {...props} dispose={null}>
      <group ref={mouseRotateRef} scale={0.01}>
        <group position={[-0.726, 260.229, -70.689]} rotation={[-1.62, 0.004, -0.087]} scale={100}>
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane006_helmet_0.geometry}
            material={materials.helmet}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane_helmet_0.geometry}
            material={materials.helmet}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane001_helmet_0.geometry}
            material={materials.helmet}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane002_helmet_0.geometry}
            material={materials.helmet}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane003_helmet_0.geometry}
            material={materials.helmet}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane004_helmet_0.geometry}
            material={materials.helmet}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane005_helmet_0.geometry}
            material={materials.helmet}
            rotation={[-0.068, 0, 0]}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane007_helmet_0.geometry}
            material={materials.helmet}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane008_helmet_0.geometry}
            material={materials.helmet}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane009_helmet_0.geometry}
            material={materials.helmet}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane010_helmet_0.geometry}
            material={materials.helmet}
            rotation={[0.009, -0.122, -0.083]}
            scale={1.152}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane011_helmet_0.geometry}
            material={materials.helmet}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane012_helmet_0.geometry}
            material={materials.helmet}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane013_helmet_0.geometry}
            material={materials.helmet}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane015_helmet_0.geometry}
            material={materials.helmet}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane014_helmet_0.geometry}
            material={materials.helmet}
            scale={1.032}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane016_helmet_0.geometry}
            material={materials.helmet}
            scale={0.971}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane017_helmet_0.geometry}
            material={materials.helmet}
            scale={0.949}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.NurbsPath_helmet_0.geometry}
            material={materials.helmet}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.NurbsPath001_helmet_0.geometry}
            material={materials.helmet}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.cable_helmet_0.geometry}
            material={materials.helmet}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.NurbsPath002_helmet_0.geometry}
            material={materials.helmet}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.NurbsPath003_helmet_0.geometry}
            material={materials.helmet}
          />
          <mesh
            castShadow
            receiveShadow
            geometry={nodes.Plane018_helmet_0.geometry}
            material={materials.helmet}
            position={[0.013, -0.007, 1.361]}
            rotation={[0.303, -0.216, 0.062]}
            scale={0.09}
          />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/Model/sci-fi_helmet (1K).glb')