import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { CruisesPage } from './pages/CruisesPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ShipSideModal } from './components/ShipSideModal';
import { CruiseShip } from './types/cruise';
import { MessageCircle, ArrowUp } from 'lucide-react';
import { AGENCY_INFO } from './data/cruises';

export function App() {
  const [activeTab, setActiveTab] = useState<'home' | 'cruises' | 'about' | 'contact'>('home');
  const [selectedShip, setSelectedShip] = useState<CruiseShip | null>(null);

  const handleSelectShip = (ship: CruiseShip) => {
    setSelectedShip(ship);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#08090c] text-white flex flex-col font-prompt selection:bg-white selection:text-black">
      {/* Minimal Navbar */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      {/* Main Pages */}
      <main className="flex-1">
        {activeTab === 'home' && (
          <HomePage
            onSelectShip={handleSelectShip}
            onNavigateToCruises={() => {
              setActiveTab('cruises');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'cruises' && (
          <CruisesPage
            onSelectShip={handleSelectShip}
            selectedShipId={selectedShip?.id}
          />
        )}

        {activeTab === 'about' && (
          <AboutPage
            onNavigateToCruises={() => {
              setActiveTab('cruises');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {activeTab === 'contact' && <ContactPage />}
      </main>

      {/* Minimal Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Right Side Modal / Drawer for Ship details */}
      <ShipSideModal
        ship={selectedShip}
        onClose={() => setSelectedShip(null)}
      />

      {/* Floating Action Buttons (Clean & Minimal) */}
      <div className="fixed bottom-6 right-6 z-30 flex items-center gap-2">
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-[#14161f] border border-white/10 text-white/60 hover:text-white flex items-center justify-center shadow-lg transition-colors"
          title="ขึ้นด้านบน"
        >
          <ArrowUp className="w-4 h-4" />
        </button>

        <a
          href={AGENCY_INFO.lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs shadow-xl transition-all hover:scale-105"
        >
          <MessageCircle className="w-4 h-4 fill-current" />
          <span>ทัก LINE</span>
        </a>
      </div>
    </div>
  );
}

export default App;
