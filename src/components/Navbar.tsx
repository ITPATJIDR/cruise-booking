import React, { useState } from 'react';
import { Ship, MessageCircle, Menu, X, ArrowUpRight } from 'lucide-react';
import { AGENCY_INFO } from '../data/cruises';

interface NavbarProps {
  activeTab: 'home' | 'cruises' | 'about' | 'contact';
  setActiveTab: (tab: 'home' | 'cruises' | 'about' | 'contact') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'หน้าแรก' },
    { id: 'cruises', label: 'แผนที่ & เรือ 9 ลำ' },
    { id: 'about', label: 'เกี่ยวกับเรา' },
    { id: 'contact', label: 'ติดต่อเรา' },
  ] as const;

  const handleNav = (id: 'home' | 'cruises' | 'about' | 'contact') => {
    setActiveTab(id);
    setIsMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-[#08090c]/85 backdrop-blur-md border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Minimal Logo */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-2.5 text-left group"
        >
          <div className="w-8 h-8 rounded-xl bg-white/10 flex items-center justify-center text-white group-hover:bg-white group-hover:text-black transition-colors">
            <Ship className="w-4 h-4" />
          </div>
          <div className="font-semibold text-white tracking-tight text-sm">
            <span>Siam Sunset</span>
            <span className="text-white/40 ml-1 font-normal text-xs font-mono">Agency</span>
          </div>
        </button>

        {/* Clean Center Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-white/[0.04] p-1 rounded-full border border-white/5 text-xs font-medium">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`px-4 py-1.5 rounded-full transition-all ${
                  isActive
                    ? 'bg-white text-black font-semibold shadow-sm'
                    : 'text-white/60 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right Action: LINE CTA */}
        <div className="hidden sm:flex items-center gap-3">
          <a
            href={AGENCY_INFO.lineUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-semibold transition-all"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-current" />
            <span>ทัก LINE</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden p-2 rounded-xl bg-white/5 text-white/70 hover:text-white"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden px-4 py-4 bg-[#0d0e14] border-b border-white/10 space-y-2 text-sm animate-in fade-in duration-150">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`block w-full text-left px-4 py-2.5 rounded-xl transition-colors ${
                activeTab === link.id
                  ? 'bg-white text-black font-semibold'
                  : 'text-white/70 hover:bg-white/5'
              }`}
            >
              {link.label}
            </button>
          ))}
          <div className="pt-2">
            <a
              href={AGENCY_INFO.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-semibold text-xs text-center"
            >
              <MessageCircle className="w-4 h-4 fill-current" />
              <span>ติดต่อจองผ่าน LINE</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
