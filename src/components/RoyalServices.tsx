import React from 'react';
import { HouseType } from '../types';
import { motion } from 'motion/react';
import { Sparkles, ShieldAlert, Cpu, Share2, Hammer, Zap } from 'lucide-react';

interface RoyalServicesProps {
  activeHouse: HouseType;
  accentColor: string;
}

interface Service {
  id: string;
  title: string;
  gotTitle: string;
  description: string;
  gotDescription: string;
  icon: React.ComponentType<any>;
  tier: string;
  priceTag: string;
  forgeDuration: string;
}

const SERVICES_DATA: Service[] = [
  {
    id: 'fullstack',
    title: 'Full-Stack Web Development',
    gotTitle: 'Full-Stack Spellcrafting & Web Alchemy',
    description: 'Forging seamless, responsive user experiences from front-end layouts down to complex relational database schemas.',
    gotDescription: 'Weaving beautiful parchment interfaces in React paired with deep, unyielding stone towers in Node.js. Optimized for all devices across the Seven Kingdoms.',
    icon: Hammer,
    tier: 'Lordly Custom',
    priceTag: 'Gold Dragons & Sovereigns',
    forgeDuration: '2 - 6 Moons'
  },
  {
    id: 'devops',
    title: 'DevOps & Cloud Infrastructure',
    gotTitle: 'Castle Fortifications & DevOps Bastions',
    description: 'Structuring containerized applications, scaling clusters, and setting up bulletproof defense layers for high availability.',
    gotDescription: 'Building massive, impenetrable defense lines around your servers. We deploy Docker garrisons and Kubernetes legions to make sure your castles never fall during sudden user sieges.',
    icon: ShieldAlert,
    tier: 'Royal Siege Grade',
    priceTag: 'Lannister Gold Bullion',
    forgeDuration: '1 - 3 Moons'
  },
  {
    id: 'realtime',
    title: 'Real-Time Communication',
    gotTitle: 'Raven Dispatch & Real-Time Rookery Links',
    description: 'Enabling ultra-low latency text, data, and audio/video channels with modern WebSockets and WebRTC setups.',
    gotDescription: 'Erecting high-speed raven links that deliver messages at millisecond speeds. No letter gets intercepted or dropped, even during severe blizzards or packet loss storms.',
    icon: Share2,
    tier: 'Master of Whisperers',
    priceTag: 'Iron Bank Sovereigns',
    forgeDuration: '1 - 2 Moons'
  },
  {
    id: 'ai_integration',
    title: 'Generative AI & LLM Integration',
    gotTitle: 'Warg Sight & Archmaester AI Spellcraft',
    description: 'Infusing applications with smart semantic search, auto-summarization, and Gemini agent reasoning pathways.',
    gotDescription: 'Opening the third eye of your systems. We integrate the Gemini API (Warg Minds) to read, summarize, and navigate the vast scroll archives of Oldtown with supernatural precision.',
    icon: Cpu,
    tier: 'Grand Archmaester Elite',
    priceTag: 'Valyrian Steel Links',
    forgeDuration: '1 - 3 Moons'
  }
];

export const RoyalServices: React.FC<RoyalServicesProps> = ({ activeHouse, accentColor }) => {
  return (
    <section id="services-section" className="w-full max-w-5xl mx-auto px-4 py-16 border-b border-stone-800/40">
      
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="sub-title-label block mb-2">Guild Commissions</span>
        <h2 className="bold-header-title text-3xl md:text-4xl lg:text-5xl tracking-[0.15em] uppercase font-black">
          ROYAL SERVICES OFFERED
        </h2>
        <p className="font-sans text-sm md:text-base text-stone-400 max-w-xl mx-auto mt-3 italic">
          Behold the alchemical skills available for commission. Hire the Master Smith to forge your next digital keep.
        </p>
        <div className="ornamental-line" />
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {SERVICES_DATA.map((service, index) => {
          const IconComponent = service.icon;
          return (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-stone-950/60 border border-stone-900 rounded-lg p-6 hover:border-gold/40 transition-all duration-300 group relative overflow-hidden flex flex-col justify-between"
            >
              {/* Corner Accent line */}
              <div 
                className="absolute top-0 left-0 w-1 h-full transition-all duration-300 group-hover:w-1.5"
                style={{ backgroundColor: accentColor }}
              />
              
              {/* Background glowing logo */}
              <div 
                className="absolute -right-8 -bottom-8 w-32 h-32 opacity-[0.02] group-hover:opacity-[0.06] transition-opacity duration-300 pointer-events-none"
                style={{ color: accentColor }}
              >
                <IconComponent className="w-full h-full" />
              </div>

              <div>
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div 
                      className="p-2.5 rounded border border-stone-800 bg-stone-950 transition-colors group-hover:border-gold/30"
                      style={{ color: accentColor }}
                    >
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="font-mono text-[9px] uppercase tracking-widest text-stone-500 block">
                        {service.title}
                      </span>
                      <h3 className="font-display text-base md:text-lg font-bold text-stone-100 tracking-wide uppercase mt-0.5">
                        {service.gotTitle}
                      </h3>
                    </div>
                  </div>
                  <Zap className="w-3.5 h-3.5 text-gold opacity-30 group-hover:opacity-80 transition-opacity" />
                </div>

                {/* Body descriptions */}
                <div className="space-y-3 mt-4 text-left">
                  <p className="font-sans text-stone-300 text-sm leading-relaxed">
                    {service.gotDescription}
                  </p>
                  <p className="font-sans text-stone-500 text-xs italic">
                    <span className="text-gold-hover font-semibold">Citadel Grade:</span> {service.description}
                  </p>
                </div>
              </div>

              {/* Service Footer / Price Spec */}
              <div className="mt-6 pt-4 border-t border-stone-900 flex justify-between items-center text-[10px] md:text-xs font-mono uppercase tracking-wider text-stone-400">
                <div>
                  <span className="text-stone-600 block text-[9px]">Forge Duration</span>
                  <span className="text-stone-300 font-semibold">{service.forgeDuration}</span>
                </div>
                <div className="text-center">
                  <span className="text-stone-600 block text-[9px]">Warrant Tier</span>
                  <span className="text-stone-300 font-semibold">{service.tier}</span>
                </div>
                <div className="text-right">
                  <span className="text-stone-600 block text-[9px]">Tribute Cost</span>
                  <span className="text-gold font-bold">{service.priceTag}</span>
                </div>
              </div>

            </motion.div>
          );
        })}
      </div>

    </section>
  );
};
