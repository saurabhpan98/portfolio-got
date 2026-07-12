import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Map, Shield, Anchor, HelpCircle, Star, Sparkles } from 'lucide-react';

interface RealmMapProps {
  onScrollToSection?: (sectionId: string) => void;
  onNavigate?: (sectionId: string) => void;
  accentColor?: string;
}

interface MapLocation {
  id: string;
  name: string;
  sub: string;
  sectionId: string;
  x: string; // percentage from left
  y: string; // percentage from top
  description: string;
  alliance: 'stark' | 'targaryen' | 'lannister' | 'nightswatch' | 'neutral';
  markerType: 'castle' | 'citadel' | 'bank' | 'harbor' | 'fort';
}

const MAP_LOCATIONS: MapLocation[] = [
  {
    id: 'kings-landing',
    name: "King's Landing",
    sub: "The Great Hall",
    sectionId: 'hero-great-hall',
    x: '48%',
    y: '58%',
    description: "The capital of the realm. Where Saurabh's throne sits and your journey begins.",
    alliance: 'targaryen',
    markerType: 'castle'
  },
  {
    id: 'winterfell',
    name: "Winterfell Keep",
    sub: "The Great Keeps (Projects)",
    sectionId: 'projects-section',
    x: '38%',
    y: '22%',
    description: "Stronghold of the North. Houses the frozen relics and codebases of heavy engineering.",
    alliance: 'stark',
    markerType: 'castle'
  },
  {
    id: 'the-wall',
    name: "Castle Black & The Wall",
    sub: "The Battle Ledger (GitHub)",
    sectionId: 'github-analytics-section',
    x: '45%',
    y: '8%',
    description: "The icy boundary of the realm. Monitors server health, pull requests, and battle commits.",
    alliance: 'nightswatch',
    markerType: 'fort'
  },
  {
    id: 'casterly-rock',
    name: "Casterly Rock",
    sub: "Royal Services (Offerings)",
    sectionId: 'services-section',
    x: '20%',
    y: '52%',
    description: "Golden seat of wealth. Showcases Saurabh's specialized architectural services & consultations.",
    alliance: 'lannister',
    markerType: 'bank'
  },
  {
    id: 'oldtown',
    name: "The Citadel",
    sub: "Citadel Studies (Timeline)",
    sectionId: 'campaigns-section', // corresponds to CitadelStudies section ID
    x: '18%',
    y: '78%',
    description: "The center of lore and learning. Houses Saurabh's academic timeline, campaigns, and degrees.",
    alliance: 'neutral',
    markerType: 'citadel'
  },
  {
    id: 'valyrian-armory',
    name: "Valyrian Armory",
    sub: "Chronicles (Skills)",
    sectionId: 'chronicles-section',
    x: '55%',
    y: '40%',
    description: "Where weapons of mass compilation are forged. Showcases developer skills and tech stack analogs.",
    alliance: 'targaryen',
    markerType: 'fort'
  },
  {
    id: 'dragonstone',
    name: "Dragonstone Rookery",
    sub: "The Rookery (Contact)",
    sectionId: 'contact-section',
    x: '68%',
    y: '54%',
    description: "Volcanic island in Blackwater Bay. Send a swift raven to establish contact with the Master Smith.",
    alliance: 'targaryen',
    markerType: 'castle'
  },
  {
    id: 'braavos',
    name: "The Free City of Braavos",
    sub: "Lords Testimonials (Reviews)",
    sectionId: 'reviews-section',
    x: '82%',
    y: '42%',
    description: "Home of the Iron Bank and Faceless Men. Holds testimonials from lords and masters across the narrow sea.",
    alliance: 'neutral',
    markerType: 'bank'
  }
];

