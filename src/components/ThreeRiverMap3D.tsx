import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { CruiseShip } from '../types/cruise';
import { CRUISE_SHIPS } from '../data/cruises';
import {
  Sunset,
  Sun,
  Moon,
  ArrowUpRight,
  Compass
} from 'lucide-react';

interface ThreeRiverMap3DProps {
  onSelectShip: (ship: CruiseShip) => void;
  selectedShipId?: string | null;
}

type TimeOfDay = 'sunset' | 'twilight' | 'night';

interface MapFocusTarget {
  name: string;
  x: number;
  y: number;
  z: number;
  camDist: number;
}

export const ThreeRiverMap3D: React.FC<ThreeRiverMap3DProps> = ({
  onSelectShip
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>('sunset');
  const [hoveredEntity, setHoveredEntity] = useState<{
    type: 'ship' | 'pier' | 'landmark';
    title: string;
    subtitle: string;
    price?: number;
    pier?: string;
    ship?: CruiseShip;
  } | null>(null);
  const [activeFocus, setActiveFocus] = useState<string>('overview');

  const stateRef = useRef({
    timeOfDay: 'sunset' as TimeOfDay,
    orbitX: 0.15,
    orbitY: 0.65,
    targetOrbitX: 0.15,
    targetOrbitY: 0.65,
    zoom: 85,
    targetZoom: 85,
    targetCenterX: 0,
    targetCenterZ: 0,
    currentCenterX: 0,
    currentCenterZ: 0,
    isDragging: false,
    lastX: 0,
    lastY: 0
  });

  useEffect(() => {
    stateRef.current.timeOfDay = timeOfDay;
  }, [timeOfDay]);

  const focusTargets: { [key: string]: MapFocusTarget } = {
    overview: { name: 'ภาพรวมแม่น้ำ', x: 0, y: 0, z: 0, camDist: 110 },
    iconsiam: { name: 'ท่าไอคอนสยาม', x: -6, y: 0, z: 35, camDist: 48 },
    asiatique: { name: 'ท่าเอเชียทีค', x: 4, y: 0, z: 85, camDist: 48 },
    rivercity: { name: 'ท่าริเวอร์ซิตี้', x: 12, y: 0, z: 15, camDist: 45 },
    watarun: { name: 'วัดอรุณฯ', x: -22, y: 0, z: -35, camDist: 45 }
  };

  const handleFocus = (key: string) => {
    setActiveFocus(key);
    const target = focusTargets[key];
    if (target) {
      stateRef.current.targetCenterX = target.x;
      stateRef.current.targetCenterZ = target.z;
      stateRef.current.targetZoom = target.camDist;
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // 1. SCENE SETUP (Vibrant Sunlit Atmosphere)
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0xfcf7ed);
    scene.fog = new THREE.FogExp2(0xfcf7ed, 0.0035);

    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0xfcf7ed);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 2. VIBRANT SUNLIGHT & SKY LIGHTING
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 0.95);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight(0xffaa44, 2.5);
    sunLight.position.set(-60, 50, -110);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.width = 1024;
    sunLight.shadow.mapSize.height = 1024;
    scene.add(sunLight);

    const skyFill = new THREE.DirectionalLight(0x7dd3fc, 0.6);
    skyFill.position.set(60, 35, 70);
    scene.add(skyFill);

    // 3. RIVERBANKS & PARKS (Fresh Sunlit Greenery & Warm Sand)
    const groundGeom = new THREE.PlaneGeometry(260, 320, 32, 32);
    groundGeom.rotateX(-Math.PI / 2);
    const groundMat = new THREE.MeshStandardMaterial({
      color: 0xede6d8,
      roughness: 0.85,
      metalness: 0.05
    });
    const ground = new THREE.Mesh(groundGeom, groundMat);
    ground.position.y = -0.5;
    ground.receiveShadow = true;
    scene.add(ground);

    // Green Riverside Parks
    const parkGeom = new THREE.PlaneGeometry(240, 300, 16, 16);
    parkGeom.rotateX(-Math.PI / 2);
    const parkMat = new THREE.MeshStandardMaterial({
      color: 0xdde6d0,
      roughness: 0.9
    });
    const parkMesh = new THREE.Mesh(parkGeom, parkMat);
    parkMesh.position.y = -0.48;
    scene.add(parkMesh);

    // 4. CHAO PHRAYA RIVER COURSE IN 3D
    const riverCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(14, 0, -130), // Rama VIII Bridge
      new THREE.Vector3(0, 0, -100),  // Phra Sumen
      new THREE.Vector3(-16, 0, -70), // Wat Phra Kaew (Grand Palace)
      new THREE.Vector3(-22, 0, -40), // Wat Arun
      new THREE.Vector3(-8, 0, -15),  // Memorial Bridge
      new THREE.Vector3(10, 0, 15),   // River City Bangkok
      new THREE.Vector3(-6, 0, 40),   // ICONSIAM
      new THREE.Vector3(8, 0, 65),    // Sathorn / Taksin Bridge
      new THREE.Vector3(2, 0, 90),    // Asiatique
      new THREE.Vector3(-12, 0, 130)  // Rama III
    ]);

    const riverPoints = riverCurve.getPoints(120);
    const riverGeom = new THREE.BufferGeometry();
    const riverVertices: number[] = [];
    const riverUvs: number[] = [];
    const riverIndices: number[] = [];
    const riverWidth = 14;

    for (let i = 0; i < riverPoints.length; i++) {
      const p = riverPoints[i];
      const nextP = riverPoints[Math.min(i + 1, riverPoints.length - 1)];
      const prevP = riverPoints[Math.max(i - 1, 0)];
      const tangent = nextP.clone().sub(prevP).normalize();
      const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();

      const left = p.clone().add(normal.clone().multiplyScalar(-riverWidth));
      const right = p.clone().add(normal.clone().multiplyScalar(riverWidth));

      riverVertices.push(left.x, left.y, left.z);
      riverVertices.push(right.x, right.y, right.z);

      const v = i / (riverPoints.length - 1);
      riverUvs.push(0, v);
      riverUvs.push(1, v);

      if (i < riverPoints.length - 1) {
        const base = i * 2;
        riverIndices.push(base, base + 1, base + 2);
        riverIndices.push(base + 1, base + 3, base + 2);
      }
    }

    riverGeom.setAttribute('position', new THREE.Float32BufferAttribute(riverVertices, 3));
    riverGeom.setAttribute('uv', new THREE.Float32BufferAttribute(riverUvs, 2));
    riverGeom.setIndex(riverIndices);
    riverGeom.computeVertexNormals();

    // Sparkling Turquoise & Sunlit Blue Water Material
    const riverMat = new THREE.MeshStandardMaterial({
      color: 0x1d709f,
      roughness: 0.15,
      metalness: 0.85,
      flatShading: true
    });
    const riverMesh = new THREE.Mesh(riverGeom, riverMat);
    riverMesh.position.y = 0.05;
    riverMesh.receiveShadow = true;
    scene.add(riverMesh);

    // Golden Sunlit Water Reflection Strip
    const reflectionGeom = new THREE.PlaneGeometry(16, 260);
    reflectionGeom.rotateX(-Math.PI / 2);
    const reflectionMat = new THREE.MeshBasicMaterial({
      color: 0xffa338,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending
    });
    const reflectionMesh = new THREE.Mesh(reflectionGeom, reflectionMat);
    reflectionMesh.position.set(-4, 0.12, 0);
    scene.add(reflectionMesh);

    // 5. 3D VIBRANT ARCHITECTURE & CITY BLOCKS
    const cityGroup = new THREE.Group();
    const buildingMatWhite = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.4 });
    const buildingMatCream = new THREE.MeshStandardMaterial({ color: 0xf4eee4, roughness: 0.5 });
    const buildingMatGlass = new THREE.MeshStandardMaterial({ color: 0x93c5fd, metalness: 0.7, roughness: 0.2 });

    for (let i = 0; i < riverPoints.length; i += 3) {
      const p = riverPoints[i];
      const tangent = (i < riverPoints.length - 1 ? riverPoints[i + 1] : p).clone().sub(p).normalize();
      const normal = new THREE.Vector3(-tangent.z, 0, tangent.x).normalize();

      // West bank building (Thonburi side)
      const wDist = riverWidth + 5 + Math.random() * 20;
      const wPos = p.clone().add(normal.clone().multiplyScalar(-wDist));
      const wH = 6 + Math.random() * 18;
      const wW = 4 + Math.random() * 6;
      const wD = 4 + Math.random() * 6;
      const bldgMat = i % 2 === 0 ? buildingMatWhite : buildingMatCream;
      const bldgW = new THREE.Mesh(new THREE.BoxGeometry(wW, wH, wD), bldgMat);
      bldgW.position.set(wPos.x, wH / 2 - 0.4, wPos.z);
      bldgW.castShadow = true;
      cityGroup.add(bldgW);

      // East bank building (Bangkok side)
      const eDist = riverWidth + 5 + Math.random() * 22;
      const ePos = p.clone().add(normal.clone().multiplyScalar(eDist));
      const eH = 8 + Math.random() * 26;
      const eW = 4 + Math.random() * 8;
      const eD = 4 + Math.random() * 7;
      const bldgMatE = i % 3 === 0 ? buildingMatGlass : buildingMatWhite;
      const bldgE = new THREE.Mesh(new THREE.BoxGeometry(eW, eH, eD), bldgMatE);
      bldgE.position.set(ePos.x, eH / 2 - 0.4, ePos.z);
      bldgE.castShadow = true;
      cityGroup.add(bldgE);
    }
    scene.add(cityGroup);

    // 6. 3D HISTORIC & MODERN LANDMARKS
    const landmarksGroup = new THREE.Group();

    // Wat Arun Pagoda (พระปรางค์วัดอรุณราชวราราม)
    const watArunGroup = new THREE.Group();
    watArunGroup.position.set(-25, 0, -40);

    const stupaBase = new THREE.Mesh(
      new THREE.CylinderGeometry(7, 8, 4, 8),
      new THREE.MeshStandardMaterial({ color: 0xfaf5ec, roughness: 0.3 })
    );
    stupaBase.position.y = 2;
    watArunGroup.add(stupaBase);

    const stupaSpire = new THREE.Mesh(
      new THREE.ConeGeometry(4.5, 26, 8),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.8, roughness: 0.25 })
    );
    stupaSpire.position.y = 15;
    watArunGroup.add(stupaSpire);

    for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 2) {
      const cornerStupa = new THREE.Mesh(
        new THREE.ConeGeometry(1.5, 9, 6),
        new THREE.MeshStandardMaterial({ color: 0xfaf5ec })
      );
      cornerStupa.position.set(Math.cos(angle) * 7.5, 4.5, Math.sin(angle) * 7.5);
      watArunGroup.add(cornerStupa);
    }
    landmarksGroup.add(watArunGroup);

    // Rama VIII Bridge (สะพานพระราม 8)
    const rama8Group = new THREE.Group();
    rama8Group.position.set(14, 0, -130);

    const pylon = new THREE.Mesh(
      new THREE.CylinderGeometry(1.2, 2.5, 38, 8),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.85, roughness: 0.2 })
    );
    pylon.position.set(-8, 19, 0);
    pylon.rotation.z = -0.15;
    rama8Group.add(pylon);

    const bridgeDeck = new THREE.Mesh(
      new THREE.BoxGeometry(34, 1.2, 5),
      new THREE.MeshStandardMaterial({ color: 0xffffff })
    );
    bridgeDeck.position.set(-4, 3.5, 0);
    rama8Group.add(bridgeDeck);
    landmarksGroup.add(rama8Group);

    // Asiatique Ferris Wheel (เอเชียทีค สกาย)
    const asiatiqueGroup = new THREE.Group();
    asiatiqueGroup.position.set(22, 0, 90);

    const wheelHub = new THREE.Mesh(
      new THREE.TorusGeometry(10, 0.5, 12, 32),
      new THREE.MeshBasicMaterial({ color: 0x0284c7 })
    );
    wheelHub.position.y = 13;
    wheelHub.rotation.y = Math.PI / 2;
    asiatiqueGroup.add(wheelHub);

    const wheelLeg1 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.6, 14),
      new THREE.MeshStandardMaterial({ color: 0x94a3b8 })
    );
    wheelLeg1.position.set(0, 7, -3);
    wheelLeg1.rotation.x = -0.25;
    asiatiqueGroup.add(wheelLeg1);

    const wheelLeg2 = new THREE.Mesh(
      new THREE.CylinderGeometry(0.3, 0.6, 14),
      new THREE.MeshStandardMaterial({ color: 0x94a3b8 })
    );
    wheelLeg2.position.set(0, 7, 3);
    wheelLeg2.rotation.x = 0.25;
    asiatiqueGroup.add(wheelLeg2);
    landmarksGroup.add(asiatiqueGroup);

    // ICONSIAM Complex Building
    const iconsiamGroup = new THREE.Group();
    iconsiamGroup.position.set(-18, 0, 40);

    const iconMall = new THREE.Mesh(
      new THREE.BoxGeometry(16, 14, 22),
      new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.7, roughness: 0.25 })
    );
    iconMall.position.y = 7;
    iconsiamGroup.add(iconMall);

    const iconTower = new THREE.Mesh(
      new THREE.BoxGeometry(8, 38, 8),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.8, roughness: 0.15 })
    );
    iconTower.position.set(-4, 19, -4);
    iconsiamGroup.add(iconTower);
    landmarksGroup.add(iconsiamGroup);

    scene.add(landmarksGroup);

    // 7. 3D INTERACTIVE PIER BEACONS (3 Major Harbors)
    const pierInteractiveObjects: THREE.Object3D[] = [];
    const piersGroup = new THREE.Group();

    const pierDataList = [
      { id: 'ICONSIAM', name: 'ท่าเรือไอคอนสยาม', pier: 'ICONSIAM', x: -8, z: 38 },
      { id: 'Asiatique', name: 'ท่าเรือเอเชียทีค', pier: 'Asiatique', x: 12, z: 88 },
      { id: 'River City Bangkok', name: 'ท่าเรือริเวอร์ซิตี้', pier: 'River City Bangkok', x: 11, z: 15 }
    ];

    pierDataList.forEach((pier) => {
      const pierMeshGroup = new THREE.Group();
      pierMeshGroup.position.set(pier.x, 0, pier.z);

      const dock = new THREE.Mesh(
        new THREE.BoxGeometry(8, 0.8, 6),
        new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.3 })
      );
      dock.position.y = 0.4;
      pierMeshGroup.add(dock);

      const beaconPole = new THREE.Mesh(
        new THREE.CylinderGeometry(0.25, 0.35, 6, 8),
        new THREE.MeshStandardMaterial({ color: 0xf97316, metalness: 0.8 })
      );
      beaconPole.position.y = 3;
      pierMeshGroup.add(beaconPole);

      const beaconGem = new THREE.Mesh(
        new THREE.SphereGeometry(1.0, 16, 16),
        new THREE.MeshBasicMaterial({ color: 0xf97316 })
      );
      beaconGem.position.y = 6.2;
      pierMeshGroup.add(beaconGem);

      const ring = new THREE.Mesh(
        new THREE.RingGeometry(1.6, 2.4, 32),
        new THREE.MeshBasicMaterial({ color: 0xf97316, side: THREE.DoubleSide, transparent: true, opacity: 0.8 })
      );
      ring.rotation.x = -Math.PI / 2;
      ring.position.y = 0.5;
      pierMeshGroup.add(ring);

      pierMeshGroup.userData = {
        type: 'pier',
        pierId: pier.id,
        name: pier.name
      };
      pierInteractiveObjects.push(pierMeshGroup);
      piersGroup.add(pierMeshGroup);
    });
    scene.add(piersGroup);

    // 8. 3D CRUISE FLEET ON THE RIVER (9 SHIPS)
    const shipInteractiveObjects: THREE.Object3D[] = [];
    const fleetGroup = new THREE.Group();

    const createCruiseModel = (shipData: CruiseShip) => {
      const boat = new THREE.Group();

      // Hull
      const hullGeom = new THREE.BoxGeometry(3.6, 1.4, 9.5);
      const hullMat = new THREE.MeshStandardMaterial({
        color: 0x0f172a,
        metalness: 0.5,
        roughness: 0.3
      });
      const hull = new THREE.Mesh(hullGeom, hullMat);
      hull.position.y = 0.8;
      hull.castShadow = true;
      boat.add(hull);

      // Gold Waterline
      const trim = new THREE.Mesh(
        new THREE.BoxGeometry(3.7, 0.25, 9.6),
        new THREE.MeshStandardMaterial({ color: 0xf97316, metalness: 0.9 })
      );
      trim.position.y = 0.6;
      boat.add(trim);

      // Main Deck Cabin
      const cabinGeom = new THREE.BoxGeometry(3.0, 1.2, 7.5);
      const cabinMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2 });
      const cabin = new THREE.Mesh(cabinGeom, cabinMat);
      cabin.position.set(0, 1.9, -0.4);
      cabin.castShadow = true;
      boat.add(cabin);

      // Glowing Windows
      const winStrip = new THREE.Mesh(
        new THREE.BoxGeometry(3.1, 0.5, 6.8),
        new THREE.MeshBasicMaterial({ color: 0xfef08a, transparent: true, opacity: 0.9 })
      );
      winStrip.position.set(0, 1.9, -0.4);
      boat.add(winStrip);

      // Rooftop Deck
      const roofDeck = new THREE.Mesh(
        new THREE.BoxGeometry(2.8, 0.4, 6.5),
        new THREE.MeshStandardMaterial({ color: 0x334155 })
      );
      roofDeck.position.set(0, 2.7, -0.4);
      boat.add(roofDeck);

      // White Awning
      const awning = new THREE.Mesh(
        new THREE.BoxGeometry(2.5, 0.1, 4.0),
        new THREE.MeshStandardMaterial({ color: 0xffffff })
      );
      awning.position.set(0, 3.4, -0.8);
      boat.add(awning);

      // White Wake
      const wake = new THREE.Mesh(
        new THREE.PlaneGeometry(3.2, 5.0),
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5 })
      );
      wake.rotation.x = -Math.PI / 2;
      wake.position.set(0, 0.1, 6.0);
      boat.add(wake);

      boat.userData = {
        type: 'ship',
        ship: shipData,
        id: shipData.id,
        nameTh: shipData.nameTh,
        nameEn: shipData.nameEn,
        startingPrice: shipData.startingPrice,
        pier: shipData.pier
      };

      return boat;
    };

    const shipSplineOffsets = [
      0.12, 0.22, 0.32, 0.44, 0.54, 0.62, 0.72, 0.82, 0.92
    ];

    CRUISE_SHIPS.forEach((ship, idx) => {
      const u = shipSplineOffsets[idx % shipSplineOffsets.length];
      const pos = riverCurve.getPointAt(u);
      const tangent = riverCurve.getTangentAt(u).normalize();

      const boat = createCruiseModel(ship);
      boat.position.set(pos.x, 0, pos.z);

      const angle = Math.atan2(tangent.x, tangent.z);
      boat.rotation.y = angle;

      fleetGroup.add(boat);
      shipInteractiveObjects.push(boat);
    });
    scene.add(fleetGroup);

    // 9. RAYCASTING & INTERACTION
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (stateRef.current.isDragging) {
        const deltaX = e.clientX - stateRef.current.lastX;
        const deltaY = e.clientY - stateRef.current.lastY;
        stateRef.current.targetOrbitX += deltaX * 0.007;
        stateRef.current.targetOrbitY = Math.max(
          0.2,
          Math.min(1.3, stateRef.current.targetOrbitY + deltaY * 0.005)
        );
        stateRef.current.lastX = e.clientX;
        stateRef.current.lastY = e.clientY;
      } else {
        raycaster.setFromCamera(mouse, camera);
        const intersectables = [...shipInteractiveObjects, ...pierInteractiveObjects];
        const intersects = raycaster.intersectObjects(intersectables, true);

        if (intersects.length > 0) {
          let topObj = intersects[0].object;
          while (topObj.parent && !topObj.userData.type && topObj.parent !== scene) {
            topObj = topObj.parent;
          }

          if (topObj.userData.type === 'ship') {
            const s = topObj.userData.ship as CruiseShip;
            setHoveredEntity({
              type: 'ship',
              title: s.nameTh,
              subtitle: s.nameEn,
              price: s.startingPrice,
              pier: s.pier,
              ship: s
            });
            container.style.cursor = 'pointer';
          } else if (topObj.userData.type === 'pier') {
            setHoveredEntity({
              type: 'pier',
              title: topObj.userData.name,
              subtitle: `จุดเทียบเรือ ${topObj.userData.pierId}`,
              pier: topObj.userData.pierId
            });
            container.style.cursor = 'pointer';
          }
        } else {
          setHoveredEntity(null);
          container.style.cursor = 'grab';
        }
      }
    };

    const handlePointerDown = (e: MouseEvent) => {
      stateRef.current.isDragging = true;
      stateRef.current.lastX = e.clientX;
      stateRef.current.lastY = e.clientY;
      container.style.cursor = 'grabbing';
    };

    const handlePointerUp = (e: MouseEvent) => {
      const wasDragging = Math.abs(e.clientX - stateRef.current.lastX) > 4 ||
                          Math.abs(e.clientY - stateRef.current.lastY) > 4;
      stateRef.current.isDragging = false;
      container.style.cursor = 'grab';

      if (!wasDragging) {
        raycaster.setFromCamera(mouse, camera);
        const intersectables = [...shipInteractiveObjects, ...pierInteractiveObjects];
        const intersects = raycaster.intersectObjects(intersectables, true);

        if (intersects.length > 0) {
          let topObj = intersects[0].object;
          while (topObj.parent && !topObj.userData.type && topObj.parent !== scene) {
            topObj = topObj.parent;
          }

          if (topObj.userData.type === 'ship') {
            const s = topObj.userData.ship as CruiseShip;
            onSelectShip(s);
          } else if (topObj.userData.type === 'pier') {
            const pId = topObj.userData.pierId;
            const matchingShip = CRUISE_SHIPS.find((sh) => sh.pier === pId);
            if (matchingShip) onSelectShip(matchingShip);
          }
        }
      }
    };

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      stateRef.current.targetZoom = Math.max(
        30,
        Math.min(160, stateRef.current.targetZoom + e.deltaY * 0.08)
      );
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        stateRef.current.isDragging = true;
        stateRef.current.lastX = e.touches[0].clientX;
        stateRef.current.lastY = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0 && stateRef.current.isDragging) {
        const deltaX = e.touches[0].clientX - stateRef.current.lastX;
        const deltaY = e.touches[0].clientY - stateRef.current.lastY;
        stateRef.current.targetOrbitX += deltaX * 0.007;
        stateRef.current.targetOrbitY = Math.max(
          0.2,
          Math.min(1.3, stateRef.current.targetOrbitY + deltaY * 0.005)
        );
        stateRef.current.lastX = e.touches[0].clientX;
        stateRef.current.lastY = e.touches[0].clientY;
      }
    };

    const handleTouchEnd = () => {
      stateRef.current.isDragging = false;
    };

    container.addEventListener('mousemove', handlePointerMove);
    container.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('mouseup', handlePointerUp);
    container.addEventListener('wheel', handleWheel, { passive: false });
    container.addEventListener('touchstart', handleTouchStart, { passive: true });
    container.addEventListener('touchmove', handleTouchMove, { passive: true });
    window.addEventListener('touchend', handleTouchEnd);

    const handleResize = () => {
      if (!container) return;
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(container.clientWidth, container.clientHeight);
    };
    window.addEventListener('resize', handleResize);

    // 10. ANIMATION RENDER LOOP
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const elapsedTime = clock.getElapsedTime();

      stateRef.current.orbitX += (stateRef.current.targetOrbitX - stateRef.current.orbitX) * 0.08;
      stateRef.current.orbitY += (stateRef.current.targetOrbitY - stateRef.current.orbitY) * 0.08;
      stateRef.current.zoom += (stateRef.current.targetZoom - stateRef.current.zoom) * 0.08;
      stateRef.current.currentCenterX += (stateRef.current.targetCenterX - stateRef.current.currentCenterX) * 0.08;
      stateRef.current.currentCenterZ += (stateRef.current.targetCenterZ - stateRef.current.currentCenterZ) * 0.08;

      const oX = stateRef.current.orbitX;
      const oY = stateRef.current.orbitY;
      const dist = stateRef.current.zoom;
      const cX = stateRef.current.currentCenterX;
      const cZ = stateRef.current.currentCenterZ;

      camera.position.x = cX + Math.sin(oX) * Math.cos(oY) * dist;
      camera.position.y = Math.sin(oY) * dist + 8;
      camera.position.z = cZ + Math.cos(oX) * Math.cos(oY) * dist;
      camera.lookAt(cX, 2, cZ);

      // Atmosphere Lighting updates
      const currentTOD = stateRef.current.timeOfDay;
      if (currentTOD === 'sunset') {
        sunLight.color.setHex(0xffaa44);
        sunLight.intensity = 2.6;
        ambientLight.color.setHex(0xfff5ea);
        ambientLight.intensity = 0.95;
        riverMat.color.setHex(0x1d709f);
        if (scene.background) (scene.background as THREE.Color).setHex(0xfcf7ed);
        if (scene.fog) scene.fog.color.setHex(0xfcf7ed);
      } else if (currentTOD === 'twilight') {
        sunLight.color.setHex(0xe85d04);
        sunLight.intensity = 1.6;
        ambientLight.color.setHex(0xe9d5ff);
        ambientLight.intensity = 0.7;
        riverMat.color.setHex(0x164e75);
        if (scene.background) (scene.background as THREE.Color).setHex(0xe4d6ea);
        if (scene.fog) scene.fog.color.setHex(0xe4d6ea);
      } else {
        // night
        sunLight.color.setHex(0x38bdf8);
        sunLight.intensity = 1.0;
        ambientLight.color.setHex(0x1e293b);
        ambientLight.intensity = 0.55;
        riverMat.color.setHex(0x0c1e33);
        if (scene.background) (scene.background as THREE.Color).setHex(0x0c1322);
        if (scene.fog) scene.fog.color.setHex(0x0c1322);
      }

      fleetGroup.children.forEach((boat, i) => {
        const offset = i * 0.8;
        boat.position.y = Math.sin(elapsedTime * 1.5 + offset) * 0.15;
        boat.rotation.z = Math.sin(elapsedTime * 1.2 + offset) * 0.02;
      });

      wheelHub.rotation.x = elapsedTime * 0.2;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handlePointerMove);
      container.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('mouseup', handlePointerUp);
      container.removeEventListener('wheel', handleWheel);
      container.removeEventListener('touchstart', handleTouchStart);
      container.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
      window.removeEventListener('resize', handleResize);
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full h-[620px] lg:h-[720px] overflow-hidden select-none bg-[var(--surface-2)] rounded-md border border-[var(--line)] shadow-lg">
      {/* 3D WebGL Canvas */}
      <div
        ref={containerRef}
        className="absolute inset-0 w-full h-full cursor-grab active:cursor-grabbing"
      />

      {/* Top Left: Focus Controls */}
      <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-1.5 pointer-events-auto">
        {Object.entries(focusTargets).map(([key, item]) => (
          <button
            key={key}
            onClick={() => handleFocus(key)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors cursor-pointer border shadow-sm ${
              activeFocus === key
                ? 'bg-[var(--accent)] text-white font-semibold border-[var(--accent)]'
                : 'bg-white/95 text-[var(--muted)] hover:text-[var(--text)] border-[var(--line)]'
            }`}
          >
            {item.name}
          </button>
        ))}
      </div>

      {/* Top Right: Time Switcher */}
      <div className="absolute top-4 right-4 z-20 flex items-center gap-1 bg-white/95 border border-[var(--line)] p-1 rounded-full shadow-md pointer-events-auto">
        <button
          onClick={() => setTimeOfDay('sunset')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
            timeOfDay === 'sunset'
              ? 'bg-[var(--accent)] text-white font-semibold shadow-sm'
              : 'text-[var(--muted)] hover:text-[var(--text)]'
          }`}
          title="17:30 ซันเซ็ต"
        >
          <Sunset className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">17:30 ซันเซ็ต</span>
        </button>
        <button
          onClick={() => setTimeOfDay('twilight')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
            timeOfDay === 'twilight'
              ? 'bg-purple-600 text-white font-semibold shadow-sm'
              : 'text-[var(--muted)] hover:text-[var(--text)]'
          }`}
          title="18:30 ทไวไลท์"
        >
          <Sun className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">18:30 ทไวไลท์</span>
        </button>
        <button
          onClick={() => setTimeOfDay('night')}
          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-colors cursor-pointer ${
            timeOfDay === 'night'
              ? 'bg-blue-600 text-white font-semibold shadow-sm'
              : 'text-[var(--muted)] hover:text-[var(--text)]'
          }`}
          title="20:00 ดินเนอร์"
        >
          <Moon className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">20:00 ดินเนอร์</span>
        </button>
      </div>

      {/* Bottom Center Hover Card */}
      {hoveredEntity && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 pointer-events-auto animate-in fade-in zoom-in-95 duration-150">
          <div
            onClick={() => {
              if (hoveredEntity.ship) onSelectShip(hoveredEntity.ship);
            }}
            className="nautical-card px-5 py-3.5 flex items-center gap-4 bg-white/95 shadow-2xl border border-[var(--accent)] cursor-pointer hover:bg-slate-50"
          >
            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-[var(--text)]">
                  {hoveredEntity.title}
                </span>
                {hoveredEntity.pier && (
                  <span className="nautical-tag text-[var(--accent-strong)] text-[10px]">
                    {hoveredEntity.pier}
                  </span>
                )}
              </div>
              <p className="text-xs text-[var(--muted)] font-mono">{hoveredEntity.subtitle}</p>
            </div>

            {hoveredEntity.price && (
              <div className="text-right pl-3 border-l border-[var(--line)]">
                <span className="text-[10px] text-[var(--muted)] block font-mono">เริ่มต้น</span>
                <span className="text-sm font-bold text-[var(--accent-strong)] num">
                  ฿{hoveredEntity.price.toLocaleString()}.-
                </span>
              </div>
            )}

            <span className="p-1.5 rounded-full bg-[var(--accent)] text-white shadow-sm">
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      )}

      {/* Bottom Left Legend HUD */}
      <div className="absolute bottom-4 left-4 z-20 pointer-events-none hidden sm:flex items-center gap-3">
        <div className="bg-white/95 border border-[var(--line)] px-3.5 py-2 rounded-md text-xs text-[var(--muted)] flex items-center gap-3 font-mono shadow-sm">
          <span className="flex items-center gap-1.5 text-[var(--text)] font-medium">
            <span className="w-2 h-2 rounded-full bg-[#f97316]" /> 3 ท่าเรือหลัก
          </span>
          <span className="flex items-center gap-1.5 text-[var(--text)] font-medium">
            <span className="w-2 h-2 rounded-full bg-[#0284c7]" /> 9 ลำเรือสำราญ
          </span>
          <span>คลิกลากเพื่อหมุน 3D · เลื่อน Scroll เพื่อซูม</span>
        </div>
      </div>
    </div>
  );
};
