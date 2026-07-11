import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface MeltWinterTransitionProps {
  isSoundMuted: boolean;
  onComplete: () => void;
  onClose: () => void;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  color: string;
  decay: number;
  wigbleSpeed: number;
  wiggleScale: number;
  phase: number;
  type: 'spark' | 'ember' | 'ash';
}

export const MeltWinterTransition: React.FC<MeltWinterTransitionProps> = ({
  isSoundMuted,
  onComplete,
  onClose,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [phase, setPhase] = useState<'igniting' | 'sweeping' | 'cooling' | 'done'>('igniting');
  
  // Animation state for SVG Heat Distortion filter
  const [distortionScale, setDistortionScale] = useState(0);
  const [distortionFreq, setDistortionFreq] = useState(0.015);

  useEffect(() => {
    // Stage timings
    // 1. Heat begins: 0s - 0.5s (Igniting)
    // 2. Heavy sweep: 0.5s - 1.8s (Sweeping) -> Trigger state change at 1.3s
    // 3. Cooling down: 1.8s - 2.8s (Cooling)
    // 4. Closed: 2.8s (Done)

    let startTime = Date.now();
    let animationFrameId: number;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Handle high-DPI displays
    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle manager
    const particles: Particle[] = [];
    const maxParticles = 180;

    const spawnParticle = (yPos: number, isInitialBurst = false) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const x = Math.random() * w;
      
      const typeRand = Math.random();
      let type: 'spark' | 'ember' | 'ash' = 'spark';
      let color = '#f97316'; // Orange
      let size = Math.random() * 3 + 1.5;
      let vy = -(Math.random() * 4 + 3);
      let vx = (Math.random() * 2 - 1);
      let decay = Math.random() * 0.015 + 0.008;

      if (typeRand > 0.75) {
        type = 'ember';
        color = '#ef4444'; // Red
        size = Math.random() * 5 + 3;
        vy = -(Math.random() * 2 + 1.5);
        decay = Math.random() * 0.008 + 0.005;
      } else if (typeRand > 0.55) {
        type = 'ash';
        color = '#78716c'; // Stone/Gray
        size = Math.random() * 4 + 2;
        vy = -(Math.random() * 1.2 + 0.8);
        decay = Math.random() * 0.01 + 0.005;
      }

      if (isInitialBurst) {
        vy *= 1.8;
        size *= 1.3;
      }

      particles.push({
        x,
        y: yPos,
        vx,
        vy,
        size,
        alpha: 1,
        color,
        decay,
        wigbleSpeed: Math.random() * 0.08 + 0.02,
        wiggleScale: Math.random() * 1.5 + 0.5,
        phase: Math.random() * Math.PI * 2,
        type,
      });
    };

    // Pre-populate particles for immediate action
    for (let i = 0; i < 40; i++) {
      spawnParticle(window.innerHeight * Math.random(), true);
    }

    // Audio-visual synchronized state loop
    const tick = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const w = window.innerWidth;
      const h = window.innerHeight;

      // Animate heat distortion values smoothly over time
      if (elapsed < 0.6) {
        setPhase('igniting');
        // Distortion starts growing
        setDistortionScale(elapsed * 120); // up to 72
        setDistortionFreq(0.01 + elapsed * 0.015);
      } else if (elapsed < 1.8) {
        setPhase('sweeping');
        // Distortion peaks and oscillates intensely
        setDistortionScale(72 + Math.sin(elapsed * 25) * 15);
        setDistortionFreq(0.025 + Math.cos(elapsed * 12) * 0.005);
      } else if (elapsed < 2.8) {
        setPhase('cooling');
        // Dissipating
        const coolingRatio = (2.8 - elapsed) / 1.0;
        setDistortionScale(72 * coolingRatio);
        setDistortionFreq(0.01 + 0.015 * coolingRatio);
      } else {
        setPhase('done');
      }

      // Clear Canvas
      ctx.clearRect(0, 0, w, h);

      // Spawn new fire particles according to active phases
      const spawnRate = phase === 'sweeping' ? 6 : phase === 'igniting' ? 3 : 1;
      if (particles.length < maxParticles && phase !== 'done') {
        for (let s = 0; s < spawnRate; s++) {
          // Fire originates from bottom during sweep, or scattered bursts
          const spawnY = h + 10;
          spawnParticle(spawnY);
        }
      }

      // Particle update and drawing
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.alpha -= p.decay;
        
        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        // Apply wind shear and wiggle wave movement
        p.phase += p.wigbleSpeed;
        p.x += p.vx + Math.sin(p.phase) * p.wiggleScale;
        p.y += p.vy;

        ctx.save();
        ctx.globalAlpha = p.alpha;
        
        if (p.type === 'spark') {
          // Sparkling glows
          const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 2.5);
          gradient.addColorStop(0, '#fffbeb'); // White core
          gradient.addColorStop(0.3, '#fbbf24'); // Yellow glow
          gradient.addColorStop(1, 'rgba(249, 115, 22, 0)'); // Transparent orange edge
          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
          ctx.fill();
        } else if (p.type === 'ember') {
          // Red glowing embers
          ctx.shadowBlur = 8;
          ctx.shadowColor = '#ef4444';
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Floating ash flakes
          ctx.fillStyle = p.color;
          ctx.beginPath();
          // Draw irregular ash triangles/quads
          const r = p.size;
          ctx.moveTo(p.x, p.y - r);
          ctx.lineTo(p.x + r * 0.8, p.y + r * 0.5);
          ctx.lineTo(p.x - r * 0.5, p.y + r * 0.8);
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      }

      if (phase !== 'done') {
        animationFrameId = requestAnimationFrame(tick);
      }
    };

    tick();

    // Setup sequence timers for state swapping
    const completeTimer = setTimeout(() => {
      onComplete();
    }, 1300); // Trigger mid-sweep exactly

    const closeTimer = setTimeout(() => {
      onClose();
    }, 2850);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
      clearTimeout(completeTimer);
      clearTimeout(closeTimer);
    };
  }, []);

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          className="fixed inset-0 z-[110] overflow-hidden pointer-events-none"
        >
          {/* SVG Heat Distortion filter targeting the main body container during melting */}
          <svg className="absolute w-0 h-0">
            <defs>
              <filter id="melt-heat-distortion">
                <feTurbulence
                  type="fractalNoise"
                  baseFrequency={`${distortionFreq} ${distortionFreq * 1.5}`}
                  numOctaves="3"
                  result="noise"
                />
                <feDisplacementMap
                  in="SourceGraphic"
                  in2="noise"
                  scale={distortionScale}
                  xChannelSelector="R"
                  yChannelSelector="G"
                />
              </filter>
            </defs>
          </svg>

          {/* Connect the filter to the viewport backing to ripple everything */}
          <div 
            className="absolute inset-0 bg-stone-950/10 pointer-events-none"
            style={{
              filter: distortionScale > 2 ? 'url(#melt-heat-distortion)' : 'none',
              backdropFilter: `blur(${Math.min(10, distortionScale / 6)}px)`
            }}
          />

          {/* Cinematic Dragon Fire Breath Sweep (Diagonal Beam Ignition) */}
          <motion.div
            initial={{ x: '-100%', y: '-20%', skewX: -35 }}
            animate={{ x: ['-100%', '130%'], y: ['-20%', '80%'] }}
            transition={{ duration: 1.4, ease: 'easeIn' }}
            className="absolute top-0 left-0 w-[40vw] h-[150vh] bg-gradient-to-r from-transparent via-white to-amber-300 opacity-90 blur-md mix-blend-screen shadow-[0_0_80px_rgba(253,224,71,0.8)] z-40"
          />

          {/* Screen Heat Glow Thermal Burn Wave */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.45, 0.9, 0],
              backgroundColor: ['rgba(239, 68, 68, 0)', 'rgba(239, 68, 68, 0.25)', 'rgba(251, 146, 60, 0.35)', 'rgba(239, 68, 68, 0)']
            }}
            transition={{ duration: 2.7, ease: 'easeInOut' }}
            className="absolute inset-0 z-10"
          />

          {/* Edge Scorching Vignette */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.8, 0.95, 0] }}
            transition={{ duration: 2.7, ease: 'easeInOut' }}
            className="absolute inset-0 z-20 pointer-events-none"
            style={{
              background: 'radial-gradient(circle at center, transparent 30%, rgba(20, 10, 5, 0.8) 75%, rgba(0, 0, 0, 0.98) 100%)',
              mixBlendMode: 'multiply'
            }}
          />

          {/* High Performance Fire Particles Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full z-30 mix-blend-screen"
          />

          {/* Layered Fluid SVG Flame Wave 1 (Base - Rich Crimson Fire) */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: ['100%', '-5%', '-115%'] }}
            transition={{ duration: 2.3, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-x-0 bottom-0 h-[130%] bg-gradient-to-t from-stone-950 via-red-800 to-orange-500 z-25"
            style={{
              clipPath: 'polygon(0% 100%, 0% 15%, 5% 7%, 10% 20%, 15% 10%, 20% 18%, 25% 6%, 30% 22%, 35% 8%, 40% 17%, 45% 9%, 50% 19%, 55% 5%, 60% 21%, 65% 11%, 70% 16%, 75% 7%, 80% 20%, 85% 8%, 90% 18%, 95% 6%, 100% 15%, 100% 100%)',
              filter: 'drop-shadow(0 -15px 30px rgba(185, 28, 28, 0.85))'
            }}
          >
            {/* Swirling Lava Overlay Pattern */}
            <div className="absolute inset-0 opacity-40 bg-[radial-gradient(circle_at_center,_#b91c1c_0%,_transparent_70%)] animate-pulse" />
          </motion.div>

          {/* Layered Fluid SVG Flame Wave 2 (Mid - Golden Yellow Sparks) */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: ['100%', '0%', '-115%'] }}
            transition={{ duration: 2.1, delay: 0.08, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-x-0 bottom-0 h-[130%] bg-gradient-to-t from-orange-700 via-amber-500 to-yellow-300 z-26 mix-blend-screen"
            style={{
              clipPath: 'polygon(0% 100%, 0% 20%, 6% 12%, 12% 25%, 18% 14%, 24% 22%, 30% 9%, 36% 23%, 42% 15%, 48% 21%, 54% 11%, 60% 24%, 66% 16%, 72% 21%, 78% 10%, 84% 25%, 90% 13%, 96% 22%, 100% 15%, 100% 100%)',
              filter: 'drop-shadow(0 -20px 40px rgba(245, 158, 11, 0.9))'
            }}
          />

          {/* Layered Fluid SVG Flame Wave 3 (Core - White Hot Energy) */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: ['100%', '5%', '-115%'] }}
            transition={{ duration: 1.9, delay: 0.16, ease: [0.76, 0, 0.24, 1] }}
            className="absolute inset-x-0 bottom-0 h-[130%] bg-gradient-to-t from-amber-500 via-yellow-200 to-white z-27 mix-blend-screen"
            style={{
              clipPath: 'polygon(0% 100%, 0% 25%, 8% 18%, 16% 28%, 24% 19%, 32% 26%, 40% 14%, 48% 25%, 56% 18%, 64% 27%, 72% 16%, 80% 28%, 88% 17%, 96% 24%, 100% 20%, 100% 100%)',
              filter: 'drop-shadow(0 -25px 45px rgba(253, 224, 71, 0.95))'
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
