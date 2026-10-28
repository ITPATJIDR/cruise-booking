import React, { useState } from 'react';
import { CRUISE_SHIPS, AGENCY_INFO } from '../data/cruises';
import { CruiseShip, CruiseTimeCategory } from '../types/cruise';
import {
  ArrowUpRight,
  Compass,
  MapPin,
  MessageCircle,
  Phone,
  Star
} from 'lucide-react';

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
    <div className="space-y-20 sm:space-y-28 pb-28">
      {/* =========================================================================
          HERO: VIBRANT SUNLIT RIVER CRUISE
          ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 sm:pt-14">
        <div className="space-y-6 max-w-3xl">
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[var(--text)] leading-[1.15]">
            จองตั๋วเรือดินเนอร์เจ้าพระยา เทียบราคา 9 ลำยอดนิยม
          </h1>

          <p className="text-base sm:text-lg text-[var(--muted)] leading-relaxed font-light max-w-2xl">
            รวมรอบพระอาทิตย์ตกและรอบค่ำจาก 3 ท่าเรือหลัก เช็คเมนูอาหารบุฟเฟต์ ดูผังโต๊ะดาดฟ้า
            จองตั๋วราคาเท่าหน้าท่าเรือ พร้อมช่วยเลือกโต๊ะริมน้ำมุมดีที่สุดฟรี
          </p>

          {/* Actions */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onNavigateToCruises}
              className="px-6 py-3.5 rounded-full bg-[var(--accent)] hover:bg-[var(--accent-strong)] text-white font-semibold text-sm transition-colors flex items-center gap-2 cursor-pointer shadow-md"
            >
              <Compass className="w-4 h-4" />
              <span>ดูเส้นทางล่องเรือ & แผนที่ 3D</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>

            <a
              href={AGENCY_INFO.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs sm:text-sm text-[var(--muted)] hover:text-[var(--text)] transition-colors flex items-center gap-1.5 underline underline-offset-4"
            >
              <span>ทักถามโต๊ะว่างทาง LINE ({AGENCY_INFO.lineId})</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>

        {/* Lead Hero Visual: Bangkok Sunset River Skyline */}
        <div className="mt-10 rounded-md overflow-hidden border border-[var(--line)] aspect-[21/9] max-h-[460px] bg-black relative shadow-lg">
          <img
            src="https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=2000&q=85"
            alt="Chao Phraya River Sunset Skyline"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-80" />
          <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 text-xs text-white font-mono bg-black/60 px-3 py-1.5 rounded-sm border border-white/20 backdrop-blur-sm">
            วิวแม่น้ำเจ้าพระยา ช่วงพระอาทิตย์ตก 17:00 – 18:30 น.
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION: 9 FLEET SPECIFICATIONS
          ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 border-b border-[var(--line)] pb-6">
          <div className="space-y-1.5">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] tracking-tight">
              เรือยอดนิยมทั้ง 9 ลำ
            </h2>
            <p className="text-xs sm:text-sm text-[var(--muted)]">
              เทียบจุดเด่น รอบเวลา และราคาเริ่มต้น คลิกที่การ์ดเรือเพื่อดูรายละเอียดโต๊ะและเมนูอาหาร
            </p>
          </div>

          {/* Time Round Filter */}
          <div className="flex items-center gap-1 bg-[var(--surface-2)] p-1 rounded-full border border-[var(--line)] text-xs shrink-0 shadow-sm">
            <button
              onClick={() => setSelectedRound('All')}
              className={`px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
                selectedRound === 'All'
                  ? 'bg-[var(--ink)] text-[var(--on-ink)] font-semibold shadow-sm'
                  : 'text-[var(--muted)] hover:text-[var(--text)]'
              }`}
            >
              ทุกลำ (9)
            </button>
            <button
              onClick={() => setSelectedRound('Sunset')}
              className={`px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
                selectedRound === 'Sunset'
                  ? 'bg-[var(--accent)] text-white font-semibold shadow-sm'
                  : 'text-[var(--muted)] hover:text-[var(--text)]'
              }`}
            >
              รอบพระอาทิตย์ตก (16:30 - 18:45)
            </button>
            <button
              onClick={() => setSelectedRound('Dinner')}
              className={`px-3.5 py-1.5 rounded-full transition-colors cursor-pointer ${
                selectedRound === 'Dinner'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'text-[var(--muted)] hover:text-[var(--text)]'
              }`}
            >
              รอบค่ำชมวิวไฟ (19:30 - 21:45)
            </button>
          </div>
        </div>

        {/* 9 Fleet Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredShips.map((ship) => (
            <div
              key={ship.id}
              onClick={() => onSelectShip(ship)}
              className="nautical-card overflow-hidden cursor-pointer group flex flex-col justify-between"
            >
              {/* Photo Area */}
              <div className="relative aspect-[16/10] overflow-hidden bg-slate-100">
                <img
                  src={ship.images.hero}
                  alt={ship.nameTh}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent opacity-90" />

                {/* Pier Badge (Vibrant distinction) */}
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

              {/* Card Body */}
              <div className="p-5 space-y-3.5 bg-white">
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-[var(--text)] group-hover:text-orange-600 transition-colors">
                    {ship.nameTh}
                  </h3>
                  <p className="text-xs text-[var(--muted)] font-mono">{ship.nameEn}</p>
                </div>

                <p className="text-xs text-[var(--muted)] line-clamp-2 leading-relaxed font-light">
                  {ship.tagline}
                </p>

                {/* Specifications Bar */}
                <div className="flex items-center gap-2.5 text-[11px] font-mono text-slate-500 pt-1">
                  <span className="px-2 py-0.5 rounded-md bg-amber-50 text-amber-900 border border-amber-200/60 font-semibold">{ship.decks} ชั้นดาดฟ้า</span>
                  <span className="px-2 py-0.5 rounded-md bg-sky-50 text-sky-900 border border-sky-200/60 font-semibold">{ship.capacity} ที่นั่ง</span>
                  <span className="px-2 py-0.5 rounded-md bg-emerald-50 text-emerald-900 border border-emerald-200/60 font-semibold">{ship.rounds.length} รอบเวลา</span>
                </div>

                {/* Price and Action */}
                <div className="pt-3 border-t border-amber-900/10 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-[var(--muted)] uppercase font-mono block font-medium">
                      ราคาเริ่มต้น / ท่าน
                    </span>
                    <p className="text-lg sm:text-xl font-bold text-orange-600 num">
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
      </section>

      {/* =========================================================================
          SECTION: DENSE COMPARISON TABLE
          ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="border-b border-[var(--line)] pb-6 space-y-1.5">
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] tracking-tight">
            ตารางสรุปเทียบ 9 ลำชัดๆ
          </h2>
          <p className="text-xs sm:text-sm text-[var(--muted)]">
            เทียบท่าเรือ รอบเวลา ไฮไลท์อาหาร และราคาต่อท่าน ครบจบในหน้าเดียว
          </p>
        </div>

        <div className="nautical-card overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-[var(--line)] bg-[var(--surface-2)] text-[var(--text)] font-mono uppercase text-[11px] tracking-wider">
                <th className="py-3.5 px-4 font-semibold">ชื่อเรือ</th>
                <th className="py-3.5 px-4 font-semibold">ท่าเรือที่ขึ้น</th>
                <th className="py-3.5 px-4 font-semibold">รอบเย็น (Sunset)</th>
                <th className="py-3.5 px-4 font-semibold">รอบค่ำ (Dinner)</th>
                <th className="py-3.5 px-4 font-semibold">อาหารเด่น</th>
                <th className="py-3.5 px-4 font-semibold">ชั้นเรือ</th>
                <th className="py-3.5 px-4 font-semibold text-right">ราคาเริ่มต้น</th>
                <th className="py-3.5 px-4 font-semibold text-center">ดูเพิ่ม</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--line)] font-light">
              {CRUISE_SHIPS.map((ship) => {
                const sunset = ship.rounds.find((r) => r.category === 'Sunset');
                const dinner = ship.rounds.find((r) => r.category === 'Dinner');

                return (
                  <tr
                    key={ship.id}
                    onClick={() => onSelectShip(ship)}
                    className="hover:bg-[var(--surface-2)]/60 cursor-pointer transition-colors group"
                  >
                    <td className="py-3 px-4 font-medium text-[var(--text)] group-hover:text-[var(--accent)]">
                      <div className="flex flex-col">
                        <span className="font-semibold text-sm">{ship.nameTh}</span>
                        <span className="text-[10px] text-[var(--muted)] font-mono">{ship.nameEn}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-[var(--muted)]">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-[var(--accent)] shrink-0" />
                        <span>{ship.pier}</span>
                      </span>
                    </td>
                    <td className="py-3 px-4 num text-[var(--text)]">
                      {sunset ? sunset.cruisingTime : '—'}
                    </td>
                    <td className="py-3 px-4 num text-[var(--text)]">
                      {dinner ? dinner.cruisingTime : '—'}
                    </td>
                    <td className="py-3 px-4 text-[var(--muted)] max-w-xs truncate">
                      {ship.foodHighlights.slice(0, 2).join(', ')}
                    </td>
                    <td className="py-3 px-4 text-[var(--muted)] num">
                      {ship.decks} ชั้น ({ship.capacity} ที่นั่ง)
                    </td>
                    <td className="py-3 px-4 text-right font-bold text-orange-600 num text-sm">
                      ฿{ship.startingPrice.toLocaleString()}.-
                    </td>
                    <td className="py-3 px-4 text-center">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectShip(ship);
                        }}
                        className="p-1.5 rounded-sm hover:bg-[var(--surface-2)] text-[var(--muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
                        title="ดูรายละเอียด"
                      >
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>

      {/* =========================================================================
          SECTION: DIRECT CONCIERGE & ADVICE
          ========================================================================= */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="nautical-card p-8 sm:p-12 space-y-6 bg-gradient-to-br from-white to-[var(--surface-2)]">
          <div className="space-y-3 max-w-xl">
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] tracking-tight">
              อยากได้โต๊ะริมน้ำมุมสวย ทักหาเราได้เลย
            </h2>
            <p className="text-sm text-[var(--muted)] leading-relaxed font-light">
              เรือแต่ละลำจัดผังโต๊ะไม่เหมือนกัน จะพาแฟนไปฉลองครบรอบ หรือพาครอบครัวไปทานข้าว
              ทักบอกวันที่และจำนวนคนได้เลย ทีมงานช่วยเลือกโต๊ะมุมดีที่สุดให้ฟรี ไม่มีค่าบริการบวกเพิ่ม
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
            <a
              href={AGENCY_INFO.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-[var(--emerald-action)] hover:bg-emerald-700 !text-white font-semibold text-xs sm:text-sm transition-colors shadow-md"
            >
              <MessageCircle className="w-4 h-4 fill-white text-white" />
              <span className="!text-white">ทัก LINE ปรึกษาแอดมิน ({AGENCY_INFO.lineId})</span>
            </a>

            <a
              href={`tel:${AGENCY_INFO.hotline.replace(/-/g, '')}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-white hover:bg-[var(--surface-2)] text-[var(--text)] font-medium text-xs sm:text-sm border border-[var(--line)] shadow-sm transition-colors"
            >
              <Phone className="w-4 h-4 text-[var(--muted)]" />
              <span>โทรสายด่วน: {AGENCY_INFO.hotline}</span>
            </a>
          </div>

          <p className="text-[11px] text-[var(--faint)] font-mono pt-2">
            เปิดบริการทุกวัน 08:30 – 22:30 น. · ใบอนุญาตประกอบธุรกิจนำเที่ยวเลขที่ {AGENCY_INFO.licenseNo}
          </p>
        </div>
      </section>
    </div>
  );
};
