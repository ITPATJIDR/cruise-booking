import React, { useState } from 'react';
import { CRUISE_SHIPS, PIER_LOCATIONS } from '../data/cruises';
import { CruiseShip, PierLocation } from '../types/cruise';
import { InteractiveRiverMap } from '../components/InteractiveRiverMap';
import { Map, Grid, ArrowUpRight, Compass, Star } from 'lucide-react';

interface CruisesPageProps {
  onSelectShip: (ship: CruiseShip) => void;
  selectedShipId?: string | null;
}

export const CruisesPage: React.FC<CruisesPageProps> = ({ onSelectShip, selectedShipId }) => {
  const [viewMode, setViewMode] = useState<'map' | 'grid'>('map');
  const [activePier, setActivePier] = useState<PierLocation>('All');

  const filteredShips = CRUISE_SHIPS.filter(
    (ship) => activePier === 'All' || ship.pier === activePier
  );

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Page Header (Minimal C-Level Hideout style) */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-white/5 pb-8">
        <div className="space-y-2">
          <span className="text-xs font-mono text-white/50 tracking-wider uppercase">
            Fleet & Harbors · 9 Ships
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
            ข้อมูลเรือสำราญ & ท่าเทียบเรือ
          </h1>
          <p className="text-sm text-white/60 max-w-xl leading-relaxed">
            คลิกที่หมุดบนแผนที่เพื่อดูข้อมูลเรือ รอบเวลา และราคาพิเศษผ่าน Side Modal ด้านขวา
          </p>
        </div>

        {/* View Switcher: Map vs Grid */}
        <div className="flex items-center gap-1 bg-[#12141c] p-1 rounded-2xl border border-white/5 shrink-0">
          <button
            onClick={() => setViewMode('map')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium transition-colors ${
              viewMode === 'map'
                ? 'bg-white text-black font-semibold shadow-sm'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>แผนที่ปักหมุด</span>
          </button>
          <button
            onClick={() => setViewMode('grid')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-medium transition-colors ${
              viewMode === 'grid'
                ? 'bg-white text-black font-semibold shadow-sm'
                : 'text-white/60 hover:text-white'
            }`}
          >
            <Grid className="w-3.5 h-3.5" />
            <span>การ์ดทั้งหมด (9 ลำ)</span>
          </button>
        </div>
      </div>

      {/* Main View Area */}
      {viewMode === 'map' ? (
        <div className="space-y-12">
          {/* Interactive Map Component */}
          <InteractiveRiverMap
            onSelectShip={onSelectShip}
            selectedShipId={selectedShipId}
          />

          {/* 3 Major Piers Clean Minimal Summary */}
          <div className="space-y-4 pt-4">
            <h2 className="text-lg font-bold text-white tracking-tight">
              ท่าเทียบเรือหลัก (3 ท่าเรือ)
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {PIER_LOCATIONS.map((pier) => (
                <div key={pier.id} className="minimal-card p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-white">{pier.name}</h3>
                    <span className="text-[10px] font-mono text-white/40">{pier.nameEn}</span>
                  </div>

                  <p className="text-xs text-white/60 leading-relaxed font-light">
                    {pier.description}
                  </p>

                  <div className="pt-2 border-t border-white/5 space-y-1.5 text-xs">
                    <p className="text-amber-400/90 text-[11px] font-medium">🚊 {pier.bts}</p>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {pier.ships.map((s, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded-md bg-white/[0.04] text-[10px] text-white/70"
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
      ) : (
        /* Minimal Grid View for all 9 ships */
        <div className="space-y-6">
          {/* Filter tabs */}
          <div className="flex items-center gap-2 overflow-x-auto text-xs pb-2">
            {(['All', 'ICONSIAM', 'Asiatique', 'River City Bangkok'] as const).map((pier) => (
              <button
                key={pier}
                onClick={() => setActivePier(pier)}
                className={`px-3 py-1.5 rounded-xl transition-colors ${
                  activePier === pier
                    ? 'bg-white text-black font-semibold'
                    : 'bg-white/5 text-white/60 hover:text-white'
                }`}
              >
                {pier === 'All' ? 'ทั้งหมด (9 ลำ)' : pier}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredShips.map((ship) => (
              <div
                key={ship.id}
                onClick={() => onSelectShip(ship)}
                className="minimal-card overflow-hidden cursor-pointer group flex flex-col justify-between"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={ship.images.hero}
                    alt={ship.nameTh}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[11px] text-white/80 border border-white/10">
                    {ship.pier}
                  </div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-xs text-white">
                    <span className="font-semibold text-white/90">{ship.badge}</span>
                    <span className="text-amber-400 font-bold flex items-center gap-1">
                      <Star className="w-3 h-3 fill-amber-400" />
                      <span>{ship.rating}</span>
                    </span>
                  </div>
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h3 className="text-base font-bold text-white group-hover:text-amber-300 transition-colors">
                      {ship.nameTh}
                    </h3>
                    <p className="text-xs text-white/40 font-mono">{ship.nameEn}</p>
                  </div>

                  <p className="text-xs text-white/60 line-clamp-2 leading-relaxed">
                    {ship.tagline}
                  </p>

                  <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-white/40">เริ่มต้น</span>
                      <p className="text-base font-bold text-white">
                        ฿{ship.startingPrice.toLocaleString()}.-
                      </p>
                    </div>

                    <span className="inline-flex items-center gap-1 text-xs text-white/70 group-hover:text-white transition-colors">
                      <span>เปิดดูข้อมูล</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
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
