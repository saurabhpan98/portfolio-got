import React from 'react';
import { HouseType } from '../types';
import { motion } from 'motion/react';
import { Trophy, Award, Crown, Sparkles, Star } from 'lucide-react';

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
  return (
    <section id="achievements-section" className="w-full max-w-5xl mx-auto px-4 py-16 border-b border-stone-800/40">
      
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

      {/* Achievements Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {ACHIEVEMENTS.map((ach, idx) => {
          const IconComponent = ach.icon;
          return (
            <motion.div
              key={ach.id}
              id={`achievement-card-${ach.id}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="bg-stone-950/60 border border-stone-900 hover:border-stone-800 rounded-md p-6 relative overflow-hidden flex flex-col justify-between group shadow-xl h-full"
            >
              {/* Outer decorative gold corners on hover */}
              <div className="absolute top-0 left-0 w-0 h-0 border-t border-l border-gold/0 group-hover:border-gold/40 group-hover:w-3 group-hover:h-3 transition-all duration-300" />
              <div className="absolute top-0 right-0 w-0 h-0 border-t border-r border-gold/0 group-hover:border-gold/40 group-hover:w-3 group-hover:h-3 transition-all duration-300" />
              <div className="absolute bottom-0 left-0 w-0 h-0 border-b border-l border-gold/0 group-hover:border-gold/40 group-hover:w-3 group-hover:h-3 transition-all duration-300" />
              <div className="absolute bottom-0 right-0 w-0 h-0 border-b border-r border-gold/0 group-hover:border-gold/40 group-hover:w-3 group-hover:h-3 transition-all duration-300" />

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
      </div>
    </section>
  );
};
