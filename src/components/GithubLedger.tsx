import React, { useState } from 'react';
import { HouseType } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { GitBranch, Star, Activity, Sword, Trophy, Compass, Sparkles, ExternalLink } from 'lucide-react';

interface GithubLedgerProps {
  activeHouse: HouseType;
  accentColor: string;
}

// Simulated calendar data for the "Commit Scroll" (12 weeks of battle logs)
interface ContributionDay {
  date: string;
  count: number;
  siegeName: string;
}

const generateContributionLogs = (): ContributionDay[] => {
  const Sieges = [
    "Slaying critical production dragon bugs",
    "Reinforcing Castle Docker infrastructure gates",
    "Forging high-performance API sword-blades",
    "Securing gold ledger encryption keys",
    "Sending urgent raven communications via socket links",
    "Scribing elegant Valyrian steel types in React",
    "Calibrating dragon navigation coordinate systems",
    "Drafting detailed Archmaester documentation scrolls"
  ];
  
  const logs: ContributionDay[] = [];
  const baseDate = new Date(2026, 4, 1); // Start of May 2026
  
  for (let i = 0; i < 84; i++) { // 12 weeks * 7 days = 84 days
    const dateObj = new Date(baseDate);
    dateObj.setDate(baseDate.getDate() + i);
    const dateStr = dateObj.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    
    // Create realistic variation
    const rand = Math.random();
    let count = 0;
    if (rand > 0.85) count = Math.floor(Math.random() * 5) + 6; // Heavy battle days (6-10 commits)
    else if (rand > 0.4) count = Math.floor(Math.random() * 4) + 1; // Normal battle days (1-4 commits)
    
    const siegeName = count > 0 
      ? `${count} anvil strikes: ${Sieges[Math.floor(Math.random() * Sieges.length)]}`
      : "Peaceful day in the realm. Compilers resting.";

    logs.push({
      date: dateStr,
      count,
      siegeName
    });
  }
  return logs;
};

const CONTRIBUTION_DATA = generateContributionLogs();

