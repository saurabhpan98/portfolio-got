import React, { useState } from 'react';
import { HouseType } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Trophy, Award, Crown, Sparkles, Star, Flame, Lock, ShieldAlert } from 'lucide-react';

interface KeyAchievementsProps {
  activeHouse: HouseType;
  accentColor: string;
}

interface AchievementItem {
  id: string;
  actualTitle: string;
  gotTitle: string;
  authority: string;
  gotAuthority: string;
  description: string;
  icon: React.ComponentType<any>;
  badgeColor: string;
}

const ACHIEVEMENTS: AchievementItem[] = [
  {
    id: 'ach-academic',
    actualTitle: 'Outstanding Academic Performance Scholarship',
    gotTitle: 'The Grand Maester\'s Seal of Academic Excellence',
    authority: 'Royal University Foundation',
    gotAuthority: 'The High Citadel of Oldtown',
    description: 'Awarded to elite student alchemists for exemplary grades, computational research, and absolute mastery of algorithm scrolls inside the Citadel gates.',
    icon: Award,
    badgeColor: 'border-emerald-500/30 text-emerald-400 bg-emerald-950/20'
  },
  {
    id: 'ach-pm',
    actualTitle: 'Prime Minister Scholarship',
    gotTitle: 'The Hand of the King\'s Sovereign Grant',
    authority: 'Government Merit Commission',
    gotAuthority: 'The Grand Council of the Red Keep',
    description: 'Conferred under the royal seal of national leadership as a premier grant for supreme academic promise, exemplary character, and scholarly dedication.',
    icon: Crown,
    badgeColor: 'border-amber-500/30 text-gold bg-amber-950/20'
  },
  {
    id: 'ach-cricket',
    actualTitle: 'Cricket Under-14 Batsman of the Tournament',
    gotTitle: 'Champion Swordsman of the Summer Tourney (U-14)',
    authority: 'District Athletic Association',
    gotAuthority: 'The Lord Commander\'s Athletic Guild',
    description: 'Crowned as the most prolific run-scorer of the tournament, wielding the willow bat like a Valyrian steel blade to lead the regional team to glorious victory.',
    icon: Trophy,
    badgeColor: 'border-blue-500/30 text-sky-400 bg-blue-950/20'
  }
];

