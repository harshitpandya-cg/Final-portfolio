import React, { useState, useEffect, useRef, useImperativeHandle } from 'react';
import * as THREE from 'three';

const HeroMonogramCanvas = React.forwardRef(({ isMobile = false, currentBeat = 1 }, ref) => {
  const mountRef = useRef(null);
  const [currentMode, setCurrentMode] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.documentElement.getAttribute('data-mode') || 'dark';
    }
    return 'dark';
  });
  const stateRef = useRef({
    renderer: null,
    scene: null,
    camera: null,
    group: null,
    solidMeshes: [],
    wireframeMeshes: [],
    accentCube: null,
    pointLight: null,
    dirLight: null,
    fillLight: null,
    ambientLight: null,
    solidMat: null,
    coralMat: null,
    sphereDiameter: 6.7,
    animId: null,
    isVisible: true,
    lastProgress: 0,
  });

  const applyProgress = (scrollProgress) => {
    const { group, solidMeshes, wireframeMeshes, pointLight } = stateRef.current;
    if (!group) return;

    // Rotate 360 degrees
    const rotY = scrollProgress * Math.PI * 2;
    group.rotation.y = rotY;
    group.rotation.x = Math.sin(scrollProgress * Math.PI) * 0.2;

    // Crossfade between solid and wireframe in Beat 2
    let wireOpacity = 0;
    let solidOpacity = 1;

    if (scrollProgress >= 0.25 && scrollProgress <= 0.75) {
      const peak = 1 - Math.abs(scrollProgress - 0.5) / 0.25;
      wireOpacity = Math.max(0, Math.min(1, peak));
      solidOpacity = 1 - wireOpacity * 0.85;
    }

    if (solidMeshes[0]) {
      solidMeshes[0].material.opacity = solidOpacity;
    }
    if (wireframeMeshes[0]) {
      wireframeMeshes[0].material.opacity = wireOpacity;
    }

    if (pointLight) {
      pointLight.intensity = 2.5 + Math.sin(scrollProgress * Math.PI) * 2.8;
    }
  };

  const applyThemeColors = (mode) => {
    const isLight = mode === 'light';
    const { solidMat, coralMat, ambientLight, dirLight, fillLight } = stateRef.current;
    if (!solidMat) return;

    if (isLight) {
      solidMat.color.set(0x2a2926); // Matte ink-grey in light mode
      solidMat.roughness = 0.45;
      solidMat.metalness = 0.1;
      if (coralMat) coralMat.color.set(0xf0552d);
      if (ambientLight) ambientLight.intensity = 1.6;
      if (dirLight) {
        dirLight.color.set(0xfff7ed); // Warm key light
        dirLight.intensity = 2.4;
      }
      if (fillLight) fillLight.intensity = 1.0;
    } else {
      solidMat.color.set(0xe6e4de);
      solidMat.roughness = 0.35;
      solidMat.metalness = 0.15;
      if (coralMat) coralMat.color.set(0xf0552d);
      if (ambientLight) ambientLight.intensity = 1.3;
      if (dirLight) {
        dirLight.color.set(0xffffff);
        dirLight.intensity = 2.2;
      }
      if (fillLight) fillLight.intensity = 0.9;
    }
  };

  useImperativeHandle(
    ref,
    () => ({
      updateProgress: (scrollProgress) => {
        stateRef.current.lastProgress = scrollProgress;
        applyProgress(scrollProgress);
      },
      updateTheme: (mode) => {
        setCurrentMode(mode);
        applyThemeColors(mode);
      },
    }),
    []
  );

  // Observe theme mode changes on <html>
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const mo = new MutationObserver(() => {
      const mode = document.documentElement.getAttribute('data-mode') || 'dark';
      setCurrentMode(mode);
      applyThemeColors(mode);
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-mode'] });
    return () => mo.disconnect();
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container || isMobile) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    // Scene
    const scene = new THREE.Scene();
    stateRef.current.scene = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    stateRef.current.camera = camera;

    // Renderer: DPR clamped strictly to [1, 1.5]
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(Math.max(window.devicePixelRatio || 1, 1), 1.5));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);
    stateRef.current.renderer = renderer;

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.3);
    scene.add(ambientLight);
    stateRef.current.ambientLight = ambientLight;

    const dirLight = new THREE.DirectionalLight(0xffffff, 2.2);
    dirLight.position.set(5, 8, 7);
    scene.add(dirLight);
    stateRef.current.dirLight = dirLight;

    const rimLight = new THREE.PointLight(0xf0552d, 3.8, 20);
    rimLight.position.set(0, 0, -2.5);
    scene.add(rimLight);
    stateRef.current.pointLight = rimLight;

    const fillLight = new THREE.DirectionalLight(0x8a8880, 0.9);
    fillLight.position.set(-5, -4, 4);
    scene.add(fillLight);
    stateRef.current.fillLight = fillLight;

    // Monogram Extruded Geometry
    const group = new THREE.Group();
    scene.add(group);
    stateRef.current.group = group;

    const extrudeSettings = {
      depth: 0.7,
      bevelEnabled: true,
      bevelSegments: 2,
      steps: 1,
      bevelSize: 0.04,
      bevelThickness: 0.06,
    };

    // Construct "HP" Straight-edged Monogram shapes
    const shapes = [];

    // 'H' Left Stem
    const hLeft = new THREE.Shape();
    hLeft.moveTo(-2.4, -2.3);
    hLeft.lineTo(-1.6, -2.3);
    hLeft.lineTo(-1.6, 2.3);
    hLeft.lineTo(-2.4, 2.3);
    hLeft.closePath();
    shapes.push(hLeft);

    // 'H' Crossbar (Centered, Coral)
    const hBar = new THREE.Shape();
    hBar.moveTo(-1.6, -0.4);
    hBar.lineTo(-0.6, -0.4);
    hBar.lineTo(-0.6, 0.4);
    hBar.lineTo(-1.6, 0.4);
    hBar.closePath();
    shapes.push(hBar);

    // 'H' Right Stem
    const hRight = new THREE.Shape();
    hRight.moveTo(-0.6, -2.3);
    hRight.lineTo(0.2, -2.3);
    hRight.lineTo(0.2, 2.3);
    hRight.lineTo(-0.6, 2.3);
    hRight.closePath();
    shapes.push(hRight);

    // 'P' Left Stem
    const pStem = new THREE.Shape();
    pStem.moveTo(0.5, -2.3);
    pStem.lineTo(1.3, -2.3);
    pStem.lineTo(1.3, 2.3);
    pStem.lineTo(0.5, 2.3);
    pStem.closePath();
    shapes.push(pStem);

    // 'P' Upper Loop with Hole
    const pLoop = new THREE.Shape();
    pLoop.moveTo(1.3, 0.1);
    pLoop.lineTo(2.4, 0.1);
    pLoop.lineTo(2.4, 2.3);
    pLoop.lineTo(1.3, 2.3);
    pLoop.closePath();

    const pHole = new THREE.Path();
    pHole.moveTo(1.7, 0.6);
    pHole.lineTo(2.0, 0.6);
    pHole.lineTo(2.0, 1.8);
    pHole.lineTo(1.7, 1.8);
    pHole.closePath();
    pLoop.holes.push(pHole);
    shapes.push(pLoop);

    // Reusable Materials
    const solidMat = new THREE.MeshStandardMaterial({
      color: 0xe6e4de,
      roughness: 0.35,
      metalness: 0.15,
      transparent: true,
      opacity: 1,
    });
    stateRef.current.solidMat = solidMat;

    const coralMat = new THREE.MeshStandardMaterial({
      color: 0xf0552d,
      roughness: 0.3,
      metalness: 0.2,
      emissive: 0xf0552d,
      emissiveIntensity: 0.25,
      transparent: true,
      opacity: 1,
    });
    stateRef.current.coralMat = coralMat;

    const wireMat = new THREE.MeshBasicMaterial({
      color: 0xf0552d,
      wireframe: true,
      transparent: true,
      opacity: 0,
    });

    const solidMeshes = [];
    const wireframeMeshes = [];

    shapes.forEach((s, idx) => {
      const geom = new THREE.ExtrudeGeometry(s, extrudeSettings);
      const isCrossbar = idx === 1;
      const mesh = new THREE.Mesh(geom, isCrossbar ? coralMat : solidMat);
      const wire = new THREE.Mesh(geom, wireMat);

      group.add(mesh);
      group.add(wire);

      solidMeshes.push(mesh);
      wireframeMeshes.push(wire);
    });

    // Orange accent cube positioned INSIDE the mark's own coordinate space (at the gap between H and P)
    const cubeGeom = new THREE.BoxGeometry(0.32, 0.32, 0.32);
    const accentCube = new THREE.Mesh(cubeGeom, coralMat);
    accentCube.position.set(0.35, 0, 0.35);
    group.add(accentCube);
    stateRef.current.accentCube = accentCube;

    // Center all group geometry around volumetric centroid (0,0,0)
    const initBox = new THREE.Box3().setFromObject(group);
    const centerPoint = new THREE.Vector3();
    initBox.getCenter(centerPoint);
    group.children.forEach((child) => {
      child.position.x -= centerPoint.x;
      child.position.y -= centerPoint.y;
      child.position.z -= centerPoint.z;
    });

    // Bounding Sphere calculation for strict bounding at ANY rotation angle (000°–360°)
    const finalBox = new THREE.Box3().setFromObject(group);
    const sphere = new THREE.Sphere();
    finalBox.getBoundingSphere(sphere);
    const sphereDiameter = sphere.radius * 2;
    stateRef.current.sphereDiameter = sphereDiameter;

    stateRef.current.solidMeshes = solidMeshes;
    stateRef.current.wireframeMeshes = wireframeMeshes;
    applyProgress(stateRef.current.lastProgress);
    const initialMode =
      typeof document !== 'undefined'
        ? document.documentElement.getAttribute('data-mode') || 'dark'
        : 'dark';
    applyThemeColors(initialMode);

    // Dynamic Camera Fit Function based on Bounding Sphere & Middle Column Dimensions
    const fitCamera = (w, h) => {
      if (!w || !h) return;
      const fov = 35;
      camera.fov = fov;
      const aspect = w / h;
      camera.aspect = aspect;

      // Mark occupies about 60–65% of visible height
      const targetHeightFraction = 0.62;
      const visibleHeightNeeded = sphereDiameter / targetHeightFraction;
      const fovRad = (fov * Math.PI) / 180;
      const distForHeight = (visibleHeightNeeded / 2) / Math.tan(fovRad / 2);

      // Never wider than middle column minus 24px gutter on both sides
      const availableWidthFraction = Math.max(0.1, Math.min(0.92, (w - 48) / w));
      const visibleWidthNeeded = sphereDiameter / availableWidthFraction;
      const distForWidth = (visibleWidthNeeded / 2) / (Math.tan(fovRad / 2) * aspect);

      const distance = Math.max(distForHeight, distForWidth);
      camera.position.set(0, 0, distance);
      camera.lookAt(0, 0, 0);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    fitCamera(width, height);

    // Viewport IntersectionObserver to pause rendering when off-screen
    const io = new IntersectionObserver(
      ([entry]) => {
        stateRef.current.isVisible = entry.isIntersecting;
      },
      { threshold: 0.02 }
    );
    io.observe(container);

    // ResizeObserver
    const ro = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const { width: w, height: h } = entry.contentRect;
        if (w > 0 && h > 0) fitCamera(w, h);
      }
    });
    ro.observe(container);

    // Animation Loop with Culling & Nav-Scroll Pause
    let baseTime = 0;
    const animate = () => {
      stateRef.current.animId = requestAnimationFrame(animate);

      // Skip render if off-screen, during nav-link smooth scrolling, or theme wipe
      if (!stateRef.current.isVisible || window.__isNavScrolling || window.__isThemeTransitioning) return;

      baseTime += 0.01;
      if (group) {
        group.position.y = Math.sin(baseTime) * 0.06;
      }

      renderer.render(scene, camera);
    };
    animate();

    const state = stateRef.current;
    return () => {
      cancelAnimationFrame(state.animId);
      ro.disconnect();
      io.disconnect();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      solidMat.dispose();
      coralMat.dispose();
      wireMat.dispose();
      shapes.forEach((_, i) => {
        solidMeshes[i]?.geometry.dispose();
      });
    };
  }, [isMobile]);

  if (isMobile) {
    return (
      <div
        className={`w-56 h-56 flex items-center justify-center pointer-events-none select-none transition-opacity duration-500 ${
          currentBeat === 1 ? 'opacity-100' : 'opacity-15'
        }`}
      >
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full drop-shadow-2xl transition-colors duration-300"
          fill={currentMode === 'light' ? '#2A2926' : '#E6E4DE'}
        >
          <path d="M 18 18 L 30 18 L 30 82 L 18 82 Z" />
          <path d="M 30 44 L 46 44 L 46 56 L 30 56 Z" fill="#F0552D" />
          <path d="M 46 18 L 58 18 L 58 82 L 46 82 Z" />
          <path d="M 58 18 L 82 18 L 82 52 L 58 52 Z M 58 30 L 70 30 L 70 40 L 58 40 Z" />
        </svg>
      </div>
    );
  }

  return (
    <div
      ref={mountRef}
      className="w-full h-full flex items-center justify-center pointer-events-none relative"
      aria-label="3D Extruded Harshit Pandya Monogram"
    >
      <div
        className="absolute inset-0 rounded-full blur-3xl pointer-events-none transition-colors duration-500"
        style={{
          background:
            currentMode === 'light'
              ? 'radial-gradient(circle, rgba(138,136,128,0.18) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(240,85,45,0.15) 0%, transparent 70%)',
        }}
      />
    </div>
  );
});

HeroMonogramCanvas.displayName = 'HeroMonogramCanvas';
export default React.memo(HeroMonogramCanvas);
