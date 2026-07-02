import React, { useEffect, useState } from 'react';
import { HouseType } from '../types';
import { HOUSES } from '../data';
import { StarkSigil, TargaryenSigil, LannisterSigil, NightsWatchSigil } from './HouseSigils';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, Sparkles, BookOpen, Send } from 'lucide-react';

interface GreatHallProps {
  activeHouse: HouseType;
  onScrollToSection: (sectionId: string) => void;
}

export const GreatHall: React.FC<GreatHallProps> = ({ activeHouse, onScrollToSection }) => {
  const houseInfo = HOUSES.find((h) => h.id === activeHouse) || HOUSES[0];
  const [particles, setParticles] = useState<{ id: number; style: React.CSSProperties }[]>([]);

  // Generate ambient particle effects depending on the active house
  useEffect(() => {
    const particleCount = 12;
    const items = [];
    for (let i = 0; i < particleCount; i++) {
      const left = Math.random() * 100;
      const size = Math.random() * 6 + 2;
      const delay = Math.random() * 4;
      const duration = Math.random() * 4 + 3;
      
      let background = 'radial-gradient(circle, #ff5722 0%, #ffeb3b 80%)'; // default ember
      if (activeHouse === 'stark') {
        background = 'radial-gradient(circle, #ffffff 0%, #e0f2fe 80%)'; // snow
      } else if (activeHouse === 'lannister') {
        background = 'radial-gradient(circle, #fbbf24 0%, #d4af37 80%)'; // golden shimmer
      } else if (activeHouse === 'nightswatch') {
        background = 'radial-gradient(circle, #94a3b8 0%, #334155 80%)'; // shadow dust
      }

      items.push({
        id: i,
        style: {
          left: `${left}%`,
          bottom: '0px',
          width: `${size}px`,
          height: `${size}px`,
          animation: `embers ${duration}s infinite linear`,
          animationDelay: `${delay}s`,
          background,
          opacity: Math.random() * 0.7 + 0.3,
        },
      });
    }
    setParticles(items);
  }, [activeHouse]);

  const renderActiveSigil = () => {
    const size = "w-40 h-40 md:w-56 md:h-56";
    switch (activeHouse) {
      case 'stark':
        return <StarkSigil className={size} color={houseInfo.primaryColor} glow={true} />;
      case 'targaryen':
        return <TargaryenSigil className={size} color={houseInfo.primaryColor} glow={true} />;
      case 'lannister':
        return <LannisterSigil className={size} color={houseInfo.primaryColor} glow={true} />;
      case 'nightswatch':
        return <NightsWatchSigil className={size} color={houseInfo.primaryColor} glow={true} />;
    }
  };

  return (
    <section 
      id="hero-great-hall" 
      className="relative w-full max-w-6xl mx-auto px-4 py-12 md:py-20 flex flex-col-reverse lg:flex-row items-center gap-12 overflow-hidden border-b border-stone-800/40"
    >
      {/* Background Particles Container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none">
        {particles.map((p) => (
          <div key={p.id} className="ember" style={p.style} />
        ))}
        {activeHouse === 'stark' && (
          <>
            <div className="snow-wind" style={{ top: '20%', animationDelay: '0s' }} />
            <div className="snow-wind" style={{ top: '50%', animationDelay: '3s' }} />
            <div className="snow-wind" style={{ top: '80%', animationDelay: '1.5s' }} />
          </>
        )}
      </div>

      {/* Hero Left Content */}
      <div className="flex-1 text-center lg:text-left z-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center justify-center lg:justify-start gap-2 mb-4"
        >
          <Shield className="w-5 h-5 text-gold" />
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-gold">
            A software engineer's saga
          </span>
        </motion.div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeHouse}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl text-stone-100 tracking-wider font-extrabold leading-tight">
              SAURABH OF <br />
              <span 
                className="text-transparent bg-clip-text font-decorative block mt-2"
                style={{
                  backgroundImage: `linear-gradient(to right, #fff, ${houseInfo.primaryColor}, #d4af37)`
                }}
              >
                HOUSE PANCHAL
              </span>
            </h1>

            <p className="font-mono text-xs md:text-sm text-gold tracking-widest uppercase mt-4 italic font-semibold">
              First of His Name, Writer of Clean Code, Defender of the Stack, and Builder of Realms
            </p>

            <p className="font-sans text-stone-300 text-lg md:text-xl leading-relaxed mt-6 max-w-xl mx-auto lg:mx-0">
              In the vast digital landscape of the Seven Kingdoms, Saurabh commands the alchemy of full-stack engineering. He hammers Valyrian steel types on the anvil of TypeScript and channels raw wildfire backend systems.
            </p>

            <div className="mt-4 border-l-2 pl-4 py-1 text-stone-400 italic text-sm text-left max-w-xl mx-auto lg:mx-0 border-gold/40">
              "{houseInfo.description}"
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Hero Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="mt-8 flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
        >
          <button
            id="hero-scroll-projects"
            onClick={() => onScrollToSection('projects-section')}
            className="group relative px-6 py-3 bg-gold text-stone-950 font-display font-bold text-sm tracking-widest uppercase rounded cursor-pointer transition-all duration-300 hover:bg-white hover:-translate-y-0.5 flex items-center justify-center gap-2 shadow-md shadow-gold/20"
          >
            <BookOpen className="w-4 h-4 transition-transform group-hover:scale-110" />
            Inspect Scrolls (Projects)
          </button>
          
          <button
            id="hero-scroll-contact"
            onClick={() => onScrollToSection('contact-section')}
            className="group px-6 py-3 border border-stone-700 hover:border-gold text-stone-300 hover:text-gold font-display font-semibold text-sm tracking-widest uppercase rounded cursor-pointer transition-all duration-300 hover:-translate-y-0.5 flex items-center justify-center gap-2"
          >
            <Send className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-0.5" />
            Send a Raven (Contact)
          </button>
        </motion.div>
      </div>

      {/* Hero Right Content: Giant Shield with Sigil */}
      <div className="w-full lg:w-96 flex justify-center items-center z-10">
        <motion.div
          key={activeHouse}
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ type: 'spring', damping: 15, stiffness: 60 }}
          className="relative group cursor-pointer"
        >
          {/* Outer glowing halo */}
          <div 
            className="absolute -inset-4 rounded-full opacity-10 blur-xl group-hover:opacity-20 transition-opacity duration-700"
            style={{ backgroundColor: houseInfo.primaryColor }}
          />

          {/* Heavy Stone Shield Frame */}
          <div className={`parchment-bg rounded-[2rem] p-10 md:p-12 w-64 h-80 md:w-72 md:h-96 flex flex-col justify-between items-center relative shadow-2xl ${houseInfo.stoneColor} transition-all duration-700 hover:scale-[1.03]`}>
            
            {/* Corner Runes */}
            <div className="absolute top-4 left-4 font-display text-[10px] text-stone-600/70 select-none">I</div>
            <div className="absolute top-4 right-4 font-display text-[10px] text-stone-600/70 select-none">X</div>
            <div className="absolute bottom-4 left-4 font-display text-[10px] text-stone-600/70 select-none">⚔</div>
            <div className="absolute bottom-4 right-4 font-display text-[10px] text-stone-600/70 select-none">🛡</div>

            {/* Inner Shield border */}
            <div className="absolute inset-3 border border-dashed border-stone-400/30 rounded-[1.75rem]" />

            {/* Shield Header */}
            <div className="text-center z-10 mt-2">
              <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-stone-500 block">Allegiance Shield</span>
              <div className="h-[1px] w-12 bg-stone-400/30 mx-auto mt-1" />
            </div>

            {/* Central Crest */}
            <div className="my-auto transform transition-transform duration-700 group-hover:scale-105">
              {renderActiveSigil()}
            </div>

            {/* Shield Footer */}
            <div className="text-center z-10 mb-2 w-full">
              <h4 className="font-display text-sm tracking-widest text-stone-800 uppercase font-bold">
                {houseInfo.name}
              </h4>
              <p className="font-decorative text-[10px] tracking-widest text-gold-hover uppercase font-bold italic mt-0.5">
                "{houseInfo.words}"
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
