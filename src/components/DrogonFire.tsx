import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { HouseType } from '../types';
import { HOUSES } from '../data';
import { Sparkles, Flame, Volume2, VolumeX, ShieldAlert } from 'lucide-react';

interface DrogonFireProps {
  activeHouse: HouseType;
  isSoundMuted: boolean;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  maxSize: number;
  alpha: number;
  life: number;
  maxLife: number;
  hue: number;
  saturation: number;
  lightness: number;
  type: 'flame' | 'spark' | 'smoke';
}

export const DrogonFire: React.FC<DrogonFireProps> = ({ activeHouse, isSoundMuted }) => {
  const [isBreathingFire, setIsBreathingFire] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouthCoordsRef = useRef({ x: 0, y: 0 });

  const houseInfo = HOUSES.find((h) => h.id === activeHouse) || HOUSES[0];

  // Map houses to dragon elements
  const dragonTheme = {
    targaryen: {
      name: 'Drogon',
      species: 'Targaryen Red-Fire Drake',
      scaleColor: '#121212',
      bellyColor: '#1e0a0a',
      wingColor: '#7f1d1d',
      eyeColor: '#ef4444',
      glowColor: '#ef4444',
      flameHue: 18, // Warm Orange/Red
      flameSat: 100,
      description: 'Breeds raging wildfire. Fire is red and gold.'
    },
    stark: {
      name: 'Viserion',
      species: 'Stark Frost Wyrm',
      scaleColor: '#334155',
      bellyColor: '#1e293b',
      wingColor: '#0f172a',
      eyeColor: '#06b6d4',
      glowColor: '#06b6d4',
      flameHue: 195, // Cyan/Ice Blue
      flameSat: 90,
      description: 'Breeds absolute-zero ice flames. Cold and crystalline.'
    },
    lannister: {
      name: 'Syrax',
      species: 'Lannister Golden Drake',
      scaleColor: '#78350f',
      bellyColor: '#451a03',
      wingColor: '#b91c1c',
      eyeColor: '#eab308',
      glowColor: '#fbbf24',
      flameHue: 44, // Golden yellow
      flameSat: 100,
      description: 'Breeds gold-gilded solar flames.'
    },
    nightswatch: {
      name: 'Shadowfax',
      species: 'Night\'s Watch Obsidian Dragon',
      scaleColor: '#030712',
      bellyColor: '#111827',
      wingColor: '#1f2937',
      eyeColor: '#a855f7',
      glowColor: '#c084fc',
      flameHue: 275, // Obsidian Purple
      flameSat: 95,
      description: 'Breeds dark void shadow flames.'
    }
  }[activeHouse] || {
    name: 'Drogon',
    species: 'Dragon',
    scaleColor: '#1c1917',
    bellyColor: '#292524',
    wingColor: '#78716c',
    eyeColor: '#f97316',
    glowColor: '#f97316',
    flameHue: 18,
    flameSat: 100,
    description: 'Breeds dragon fire'
  };

  // Sound synthesis for Dragon Roar
  const playRoarSound = () => {
    if (isSoundMuted) return;
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (!AudioContext) return;
      const ctx = new AudioContext();

      // We synthesis low frequency rumble + bandpass filtered brown noise for fiery breath
      const bufferSize = ctx.sampleRate * 2; // 2 seconds
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const data = buffer.getChannelData(0);

      // Generate brown noise
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        data[i] = (lastOut + (0.02 * white)) / 1.02;
        lastOut = data[i];
        data[i] *= 3.5; // Compensate for loss
      }

      // Fire breathing noise source
      const noiseNode = ctx.createBufferSource();
      noiseNode.buffer = buffer;

      // Filter for standard vs ice dragon
      const filter = ctx.createBiquadFilter();
      filter.type = 'bandpass';
      // Ice dragon has slightly higher pitched, wind-like hiss
      filter.frequency.setValueAtTime(activeHouse === 'stark' ? 800 : 350, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(activeHouse === 'stark' ? 1400 : 500, ctx.currentTime + 1.8);
      filter.Q.setValueAtTime(1.5, ctx.currentTime);

      // Low rumble synthesizer
      const rumbleOsc = ctx.createOscillator();
      rumbleOsc.type = 'sawtooth';
      rumbleOsc.frequency.setValueAtTime(55, ctx.currentTime); // A1 rumble
      rumbleOsc.frequency.linearRampToValueAtTime(35, ctx.currentTime + 1.8);

      const rumbleFilter = ctx.createBiquadFilter();
      rumbleFilter.type = 'lowpass';
      rumbleFilter.frequency.setValueAtTime(90, ctx.currentTime);

      const rumbleGain = ctx.createGain();
      rumbleGain.gain.setValueAtTime(0.2, ctx.currentTime);
      rumbleGain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.8);

      // Combined gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.3, ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.9);

      // Connections
      noiseNode.connect(filter);
      filter.connect(masterGain);

      rumbleOsc.connect(rumbleFilter);
      rumbleFilter.connect(rumbleGain);
      rumbleGain.connect(masterGain);

      masterGain.connect(ctx.destination);

      noiseNode.start();
      rumbleOsc.start();

      noiseNode.stop(ctx.currentTime + 2.0);
      rumbleOsc.stop(ctx.currentTime + 2.0);
    } catch (e) {
      console.warn('Web Audio API roar failed to synthesize:', e);
    }
  };

  // Update dragon mouth coordinate based on viewport element
  const updateMouthPosition = () => {
    const triggerEl = document.getElementById('dragon-mouth-pivot');
    if (triggerEl) {
      const rect = triggerEl.getBoundingClientRect();
      mouthCoordsRef.current = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
    } else {
      // Fallback relative to viewport bottom-right
      mouthCoordsRef.current = {
        x: window.innerWidth - 130,
        y: window.innerHeight - 150,
      };
    }
  };

  useEffect(() => {
    updateMouthPosition();
    window.addEventListener('resize', updateMouthPosition);
    window.addEventListener('scroll', updateMouthPosition);
    return () => {
      window.removeEventListener('resize', updateMouthPosition);
      window.removeEventListener('scroll', updateMouthPosition);
    };
  }, [activeHouse]);

  // Command DRACARYS
  const handleDracarys = () => {
    if (isBreathingFire) return;
    setIsBreathingFire(true);
    setClickCount((prev) => prev + 1);
    playRoarSound();
    updateMouthPosition();

    // Trigger local dragon recoil/vibration shaking instead of shaking the entire screen
    const dragonEl = containerRef.current;
    if (dragonEl) {
      dragonEl.classList.add('animate-shake-moderate');
      setTimeout(() => {
        dragonEl.classList.remove('animate-shake-moderate');
      }, 1800);
    }

    // Auto turn off breathing fire after 1.8 seconds
    setTimeout(() => {
      setIsBreathingFire(false);
    }, 1800);
  };

  // Particle Loop setup
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas dimensions
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    const particles = particlesRef.current;

    // Primary Animation Frame Loop
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Create new fire particles if breathing fire
      if (isBreathingFire) {
        updateMouthPosition();
        const emitX = mouthCoordsRef.current.x;
        const emitY = mouthCoordsRef.current.y;

        // Emit multiple types of particles for rich realism
        // Targaryen (Red fire), Stark (blue frost), Lannister (gold sparks), Nightswatch (dark purple magic)
        const density = activeHouse === 'stark' ? 8 : 12;
        for (let i = 0; i < density; i++) {
          // Fire direction: Spews upwards and leftwards away from bottom right
          const angle = Math.PI * 1.1 + (Math.random() * 0.4 - 0.2); // angled left-up
          const speed = Math.random() * 11 + 4;
          
          // Generate customized hue variances based on house
          let customHue = dragonTheme.flameHue + (Math.random() * 24 - 12);
          let customSat = dragonTheme.flameSat;
          let customLightness = 55 + Math.random() * 20;

          // Smoke particles are grey
          const typeRand = Math.random();
          let type: 'flame' | 'spark' | 'smoke' = 'flame';
          let maxLife = Math.random() * 30 + 35;
          let size = Math.random() * 12 + 8;

          if (typeRand < 0.15) {
            type = 'spark';
            size = Math.random() * 3 + 1;
            maxLife = Math.random() * 45 + 40;
          } else if (typeRand > 0.85) {
            type = 'smoke';
            size = Math.random() * 14 + 10;
            maxLife = Math.random() * 40 + 50;
            // Desaturate smoke
            customSat = 5;
            customLightness = 30 + Math.random() * 20;
          }

          particles.push({
            x: emitX + (Math.random() * 10 - 5),
            y: emitY + (Math.random() * 10 - 5),
            vx: Math.cos(angle) * speed,
            vy: Math.sin(angle) * speed - (Math.random() * 2), // upward drift
            size,
            maxSize: size * (type === 'smoke' ? 2.5 : type === 'flame' ? 1.5 : 0.6),
            alpha: 1,
            life: 0,
            maxLife,
            hue: customHue,
            saturation: customSat,
            lightness: customLightness,
            type
          });
        }
      } else if (isHovered && Math.random() < 0.08) {
        // Emit occasional idle smoke puffs from mouth when hovered to feel alive!
        updateMouthPosition();
        const emitX = mouthCoordsRef.current.x;
        const emitY = mouthCoordsRef.current.y;

        particles.push({
          x: emitX,
          y: emitY,
          vx: -(Math.random() * 1.5 + 0.5), // leftwards
          vy: -(Math.random() * 1 + 0.5), // upwards
          size: Math.random() * 3 + 2,
          maxSize: Math.random() * 10 + 7,
          alpha: 0.5,
          life: 0,
          maxLife: Math.random() * 25 + 25,
          hue: dragonTheme.flameHue,
          saturation: 5,
          lightness: 40 + Math.random() * 12,
          type: 'smoke'
        });
      }

      // Update and draw existing particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life++;

        if (p.life >= p.maxLife) {
          particles.splice(i, 1);
          continue;
        }

        // Particle physics
        p.x += p.vx;
        p.y += p.vy;

        // Friction and drift
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.vy -= 0.05; // Hot air buoyancy

        // Scale and opacity interpolation
        const lifeRatio = p.life / p.maxLife;
        p.size = p.size + (p.maxSize - p.size) * 0.04;
        p.alpha = 1 - lifeRatio;

        // Draw particle
        ctx.save();
        ctx.globalAlpha = p.alpha;

        if (p.type === 'flame') {
          // Fire flame glow radial gradient
          const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
          // Transition color based on life
          const currentHue = p.hue;
          // As fire dies, it shifts to darker red/smoke (or dark cyan for stark)
          let hueShift = currentHue;
          if (activeHouse === 'targaryen' && lifeRatio > 0.5) {
            hueShift = Math.max(0, currentHue - (lifeRatio - 0.5) * 40); // Shift orange to pure red
          } else if (activeHouse === 'lannister' && lifeRatio > 0.6) {
            hueShift = Math.max(0, currentHue - 25); // Shift gold to orange-red
          }

          grad.addColorStop(0, `hsla(${hueShift}, ${p.saturation}%, 90%, 1)`);
          grad.addColorStop(0.3, `hsla(${hueShift}, ${p.saturation}%, ${p.lightness}%, 0.8)`);
          grad.addColorStop(0.8, `hsla(${hueShift}, ${p.saturation}%, ${p.lightness - 15}%, 0.3)`);
          grad.addColorStop(1, `hsla(${hueShift}, ${p.saturation}%, 20%, 0)`);

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();

        } else if (p.type === 'spark') {
          // Bright sparkler
          ctx.shadowBlur = 10;
          ctx.shadowColor = `hsl(${p.hue}, ${p.saturation}%, 70%)`;
          ctx.fillStyle = `hsl(${p.hue}, ${p.saturation}%, 95%)`;
          ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);

        } else {
          // Smoke puff
          ctx.fillStyle = `hsla(${p.hue}, ${p.saturation}%, ${p.lightness}%, 0.3)`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      animationFrameId.current = requestAnimationFrame(tick);
    };

    tick();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [isBreathingFire, activeHouse]);

  return (
    <>
      {/* Full screen fixed canvas layer for fire particles */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      />

      {/* Floating Dragon Guardian Panel (Bottom-Right) */}
      <div
        ref={containerRef}
        className="fixed bottom-6 right-6 z-40 flex flex-col items-end"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Help Banner Speech Bubble when hovered */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className="mb-3 bg-stone-950/95 border border-stone-800 rounded-lg p-3 shadow-xl max-w-xs text-right select-none"
            >
              <div className="flex items-center gap-2 justify-end mb-1">
                <span className="font-display text-[10px] uppercase tracking-wider text-stone-400">
                  {dragonTheme.species}
                </span>
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: dragonTheme.glowColor }} />
              </div>
              <h4 className="font-display text-sm font-black uppercase tracking-wide text-stone-100">
                {dragonTheme.name}
              </h4>
              <p className="font-sans text-[11px] text-stone-400 leading-normal mt-1">
                {dragonTheme.description} Click to command wildfire breath!
              </p>
              <div className="mt-2 text-center text-[10px] font-mono text-gold-hover border-t border-stone-800/60 pt-1.5 uppercase tracking-widest animate-pulse flex items-center justify-center gap-1">
                <Flame className="w-3.5 h-3.5" /> Command: DRACARYS
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dragon Mount Widget Button */}
        <div className="relative group">
          
          {/* Pulsing glow under dragon */}
          <div
            className="absolute inset-0 rounded-full blur-2xl opacity-25 group-hover:opacity-50 transition-all duration-500 scale-150"
            style={{
              background: `radial-gradient(circle, ${dragonTheme.glowColor} 0%, transparent 70%)`
            }}
          />

          {/* Real Dragon Figure Perched on a Castle Ledge */}
          <button
            onClick={handleDracarys}
            className="relative w-32 h-32 md:w-36 md:h-36 bg-transparent border-none outline-none focus:outline-none cursor-pointer select-none transition-all duration-300 hover:scale-[1.05] active:scale-95 flex items-center justify-center p-0"
            title={`Saurabh's Guardian Dragon (${dragonTheme.name}) - Click to Breathe Fire`}
            style={{ WebkitTapHighlightColor: 'transparent' }}
          >
            {/* Dynamic Interactive Dragon SVG Graphic */}
            <div className="relative w-full h-full flex items-center justify-center">
              
              {/* Dragon wings flapping loop */}
              <motion.div
                animate={{
                  y: isBreathingFire ? [-1.5, 1.5, -1.5] : [0, -2, 0],
                }}
                transition={{
                  repeat: Infinity,
                  duration: isBreathingFire ? 0.25 : 3,
                  ease: 'easeInOut'
                }}
                className="w-full h-full relative"
              >
                <svg
                  viewBox="0 0 100 100"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-full h-full drop-shadow-[0_10px_15px_rgba(0,0,0,0.85)]"
                >
                  {/* Detailed stone carved pedestal (Dragon Perch Ledge) */}
                  <g className="opacity-95">
                    {/* Pedestal Shadow */}
                    <ellipse cx="50" cy="91" rx="32" ry="4.5" fill="#000000" opacity="0.7" />
                    
                    {/* Gothic Column structure */}
                    <path d="M 22 84 L 78 84 L 74 94 L 26 94 Z" fill="#1c1917" stroke="#0c0a09" strokeWidth="0.8" />
                    <path d="M 18 76 L 82 76 L 78 84 L 22 84 Z" fill="#292524" stroke="#44403c" strokeWidth="0.8" />
                    
                    {/* Stone cracks and texture detail */}
                    <path d="M 32 76 L 34 84 M 64 76 L 61 84 M 48 84 L 50 94" stroke="#0c0a09" strokeWidth="1" opacity="0.6" />
                    <path d="M 21 79 L 28 81 M 72 87 L 76 89" stroke="#0c0a09" strokeWidth="0.8" opacity="0.4" />
                    
                    {/* Tiny wild green moss hanging on the stone */}
                    <path d="M 20 81 Q 23 85 22 89 M 22 85 Q 26 84 25 87" stroke="#15803d" strokeWidth="1" fill="none" strokeLinecap="round" />
                  </g>

                  {/* Right Flapping Wing (Drawn behind the body for depth) */}
                  <motion.g
                    style={{ transformOrigin: '52px 56px' }}
                    animate={{
                      rotate: isBreathingFire ? [12, -22, 12] : isHovered ? [8, -10, 8] : [0, -3, 0],
                      scale: isBreathingFire ? 1.12 : isHovered ? 1.04 : 1
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: isBreathingFire ? 0.2 : isHovered ? 1.5 : 4,
                      ease: 'easeInOut'
                    }}
                  >
                    {/* Wing membrane background */}
                    <path
                      d="M 52 56 
                         C 68 38, 85 32, 94 42 
                         C 98 46, 96 58, 88 66 
                         C 78 72, 64 68, 52 56 Z"
                      fill={dragonTheme.wingColor}
                      opacity="0.8"
                      stroke={dragonTheme.scaleColor}
                      strokeWidth="0.5"
                    />
                    {/* Wing struts / finger bone lines */}
                    <path d="M 52 56 Q 72 35 94 42" stroke={dragonTheme.scaleColor} strokeWidth="2.2" fill="none" strokeLinecap="round" />
                    <path d="M 52 56 Q 78 45 88 66" stroke={dragonTheme.scaleColor} strokeWidth="1.2" fill="none" strokeLinecap="round" />
                    <path d="M 52 56 Q 68 55 76 68" stroke={dragonTheme.scaleColor} strokeWidth="1.0" fill="none" strokeLinecap="round" />
                    {/* Small wing horn claw */}
                    <path d="M 94 42 L 97 39 L 94 38 Z" fill={dragonTheme.scaleColor} />
                  </motion.g>

                  {/* Sinuous Dragon Tail wrapped around the Castle Turret column */}
                  <path
                    d="M 50 72 
                       C 58 76, 76 78, 74 86 
                       C 72 91, 52 93, 34 89
                       C 26 87, 24 81, 30 79"
                    fill="none"
                    stroke={dragonTheme.scaleColor}
                    strokeWidth="5.5"
                    strokeLinecap="round"
                  />
                  {/* Tail spine ridges */}
                  <path d="M 70 78 L 74 76 L 71 81 Z M 64 88 L 66 92 L 60 90 Z" fill={dragonTheme.glowColor} opacity="0.8" />
                  {/* Pointed tail blade / spade */}
                  <path d="M 30 79 L 21 81 L 25 76 Z" fill={dragonTheme.scaleColor} stroke={dragonTheme.bellyColor} strokeWidth="0.5" />
                  <path d="M 25 76 L 21 81 L 23 78 Z" fill={dragonTheme.glowColor} />

                  {/* Left claw clutching the column rim */}
                  <g>
                    <path d="M 36 66 C 30 68, 28 73, 34 76" stroke={dragonTheme.scaleColor} strokeWidth="4.5" strokeLinecap="round" fill="none" />
                    <path d="M 31 76 C 30 77, 30 79, 31 80 M 34 76 C 34 77, 35 79, 34 80 M 37 76 C 38 77, 39 79, 38 80" stroke="#fbbf24" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                  </g>

                  {/* Right claw clutching the column rim */}
                  <g>
                    <path d="M 64 66 C 70 68, 72 73, 66 76" stroke={dragonTheme.scaleColor} strokeWidth="4.5" strokeLinecap="round" fill="none" />
                    <path d="M 63 76 C 62 77, 61 79, 62 80 M 66 76 C 66 77, 67 79, 66 80 M 69 76 C 70 77, 71 79, 70 80" stroke="#fbbf24" strokeWidth="1.2" strokeLinecap="round" fill="none" />
                  </g>

                  {/* Main Dragon Torso Body */}
                  <path
                    d="M 50 74
                       C 40 70, 38 58, 48 52
                       C 52 50, 62 58, 50 74 Z"
                    fill={dragonTheme.scaleColor}
                    stroke={dragonTheme.bellyColor}
                    strokeWidth="0.8"
                  />

                  {/* Segmented Underbelly with ribbed scales */}
                  <g>
                    <path
                      d="M 50 74
                         C 45 70, 44 62, 48 55
                         C 50 54, 55 62, 50 74 Z"
                      fill={dragonTheme.bellyColor}
                    />
                    <path d="M 47 58 Q 50 60 53 58" stroke={dragonTheme.scaleColor} strokeWidth="1" fill="none" opacity="0.5" />
                    <path d="M 46 62 Q 50 64 54 62" stroke={dragonTheme.scaleColor} strokeWidth="1" fill="none" opacity="0.5" />
                    <path d="M 46 66 Q 50 68 54 66" stroke={dragonTheme.scaleColor} strokeWidth="1" fill="none" opacity="0.5" />
                    <path d="M 47 70 Q 50 72 53 70" stroke={dragonTheme.scaleColor} strokeWidth="1" fill="none" opacity="0.5" />
                  </g>

                  {/* Glowing spine plates down body */}
                  <path
                    d="M 50 50 L 48 54 L 52 54 Z M 50 58 L 47 62 L 53 62 Z M 50 66 L 48 70 L 52 70 Z"
                    fill={dragonTheme.glowColor}
                    opacity={isBreathingFire ? "1" : "0.75"}
                    className={isBreathingFire ? "animate-pulse" : ""}
                  />

                  {/* Left Flapping Wing (Drawn on top for 3D overlay) */}
                  <motion.g
                    style={{ transformOrigin: '48px 56px' }}
                    animate={{
                      rotate: isBreathingFire ? [-12, 22, -12] : isHovered ? [-8, 10, -8] : [0, 3, 0],
                      scale: isBreathingFire ? 1.12 : isHovered ? 1.04 : 1
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: isBreathingFire ? 0.2 : isHovered ? 1.5 : 4,
                      ease: 'easeInOut'
                    }}
                  >
                    {/* Wing membrane background */}
                    <path
                      d="M 48 56 
                         C 32 38, 15 32, 6 42 
                         C 2 46, 4 58, 12 66 
                         C 22 72, 36 68, 48 56 Z"
                      fill={dragonTheme.wingColor}
                      opacity="0.8"
                      stroke={dragonTheme.scaleColor}
                      strokeWidth="0.5"
                    />
                    {/* Wing struts / finger bone lines */}
                    <path d="M 48 56 Q 28 35 6 42" stroke={dragonTheme.scaleColor} strokeWidth="2.2" fill="none" strokeLinecap="round" />
                    <path d="M 48 56 Q 22 45 12 66" stroke={dragonTheme.scaleColor} strokeWidth="1.2" fill="none" strokeLinecap="round" />
                    <path d="M 48 56 Q 32 55 24 68" stroke={dragonTheme.scaleColor} strokeWidth="1.0" fill="none" strokeLinecap="round" />
                    {/* Small wing horn claw */}
                    <path d="M 6 42 L 3 39 L 6 38 Z" fill={dragonTheme.scaleColor} />
                  </motion.g>

                  {/* Sinuous Neck & Head (Faced leftward, looking forward) */}
                  <motion.g
                    style={{ transformOrigin: '50px 52px' }}
                    animate={{
                      y: isBreathingFire ? [-1.5, 1, -1.5] : [0, -1, 0],
                      rotate: isBreathingFire ? [0, -2, 0] : [0, 1, 0]
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: isBreathingFire ? 0.35 : 3,
                      ease: 'easeInOut'
                    }}
                  >
                    {/* Curved Neck */}
                    <path
                      d="M 48 54 
                         C 44 42, 38 38, 36 30"
                      stroke={dragonTheme.scaleColor}
                      strokeWidth="6.5"
                      fill="none"
                      strokeLinecap="round"
                    />
                    {/* Neck back spines */}
                    <path d="M 45 46 L 48 44 L 47 48 Z M 41 38 L 44 36 L 43 40 Z" fill={dragonTheme.glowColor} opacity="0.8" />

                    {/* Horns curving back from the head */}
                    <path d="M 37 25 C 44 19, 52 16, 60 17" stroke={dragonTheme.scaleColor} strokeWidth="2.2" fill="none" strokeLinecap="round" />
                    <path d="M 54 17 L 60 17 L 57 19 Z" fill={dragonTheme.glowColor} />
                    <path d="M 38 28 C 43 23, 49 21, 56 22" stroke={dragonTheme.scaleColor} strokeWidth="1.8" fill="none" strokeLinecap="round" />

                    {/* Menacing glowing slit eyes */}
                    <ellipse cx="32" cy="27" rx="1.5" ry="1.2" fill={dragonTheme.eyeColor} className="animate-pulse" />
                    <path d="M 30 25 C 32 24, 34 25, 35 26" stroke={dragonTheme.scaleColor} strokeWidth="1.0" fill="none" />

                    {/* Upper Snout (aligned pointing leftwards) */}
                    <path
                      d="M 36 25 
                         C 32 25, 23 24, 21 28 
                         C 22 30, 26 31, 35 31 Z"
                      fill={dragonTheme.scaleColor}
                      stroke={dragonTheme.bellyColor}
                      strokeWidth="0.5"
                    />

                    {/* Lower dragon roaring jaw that drops on dracarys */}
                    <motion.path
                      d="M 33 30 
                         L 21 30 
                         L 28 35 Z"
                      fill={dragonTheme.bellyColor}
                      stroke={dragonTheme.scaleColor}
                      strokeWidth="0.5"
                      animate={{
                        y: isBreathingFire ? 4.5 : 0,
                        rotate: isBreathingFire ? -16 : 0,
                        scaleY: isBreathingFire ? 1.35 : 1
                      }}
                      transition={{ duration: 0.15 }}
                      style={{ transformOrigin: '33px 30px' }}
                    />

                    {/* High Precision Dragon Mouth Pivot for Spewing Flames */}
                    <g id="dragon-mouth-pivot" className="transform translate-x-[22px] translate-y-[29px]" />
                  </motion.g>

                </svg>
              </motion.div>

              {/* Fire Sparks floating up when hovered or active */}
              <AnimatePresence>
                {(isHovered || isBreathingFire) && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.8 }}
                    exit={{ opacity: 0 }}
                    className="absolute top-2 left-4 pointer-events-none"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-gold animate-bounce" />
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Ancient Brass Plaque on Pedestal with Dragon's Name */}
            <div className="absolute bottom-1.5 bg-stone-950/90 px-2.5 py-0.5 border border-amber-800/40 rounded shadow-md text-[8px] font-mono tracking-widest text-amber-200 uppercase select-none font-semibold">
              {dragonTheme.name}
            </div>

          </button>
        </div>
      </div>
    </>
  );
};
