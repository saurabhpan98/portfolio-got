import React, { useState } from 'react';
import { HouseType, Skill } from '../types';
import { SKILLS } from '../data';
import { motion } from 'motion/react';
import { Sword, Hammer, Sparkles, Scroll } from 'lucide-react';

interface ChroniclesProps {
  activeHouse: HouseType;
  accentColor: string;
}

export const Chronicles: React.FC<ChroniclesProps> = ({ activeHouse, accentColor }) => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'frontend' | 'backend' | 'devops' | 'lore'>('all');

  const renderWeaponSVG = (name: string) => {
    const normName = name.toLowerCase();
    if (normName.includes('react')) {
      // War Hammer
      return (
        <div 
          className="weapon-glow-container p-2 bg-amber-950/20 border border-amber-500/30 rounded-lg flex items-center justify-center shrink-0 shadow-[inset_0_0_8px_rgba(245,158,11,0.2)]"
          style={{
            '--weapon-glow-color': '#f59e0b',
            '--weapon-glow-subtle': 'rgba(245,158,11,0.4)',
            '--weapon-glow-bg': 'rgba(120,53,4,0.2)',
          } as React.CSSProperties}
        >
          <svg className="w-10 h-10 text-amber-500 filter drop-shadow-[0_0_5px_rgba(245,158,11,0.5)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M14.5 3h-5l-1 3.5h7z" fill="currentColor" fillOpacity="0.2" />
            <path d="M17 6.5H7v3h10v-3z" fill="currentColor" fillOpacity="0.4" />
            <path d="M12 9.5v11.5M10.5 21h3M12 11h-1M12 14h-1" strokeLinecap="round" />
          </svg>
        </div>
      );
    }
    if (normName.includes('typescript')) {
      // Valyrian Steel Longsword
      return (
        <div 
          className="weapon-glow-container p-2 bg-sky-950/20 border border-sky-500/30 rounded-lg flex items-center justify-center shrink-0 shadow-[inset_0_0_8px_rgba(56,189,248,0.2)]"
          style={{
            '--weapon-glow-color': '#38bdf8',
            '--weapon-glow-subtle': 'rgba(56,189,248,0.4)',
            '--weapon-glow-bg': 'rgba(8,47,73,0.2)',
          } as React.CSSProperties}
        >
          <svg className="w-10 h-10 text-sky-400 filter drop-shadow-[0_0_5px_rgba(56,189,248,0.5)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M17.5 4.5l-2-2-12 12 2 2z" fill="currentColor" fillOpacity="0.2" />
            <path d="M11.5 8.5l4 4M4.5 15.5l-2 2M6.5 17.5l-2 2" strokeLinecap="round" />
            <circle cx="3" cy="21" r="1.5" fill="currentColor" />
          </svg>
        </div>
      );
    }
    if (normName.includes('node') || normName.includes('express')) {
      // Wildfire Alchemist Flask
      return (
        <div 
          className="weapon-glow-container p-2 bg-green-950/20 border border-green-500/30 rounded-lg flex items-center justify-center shrink-0 shadow-[inset_0_0_8px_rgba(34,197,94,0.2)]"
          style={{
            '--weapon-glow-color': '#22c55e',
            '--weapon-glow-subtle': 'rgba(34,197,94,0.4)',
            '--weapon-glow-bg': 'rgba(20,83,45,0.2)',
          } as React.CSSProperties}
        >
          <svg className="w-10 h-10 text-green-500 filter drop-shadow-[0_0_6px_rgba(34,197,94,0.6)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M8.5 2h7M12 2v6M12 11c3.866 0 7 2.686 7 6s-3.134 6-7 6-7-2.686-7-6 3.134-6 7-6z" fill="currentColor" fillOpacity="0.2" />
            <path d="M8 15.5c1.5 2.5 4.5 2.5 6 0" strokeLinecap="round" />
            <circle cx="12" cy="15" r="1.5" fill="currentColor" />
          </svg>
        </div>
      );
    }
    if (normName.includes('next') || normName.includes('vite')) {
      // Kingsroad Longbow
      return (
        <div 
          className="weapon-glow-container p-2 bg-yellow-950/20 border border-yellow-500/30 rounded-lg flex items-center justify-center shrink-0 shadow-[inset_0_0_8px_rgba(234,179,8,0.2)]"
          style={{
            '--weapon-glow-color': '#eab308',
            '--weapon-glow-subtle': 'rgba(234,179,8,0.4)',
            '--weapon-glow-bg': 'rgba(113,63,18,0.2)',
          } as React.CSSProperties}
        >
          <svg className="w-10 h-10 text-yellow-500 filter drop-shadow-[0_0_5px_rgba(234,179,8,0.5)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 20C12 20 20 12 20 4M20 4l-4 1M20 4l-1 4" strokeLinecap="round" />
            <path d="M4 20h12M12 12l5 5M16 4L4 16" strokeDasharray="2 2" />
          </svg>
        </div>
      );
    }
    if (normName.includes('tailwind')) {
      // Aegis Shield
      return (
        <div 
          className="weapon-glow-container p-2 bg-cyan-950/20 border border-cyan-500/30 rounded-lg flex items-center justify-center shrink-0 shadow-[inset_0_0_8px_rgba(34,211,238,0.2)]"
          style={{
            '--weapon-glow-color': '#22d3ee',
            '--weapon-glow-subtle': 'rgba(34,211,238,0.4)',
            '--weapon-glow-bg': 'rgba(21,94,117,0.2)',
          } as React.CSSProperties}
        >
          <svg className="w-10 h-10 text-cyan-400 filter drop-shadow-[0_0_5px_rgba(34,211,238,0.5)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="currentColor" fillOpacity="0.2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M12 6v10M9 9h6M10 12h4" strokeLinecap="round" />
          </svg>
        </div>
      );
    }
    if (normName.includes('postgresql') || normName.includes('mongodb') || normName.includes('sql') || normName.includes('database')) {
      // Heavy Battleaxe
      return (
        <div 
          className="weapon-glow-container p-2 bg-stone-950/20 border border-stone-500/30 rounded-lg flex items-center justify-center shrink-0 shadow-[inset_0_0_8px_rgba(150,150,150,0.2)]"
          style={{
            '--weapon-glow-color': '#d1d5db',
            '--weapon-glow-subtle': 'rgba(156,163,175,0.4)',
            '--weapon-glow-bg': 'rgba(31,41,55,0.2)',
          } as React.CSSProperties}
        >
          <svg className="w-10 h-10 text-stone-300 filter drop-shadow-[0_0_5px_rgba(209,213,219,0.4)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2v20M12 5c3-1.5 5.5-1 5.5 2S15 11.5 12 10M12 5c-3-1.5-5.5-1-5.5 2S9 11.5 12 10" fill="currentColor" fillOpacity="0.2" strokeLinecap="round" />
            <path d="M12 13c2.5-1 4.5-0.5 4.5 1.5s-2 3.5-4.5 3M12 13c-2.5-1-4.5-0.5-4.5 1.5s2 3.5 4.5 3" fill="currentColor" fillOpacity="0.2" strokeLinecap="round" />
          </svg>
        </div>
      );
    }
    if (normName.includes('docker') || normName.includes('kubernetes')) {
      // Iron Crossbow
      return (
        <div 
          className="weapon-glow-container p-2 bg-blue-950/20 border border-blue-500/30 rounded-lg flex items-center justify-center shrink-0 shadow-[inset_0_0_8px_rgba(96,165,250,0.2)]"
          style={{
            '--weapon-glow-color': '#60a5fa',
            '--weapon-glow-subtle': 'rgba(96,165,250,0.4)',
            '--weapon-glow-bg': 'rgba(30,58,138,0.2)',
          } as React.CSSProperties}
        >
          <svg className="w-10 h-10 text-blue-400 filter drop-shadow-[0_0_5px_rgba(96,165,250,0.5)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 12h16M12 4v16M8 8l-4 4 4 4M16 8l4 4-4 4" strokeLinecap="round" />
            <path d="M6 12C6 8.5 18 8.5 18 12" strokeDasharray="3 3" />
            <rect x="10" y="2" width="4" height="4" rx="1" fill="currentColor" fillOpacity="0.3" />
          </svg>
        </div>
      );
    }
    if (normName.includes('pipeline') || normName.includes('ci/cd')) {
      // Royal Sentinel Spear
      return (
        <div 
          className="weapon-glow-container p-2 bg-orange-950/20 border border-orange-500/30 rounded-lg flex items-center justify-center shrink-0 shadow-[inset_0_0_8px_rgba(251,146,60,0.2)]"
          style={{
            '--weapon-glow-color': '#fb923c',
            '--weapon-glow-subtle': 'rgba(251,146,60,0.4)',
            '--weapon-glow-bg': 'rgba(124,45,18,0.2)',
          } as React.CSSProperties}
        >
          <svg className="w-10 h-10 text-orange-400 filter drop-shadow-[0_0_5px_rgba(251,146,60,0.5)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M3 21l18-18M18 3l3 3M15 9l-4-4" strokeLinecap="round" />
            <path d="M19 5l-4-1.5-4 4L15 11l4-4-1.5-4z" fill="currentColor" fillOpacity="0.2" />
            <path d="M5 19l-2 2 1-3" strokeLinecap="round" />
          </svg>
        </div>
      );
    }
    if (normName.includes('python') || normName.includes('fastapi')) {
      // Dragonglass Stiletto (Dagger)
      return (
        <div 
          className="weapon-glow-container p-2 bg-purple-950/20 border border-purple-500/30 rounded-lg flex items-center justify-center shrink-0 shadow-[inset_0_0_8px_rgba(192,132,252,0.2)]"
          style={{
            '--weapon-glow-color': '#c084fc',
            '--weapon-glow-subtle': 'rgba(192,132,252,0.4)',
            '--weapon-glow-bg': 'rgba(88,28,135,0.2)',
          } as React.CSSProperties}
        >
          <svg className="w-10 h-10 text-purple-400 filter drop-shadow-[0_0_5px_rgba(192,132,252,0.5)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 20l3 1 14-14-3-3L4 18l1.5 1.5z" fill="currentColor" fillOpacity="0.2" />
            <path d="M10 8l3 3M6 15l1.5 1.5" strokeLinecap="round" />
            <path d="M4 20l-2 2" strokeLinecap="round" />
          </svg>
        </div>
      );
    }
    // GenAI / Dragon Egg default
    return (
      <div 
        className="weapon-glow-container p-2 bg-red-950/20 border border-red-500/30 rounded-lg flex items-center justify-center shrink-0 shadow-[inset_0_0_8px_rgba(239,68,68,0.2)]"
        style={{
          '--weapon-glow-color': '#ef4444',
          '--weapon-glow-subtle': 'rgba(239,68,68,0.4)',
          '--weapon-glow-bg': 'rgba(127,29,29,0.2)',
        } as React.CSSProperties}
      >
        <svg className="w-10 h-10 text-red-500 filter drop-shadow-[0_0_6px_rgba(239,68,68,0.6)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 2C8.5 2 5 7 5 13s3 9 7 9 7-3 7-9-3.5-11-7-11z" fill="currentColor" fillOpacity="0.3" />
          <path d="M12 5c-1.5 2-2 4.5-2 7s1 5 2 7M12 5c1.5 2 2 4.5 2 7s-1 5-2 7" strokeLinecap="round" />
          <path d="M7 13c1.5-.5 3.5-.5 5 0M12 13c1.5-.5 3.5-.5 5 0" strokeLinecap="round" />
        </svg>
      </div>
    );
  };

  const filteredSkills = activeCategory === 'all' 
    ? SKILLS 
    : SKILLS.filter(s => s.category === activeCategory);

  const getCategoryTitle = (cat: string) => {
    switch (cat) {
      case 'frontend': return 'The Bow & Shield (Frontend)';
      case 'backend': return 'The Great Sword & Wildfire (Backend)';
      case 'devops': return 'The Castle Fortifications (Infrastructure)';
      case 'lore': return 'Warg Sight & Valyrian Smithing (Specialities)';
      default: return 'Full Royal Arsenal';
    }
  };

  return (
    <section id="chronicles-section" className="w-full max-w-5xl mx-auto px-4 py-16 border-b border-stone-800/40">
      
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="sub-title-label block mb-2">Maester's Records</span>
        <h2 className="bold-header-title text-3xl md:text-4xl lg:text-5xl tracking-[0.15em] uppercase font-black">
          THE CHRONICLES & ARMORY
        </h2>
        <div className="ornamental-line" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: The Parchment Scroll of Journey (About Me) */}
        <div className="lg:col-span-5 flex justify-center">
          <motion.div 
            initial={{ opacity: 0, x: -15 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="parchment-bg w-full rounded-lg relative overflow-hidden text-stone-900"
          >
            {/* Scroll decorative wood headers */}
            <div className="h-4 bg-amber-950 w-full relative flex justify-between px-4 items-center">
              <div className="w-3 h-3 rounded-full bg-gold shadow" />
              <div className="w-16 h-2 bg-stone-900 rounded" />
              <div className="w-3 h-3 rounded-full bg-gold shadow" />
            </div>

            {/* Parchment margins & content */}
            <div className="p-5 sm:p-8 md:p-10 parchment-border">
              <div className="flex items-center gap-2 mb-6">
                <Scroll className="w-5 h-5 text-amber-900" />
                <h3 className="font-display text-xl font-bold tracking-wide text-amber-950 uppercase border-b border-amber-900/20 pb-1 w-full">
                  The Saga of Saurabh
                </h3>
              </div>

              <div className="font-sans text-stone-800 text-base md:text-lg space-y-4 leading-relaxed italic">
                <p>
                  "In the year 2026, across the vast digital kingdoms, there arose a scribe of immense capacity—Saurabh of House Panchal."
                </p>
                <p>
                  Saurabh spent his early years studying at the Great Citadel, learning the ancient arts of compiling spells, optimizing database scrolls, and taming memory leaks.
                </p>
                <p>
                  Since then, he has ridden through many coding battles. He has slain legacy code dragons, built giant fortress architectures (secure microservices), and negotiated trades with the Iron Bank of secure transactions. 
                </p>
                <p>
                  No bug is too dark, no wall of infrastructure is too high. Armed with Valyrian steel types and raw wildfire execution, he continues his quest to bring order, speed, and absolute stability to every realm he codes.
                </p>
              </div>

              {/* Royal Seal stamp */}
              <div className="mt-8 flex justify-end items-center gap-3">
                <div className="text-right">
                  <span className="font-mono text-[9px] uppercase text-stone-600 block">Scribe Signature</span>
                  <span className="font-display text-xs font-bold text-amber-950">Maester Saurabh</span>
                </div>
                {/* Visual red/wax seal */}
                <div className="w-10 h-10 rounded-full bg-red-700 shadow-md flex items-center justify-center text-white border-2 border-red-800 font-display text-[10px] select-none font-bold transform rotate-12">
                  SP
                </div>
              </div>
            </div>

            {/* Scroll bottom wood roller */}
            <div className="h-4 bg-amber-950 w-full relative flex justify-between px-4 items-center">
              <div className="w-3 h-3 rounded-full bg-gold shadow" />
              <div className="w-16 h-2 bg-stone-900 rounded" />
              <div className="w-3 h-3 rounded-full bg-gold shadow" />
            </div>
          </motion.div>
        </div>

        {/* Right: The Royal Armory (Skills) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2.5 mb-2 justify-center lg:justify-start">
            <Sword className="w-5 h-5 text-[#c4a45a]" />
            <h3 className="font-display text-xl text-[#f3e5ab] tracking-[0.1em] font-extrabold uppercase">
              THE WEAPONS OF CHOICE (THE STACK)
            </h3>
          </div>

          <p className="font-sans text-sm text-stone-400 text-center lg:text-left">
            Filtering weapons stored in the Citadel's high tower:
          </p>

          {/* Filter category badges */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-2">
            {(['all', 'frontend', 'backend', 'devops', 'lore'] as const).map((cat) => {
              const active = activeCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 font-display text-[10px] md:text-xs tracking-widest uppercase rounded border transition-all duration-300 cursor-pointer ${
                    active 
                      ? 'bg-gold border-gold text-stone-950 font-bold' 
                      : 'border-stone-800 hover:border-stone-600 text-stone-400'
                  }`}
                >
                  {cat === 'all' ? 'All Weapons' : cat}
                </button>
              );
            })}
          </div>

          {/* Skill List layout with animation */}
          <div className="space-y-4 pt-2">
            {filteredSkills.map((skill: Skill) => {
              return (
                <motion.div
                  key={skill.name}
                  layout
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="group bg-stone-950/40 border border-stone-900 rounded-md p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-gold/30 transition-all duration-300"
                >
                  <div className="flex items-center gap-4 flex-1">
                    {/* Visual weapon element */}
                    {renderWeaponSVG(skill.name)}

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-display text-sm md:text-base font-bold text-stone-100 tracking-wide uppercase">
                          {skill.name}
                        </h4>
                        <span 
                          className="font-mono text-[9px] px-2 py-0.5 rounded uppercase border bg-stone-900/60"
                          style={{ borderColor: `${accentColor}30`, color: accentColor }}
                        >
                          {skill.category}
                        </span>
                      </div>
                      {/* GoT Analog */}
                      <div className="flex items-center gap-1 mt-1">
                        <Sparkles className="w-3 h-3 text-gold opacity-60" />
                        <p className="font-sans italic text-xs md:text-sm text-gold-hover">
                          GoT Analog: <span className="font-bold">{skill.gotAnalog}</span>
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Level gauge */}
                  <div className="flex flex-col items-end gap-1.5 min-w-[120px]">
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((idx) => (
                        <div
                          key={idx}
                          className="w-3.5 h-6 rounded border border-stone-800 flex items-center justify-center"
                          style={{
                            backgroundColor: idx <= skill.level ? accentColor : 'transparent',
                            borderColor: idx <= skill.level ? accentColor : '#292524',
                            boxShadow: idx <= skill.level ? `0 0 8px ${accentColor}30` : 'none'
                          }}
                        />
                      ))}
                    </div>
                    <span className="font-mono text-[9px] text-stone-500 uppercase tracking-widest">
                      {skill.level === 5 ? 'Legendary Smith' : skill.level === 4 ? 'Citadel Adept' : 'Warden'}
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
