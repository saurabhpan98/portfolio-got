import React from 'react';
import { HouseType } from '../types';
import { HOUSES } from '../data';
import { StarkSigil, TargaryenSigil, LannisterSigil, NightsWatchSigil } from './HouseSigils';
import { motion } from 'motion/react';

interface HouseSelectorProps {
  activeHouse: HouseType;
  onSelectHouse: (house: HouseType) => void;
}

export const HouseSelector: React.FC<HouseSelectorProps> = ({ activeHouse, onSelectHouse }) => {
  
  const renderSigil = (id: HouseType, color: string, active: boolean) => {
    const size = "w-10 h-10 md:w-12 md:h-12";
    switch (id) {
      case 'stark':
        return <StarkSigil className={size} color={color} glow={active} />;
      case 'targaryen':
        return <TargaryenSigil className={size} color={color} glow={active} />;
      case 'lannister':
        return <LannisterSigil className={size} color={color} glow={active} />;
      case 'nightswatch':
        return <NightsWatchSigil className={size} color={color} glow={active} />;
    }
  };

  return (
    <div id="house-selector-section" className="w-full max-w-5xl mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <span className="sub-title-label block mb-2">Declare Your Allegiance</span>
        <h2 className="bold-header-title text-3xl md:text-4xl lg:text-5xl tracking-[0.15em] uppercase font-black">
          PLEDGE YOUR FEALTY
        </h2>
        <p className="font-sans text-sm md:text-base text-stone-400 max-w-xl mx-auto mt-3 italic">
          Aligning with a Great House will re-forge Saurabh's digital realm in their ancient colours and house runes.
        </p>
        <div className="ornamental-line" />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {HOUSES.map((house) => {
          const isSelected = activeHouse === house.id;
          
          return (
            <motion.button
              key={house.id}
              id={`house-btn-${house.id}`}
              onClick={() => onSelectHouse(house.id)}
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
              className={`relative overflow-hidden rounded-md p-5 text-left border transition-all duration-500 cursor-pointer flex flex-col justify-between h-44 ${
                isSelected
                  ? 'bg-stone-900/90 border-gold shadow-lg shadow-gold/10'
                  : 'bg-stone-950/40 border-stone-800/80 hover:border-stone-700/80'
              }`}
            >
              {/* Active Golden Corners */}
              {isSelected && (
                <>
                  <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-gold" />
                  <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-gold" />
                  <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-gold" />
                  <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-gold" />
                </>
              )}

              {/* Header with Name & Sigil */}
              <div className="flex justify-between items-start w-full gap-2">
                <div>
                  <h3 className={`font-display text-base md:text-lg font-bold tracking-wide transition-colors duration-500 ${
                    isSelected ? 'text-white' : 'text-stone-300'
                  }`}>
                    {house.name.split(' ')[1] || house.name}
                  </h3>
                  <p className="font-mono text-[10px] uppercase tracking-wider text-stone-500 mt-0.5">
                    {house.sigilName}
                  </p>
                </div>
                <div>
                  {renderSigil(
                    house.id, 
                    isSelected ? house.primaryColor : '#4b5563', 
                    isSelected
                  )}
                </div>
              </div>

              {/* Footer with Words */}
              <div className="mt-4 border-t border-stone-800/50 pt-3 w-full">
                <p className={`font-decorative text-[11px] font-bold tracking-widest uppercase transition-colors duration-500 italic ${
                  isSelected ? 'text-gold' : 'text-stone-500'
                }`}>
                  "{house.words}"
                </p>
              </div>

              {/* Decorative Background Sigil watermark */}
              <div className="absolute -right-8 -bottom-8 opacity-5 pointer-events-none transform scale-150 rotate-12">
                {renderSigil(house.id, '#ffffff', false)}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
