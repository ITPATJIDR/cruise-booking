import React from 'react';
import { AGENCY_INFO, CRUISE_SHIPS, REVIEWS } from '../data/cruises';
import { ArrowUpRight, MessageCircle, Phone, Star } from 'lucide-react';

interface AboutPageProps {
  onNavigateToCruises: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateToCruises }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Title */}
      <div className="space-y-3">
        <span className="text-xs font-mono text-white/50 tracking-wider uppercase">
          About Agency
        </span>
        <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
          เกี่ยวกับเรา
        </h1>
        <p className="text-sm sm:text-base text-white/70 leading-relaxed font-light">
          {AGENCY_INFO.nameTh} คือตัวแทนจำหน่ายบัตรล่องเรือสำราญแม่น้ำเจ้าพระยาอย่างเป็นทางการ
          เราให้บริการประสานงาน จองที่นั่ง และแนะนำเรือ 9 ลำที่ตรงกับความต้องการและงบประมาณของคุณมากที่สุด
        </p>
      </div>

      {/* Facts */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-white/5 text-center">
        <div>
          <p className="text-2xl font-bold text-white font-mono">9</p>
          <p className="text-xs text-white/50 mt-1">เรือสำราญพันธมิตร</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-white font-mono">7+ ปี</p>
          <p className="text-xs text-white/50 mt-1">ประสบการณ์ดูแลลูกค้า</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-white font-mono">45k+</p>
          <p className="text-xs text-white/50 mt-1">ผู้โดยสารที่ไว้วางใจ</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-white font-mono">4.9 / 5</p>
          <p className="text-xs text-white/50 mt-1">คะแนนความพึงพอใจ</p>
        </div>
      </div>

      {/* Philosophy / Why us */}
      <div className="space-y-6">
        <h2 className="text-xl font-bold text-white tracking-tight">
          ทำไมถึงควรจองผ่านเรา
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="minimal-card p-6 space-y-2">
            <h3 className="text-sm font-bold text-white">ราคามาตรฐาน ไม่บวกเพิ่ม</h3>
            <p className="text-xs text-white/60 leading-relaxed font-light">
              เราจำหน่ายในราคาโปรโมชั่นพิเศษของตัวแทนหลัก การันตีถูกกว่าหรือเท่ากับซื้อหน้าท่าเรือโดยตรง
            </p>
          </div>

          <div className="minimal-card p-6 space-y-2">
            <h3 className="text-sm font-bold text-white">ช่วยล็อกโต๊ะวิวดาดฟ้าที่ดีที่สุด</h3>
            <p className="text-xs text-white/60 leading-relaxed font-light">
              ทีมงานช่วยประสานกับเรือเพื่อจัดสรรตำแหน่งที่นั่งที่ดีที่สุด สำหรับคู่รัก ครอบครัว หรือวันเกิด
            </p>
          </div>

          <div className="minimal-card p-6 space-y-2">
            <h3 className="text-sm font-bold text-white">รับ E-Voucher ทาง LINE ใน 5 นาที</h3>
            <p className="text-xs text-white/60 leading-relaxed font-light">
              ไม่ต้องกรอกขั้นตอนเยอะ คุยกับแอดมินโดยตรง โอนชำระ รับตั๋วพร้อมใช้แสดงหน้างานได้ทันที
            </p>
          </div>

          <div className="minimal-card p-6 space-y-2">
            <h3 className="text-sm font-bold text-white">มีเจ้าหน้าที่สแตนด์บายที่ท่าเรือ</h3>
            <p className="text-xs text-white/60 leading-relaxed font-light">
              มีจุดบริการนัดรับตั๋วและให้คำแนะนำการเดินทางที่ ICONSIAM, Asiatique และ River City
            </p>
          </div>
        </div>
      </div>

      {/* Reviews Minimal */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-white tracking-tight">
          เสียงตอบรับจากลูกค้า
        </h2>

        <div className="space-y-3">
          {REVIEWS.map((rev) => (
            <div key={rev.id} className="minimal-card p-5 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="font-semibold text-white">{rev.author} ({rev.userType})</span>
                <span className="text-white/40">{rev.shipName}</span>
              </div>
              <p className="text-xs text-white/70 leading-relaxed font-light">
                "{rev.comment}"
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact box */}
      <div className="minimal-card p-8 text-center space-y-4">
        <h3 className="text-lg font-bold text-white">ต้องการปรึกษาเรือที่เหมาะกับคุณ?</h3>
        <p className="text-xs text-white/60 max-w-sm mx-auto">
          ทัก LINE หาเราได้ตลอดเวลา เราพร้อมตอบคำถามและเช็คที่นั่งว่างให้ทันที
        </p>
        <div className="flex justify-center gap-3 pt-2">
          <a
            href={AGENCY_INFO.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-xs flex items-center gap-1.5"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current text-emerald-600" />
            <span>ทัก LINE: {AGENCY_INFO.lineId}</span>
          </a>
          <button
            onClick={onNavigateToCruises}
            className="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-white text-xs border border-white/10 flex items-center gap-1.5"
          >
            <span>ดูเรือ 9 ลำบนแผนที่</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
