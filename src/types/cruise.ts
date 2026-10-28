export type PierLocation = 'ICONSIAM' | 'Asiatique' | 'River City Bangkok' | 'All';

export type CruiseTimeCategory = 'Sunset' | 'Twilight' | 'Dinner';

export interface CruiseRound {
  id: string;
  name: string;
  category: CruiseTimeCategory;
  checkInTime: string;
  cruisingTime: string;
  pier: string;
  pierGate?: string;
  adultPrice: number;
  childPrice: number;
  originalAdultPrice: number;
  rooftopPrice?: number;
  indoorPrice?: number;
  highlights: string[];
  diningImage?: string;
  diningTitle?: string;
  diningDescription?: string;
}

export interface CruiseShip {
  id: string;
  nameTh: string;
  nameEn: string;
  tagline: string;
  description: string;
  decks: number;
  capacity: number;
  rating: number;
  reviewCount: number;
  startingPrice: number;
  featured: boolean;
  pier: PierLocation;
  pierFullAddress: string;
  coordinates: { lat: number; lng: number }; // Real GPS coordinates on Chao Phraya River
  images: {
    hero: string;
    sunsetDining?: string;
    dinnerDining?: string;
    rooftop: string;
    interior: string;
    food: string;
  };
  rounds: CruiseRound[];
  foodHighlights: string[];
  entertainments: string[];
  facilities: string[];
  badge?: string;
  recommendedFor: string[];
}

export interface PierLocationInfo {
  id: PierLocation;
  name: string;
  nameEn: string;
  location: string;
  bts: string;
  coordinates: { lat: number; lng: number };
  ships: string[];
  description: string;
  mapUrl: string;
  image: string;
}

export interface Review {
  id: string;
  author: string;
  shipId: string;
  shipName: string;
  date: string;
  rating: number;
  comment: string;
  avatar: string;
  userType: string;
}
