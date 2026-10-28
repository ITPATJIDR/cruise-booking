import React, { useState } from 'react';
import { CRUISE_SHIPS, PIER_LOCATIONS } from '../data/cruises';
import { CruiseShip, PierLocation } from '../types/cruise';
import { InteractiveRiverMap } from '../components/InteractiveRiverMap';
import { ThreeRiverMap3D } from '../components/ThreeRiverMap3D';
import { Map, Grid, ArrowUpRight, Star, Train, MapPin, Box } from 'lucide-react';

interface CruisesPageProps {
  onSelectShip: (ship: CruiseShip) => void;
  selectedShipId?: string | null;
}

export const CruisesPage: React.FC<CruisesPageProps> = ({ onSelectShip, selectedShipId }) => {
  const [viewMode, setViewMode] = useState<'3d' | 'map' | 'grid'>('3d');
  const [activePier, setActivePier] = useState<PierLocation>('All');

  const filteredShips = CRUISE_SHIPS.filter(
    (ship) => activePier === 'All' || ship.pier === activePier
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[var(--line)] pb-6">
        <div className="space-y-1.5 max-w-xl">
          <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text)] tracking-tight">
            แผนที่แม่น้ำเจ้าพระยา & ท่าเรือ 9 ลำ
          </h1>
          <p className="text-sm text-[var(--muted)] leading-relaxed font-light">
            ดูตำแหน่งท่าเรือ เส้นทางล่องเรือ และจุดจอดของเรือทั้ง 9 ลำ บนแผนที่ 3D หรือแผนที่จริง
          </p>
        </div>

        {/* View Mode Switcher */}
        <div className="flex items-center gap-1 bg-[var(--surface-2)] p-1 rounded-full border border-[var(--line)] shrink-0 text-xs shadow-sm">
          <button
            onClick={() => setViewMode('3d')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
              viewMode === '3d'
                ? 'bg-[var(--accent)] text-white font-semibold shadow-sm'
                : 'text-[var(--muted)] hover:text-[var(--text)]'
            }`}
          >
            <Box className="w-3.5 h-3.5" />
            <span>แผนที่แม่น้ำ 3D</span>
          </button>

          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
              viewMode === 'map'
                ? 'bg-[var(--ink)] text-[var(--on-ink)] font-semibold shadow-sm'
                : 'text-[var(--muted)] hover:text-[var(--text)]'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>แผนที่จริง 2D</span>
          </button>

          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full font-medium transition-colors cursor-pointer ${
              viewMode === 'grid'
                ? 'bg-[var(--ink)] text-[var(--on-ink)] font-semibold shadow-sm'
                : 'text-[var(--muted)] hover:text-[var(--text)]'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>รายชื่อเรือ (9 ลำ)</span>
          </button>
        </div>
      </div>

      {/* Main View Area */}
      {viewMode === '3d' && (
        <div className="space-y-10">
          {/* Interactive 3D Chao Phraya River Map */}
          <ThreeRiverMap3D
            onSelectShip={onSelectShip}
            selectedShipId={selectedShipId}
          />

          {/* 3 Major Piers Summary */}
          <div className="space-y-4 pt-2">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] tracking-tight">
                3 ท่าเรือหลักที่เรือออก
              </h2>
              <p className="text-xs sm:text-sm text-[var(--muted)]">
                เช็คจุดขึ้นเรือ การเดินทางด้วยรถไฟฟ้า และเรือที่ขึ้นจากแต่ละท่า
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {PIER_LOCATIONS.map((pier) => (
                <div key={pier.id} className="nautical-card p-5 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-[var(--text)]">{pier.name}</h3>
                      <span className="text-[10px] font-mono text-[var(--muted)]">{pier.nameEn}</span>
                    </div>

                    <p className="text-xs text-[var(--muted)] leading-relaxed font-light">
                      {pier.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[var(--line)] space-y-2 text-xs">
                    <p className="text-[var(--accent-strong)] text-[11px] font-medium flex items-center gap-1.5">
                      <Train className="w-3.5 h-3.5" />
                      <span>{pier.bts}</span>
                    </p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {pier.ships.map((s, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-sm bg-[var(--surface-2)] text-[10px] text-[var(--text)] border border-[var(--line)]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {viewMode === 'map' && (
        <div className="space-y-10">
          {/* Interactive 2D Map */}
          <InteractiveRiverMap
            onSelectShip={onSelectShip}
            selectedShipId={selectedShipId}
          />

          {/* 3 Major Piers Summary */}
          <div className="space-y-4 pt-2">
            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] tracking-tight">
                3 ท่าเรือหลักที่เรือออก
              </h2>
              <p className="text-xs sm:text-sm text-[var(--muted)]">
                เช็คจุดขึ้นเรือ การเดินทางด้วยรถไฟฟ้า และเรือที่ขึ้นจากแต่ละท่า
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {PIER_LOCATIONS.map((pier) => (
                <div key={pier.id} className="nautical-card p-5 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-bold text-[var(--text)]">{pier.name}</h3>
                      <span className="text-[10px] font-mono text-[var(--muted)]">{pier.nameEn}</span>
                    </div>

                    <p className="text-xs text-[var(--muted)] leading-relaxed font-light">
                      {pier.description}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-[var(--line)] space-y-2 text-xs">
                    <p className="text-[var(--accent-strong)] text-[11px] font-medium flex items-center gap-1.5">
                      <Train className="w-3.5 h-3.5" />
                      <span>{pier.bts}</span>
                    </p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {pier.ships.map((s, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-sm bg-[var(--surface-2)] text-[10px] text-[var(--text)] border border-[var(--line)]"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {viewMode === 'grid' && (
        <div className="space-y-6">
          {/* Pier Filter tabs */}
          <div className="flex items-center gap-2 overflow-x-auto text-xs pb-2">
            {(['All', 'ICONSIAM', 'Asiatique', 'River City Bangkok'] as const).map((pier) => (
              <button
                key={pier}
                onClick={() => setActivePier(pier)}
                className={`px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
                  activePier === pier
                    ? 'bg-[var(--ink)] text-[var(--on-ink)] font-semibold shadow-sm'
                    : 'bg-white text-[var(--muted)] hover:text-[var(--text)] border border-[var(--line)]'
                }`}
              >
                {pier === 'All' ? 'ทั้งหมด (9 ลำ)' : pier}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredShips.map((ship) => (
              <div
                key={ship.id}
                onClick={() => onSelectShip(ship)}
                className="nautical-card overflow-hidden cursor-pointer group flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                  <img
                    src={ship.images.hero}
                    alt={ship.nameTh}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-90" />
                  
                  {/* Pier Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 rounded-full text-[11px] font-mono shadow-md flex items-center gap-1.5 backdrop-blur-xs font-semibold tracking-wide text-white bg-black/60 border border-white/20">
                    <MapPin className="w-3 h-3 text-orange-400" />
                    <span>{ship.pier}</span>
                  </div>

                  {/* Rating & Badge */}
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs">
                    <span className="text-white font-semibold text-[11px] bg-black/70 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-white/20">
                      {ship.badge}
                    </span>
                    <span className="text-amber-300 font-bold flex items-center gap-1 num bg-black/70 backdrop-blur-xs px-2.5 py-0.5 rounded-full border border-white/20">
                      <Star className="w-3 h-3 fill-amber-300 text-amber-300" />
                      <span>{ship.rating}</span>
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-3.5 bg-white">
                  <div>
                    <h3 className="text-base font-bold text-[var(--text)] group-hover:text-orange-600 transition-colors">
                      {ship.nameTh}
                    </h3>
                    <p className="text-xs text-[var(--muted)] font-mono">{ship.nameEn}</p>
                  </div>

                  <p className="text-xs text-[var(--muted)] line-clamp-2 leading-relaxed font-light">
                    {ship.tagline}
                  </p>

                  <div className="flex items-center gap-2.5 text-[11px] font-mono text-slate-500 pt-1">
                    <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200/60 font-semibold">{ship.decks} ชั้นดาดฟ้า</span>
                    <span className="px-2 py-0.5 rounded-md bg-sky-50 text-sky-900 border border-sky-200/60 font-semibold">{ship.capacity} ที่นั่ง</span>
                  </div>

                  <div className="pt-3 border-t border-amber-900/10 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-[var(--muted)] uppercase font-mono block font-medium">
                        ราคาเริ่มต้น / ท่าน
                      </span>
                      <p className="text-lg font-bold text-orange-600 num">
                        ฿{ship.startingPrice.toLocaleString()}.-
                      </p>
                    </div>

                    <span className="inline-flex items-center gap-1 text-xs text-amber-800 group-hover:text-orange-600 transition-colors font-semibold">
                      <span>ดูโต๊ะ & ราคา</span>
                      <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
