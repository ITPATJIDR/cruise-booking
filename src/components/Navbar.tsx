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
    <header className="sticky top-0 z-40 w-full bg-[#fbf8f3]/90 backdrop-blur-md border-b border-[var(--line)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-18 flex items-center justify-between">
        {/* Brand Mark */}
        <button
          onClick={() => handleNav('home')}
          className="flex items-center gap-3 text-left group cursor-pointer"
        >
          <div className="w-8 h-8 rounded-md bg-[var(--accent)] flex items-center justify-center text-white shadow-sm transition-transform group-hover:scale-105">
            <Ship className="w-4 h-4" />
          </div>
          <div>
            <div className="font-bold text-[var(--text)] tracking-wider text-sm font-display uppercase">
              Siam Sunset
            </div>
            <div className="text-[10px] text-[var(--muted)] font-mono tracking-widest uppercase">
              Cruise Agency
            </div>
          </div>
        </button>

        {/* Center Navigation */}
        <nav className="hidden md:flex items-center gap-1 bg-[var(--surface-2)] p-1 rounded-full border border-[var(--line)] text-xs font-medium shadow-sm">
          {navLinks.map((link) => {
            const isActive = activeTab === link.id;
            return (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`px-4 py-1.5 rounded-full transition-colors cursor-pointer ${
                  isActive
                    ? 'bg-[var(--ink)] text-[var(--on-ink)] font-semibold shadow-sm'
                    : 'text-[var(--muted)] hover:text-[var(--text)]'
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
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--emerald-action)] hover:bg-emerald-700 !text-white text-xs font-semibold transition-colors shadow-sm"
          >
            <MessageCircle className="w-3.5 h-3.5 fill-white text-white" />
            <span className="!text-white">คุยกับแอดมิน LINE</span>
            <ArrowUpRight className="w-3.5 h-3.5 !text-white" />
          </a>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden p-2 rounded-md bg-[var(--surface-2)] text-[var(--muted)] hover:text-[var(--text)] cursor-pointer"
          aria-label="เมนู"
        >
          {isMobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileOpen && (
        <div className="md:hidden px-4 py-4 bg-[var(--surface)] border-b border-[var(--line)] space-y-2 text-sm shadow-xl">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNav(link.id)}
              className={`block w-full text-left px-4 py-2.5 rounded-md transition-colors ${
                activeTab === link.id
                  ? 'bg-[var(--ink)] text-[var(--on-ink)] font-semibold'
                  : 'text-[var(--muted)] hover:bg-[var(--surface-2)]'
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
              className="flex items-center justify-center gap-2 w-full py-2.5 rounded-full bg-[var(--emerald-action)] !text-white font-semibold text-xs text-center shadow-sm"
            >
              <MessageCircle className="w-4 h-4 fill-white text-white" />
              <span className="!text-white">ติดต่อจองผ่าน LINE</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
};
