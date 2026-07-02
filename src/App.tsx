import React, { useState, useEffect } from 'react';
import { HouseType } from './types';
import { HOUSES } from './data';
import { HouseSelector } from './components/HouseSelector';
import { GreatHall } from './components/GreatHall';
import { Chronicles } from './components/Chronicles';
import { RoyalServices } from './components/RoyalServices';
import { CitadelStudies } from './components/CitadelStudies';
import { RealmProjects } from './components/RealmProjects';
import { GithubLedger } from './components/GithubLedger';
import { LordsTestimonials } from './components/LordsTestimonials';
import { Rookery } from './components/Rookery';
import { Shield, Map, Compass, BookOpen, Send, Quote, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const GOT_PUNS = [
  "What do we say to bugs? 'Not today.'",
  "A developer always pays his debts (delivers on time and refactors properly).",
  "The code is dark and full of syntax errors (until Saurabh reviews it).",
  "When you play the game of servers, you scale up or you crash.",
  "Winter is coding! Keep your compilers warm.",
  "Valyrian TypeScript prevents runtime breaches across the Seven Kingdoms."
];

export default function App() {
  const [activeHouse, setActiveHouse] = useState<HouseType>('targaryen');
  const [punIndex, setPunIndex] = useState(0);
  const [isSoundMuted, setIsSoundMuted] = useState(true);

  // Rotate puns periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setPunIndex((prev) => (prev + 1) % GOT_PUNS.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const currentHouseInfo = HOUSES.find((h) => h.id === activeHouse) || HOUSES[0];

  const handleSelectHouse = (houseId: HouseType) => {
    setActiveHouse(houseId);
    
    // Play optional synthesized medieval confirmation tone if sound isn't muted
    if (!isSoundMuted) {
      try {
        const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
        
        // Play a low medieval bell / gong tone
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        
        // Low medieval bell sound (sine wave + triangle wave harmonics)
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(activeHouse === 'stark' ? 146.83 : activeHouse === 'targaryen' ? 220.00 : 164.81, ctx.currentTime); // D3, A3, E3
        
        gain.gain.setValueAtTime(0.15, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.5);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.5);
      } catch (err) {
        console.warn('Audio synthesis not supported or blocked by browser gesture permissions.');
      }
    }
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <div 
      className={`w-full overflow-x-hidden min-h-screen stone-texture text-stone-200 font-sans transition-all duration-1000 bg-gradient-to-b ${currentHouseInfo.bgGradient}`}
      style={{
        scrollbarColor: `${currentHouseInfo.primaryColor} #020617`
      }}
    >
      {/* Top Medieval Crown Header Trim */}
      <div 
        className="h-1.5 w-full sticky top-0 z-40 transition-colors duration-1000"
        style={{ backgroundColor: currentHouseInfo.primaryColor }}
      />

      {/* Primary Sticky Header */}
      <header className="sticky top-1.5 z-30 bg-stone-950/80 backdrop-blur-md border-b border-stone-800/60 transition-all duration-500">
        <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Logo Brand Title */}
          <div 
            onClick={() => scrollToSection('hero-great-hall')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <Shield 
              className="w-5 h-5 transition-transform duration-500 group-hover:rotate-12" 
              style={{ color: currentHouseInfo.primaryColor }}
            />
            <div>
              <span className="font-decorative text-lg tracking-widest text-white block">
                SAURABH
              </span>
              <span className="font-mono text-[9px] uppercase tracking-[0.35em] text-stone-500 block">
                House of Code
              </span>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-1 md:gap-2 font-display text-[9px] md:text-xs tracking-widest uppercase py-1 select-none max-w-full">
            <button
              onClick={() => scrollToSection('hero-great-hall')}
              className="px-1.5 py-1 md:px-2 md:py-1.5 text-stone-400 hover:text-white hover:border-b border-gold cursor-pointer transition-colors"
            >
              The Hall
            </button>
            <button
              onClick={() => scrollToSection('house-selector-section')}
              className="px-1.5 py-1 md:px-2 md:py-1.5 text-stone-400 hover:text-white hover:border-b border-gold cursor-pointer transition-colors"
            >
              Pledge Fealty
            </button>
            <button
              onClick={() => scrollToSection('chronicles-section')}
              className="px-1.5 py-1 md:px-2 md:py-1.5 text-stone-400 hover:text-white hover:border-b border-gold cursor-pointer transition-colors"
            >
              Chronicles
            </button>
            <button
              onClick={() => scrollToSection('services-section')}
              className="px-1.5 py-1 md:px-2 md:py-1.5 text-stone-400 hover:text-white hover:border-b border-gold cursor-pointer transition-colors"
            >
              Services
            </button>
            <button
              onClick={() => scrollToSection('campaigns-section')}
              className="px-1.5 py-1 md:px-2 md:py-1.5 text-stone-400 hover:text-white hover:border-b border-gold cursor-pointer transition-colors"
            >
              Campaigns
            </button>
            <button
              onClick={() => scrollToSection('projects-section')}
              className="px-1.5 py-1 md:px-2 md:py-1.5 text-stone-400 hover:text-white hover:border-b border-gold cursor-pointer transition-colors"
            >
              Great Keeps
            </button>
            <button
              onClick={() => scrollToSection('github-analytics-section')}
              className="px-1.5 py-1 md:px-2 md:py-1.5 text-stone-400 hover:text-white hover:border-b border-gold cursor-pointer transition-colors"
            >
              Ledger
            </button>
            <button
              onClick={() => scrollToSection('reviews-section')}
              className="px-1.5 py-1 md:px-2 md:py-1.5 text-stone-400 hover:text-white hover:border-b border-gold cursor-pointer transition-colors"
            >
              Reviews
            </button>
            <button
              onClick={() => scrollToSection('contact-section')}
              className="px-2.5 py-1 md:px-3 md:py-1.5 bg-amber-950/30 border border-gold/30 hover:border-gold text-gold hover:bg-gold hover:text-stone-950 cursor-pointer transition-all duration-300 rounded-sm"
            >
              Send Raven
            </button>
          </nav>

          {/* Audio Synthesizer Toggle */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => setIsSoundMuted(!isSoundMuted)}
              className="p-1.5 border border-stone-800 hover:border-stone-700 hover:bg-stone-900 rounded text-stone-500 hover:text-stone-300 cursor-pointer transition-all"
              title={isSoundMuted ? 'Enable Medieval Bell Audio' : 'Mute Audio'}
            >
              {isSoundMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5 text-gold" />}
            </button>
          </div>

        </div>
      </header>

      {/* Body Area */}
      <main className="relative pb-24">
        
        {/* Hero Area */}
        <GreatHall 
          activeHouse={activeHouse} 
          onScrollToSection={scrollToSection} 
        />

        {/* Dynamic House Selector */}
        <HouseSelector 
          activeHouse={activeHouse} 
          onSelectHouse={handleSelectHouse} 
        />

        {/* Crenellated castle wall border spacer */}
        <div className="w-full h-8 flex justify-center items-center opacity-10 py-6">
          <div className="w-full max-w-4xl border-t border-dashed border-stone-100 flex justify-around">
            <span className="bg-stone-950 px-2 text-xs">☩</span>
            <span className="bg-stone-950 px-2 text-xs">⚔</span>
            <span className="bg-stone-950 px-2 text-xs">🛡</span>
            <span className="bg-stone-950 px-2 text-xs">☩</span>
          </div>
        </div>

        {/* Chronicles and Armory Section (About Me & Skills) */}
        <Chronicles 
          activeHouse={activeHouse} 
          accentColor={currentHouseInfo.primaryColor} 
        />

        {/* Royal Services Provided Section */}
        <RoyalServices 
          activeHouse={activeHouse}
          accentColor={currentHouseInfo.primaryColor}
        />

        {/* Academic Studies & Campaigns Section (Education & Experience) */}
        <CitadelStudies 
          activeHouse={activeHouse}
          accentColor={currentHouseInfo.primaryColor}
        />

        {/* Projects Section */}
        <RealmProjects 
          activeHouse={activeHouse} 
          accentColor={currentHouseInfo.primaryColor} 
        />

        {/* GitHub Battle Ledger & Analytics Section */}
        <GithubLedger 
          activeHouse={activeHouse}
          accentColor={currentHouseInfo.primaryColor}
        />

        {/* Lords Testimonials & User Reviews Section */}
        <LordsTestimonials 
          activeHouse={activeHouse}
          accentColor={currentHouseInfo.primaryColor}
        />

        {/* Contact Rookery Section */}
        <Rookery 
          activeHouse={activeHouse} 
          accentColor={currentHouseInfo.primaryColor} 
        />

      </main>

      {/* Sticky Bottom Decorative Bar: Pun Ticker & Kingdom Details */}
      <footer className="bg-stone-950 border-t border-stone-900 py-8 text-center text-stone-500 text-sm z-20 relative">
        
        {/* Pun Quote Box */}
        <div className="max-w-2xl mx-auto px-4 mb-6">
          <div className="bg-stone-900/60 rounded-md p-4 border border-stone-900 inline-flex flex-col items-center gap-1.5 relative overflow-hidden">
            <Quote className="w-4 h-4 text-gold opacity-50 absolute -top-1 -left-1 transform -rotate-12" />
            <span className="font-mono text-[9px] uppercase tracking-widest text-stone-500">The King's Counsel Puns</span>
            <div className="h-[40px] flex items-center justify-center">
              <AnimatePresence mode="wait">
                <motion.p
                  key={punIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="font-sans text-stone-300 italic text-sm md:text-base text-center"
                >
                  "{GOT_PUNS[punIndex]}"
                </motion.p>
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Royal Copyright */}
        <div className="max-w-4xl mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-left">
            <p className="font-display text-xs tracking-widest text-stone-400 uppercase">
              SAURABH PANCHAL • MASTER SMITH OF SYSTEMS
            </p>
            <p className="font-mono text-[10px] text-stone-600 mt-1">
              Forged in React & Tailwind CSS. Designed with Valyrian steel layout constraints.
            </p>
          </div>

          <div className="flex gap-4 font-mono text-[10px] text-stone-500 uppercase tracking-widest">
            <span>Citadel Registered © 305 AC</span>
            <span>•</span>
            <span>Long Live the King</span>
          </div>
        </div>

      </footer>
    </div>
  );
}
