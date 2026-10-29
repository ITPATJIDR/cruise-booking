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
    <div className="min-h-screen bg-[var(--bg)] text-[var(--text)] flex flex-col font-prompt selection:bg-[var(--accent)] selection:text-[var(--on-accent)]">
      {/* Editorial Navbar */}
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

      {/* Editorial Footer */}
      <Footer setActiveTab={setActiveTab} />

      {/* Boarding Specification Drawer */}
      <ShipSideModal
        ship={selectedShip}
        onClose={() => setSelectedShip(null)}
      />

      {/* Floating Action Buttons (the 3D home page has its own LINE button and clock in this corner) */}
      {activeTab !== 'home' && <div className="fixed bottom-6 right-6 z-30 flex items-center gap-2">
        <button
          onClick={scrollToTop}
          className="w-10 h-10 rounded-full bg-[#10131b] border border-[var(--line-strong)] text-[var(--muted)] hover:text-white flex items-center justify-center shadow-lg transition-colors cursor-pointer"
          title="ขึ้นด้านบน"
        >
          <ArrowUp className="w-4 h-4" />
        </button>

        <a
          href={AGENCY_INFO.lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[var(--emerald-action)] hover:bg-emerald-700 !text-white font-semibold text-xs shadow-xl transition-transform hover:scale-105 cursor-pointer"
        >
          <MessageCircle className="w-4 h-4 fill-white text-white" />
          <span className="!text-white">ทัก LINE</span>
        </a>
      </div>}
    </div>
  );
}

export default App;
