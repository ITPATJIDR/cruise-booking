import React, { useState } from 'react';
import { CRUISE_SHIPS, AGENCY_INFO, PIER_LOCATIONS } from '../data/cruises';
import { CruiseShip, CruiseTimeCategory } from '../types/cruise';
import { ArrowUpRight, Compass, MapPin, MessageCircle, Phone, Clock, Star } from 'lucide-react';

interface HomePageProps {
  onSelectShip: (ship: CruiseShip) => void;
  onNavigateToCruises: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onSelectShip, onNavigateToCruises }) => {
  const [selectedRound, setSelectedRound] = useState<CruiseTimeCategory | 'All'>('All');

  const filteredShips = CRUISE_SHIPS.filter((ship) => {
    if (selectedRound === 'All') return true;
    return ship.rounds.some((r) => r.category === selectedRound);
  });

  return (
    <div className="space-y-24 pb-28">
      {/* Cinematic Editorial Hero Section */}
      <section className="relative w-full min-h-[580px] lg:min-h-[660px] flex items-center justify-center overflow-hidden border-b border-white/5">
        {/* Background Visual with Sunset River Horizon */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=2000&q=85"
            alt="Chao Phraya Sunset"
            className="w-full h-full object-cover object-center opacity-40 scale-105 transition-transform duration-1000"
          />
          {/* Subtle atmospheric vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#08090c] via-[#08090c]/70 to-[#08090c]/40" />
          <div className="absolute inset-0 bg-radial-at-c from-transparent via-[#08090c]/50 to-[#08090c]" />
        </div>

        {/* Hero Content */}
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center space-y-8 z-10">
          <div className="space-y-4">
            <span className="text-xs font-mono text-amber-300/80 tracking-widest uppercase">
              Chao Phraya Sunset & Dinner Cruise
            </span>

            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-white leading-[1.15]">
              ช่วงเวลาที่ดีที่สุดบนแม่น้ำ <br />
              <span className="text-white/60 font-light">ผ่าน 9 ลำเรือสำราญคัดสรร</span>
            </h1>

            <p className="text-sm sm:text-base text-white/70 max-w-xl mx-auto leading-relaxed font-light">
              ตัวแทนจำหน่ายบัตรล่องเรือแม่น้ำเจ้าพระยาอย่างเป็นทางการ แนะนำเรือที่เหมาะกับคุณ
              พร้อมช่วยจัดสรรตำแหน่งโต๊ะวิวดาดฟ้าที่ดีที่สุดโดยไม่บวกเพิ่ม
            </p>
          </div>

          {/* Time Round Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
            <span className="text-xs text-white/40 mr-1 hidden sm:inline">เลือกรอบเวลา:</span>
            <button
              onClick={() => setSelectedRound('All')}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedRound === 'All'
                  ? 'bg-white text-black font-semibold shadow-md'
                  : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              เรือทั้งหมด (9 ลำ)
            </button>
            <button
              onClick={() => setSelectedRound('Sunset')}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedRound === 'Sunset'
                  ? 'bg-amber-400 text-black font-semibold shadow-md'
                  : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              🌅 รอบซันเซ็ต (16:30 - 18:45 น.)
            </button>
            <button
              onClick={() => setSelectedRound('Dinner')}
              className={`px-4 py-2 rounded-xl text-xs font-medium transition-all ${
                selectedRound === 'Dinner'
                  ? 'bg-indigo-400 text-black font-semibold shadow-md'
                  : 'bg-white/5 text-white/70 hover:text-white hover:bg-white/10'
              }`}
            >
              🌙 รอบดินเนอร์ (19:30 - 21:45 น.)
            </button>
          </div>

          {/* Main Action CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <button
              onClick={onNavigateToCruises}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white text-black font-semibold text-xs sm:text-sm hover:bg-white/90 transition-all flex items-center justify-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>เปิดแผนที่ปักหมุดเรือ 9 ลำ</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <a
              href={AGENCY_INFO.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-xs sm:text-sm border border-white/10 transition-colors flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>คุยกับเราทาง LINE ({AGENCY_INFO.lineId})</span>
            </a>
          </div>
        </div>
      </section>

      {/* 9 Ships Minimal Showcase */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-white/5 pb-6">
          <div className="space-y-1">
            <span className="text-xs font-mono text-white/50 tracking-wider uppercase">
              Curated Fleet
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              เรือสำราญที่เราคัดสรร
            </h2>
            <p className="text-xs text-white/50">
              คลิกที่การ์ดเพื่อดูรอบเวลา เมนูอาหาร และรายละเอียดผ่าน Side Modal ด้านขวา
            </p>
          </div>

          <button
            onClick={onNavigateToCruises}
            className="text-xs text-white/70 hover:text-white flex items-center gap-1 font-mono transition-colors"
          >
            <span>ดูทั้งหมดบนแผนที่</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Minimal Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[11px] text-white/80 border border-white/10 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-amber-400" />
                  <span>{ship.pier}</span>
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
                    <span className="text-[10px] text-white/40">ราคาเริ่มต้น</span>
                    <p className="text-base font-bold text-white">
                      ฿{ship.startingPrice.toLocaleString()}.-
                    </p>
                  </div>

                  <span className="inline-flex items-center gap-1 text-xs text-white/70 group-hover:text-white transition-colors">
                    <span>ดูรายละเอียด</span>
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pier Locations Summary */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="space-y-1">
          <span className="text-xs font-mono text-white/50 tracking-wider uppercase">
            3 Major Harbors
          </span>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            ท่าเรือที่ขึ้น
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {PIER_LOCATIONS.map((pier) => (
            <div key={pier.id} className="minimal-card p-5 space-y-2">
              <h3 className="text-base font-bold text-white">{pier.name}</h3>
              <p className="text-xs text-amber-400/90 font-medium">{pier.bts}</p>
              <p className="text-xs text-white/60 leading-relaxed font-light pt-1">
                {pier.description}
              </p>
              <div className="pt-2 text-[11px] text-white/40">
                เรือที่เทียบท่า: {pier.ships.slice(0, 3).join(', ')}...
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* C Level Hideout Inspired Contact Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="minimal-card px-8 py-12 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
            มีรอบหรือเรือในใจอยู่แล้วไหม?
          </h2>
          <p className="text-sm text-white/60 max-w-md mx-auto leading-relaxed font-light">
            ทักมาคุยกับเราทาง LINE หรือโทรสอบถามได้เลย บอกเราว่าอยากไปวันไหน กี่ท่าน
            เราพร้อมเช็คที่นั่งว่างและสรุปราคาพิเศษให้ทันที
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <a
              href={AGENCY_INFO.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-black font-semibold text-sm hover:bg-white/90 transition-colors"
            >
              <MessageCircle className="w-4 h-4 fill-current text-emerald-600" />
              <span>ทัก LINE หาเรา ({AGENCY_INFO.lineId})</span>
            </a>

            <a
              href={`tel:${AGENCY_INFO.hotline.replace(/-/g, '')}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-sm border border-white/10 transition-colors"
            >
              <Phone className="w-4 h-4 text-white/60" />
              <span>โทร: {AGENCY_INFO.hotline}</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};
