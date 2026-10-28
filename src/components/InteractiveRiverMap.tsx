import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { CruiseShip, PierLocation } from '../types/cruise';
import { CRUISE_SHIPS, PIER_LOCATIONS } from '../data/cruises';
import { Navigation, ZoomIn, ZoomOut, RotateCcw, Info } from 'lucide-react';

interface InteractiveRiverMapProps {
  onSelectShip: (ship: CruiseShip) => void;
  selectedShipId?: string | null;
}

export const InteractiveRiverMap: React.FC<InteractiveRiverMapProps> = ({
  onSelectShip,
  selectedShipId,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [key: string]: L.Marker }>({});
  const [activePier, setActivePier] = useState<PierLocation>('All');
  const [hoveredShip, setHoveredShip] = useState<CruiseShip | null>(null);

  // Center of Chao Phraya River showing Rama VIII down to Asiatique
  const defaultCenter: [number, number] = [13.7320, 100.5060];
  const defaultZoom = 13;

  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Initialize Leaflet Map
    const map = L.map(mapContainerRef.current, {
      center: defaultCenter,
      zoom: defaultZoom,
      zoomControl: false,
      attributionControl: false,
      minZoom: 12,
      maxZoom: 18,
    });
    mapInstanceRef.current = map;

    // CartoDB Dark Matter tile layer with CARTO API key & cache buster to bypass old watermarked tile cache
    const mapApiKey = 'cb1_4w2b_1_30911a97e5d9f5572751d59c';
    L.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/dark_all/{z}/{x}/{y}{r}.png?key=${mapApiKey}&v=2`, {
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    // River cruise path polyline along Chao Phraya (Rama III -> Asiatique -> ICONSIAM -> Rama VIII)
    const cruiseRouteCoords: [number, number][] = [
      [13.6885, 100.4935], // White Orchid (South Rama III)
      [13.6985, 100.5015], // Royal Galaxy (Asiatique Front)
      [13.7070, 100.5085], // Viva Alangka
      [13.7150, 100.5135], // Meridian Cruise (Taksin Bridge)
      [13.7230, 100.5085], // Saffron Cruise (Khlong San bend)
      [13.7325, 100.5015], // Smile Riverside (Memorial Bridge)
      [13.7425, 100.4915], // Alangka Cruise (Wat Arun)
      [13.7540, 100.4905], // Chao Phraya Princess (Grand Palace)
      [13.7660, 100.4975], // Wonderful Pearl (Rama VIII)
    ];

    L.polyline(cruiseRouteCoords, {
      color: '#38bdf8',
      weight: 3,
      opacity: 0.35,
      dashArray: '8, 8',
    }).addTo(map);

    // Pier Markers (Major Terminal Pins with landside callouts to prevent river clutter)
    PIER_LOCATIONS.forEach((pier) => {
      const isWestBank = pier.id === 'ICONSIAM';
      const shipCount = pier.ships.length;

      const pierHtml = isWestBank
        ? `
          <div class="relative flex items-center justify-end cursor-pointer group" style="transform: translate(-100%, -50%);">
            <div class="relative px-3 py-1.5 rounded-full bg-[#181622] border border-amber-400 text-amber-300 text-[11px] font-bold shadow-2xl flex items-center gap-1.5 whitespace-nowrap group-hover:scale-105 group-hover:border-amber-300 transition-all">
              <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>${pier.name}</span>
              <span class="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-400/20 text-amber-200 font-mono">${shipCount} ลำ</span>
            </div>
            <div class="w-3 h-0.5 bg-amber-400/70"></div>
            <div class="w-3 h-3 rounded-full bg-amber-400 border-2 border-black shrink-0 shadow-lg"></div>
          </div>
        `
        : `
          <div class="relative flex items-center justify-start cursor-pointer group" style="transform: translate(0%, -50%);">
            <div class="w-3 h-3 rounded-full bg-amber-400 border-2 border-black shrink-0 shadow-lg"></div>
            <div class="w-3 h-0.5 bg-amber-400/70"></div>
            <div class="relative px-3 py-1.5 rounded-full bg-[#181622] border border-amber-400 text-amber-300 text-[11px] font-bold shadow-2xl flex items-center gap-1.5 whitespace-nowrap group-hover:scale-105 group-hover:border-amber-300 transition-all">
              <span class="w-2 h-2 rounded-full bg-amber-400 animate-pulse"></span>
              <span>${pier.name}</span>
              <span class="text-[9px] px-1.5 py-0.5 rounded-full bg-amber-400/20 text-amber-200 font-mono">${shipCount} ลำ</span>
            </div>
          </div>
        `;

      const pierIcon = L.divIcon({
        className: 'custom-pier-icon',
        html: pierHtml,
        iconSize: [0, 0],
        iconAnchor: [0, 0],
      });

      const marker = L.marker([pier.coordinates.lat, pier.coordinates.lng], { icon: pierIcon }).addTo(map);
      marker.on('click', () => {
        handlePierFilter(pier.id);
      });
    });

    // Ship Markers (9 Luxury Cruise Ships evenly spaced along river channel)
    CRUISE_SHIPS.forEach((ship) => {
      const shipIcon = L.divIcon({
        className: `custom-ship-icon ship-marker-${ship.id}`,
        html: `
          <div id="ship-pin-${ship.id}" class="group relative flex flex-col items-center -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-opacity duration-300">
            <div class="px-2.5 py-1 rounded-xl bg-[#0d0f15]/95 border border-white/20 text-white text-xs font-semibold shadow-xl flex items-center gap-1.5 group-hover:border-amber-400 group-hover:text-amber-300 transition-all group-hover:scale-110 backdrop-blur-sm">
              <svg class="w-3.5 h-3.5 text-amber-400 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
                <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-9-4-9 4c0 2.9.94 5.34 2.81 7.76"/>
                <path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6"/>
                <path d="M12 10v4"/>
                <path d="M12 2v3"/>
              </svg>
              <span class="whitespace-nowrap font-medium">${ship.nameTh}</span>
              <span class="text-[10px] text-amber-300/80 font-mono">฿${ship.startingPrice}</span>
            </div>
            <div class="w-1.5 h-1.5 rounded-full bg-amber-400 mt-1 shadow-md group-hover:scale-150 transition-transform"></div>
          </div>
        `,
        iconSize: [0, 0],
        iconAnchor: [0, 0],
      });

      const marker = L.marker([ship.coordinates.lat, ship.coordinates.lng], { icon: shipIcon }).addTo(map);
      marker.on('click', () => {
        map.flyTo([ship.coordinates.lat, ship.coordinates.lng], 15, { duration: 0.8 });
        onSelectShip(ship);
      });
      marker.on('mouseover', () => setHoveredShip(ship));
      marker.on('mouseout', () => setHoveredShip(null));

      markersRef.current[ship.id] = marker;
    });

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update selected ship highlight & pan
  useEffect(() => {
    if (!selectedShipId || !mapInstanceRef.current) return;
    const targetShip = CRUISE_SHIPS.find((s) => s.id === selectedShipId);
    if (targetShip) {
      mapInstanceRef.current.flyTo([targetShip.coordinates.lat, targetShip.coordinates.lng], 15, {
        duration: 0.8,
      });
    }
  }, [selectedShipId]);

  // Sync marker opacity when activePier changes
  useEffect(() => {
    CRUISE_SHIPS.forEach((ship) => {
      const pinEl = document.getElementById(`ship-pin-${ship.id}`);
      if (pinEl) {
        if (activePier === 'All' || ship.pier === activePier) {
          pinEl.style.opacity = '1';
          pinEl.style.filter = 'none';
        } else {
          pinEl.style.opacity = '0.25';
          pinEl.style.filter = 'grayscale(80%)';
        }
      }
    });
  }, [activePier]);

  // Pier filter handler
  const handlePierFilter = (pierId: PierLocation) => {
    setActivePier(pierId);
    if (!mapInstanceRef.current) return;

    if (pierId === 'All') {
      mapInstanceRef.current.flyTo(defaultCenter, defaultZoom, { duration: 0.8 });
    } else if (pierId === 'ICONSIAM') {
      mapInstanceRef.current.flyTo([13.7320, 100.5020], 13.5, { duration: 0.8 });
    } else if (pierId === 'Asiatique') {
      mapInstanceRef.current.flyTo([13.7020, 100.5050], 14, { duration: 0.8 });
    } else if (pierId === 'River City Bangkok') {
      mapInstanceRef.current.flyTo([13.7480, 100.5060], 13.5, { duration: 0.8 });
    }
  };

  const filteredShips = CRUISE_SHIPS.filter((ship) => {
    return activePier === 'All' || ship.pier === activePier;
  });

  return (
    <div className="space-y-4">
      {/* Map Filter Controls Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-2xl bg-[#0f1117] border border-white/5 text-xs">
        <div className="flex items-center gap-1.5 overflow-x-auto">
          <span className="text-white/40 font-mono mr-1">ท่าเรือ:</span>
          {(['All', 'ICONSIAM', 'Asiatique', 'River City Bangkok'] as const).map((pier) => (
            <button
              key={pier}
              onClick={() => handlePierFilter(pier)}
              className={`px-3 py-1.5 rounded-xl font-medium transition-colors ${
                activePier === pier
                  ? 'bg-white text-black font-semibold'
                  : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              {pier === 'All' ? 'ทั้งหมด (9 ลำ)' : pier}
            </button>
          ))}
        </div>

        {/* Map Zoom Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => mapInstanceRef.current?.zoomIn()}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 transition-colors"
            title="ซูมเข้า"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => mapInstanceRef.current?.zoomOut()}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 transition-colors"
            title="ซูมออก"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => mapInstanceRef.current?.flyTo(defaultCenter, defaultZoom, { duration: 0.8 })}
            className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/70 transition-colors"
            title="รีเซ็ตตำแหน่ง"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Real Leaflet Map Container */}
      <div className="relative w-full h-[520px] sm:h-[620px] rounded-3xl overflow-hidden border border-white/10 bg-[#090b10] shadow-2xl">
        {/* Leaflet DOM container */}
        <div ref={mapContainerRef} className="w-full h-full z-0" />

        {/* Floating Hover Card */}
        {hoveredShip && (
          <div className="absolute bottom-4 left-4 z-10 p-3 rounded-2xl bg-[#12141e]/95 border border-white/15 backdrop-blur-md shadow-2xl flex items-center gap-3 max-w-sm pointer-events-none animate-in fade-in duration-150">
            <img
              src={hoveredShip.images.hero}
              alt={hoveredShip.nameTh}
              className="w-16 h-14 rounded-xl object-cover shrink-0"
            />
            <div className="overflow-hidden text-xs">
              <h4 className="font-bold text-white truncate">{hoveredShip.nameTh}</h4>
              <p className="text-[11px] text-white/50">{hoveredShip.pier}</p>
              <p className="text-amber-400 font-semibold mt-0.5">
                เริ่มต้น ฿{hoveredShip.startingPrice.toLocaleString()}.- · คลิกเพื่อดูรายละเอียด
              </p>
            </div>
          </div>
        )}

        {/* Tip Indicator */}
        <div className="absolute bottom-4 right-4 z-10 px-3 py-1.5 rounded-full bg-black/80 border border-white/10 backdrop-blur-md text-[11px] text-white/60 flex items-center gap-1.5 pointer-events-none">
          <Info className="w-3.5 h-3.5 text-amber-400" />
          <span>คลิกที่หมุดเรือเพื่อเปิด Side Modal ด้านขวา</span>
        </div>
      </div>

      {/* Quick Ship Cards Row under Map */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
        {filteredShips.slice(0, 3).map((ship) => (
          <div
            key={ship.id}
            onClick={() => {
              if (mapInstanceRef.current) {
                mapInstanceRef.current.flyTo([ship.coordinates.lat, ship.coordinates.lng], 16, { duration: 0.8 });
              }
              onSelectShip(ship);
            }}
            className="minimal-card p-3.5 flex items-center justify-between cursor-pointer group"
          >
            <div className="flex items-center gap-3">
              <img
                src={ship.images.hero}
                alt={ship.nameTh}
                className="w-12 h-12 rounded-xl object-cover"
              />
              <div>
                <h4 className="text-sm font-semibold text-white group-hover:text-amber-300 transition-colors">
                  {ship.nameTh}
                </h4>
                <p className="text-xs text-white/50">{ship.pier} · ฿{ship.startingPrice.toLocaleString()}</p>
              </div>
            </div>
            <span className="text-xs text-white/40 group-hover:text-white transition-colors">
              เปิดข้อมูล →
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