export const RealmMap: React.FC<RealmMapProps> = ({ onScrollToSection, onNavigate, accentColor }) => {
  const [hoveredLocation, setHoveredLocation] = useState<MapLocation | null>(null);
  const [showMapLegend, setShowMapLegend] = useState(false);

  return (
    <section id="realm-map-section" className="w-full max-w-6xl mx-auto px-4 py-16 relative overflow-hidden select-none">
      
      {/* Heavy stone divider header */}
      <div className="text-center mb-10">
        <span className="font-mono text-[10px] text-stone-500 uppercase tracking-[0.4em] block">Navigational Chart</span>
        <h2 className="font-display text-2xl md:text-3xl text-stone-100 uppercase tracking-widest font-bold mt-2 flex items-center justify-center gap-3">
          <Compass className="w-6 h-6 text-gold animate-spin-slow" />
          The Map of Saurabh's Realm
          <Map className="w-6 h-6 text-gold" />
        </h2>
        <p className="font-sans text-stone-400 text-sm max-w-xl mx-auto mt-2 leading-relaxed">
          Traverse the lands of House Panchal. Hover over the legendary castles, ports, and keeps to view their contents, and click to fly your dragon directly there.
        </p>
      </div>

      {/* Medieval Parchment Map Wrapper */}
      <div className="relative w-full aspect-[16/10] min-h-[400px] md:min-h-[500px] lg:min-h-[600px] rounded-2xl overflow-hidden border border-amber-900/40 shadow-2xl map-water-bg p-4 md:p-8 flex flex-col justify-between">
        
        {/* Full Interactive Landmass Vector Drawing (Glow-infused coastlines and land regions) */}
        <svg 
          viewBox="0 0 1600 1000" 
          className="absolute inset-0 w-full h-full pointer-events-none select-none z-0 opacity-80"
        >
          <defs>
            <linearGradient id="land-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(46, 125, 78, 0.85)" />
              <stop offset="50%" stopColor="rgba(56, 142, 88, 0.78)" />
              <stop offset="100%" stopColor="rgba(34, 101, 60, 0.88)" />
            </linearGradient>
            
            <filter id="coast-glow" x="-10%" y="-10%" width="120%" height="120%">
              <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#d4af37" floodOpacity="0.4" />
            </filter>
          </defs>

          {/* Westeros Continent Landmass */}
          <path 
            d="M 720,80 L 800,80 C 830,110 820,150 780,180 C 740,190 710,210 680,240 C 630,260 640,300 580,340 C 550,370 480,390 460,430 C 470,450 510,470 550,480 C 610,490 640,510 560,540 C 530,550 520,560 590,570 C 650,570 670,590 650,600 C 630,610 640,650 670,670 C 690,700 660,750 600,780 C 610,810 660,830 640,870 C 580,890 480,900 380,890 C 280,880 230,850 180,820 C 140,800 130,780 150,750 C 90,730 70,690 100,650 C 110,610 120,570 150,540 C 140,490 130,450 160,410 C 120,370 140,320 170,290 C 200,270 220,230 230,190 C 240,170 210,120 340,80 Z"
            fill="url(#land-gradient)"
            stroke="rgba(212, 175, 55, 0.6)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#coast-glow)"
          />

          {/* Westeros Coast Ripples */}
          <path 
            d="M 720,80 L 800,80 C 830,110 820,150 780,180 C 740,190 710,210 680,240 C 630,260 640,300 580,340 C 550,370 480,390 460,430 C 470,450 510,470 550,480 C 610,490 640,510 560,540 C 530,550 520,560 590,570 C 650,570 670,590 650,600 C 630,610 640,650 670,670 C 690,700 660,750 600,780 C 610,810 660,830 640,870 C 580,890 480,900 380,890 C 280,880 230,850 180,820 C 140,800 130,780 150,750 C 90,730 70,690 100,650 C 110,610 120,570 150,540 C 140,490 130,450 160,410 C 120,370 140,320 170,290 C 200,270 220,230 230,190 C 240,170 210,120 340,80 Z"
            fill="none"
            stroke="rgba(147, 197, 253, 0.22)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Essos Continent Landmass */}
          <path 
            d="M 1600,250 C 1510,240 1420,265 1340,290 C 1290,305 1255,355 1285,420 C 1295,450 1265,490 1245,530 C 1225,570 1245,630 1205,690 C 1185,720 1225,770 1255,820 L 1600,870 Z"
            fill="url(#land-gradient)"
            stroke="rgba(212, 175, 55, 0.6)"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#coast-glow)"
          />

          {/* Essos Ripples */}
          <path 
            d="M 1600,250 C 1510,240 1420,265 1340,290 C 1290,305 1255,355 1285,420 C 1295,450 1265,490 1245,530 C 1225,570 1245,630 1205,690 C 1185,720 1225,770 1255,820 L 1600,870 Z"
            fill="none"
            stroke="rgba(147, 197, 253, 0.22)"
            strokeWidth="7"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Dragonstone Island */}
          <path 
            d="M 1060,530 C 1080,510 1100,520 1110,540 C 1120,560 1100,580 1080,570 C 1060,560 1050,540 1060,530 Z"
            fill="rgba(239, 68, 68, 0.25)"
            stroke="rgba(239, 68, 68, 0.65)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Valyrian Armory Island */}
          <path 
            d="M 850,380 C 870,360 910,380 900,410 C 890,430 860,420 850,380 Z"
            fill="url(#land-gradient)"
            stroke="rgba(212, 175, 55, 0.6)"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Iron Islands */}
          <path 
            d="M 200,380 C 210,370 220,380 215,395 C 205,400 195,390 200,380 Z"
            fill="url(#land-gradient)"
            stroke="rgba(212, 175, 55, 0.6)"
            strokeWidth="1.5"
          />
          <path 
            d="M 230,375 C 240,365 245,375 240,385 C 235,390 225,385 230,375 Z"
            fill="url(#land-gradient)"
            stroke="rgba(212, 175, 55, 0.6)"
            strokeWidth="1.5"
          />
        </svg>

        {/* Subtle Map Coordinates, lines, Compass Rose in bg */}
        <div className="absolute inset-0 opacity-30 pointer-events-none select-none z-0">
          {/* Grid lines */}
          <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(196,164,90,0.18) 1.5px, transparent 1.5px)', backgroundSize: '40px 40px' }} />
          {/* Compass rose image/shape drawing */}
          <div className="absolute right-12 bottom-12 w-48 h-48 border-2 border-dashed border-amber-900/40 rounded-full flex items-center justify-center">
            <div className="absolute w-full h-[1px] bg-amber-900/30" />
            <div className="absolute h-full w-[1px] bg-amber-900/30" />
            <span className="absolute -top-6 text-amber-500/75 font-display font-bold">N</span>
            <span className="absolute -bottom-6 text-amber-500/75 font-display font-bold">S</span>
            <span className="absolute -left-6 text-amber-500/75 font-display font-bold">W</span>
            <span className="absolute -right-6 text-amber-500/75 font-display font-bold">E</span>
          </div>
        </div>

        {/* Hand drawn-like landscape decorations */}
        {/* Sea Monster Symbol */}
        <div className="absolute right-1/4 top-1/4 opacity-35 pointer-events-none text-amber-500/80">
          <Anchor className="w-12 h-12 rotate-45 text-amber-600/60" />
          <span className="font-decorative text-[9px] block tracking-widest uppercase mt-1 text-amber-600/70">Sunset Sea</span>
        </div>

        {/* Valyrian Sea Decorative Name */}
        <div className="absolute left-[35%] bottom-[25%] opacity-40 pointer-events-none text-amber-600 select-none">
          <span className="font-decorative text-[11px] font-bold block tracking-[0.4em] uppercase">The Narrow Sea</span>
        </div>

        {/* Mountains sketch decorations (rendered using pure CSS shapes for rustic feel) */}
        <div className="absolute left-6 top-1/3 opacity-35 pointer-events-none text-amber-500/80 flex gap-1">
          <span className="text-2xl">▲</span>
          <span className="text-xl">▲</span>
          <span className="text-2xl">▲</span>
          <span className="font-mono text-[9px] uppercase self-end tracking-wider ml-1 text-amber-500/60">Frostfangs</span>
        </div>

        <div className="absolute right-[15%] bottom-[15%] opacity-35 pointer-events-none text-amber-500/80 flex gap-1">
          <span className="text-2xl">▲</span>
          <span className="text-xl">▲</span>
          <span className="font-mono text-[9px] uppercase self-end tracking-wider ml-1 text-amber-500/60">Red Mountains</span>
        </div>

        {/* Dotted paths connecting some key points */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 stroke-amber-500/60 stroke-2 stroke-dasharray-[4,6] fill-none">
          {/* Winterfell to Kings Landing */}
          <path d="M 38%,22% Q 42%,40% 48%,58%" />
          {/* Kings Landing to Dragonstone */}
          <path d="M 48%,58% Q 58%,56% 68%,54%" />
          {/* Kings Landing to Casterly Rock */}
          <path d="M 48%,58% Q 34%,55% 20%,52%" />
          {/* Casterly Rock to Oldtown */}
          <path d="M 20%,52% Q 19%,65% 18%,78%" />
          {/* Kings Landing to Oldtown */}
          <path d="M 48%,58% Q 33%,68% 18%,78%" />
          {/* Winterfell to The Wall */}
          <path d="M 38%,22% Q 41.5%,15% 45%,8%" />
          {/* Dragonstone to Braavos */}
          <path d="M 68%,54% Q 75%,48% 82%,42%" />
          {/* Valyrian Armory to Kings Landing */}
          <path d="M 55%,40% Q 51.5%,49% 48%,58%" />
        </svg>

        {/* Map Header details */}
        <div className="flex justify-between items-start z-10">
          <div className="border border-amber-900/40 p-2 md:p-3 bg-stone-950/80 backdrop-blur rounded shadow-md max-w-[200px]">
            <h4 className="font-display text-[10px] md:text-xs text-amber-400 uppercase font-bold tracking-widest border-b border-amber-900/30 pb-1 flex items-center gap-1.5">
              <Compass className="w-3.5 h-3.5 text-gold" />
              Saurabh's Map
            </h4>
            <p className="font-mono text-[8px] text-stone-400 mt-1 leading-normal">
              Acquired from the Citadel archives. Updated 305 AC.
            </p>
          </div>

          <button
            onClick={() => setShowMapLegend(!showMapLegend)}
            className="px-2.5 py-1.5 border border-amber-950/40 hover:bg-amber-950/10 text-amber-950 font-mono text-[9px] uppercase tracking-widest rounded-sm cursor-pointer transition-colors"
          >
            {showMapLegend ? "Close Legend" : "Show Legend"}
          </button>
        </div>

        {/* Interactive Location Markers */}
        <div className="absolute inset-0">
          {MAP_LOCATIONS.map((loc) => {
            const isHovered = hoveredLocation?.id === loc.id;
            
            // Marker color scheme based on alliance
            let markerColor = 'text-amber-500';
            let pulseColor = 'bg-amber-500';
            if (loc.alliance === 'stark') {
              markerColor = 'text-sky-400';
              pulseColor = 'bg-sky-400';
            } else if (loc.alliance === 'targaryen') {
              markerColor = 'text-red-500';
              pulseColor = 'bg-red-500';
            } else if (loc.alliance === 'lannister') {
              markerColor = 'text-amber-400';
              pulseColor = 'bg-amber-400';
            } else if (loc.alliance === 'nightswatch') {
              markerColor = 'text-stone-300';
              pulseColor = 'bg-stone-300';
            }

            return (
              <div
                key={loc.id}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-20 group"
                style={{ left: loc.x, top: loc.y }}
                onMouseEnter={() => setHoveredLocation(loc)}
                onMouseLeave={() => setHoveredLocation(null)}
                onClick={() => {
                  const navigateFn = onScrollToSection || onNavigate;
                  if (navigateFn) {
                    navigateFn(loc.sectionId);
                  }
                  try {
                    // subtle sound
                    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
                    if (AudioContext) {
                      const ctx = new AudioContext();
                      if (ctx.state === 'suspended') {
                        ctx.resume();
                      }
                      const osc = ctx.createOscillator();
                      const gain = ctx.createGain();
                      osc.type = 'triangle';
                      osc.frequency.setValueAtTime(200, ctx.currentTime);
                      osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.3);
                      gain.gain.setValueAtTime(0.05, ctx.currentTime);
                      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.3);
                      osc.connect(gain);
                      gain.connect(ctx.destination);
                      osc.start();
                      osc.stop(ctx.currentTime + 0.3);
                    }
                  } catch (e) {}
                }}
              >
                {/* Glowing target ring */}
                <div className="relative flex items-center justify-center">
                  <div className={`absolute w-8 h-8 rounded-full ${pulseColor}/15 scale-75 group-hover:scale-125 group-hover:bg-amber-500/25 transition-all duration-300 animate-ping`} />
                  <div className={`absolute w-5 h-5 rounded-full ${pulseColor}/20 scale-90 group-hover:scale-110 transition-all`} />
                  
                  {/* Castle Tower / Citadel / Vault Icon marker */}
                  <div className={`z-10 p-1.5 bg-amber-50/95 border border-amber-950/40 rounded-full shadow group-hover:scale-110 group-hover:border-amber-950 transition-transform ${markerColor}`}>
                    {loc.markerType === 'castle' && <Shield className="w-3.5 h-3.5" />}
                    {loc.markerType === 'citadel' && <Compass className="w-3.5 h-3.5" />}
                    {loc.markerType === 'bank' && <Anchor className="w-3.5 h-3.5" />}
                    {loc.markerType === 'fort' && <Shield className="w-3.5 h-3.5 rotate-45" />}
                  </div>
                </div>

                {/* Banner Label below the marker */}
                <div className="absolute top-7 left-1/2 transform -translate-x-1/2 flex flex-col items-center pointer-events-none whitespace-nowrap bg-amber-50/90 border border-amber-950/30 px-2 py-0.5 rounded shadow-sm text-center">
                  <span className="font-display text-[9px] font-bold text-amber-950 uppercase tracking-widest">{loc.name}</span>
                  <span className="font-mono text-[7px] text-amber-900/60 uppercase tracking-wider">{loc.sub}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Overlay Hover Details Card */}
        <div className="flex justify-between items-end z-10">
          <div className="w-full max-w-sm min-h-[70px] border border-amber-900/30 p-2.5 md:p-3 bg-amber-50/95 rounded shadow-md mt-auto">
            <AnimatePresence mode="wait">
              {hoveredLocation ? (
                <motion.div
                  key={hoveredLocation.id}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                >
                  <div className="flex items-center gap-1.5 border-b border-amber-900/20 pb-1">
                    <span className="text-amber-950 font-display text-xs font-bold uppercase tracking-wider">
                      {hoveredLocation.name}
                    </span>
                    <span className="text-[9px] font-mono bg-amber-950/10 text-amber-950 px-1 rounded uppercase tracking-widest">
                      {hoveredLocation.alliance}
                    </span>
                  </div>
                  <p className="font-sans text-[10px] md:text-xs text-amber-900/80 mt-1 leading-normal italic">
                    {hoveredLocation.description}
                  </p>
                  <span className="font-mono text-[8px] text-gold-hover uppercase font-bold mt-1.5 block tracking-widest animate-pulse">
                    ✦ Click to travel there
                  </span>
                </motion.div>
              ) : (
                <motion.div
                  key="default-instruct"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center gap-2 text-amber-900/60 py-2"
                >
                  <HelpCircle className="w-4 h-4" />
                  <span className="font-mono text-[10px] uppercase tracking-widest leading-normal">
                    Select a holdfast on the map to begin coordinates travel...
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Scale Detail decoration */}
          <div className="font-mono text-[8px] text-amber-950/60 uppercase tracking-widest border border-amber-900/20 px-2 py-1 rounded bg-amber-50/50">
            Scale: 1 leagues = 10 commits
          </div>
        </div>

        {/* Interactive Legend Box overlay */}
        <AnimatePresence>
          {showMapLegend && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="absolute left-4 top-16 md:left-8 md:top-20 z-30 w-52 border border-amber-900/40 p-3 bg-amber-50 rounded-lg shadow-xl"
            >
              <h5 className="font-display text-[10px] text-amber-950 uppercase font-bold tracking-widest border-b border-amber-900/20 pb-1.5 mb-2">
                Realm Banners
              </h5>
              <div className="flex flex-col gap-2 font-mono text-[9px] text-amber-950/80 uppercase tracking-widest">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-500 shadow-sm" />
                  <span>Stark Lands (Keeps)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-500 shadow-sm" />
                  <span>Targaryen Lands (Hall, Contact)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shadow-sm" />
                  <span>Lannister Lands (Services)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-stone-500 shadow-sm" />
                  <span>Night's Watch Lands (Ledger)</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-950/30 shadow-sm" />
                  <span>Citadel Lands (Studies)</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </section>
  );
};
