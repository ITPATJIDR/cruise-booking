import React, { useState } from 'react';
import { MessageCircle, Phone, Calendar, ChevronUp, X } from 'lucide-react';
import { AGENCY_INFO } from '../data/cruises';

interface FloatingContactBarProps {
  onOpenQuickInquiry: () => void;
}

export const FloatingContactBar: React.FC<FloatingContactBarProps> = ({ onOpenQuickInquiry }) => {
  const [isOpen, setIsOpen] = useState(true);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-auto">
      {/* Scroll to Top */}
      <button
        onClick={scrollToTop}
        className="w-10 h-10 rounded-full glass-panel border border-slate-700 hover:border-amber-500 text-slate-300 hover:text-amber-400 flex items-center justify-center shadow-lg transition-all"
        title="กลับขึ้นด้านบน"
      >
        <ChevronUp className="w-5 h-5" />
      </button>

      {/* Main Floating Quick Bar */}
      {isOpen ? (
        <div className="glass-panel p-2 rounded-2xl border border-amber-500/30 shadow-2xl flex items-center gap-2 animate-in slide-in-from-bottom-3 duration-200">
          <button
            onClick={onOpenQuickInquiry}
            className="flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 text-xs font-semibold transition-all"
          >
            <Calendar className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">เช็คที่นั่งว่าง</span>
          </button>

          <a
            href={`tel:${AGENCY_INFO.hotline.replace(/-/g, '')}`}
            className="flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold border border-slate-700 transition-colors"
          >
            <Phone className="w-4 h-4 text-amber-400" />
            <span className="hidden md:inline">{AGENCY_INFO.hotline}</span>
            <span className="md:hidden">โทร</span>
          </a>

          <a
            href={AGENCY_INFO.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="relative flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-white font-bold text-xs shadow-lg shadow-emerald-600/30 transition-all transform hover:scale-105"
          >
            <span className="absolute -top-1 -right-1 flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-300 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
            </span>
            <MessageCircle className="w-4 h-4 fill-current" />
            <span>LINE จองด่วน</span>
          </a>

          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-full text-slate-400 hover:text-slate-200"
            title="ซ่อน"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="w-13 h-13 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 text-white flex items-center justify-center shadow-xl shadow-emerald-600/40 hover:scale-105 transition-transform"
          title="ติดต่อเจ้าหน้าที่ด่วน"
        >
          <MessageCircle className="w-6 h-6 fill-current" />
        </button>
      )}
    </div>
  );
};
