import React, { useState } from 'react';
import { HouseType } from '../types';
import { motion, AnimatePresence } from 'motion/react';
import { Quote, Star, Award, Compass, ArrowLeft, ArrowRight, ShieldCheck } from 'lucide-react';

interface LordsTestimonialsProps {
  activeHouse: HouseType;
  accentColor: string;
}

interface Testimonial {
  id: string;
  lordName: string;
  title: string;
  sigil: string; // Emoji representing character
  houseName: string;
  gotWords: string;
  scrollMessage: string;
  ratingSeals: number;
  projectCommissioned: string;
  dateStamped: string;
}

const ENDORSEMENTS: Testimonial[] = [
  {
    id: 'rev1',
    lordName: 'Jon Snow',
    title: '998th Lord Commander of the Night\'s Watch',
    sigil: '🐺',
    houseName: 'House Stark (Castle Black)',
    gotWords: 'Winter is Coming',
    scrollMessage: 'The Ranger Raven communication channel that Maester Saurabh constructed for the Wall is outstanding. It has kept Castle Black connected to our active scouts in the deep North during extreme blizzards. No messages were dropped when the wildlings marched. Saurabh is indeed the shield that guards our stacks.',
    ratingSeals: 5,
    projectCommissioned: 'Ranger Raven Link',
    dateStamped: '302 AC'
  },
  {
    id: 'rev2',
    lordName: 'Tycho Nestoris',
    title: 'High Representative & Auditor of the Iron Bank',
    sigil: '⚖️',
    houseName: 'The Iron Bank of Braavos',
    gotWords: 'The Iron Bank Will Have Its Due',
    scrollMessage: 'A software architect who truly pays his debts. The high-performance transaction ledger systems Saurabh forged for our vault audits have survived multiple heavy stress-testing campaigns without losing a single copper piece. The interactive gold charts are clear and precise. Absolute financial integrity.',
    ratingSeals: 5,
    projectCommissioned: 'The Iron Bank Ledger',
    dateStamped: '301 AC'
  },
  {
    id: 'rev3',
    lordName: 'Daenerys Targaryen',
    title: 'Stormborn, Queen of the Seven Kingdoms',
    sigil: '🐉',
    houseName: 'House Targaryen (Dragonstone)',
    gotWords: 'Fire and Blood',
    scrollMessage: 'The aerial coordinates system developed by Saurabh is a masterclass in spatial wizardry. Our dragon patrols now communicate with millisecond latency, coordinating flights through heavy storms with perfect synchronization. Dracarys is now targeted with flawless accuracy.',
    ratingSeals: 5,
    projectCommissioned: 'Dragonstone Aerial Radar',
    dateStamped: '303 AC'
  },
  {
    id: 'rev4',
    lordName: 'Archmaester Ebrose',
    title: 'Keeper of the Oldtown Citadel Libraries',
    sigil: '📚',
    houseName: 'The Citadel of Oldtown',
    gotWords: 'Knowledge Guards the Realm',
    scrollMessage: 'Saurabh\'s semantic search algorithms have saved the order of Maesters years of physical document searching. Finding remedies for rare sicknesses or ancient royal family trees now takes mere moments, utilizing advanced pattern indexing algorithms. Truly, a genius of computational alchemy.',
    ratingSeals: 5,
    projectCommissioned: 'The Citadel Archive Search',
    dateStamped: '304 AC'
  }
];

