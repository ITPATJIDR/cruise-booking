import React from 'react';
import { AGENCY_INFO } from '../data/cruises';
import { Ship, MessageCircle, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: 'home' | 'cruises' | 'about' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="mt-auto border-t border-amber-900/10 py-12 px-4 sm:px-6 lg:px-8 bg-[#f5ede0] text-xs text-[var(--muted)]">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-8 border-b border-amber-900/10 pb-8">
          {/* Brand & Mission */}
          <div className="space-y-3 max-w-sm">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-md bg-[var(--accent)] flex items-center justify-center text-white shadow-sm">
                <Ship className="w-4 h-4" />
              </div>
              <span className="font-bold text-[var(--text)] tracking-wider uppercase font-display text-sm">
                {AGENCY_INFO.nameEn}
              </span>
            </div>
            <p className="text-xs text-[var(--muted)] leading-relaxed font-light">
              ตัวแทนจำหน่ายบัตรเรือสำราญแม่น้ำเจ้าพระยาอย่างเป็นทางการ บริการเทียบเรือ 9 ลำ
              แนะนำรอบเวลาซันเซ็ตและดินเนอร์ พร้อมช่วยล็อกตำแหน่งโต๊ะดาดฟ้าที่ดีที่สุด
            </p>
          </div>

          {/* Quick Nav */}
          <div className="space-y-2">
            <span className="text-[11px] font-mono uppercase text-[var(--text)] font-semibold tracking-wider">
              แผนผังเว็บไซต์
            </span>
            <nav className="flex flex-col space-y-1.5 text-xs">
              <button
                onClick={() => {
                  setActiveTab('home');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-left text-[var(--muted)] hover:text-[var(--accent-strong)] transition-colors cursor-pointer"
              >
                หน้าแรก
              </button>
              <button
                onClick={() => {
                  setActiveTab('cruises');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-left text-[var(--muted)] hover:text-[var(--accent-strong)] transition-colors cursor-pointer"
              >
                แผนที่ & เรือ 9 ลำ
              </button>
              <button
                onClick={() => {
                  setActiveTab('about');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-left text-[var(--muted)] hover:text-[var(--accent-strong)] transition-colors cursor-pointer"
              >
                เกี่ยวกับเรา
              </button>
              <button
                onClick={() => {
                  setActiveTab('contact');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="text-left text-[var(--muted)] hover:text-[var(--accent-strong)] transition-colors cursor-pointer"
              >
                ติดต่อทีมงาน
              </button>
            </nav>
          </div>

          {/* Contact Fast Info */}
          <div className="space-y-2 text-xs">
            <span className="text-[11px] font-mono uppercase text-[var(--text)] font-semibold tracking-wider">
              ติดต่อสอบถาม
            </span>
            <p className="text-[var(--text)] font-semibold flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5 text-[var(--accent-strong)]" />
              <span>สายด่วน: {AGENCY_INFO.hotline}</span>
            </p>
            <p className="text-[var(--muted)] flex items-center gap-1.5">
              <MessageCircle className="w-3.5 h-3.5 text-[var(--emerald-action)]" />
              <span className="font-medium">LINE: {AGENCY_INFO.lineId}</span>
            </p>
            <p className="text-[var(--muted)]">
              เปิดบริการทุกวัน: {AGENCY_INFO.workingHours}
            </p>
          </div>
        </div>

        {/* Legal & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[var(--muted)]">
          <p>
            {AGENCY_INFO.licenseNo} · สำนักงาน: {AGENCY_INFO.officeAddress}
          </p>
          <p className="font-mono">
            © 2026 {AGENCY_INFO.nameEn}. ให้บริการด้วยความจริงใจและดูแลทุกการเดินทาง
          </p>
        </div>
      </div>
    </footer>
  );
};
