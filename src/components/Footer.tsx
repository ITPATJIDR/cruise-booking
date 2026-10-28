import React from 'react';
import { AGENCY_INFO } from '../data/cruises';
import { Ship } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: 'home' | 'cruises' | 'about' | 'contact') => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  return (
    <footer className="mt-auto border-t border-white/5 py-12 px-4 sm:px-6 lg:px-8 bg-[#06070a] text-xs text-white/50">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-white/10 flex items-center justify-center text-white">
            <Ship className="w-3.5 h-3.5" />
          </div>
          <div>
            <p className="font-semibold text-white text-xs">{AGENCY_INFO.nameEn}</p>
            <p className="text-[11px] text-white/40">{AGENCY_INFO.licenseNo}</p>
          </div>
        </div>

        <nav className="flex items-center gap-6">
          <button onClick={() => { setActiveTab('home'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">
            หน้าแรก
          </button>
          <button onClick={() => { setActiveTab('cruises'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">
            แผนที่เรือ 9 ลำ
          </button>
          <button onClick={() => { setActiveTab('about'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">
            เกี่ยวกับเรา
          </button>
          <button onClick={() => { setActiveTab('contact'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors">
            ติดต่อเรา
          </button>
        </nav>

        <p className="text-white/40">
          © 2026 {AGENCY_INFO.nameEn}. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
