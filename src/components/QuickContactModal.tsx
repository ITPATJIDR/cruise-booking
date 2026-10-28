import React, { useState } from 'react';
import { X, MessageCircle, Phone, Calendar, Users, Ship, Sparkles, Send, CheckCircle2, Copy } from 'lucide-react';
import { CRUISE_SHIPS, AGENCY_INFO } from '../data/cruises';
import { CruiseShip } from '../types/cruise';
import confetti from 'canvas-confetti';

interface QuickContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  presetShip?: CruiseShip | null;
  presetRoundId?: string;
}

export const QuickContactModal: React.FC<QuickContactModalProps> = ({
  isOpen,
  onClose,
  presetShip,
  presetRoundId,
}) => {
  const [selectedShipId, setSelectedShipId] = useState<string>(presetShip?.id || CRUISE_SHIPS[0].id);
  const [roundType, setRoundType] = useState<'Sunset' | 'Dinner'>('Sunset');
  const [date, setDate] = useState<string>('');
  const [adults, setAdults] = useState<number>(2);
  const [children, setChildren] = useState<number>(0);
  const [seatingPref, setSeatingPref] = useState<'rooftop' | 'indoor'>('rooftop');
  const [notes, setNotes] = useState<string>('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentShip = CRUISE_SHIPS.find((s) => s.id === selectedShipId) || CRUISE_SHIPS[0];
  const matchingRound = currentShip.rounds.find((r) => r.category === roundType) || currentShip.rounds[0];

  const estimatedTotal =
    adults * (matchingRound ? matchingRound.adultPrice : currentShip.startingPrice) +
    children * (matchingRound ? matchingRound.childPrice : 0);

  const generateInquiryMessage = () => {
    return `สวัสดีครับ สนใจสอบถามและจองตั๋วล่องเรือครับ\n• เรือ: ${currentShip.nameTh} (${currentShip.nameEn})\n• รอบ: ${matchingRound?.name || roundType}\n• วันที่ต้องการเดินทาง: ${date || 'ยังไม่ระบุ'}\n• จำนวนผู้โดยสาร: ผู้ใหญ่ ${adults} ท่าน / เด็ก ${children} ท่าน\n• โซนที่นั่งที่ต้องการ: ${seatingPref === 'rooftop' ? 'ดาดฟ้าเปิดโล่ง 360°' : 'ห้องแอร์กระจกวิวแม่น้ำ'}\n${notes ? `• หมายเหตุเพิ่มเติม: ${notes}\n` : ''}รบกวนเช็คที่นั่งว่างและสรุปราคาพิเศษให้ด้วยครับ ขอบคุณครับ`;
  };

  const handleSendToLine = () => {
    const text = encodeURIComponent(generateInquiryMessage());
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
    window.open(`${AGENCY_INFO.lineUrl}?text=${text}`, '_blank');
  };

  const handleSendToWhatsApp = () => {
    const text = encodeURIComponent(generateInquiryMessage());
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
    window.open(`${AGENCY_INFO.whatsappUrl}?text=${text}`, '_blank');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateInquiryMessage());
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-amber-500/30 rounded-3xl shadow-2xl overflow-hidden my-auto text-slate-100">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900/95 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-xl bg-amber-500/20 flex items-center justify-center text-amber-400">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">เช็คที่นั่งว่าง & ขอราคาพิเศษด่วน</h3>
              <p className="text-xs text-slate-400">
                เลือกรายละเอียดแล้วส่งตรงไปยัง LINE หรือโทรเพื่อรับข้อเสนอทันที
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 space-y-5 max-h-[75vh] overflow-y-auto">
          {/* Select Ship */}
          <div>
            <label className="block text-xs font-semibold text-amber-300 mb-2 flex items-center gap-1.5">
              <Ship className="w-4 h-4" />
              <span>เลือกเรือสำราญที่สนใจ (มีให้เลือก 9 ลำ)</span>
            </label>
            <select
              value={selectedShipId}
              onChange={(e) => setSelectedShipId(e.target.value)}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white text-sm focus:outline-none focus:border-amber-400 transition-colors"
            >
              {CRUISE_SHIPS.map((ship) => (
                <option key={ship.id} value={ship.id}>
                  {ship.nameTh} ({ship.nameEn}) - ท่าเรือ {ship.pier} (เริ่มต้น ฿{ship.startingPrice})
                </option>
              ))}
            </select>
          </div>

          {/* Round Category */}
          <div>
            <label className="block text-xs font-semibold text-amber-300 mb-2">
              ช่วงเวลารอบล่องเรือ
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setRoundType('Sunset')}
                className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                  roundType === 'Sunset'
                    ? 'bg-gradient-to-r from-orange-500/20 to-amber-500/20 border-amber-500 text-amber-300 shadow-md'
                    : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                🌅 รอบซันเซ็ต (16:30 - 18:45 น.)
              </button>
              <button
                type="button"
                onClick={() => setRoundType('Dinner')}
                className={`py-3 px-4 rounded-xl border text-sm font-medium transition-all ${
                  roundType === 'Dinner'
                    ? 'bg-gradient-to-r from-indigo-500/20 to-purple-500/20 border-purple-400 text-purple-300 shadow-md'
                    : 'bg-slate-800/60 border-slate-700 text-slate-300 hover:text-white'
                }`}
              >
                🌙 รอบดินเนอร์ (19:30 - 21:45 น.)
              </button>
            </div>
          </div>

          {/* Date & Guest Count */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                <span>วันที่ต้องการเดินทาง</span>
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1">
                <Users className="w-3.5 h-3.5 text-amber-400" />
                <span>ผู้ใหญ่ (ท่าน)</span>
              </label>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setAdults(Math.max(1, adults - 1))}
                  className="w-9 h-10 bg-slate-700 hover:bg-slate-600 rounded-l-xl text-white font-bold"
                >
                  -
                </button>
                <input
                  type="number"
                  readOnly
                  value={adults}
                  className="w-full h-10 bg-slate-800 border-y border-slate-700 text-center text-sm font-semibold text-white focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setAdults(adults + 1)}
                  className="w-9 h-10 bg-slate-700 hover:bg-slate-600 rounded-r-xl text-white font-bold"
                >
                  +
                </button>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                เด็ก 4-10 ปี (ท่าน)
              </label>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={() => setChildren(Math.max(0, children - 1))}
                  className="w-9 h-10 bg-slate-700 hover:bg-slate-600 rounded-l-xl text-white font-bold"
                >
                  -
                </button>
                <input
                  type="number"
                  readOnly
                  value={children}
                  className="w-full h-10 bg-slate-800 border-y border-slate-700 text-center text-sm font-semibold text-white focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setChildren(children + 1)}
                  className="w-9 h-10 bg-slate-700 hover:bg-slate-600 rounded-r-xl text-white font-bold"
                >
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Seating Preference */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-2">
              ความประสงค์โซนที่นั่ง
            </label>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <label
                onClick={() => setSeatingPref('rooftop')}
                className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer ${
                  seatingPref === 'rooftop'
                    ? 'bg-amber-500/15 border-amber-500 text-amber-200'
                    : 'bg-slate-800/40 border-slate-700 text-slate-400'
                }`}
              >
                <input
                  type="radio"
                  checked={seatingPref === 'rooftop'}
                  onChange={() => setSeatingPref('rooftop')}
                  className="accent-amber-400"
                />
                <span>ดาดฟ้าเปิดโล่ง 360° (ยอดนิยม)</span>
              </label>
              <label
                onClick={() => setSeatingPref('indoor')}
                className={`flex items-center gap-2 p-3 rounded-xl border cursor-pointer ${
                  seatingPref === 'indoor'
                    ? 'bg-amber-500/15 border-amber-500 text-amber-200'
                    : 'bg-slate-800/40 border-slate-700 text-slate-400'
                }`}
              >
                <input
                  type="radio"
                  checked={seatingPref === 'indoor'}
                  onChange={() => setSeatingPref('indoor')}
                  className="accent-amber-400"
                />
                <span>ห้องปรับอากาศกระจกบานใหญ่</span>
              </label>
            </div>
          </div>

          {/* Additional Notes */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              ข้อความเพิ่มเติม (เช่น วันเกิด, ต้องการเค้กฟรี, ขอโต๊ะริมน้ำ)
            </label>
            <input
              type="text"
              placeholder="เช่น ตรงกับวันเกิด มีเค้กให้ไหมครับ, ขอโต๊ะริมกราบเรือ"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-800 border border-slate-700 rounded-xl text-white text-xs sm:text-sm focus:outline-none focus:border-amber-400"
            />
          </div>

          {/* Price Estimate Summary */}
          <div className="glass-panel p-4 rounded-2xl border border-amber-500/20 bg-slate-950/40 flex items-center justify-between">
            <div>
              <p className="text-xs text-slate-400">ประมาณการยอดรวม (ราคาพิเศษเอเจนซี่):</p>
              <p className="text-2xl font-bold text-amber-400">
                ฿{estimatedTotal.toLocaleString()}{' '}
                <span className="text-xs font-normal text-slate-400">บาท</span>
              </p>
            </div>
            <span className="text-[11px] text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full border border-emerald-500/20">
              ไม่มีค่าธรรมเนียมแอบแฝง
            </span>
          </div>

          {/* Direct CTA Buttons */}
          <div className="space-y-2 pt-2">
            <button
              onClick={handleSendToLine}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold text-sm sm:text-base flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-all transform hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5 fill-current" />
              <span>ส่งข้อมูลไปยัง LINE เจ้าหน้าที่ ({AGENCY_INFO.lineId})</span>
            </button>

            <div className="grid grid-cols-2 gap-2">
              <a
                href={`tel:${AGENCY_INFO.hotline.replace(/-/g, '')}`}
                className="py-3 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-amber-300 font-medium text-xs sm:text-sm border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
              >
                <Phone className="w-4 h-4" />
                <span>โทรสายด่วน ({AGENCY_INFO.hotline})</span>
              </a>

              <button
                onClick={handleCopy}
                className="py-3 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs sm:text-sm border border-slate-700 flex items-center justify-center gap-1.5 transition-colors"
              >
                {copied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'คัดลอกข้อความแล้ว!' : 'คัดลอกข้อความ'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
