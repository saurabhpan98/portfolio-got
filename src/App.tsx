import React, { useState, useEffect } from 'react';
import { HouseType } from './types';
import { HOUSES } from './data';
import { HouseSelector } from './components/HouseSelector';
import { GreatHall } from './components/GreatHall';
import { Chronicles } from './components/Chronicles';
import { RoyalServices } from './components/RoyalServices';
import { CitadelStudies } from './components/CitadelStudies';
import { KeyAchievements } from './components/KeyAchievements';
import { RealmProjects } from './components/RealmProjects';
import { GithubLedger } from './components/GithubLedger';
import { LordsTestimonials } from './components/LordsTestimonials';
import { Rookery } from './components/Rookery';
import { DrogonFire } from './components/DrogonFire';
import { NightKingRealm } from './components/NightKingRealm';
import { ForgeLoader } from './components/ForgeLoader';
import { RealmMap } from './components/RealmMap';
import { WeatherOverlay } from './components/WeatherOverlay';
import { TheWallTransition } from './components/TheWallTransition';
import { MeltWinterTransition } from './components/MeltWinterTransition';
import { Shield, Map, Compass, BookOpen, Send, Quote, Sparkles, Volume2, VolumeX, Snowflake } from 'lucide-react';
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
  const [isWinterActive, setIsWinterActive] = useState(false);
  const [isEnteringWinter, setIsEnteringWinter] = useState(false);
  const [isMelting, setIsMelting] = useState(false);
  const [isForging, setIsForging] = useState(true);
  const [currentSection, setCurrentSection] = useState('hero-great-hall');

  const playWinterHowl = () => {
    if (isSoundMuted) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const filter = ctx.createBiquadFilter();
      const gain = ctx.createGain();
      
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(60, ctx.currentTime);
      osc1.frequency.linearRampToValueAtTime(30, ctx.currentTime + 3.0);
      
      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(110, ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(55, ctx.currentTime + 3.0);
      
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(120, ctx.currentTime);
      
      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.5);
      
      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      
      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 3.5);
      osc2.stop(ctx.currentTime + 3.5);

      const oscWhistle = ctx.createOscillator();
      const whistleGain = ctx.createGain();
      const whistleFilter = ctx.createBiquadFilter();
      
      oscWhistle.type = 'sine';
      oscWhistle.frequency.setValueAtTime(1000, ctx.currentTime);
      oscWhistle.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 2.5);
      
      whistleFilter.type = 'bandpass';
      whistleFilter.Q.setValueAtTime(10, ctx.currentTime);
      
      whistleGain.gain.setValueAtTime(0.06, ctx.currentTime);
      whistleGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.0);
      
      oscWhistle.connect(whistleFilter);
      whistleFilter.connect(whistleGain);
      whistleGain.connect(ctx.destination);
      
      oscWhistle.start();
      oscWhistle.stop(ctx.currentTime + 3.0);
    } catch (err) {}
  };

  const playMeltCrackle = () => {
    if (isSoundMuted) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      
      // We generate a roaring flame sound
      const oscRoar = ctx.createOscillator();
      const gainRoar = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      
      oscRoar.type = 'sawtooth';
      oscRoar.frequency.setValueAtTime(75, ctx.currentTime);
      oscRoar.frequency.linearRampToValueAtTime(125, ctx.currentTime + 1.2);
      oscRoar.frequency.exponentialRampToValueAtTime(45, ctx.currentTime + 2.5);
      
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(250, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(750, ctx.currentTime + 1.0);
      filter.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 2.5);

      gainRoar.gain.setValueAtTime(0.18, ctx.currentTime);
      gainRoar.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 2.5);
      
      oscRoar.connect(filter);
      filter.connect(gainRoar);
      gainRoar.connect(ctx.destination);
      
      oscRoar.start();
      oscRoar.stop(ctx.currentTime + 2.5);

      // Crackles / Ice shattering pop sounds!
      for (let i = 0; i < 12; i++) {
        const time = ctx.currentTime + Math.random() * 2.0;
        const popOsc = ctx.createOscillator();
        const popGain = ctx.createGain();
        popOsc.type = 'sine';
        popOsc.frequency.setValueAtTime(900 + Math.random() * 1100, time);
        popGain.gain.setValueAtTime(0.12, time);
        popGain.gain.exponentialRampToValueAtTime(0.001, time + 0.08);
        popOsc.connect(popGain);
        popGain.connect(ctx.destination);
        popOsc.start(time);
        popOsc.stop(time + 0.1);
      }
    } catch (err) {}
  };

  const handleActivateWinter = () => {
    if (isEnteringWinter) return;
    playWinterHowl();
    setIsEnteringWinter(true);
  };

  const handleMeltWinter = () => {
    if (isMelting) return;
    setIsMelting(true);
    playMeltCrackle();
    
    // Disable winter active exactly halfway through the screen flame sweep
    setTimeout(() => {
      setIsWinterActive(false);
    }, 1300);

    // Reset melting state once flames finish sweeping
    setTimeout(() => {
      setIsMelting(false);
    }, 2800);
  };

  // Rotate puns periodically
  useEffect(() => {
    const interval = setInterval(() => {
      setPunIndex((prev) => (prev + 1) % GOT_PUNS.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  // Track current section for weather effects
  useEffect(() => {
    const sections = [
      'hero-great-hall',
      'house-selector-section',
      'chronicles-section',
      'services-section',
      'campaigns-section',
      'achievements-section',
      'projects-section',
      'github-analytics-section',
      'reviews-section',
      'contact-section'
    ];

    const handleScroll = () => {
      let closestSection = 'hero-great-hall';
      let minDistance = Infinity;

      sections.forEach((secId) => {
        const el = document.getElementById(secId);
        if (el) {
          const rect = el.getBoundingClientRect();
          // Distance to top of screen with threshold offset
          const distance = Math.abs(rect.top);
          if (distance < minDistance) {
            minDistance = distance;
            closestSection = secId;
          }
        }
      });

      setCurrentSection(closestSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial call

    return () => window.removeEventListener('scroll', handleScroll);
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

  if (isForging) {
    return <ForgeLoader onComplete={() => setIsForging(false)} />;
  }

  return (
    <div 
      className={`w-full overflow-x-hidden min-h-screen stone-texture text-stone-200 font-sans transition-all duration-1000 bg-gradient-to-b ${currentHouseInfo.bgGradient}`}
      style={{
        scrollbarColor: `${currentHouseInfo.primaryColor} #020617`
      }}
    >
      {/* Scroll-based atmospheric weather overlay */}
      <WeatherOverlay currentSection={currentSection} />

      <AnimatePresence mode="wait">
        {!isWinterActive ? (
          <motion.div
            key="summer-portfolio"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{ duration: 0.8 }}
            className="w-full flex flex-col min-h-screen justify-between"
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
                    onClick={() => scrollToSection('realm-map-section')}
                    className="px-1.5 py-1 md:px-2 md:py-1.5 text-stone-400 hover:text-white hover:border-b border-gold cursor-pointer transition-colors"
                  >
                    Realm Map
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
                    onClick={() => scrollToSection('achievements-section')}
                    className="px-1.5 py-1 md:px-2 md:py-1.5 text-stone-400 hover:text-white hover:border-b border-gold cursor-pointer transition-colors"
                  >
                    Laurels
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
                    onClick={handleActivateWinter}
                    className="px-2 py-1 md:px-2.5 md:py-1.5 bg-cyan-950/20 border border-cyan-500/20 hover:border-cyan-400 text-cyan-300 hover:bg-cyan-950/60 cursor-pointer transition-all duration-300 rounded-sm flex items-center gap-1 hover:shadow-[0_0_15px_rgba(34,211,238,0.4)] font-bold text-[9px] md:text-xs"
                    title="Reveal the Night King's Winter Realm"
                  >
                    <Snowflake className="w-3 h-3 text-cyan-400 animate-spin-slow" />
                    Winter Sigil
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

              {/* Interactive Realm Map Section */}
              <section id="realm-map-section" className="w-full max-w-5xl mx-auto px-4 py-16 border-b border-stone-800/40 relative">
                <div className="text-center mb-10">
                  <span className="sub-title-label block mb-2">Cartography of Code</span>
                  <h3 className="bold-header-title text-2xl md:text-3xl lg:text-4xl tracking-[0.12em] uppercase font-bold">
                    THE INTERACTIVE REALM MAP
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-stone-400 max-w-xl mx-auto mt-2 italic leading-relaxed">
                    Traverse the custom provinces of Saurabh Panchal. Click any geographic territory on the parchment map below to ride your swift steed straight to its corresponding keep.
                  </p>
                  <div className="ornamental-line" />
                </div>
                <RealmMap onNavigate={scrollToSection} />
              </section>

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

              {/* Key Achievements Section (Royal Honors & Laurels) */}
              <KeyAchievements 
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

            {/* Interactive Dragon Guardian & Dracarys Fire Breather */}
            <DrogonFire activeHouse={activeHouse} isSoundMuted={isSoundMuted} />
          </motion.div>
        ) : (
          <motion.div
            key="winter-realm"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="w-full"
          >
            <NightKingRealm 
              isSoundMuted={isSoundMuted} 
              onMelt={handleMeltWinter} 
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Easter Egg Snowflake trigger on the bottom-left */}
      {!isWinterActive && (
        <motion.button
          onClick={handleActivateWinter}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.6, scale: 1 }}
          whileHover={{ opacity: 1, scale: 1.15, rotate: 20 }}
          className="fixed bottom-6 left-6 z-40 w-12 h-12 rounded-full bg-slate-950/90 border border-cyan-500/40 flex items-center justify-center cursor-pointer shadow-[0_0_15px_rgba(34,211,238,0.25)] hover:shadow-[0_0_25px_rgba(34,211,238,0.6)] text-cyan-400 backdrop-blur-sm group transition-all"
          title="Winter is Coming... Reveal the Night King's Realm"
        >
          <Snowflake className="w-5 h-5 group-hover:animate-spin-slow" />
          <div className="absolute inset-0 rounded-full border border-cyan-400/20 animate-ping opacity-60 pointer-events-none" />
        </motion.button>
      )}

      {/* Screen-wide Fire Flames Melt Transition */}
      <AnimatePresence>
        {isMelting && (
          <MeltWinterTransition
            isSoundMuted={isSoundMuted}
            onComplete={() => setIsWinterActive(false)}
            onClose={() => setIsMelting(false)}
          />
        )}
      </AnimatePresence>

      {/* Cinematic Massive Wall of North Gate Opening Transition */}
      <AnimatePresence>
        {isEnteringWinter && (
          <TheWallTransition
            isSoundMuted={isSoundMuted}
            onComplete={() => setIsWinterActive(true)}
            onClose={() => setIsEnteringWinter(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
