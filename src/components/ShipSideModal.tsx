import React, { useState, useEffect } from 'react';
import { X, MapPin, Clock, Star, MessageCircle, Phone, Compass, Utensils, ArrowUpRight, Ship, Sunset, Moon, Sparkles, Check } from 'lucide-react';
import { CruiseShip, CruiseRound } from '../types/cruise';
import { AGENCY_INFO } from '../data/cruises';

interface ShipSideModalProps {
  ship: CruiseShip | null;
  onClose: () => void;
}

type PhotoView = 'exterior' | 'sunset' | 'dinner';

export const ShipSideModal: React.FC<ShipSideModalProps> = ({ ship, onClose }) => {
  const [activeCategory, setActiveCategory] = useState<'Sunset' | 'Dinner'>('Sunset');
  const [photoView, setPhotoView] = useState<PhotoView>('exterior');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (ship) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      // Reset to exterior photo when opening a new ship
      setPhotoView('exterior');
      setActiveCategory('Sunset');
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [ship, onClose]);

  if (!ship) return null;

  const sunsetRound = ship.rounds.find((r) => r.category === 'Sunset');
  const dinnerRound = ship.rounds.find((r) => r.category === 'Dinner');
  const activeRound = activeCategory === 'Sunset' ? sunsetRound : dinnerRound;

  // Determine which image to show based on photoView
  const currentPhoto = (() => {
    if (photoView === 'sunset') {
      return sunsetRound?.diningImage || ship.images.sunsetDining || '/images/cruises/sunset-dining.jpg';
    }
    if (photoView === 'dinner') {
      return dinnerRound?.diningImage || ship.images.dinnerDining || '/images/cruises/dinner-dining.jpg';
    }
    return ship.images.hero;
  })();

  const currentPhotoCaption = (() => {
    if (photoView === 'sunset') {
      return sunsetRound?.diningTitle || 'บรรยากาศห้องอาหารดาดฟ้าชมพระอาทิตย์ตก (Sunset Dining)';
    }
    if (photoView === 'dinner') {
      return dinnerRound?.diningTitle || 'บรรยากาศแกรนด์ซีฟู้ดบุฟเฟต์ & แสงสียามค่ำคืน (Dinner Dining)';
    }
    return `ตัวเรือจริง ${ship.nameTh} (${ship.decks} ชั้น · จุ ${ship.capacity} ท่าน)`;
  })();

  const handleSelectRound = (category: 'Sunset' | 'Dinner') => {
    setActiveCategory(category);
    // When clicking a round, switch photo directly to that round's restaurant / dining ambience!
    setPhotoView(category === 'Sunset' ? 'sunset' : 'dinner');
  };

  const handleLineClick = () => {
    const roundText = activeRound ? `รอบ ${activeRound.name} (${activeRound.cruisingTime})` : '';
    const text = encodeURIComponent(
      `สวัสดีครับ สนใจสอบถามและจองตั๋วเรือ ${ship.nameTh} ${roundText} ท่าเรือ ${ship.pier} ครับ`
    );
    window.open(`${AGENCY_INFO.lineUrl}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
      />

      {/* Right Side Drawer / Modal */}
      <aside className="relative w-full max-w-lg h-full bg-[#0d0e14] border-l border-white/10 flex flex-col z-10 shadow-2xl animate-slide-in-right overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/5 bg-[#0d0e14]/90 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-white/5 border border-white/10 text-white/80">
              <Compass className="w-3 h-3 text-amber-400" />
              <span>{ship.pier}</span>
            </span>
            <span className="text-xs text-white/50">{ship.decks} ชั้น · {ship.capacity} ที่นั่ง</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl hover:bg-white/10 text-white/60 hover:text-white transition-colors"
            title="ปิด (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 text-sm">
          {/* Main Visual Display with View Switcher */}
          <div className="space-y-2.5">
            {/* View Mode Tabs (Real Boat vs Sunset Dining vs Dinner Dining) */}
            <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-white/[0.04] border border-white/5 text-xs">
              <button
                onClick={() => setPhotoView('exterior')}
                className={`flex-1 py-1.5 px-2.5 rounded-xl font-medium transition-all flex items-center justify-center gap-1.5 ${
                  photoView === 'exterior'
                    ? 'bg-white text-black font-semibold shadow-md'
                    : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Ship className="w-3.5 h-3.5" />
                <span>ตัวเรือจริง</span>
              </button>
              <button
                onClick={() => {
                  setPhotoView('sunset');
                  setActiveCategory('Sunset');
                }}
                className={`flex-1 py-1.5 px-2.5 rounded-xl font-medium transition-all flex items-center justify-center gap-1.5 ${
                  photoView === 'sunset'
                    ? 'bg-amber-400 text-black font-semibold shadow-md'
                    : 'text-white/60 hover:text-amber-300 hover:bg-white/5'
                }`}
              >
                <Sunset className="w-3.5 h-3.5" />
                <span>ร้านอาหาร ซันเซ็ต</span>
              </button>
              <button
                onClick={() => {
                  setPhotoView('dinner');
                  setActiveCategory('Dinner');
                }}
                className={`flex-1 py-1.5 px-2.5 rounded-xl font-medium transition-all flex items-center justify-center gap-1.5 ${
                  photoView === 'dinner'
                    ? 'bg-indigo-400 text-black font-semibold shadow-md'
                    : 'text-white/60 hover:text-indigo-300 hover:bg-white/5'
                }`}
              >
                <Moon className="w-3.5 h-3.5" />
                <span>บุฟเฟต์ ดินเนอร์</span>
              </button>
            </div>

            {/* Photo Box */}
            <div className="relative rounded-2xl overflow-hidden border border-white/10 aspect-[16/10] bg-black shadow-xl group">
              <img
                key={currentPhoto}
                src={currentPhoto}
                alt={currentPhotoCaption}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 animate-in fade-in duration-200"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              {/* Top Rating Badge */}
              <div className="absolute top-3 right-3 flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-xs font-semibold text-amber-300 border border-white/10">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{ship.rating}</span>
                <span className="text-white/50 font-normal">({ship.reviewCount})</span>
              </div>

              {/* Bottom Caption Pill */}
              <div className="absolute bottom-3 left-3 right-3 flex flex-col gap-1 text-white">
                <span className="text-[10px] tracking-wider uppercase font-mono text-amber-300/90 font-semibold">
                  {photoView === 'exterior' ? '🚢 Real Cruise Exterior' : photoView === 'sunset' ? '🌅 Sunset Dining Atmosphere' : '🌙 Dinner Buffet Ambience'}
                </span>
                <p className="text-xs font-medium text-white/95 line-clamp-1">
                  {currentPhotoCaption}
                </p>
              </div>
            </div>
          </div>

          {/* Title & Tagline */}
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-2xl font-bold text-white tracking-tight">{ship.nameTh}</h2>
              <span className="px-2 py-0.5 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-[10px] font-semibold">
                {ship.badge || 'ยอดนิยม'}
              </span>
            </div>
            <p className="text-xs text-white/50 font-mono">{ship.nameEn}</p>
            <p className="text-sm text-white/70 pt-1 leading-relaxed">{ship.description}</p>
          </div>

          {/* Schedules / Rounds Interactive Selection */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold text-white/50 uppercase tracking-wider flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-amber-400" />
                <span>เลือกรอบเวลา (คลิกเพื่อดูรูปอาหารและราคา)</span>
              </h3>
              <span className="text-[10px] text-white/40 font-mono">คลิกเปลี่ยนรูปอาหาร 👆</span>
            </div>

            <div className="grid grid-cols-1 gap-2.5">
              {/* Sunset Round Card */}
              {sunsetRound && (
                <div
                  onClick={() => handleSelectRound('Sunset')}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                    activeCategory === 'Sunset'
                      ? 'bg-gradient-to-r from-orange-500/15 to-amber-500/10 border-orange-400/80 shadow-lg ring-1 ring-orange-400/30'
                      : 'bg-white/[0.03] border-white/5 hover:border-white/15 hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-orange-400 flex items-center gap-1.5">
                          <span>🌅</span>
                          <span>{sunsetRound.name}</span>
                        </span>
                        {activeCategory === 'Sunset' && (
                          <span className="px-1.5 py-0.2 rounded-full bg-orange-400 text-black text-[9px] font-bold">
                            กำลังเลือก
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-white/70 flex items-center gap-1.5 pt-0.5">
                        <Clock className="w-3 h-3 text-orange-400/80" />
                        <span>เวลาล่อง: <b>{sunsetRound.cruisingTime}</b> (เช็คอิน {sunsetRound.checkInTime})</span>
                      </p>
                      {sunsetRound.diningTitle && (
                        <p className="text-[11px] text-orange-200/80 font-light pt-0.5">
                          🍽️ {sunsetRound.diningTitle}
                        </p>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-lg font-extrabold text-white">฿{sunsetRound.adultPrice.toLocaleString()}.-</p>
                      <p className="text-[11px] text-white/50">เด็ก ฿{sunsetRound.childPrice.toLocaleString()}.-</p>
                      {sunsetRound.originalAdultPrice && (
                        <p className="text-[10px] text-white/30 line-through">฿{sunsetRound.originalAdultPrice.toLocaleString()}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Dinner Round Card */}
              {dinnerRound && (
                <div
                  onClick={() => handleSelectRound('Dinner')}
                  className={`p-3.5 rounded-2xl border transition-all cursor-pointer relative overflow-hidden ${
                    activeCategory === 'Dinner'
                      ? 'bg-gradient-to-r from-indigo-500/15 to-purple-500/10 border-indigo-400/80 shadow-lg ring-1 ring-indigo-400/30'
                      : 'bg-white/[0.03] border-white/5 hover:border-white/15 hover:bg-white/[0.05]'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-bold text-indigo-400 flex items-center gap-1.5">
                          <span>🌙</span>
                          <span>{dinnerRound.name}</span>
                        </span>
                        {activeCategory === 'Dinner' && (
                          <span className="px-1.5 py-0.2 rounded-full bg-indigo-400 text-black text-[9px] font-bold">
                            กำลังเลือก
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-white/70 flex items-center gap-1.5 pt-0.5">
                        <Clock className="w-3 h-3 text-indigo-400/80" />
                        <span>เวลาล่อง: <b>{dinnerRound.cruisingTime}</b> (เช็คอิน {dinnerRound.checkInTime})</span>
                      </p>
                      {dinnerRound.diningTitle && (
                        <p className="text-[11px] text-indigo-200/80 font-light pt-0.5">
                          🍽️ {dinnerRound.diningTitle}
                        </p>
                      )}
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-lg font-extrabold text-white">฿{dinnerRound.adultPrice.toLocaleString()}.-</p>
                      <p className="text-[11px] text-white/50">เด็ก ฿{dinnerRound.childPrice.toLocaleString()}.-</p>
                      {dinnerRound.originalAdultPrice && (
                        <p className="text-[10px] text-white/30 line-through">฿{dinnerRound.originalAdultPrice.toLocaleString()}</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Active Round Dining Description & Highlights */}
          {activeRound && (
            <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/10 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-white/80 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>ไฮไลต์ {activeRound.name}</span>
                </span>
                <span className="text-[10px] font-mono text-white/40">{activeRound.category} Experience</span>
              </div>
              {activeRound.diningDescription && (
                <p className="text-xs text-white/70 leading-relaxed font-light">
                  {activeRound.diningDescription}
                </p>
              )}
              <div className="grid grid-cols-2 gap-1.5 pt-1">
                {activeRound.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-xs text-white/80">
                    <Check className="w-3 h-3 text-emerald-400 shrink-0" />
                    <span className="truncate">{h}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Food Highlights Buffet */}
          <div className="space-y-2">
            <h3 className="text-xs font-semibold text-white/40 uppercase tracking-wider flex items-center gap-1.5">
              <Utensils className="w-3.5 h-3.5 text-amber-400" />
              <span>เมนูยอดนิยม & ซีฟู้ดไม่อั้น</span>
            </h3>
            <div className="flex flex-wrap gap-1.5">
              {ship.foodHighlights.map((item, i) => (
                <span
                  key={i}
                  className="px-2.5 py-1 rounded-lg bg-white/[0.04] text-xs text-white/80 border border-white/5"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Pier & Boarding Point */}
          <div className="p-3.5 rounded-2xl bg-white/[0.02] border border-white/5 space-y-1 text-xs">
            <span className="font-semibold text-white/80 flex items-center gap-1">
              <MapPin className="w-3.5 h-3.5 text-amber-400" />
              <span>จุดขึ้นเรือ: {ship.pier}</span>
            </span>
            <p className="text-white/50 leading-relaxed">{ship.pierFullAddress}</p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-4 border-t border-white/5 bg-[#0d0e14]/95 flex items-center gap-2 shrink-0">
          <a
            href={`tel:${AGENCY_INFO.hotline.replace(/-/g, '')}`}
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 text-white/80 border border-white/10 transition-colors shrink-0"
            title="โทรสอบถามทันที"
          >
            <Phone className="w-4 h-4" />
          </a>
          <button
            onClick={handleLineClick}
            className="flex-1 py-3 px-4 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg hover:shadow-emerald-500/20"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>
              จอง{activeRound ? activeRound.name : ship.nameTh} ผ่าน LINE
            </span>
            <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </aside>
    </div>
  );
};
