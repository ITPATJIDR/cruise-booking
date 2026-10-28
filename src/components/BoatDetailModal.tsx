import React, { useState } from 'react';
import { X, Star, Clock, MapPin, Users, Utensils, Music, Sparkles, CheckCircle2, MessageCircle, Phone, Compass, ChevronRight, ShieldCheck, Heart } from 'lucide-react';
import { CruiseShip } from '../types/cruise';
import { AGENCY_INFO } from '../data/cruises';

interface BoatDetailModalProps {
  ship: CruiseShip | null;
  onClose: () => void;
  onSelectForInquiry: (ship: CruiseShip, roundId?: string) => void;
}

export const BoatDetailModal: React.FC<BoatDetailModalProps> = ({ ship, onClose, onSelectForInquiry }) => {
  const [activeImageTab, setActiveImageTab] = useState<'hero' | 'rooftop' | 'interior' | 'food'>('hero');
  const [selectedRoundId, setSelectedRoundId] = useState<string>('');

  if (!ship) return null;

  const currentRound = ship.rounds.find((r) => r.id === selectedRoundId) || ship.rounds[0];

  const handleLineClick = () => {
    const text = encodeURIComponent(
      `สวัสดีครับ สนใจสอบถาม/จองเรือ ${ship.nameTh} (${ship.nameEn}) รอบ ${currentRound?.name} ครับ อยากทราบที่นั่งว่างและโปรโมชั่นครับ`
    );
    window.open(`${AGENCY_INFO.lineUrl}?text=${text}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 md:p-6 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-4xl max-h-[92vh] flex flex-col bg-slate-900 border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden text-slate-100 my-auto">
        {/* Header with Title and Close Button */}
        <div className="sticky top-0 z-20 flex items-center justify-between px-6 py-4 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 text-xs font-semibold rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
              {ship.badge || `เรือ ${ship.decks} ชั้น`}
            </span>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
                <span>{ship.nameTh}</span>
                <span className="text-sm font-normal text-slate-400 hidden sm:inline">({ship.nameEn})</span>
              </h2>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body */}
        <div className="overflow-y-auto px-6 py-6 space-y-8">
          {/* Gallery with Tabs */}
          <div className="space-y-3">
            <div className="relative h-64 sm:h-80 md:h-96 rounded-2xl overflow-hidden border border-slate-800 group">
              <img
                src={ship.images[activeImageTab]}
                alt={ship.nameTh}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white">
                <span className="px-3 py-1.5 rounded-full bg-slate-950/70 backdrop-blur-sm border border-white/10 flex items-center gap-1.5">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="font-bold">{ship.rating}</span>
                  <span className="text-slate-400">({ship.reviewCount} รีวิวจากลูกค้าจริง)</span>
                </span>
                <span className="px-3 py-1.5 rounded-full bg-slate-950/70 backdrop-blur-sm border border-white/10 flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-amber-400" />
                  <span>{ship.pier}</span>
                </span>
              </div>
            </div>

            {/* Thumbnail switcher */}
            <div className="grid grid-cols-4 gap-2">
              {(['hero', 'rooftop', 'interior', 'food'] as const).map((tab) => {
                const labels = {
                  hero: 'วิวเรือภายนอก',
                  rooftop: 'ดาดฟ้า 360°',
                  interior: 'ห้องแอร์ / ที่นั่ง',
                  food: 'บุฟเฟต์ซีฟู้ด',
                };
                return (
                  <button
                    key={tab}
                    onClick={() => setActiveImageTab(tab)}
                    className={`py-2 px-1 text-xs sm:text-sm rounded-xl font-medium border transition-all ${
                      activeImageTab === tab
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/50 shadow-md'
                        : 'bg-slate-800/50 text-slate-400 border-slate-800 hover:text-slate-200'
                    }`}
                  >
                    {labels[tab]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Ship Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="glass-panel p-3 rounded-2xl flex items-center gap-3 border border-slate-800">
              <Compass className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <p className="text-[11px] text-slate-400">ท่าเทียบเรือ</p>
                <p className="text-xs sm:text-sm font-semibold text-white">{ship.pier}</p>
              </div>
            </div>
            <div className="glass-panel p-3 rounded-2xl flex items-center gap-3 border border-slate-800">
              <Users className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <p className="text-[11px] text-slate-400">ขนาดความจุ</p>
                <p className="text-xs sm:text-sm font-semibold text-white">{ship.capacity} ที่นั่ง ({ship.decks} ชั้น)</p>
              </div>
            </div>
            <div className="glass-panel p-3 rounded-2xl flex items-center gap-3 border border-slate-800">
              <Utensils className="w-5 h-5 text-amber-400 shrink-0" />
              <div>
                <p className="text-[11px] text-slate-400">รูปแบบอาหาร</p>
                <p className="text-xs sm:text-sm font-semibold text-white">บุฟเฟต์ซีฟู้ด & นานาชาติ</p>
              </div>
            </div>
            <div className="glass-panel p-3 rounded-2xl flex items-center gap-3 border border-slate-800">
              <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0" />
              <div>
                <p className="text-[11px] text-slate-400">การันตีราคา</p>
                <p className="text-xs sm:text-sm font-semibold text-emerald-300">ตัวแทนตรง ไม่บวกเพิ่ม</p>
              </div>
            </div>
          </div>

          {/* About This Ship */}
          <div className="space-y-2">
            <h3 className="text-base font-semibold text-amber-300 flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              <span>จุดเด่นและบรรยากาศบนเรือ</span>
            </h3>
            <p className="text-sm text-slate-300 leading-relaxed font-light">{ship.description}</p>
          </div>

          {/* Rounds & Timetable Pricing Comparison */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-semibold text-amber-300 flex items-center gap-2">
                <Clock className="w-4 h-4" />
                <span>ตารางรอบเวลาและราคา (Sunset & Dinner)</span>
              </h3>
              <span className="text-xs text-slate-400">คลิกเลือกเพื่อสอบถามข้อมูล</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {ship.rounds.map((round) => {
                const isSelected = (currentRound?.id === round.id);
                const isSunset = round.category === 'Sunset';

                return (
                  <div
                    key={round.id}
                    onClick={() => setSelectedRoundId(round.id)}
                    className={`relative p-5 rounded-2xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'bg-amber-500/10 border-amber-500 shadow-lg shadow-amber-500/15 ring-1 ring-amber-500/30'
                        : 'bg-slate-800/40 border-slate-700/60 hover:border-slate-600'
                    }`}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span
                          className={`inline-block px-2.5 py-0.5 rounded-full text-xs font-semibold mb-1.5 ${
                            isSunset
                              ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                              : 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                          }`}
                        >
                          {isSunset ? '🌅 รอบซันเซ็ต พระอาทิตย์ตก' : '🌙 รอบดินเนอร์ ไนท์ซิตี้'}
                        </span>
                        <h4 className="text-base font-bold text-white">{round.name}</h4>
                      </div>
                      <div className="text-right">
                        <span className="text-xs text-slate-400 line-through">฿{round.originalAdultPrice.toLocaleString()}</span>
                        <div className="text-xl font-bold text-amber-400">฿{round.adultPrice.toLocaleString()}</div>
                        <span className="text-[11px] text-slate-400">/ ผู้ใหญ่</span>
                      </div>
                    </div>

                    <div className="space-y-1.5 text-xs text-slate-300 mb-4 border-t border-slate-700/50 pt-3">
                      <div className="flex justify-between">
                        <span className="text-slate-400">เวลาเช็คอิน:</span>
                        <span className="font-medium text-slate-200">{round.checkInTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">เวลาล่องเรือ:</span>
                        <span className="font-semibold text-amber-300">{round.cruisingTime}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">ราคาเด็ก (4-10 ปี):</span>
                        <span className="font-medium text-slate-200">฿{round.childPrice.toLocaleString()} บาท</span>
                      </div>
                      {round.rooftopPrice && (
                        <div className="flex justify-between">
                          <span className="text-slate-400">อัปเกรดที่นั่งดาดฟ้า Rooftop:</span>
                          <span className="font-medium text-amber-400">฿{round.rooftopPrice.toLocaleString()} บาท</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-1">
                      {round.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-slate-300">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Menus & Food Highlights */}
          <div className="space-y-3">
            <h3 className="text-base font-semibold text-amber-300 flex items-center gap-2">
              <Utensils className="w-4 h-4" />
              <span>เมนูอาหารไฮไลต์ (บุฟเฟต์เติมไม่อั้นตลอดทริป)</span>
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {ship.foodHighlights.map((food, i) => (
                <div key={i} className="glass-panel p-2.5 rounded-xl border border-slate-800 text-xs flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                  <span className="text-slate-200">{food}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Entertainments & Facilities */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-amber-300 flex items-center gap-1.5">
                <Music className="w-4 h-4" />
                <span>การแสดงและความบันเทิง</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {ship.entertainments.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-amber-300 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                <span>สิ่งอำนวยความสะดวกบนเรือ</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-300">
                {ship.facilities.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Pier Information Box */}
          <div className="glass-panel p-4 rounded-2xl border border-slate-800 space-y-2">
            <div className="flex items-center gap-2 text-sm font-semibold text-amber-300">
              <MapPin className="w-4 h-4" />
              <span>สถานที่ขึ้นเรือ & การเดินทาง</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              <span className="font-medium text-white">{ship.pierFullAddress}</span>
              <br />
              (เจ้าหน้าที่เอเจนซี่ของเรามีจุดบริการให้คำแนะนำการเดินทางและนัดรับตั๋วที่ท่าเรืออย่างเป็นทางการ)
            </p>
          </div>
        </div>

        {/* Footer Action Bar with Direct Contact Channels */}
        <div className="sticky bottom-0 z-20 px-6 py-4 bg-slate-900/95 backdrop-blur-md border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            <span className="text-xs text-slate-400">ราคาพิเศษจองผ่านเอเจนซี่ เริ่มต้นเพียง</span>
            <div className="text-2xl font-bold text-amber-400">
              ฿{ship.startingPrice.toLocaleString()} <span className="text-xs font-normal text-slate-400">/ ท่าน</span>
            </div>
          </div>

          <div className="flex items-center gap-2.5 w-full sm:w-auto">
            <a
              href={`tel:${AGENCY_INFO.hotline.replace(/-/g, '')}`}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-medium text-sm border border-slate-700 transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>โทรจอง</span>
            </a>

            <button
              onClick={() => onSelectForInquiry(ship, currentRound?.id)}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-medium text-sm border border-amber-500/40 transition-colors"
            >
              <span>ส่งฟอร์มด่วน</span>
            </button>

            <button
              onClick={handleLineClick}
              className="flex-1 sm:flex-initial flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-semibold text-sm shadow-lg shadow-emerald-600/30 transition-all transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>สอบถาม/จองผ่าน LINE</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
