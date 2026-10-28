import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { Compass, Rotate3d, Sun, Moon, Sunset, Sparkles } from 'lucide-react';

interface ThreeSunsetCanvasProps {
  interactive?: boolean;
}

export type TimeOfDay = 'sunset' | 'twilight' | 'night';

export const ThreeSunsetCanvas: React.FC<ThreeSunsetCanvasProps> = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('sunset');
  const [isInspecting, setIsInspecting] = useState(false);
  const [cameraAngle, setCameraAngle] = useState<'front' | 'side' | 'rooftop'>('front');

  // References to communicate with animation loop without re-rendering Three.js
  const stateRef = useRef({
    timeOfDay: 'sunset' as TimeOfDay,
    isInspecting: false,
    mouseX: 0,
    mouseY: 0,
    targetMouseX: 0,
    targetMouseY: 0,
    scrollY: 0,
    targetScrollY: 0,
    orbitAngleX: 0,
    orbitAngleY: 0.25,
    isDragging: false,
    lastPointerX: 0,
    lastPointerY: 0,
    cameraView: 'front' as 'front' | 'side' | 'rooftop'
  });

  useEffect(() => {
    stateRef.current.timeOfDay = timeOfDay;
  }, [timeOfDay]);

  useEffect(() => {
    stateRef.current.isInspecting = isInspecting;
  }, [isInspecting]);

  useEffect(() => {
    stateRef.current.cameraView = cameraAngle;
  }, [cameraAngle]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // SCENE, CAMERA, RENDERER
    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2(0x1a0f28, 0.007);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 12, 42);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // ATMOSPHERE & LIGHTS
    const ambientLight = new THREE.AmbientLight(0xffeedd, 0.6);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffa550, 2.2);
    sunLight.position.set(-30, 25, -60);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    scene.add(sunLight);

    const fillLight = new THREE.DirectionalLight(0x9d4edd, 0.8);
    fillLight.position.set(30, 15, 20);
    scene.add(fillLight);

    // SUN / MOON GLOWING MESH
    const celestialGroup = new THREE.Group();
    const sunGeom = new THREE.SphereGeometry(7, 32, 32);
    const sunMat = new THREE.MeshBasicMaterial({
      color: 0xffaa33,
      transparent: true,
      opacity: 0.95,
    });
    const celestialMesh = new THREE.Mesh(sunGeom, sunMat);
    celestialMesh.position.set(-30, 20, -140);
    celestialGroup.add(celestialMesh);

    // Glowing sun halo sprite
    const canvasHalo = document.createElement('canvas');
    canvasHalo.width = 128;
    canvasHalo.height = 128;
    const ctx = canvasHalo.getContext('2d')!;
    const radGrad = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
    radGrad.addColorStop(0, 'rgba(255, 170, 50, 0.9)');
    radGrad.addColorStop(0.3, 'rgba(255, 120, 30, 0.4)');
    radGrad.addColorStop(0.7, 'rgba(230, 60, 20, 0.1)');
    radGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    ctx.fillStyle = radGrad;
    ctx.fillRect(0, 0, 128, 128);

    const haloTexture = new THREE.CanvasTexture(canvasHalo);
    const haloMat = new THREE.SpriteMaterial({
      map: haloTexture,
      blending: THREE.AdditiveBlending,
      transparent: true,
      opacity: 0.85
    });
    const haloSprite = new THREE.Sprite(haloMat);
    haloSprite.scale.set(45, 45, 1);
    haloSprite.position.set(-30, 20, -139);
    celestialGroup.add(haloSprite);
    scene.add(celestialGroup);

    // BANGKOK RIVERSIDE SKYLINE SILHOUETTES
    const skylineGroup = new THREE.Group();
    const buildingMat = new THREE.MeshBasicMaterial({
      color: 0x0a0518,
      transparent: true,
      opacity: 0.85,
    });

    for (let i = -14; i <= 14; i++) {
      if (Math.abs(i) < 2) continue; // leave river center open
      const height = 8 + Math.random() * 22;
      const width = 3 + Math.random() * 5;
      const depth = 4 + Math.random() * 6;
      const bldg = new THREE.Mesh(new THREE.BoxGeometry(width, height, depth), buildingMat);
      const xPos = i * 9 + (Math.random() * 4 - 2);
      bldg.position.set(xPos, height / 2 - 1, -110 + (Math.random() * 20));
      skylineGroup.add(bldg);

      // Wat Arun silhouette stupa spire on the left bank
      if (i === -6) {
        const stupaGeom = new THREE.ConeGeometry(5, 28, 6);
        const stupa = new THREE.Mesh(stupaGeom, buildingMat);
        stupa.position.set(xPos - 5, 14, -100);
        skylineGroup.add(stupa);
      }
    }
    scene.add(skylineGroup);

    // ANIMATED RIVER WATER
    const waterGeom = new THREE.PlaneGeometry(240, 300, 64, 64);
    waterGeom.rotateX(-Math.PI / 2);

    const waterMat = new THREE.MeshStandardMaterial({
      color: 0x0c1e33,
      roughness: 0.15,
      metalness: 0.85,
      flatShading: true,
    });
    const water = new THREE.Mesh(waterGeom, waterMat);
    water.position.set(0, -0.5, -30);
    water.receiveShadow = true;
    scene.add(water);

    // Golden Sunset River Light Reflection Strip
    const reflectionGeom = new THREE.PlaneGeometry(35, 200);
    reflectionGeom.rotateX(-Math.PI / 2);
    const reflectionMat = new THREE.MeshBasicMaterial({
      color: 0xff9933,
      transparent: true,
      opacity: 0.22,
      blending: THREE.AdditiveBlending,
    });
    const reflectionMesh = new THREE.Mesh(reflectionGeom, reflectionMat);
    reflectionMesh.position.set(-15, -0.4, -40);
    scene.add(reflectionMesh);

    // 3D LUXURY CRUISE SHIP MODEL
    const shipGroup = new THREE.Group();

    // 1. Hull (Bottom streamlined boat body)
    const hullShape = new THREE.Shape();
    hullShape.moveTo(0, 16);
    hullShape.quadraticCurveTo(5.5, 8, 5.2, -14);
    hullShape.lineTo(-5.2, -14);
    hullShape.quadraticCurveTo(-5.5, 8, 0, 16);

    const extrudeSettings = {
      depth: 4.5,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 2,
      bevelSize: 0.6,
      bevelThickness: 0.6,
    };
    const hullGeom = new THREE.ExtrudeGeometry(hullShape, extrudeSettings);
    hullGeom.rotateX(Math.PI / 2);
    hullGeom.rotateY(Math.PI);

    const hullMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a, // Deep luxury navy
      metalness: 0.6,
      roughness: 0.25,
    });
    const hull = new THREE.Mesh(hullGeom, hullMat);
    hull.position.set(0, 1.8, 0);
    hull.castShadow = true;
    shipGroup.add(hull);

    // Gold Waterline Trim
    const trimGeom = new THREE.BoxGeometry(10.8, 0.4, 28);
    const trimMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.9,
      roughness: 0.2,
    });
    const trim = new THREE.Mesh(trimGeom, trimMat);
    trim.position.set(0, 1.4, -1);
    shipGroup.add(trim);

    // 2. Main Deck (Tier 1 - Air-conditioned Dining Hall)
    const deck1Geom = new THREE.BoxGeometry(9.4, 2.5, 22);
    const deck1Mat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.3,
    });
    const deck1 = new THREE.Mesh(deck1Geom, deck1Mat);
    deck1.position.set(0, 3.2, -2);
    deck1.castShadow = true;
    shipGroup.add(deck1);

    // Tier 1 Glowing Windows (Warm Golden Interior Lights)
    const windowMat = new THREE.MeshBasicMaterial({
      color: 0xfef08a,
      transparent: true,
      opacity: 0.85,
    });
    // Left & Right Window strips
    const winStripGeom = new THREE.BoxGeometry(0.1, 1.2, 19);
    const winLeft = new THREE.Mesh(winStripGeom, windowMat);
    winLeft.position.set(-4.75, 3.3, -2);
    shipGroup.add(winLeft);
    const winRight = new THREE.Mesh(winStripGeom, windowMat);
    winRight.position.set(4.75, 3.3, -2);
    shipGroup.add(winRight);

    // 3. Second Deck (Tier 2 - VIP Lounge & Indoor Buffet)
    const deck2Geom = new THREE.BoxGeometry(8.2, 2.3, 17);
    const deck2 = new THREE.Mesh(deck2Geom, deck1Mat);
    deck2.position.set(0, 5.4, -2.5);
    deck2.castShadow = true;
    shipGroup.add(deck2);

    const win2StripGeom = new THREE.BoxGeometry(0.1, 1.0, 14);
    const win2Left = new THREE.Mesh(win2StripGeom, windowMat);
    win2Left.position.set(-4.15, 5.5, -2.5);
    shipGroup.add(win2Left);
    const win2Right = new THREE.Mesh(win2StripGeom, windowMat);
    win2Right.position.set(4.15, 5.5, -2.5);
    shipGroup.add(win2Right);

    // 4. Rooftop Sky Deck (Tier 3 - 360° Open Air Sunset Rooftop)
    const roofFloorGeom = new THREE.BoxGeometry(8.0, 0.4, 15.5);
    const woodDeckMat = new THREE.MeshStandardMaterial({
      color: 0xb45309, // Teak wood deck
      roughness: 0.6,
    });
    const roofFloor = new THREE.Mesh(roofFloorGeom, woodDeckMat);
    roofFloor.position.set(0, 6.7, -2.5);
    shipGroup.add(roofFloor);

    // Glass Railings on Rooftop
    const railingMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.45,
      metalness: 0.3,
      roughness: 0.1,
    });
    const sideRailGeom = new THREE.BoxGeometry(0.2, 0.9, 15);
    const railL = new THREE.Mesh(sideRailGeom, railingMat);
    railL.position.set(-3.9, 7.3, -2.5);
    shipGroup.add(railL);
    const railR = new THREE.Mesh(sideRailGeom, railingMat);
    railR.position.set(3.9, 7.3, -2.5);
    shipGroup.add(railR);

    // Rooftop Dining Tables & Candlelights
    const tableGeom = new THREE.CylinderGeometry(0.5, 0.5, 0.6, 12);
    const tableMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const candleMat = new THREE.MeshBasicMaterial({ color: 0xff9900 });

    for (let tz = -7; tz <= 4; tz += 2.5) {
      // Left table
      const tbl1 = new THREE.Mesh(tableGeom, tableMat);
      tbl1.position.set(-2.5, 7.1, tz);
      shipGroup.add(tbl1);
      const candle1 = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), candleMat);
      candle1.position.set(-2.5, 7.6, tz);
      shipGroup.add(candle1);

      // Right table
      const tbl2 = new THREE.Mesh(tableGeom, tableMat);
      tbl2.position.set(2.5, 7.1, tz);
      shipGroup.add(tbl2);
      const candle2 = new THREE.Mesh(new THREE.SphereGeometry(0.12, 8, 8), candleMat);
      candle2.position.set(2.5, 7.6, tz);
      shipGroup.add(candle2);
    }

    // Bridge / Wheelhouse (Front Navigation Cockpit)
    const bridgeGeom = new THREE.BoxGeometry(5.5, 1.8, 3.5);
    const bridge = new THREE.Mesh(bridgeGeom, deck1Mat);
    bridge.position.set(0, 7.4, 5.0);
    shipGroup.add(bridge);

    const bridgeWinGeom = new THREE.BoxGeometry(5.2, 0.9, 0.2);
    const bridgeWinMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7,
      metalness: 0.8,
      roughness: 0.1,
    });
    const bridgeWin = new THREE.Mesh(bridgeWinGeom, bridgeWinMat);
    bridgeWin.position.set(0, 7.6, 6.7);
    shipGroup.add(bridgeWin);

    // Radar Mast & Flags
    const mastGeom = new THREE.CylinderGeometry(0.1, 0.18, 5.5, 8);
    const mastMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.7 });
    const mast = new THREE.Mesh(mastGeom, mastMat);
    mast.position.set(0, 10.5, 4.0);
    shipGroup.add(mast);

    // String / Party Lights across upper deck
    const partyLightColors = [0xff4444, 0xffbb33, 0x33ff88, 0x33bbff, 0xff33cc];
    const lightLineGroup = new THREE.Group();
    for (let p = -8; p <= 5; p += 1.2) {
      const pColor = partyLightColors[Math.abs(Math.floor(p * 2)) % partyLightColors.length];
      const bulb = new THREE.Mesh(
        new THREE.SphereGeometry(0.15, 8, 8),
        new THREE.MeshBasicMaterial({ color: pColor })
      );
      bulb.position.set(-3.7, 8.0 + Math.sin(p * 0.4) * 0.2, p);
      lightLineGroup.add(bulb);

      const bulbR = new THREE.Mesh(
        new THREE.SphereGeometry(0.15, 8, 8),
        new THREE.MeshBasicMaterial({ color: pColor })
      );
      bulbR.position.set(3.7, 8.0 + Math.sin(p * 0.4) * 0.2, p);
      lightLineGroup.add(bulbR);
    }
    shipGroup.add(lightLineGroup);

    // Warm deck floodlight
    const deckLight = new THREE.PointLight(0xffb703, 1.5, 20);
    deckLight.position.set(0, 8.5, -1);
    shipGroup.add(deckLight);

    // Stern light
    const sternLight = new THREE.PointLight(0xff6600, 1.2, 12);
    sternLight.position.set(0, 4.0, -14);
    shipGroup.add(sternLight);

    // Wake / Water Foam Trail behind ship
    const wakeGeom = new THREE.PlaneGeometry(16, 45, 1, 8);
    wakeGeom.rotateX(-Math.PI / 2);
    const wakeMat = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.35,
      blending: THREE.AdditiveBlending,
    });
    const wake = new THREE.Mesh(wakeGeom, wakeMat);
    wake.position.set(0, -0.38, -32);
    shipGroup.add(wake);

    scene.add(shipGroup);

    // FLOATING TWILIGHT AMBIENT PARTICLES
    const particleCount = 200;
    const particleGeom = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 80;
      particlePositions[i + 1] = Math.random() * 25 + 0.5;
      particlePositions[i + 2] = (Math.random() - 0.5) * 90 - 10;
    }
    particleGeom.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xf59e0b,
      size: 0.45,
      transparent: true,
      opacity: 0.7,
      blending: THREE.AdditiveBlending,
    });
    const particles = new THREE.Points(particleGeom, particleMat);
    scene.add(particles);

    // MOUSE & SCROLL EVENT LISTENERS
    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      stateRef.current.targetMouseX = x;
      stateRef.current.targetMouseY = y;

      if (stateRef.current.isInspecting && stateRef.current.isDragging) {
        const deltaX = e.clientX - stateRef.current.lastPointerX;
        const deltaY = e.clientY - stateRef.current.lastPointerY;
        stateRef.current.orbitAngleX += deltaX * 0.008;
        stateRef.current.orbitAngleY = Math.max(0.1, Math.min(1.2, stateRef.current.orbitAngleY + deltaY * 0.005));
        stateRef.current.lastPointerX = e.clientX;
        stateRef.current.lastPointerY = e.clientY;
      }
    };

    const handleMouseDown = (e: MouseEvent) => {
      if (stateRef.current.isInspecting) {
        stateRef.current.isDragging = true;
        stateRef.current.lastPointerX = e.clientX;
        stateRef.current.lastPointerY = e.clientY;
      }
    };

    const handleMouseUp = () => {
      stateRef.current.isDragging = false;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        const touch = e.touches[0];
        const rect = container.getBoundingClientRect();
        const x = ((touch.clientX - rect.left) / rect.width) * 2 - 1;
        const y = -(((touch.clientY - rect.top) / rect.height) * 2 - 1);
        stateRef.current.targetMouseX = x;
        stateRef.current.targetMouseY = y;

        if (stateRef.current.isInspecting && stateRef.current.isDragging) {
          const deltaX = touch.clientX - stateRef.current.lastPointerX;
          const deltaY = touch.clientY - stateRef.current.lastPointerY;
          stateRef.current.orbitAngleX += deltaX * 0.008;
          stateRef.current.orbitAngleY = Math.max(0.1, Math.min(1.2, stateRef.current.orbitAngleY + deltaY * 0.005));
          stateRef.current.lastPointerX = touch.clientX;
          stateRef.current.lastPointerY = touch.clientY;
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (stateRef.current.isInspecting && e.touches.length > 0) {
        stateRef.current.isDragging = true;
        stateRef.current.lastPointerX = e.touches[0].clientX;
        stateRef.current.lastPointerY = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = () => {
      stateRef.current.isDragging = false;
    };

    const handleScroll = () => {
      const scrollMax = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = scrollMax > 0 ? window.scrollY / scrollMax : 0;
      stateRef.current.targetScrollY = scrollPercent;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);
    window.addEventListener('scroll', handleScroll, { passive: true });

    // RESIZE LISTENER
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // ANIMATION RENDER LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      // Smooth interpolation for mouse and scroll
      stateRef.current.mouseX += (stateRef.current.targetMouseX - stateRef.current.mouseX) * 0.05;
      stateRef.current.mouseY += (stateRef.current.targetMouseY - stateRef.current.mouseY) * 0.05;
      stateRef.current.scrollY += (stateRef.current.targetScrollY - stateRef.current.scrollY) * 0.08;

      // Update Lighting and Atmosphere based on selected Time of Day
      const currentTOD = stateRef.current.timeOfDay;
      if (currentTOD === 'sunset') {
        sunLight.color.setHex(0xffaa50);
        sunLight.intensity = 2.4;
        ambientLight.color.setHex(0xffe8cc);
        ambientLight.intensity = 0.7;
        celestialMesh.material.color.setHex(0xffaa33);
        haloMat.opacity = 0.85;
        waterMat.color.setHex(0x0c1e33);
        waterMat.roughness = 0.15;
        if (scene.fog) scene.fog.color.setHex(0x1a0f28);
      } else if (currentTOD === 'twilight') {
        sunLight.color.setHex(0xe85d04);
        sunLight.intensity = 1.3;
        ambientLight.color.setHex(0xd00000);
        ambientLight.intensity = 0.45;
        celestialMesh.material.color.setHex(0xd00000);
        haloMat.opacity = 0.5;
        waterMat.color.setHex(0x081020);
        waterMat.roughness = 0.2;
        if (scene.fog) scene.fog.color.setHex(0x10002b);
      } else {
        // night
        sunLight.color.setHex(0x60a5fa); // moonlight
        sunLight.intensity = 0.9;
        ambientLight.color.setHex(0x1e1b4b);
        ambientLight.intensity = 0.35;
        celestialMesh.material.color.setHex(0xf8fafc); // bright moon
        haloMat.opacity = 0.35;
        waterMat.color.setHex(0x030712);
        waterMat.roughness = 0.1;
        if (scene.fog) scene.fog.color.setHex(0x030712);
      }

      // Ship floating physics on water
      const wave = Math.sin(elapsedTime * 1.5) * 0.25;
      const roll = Math.sin(elapsedTime * 1.2) * 0.025;
      const pitch = Math.cos(elapsedTime * 1.0) * 0.015;

      shipGroup.position.y = wave;
      shipGroup.rotation.z = roll;
      shipGroup.rotation.x = pitch;

      // Water ripple animation (vertex modulation)
      const posAttr = waterGeom.attributes.position;
      for (let i = 0; i < posAttr.count; i++) {
        const u = posAttr.getX(i);
        const v = posAttr.getZ(i);
        const yVal = Math.sin(u * 0.15 + elapsedTime * 1.8) * 0.35 +
                     Math.cos(v * 0.12 + elapsedTime * 1.4) * 0.25;
        posAttr.setY(i, yVal);
      }
      waterGeom.computeVertexNormals();
      posAttr.needsUpdate = true;

      // Slowly pulse wake
      wake.scale.x = 1.0 + Math.sin(elapsedTime * 2.0) * 0.08;
      wakeMat.opacity = 0.25 + Math.sin(elapsedTime * 1.5) * 0.08;

      // Particles float slowly upwards
      const pPositions = particleGeom.attributes.position.array as Float32Array;
      for (let i = 1; i < particlePositions.length; i += 3) {
        pPositions[i] += 0.035;
        if (pPositions[i] > 30) {
          pPositions[i] = 0.5;
        }
      }
      particleGeom.attributes.position.needsUpdate = true;

      // CAMERA INTERACTION (Inspection vs Parallax Scroll)
      if (stateRef.current.isInspecting) {
        // Orbit around ship
        const dist = 36;
        const oX = stateRef.current.orbitAngleX;
        const oY = stateRef.current.orbitAngleY;
        camera.position.x = Math.sin(oX) * Math.cos(oY) * dist;
        camera.position.y = Math.sin(oY) * dist + 4;
        camera.position.z = Math.cos(oX) * Math.cos(oY) * dist;
        camera.lookAt(0, 4.5, 0);
      } else {
        // Parallax + Scroll camera behavior
        const s = stateRef.current.scrollY; // 0 to 1
        const mx = stateRef.current.mouseX * 6;
        const my = stateRef.current.mouseY * 3;

        const view = stateRef.current.cameraView;
        if (view === 'side') {
          camera.position.set(28 + mx * 0.5, 10 + my * 0.5, 12 - s * 15);
          camera.lookAt(0, 4.5, 0);
        } else if (view === 'rooftop') {
          camera.position.set(0 + mx * 0.5, 20 + my * 0.5, 20 - s * 10);
          camera.lookAt(0, 7.0, -2);
        } else {
          // Default front cinematic dynamic scroll
          // At top: wide cinematic view
          // As user scrolls: glides smoothly beside and over the upper deck
          const targetCamX = 0 + mx + s * 18;
          const targetCamY = 12 + my - s * 3.5;
          const targetCamZ = 42 - s * 22;

          camera.position.x += (targetCamX - camera.position.x) * 0.05;
          camera.position.y += (targetCamY - camera.position.y) * 0.05;
          camera.position.z += (targetCamZ - camera.position.z) * 0.05;

          const lookTargetY = 5.0 + s * 2.0;
          camera.lookAt(mx * 0.3, lookTargetY, 0);
        }
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[580px] lg:h-[680px] overflow-hidden select-none bg-[#090b10]">
      {/* 3D WebGL Canvas */}
      <div
        ref={containerRef}
        className={`absolute inset-0 w-full h-full ${
          isInspecting ? 'cursor-grab active:cursor-grabbing' : 'cursor-default'
        }`}
      />

      {/* Floating Atmosphere & Camera Controls (Human Web Design Tokens) */}
      <div className="absolute top-5 right-5 sm:top-6 sm:right-6 z-20 flex flex-col items-end gap-2.5 pointer-events-auto">
        {/* Time of Day Segmented Control */}
        <div className="bg-[#10131b]/95 border border-white/10 rounded-full p-1 flex items-center gap-1 shadow-xl">
          <button
            onClick={() => setTimeOfDay('sunset')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              timeOfDay === 'sunset'
                ? 'bg-[#e59a34] text-[#090b10] font-semibold'
                : 'text-white/60 hover:text-white'
            }`}
            title="รอบซันเซ็ต ชมพระอาทิตย์ตก"
          >
            <Sunset className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">17:30 ซันเซ็ต</span>
          </button>
          <button
            onClick={() => setTimeOfDay('twilight')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              timeOfDay === 'twilight'
                ? 'bg-[#9333ea] text-white font-semibold'
                : 'text-white/60 hover:text-white'
            }`}
            title="รอบทไวไลท์ แสงทไวไลท์"
          >
            <Sun className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">18:30 ทไวไลท์</span>
          </button>
          <button
            onClick={() => setTimeOfDay('night')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              timeOfDay === 'night'
                ? 'bg-[#2563eb] text-white font-semibold'
                : 'text-white/60 hover:text-white'
            }`}
            title="รอบดินเนอร์ ราตรี"
          >
            <Moon className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">20:00 ดินเนอร์</span>
          </button>
        </div>

        {/* 3D Orbit / View Angle Switcher */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsInspecting(!isInspecting)}
            className={`flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              isInspecting
                ? 'bg-white text-black font-semibold border-white shadow-lg'
                : 'bg-[#10131b]/95 text-white/70 hover:text-white border-white/10'
            }`}
          >
            <Rotate3d className="w-3.5 h-3.5" />
            <span>{isInspecting ? 'หมุน 360° (คลิกลากได้)' : 'หมุนดูรอบลำเรือ 3D'}</span>
          </button>

          {!isInspecting && (
            <div className="hidden sm:flex items-center gap-1 bg-[#10131b]/95 rounded-full p-1 border border-white/10 text-xs">
              <button
                onClick={() => setCameraAngle('front')}
                className={`px-2.5 py-1 rounded-full transition-colors ${
                  cameraAngle === 'front'
                    ? 'bg-white/15 text-white font-medium'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                มุมหน้า
              </button>
              <button
                onClick={() => setCameraAngle('rooftop')}
                className={`px-2.5 py-1 rounded-full transition-colors ${
                  cameraAngle === 'rooftop'
                    ? 'bg-white/15 text-white font-medium'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                มุมดาดฟ้า
              </button>
              <button
                onClick={() => setCameraAngle('side')}
                className={`px-2.5 py-1 rounded-full transition-colors ${
                  cameraAngle === 'side'
                    ? 'bg-white/15 text-white font-medium'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                มุมข้าง
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Floating Status / Scroll Hint HUD */}
      <div className="absolute bottom-6 left-5 sm:left-8 z-20 pointer-events-none flex items-center gap-3">
        <div className="bg-[#10131b]/95 border border-white/10 px-3.5 py-2 rounded-lg text-xs text-white/80 flex items-center gap-2.5 shadow-xl font-mono">
          <span className="w-2 h-2 rounded-full bg-[#e59a34] animate-pulse" />
          <span>
            {isInspecting
              ? 'คลิกลากเมาส์ / สัมผัสหน้าจอเพื่อหมุนมุมมอง 360°'
              : 'เลื่อนเมาส์หรือสกอร์หน้าเว็บ เพื่อเคลื่อนมุมมองเรือสำราญ 3D'}
          </span>
        </div>
      </div>

      {/* Atmospheric Bottom Mask to Page Content */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#090b10] via-[#090b10]/80 to-transparent pointer-events-none" />
    </div>
  );
};