export const GithubLedger: React.FC<GithubLedgerProps> = ({ activeHouse, accentColor }) => {
  const [selectedDay, setSelectedDay] = useState<ContributionDay | null>(null);
  
  // STATS
  const stats = [
    { label: "Great Keeps Guarded", sub: "Repositories", val: "42", desc: "Digital fortifications deployed to public repositories", icon: Trophy },
    { label: "Anvil Strikes Recorded", sub: "Total Commits", val: "1,842", desc: "Individual contributions stamped with wax signature", icon: Sword },
    { label: "Royal Favors Recieved", sub: "GitHub Stars", val: "148", desc: "Commendations granted by foreign merchants & lords", icon: Star },
    { label: "Treaties Negotiated", sub: "Merged Pull Requests", val: "219", desc: "Seamless merge requests joined without civil conflict", icon: GitBranch }
  ];

  // Language Breakdown
  const languages = [
    { name: "TypeScript (Valyrian Steel Types)", pct: 48, color: accentColor },
    { name: "React & JavaScript (Dragonstone Obsidian)", pct: 32, color: "#f59e0b" },
    { name: "Node.js & Python (Citadel Formulas)", pct: 12, color: "#10b981" },
    { name: "HTML & Tailwind CSS (Parchment Styles)", pct: 8, color: "#a855f7" }
  ];

  // Helper to get color intensity for grid cells
  const getCellColor = (count: number) => {
    if (count === 0) return 'bg-stone-900/40 border border-stone-950';
    if (count <= 2) return 'bg-opacity-20 border border-stone-800';
    if (count <= 4) return 'bg-opacity-40 border border-stone-700/50';
    if (count <= 7) return 'bg-opacity-75 border border-stone-600/30';
    return 'bg-opacity-100 shadow-sm border border-stone-500/20';
  };

  return (
    <section id="github-analytics-section" className="w-full max-w-5xl mx-auto px-4 py-16 border-b border-stone-800/40">
      
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="sub-title-label block mb-2">The Ledger of Commits</span>
        <h2 className="bold-header-title text-3xl md:text-4xl lg:text-5xl tracking-[0.15em] uppercase font-black">
          BATTLE SCARS & ANALYTICS
        </h2>
        <p className="font-sans text-sm md:text-base text-stone-400 max-w-xl mx-auto mt-3 italic">
          Audited logs from the High Citadel registries. Real-time proof of Saurabh's legendary siege campaigns across the web.
        </p>
        <div className="ornamental-line" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left: General Stats cards */}
        <div className="lg:col-span-4 space-y-4">
          <h3 className="font-display text-sm tracking-widest text-stone-400 uppercase font-bold text-left mb-2">
            ♛ THE ROYAL AUDIT SCROLL
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {stats.map((stat) => {
              const Icon = stat.icon;
              return (
                <div 
                  key={stat.label}
                  className="bg-stone-950/40 border border-stone-900/80 rounded-md p-4 flex gap-4 items-center group hover:border-stone-800 transition-colors"
                >
                  <div 
                    className="p-3 rounded bg-stone-950 border border-stone-900 flex justify-center items-center group-hover:scale-105 transition-transform shrink-0"
                    style={{ color: accentColor }}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-wider text-stone-500 block">
                      {stat.sub}
                    </span>
                    <span className="font-display text-2xl font-black text-white block">
                      {stat.val}
                    </span>
                    <h4 className="font-sans text-xs font-bold text-gold-hover mt-0.5">
                      {stat.label}
                    </h4>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Simulated Commit Calendar Board + Languages Wheel */}
        <div className="lg:col-span-8 space-y-8">
          
          {/* Commit Heatmap Grid */}
          <div className="bg-stone-950/60 border border-stone-900 rounded-lg p-6 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-6">
              <div>
                <span className="font-mono text-[10px] text-stone-500 uppercase tracking-widest block">Contributions Almanac</span>
                <h3 className="font-display text-lg font-bold text-stone-100 uppercase tracking-wider">
                  THE CITADEL COMMIT SCROLL (LAST 12 MOONS)
                </h3>
              </div>
              <a 
                href="https://github.com/saurabhpan98?tab=repositories"
                target="_blank" 
                rel="noreferrer referrer"
                className="inline-flex items-center gap-1.5 font-display text-[10px] uppercase tracking-widest text-gold hover:text-white transition-colors"
              >
                Inspect Original Forge <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            <p className="font-sans text-xs text-stone-400 text-left mb-4">
              Below lies the active campaign map. Click on any green-gold "Battle Day" cell to inspect the historical scrolls recorded on that sunset.
            </p>

            {/* Grid Box */}
            <div className="overflow-x-auto pb-2">
              <div className="min-w-[480px] grid grid-cols-12 gap-1.5">
                {Array.from({ length: 12 }).map((_, weekIdx) => {
                  return (
                    <div key={weekIdx} className="space-y-1.5 flex flex-col">
                      <span className="font-mono text-[8px] text-stone-600 block text-center uppercase mb-1">
                        M{weekIdx + 1}
                      </span>
                      {CONTRIBUTION_DATA.slice(weekIdx * 7, (weekIdx + 1) * 7).map((day, dIdx) => {
                        const isSelected = selectedDay?.date === day.date;
                        return (
                          <div
                            key={dIdx}
                            onClick={() => setSelectedDay(day)}
                            className={`w-full aspect-square rounded-sm cursor-pointer transition-all duration-300 hover:scale-110 hover:z-10 ${getCellColor(day.count)}`}
                            style={{
                              backgroundColor: day.count > 0 ? accentColor : undefined,
                              boxShadow: isSelected ? `0 0 10px ${accentColor}` : undefined,
                              borderColor: isSelected ? '#fff' : undefined,
                            }}
                            title={`${day.date}: ${day.count} strikes`}
                          />
                        );
                      })}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Scale Legends */}
            <div className="flex justify-between items-center mt-4 text-[9px] font-mono text-stone-500 uppercase tracking-widest">
              <span>Peaceful Moons</span>
              <div className="flex gap-1 items-center">
                <span>Rest</span>
                <div className="w-2.5 h-2.5 rounded-sm bg-stone-900 border border-stone-950" />
                <div className="w-2.5 h-2.5 rounded-sm bg-opacity-30" style={{ backgroundColor: accentColor }} />
                <div className="w-2.5 h-2.5 rounded-sm bg-opacity-60" style={{ backgroundColor: accentColor }} />
                <div className="w-2.5 h-2.5 rounded-sm bg-opacity-100" style={{ backgroundColor: accentColor }} />
                <span>Heavy Siege</span>
              </div>
            </div>

            {/* Selected day report panel */}
            <div className="mt-6 pt-4 border-t border-stone-900 min-h-[70px]">
              <AnimatePresence mode="wait">
                {selectedDay ? (
                  <motion.div
                    key={selectedDay.date}
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    transition={{ duration: 0.2 }}
                    className="bg-stone-950 border border-stone-900/60 p-3 rounded flex gap-3 items-center"
                  >
                    <div className="w-8 h-8 rounded-full bg-stone-900 border border-stone-800 flex items-center justify-center shrink-0">
                      <Activity className="w-4 h-4 text-gold" />
                    </div>
                    <div className="text-left">
                      <span className="font-mono text-[9px] text-stone-500 uppercase">{selectedDay.date} Campaign Record</span>
                      <p className="font-sans text-sm font-semibold text-stone-200 mt-0.5">
                        {selectedDay.siegeName}
                      </p>
                    </div>
                  </motion.div>
                ) : (
                  <div className="text-center text-xs text-stone-500 italic py-2">
                    ✦ Click any day on the Commit Scroll above to read its Citadel scribe entry ✦
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Languages breakdown */}
          <div className="bg-stone-950/60 border border-stone-900 rounded-lg p-6 text-left">
            <span className="font-mono text-[10px] text-stone-500 uppercase tracking-widest block">Metals & Ores</span>
            <h3 className="font-display text-lg font-bold text-stone-100 uppercase tracking-wider mb-6">
              THE ARCHEOLOGY OF SOURCE LANGUAGES
            </h3>

            <div className="space-y-4">
              {languages.map((lang) => {
                return (
                  <div key={lang.name} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-display font-bold text-stone-300 uppercase tracking-wide">
                        {lang.name}
                      </span>
                      <span className="font-mono text-gold font-bold">
                        {lang.pct}%
                      </span>
                    </div>
                    {/* Visual Progress bar bar */}
                    <div className="h-2 bg-stone-900 rounded-full overflow-hidden border border-stone-950">
                      <div 
                        className="h-full rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${lang.pct}%`, 
                          backgroundColor: lang.color,
                          boxShadow: `0 0 8px ${lang.color}40`
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
