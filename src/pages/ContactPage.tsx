import React, { useState } from 'react';
import { AGENCY_INFO, CRUISE_SHIPS, PIER_LOCATIONS } from '../data/cruises';
import { MessageCircle, Phone, ArrowUpRight, MapPin, Send, HelpCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [ship, setShip] = useState(CRUISE_SHIPS[0].nameTh);
  const [round, setRound] = useState('รอบซันเซ็ต ชมพระอาทิตย์ตก');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('2 ท่าน');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `สวัสดีครับ สนใจติดต่อสอบถามเรื่องเรือสำราญครับ\n• ชื่อ: ${name || '-'}\n• เรือ: ${ship}\n• รอบ: ${round}\n• วันที่: ${date || 'ยังไม่ระบุ'}\n• จำนวน: ${guests}\nรบกวนเช็คที่นั่งว่างและสรุปราคาพิเศษให้ด้วยครับ`;
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    window.open(`${AGENCY_INFO.lineUrl}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Title */}
      <div className="space-y-3">
        <span className="text-xs font-mono text-white/50 tracking-wider uppercase">
          Contact Channels
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          ติดต่อเรา
        </h1>
        <p className="text-sm sm:text-base text-white/70 leading-relaxed font-light">
          เราไม่ได้เปิดระบบจองผ่านหน้าเว็บโดยตรง เพื่อให้คุณได้คุยกับเจ้าหน้าที่ ได้เลือกตำแหน่งโต๊ะที่พอใจที่สุดก่อน
          ติดต่อเราได้สะดวกผ่านช่องทางด้านล่างนี้
        </p>
      </div>

      {/* Direct Contact Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* LINE */}
        <a
          href={AGENCY_INFO.lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="minimal-card p-6 flex items-start justify-between group"
        >
          <div className="space-y-2">
            <span className="text-xs font-mono text-emerald-400">LINE Official · แนะนำ</span>
            <h3 className="text-lg font-bold text-white">{AGENCY_INFO.lineId}</h3>
            <p className="text-xs text-white/60 leading-relaxed">
              ตอบกลับไวใน 5 นาที พร้อมส่ง Voucher และล็อกโต๊ะดาดฟ้า
            </p>
          </div>
          <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
        </a>

        {/* Hotline Phone */}
        <a
          href={`tel:${AGENCY_INFO.hotline.replace(/-/g, '')}`}
          className="minimal-card p-6 flex items-start justify-between group"
        >
          <div className="space-y-2">
            <span className="text-xs font-mono text-amber-400">โทรสายด่วน</span>
            <h3 className="text-lg font-bold text-white">{AGENCY_INFO.hotline}</h3>
            <p className="text-xs text-white/60 leading-relaxed">
              โทรสอบถามได้ทุกวัน 08:30 - 22:30 น. (เบอร์สำนักงาน: {AGENCY_INFO.phone})
            </p>
          </div>
          <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
        </a>

        {/* Facebook */}
        <a
          href={AGENCY_INFO.facebookUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="minimal-card p-6 flex items-start justify-between group"
        >
          <div className="space-y-2">
            <span className="text-xs font-mono text-blue-400">Facebook Messenger</span>
            <h3 className="text-lg font-bold text-white">{AGENCY_INFO.facebook}</h3>
            <p className="text-xs text-white/60 leading-relaxed">
              ส่งข้อความทางอินบ็อกซ์ ดูรีวิวและภาพบรรยากาศสด
            </p>
          </div>
          <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
        </a>

        {/* WhatsApp */}
        <a
          href={AGENCY_INFO.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="minimal-card p-6 flex items-start justify-between group"
        >
          <div className="space-y-2">
            <span className="text-xs font-mono text-teal-400">WhatsApp · For Foreigners</span>
            <h3 className="text-lg font-bold text-white">{AGENCY_INFO.whatsapp}</h3>
            <p className="text-xs text-white/60 leading-relaxed">
              English communication for international visitors
            </p>
          </div>
          <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors" />
        </a>
      </div>

      {/* Simple Form that opens LINE */}
      <div className="minimal-card p-8 space-y-6">
        <div>
          <h2 className="text-lg font-bold text-white">ต้องการให้แอดมินเช็คที่นั่งว่าง?</h2>
          <p className="text-xs text-white/60 mt-1">
            เลือกข้อมูลเบื้องต้น ระบบจะจัดเป็นข้อความแล้วเปิดเข้าสู่ LINE ให้ทันที
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs text-white/60 mb-1">ชื่อผู้ติดต่อ</label>
              <input
                type="text"
                placeholder="เช่น คุณสมชาย"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
              />
            </div>
            <div>
              <label className="block text-xs text-white/60 mb-1">เรือสำราญที่สนใจ</label>
              <select
                value={ship}
                onChange={(e) => setShip(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#12141c] border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
              >
                {CRUISE_SHIPS.map((s) => (
                  <option key={s.id} value={s.nameTh}>
                    {s.nameTh} ({s.pier})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs text-white/60 mb-1">รอบเวลา</label>
              <select
                value={round}
                onChange={(e) => setRound(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#12141c] border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
              >
                <option value="รอบซันเซ็ต ชมพระอาทิตย์ตก">🌅 รอบซันเซ็ต (16:30 - 18:45 น.)</option>
                <option value="รอบดินเนอร์ ไนท์ซิตี้">🌙 รอบดินเนอร์ (19:30 - 21:45 น.)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs text-white/60 mb-1">วันที่ต้องการไป</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
              />
            </div>
            <div>
              <label className="block text-xs text-white/60 mb-1">จำนวนผู้โดยสาร</label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#12141c] border border-white/10 text-white text-xs focus:outline-none focus:border-white/30"
              >
                <option value="1 ท่าน">1 ท่าน</option>
                <option value="2 ท่าน">2 ท่าน</option>
                <option value="3-5 ท่าน">3-5 ท่าน</option>
                <option value="6-10 ท่าน">6-10 ท่าน</option>
                <option value="10 ท่านขึ้นไป">10 ท่านขึ้นไป (กรุ๊ป)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>ส่งข้อมูลไปยัง LINE แอดมิน ({AGENCY_INFO.lineId})</span>
          </button>
        </form>
      </div>

      {/* Office info */}
      <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2 text-xs text-white/60">
        <p><strong className="text-white">ที่อยู่สำนักงาน:</strong> {AGENCY_INFO.officeAddress}</p>
        <p><strong className="text-white">ใบอนุญาตนำเที่ยว:</strong> {AGENCY_INFO.licenseNo}</p>
        <p><strong className="text-white">เวลาทำการ:</strong> {AGENCY_INFO.workingHours}</p>
      </div>
    </div>
  );
};
