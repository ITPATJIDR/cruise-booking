import React, { useState } from 'react';
import { AGENCY_INFO, CRUISE_SHIPS } from '../data/cruises';
import { MessageCircle, Phone, ArrowUpRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ContactPage: React.FC = () => {
  const [name, setName] = useState('');
  const [ship, setShip] = useState(CRUISE_SHIPS[0].nameTh);
  const [round, setRound] = useState('รอบซันเซ็ต ชมพระอาทิตย์ตก (16:30 - 18:45 น.)');
  const [date, setDate] = useState('');
  const [guests, setGuests] = useState('2 ท่าน');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `สวัสดีครับ สนใจสอบถามเรื่องเรือสำราญครับ\n• ชื่อ: ${name || '-'}\n• เรือ: ${ship}\n• รอบ: ${round}\n• วันที่: ${date || 'ยังไม่ระบุ'}\n• จำนวน: ${guests}\nรบกวนเช็คที่นั่งว่างและสรุปราคาพิเศษให้ด้วยครับ`;
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    window.open(`${AGENCY_INFO.lineUrl}?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Title */}
      <div className="space-y-4 border-b border-[var(--line)] pb-8">
        <h1 className="text-3xl sm:text-5xl font-bold text-[var(--text)] tracking-tight">
          ติดต่อทีมงาน
        </h1>
        <p className="text-base sm:text-lg text-[var(--muted)] leading-relaxed font-light">
          เราไม่มีระบบตัดบัตรอัตโนมัติบนเว็บ เพราะอยากให้ลูกค้าได้คุยกับแอดมิน ได้เห็นรูปตำแหน่งโต๊ะจริง
          และเลือกรอบที่ถูกใจก่อนชำระเงิน จะได้มั่นใจว่าได้โต๊ะมุมสวยถูกใจแน่นอน
        </p>
      </div>

      {/* Direct Contact Channels */}
      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] tracking-tight">
          ช่องทางติดต่อด่วน
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* LINE */}
          <a
            href={AGENCY_INFO.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="nautical-card p-6 flex items-start justify-between group hover:border-[var(--emerald-action)]/50 bg-white"
          >
            <div className="space-y-2">
              <span className="text-xs font-mono text-[var(--emerald-action)] font-semibold">
                LINE Official (ตอบไวใน 5 นาที)
              </span>
              <h3 className="text-lg font-bold text-[var(--text)] group-hover:text-[var(--emerald-action)] transition-colors">
                {AGENCY_INFO.lineId}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed font-light">
                เช็คที่นั่งว่าง ส่งรูปโต๊ะจริง และรับ Voucher ผ่าน LINE ได้ทันที
              </p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--text)] transition-colors" />
          </a>

          {/* Hotline Phone */}
          <a
            href={`tel:${AGENCY_INFO.hotline.replace(/-/g, '')}`}
            className="nautical-card p-6 flex items-start justify-between group hover:border-amber-400 bg-white"
          >
            <div className="space-y-2">
              <span className="text-xs font-mono text-orange-600 font-semibold">
                โทรสายด่วนทุกวัน
              </span>
              <h3 className="text-lg font-bold text-[var(--text)] group-hover:text-orange-600 transition-colors">
                {AGENCY_INFO.hotline}
              </h3>
              <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed font-light">
                โทรคุยกับแอดมินได้ทุกวัน 08:30 - 22:30 น. (เบอร์สำนักงาน: {AGENCY_INFO.phone})
              </p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--text)] transition-colors" />
          </a>

          {/* Facebook */}
          <a
            href={AGENCY_INFO.facebookUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="nautical-card p-6 flex items-start justify-between group bg-white"
          >
            <div className="space-y-2">
              <span className="text-xs font-mono text-blue-600 font-semibold">
                Facebook Messenger
              </span>
              <h3 className="text-lg font-bold text-[var(--text)]">{AGENCY_INFO.facebook}</h3>
              <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed font-light">
                ส่งข้อความทางอินบ็อกซ์และดูภาพบรรยากาศสด
              </p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--text)] transition-colors" />
          </a>

          {/* WhatsApp */}
          <a
            href={AGENCY_INFO.whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="nautical-card p-6 flex items-start justify-between group bg-white"
          >
            <div className="space-y-2">
              <span className="text-xs font-mono text-teal-600 font-semibold">
                WhatsApp · For International Travelers
              </span>
              <h3 className="text-lg font-bold text-[var(--text)]">{AGENCY_INFO.whatsapp}</h3>
              <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed font-light">
                English support for overseas tourists and business travelers
              </p>
            </div>
            <ArrowUpRight className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--text)] transition-colors" />
          </a>
        </div>
      </div>

      {/* Inquiry Form */}
      <div className="nautical-card p-8 sm:p-10 space-y-6 bg-white">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] tracking-tight">
            ให้แอดมินเช็คโต๊ะว่างให้
          </h2>
          <p className="text-xs sm:text-sm text-[var(--muted)] mt-1.5 font-light">
            ระบุเรือ วันที่ และจำนวนคน ระบบจะสร้างข้อความเปิดเข้าแชท LINE ให้กดส่งหาแอดมินได้ทันที
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-mono uppercase text-[var(--muted)] mb-1">
                ชื่อผู้ติดต่อ
              </label>
              <input
                type="text"
                placeholder="เช่น คุณสมชาย"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-[var(--text)] text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-[var(--accent)] shadow-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-[var(--muted)] mb-1">
                เรือสำราญที่สนใจ
              </label>
              <select
                value={ship}
                onChange={(e) => setShip(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-[var(--text)] text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-[var(--accent)] shadow-xs"
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
              <label className="block text-xs font-mono uppercase text-[var(--muted)] mb-1">
                รอบเวลา
              </label>
              <select
                value={round}
                onChange={(e) => setRound(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-[var(--text)] text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-[var(--accent)] shadow-xs"
              >
                <option value="รอบซันเซ็ต (16:30 - 18:45 น.)">
                  รอบซันเซ็ต ชมพระอาทิตย์ตก (16:30 - 18:45 น.)
                </option>
                <option value="รอบดินเนอร์ (19:30 - 21:45 น.)">
                  รอบดินเนอร์ แสงสียามราตรี (19:30 - 21:45 น.)
                </option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-[var(--muted)] mb-1">
                วันที่ต้องการเดินทาง
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-[var(--text)] text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-[var(--accent)] shadow-xs"
              />
            </div>
            <div>
              <label className="block text-xs font-mono uppercase text-[var(--muted)] mb-1">
                จำนวนผู้โดยสาร
              </label>
              <select
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-lg bg-white border border-slate-300 text-[var(--text)] text-xs focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-[var(--accent)] shadow-xs"
              >
                <option value="1 ท่าน">1 ท่าน</option>
                <option value="2 ท่าน">2 ท่าน (คู่รัก)</option>
                <option value="3-5 ท่าน">3-5 ท่าน (ครอบครัว)</option>
                <option value="6-10 ท่าน">6-10 ท่าน (กลุ่มเพื่อน)</option>
                <option value="10 ท่านขึ้นไป">10 ท่านขึ้นไป (กรุ๊ปเหมาโต๊ะ)</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 !text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md hover:shadow-lg"
          >
            <MessageCircle className="w-4 h-4 fill-white text-white" />
            <span className="!text-white">เปิด LINE ส่งข้อมูลไปยังแอดมิน ({AGENCY_INFO.lineId})</span>
          </button>
        </form>
      </div>

      {/* Office & Legal info */}
      <div className="p-6 rounded-xl bg-[var(--surface-2)] border border-amber-900/10 space-y-2 text-xs text-[var(--muted)] font-light shadow-xs">
        <p>
          <strong className="text-[var(--text)] font-semibold">ที่อยู่สำนักงาน:</strong> {AGENCY_INFO.officeAddress}
        </p>
        <p>
          <strong className="text-[var(--text)] font-semibold">ใบอนุญาตประกอบธุรกิจนำเที่ยว:</strong> {AGENCY_INFO.licenseNo}
        </p>
        <p>
          <strong className="text-[var(--text)] font-semibold">เวลาทำการ:</strong> {AGENCY_INFO.workingHours}
        </p>
      </div>
    </div>
  );
};
