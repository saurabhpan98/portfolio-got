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
                  className="bg-stone-950/40 border border-stone-900 rounded-md p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex-1">
                    <div className="flex items-center justify-between md:justify-start gap-3">
                      <h4 className="font-display text-sm md:text-base font-bold text-stone-100 tracking-wide uppercase">
                        {skill.name}
                      </h4>
                      <span 
                        className="font-mono text-[10px] px-2 py-0.5 rounded uppercase border bg-stone-900/60"
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
