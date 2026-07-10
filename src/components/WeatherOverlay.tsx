import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Snowflake, Flame, Moon, Cloud } from 'lucide-react';

interface WeatherOverlayProps {
  currentSection: string;
}

type WeatherType = 'snow' | 'fog' | 'embers' | 'nightsky';

export const WeatherOverlay: React.FC<WeatherOverlayProps> = ({ currentSection }) => {
  const [weather, setWeather] = useState<WeatherType>('snow');

  // Map sections to weather conditions in sequence
  useEffect(() => {
    switch (currentSection) {
      case 'hero-great-hall':
      case 'realm-map-section':
        setWeather('snow');
        break;
      case 'house-selector-section':
      case 'chronicles-section':
        setWeather('fog');
        break;
      case 'services-section':
      case 'campaigns-section':
      case 'achievements-section':
        setWeather('embers');
        break;
      case 'projects-section':
      case 'github-analytics-section':
      case 'reviews-section':
      case 'contact-section':
      default:
        setWeather('nightsky');
        break;
    }
  }, [currentSection]);

  // Generate particles
  const [snowflakes, setSnowflakes] = useState<{ id: number; left: number; delay: number; duration: number; size: number }[]>([]);
  const [embers, setEmbers] = useState<{ id: number; left: number; delay: number; duration: number; size: number }[]>([]);
  const [stars, setStars] = useState<{ id: number; left: number; top: number; size: number; delay: number }[]>([]);

  useEffect(() => {
    // Generate static positions once to prevent hydration/re-render flickering
    const snowItems = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 5 + 5,
      size: Math.random() * 4 + 2,
    }));
    setSnowflakes(snowItems);

    const emberItems = Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: Math.random() * 4 + 4,
      size: Math.random() * 3 + 1.5,
      opacity: Math.random() * 0.6 + 0.4,
    }));
    setEmbers(emberItems);

    const starItems = Array.from({ length: 60 }).map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      top: Math.random() * 100,
      size: Math.random() * 2 + 1,
      delay: Math.random() * 3,
      duration: 2 + Math.random() * 3,
      opacity: Math.random() * 0.6 + 0.3,
    }));
    setStars(starItems);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none transition-colors duration-1000">
      
      {/* Dynamic Background Tint overlays based on current weather */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          weather === 'snow' ? 'bg-sky-950/10 opacity-100' :
          weather === 'fog' ? 'bg-zinc-900/15 opacity-100' :
          weather === 'embers' ? 'bg-red-950/5 opacity-100' :
          'bg-slate-950/20 opacity-100'
        }`}
      />

      <AnimatePresence mode="wait">
        
        {/* SNOW WEATHER */}
        {weather === 'snow' && (
          <motion.div
            key="snow-weather"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0 }}
            className="absolute inset-0"
          >
            {snowflakes.map((s) => (
              <div
                key={s.id}
                className="absolute bg-white rounded-full opacity-60 filter drop-shadow-[0_0_2px_rgba(255,255,255,0.8)]"
                style={{
                  left: `${s.left}%`,
                  top: '-10px',
                  width: `${s.size}px`,
                  height: `${s.size}px`,
                  animation: `snow-drift ${s.duration}s linear ${s.delay}s infinite`,
                }}
              />
            ))}
            {/* Soft snow wind visual */}
            <div className="absolute top-1/4 left-0 w-full h-24 bg-gradient-to-r from-transparent via-white/5 to-transparent blur-md -skew-y-3 animate-[pulse_6s_infinite_ease-in-out]" />
          </motion.div>
        )}

        {/* FOG WEATHER */}
        {weather === 'fog' && (
          <motion.div
            key="fog-weather"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0 }}
            className="absolute inset-0"
          >
            {/* Rolling Mist Layer 1 */}
            <div 
              className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-stone-900/40 via-stone-800/10 to-transparent blur-xl filter animate-[fog-scroll_25s_infinite_linear]"
              style={{
                backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(228, 228, 231, 0.08) 0%, transparent 60%), radial-gradient(circle at 80% 90%, rgba(228, 228, 231, 0.06) 0%, transparent 50%)',
              }}
            />
            {/* Rolling Mist Layer 2 */}
            <div 
              className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-stone-900/35 via-stone-800/5 to-transparent blur-xl filter animate-[fog-scroll-reverse_30s_infinite_linear]"
              style={{
                backgroundImage: 'radial-gradient(circle at 70% 20%, rgba(228, 228, 231, 0.06) 0%, transparent 60%), radial-gradient(circle at 30% 10%, rgba(228, 228, 231, 0.08) 0%, transparent 50%)',
              }}
            />
          </motion.div>
        )}

        {/* FIRE EMBERS WEATHER */}
        {weather === 'embers' && (
          <motion.div
            key="embers-weather"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0 }}
            className="absolute inset-0"
          >
            {embers.map((e) => (
              <div
                key={e.id}
                className="absolute rounded-full"
                style={{
                  left: `${e.left}%`,
                  bottom: '-10px',
                  width: `${e.size}px`,
                  height: `${e.size}px`,
                  background: 'radial-gradient(circle, #f97316 0%, #ef4444 60%, transparent 100%)',
                  boxShadow: '0 0 6px #f97316, 0 0 12px #ef4444',
                  animation: `embers-drift ${e.duration}s linear ${e.delay}s infinite`,
                  opacity: e.opacity,
                }}
              />
            ))}
            {/* Heat refraction shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-red-500/3 via-transparent to-transparent mix-blend-color-dodge pointer-events-none" />
          </motion.div>
        )}

        {/* NIGHT SKY WEATHER */}
        {weather === 'nightsky' && (
          <motion.div
            key="nightsky-weather"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.0 }}
            className="absolute inset-0"
          >
            {/* Twinkling Starfield */}
            {stars.map((s: any) => (
              <div
                key={s.id}
                className="absolute bg-white rounded-full"
                style={{
                  left: `${s.left}%`,
                  top: `${s.top}%`,
                  width: `${s.size}px`,
                  height: `${s.size}px`,
                  boxShadow: '0 0 4px #ffffff',
                  animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
                  opacity: s.opacity,
                }}
              />
            ))}

            {/* Glowing cosmic nebula overlay */}
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_50%,rgba(99,102,241,0.04)_0%,transparent_50%),radial-gradient(circle_at_80%_20%,rgba(168,85,247,0.03)_0%,transparent_40%)] mix-blend-screen" />

            {/* A rare shooting star! */}
            <div className="shooting-star absolute top-[10%] left-[20%] w-[1px] h-[1px] bg-white rounded-full shadow-[0_0_8px_#fff]" />
            <div className="shooting-star absolute top-[40%] left-[60%] w-[1px] h-[1px] bg-white rounded-full shadow-[0_0_8px_#fff]" style={{ animationDelay: '8s' }} />
          </motion.div>
        )}

      </AnimatePresence>

      {/* Weather Indicator Badge in bottom-right margin (quietly sitting) */}
      <div className="fixed bottom-6 right-6 bg-stone-950/80 border border-stone-800 backdrop-blur px-3 py-1.5 rounded-md flex items-center gap-2 text-[10px] uppercase font-mono tracking-widest text-stone-400 shadow-md transition-all duration-500 hover:border-gold/40 z-40">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
        </span>
        <span>Atmosphere: {weather}</span>
        {weather === 'snow' && <Snowflake className="w-3.5 h-3.5 text-sky-400 animate-spin-slow" />}
        {weather === 'fog' && <Cloud className="w-3.5 h-3.5 text-zinc-400 animate-pulse" />}
        {weather === 'embers' && <Flame className="w-3.5 h-3.5 text-orange-500 animate-bounce" />}
        {weather === 'nightsky' && <Moon className="w-3.5 h-3.5 text-indigo-400" />}
      </div>

    </div>
  );
};
