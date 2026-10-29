import React, { useEffect } from 'react';
import { CRUISE_SHIPS, AGENCY_INFO } from '../data/cruises';
import { CruiseShip } from '../types/cruise';

interface HomePageProps {
  onSelectShip: (ship: CruiseShip) => void;
  onNavigateToCruises: () => void;
}

declare global {
  interface Window {
    __SSC__?: { ships: CruiseShip[]; agency: typeof AGENCY_INFO };
  }
}

// The landing page is the scroll-driven 3D river story in public/landing (plain three.js).
// It reads the ships and contacts from window.__SSC__ and posts back when a visitor wants more.
window.__SSC__ = { ships: CRUISE_SHIPS, agency: AGENCY_INFO };

export const HomePage: React.FC<HomePageProps> = ({ onSelectShip, onNavigateToCruises }) => {
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== location.origin || !e.data?.ssc) return;
      if (e.data.type === 'ship') {
        const ship = CRUISE_SHIPS.find((s) => s.id === e.data.id);
        if (ship) onSelectShip(ship);
      } else if (e.data.type === 'cruises') {
        onNavigateToCruises();
      }
    };
    window.addEventListener('message', onMessage);
    return () => window.removeEventListener('message', onMessage);
  }, [onSelectShip, onNavigateToCruises]);

  return (
    <iframe
      src="/landing/index.html"
      title="ล่องเรือดินเนอร์เจ้าพระยา 3 มิติ"
      className="block w-full h-[calc(100dvh-4rem)] sm:h-[calc(100dvh-4.5rem)] border-0 bg-[#0a0e14]"
    />
  );
};