export const LordsTestimonials: React.FC<LordsTestimonialsProps> = ({ activeHouse, accentColor }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? ENDORSEMENTS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === ENDORSEMENTS.length - 1 ? 0 : prev + 1));
  };

  const activeEndorsement = ENDORSEMENTS[activeIndex];

  return (
    <section id="reviews-section" className="w-full max-w-5xl mx-auto px-4 py-16 border-b border-stone-800/40">
      
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="sub-title-label block mb-2">Vouchsafes of Nobility</span>
        <h2 className="bold-header-title text-3xl md:text-4xl lg:text-5xl tracking-[0.15em] uppercase font-black">
          ROYAL ENDORSEMENTS
        </h2>
        <p className="font-sans text-sm md:text-base text-stone-400 max-w-xl mx-auto mt-3 italic">
          Behold the glowing reviews and pledges of fealty sent by Great Lords and High Merchants who commissioned Saurabh's software services.
        </p>
        <div className="ornamental-line" />
      </div>

      {/* Main Interactive Testimonial Slider */}
      <div className="relative max-w-3xl mx-auto px-1 sm:px-4">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-6">
          
          {/* Prev button (Desktop) */}
          <button
            onClick={handlePrev}
            className="hidden md:block p-3 border border-stone-800 bg-stone-950/80 hover:border-gold hover:bg-stone-900 rounded-full cursor-pointer transition-all duration-300 shrink-0 text-stone-400 hover:text-gold"
            title="Inspect previous scroll"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>

          {/* Core Scroll Card */}
          <div className="w-full flex-1 min-w-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeEndorsement.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="parchment-bg w-full rounded-lg text-stone-900 relative overflow-hidden"
              >
                {/* Wood Scroll bars */}
                <div className="h-4 bg-amber-950 w-full relative flex justify-between px-6 items-center">
                  <div className="w-4 h-4 rounded-full bg-gold shadow" />
                  <div className="w-24 h-2 bg-stone-900 rounded" />
                  <div className="w-4 h-4 rounded-full bg-gold shadow" />
                </div>

                {/* Inner Card Details */}
                <div className="p-5 sm:p-8 md:p-10 parchment-border relative">
                  
                  {/* Watermark Sigil icon */}
                  <span className="absolute right-4 top-4 text-4xl sm:text-5xl opacity-15 select-none pointer-events-none">
                    {activeEndorsement.sigil}
                  </span>

                  <Quote className="w-8 h-8 text-amber-950/10 absolute top-4 left-4" />

                  {/* Character/Review Info */}
                  <div className="text-left mb-6 border-b border-amber-950/20 pb-4">
                    <span className="font-mono text-[8px] sm:text-[9px] uppercase tracking-wider text-amber-900 font-bold block">
                      Royal Seal Endorsement • {activeEndorsement.dateStamped} Stamped
                    </span>
                    <h3 className="font-display text-base sm:text-lg md:text-xl font-black text-amber-950 mt-1 uppercase tracking-wide flex items-center gap-2">
                      {activeEndorsement.lordName}
                    </h3>
                    <p className="font-sans text-[11px] sm:text-xs font-semibold text-amber-900 italic mt-0.5">
                      {activeEndorsement.title}
                    </p>
                    <p className="font-mono text-[9px] sm:text-[10px] text-stone-600 uppercase tracking-widest mt-0.5">
                      {activeEndorsement.houseName} • "{activeEndorsement.gotWords}"
                    </p>
                  </div>

                  {/* Testimonial message */}
                  <div className="text-left font-sans text-stone-800 text-xs sm:text-sm md:text-base leading-relaxed italic min-h-[140px]">
                    "{activeEndorsement.scrollMessage}"
                  </div>

                  {/* Golden ratings seals */}
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mt-6 pt-4 border-t border-amber-950/15">
                    <div>
                      <span className="font-mono text-[8px] sm:text-[9px] uppercase text-stone-600 block">Commission Forged</span>
                      <span className="font-display text-[11px] sm:text-xs font-bold text-amber-950 uppercase">
                        ⚔ {activeEndorsement.projectCommissioned}
                      </span>
                    </div>

                    <div className="flex flex-col items-start sm:items-end gap-1">
                      <div className="flex gap-1 text-gold">
                        {Array.from({ length: activeEndorsement.ratingSeals }).map((_, rIdx) => (
                          <div 
                            key={rIdx} 
                            className="w-4 h-4 sm:w-5 h-5 rounded-full bg-red-700 flex items-center justify-center border border-red-800 shadow animate-pulse"
                            title="Royal Gold Seal of Approval"
                          >
                            <Star className="w-2.5 h-2.5 text-gold fill-gold" />
                          </div>
                        ))}
                      </div>
                      <span className="font-mono text-[8px] uppercase text-stone-600">Noble Seal Score</span>
                    </div>
                  </div>

                </div>

                {/* Wood Scroll bottom bar */}
                <div className="h-4 bg-amber-950 w-full relative flex justify-between px-6 items-center">
                  <div className="w-4 h-4 rounded-full bg-gold shadow" />
                  <div className="w-24 h-2 bg-stone-900 rounded" />
                  <div className="w-4 h-4 rounded-full bg-gold shadow" />
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Next button (Desktop) */}
          <button
            onClick={handleNext}
            className="hidden md:block p-3 border border-stone-800 bg-stone-950/80 hover:border-gold hover:bg-stone-900 rounded-full cursor-pointer transition-all duration-300 shrink-0 text-stone-400 hover:text-gold"
            title="Inspect next scroll"
          >
            <ArrowRight className="w-5 h-5" />
          </button>

        </div>

        {/* Mobile Navigation Buttons (shown only on mobile) */}
        <div className="flex md:hidden justify-center items-center gap-6 mt-4">
          <button
            onClick={handlePrev}
            className="p-2.5 border border-stone-800 bg-stone-950/80 hover:border-gold hover:bg-stone-900 rounded-full cursor-pointer transition-all duration-300 text-stone-400 hover:text-gold"
            title="Inspect previous scroll"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="p-2.5 border border-stone-800 bg-stone-950/80 hover:border-gold hover:bg-stone-900 rounded-full cursor-pointer transition-all duration-300 text-stone-400 hover:text-gold"
            title="Inspect next scroll"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        {/* Bullet indicators */}
        <div className="flex justify-center gap-1.5 mt-6">
          {ENDORSEMENTS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === idx ? 'w-6' : 'w-2 bg-stone-800'
              }`}
              style={{ backgroundColor: activeIndex === idx ? accentColor : undefined }}
            />
          ))}
        </div>

      </div>

    </section>
  );
};
