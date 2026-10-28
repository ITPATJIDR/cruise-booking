import React from 'react';
import { X, Check, Minus, MessageCircle, Star, MapPin } from 'lucide-react';
import { CruiseShip } from '../types/cruise';
import { AGENCY_INFO } from '../data/cruises';

interface BoatCompareModalProps {
  ships: CruiseShip[];
  onClose: () => void;
  onRemoveShip: (shipId: string) => void;
  onSelectShip: (ship: CruiseShip) => void;
}

export const BoatCompareModal: React.FC<BoatCompareModalProps> = ({
  ships,
  onClose,
  onRemoveShip,
  onSelectShip,
}) => {
  if (ships.length === 0) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-5xl bg-slate-900 border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden my-auto text-slate-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-slate-900/95 border-b border-slate-800">
          <div>
            <h3 className="text-xl font-bold text-white">ตารางเปรียบเทียบเรือสำราญ ({ships.length}/3 ลำ)</h3>
            <p className="text-xs text-slate-400">เปรียบเทียบจุดเด่น ราคา รอบเวลา และเมนูอาหาร</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Table */}
        <div className="overflow-x-auto p-6">
          <div className="min-w-[650px] grid grid-cols-4 gap-4">
            {/* Metric Label Column */}
            <div className="space-y-6 pt-44 text-xs font-semibold text-slate-400">
              <div className="py-2 border-b border-slate-800">ราคาเริ่มต้น</div>
              <div className="py-2 border-b border-slate-800">ท่าเทียบเรือ</div>
              <div className="py-2 border-b border-slate-800">จำนวนชั้นเรือ</div>
              <div className="py-2 border-b border-slate-800">ความจุผู้โดยสาร</div>
              <div className="py-2 border-b border-slate-800">คะแนนรีวิว</div>
              <div className="py-2 border-b border-slate-800">รอบซันเซ็ต (Sunset)</div>
              <div className="py-2 border-b border-slate-800">รอบดินเนอร์ (Dinner)</div>
              <div className="py-2 border-b border-slate-800">เมนูอาหารเด่น</div>
              <div className="py-2">การดำเนินการ</div>
            </div>

            {/* Compare Ships Columns */}
            {ships.map((ship) => {
              const sunsetRound = ship.rounds.find((r) => r.category === 'Sunset');
              const dinnerRound = ship.rounds.find((r) => r.category === 'Dinner');

              return (
                <div key={ship.id} className="glass-panel p-4 rounded-2xl border border-amber-500/20 relative">
                  <button
                    onClick={() => onRemoveShip(ship.id)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-slate-800/80 hover:bg-red-500/20 text-slate-400 hover:text-red-400 text-xs"
                    title="ลบออกจากการเปรียบเทียบ"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>

                  <div className="h-40 flex flex-col justify-between mb-4">
                    <img
                      src={ship.images.hero}
                      alt={ship.nameTh}
                      className="w-full h-24 object-cover rounded-xl mb-2"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-white line-clamp-1">{ship.nameTh}</h4>
                      <p className="text-[11px] text-amber-400/80">{ship.nameEn}</p>
                    </div>
                  </div>

                  <div className="space-y-6 text-xs text-slate-200">
                    <div className="py-2 border-b border-slate-800 font-bold text-amber-400 text-sm">
                      ฿{ship.startingPrice.toLocaleString()}.-
                    </div>
                    <div className="py-2 border-b border-slate-800 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      <span>{ship.pier}</span>
                    </div>
                    <div className="py-2 border-b border-slate-800">{ship.decks} ชั้น</div>
                    <div className="py-2 border-b border-slate-800">{ship.capacity} ท่าน</div>
                    <div className="py-2 border-b border-slate-800 flex items-center gap-1 text-amber-300 font-bold">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{ship.rating}</span>
                    </div>
                    <div className="py-2 border-b border-slate-800">
                      {sunsetRound ? (
                        <span className="text-orange-300 font-medium">
                          {sunsetRound.cruisingTime}
                          <br />
                          (฿{sunsetRound.adultPrice.toLocaleString()}.-)
                        </span>
                      ) : (
                        <Minus className="w-4 h-4 text-slate-600" />
                      )}
                    </div>
                    <div className="py-2 border-b border-slate-800">
                      {dinnerRound ? (
                        <span className="text-indigo-300 font-medium">
                          {dinnerRound.cruisingTime}
                          <br />
                          (฿{dinnerRound.adultPrice.toLocaleString()}.-)
                        </span>
                      ) : (
                        <Minus className="w-4 h-4 text-slate-600" />
                      )}
                    </div>
                    <div className="py-2 border-b border-slate-800 text-[11px] text-slate-300">
                      {ship.foodHighlights.slice(0, 3).join(', ')}
                    </div>
                    <div className="py-2 space-y-2">
                      <button
                        onClick={() => {
                          onClose();
                          onSelectShip(ship);
                        }}
                        className="w-full py-2 px-2 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 text-xs font-semibold border border-amber-500/40"
                      >
                        ดูข้อมูลฉบับเต็ม
                      </button>
                      <a
                        href={`${AGENCY_INFO.lineUrl}?text=${encodeURIComponent(
                          `สนใจจองเรือ ${ship.nameTh} ครับ`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-2 px-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold flex items-center justify-center gap-1 text-center"
                      >
                        <MessageCircle className="w-3 h-3" />
                        <span>ทัก LINE จอง</span>
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
