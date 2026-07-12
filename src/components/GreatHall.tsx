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
  const [landingSnow, setLandingSnow] = useState<{ id: number; left: number; size: number; delay: number; duration: number }[]>([]);

  useEffect(() => {
    const snowItems = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      size: Math.random() * 4 + 1.5,
      delay: Math.random() * 6,
      duration: Math.random() * 5 + 6,
    }));
    setLandingSnow(snowItems);
  }, []);

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
          animation: `embers ${duration}s linear ${delay}s infinite`,
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
      className="relative w-full max-w-6xl mx-auto px-4 py-12 md:py-20 flex flex-col-reverse lg:flex-row items-center gap-12 overflow-hidden border-b border-stone-800/40 min-h-[600px]"
    >
      {/* Background Particles Container */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden select-none z-0">
        {particles.map((p) => (
          <div key={p.id} className="ember animate-pulse" style={p.style} />
        ))}
        {/* Always display falling snow on the landing page */}
        {landingSnow.map((s) => (
          <div
            key={`landing-snow-${s.id}`}
            className="absolute bg-white rounded-full opacity-60 filter drop-shadow-[0_0_1px_rgba(255,255,255,0.8)]"
            style={{
              left: `${s.left}%`,
              top: '-10px',
              width: `${s.size}px`,
              height: `${s.size}px`,
              animation: `snow-drift ${s.duration}s linear ${s.delay}s infinite`,
            }}
          />
        ))}
        {activeHouse === 'stark' && (
          <>
            <div className="snow-wind" style={{ top: '20%', animationDelay: '0s' }} />
            <div className="snow-wind" style={{ top: '50%', animationDelay: '3s' }} />
            <div className="snow-wind" style={{ top: '80%', animationDelay: '1.5s' }} />
          </>
        )}
      </div>

      {/* Snowy Castle Silhouette Background */}
      <div className="absolute bottom-0 left-0 right-0 h-44 pointer-events-none select-none overflow-hidden z-0 opacity-15">
        <svg className="w-full h-full text-stone-900 fill-current" viewBox="0 0 1440 200" preserveAspectRatio="none">
          <path d="M0,200 L0,150 L40,150 L40,110 L65,110 L65,150 L110,150 L110,80 L140,80 L140,40 L170,40 L170,80 L200,80 L200,150 L270,150 L270,105 L290,85 L310,105 L310,150 L390,150 L390,60 L440,35 L490,60 L490,150 L570,150 L570,125 L590,125 L590,150 L690,150 L690,70 L720,35 L750,70 L750,150 L830,150 L830,95 L860,95 L860,150 L940,150 L940,50 L990,25 L1040,50 L1040,150 L1140,150 L1140,115 L1170,115 L1170,150 L1240,150 L1240,85 L1270,55 L1300,85 L1300,150 L1440,150 L1440,200 Z" />
          <path d="M40,110 L65,110 M140,40 L170,40 M270,105 L290,85 L310,105 M390,60 L440,35 L490,60 M570,125 L590,125 M690,70 L720,35 L750,70 M830,95 L860,95 M940,50 L990,25 L1040,50 M1140,115 L1170,115 M1240,85 L1270,55 L1300,85" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" fill="none" className="opacity-30" />
        </svg>
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

      {/* Hero Right Content: Giant Iron Throne (Original Design) and Shield with Sigil */}
      <div className="w-full lg:w-[420px] flex justify-center items-center z-10 relative">
        <motion.div
          key={activeHouse}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', damping: 15, stiffness: 60 }}
          className="relative group cursor-pointer flex flex-col items-center justify-center"
          onClick={() => {
            // sitting sound/sword strike synthesize
            try {
              const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
              if (AudioContext) {
                const ctx = new AudioContext();
                if (ctx.state === 'suspended') {
                  ctx.resume();
                }
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sawtooth';
                osc.frequency.setValueAtTime(120, ctx.currentTime);
                osc.frequency.linearRampToValueAtTime(40, ctx.currentTime + 0.6);
                gain.gain.setValueAtTime(0.1, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
                osc.connect(gain);
                gain.connect(ctx.destination);
                osc.start();
                osc.stop(ctx.currentTime + 0.65);
              }
            } catch (e) {}
          }}
        >
          {/* Outer glowing halo depending on active house */}
          <div 
            className="absolute top-20 rounded-full opacity-15 blur-2xl group-hover:opacity-30 transition-opacity duration-700 w-72 h-72"
            style={{ backgroundColor: houseInfo.primaryColor }}
          />

          {/* Original Giant Iron Throne SVG behind */}
          <div className="relative flex flex-col items-center">
            
            {/* Throne Label Banner */}
            <div className="absolute top-0 px-3 py-1 bg-stone-950/90 border border-stone-800 rounded text-[9px] font-mono tracking-[0.3em] uppercase text-gold z-20 shadow-md">
              The Iron Throne of Code
            </div>

            {/* Giant Iron Throne SVG Graphic */}
            <svg 
              className="w-72 h-[340px] md:w-80 md:h-[380px] text-stone-700 drop-shadow-[0_15px_30px_rgba(0,0,0,0.8)] hover:text-stone-500 transition-colors duration-700" 
              viewBox="0 0 200 240" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="1.2"
            >
              <circle cx="100" cy="110" r="50" fill={houseInfo.primaryColor} fillOpacity="0.03" className="blur-xl" />

              {/* Backrest Sword Blades */}
              <path d="M40,120 L15,20 L55,115" strokeLinecap="round" />
              <path d="M50,110 L30,8 L65,105" strokeLinecap="round" />
              <path d="M65,100 L60,2 L78,95" strokeLinecap="round" />
              <path d="M80,95 L90,1 L95,90" strokeLinecap="round" />
              {/* Mirror side */}
              <path d="M160,120 L185,20 L145,115" strokeLinecap="round" />
              <path d="M150,110 L170,8 L135,105" strokeLinecap="round" />
              <path d="M135,100 L140,2 L122,95" strokeLinecap="round" />
              <path d="M120,95 L110,1 L105,90" strokeLinecap="round" />

              {/* Mid spikes */}
              <path d="M60,120 L40,35 L70,110" strokeLinecap="round" />
              <path d="M75,110 L70,20 L85,105" strokeLinecap="round" />
              <path d="M140,120 L160,35 L130,110" strokeLinecap="round" />
              <path d="M125,110 L130,20 L115,105" strokeLinecap="round" />

              {/* Inner High Swords */}
              <path d="M90,100 L85,25 L100,100" strokeWidth="2" strokeLinecap="round" />
              <path d="M110,100 L115,25 L100,100" strokeWidth="2" strokeLinecap="round" />
              <path d="M100,100 L100,10 L100,100" strokeWidth="2.5" strokeLinecap="round" />

              {/* Crossguards and Hilts */}
              <path d="M80,28 L92,28 M108,28 L120,28" strokeWidth="2.5" />
              <path d="M75,18 L85,18 M115,18 L125,18" strokeWidth="2.5" />
              <path d="M92,12 L108,12 M50,38 L62,38 M138,38 L150,38" strokeWidth="2.5" />

              {/* Armrests (melted grips) */}
              <path d="M44,140 C44,115 62,115 62,140 L62,170" strokeWidth="3" strokeLinecap="round" />
              <path d="M156,140 C156,115 138,115 138,140 L138,170" strokeWidth="3" strokeLinecap="round" />
              
              {/* Armrest cross guards */}
              <path d="M38,140 L68,140 M132,140 L162,140" strokeWidth="2" />

              {/* Throne seat block structure */}
              <path d="M58,145 L142,145 L148,185 L52,185 Z" fill="currentColor" fillOpacity="0.25" strokeWidth="2" />
              
              {/* Front Apron Blades hanging down */}
              <path d="M58,185 L50,225 M142,185 L150,225" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M72,185 L65,230 M128,185 L135,230" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M86,185 L80,235 M114,185 L120,235" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M100,185 L100,238" strokeWidth="3.5" strokeLinecap="round" />

              {/* Rune on the Seat Back */}
              <path d="M96,80 L100,72 L104,80 L96,80 Z" fill={houseInfo.primaryColor} fillOpacity="0.4" stroke={houseInfo.primaryColor} strokeWidth="1" className="animate-pulse" />
            </svg>

            {/* Heavy Stone Shield Frame Sitting On The Throne */}
            <div className={`absolute bottom-6 parchment-bg rounded-2xl p-6 w-52 h-64 flex flex-col justify-between items-center shadow-2xl ${houseInfo.stoneColor} border border-stone-800/80 transition-all duration-700 hover:scale-[1.05] z-10`}>
              
              <div className="absolute inset-2 border border-dashed border-stone-400/20 rounded-xl" />

              {/* Crest Title */}
              <div className="text-center z-10 mt-1">
                <span className="font-mono text-[8px] uppercase tracking-[0.25em] text-stone-500 block">Seat of Power</span>
              </div>

              {/* Central Sigil Crest */}
              <div className="my-auto transform transition-transform duration-700 group-hover:scale-105">
                {renderActiveSigil()}
              </div>

              {/* Shield Title details */}
              <div className="text-center z-10 mb-1 w-full">
                <h4 className="font-display text-xs tracking-widest text-stone-800 uppercase font-bold">
                  {houseInfo.name}
                </h4>
                <p className="font-decorative text-[8px] tracking-wider text-gold-hover uppercase font-bold italic mt-0.5">
                  "{houseInfo.words}"
                </p>
              </div>
            </div>

          </div>

        </motion.div>
      </div>
    </section>
  );
};
