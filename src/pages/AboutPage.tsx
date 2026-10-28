import React from 'react';
import { AGENCY_INFO, REVIEWS } from '../data/cruises';
import { ArrowUpRight, MessageCircle, ShieldCheck, HeartHandshake, Zap, Anchor } from 'lucide-react';

interface AboutPageProps {
  onNavigateToCruises: () => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigateToCruises }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      {/* Hero Section: Single P1, one sentence P2 */}
      <div className="space-y-4 border-b border-[var(--line)] pb-8">
        <h1 className="text-3xl sm:text-5xl font-bold text-[var(--text)] tracking-tight">
          เกี่ยวกับเรา
        </h1>
        <p className="text-base sm:text-lg text-[var(--muted)] leading-relaxed font-light">
          {AGENCY_INFO.nameTh} คือตัวแทนจำหน่ายบัตรล่องเรือสำราญแม่น้ำเจ้าพระยาอย่างเป็นทางการ
          เรารวบรวมข้อมูลเรือ 9 ลำยอดนิยมมาให้เทียบง่ายๆ ช่วยแนะนำลำที่ตรงใจ และช่วยเลือกโต๊ะริมน้ำมุมสวยให้ฟรี ราคาเท่าหน้าท่าเรือ
        </p>
      </div>

      {/* Key Proof Fact */}
      <div className="py-6 border-b border-[var(--line)] flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
        <div className="space-y-1">
          <p className="text-3xl sm:text-4xl font-bold text-[var(--text)] font-mono num">
            45,000+ ผู้โดยสาร
          </p>
          <p className="text-xs text-[var(--muted)]">
            ที่ไว้วางใจให้เราช่วยดูแลและจัดสรรตำแหน่งโต๊ะดินเนอร์ตลอด 7 ปีที่ผ่านมา
          </p>
        </div>

        <div className="text-left sm:text-right">
          <p className="text-2xl font-bold text-orange-600 font-mono num">4.9 / 5.0</p>
          <p className="text-xs text-[var(--muted)]">คะแนนความพึงพอใจจากลูกค้าจริง</p>
        </div>
      </div>

      {/* Commitments: Clean prose & clear value */}
      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] tracking-tight">
          สิ่งที่เราตั้งใจทำให้ลูกค้าทุกคน
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="nautical-card p-6 space-y-3 bg-white">
            <div className="w-8 h-8 rounded-md bg-amber-100 text-amber-700 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-[var(--text)]">ราคาเท่าหน้าท่าเรือ ไม่มีบวกเพิ่ม</h3>
            <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed font-light">
              จำหน่ายในราคาโปรโมชั่นพิเศษของตัวแทนหลัก การันตีราคาถูกกว่าหรือเท่ากับซื้อหน้าท่าเรือโดยตรง ไม่มีค่าธรรมเนียมแอบแฝง
            </p>
          </div>

          <div className="nautical-card p-6 space-y-3 bg-white">
            <div className="w-8 h-8 rounded-md bg-orange-100 text-orange-700 flex items-center justify-center">
              <Anchor className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-[var(--text)]">ช่วยเลือกโต๊ะมุมสวย ไม่สุ่มที่นั่ง</h3>
            <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed font-light">
              ประสานงานตรงกับเรือทุกลำเพื่อเลือกโต๊ะริมราวดาดฟ้า โต๊ะหัวเรือ หรือโต๊ะห้องแอร์ใกล้ไลน์อาหารตามความต้องการ
            </p>
          </div>

          <div className="nautical-card p-6 space-y-3 bg-white">
            <div className="w-8 h-8 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Zap className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-[var(--text)]">ส่งใบจองเข้า LINE รวดเร็ว</h3>
            <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed font-light">
              คุยกับแอดมินโดยตรง โอนชำระเงินปลอดภัย พร้อมรับใบยืนยันการจอง (E-Voucher) นำไปแสดงหน้าจุดเช็คอินเพื่อรับบัตรขึ้นเรือได้ทันที
            </p>
          </div>

          <div className="nautical-card p-6 space-y-3 bg-white">
            <div className="w-8 h-8 rounded-md bg-sky-100 text-sky-700 flex items-center justify-center">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <h3 className="text-base font-bold text-[var(--text)]">มีแอดมินคอยช่วยเหลือจนเรือออก</h3>
            <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed font-light">
              มีเจ้าหน้าที่คอยให้คำแนะนำเส้นทาง จุดจอดรถ และขั้นตอนการเช็คอินที่ท่าเรือ ICONSIAM, Asiatique และ River City ตลอดทุกวัน
            </p>
          </div>
        </div>
      </div>

      {/* Verified Guest Quotes */}
      <div className="space-y-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text)] tracking-tight">
          รีวิวจากลูกค้าที่เคยไปล่องเรือกับเรา
        </h2>

        <div className="space-y-3">
          {REVIEWS.map((rev) => (
            <div key={rev.id} className="p-5 rounded-xl bg-white border border-amber-900/10 space-y-2 shadow-xs">
              <div className="flex items-center justify-between text-xs">
                <span className="font-bold text-[var(--text)]">
                  {rev.author} <span className="text-[var(--muted)] font-normal">({rev.userType})</span>
                </span>
                <span className="text-xs font-semibold text-orange-600 font-mono">{rev.shipName}</span>
              </div>
              <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed font-light">
                “{rev.comment}”
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Call to action */}
      <div className="nautical-card p-8 sm:p-10 space-y-4 bg-gradient-to-br from-white to-[var(--surface-2)]">
        <h3 className="text-xl sm:text-2xl font-bold text-[var(--text)]">
          ยังไม่แน่ใจว่าจะเลือกลำไหนดี?
        </h3>
        <p className="text-xs sm:text-sm text-[var(--muted)] leading-relaxed max-w-lg">
          ทักแชทบอกวันที่ งบประมาณ และสไตล์ที่ต้องการได้เลย แอดมินยินดีช่วยแนะนำเรือที่เหมาะที่สุดให้ พร้อมเช็คที่นั่งว่างให้ฟรี
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <a
            href={AGENCY_INFO.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-emerald-600 hover:bg-emerald-700 !text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white text-white" />
            <span className="!text-white">ทัก LINE ปรึกษาแอดมิน ({AGENCY_INFO.lineId})</span>
          </a>
          <button
            onClick={onNavigateToCruises}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-white hover:bg-slate-50 text-[var(--text)] text-xs sm:text-sm border border-slate-300 flex items-center justify-center gap-1.5 cursor-pointer font-medium"
          >
            <span>ดูแผนที่แม่น้ำ 3D และเรือ 9 ลำ</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
