import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Snowflake, ShieldAlert } from 'lucide-react';

interface TheWallTransitionProps {
  isSoundMuted: boolean;
  onComplete: () => void;
  onClose: () => void;
}

export const TheWallTransition: React.FC<TheWallTransitionProps> = ({
  isSoundMuted,
  onComplete,
  onClose,
}) => {
  const [gateState, setGateState] = useState<'approaching' | 'opening' | 'passing' | 'done'>('approaching');
  const [screenShake, setScreenShake] = useState(false);

  useEffect(() => {
    // Phase 1: Approaching the Wall
    const soundTimer = setTimeout(() => {
      playGateRumble();
    }, 1200);

    // Phase 2: Gates start opening
    const openingTimer = setTimeout(() => {
      setGateState('opening');
      setScreenShake(true);
    }, 1500);

    // Stop shaking after a while
    const stopShakeTimer = setTimeout(() => {
      setScreenShake(false);
    }, 3800);

    // Phase 3: Passing through the gates
    const passingTimer = setTimeout(() => {
      setGateState('passing');
    }, 3800);

    // Phase 4: Trigger the winter state swap exactly when screen is fully white/icy-blue
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 4500);

    // Phase 5: Fade out the entire transition
    const doneTimer = setTimeout(() => {
      setGateState('done');
      onClose();
    }, 5500);

    return () => {
      clearTimeout(soundTimer);
      clearTimeout(openingTimer);
      clearTimeout(stopShakeTimer);
      clearTimeout(passingTimer);
      clearTimeout(completeTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  const playGateRumble = () => {
    if (isSoundMuted) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContext();
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      // 1. Deep rumble - Dual low oscillators for beating effect
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const rumbleGain = ctx.createGain();
      const rumbleFilter = ctx.createBiquadFilter();

      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(45, ctx.currentTime);
      osc1.frequency.linearRampToValueAtTime(38, ctx.currentTime + 3.0);

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(47, ctx.currentTime);
      osc2.frequency.linearRampToValueAtTime(39, ctx.currentTime + 3.0);

      rumbleFilter.type = 'lowpass';
      rumbleFilter.frequency.setValueAtTime(90, ctx.currentTime);
      rumbleFilter.frequency.linearRampToValueAtTime(140, ctx.currentTime + 1.5);
      rumbleFilter.frequency.exponentialRampToValueAtTime(40, ctx.currentTime + 3.0);

      rumbleGain.gain.setValueAtTime(0.01, ctx.currentTime);
      rumbleGain.gain.linearRampToValueAtTime(0.28, ctx.currentTime + 0.8);
      rumbleGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.5);

      osc1.connect(rumbleFilter);
      osc2.connect(rumbleFilter);
      rumbleFilter.connect(rumbleGain);
      rumbleGain.connect(ctx.destination);

      osc1.start();
      osc2.start();
      osc1.stop(ctx.currentTime + 3.6);
      osc2.stop(ctx.currentTime + 3.6);

      // 2. Grinding metal / Stone scrapings
      const grindOsc = ctx.createOscillator();
      const grindFilter = ctx.createBiquadFilter();
      const grindGain = ctx.createGain();

      grindOsc.type = 'square';
      grindOsc.frequency.setValueAtTime(80, ctx.currentTime);
      // frequency wobble to simulate grinding irregularities
      for (let i = 0; i < 20; i++) {
        grindOsc.frequency.setValueAtTime(75 + Math.random() * 25, ctx.currentTime + i * 0.15);
      }

      grindFilter.type = 'bandpass';
      grindFilter.Q.setValueAtTime(5, ctx.currentTime);
      grindFilter.frequency.setValueAtTime(220, ctx.currentTime);
      grindFilter.frequency.linearRampToValueAtTime(380, ctx.currentTime + 2.5);

      grindGain.gain.setValueAtTime(0.001, ctx.currentTime);
      grindGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.5);
      grindGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 3.2);

      grindOsc.connect(grindFilter);
      grindFilter.connect(grindGain);
      grindGain.connect(ctx.destination);

      grindOsc.start();
      grindOsc.stop(ctx.currentTime + 3.3);

      // 3. Ice snaps and cracks
      for (let i = 0; i < 8; i++) {
        const time = ctx.currentTime + i * 0.4 + Math.random() * 0.2;
        const snapOsc = ctx.createOscillator();
        const snapGain = ctx.createGain();
        const snapFilter = ctx.createBiquadFilter();

        snapOsc.type = 'triangle';
        snapOsc.frequency.setValueAtTime(1200 + Math.random() * 800, time);
        snapOsc.frequency.exponentialRampToValueAtTime(300, time + 0.12);

        snapFilter.type = 'highpass';
        snapFilter.frequency.setValueAtTime(600, time);

        snapGain.gain.setValueAtTime(0.15, time);
        snapGain.gain.exponentialRampToValueAtTime(0.001, time + 0.15);

        snapOsc.connect(snapFilter);
        snapFilter.connect(snapGain);
        snapGain.connect(ctx.destination);

        snapOsc.start(time);
        snapOsc.stop(time + 0.16);
      }
    } catch (err) {
      console.warn('Failed to play custom gate rumble audio:', err);
    }
  };

  return (
    <AnimatePresence>
      {gateState !== 'done' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className={`fixed inset-0 z-[120] bg-slate-950 flex items-center justify-center overflow-hidden pointer-events-auto ${
            screenShake ? 'animate-wiggle' : ''
          }`}
        >
          {/* Icy Blizzard Background visible when Gates open */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#081e2e_0%,_#020617_100%)]">
            {/* Swirling frost mist */}
            <div className="absolute inset-0 opacity-40 bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.015%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22 opacity=%220.15%22/%3E%3C/svg%3E')] mix-blend-color-dodge animate-pulse" />
            
            {/* Blinding light behind the gate */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[120vw] h-[60vh] bg-cyan-400/20 blur-[140px] rounded-full animate-pulse" />
              <div className="w-[80vw] h-[40vh] bg-white/10 blur-[100px] rounded-full" />
            </div>
          </div>

          {/* THE WALL structure (Left Half) */}
          <motion.div
            initial={{ x: 0 }}
            animate={gateState === 'opening' || gateState === 'passing' ? { x: '-60%' } : { x: 0 }}
            transition={{ duration: 2.8, ease: [0.76, 0, 0.24, 1] }}
            className="absolute left-0 top-0 bottom-0 w-[50.2%] bg-stone-900 border-r-4 border-cyan-500/30 overflow-hidden shadow-[20px_0_40px_rgba(0,0,0,0.8)] z-10"
            style={{
              backgroundImage: 'radial-gradient(circle at 100% 50%, #111e29 0%, #060b10 100%)',
            }}
          >
            {/* Ice Block Textures & Highlights */}
            <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 400 400%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.05%22 numOctaves=%222%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />
            
            {/* Giant Frozen Slabs Blocks */}
            <div className="absolute inset-0 flex flex-col justify-between p-6 opacity-35">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="h-[12vh] border-b border-cyan-800/20 flex gap-4">
                  <div className="w-1/3 border-r border-cyan-800/10" />
                  <div className="w-1/2 border-r border-cyan-800/15" />
                </div>
              ))}
            </div>

            {/* Glowing Rune Frost carving */}
            <div className="absolute right-12 top-1/4 transform -translate-y-1/2 text-cyan-400/20 font-mono text-[9px] uppercase tracking-[0.4em] [writing-mode:vertical-lr] select-none select-none">
              ⚔ THE SHIELD THAT GUARDS THE REALMS OF SAURABH ⚔
            </div>

            {/* Giant Left Gate Door */}
            <motion.div 
              initial={{ rotateY: 0 }}
              animate={gateState === 'opening' || gateState === 'passing' ? { rotateY: -75, originX: 0, x: -50 } : { rotateY: 0 }}
              transition={{ duration: 3.2, ease: [0.76, 0, 0.24, 1] }}
              className="absolute right-0 top-[20%] bottom-[20%] w-[120px] bg-stone-950 border-2 border-stone-800 rounded-l-md flex flex-col justify-between p-4 shadow-[inset_-10px_0_20px_rgba(0,0,0,0.9)]"
            >
              <div className="w-full h-8 border-b-2 border-stone-800 flex justify-center items-center"><div className="w-3 h-3 rounded-full bg-cyan-900/40 border border-cyan-500/20" /></div>
              <div className="w-full h-1/2 border-y-2 border-stone-800/50 flex flex-col justify-around py-4">
                <div className="h-0.5 bg-cyan-950/80 w-full" />
                <div className="h-0.5 bg-cyan-950/80 w-full" />
                <div className="h-0.5 bg-cyan-950/80 w-full" />
              </div>
              <div className="w-full h-8 border-t-2 border-stone-800 flex justify-center items-center"><div className="w-3 h-3 rounded-full bg-cyan-900/40 border border-cyan-500/20" /></div>
            </motion.div>
          </motion.div>

          {/* THE WALL structure (Right Half) */}
          <motion.div
            initial={{ x: 0 }}
            animate={gateState === 'opening' || gateState === 'passing' ? { x: '60%' } : { x: 0 }}
            transition={{ duration: 2.8, ease: [0.76, 0, 0.24, 1] }}
            className="absolute right-0 top-0 bottom-0 w-[50.2%] bg-stone-900 border-l-4 border-cyan-500/30 overflow-hidden shadow-[-20px_0_40px_rgba(0,0,0,0.8)] z-10"
            style={{
              backgroundImage: 'radial-gradient(circle at 0% 50%, #111e29 0%, #060b10 100%)',
            }}
          >
            {/* Ice Block Textures */}
            <div className="absolute inset-0 opacity-30 mix-blend-overlay bg-[url('data:image/svg+xml,%3Csvg viewBox=%220 0 400 400%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noise%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.05%22 numOctaves=%222%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noise)%22/%3E%3C/svg%3E')]" />
            
            {/* Giant Frozen Slabs Blocks */}
            <div className="absolute inset-0 flex flex-col justify-between p-6 opacity-35">
              {Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="h-[12vh] border-b border-cyan-800/20 flex gap-4">
                  <div className="w-1/2 border-r border-cyan-800/15" />
                  <div className="w-1/3 border-r border-cyan-800/10" />
                </div>
              ))}
            </div>

            {/* Glowing Rune Frost carving */}
            <div className="absolute left-12 top-1/4 transform -translate-y-1/2 text-cyan-400/20 font-mono text-[9px] uppercase tracking-[0.4em] [writing-mode:vertical-lr] select-none">
              ❄ WINTER IS HERE • WATCHERS ON THE WALL ❄
            </div>

            {/* Giant Right Gate Door */}
            <motion.div 
              initial={{ rotateY: 0 }}
              animate={gateState === 'opening' || gateState === 'passing' ? { rotateY: 75, originX: '100%', x: 50 } : { rotateY: 0 }}
              transition={{ duration: 3.2, ease: [0.76, 0, 0.24, 1] }}
              className="absolute left-0 top-[20%] bottom-[20%] w-[120px] bg-stone-950 border-2 border-stone-800 rounded-r-md flex flex-col justify-between p-4 shadow-[inset_10px_0_20px_rgba(0,0,0,0.9)]"
            >
              <div className="w-full h-8 border-b-2 border-stone-800 flex justify-center items-center"><div className="w-3 h-3 rounded-full bg-cyan-900/40 border border-cyan-500/20" /></div>
              <div className="w-full h-1/2 border-y-2 border-stone-800/50 flex flex-col justify-around py-4">
                <div className="h-0.5 bg-cyan-950/80 w-full" />
                <div className="h-0.5 bg-cyan-950/80 w-full" />
                <div className="h-0.5 bg-cyan-950/80 w-full" />
              </div>
              <div className="w-full h-8 border-t-2 border-stone-800 flex justify-center items-center"><div className="w-3 h-3 rounded-full bg-cyan-900/40 border border-cyan-500/20" /></div>
            </motion.div>
          </motion.div>

          {/* Archway Frame that stays fixed over the wall halves */}
          <div className="absolute top-[20%] bottom-[20%] w-[250px] border-x-8 border-t-8 border-stone-800/80 pointer-events-none z-20 rounded-t-md flex items-start justify-center">
            {/* Ice Hanging icicles vector graphic decoration */}
            <div className="absolute -top-1 w-full flex justify-around opacity-75">
              <div className="w-2 h-10 bg-gradient-to-b from-cyan-300/40 to-transparent clip-icicle" />
              <div className="w-3 h-14 bg-gradient-to-b from-cyan-200/50 to-transparent clip-icicle" />
              <div className="w-2.5 h-12 bg-gradient-to-b from-cyan-300/40 to-transparent clip-icicle" />
              <div className="w-2 h-16 bg-gradient-to-b from-cyan-200/50 to-transparent clip-icicle" />
              <div className="w-3 h-8 bg-gradient-to-b from-cyan-300/40 to-transparent clip-icicle" />
            </div>
          </div>

          {/* Cinematic Cinematic Text overlay */}
          <div className="absolute inset-x-0 bottom-20 z-30 flex flex-col items-center justify-center pointer-events-none select-none text-center px-6">
            <AnimatePresence mode="wait">
              {gateState === 'approaching' && (
                <motion.div
                  key="approaching"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-2"
                >
                  <div className="flex justify-center mb-1">
                    <ShieldAlert className="w-8 h-8 text-cyan-500 animate-pulse" />
                  </div>
                  <h2 className="font-decorative text-xl md:text-3xl tracking-[0.25em] text-cyan-100 uppercase">
                    Approaching The Wall
                  </h2>
                  <p className="font-mono text-[9px] uppercase tracking-[0.4em] text-cyan-400/70">
                    The Great Shield of the Realms of Men
                  </p>
                </motion.div>
              )}

              {gateState === 'opening' && (
                <motion.div
                  key="opening"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.1 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-1"
                >
                  <h2 className="font-decorative text-2xl md:text-4xl tracking-[0.3em] text-white uppercase animate-pulse">
                    The Gates Part
                  </h2>
                  <p className="font-mono text-xs text-cyan-400 italic">
                    A deep rumbling shakes the foundation of ice...
                  </p>
                </motion.div>
              )}

              {gateState === 'passing' && (
                <motion.div
                  key="passing"
                  initial={{ opacity: 0, scale: 1.2 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6 }}
                  className="space-y-2"
                >
                  <div className="flex justify-center">
                    <Snowflake className="w-10 h-10 text-white animate-spin-slow" />
                  </div>
                  <h2 className="font-decorative text-3xl md:text-5xl tracking-[0.35em] text-white uppercase font-bold text-glow-cyan">
                    Entering The Cold Beyond
                  </h2>
                  <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-cyan-200">
                    Winter is Here
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Full Screen Cinematic Bright Zoom Transition Effect at the very end */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={gateState === 'passing' ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeIn' }}
            className="absolute inset-0 bg-gradient-to-b from-cyan-900 via-sky-950 to-slate-950 pointer-events-none z-[110] flex items-center justify-center"
          >
            {/* Exploding Frost Snowflake Ring effect */}
            {gateState === 'passing' && (
              <motion.div
                initial={{ scale: 0, opacity: 1 }}
                animate={{ scale: 2.5, opacity: 0 }}
                transition={{ duration: 1.8, ease: 'easeOut' }}
                className="w-96 h-96 rounded-full border border-cyan-200/40 flex items-center justify-center"
              >
                <div className="w-48 h-48 rounded-full border border-cyan-400/30" />
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