export const KeyAchievements: React.FC<KeyAchievementsProps> = ({ activeHouse, accentColor }) => {
  // 'idle' -> 'flying' -> 'landed' -> 'breathing' -> 'revealed'
  const [revealState, setRevealState] = useState<'idle' | 'flying' | 'landed' | 'breathing' | 'revealed'>('idle');
  const [fireEmbers, setFireEmbers] = useState<{ id: number; left: number; top: number; delay: number; scale: number }[]>([]);

  const playDragonSynth = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      
      // Low rumble throat sound
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(85, ctx.currentTime);
      osc1.frequency.linearRampToValueAtTime(25, ctx.currentTime + 1.4);
      
      gain1.gain.setValueAtTime(0.25, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.4);
      
      // Screen-tearing high pitch roar screamer
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      
      osc2.type = 'sawtooth';
      osc2.frequency.setValueAtTime(260, ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(90, ctx.currentTime + 1.2);
      
      gain2.gain.setValueAtTime(0.18, ctx.currentTime);
      gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
      
      // Sharp bandpass filter for metallic roar
      filter.type = 'peaking';
      filter.frequency.setValueAtTime(180, ctx.currentTime);
      filter.Q.setValueAtTime(9, ctx.currentTime);
      
      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain1);
      gain1.connect(ctx.destination);
      
      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 1.5);
      osc2.stop(ctx.currentTime + 1.5);

      // Crackling embers noise
      setTimeout(() => {
        for (let i = 0; i < 8; i++) {
          const timeOffset = Math.random() * 0.8;
          const crackOsc = ctx.createOscillator();
          const crackGain = ctx.createGain();
          crackOsc.type = 'triangle';
          crackOsc.frequency.setValueAtTime(800 + Math.random() * 600, ctx.currentTime + timeOffset);
          crackGain.gain.setValueAtTime(0.05, ctx.currentTime + timeOffset);
          crackGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + timeOffset + 0.1);
          crackOsc.connect(crackGain);
          crackGain.connect(ctx.destination);
          crackOsc.start(ctx.currentTime + timeOffset);
          crackOsc.stop(ctx.currentTime + timeOffset + 0.15);
        }
      }, 300);

    } catch (err) {}
  };

  const handleStartReveal = () => {
    if (revealState !== 'idle') return;

    // Start flying
    setRevealState('flying');

    // Circle the castle for 2.2 seconds, then land
    setTimeout(() => {
      setRevealState('landed');

      // Land on castle for 1.2 seconds, then breathe fire
      setTimeout(() => {
        setRevealState('breathing');
        playDragonSynth();

        // Create high-speed embers shooting outwards
        const newEmbers = Array.from({ length: 45 }).map((_, i) => ({
          id: i,
          left: 15 + Math.random() * 70, // clustered around center-ish
          top: 30 + Math.random() * 40,
          delay: Math.random() * 0.5,
          scale: 0.6 + Math.random() * 1.5,
        }));
        setFireEmbers(newEmbers);

        // Breathe fire for 1.8 seconds, then fully reveal Achievements!
        setTimeout(() => {
          setRevealState('revealed');
        }, 1800);

      }, 1200);

    }, 2200);
  };

  return (
    <section id="achievements-section" className="w-full max-w-5xl mx-auto px-4 py-16 border-b border-stone-800/40 relative overflow-hidden">
      
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="sub-title-label block mb-2">Citadel Laurels</span>
        <h2 className="bold-header-title text-3xl md:text-4xl lg:text-5xl tracking-[0.15em] uppercase font-black">
          ROYAL HONORS & LAURELS
        </h2>
        <p className="font-sans text-sm md:text-base text-stone-400 max-w-xl mx-auto mt-3 italic">
          Behold the badges of honor and prestigious scrolls bestowed upon Saurabh across the physical and mental fields of the Seven Kingdoms.
        </p>
        <div className="ornamental-line" />
      </div>

      {/* DRAGON REVEAL EXPERIMENTAL CONTAINER */}
      {revealState !== 'revealed' ? (
        <div className="relative w-full min-h-[420px] bg-stone-950/80 border border-stone-900 rounded-xl p-8 flex flex-col items-center justify-center overflow-hidden iron-border">
          
          {/* Subtle grid and dark overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.85)_0%,rgba(10,11,13,0.98)_100%)] z-0" />

          {/* Castle Silhouette graphic in center */}
          <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none select-none z-0">
            <svg className="w-96 h-96 text-stone-500 fill-current" viewBox="0 0 200 200">
              <path d="M20,180 L20,100 L40,100 L40,70 L50,70 L50,100 L80,100 L80,50 L95,30 L110,50 L110,100 L140,100 L140,70 L150,70 L150,100 L180,100 L180,180 Z" />
              {/* Outer wall crenellations */}
              <path d="M15,180 L185,180" stroke="currentColor" strokeWidth="4" />
            </svg>
          </div>

          {/* ANIMATED DRAGON ORBITING (State: 'flying') */}
          {revealState === 'flying' && (
            <motion.div
              className="absolute z-20 w-24 h-24 text-red-600 filter drop-shadow-[0_0_8px_rgba(239,68,68,0.7)]"
              animate={{
                x: [180, 240, -220, -140, 180],
                y: [-120, 80, 100, -130, -120],
                scale: [0.6, 1.2, 0.5, 1.0, 0.6],
                rotate: [0, 90, 180, 270, 360],
              }}
              transition={{
                duration: 2.2,
                ease: "easeInOut",
              }}
            >
              {/* Dragon Icon Drawing */}
              <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2" className="w-full h-full">
                <path d="M50 30 C55 25 65 25 70 35 C75 40 70 50 60 52 C50 54 45 45 50 30 Z" fill="currentColor" fillOpacity="0.3" />
                <path d="M50 45 C20 15 10 30 5 50 C15 50 30 45 50 45" fill="currentColor" fillOpacity="0.4" />
                <path d="M50 45 C80 15 90 30 95 50 C85 50 70 45 50 45" fill="currentColor" fillOpacity="0.4" />
                <path d="M50 55 C45 75 55 90 50 98" />
              </svg>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-red-500/20 w-8 h-8 rounded-full blur-md animate-ping" />
            </motion.div>
          )}

          {/* DRAGON LANDED & BREATHING FIRE */}
          {(revealState === 'landed' || revealState === 'breathing') && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="absolute z-20 flex flex-col items-center justify-center text-red-500 filter drop-shadow-[0_0_12px_rgba(239,68,68,0.8)]"
              style={{ top: '25%' }}
            >
              {/* Sitting, majestic dragon */}
              <svg className="w-32 h-32" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M50 20 C53 12 60 12 63 20 C65 25 60 35 50 38 C40 35 35 25 37 20 Z" fill="currentColor" fillOpacity="0.2" />
                {/* Horns */}
                <path d="M58 13 L64 7 M42 13 L36 7" strokeWidth="2" />
                {/* Wings sitting tucked in */}
                <path d="M38 35 C22 30 18 55 24 75 C30 70 34 50 38 35" fill="currentColor" fillOpacity="0.3" />
                <path d="M62 35 C78 30 82 55 76 75 C70 70 66 50 62 35" fill="currentColor" fillOpacity="0.3" />
                {/* Dragon Body */}
                <path d="M50 38 C40 45 42 75 50 82 C58 75 60 45 50 38" fill="currentColor" fillOpacity="0.4" />
                {/* Eyes */}
                <circle cx="47" cy="18" r="1" fill="#f59e0b" className="animate-pulse" />
                <circle cx="53" cy="18" r="1" fill="#f59e0b" className="animate-pulse" />
                {/* Fire blast from jaw point */}
                {revealState === 'breathing' && (
                  <motion.path
                    d="M50 28 Q45 50 50 70 Q55 50 50 28"
                    fill="url(#fireGradient)"
                    stroke="none"
                    animate={{ scale: [0.8, 1.2, 0.9, 1.3, 1.0], opacity: [0.8, 1.0, 0.9, 1.0, 0.8] }}
                    transition={{ duration: 0.2, repeat: Infinity }}
                  />
                )}
                <defs>
                  <linearGradient id="fireGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#fff" />
                    <stop offset="40%" stopColor="#f97316" />
                    <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>

              {revealState === 'breathing' && (
                <span className="font-display text-xs text-red-500 font-bold uppercase tracking-[0.3em] mt-1 animate-pulse">
                  * DRACARYS! *
                </span>
              )}
            </motion.div>
          )}

          {/* ACTIVE WILDFIRE BURST/PARTICLES OVERLAY (State: 'breathing') */}
          {revealState === 'breathing' && (
            <div className="absolute inset-0 z-10 pointer-events-none">
              {fireEmbers.map((ember) => (
                <motion.div
                  key={ember.id}
                  className="absolute rounded-full bg-gradient-to-r from-yellow-400 via-orange-500 to-red-600 shadow-[0_0_8px_#f97316]"
                  style={{
                    left: `${ember.left}%`,
                    top: `${ember.top}%`,
                    width: `${6 * ember.scale}px`,
                    height: `${6 * ember.scale}px`,
                  }}
                  initial={{ scale: 0, opacity: 0, y: 0, x: 0 }}
                  animate={{
                    scale: [0, 2.5 * ember.scale, 0],
                    opacity: [0, 1.0, 0],
                    y: [0, (Math.random() - 0.5) * 120, (Math.random() - 0.5) * 350],
                    x: [0, (Math.random() - 0.5) * 120, (Math.random() - 0.5) * 350],
                  }}
                  transition={{
                    duration: 1.4,
                    delay: ember.delay,
                    ease: "easeOut",
                  }}
                />
              ))}
              {/* Heavy red/orange flashing backdrop screen glow */}
              <motion.div 
                className="absolute inset-0 bg-red-600/35 mix-blend-color-dodge pointer-events-none"
                animate={{ opacity: [0.3, 0.8, 0.4, 0.9, 0.3] }}
                transition={{ duration: 0.15, repeat: Infinity }}
              />
            </div>
          )}

          {/* FOREGROUND INTERACTION ELEMENTS: LOCKED GATES (State: 'idle') */}
          <div className="z-10 flex flex-col items-center justify-center max-w-md text-center">
            {revealState === 'idle' && (
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="p-4 bg-stone-900/90 border border-stone-800 rounded-full flex items-center justify-center w-16 h-16 mx-auto text-gold shadow-lg shadow-gold/10">
                  <Lock className="w-7 h-7 animate-bounce" />
                </div>

                <div>
                  <h3 className="font-display text-lg md:text-xl text-stone-100 uppercase tracking-widest font-bold">
                    Laurels Sealed Behind the Gates
                  </h3>
                  <p className="font-sans text-xs md:text-sm text-stone-400 mt-2 leading-relaxed">
                    The scholar achievements and grand tourney honors are sealed deep inside the High Citadel vaults, guarded by heavy iron gates. Only dragonfire can melt the seals.
                  </p>
                </div>

                <button
                  onClick={handleStartReveal}
                  className="group relative px-6 py-3 border border-red-900/60 hover:border-red-500 bg-red-950/20 text-red-400 hover:text-red-100 font-display font-bold text-xs tracking-[0.25em] uppercase rounded cursor-pointer transition-all duration-500 flex items-center gap-2.5 mx-auto shadow-md shadow-red-950/40 hover:bg-red-900/30"
                >
                  <Flame className="w-4 h-4 text-orange-500 group-hover:animate-bounce" />
                  Summon Drogon to Land & Breathe Fire
                  <Flame className="w-4 h-4 text-orange-500 group-hover:animate-bounce" />
                </button>
              </motion.div>
            )}

            {/* Flying state instructions */}
            {revealState === 'flying' && (
              <motion.div className="space-y-2 animate-pulse">
                <span className="font-mono text-[10px] text-stone-500 tracking-widest uppercase">AIRBORNE BEAST ACTIVE</span>
                <h4 className="font-display text-base text-red-500 font-bold uppercase tracking-widest">
                  Drogon circles the Citadel high towers...
                </h4>
              </motion.div>
            )}

            {/* Landed state instructions */}
            {revealState === 'landed' && (
              <motion.div className="space-y-2">
                <span className="font-mono text-[10px] text-stone-500 tracking-widest uppercase">TARGET LOCKED</span>
                <h4 className="font-display text-base text-orange-500 font-bold uppercase tracking-widest animate-pulse">
                  The Dragon has landed. Gearing fire sacks...
                </h4>
              </motion.div>
            )}

            {/* Breathing state instructions */}
            {revealState === 'breathing' && (
              <motion.div className="space-y-2">
                <ShieldAlert className="w-6 h-6 text-yellow-500 animate-spin-slow mx-auto" />
                <h4 className="font-display text-lg text-white font-black uppercase tracking-widest animate-bounce">
                  MELTING THE CITADEL ARCHIVES!
                </h4>
              </motion.div>
            )}
          </div>

        </div>
      ) : (
        /* REVEALED STATE: SHOW THE EXQUISITE GRIDS */
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.0 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {ACHIEVEMENTS.map((ach, idx) => {
            const IconComponent = ach.icon;
            return (
              <motion.div
                key={ach.id}
                id={`achievement-card-${ach.id}`}
                initial={{ opacity: 0, scale: 0.95, filter: "brightness(2)" }}
                animate={{ opacity: 1, scale: 1, filter: "brightness(1)" }}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="bg-stone-950/60 border border-stone-900 hover:border-gold/40 rounded-md p-6 relative overflow-hidden flex flex-col justify-between group shadow-xl h-full transition-all duration-300 shadow-orange-500/3"
              >
                {/* Outer decorative gold corners on hover */}
                <div className="absolute top-0 left-0 w-0 h-0 border-t border-l border-gold/0 group-hover:border-gold/40 group-hover:w-3 group-hover:h-3 transition-all duration-300" />
                <div className="absolute top-0 right-0 w-0 h-0 border-t border-r border-gold/0 group-hover:border-gold/40 group-hover:w-3 group-hover:h-3 transition-all duration-300" />
                <div className="absolute bottom-0 left-0 w-0 h-0 border-b border-l border-gold/0 group-hover:border-gold/40 group-hover:w-3 group-hover:h-3 transition-all duration-300" />
                <div className="absolute bottom-0 right-0 w-0 h-0 border-b border-r border-gold/0 group-hover:border-gold/40 group-hover:w-3 group-hover:h-3 transition-all duration-300" />

                {/* Subtle internal flame background overlay */}
                <div className="absolute -bottom-6 -right-6 w-20 h-20 bg-orange-600/5 rounded-full blur-xl group-hover:bg-orange-500/10 transition-colors" />

                <div>
                  {/* Badge Icon Header */}
                  <div className="flex justify-between items-start mb-5">
                    <div className={`p-3 rounded-md border ${ach.badgeColor} flex items-center justify-center relative shadow-inner`}>
                      <IconComponent className="w-6 h-6 animate-pulse" />
                      <div className="absolute -top-1 -right-1 w-2 h-2 rounded-full bg-gold opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex gap-0.5 opacity-30 group-hover:opacity-100 transition-opacity">
                      <Star className="w-3 h-3 text-gold fill-gold" />
                      <Star className="w-3 h-3 text-gold fill-gold" />
                      <Star className="w-3 h-3 text-gold fill-gold" />
                    </div>
                  </div>

                  {/* GoT Medieval Honor Scroll Title */}
                  <span className="font-mono text-[9px] uppercase tracking-wider text-stone-500 block">
                    {ach.gotAuthority}
                  </span>
                  <h3 className="font-display text-base font-black text-[#f3e5ab] uppercase tracking-wide leading-snug mt-1 group-hover:text-gold transition-colors">
                    {ach.gotTitle}
                  </h3>

                  {/* Divider */}
                  <div className="h-[1px] w-full bg-gradient-to-r from-stone-900 via-stone-800 to-stone-900 my-3" />

                  {/* Actual Real World Achievement Title */}
                  <span className="font-sans text-[11px] font-bold text-stone-400 block tracking-wide uppercase">
                    {ach.actualTitle}
                  </span>
                  <span className="font-mono text-[10px] text-stone-600 block italic">
                    Bestowed by {ach.authority}
                  </span>

                  {/* Achievement Scroll Description */}
                  <p className="font-sans text-stone-300 text-xs mt-4 leading-relaxed italic border-l-2 border-stone-800/80 pl-3">
                    "{ach.description}"
                  </p>
                </div>

                {/* Decorative Subtle Sparkle on card bottom corner */}
                <div className="mt-5 flex justify-end">
                  <Sparkles className="w-3.5 h-3.5 text-gold/20 group-hover:text-gold/50 transition-colors duration-500" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}

    </section>
  );
};
