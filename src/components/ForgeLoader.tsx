import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Flame, Hammer, Sparkles, Volume2, VolumeX } from 'lucide-react';

interface ForgeLoaderProps {
  isSoundMuted: boolean;
  setIsSoundMuted: (muted: boolean) => void;
  onComplete: () => void;
}

export const ForgeLoader: React.FC<ForgeLoaderProps> = ({ isSoundMuted, setIsSoundMuted, onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState('Kindling the embers...');
  const [sparkCount, setSparkCount] = useState<number>(0);
  const [sparks, setSparks] = useState<{ id: number; angle: number; speed: number; size: number }[]>([]);

  const isMutedRef = useRef(isSoundMuted);
  useEffect(() => {
    isMutedRef.current = isSoundMuted;
  }, [isSoundMuted]);

  // Periodically change the status text and progress
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500); // Small delay to let the user see the complete state
          return 100;
        }
        
        // Realistic progression increments
        const next = prev + Math.floor(Math.random() * 3) + 2;
        const bounded = Math.min(next, 100);

        // Update status texts based on percentage
        if (bounded < 25) {
          setStatusText('Smelting the raw ores of JavaScript...');
        } else if (bounded < 50) {
          setStatusText('Tempering the Valyrian steel of TypeScript...');
        } else if (bounded < 75) {
          setStatusText('Beating the backend server structures on the anvil...');
        } else if (bounded < 90) {
          setStatusText('Quenching the system in reactive state pools...');
        } else {
          setStatusText('Forging your experience...');
        }

        return bounded;
      });
    }, 220);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Click anywhere to try and resume audio context (helps unblock audio)
  useEffect(() => {
    const handleDocumentClick = () => {
      // Create a dummy node and play to unblock the page
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContext) {
          const dummyCtx = new AudioContext();
          if (dummyCtx.state === 'suspended') {
            dummyCtx.resume();
          }
        }
      } catch (e) {}
    };
    window.addEventListener('click', handleDocumentClick);
    return () => window.removeEventListener('click', handleDocumentClick);
  }, []);

  // Periodic Hammer strikes and spark emission
  useEffect(() => {
    const strikeInterval = setInterval(() => {
      // Trigger spark particles
      const newSparks = Array.from({ length: 16 }).map((_, i) => ({
        id: Date.now() + i,
        angle: (Math.random() * Math.PI) - Math.PI / 2, // upper semi-circle
        speed: 80 + Math.random() * 120,
        size: 2 + Math.random() * 4,
      }));
      setSparks(newSparks);
      setSparkCount(prev => prev + 1);

      // Audio forge clink if allowed
      if (!isMutedRef.current) {
        try {
          const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
          if (AudioContext) {
            const ctx = new AudioContext();
            
            // Resume context if suspended (common in browsers)
            if (ctx.state === 'suspended') {
              ctx.resume();
            }

            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.type = 'sine';
            // High-pitch metal clink frequency
            osc.frequency.setValueAtTime(1400, ctx.currentTime);
            osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.15);
            
            gain.gain.setValueAtTime(0.04, ctx.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.18);
            
            osc.connect(gain);
            gain.connect(ctx.destination);
            
            osc.start();
            osc.stop(ctx.currentTime + 0.2);
          }
        } catch (err) {
          // No audio context support or blocked by browser autoplays
        }
      }
    }, 800);

    return () => clearInterval(strikeInterval);
  }, []);

  return (
    <div className="fixed inset-0 bg-stone-950 flex flex-col items-center justify-center z-50 overflow-hidden font-sans select-none">
      
      {/* Absolute top-right Sound Control Button for user interaction */}
      <div className="absolute top-6 right-6 z-50 flex items-center gap-2">
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsSoundMuted(!isSoundMuted);
          }}
          className="px-3 py-1.5 border border-stone-800 hover:border-amber-500 bg-stone-900/80 hover:bg-stone-900 rounded text-stone-400 hover:text-amber-400 cursor-pointer transition-all flex items-center gap-2 text-xs uppercase tracking-wider font-mono"
          title={isSoundMuted ? 'Unlock Forge Sound Effects' : 'Mute Sound Effects'}
        >
          {isSoundMuted ? (
            <>
              <VolumeX className="w-4 h-4" />
              <span>Sound Off</span>
            </>
          ) : (
            <>
              <Volume2 className="w-4 h-4 text-amber-400 animate-pulse" />
              <span className="text-amber-400 font-bold">Sound On</span>
            </>
          )}
        </button>
      </div>

      {/* Background ambient red/orange glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,0.12)_0%,transparent_70%)] pointer-events-none" />
      
      {/* Tiny rising embers in the background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute bottom-0 w-1.5 h-1.5 bg-amber-500 rounded-full"
            style={{
              left: `${15 + i * 7}%`,
              opacity: 0.3 + Math.random() * 0.5,
            }}
            animate={{
              y: -window.innerHeight - 50,
              x: [0, (Math.random() - 0.5) * 60, 0],
            }}
            transition={{
              duration: 4 + Math.random() * 4,
              repeat: Infinity,
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="w-full max-w-lg px-6 flex flex-col items-center text-center relative">
        
        {/* The Forge Chamber */}
        <div className="relative w-72 h-72 flex items-center justify-center mb-8">
          
          {/* Animated Furnace Fire Glow Behind */}
          <motion.div
            className="absolute w-44 h-44 rounded-full bg-orange-600/30 blur-2xl filter"
            animate={{
              scale: [1, 1.2, 0.9, 1.1, 1],
              opacity: [0.6, 0.8, 0.5, 0.7, 0.6],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Styled Stone Fireplace / Forge Oven Frame */}
          <div className="absolute inset-0 border-4 border-stone-800 rounded-full flex items-center justify-center bg-stone-900/60 shadow-[0_0_50px_rgba(249,115,22,0.15),inset_0_0_40px_rgba(249,115,22,0.25)]">
            <div className="absolute bottom-0 w-36 h-20 bg-stone-950 rounded-t-full border-t border-stone-800/80 shadow-[inset_0_4px_20px_rgba(239,68,68,0.4)] flex items-end justify-center pb-2">
              <Flame className="w-8 h-8 text-orange-500 animate-pulse" />
            </div>
          </div>

          {/* Anvil & The Sword being forged */}
          <div className="absolute z-10 bottom-12 flex flex-col items-center">
            
            {/* The glowing red sword of code */}
            <div className="relative w-4 h-32 flex items-center justify-center">
              
              {/* Sword hilt (hilt remains dark iron) */}
              <div className="absolute bottom-0 w-6 h-1 bg-stone-700 rounded-sm" />
              <div className="absolute bottom-1 w-1.5 h-6 bg-stone-700 rounded-sm" />

              {/* Sword blade (glowing fiery orange-red steel) */}
              <motion.div
                className="absolute bottom-7 w-2 h-20 rounded-t-sm shadow-[0_0_15px_#f97316]"
                style={{
                  background: 'linear-gradient(to top, #ef4444 0%, #f97316 70%, #ffedd5 100%)',
                }}
                animate={{
                  boxShadow: [
                    '0 0 10px rgba(249,115,22,0.8)',
                    '0 0 25px rgba(249,115,22,1)',
                    '0 0 10px rgba(249,115,22,0.8)'
                  ]
                }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </div>

            {/* Heavy Iron Anvil Block */}
            <div className="w-24 h-8 bg-gradient-to-b from-stone-700 to-stone-900 border border-stone-600 rounded-sm relative flex flex-col justify-center items-center shadow-[0_4px_10px_rgba(0,0,0,0.5)]">
              <span className="font-mono text-[8px] text-stone-500 uppercase tracking-widest font-bold">SAURABH</span>
              {/* Anvil Horn / Spike */}
              <div className="absolute -left-3 top-0 w-4 h-4 bg-stone-700 rounded-bl-full border-l border-b border-stone-600" />
            </div>
          </div>

          {/* The Falling Forging Hammer */}
          <motion.div
            className="absolute z-20 left-[calc(50%-1.25rem)] top-12 text-amber-500 origin-bottom-right"
            key={sparkCount} // triggers keyframes on every strike
            initial={{ rotate: -40, y: -25, x: -10 }}
            animate={{
              rotate: [-40, 15, -40],
              y: [-25, 35, -25],
              x: [-10, -15, -10],
            }}
            transition={{
              duration: 0.8,
              times: [0, 0.45, 1],
              ease: "easeInOut"
            }}
          >
            <Hammer className="w-10 h-10 filter drop-shadow-[0_0_8px_rgba(245,158,11,0.6)]" />
          </motion.div>

          {/* Flying sparks shooting out from anvil point */}
          <AnimatePresence>
            {sparks.map((spark) => {
              const xTarget = Math.sin(spark.angle) * spark.speed;
              const yTarget = -Math.cos(spark.angle) * spark.speed; // shoot upwards mostly

              return (
                <motion.div
                  key={spark.id}
                  className="absolute bottom-20 left-1/2 rounded-full bg-amber-400"
                  style={{
                    width: spark.size,
                    height: spark.size,
                    boxShadow: '0 0 8px #f59e0b',
                  }}
                  initial={{ x: 0, y: 0, opacity: 1 }}
                  animate={{
                    x: xTarget,
                    y: yTarget,
                    opacity: 0,
                    scale: 0.2,
                  }}
                  transition={{
                    duration: 0.6,
                    ease: "easeOut"
                  }}
                />
              );
            })}
          </AnimatePresence>
        </div>

        {/* Brand Header */}
        <h2 className="font-display text-2xl tracking-[0.25em] text-stone-100 uppercase font-bold mb-1">
          CITADEL FORGE
        </h2>
        <p className="font-mono text-[10px] text-stone-500 uppercase tracking-[0.4em] mb-8">
          SYSTEM SMITHING CO.
        </p>

        {/* Medieval Progress Bar */}
        <div className="w-full h-3 bg-stone-900 border border-stone-800 rounded-full p-[2px] overflow-hidden relative shadow-[inset_0_2px_4px_rgba(0,0,0,0.6)]">
          <motion.div
            className="h-full rounded-full shadow-[0_0_12px_rgba(249,115,22,0.8)]"
            style={{
              width: `${progress}%`,
              background: 'linear-gradient(to right, #ea580c 0%, #f97316 50%, #facc15 100%)'
            }}
            layoutId="forge-loading-bar"
          />
        </div>

        {/* Forge loading progress text & description */}
        <div className="mt-4 flex flex-col items-center">
          <span className="font-display text-lg text-amber-500 font-bold tracking-widest">
            {progress}%
          </span>
          <AnimatePresence mode="wait">
            <motion.p
              key={statusText}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.2 }}
              className="font-mono text-xs text-stone-400 mt-2 uppercase tracking-widest max-w-xs leading-relaxed"
            >
              {statusText}
            </motion.p>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};
