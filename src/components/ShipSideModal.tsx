import React, { useState, useEffect } from 'react';
import { X, MapPin, Clock, MessageCircle, ArrowUpRight, Check, Utensils, Ship } from 'lucide-react';
import { CruiseShip } from '../types/cruise';
import { AGENCY_INFO } from '../data/cruises';

interface ShipSideModalProps {
  ship: CruiseShip | null;
  onClose: () => void;
}

export const ShipSideModal: React.FC<ShipSideModalProps> = ({ ship, onClose }) => {
  const [selectedRoundIndex, setSelectedRoundIndex] = useState<number>(0);
  const [photoView, setPhotoView] = useState<'dining' | 'exterior'>('dining');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (ship) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      setSelectedRoundIndex(0);
      setPhotoView('dining');
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [ship, onClose]);

  if (!ship) return null;

  const currentRound = ship.rounds[selectedRoundIndex] || ship.rounds[0];
  const activeDiningPhoto = currentRound?.diningImage || ship.images.interior || ship.images.hero;
  const currentPhoto = photoView === 'dining' ? activeDiningPhoto : ship.images.hero;

  const handleLineClick = () => {
    const roundText = currentRound ? `รอบ ${currentRound.name} (${currentRound.cruisingTime})` : '';
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

      {/* Clean & Focused Side Drawer (Luminous Sunlit Theme) */}
      <aside className="relative w-full max-w-md h-full bg-white border-l border-amber-900/15 flex flex-col z-10 shadow-2xl animate-drawer-in overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-amber-900/10 bg-[#fffcf7] shrink-0">
          <div>
            <h2 className="text-lg font-bold text-[var(--text)] tracking-tight">
              {ship.nameTh}
            </h2>
            <p className="text-xs text-[var(--muted)] font-mono">{ship.nameEn}</p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-amber-100/80 text-[var(--muted)] hover:text-[var(--text)] transition-colors cursor-pointer"
            title="ปิด (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-5 text-sm bg-white">
          {/* Photo Showcase with Toggle */}
          <div className="space-y-2">
            {/* Toggle Tabs: ห้องอาหาร vs ตัวเรือ */}
            <div className="flex items-center gap-1.5 p-1 rounded-full bg-slate-100 border border-slate-200/80 text-xs">
              <button
                onClick={() => setPhotoView('dining')}
                className={`flex-1 py-1.5 px-3 rounded-full font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  photoView === 'dining'
                    ? 'bg-amber-500 text-white font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Utensils className="w-3.5 h-3.5" />
                <span>ห้องอาหาร & ดาดฟ้า</span>
              </button>
              <button
                onClick={() => setPhotoView('exterior')}
                className={`flex-1 py-1.5 px-3 rounded-full font-medium transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                  photoView === 'exterior'
                    ? 'bg-[var(--ink)] text-[var(--on-ink)] font-semibold shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                <Ship className="w-3.5 h-3.5" />
                <span>ตัวเรือจริง</span>
              </button>
            </div>

            {/* Photo Box */}
            <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-slate-100 border border-amber-900/10 shadow-sm group">
              <img
                key={currentPhoto}
                src={currentPhoto}
                alt={photoView === 'dining' ? (currentRound?.diningTitle || 'ห้องอาหาร') : ship.nameTh}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-102"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent pointer-events-none" />

              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 text-[11px] font-mono text-[var(--text)] border border-slate-200/80 shadow-sm flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" />
                <span className="font-semibold">{ship.pier}</span>
              </div>

              {/* Bottom Photo Caption */}
              <div className="absolute bottom-3 left-3 right-3 text-xs text-white">
                <p className="font-semibold drop-shadow-xs line-clamp-1">
                  {photoView === 'dining'
                    ? (currentRound?.diningTitle || 'บรรยากาศห้องอาหาร & โต๊ะริมน้ำ')
                    : `เรือ ${ship.nameTh} (${ship.decks} ชั้น · ${ship.capacity} ที่นั่ง)`}
                </p>
              </div>
            </div>
          </div>

          {/* Round Selector (Sunset vs Dinner) */}
          <div className="space-y-2.5">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--muted)] font-semibold">
              เลือกรอบที่ต้องการ
            </span>
            <div className="space-y-2.5">
              {ship.rounds.map((round, idx) => {
                const isSelected = selectedRoundIndex === idx;
                return (
                  <div
                    key={round.id}
                    onClick={() => setSelectedRoundIndex(idx)}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'bg-amber-50/70 border-amber-500 shadow-md ring-2 ring-amber-400/20'
                        : 'bg-white border-slate-200 hover:border-amber-300 hover:bg-slate-50/50'
                    }`}
                  >
                    <div className="space-y-1">
                      <p
                        className={`font-bold text-sm ${
                          isSelected ? 'text-amber-900' : 'text-[var(--text)]'
                        }`}
                      >
                        {round.name}
                      </p>
                      <p className="text-xs text-[var(--muted)] flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-amber-600" />
                        <span className="num font-medium">{round.cruisingTime}</span>
                        <span>· ท่าเรือ {round.pier}</span>
                      </p>
                    </div>

                    <div className="text-right shrink-0 pl-3">
                      <p className="text-lg font-bold text-orange-600 num">
                        ฿{round.adultPrice.toLocaleString()}.-
                      </p>
                      <p className="text-[10px] text-[var(--muted)]">ผู้ใหญ่ / ท่าน</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dining Atmosphere Note */}
          {currentRound.diningDescription && (
            <div className="p-3.5 rounded-xl bg-amber-50/80 border border-amber-200/80 space-y-1">
              <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900">
                <Utensils className="w-3.5 h-3.5 text-amber-600" />
                <span>บรรยากาศห้องอาหาร ({currentRound.diningTitle || currentRound.name})</span>
              </div>
              <p className="text-xs text-[var(--muted)] leading-relaxed font-light">
                {currentRound.diningDescription}
              </p>
            </div>
          )}

          {/* Essential Details (3-4 concise points) */}
          <div className="space-y-3 pt-3 border-t border-amber-900/10">
            <span className="text-xs font-mono uppercase tracking-wider text-[var(--muted)] font-semibold">
              สิ่งที่รวมในตั๋ว
            </span>
            <ul className="space-y-2.5 text-xs text-[var(--text)] font-light leading-relaxed">
              <li className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5 text-emerald-700">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>เรือ {ship.decks} ชั้น ดาดฟ้าเปิดโล่ง ชมวิวแม่น้ำ 360 องศา</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5 text-emerald-700">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>{ship.foodHighlights.slice(0, 3).join(', ')}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center shrink-0 mt-0.5 text-emerald-700">
                  <Check className="w-3 h-3 stroke-[3]" />
                </div>
                <span>จุดขึ้นเรือ: {ship.pier} ({ship.pierFullAddress})</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Action Footer */}
        <div className="p-5 border-t border-amber-900/10 bg-[#fffcf7] space-y-2.5 shrink-0">
          <button
            onClick={handleLineClick}
            className="w-full py-3.5 px-4 rounded-full bg-emerald-600 hover:bg-emerald-700 !text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-md hover:shadow-lg cursor-pointer"
          >
            <MessageCircle className="w-4 h-4 fill-white text-white" />
            <span className="!text-white">ทัก LINE จองตั๋วรอบนี้ (เช็คโต๊ะว่างทันที)</span>
            <ArrowUpRight className="w-4 h-4 !text-white" />
          </button>
          <div className="text-center">
            <a
              href={`tel:${AGENCY_INFO.hotline.replace(/-/g, '')}`}
              className="text-xs text-[var(--muted)] hover:text-[var(--text)] transition-colors inline-flex items-center gap-1 font-medium"
            >
              <span>หรือโทรคุยกับแอดมิน: {AGENCY_INFO.hotline}</span>
            </a>
          </div>
        </div>
      </aside>
    </div>
  );
};
