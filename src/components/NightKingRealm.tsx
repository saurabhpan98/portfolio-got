import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Snowflake, Skull, Flame, Wind, Plus, Trash2, ArrowLeft, ShieldAlert, Sparkles } from 'lucide-react';

interface NightKingRealmProps {
  isSoundMuted: boolean;
  onMelt: () => void;
}

interface Wight {
  id: string;
  name: string;
  originalRole: string;
  dangerLevel: 'Skeptical' | 'Savage' | 'Elite' | 'Legendary';
  glowColor: string;
}

const DEFAULT_WIGHTS: Wight[] = [
  { id: 'wight-1', name: 'Viserion the Wight Dragon', originalRole: 'Saurabh\'s Icy API Cloud Engine', dangerLevel: 'Legendary', glowColor: '#06b6d4' },
  { id: 'wight-2', name: 'Hodor of Winterfell', originalRole: 'The Sturdy Load Balancer Gatekeeper', dangerLevel: 'Elite', glowColor: '#38bdf8' },
  { id: 'wight-3', name: 'Karsi of Hardhome', originalRole: 'High-Concurrency Frontend Wight Leader', dangerLevel: 'Savage', glowColor: '#22d3ee' },
  { id: 'wight-4', name: 'Giant Wight of the Frostfangs', originalRole: 'Heavy Compute Database Smasher', dangerLevel: 'Legendary', glowColor: '#0891b2' }
];

export const NightKingRealm: React.FC<NightKingRealmProps> = ({ isSoundMuted, onMelt }) => {
  const [wights, setWights] = useState<Wight[]>(DEFAULT_WIGHTS);
  const [newWightName, setNewWightName] = useState('');
  const [newWightRole, setNewWightRole] = useState('');
  const [newWightDanger, setNewWightDanger] = useState<'Skeptical' | 'Savage' | 'Elite' | 'Legendary'>('Savage');
  const [isCastingFrost, setIsCastingFrost] = useState(false);
  const [tickerIndex, setTickerIndex] = useState(0);
  const [blasts, setBlasts] = useState<{
    id: number;
    x: number;
    y: number;
    shards: { id: number; tx: number; ty: number; size: number; rotation: number }[];
  }[]>([]);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Night King chilling messages ticker
  const COLD_MESSAGES = [
    "❄️ THE WALL HAS FALLEN: Absolute Zero compilation is complete.",
    "❄️ WINTER IS HERE: The digital realm freezes into high-contrast ice blue and white.",
    "❄️ THE COLD WINDS BLOW: Saurabh's neural servers have been subverted by the Great Other.",
    "❄️ VISERION UNLEASHED: Breathes blue-hot plasma APIs across the server farms.",
    "❄️ VALYRIAN ALGORITHMS: Cold, immutable, and faster than the speed of light.",
    "❄️ RAISE YOUR DEAD REPOS: Every deprecated file is reanimated into active system wights."
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTickerIndex((prev) => (prev + 1) % COLD_MESSAGES.length);
    }, 5500);
    return () => clearInterval(interval);
  }, []);

  // Snow Canvas Particle System
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle class
    interface SnowflakeParticle {
      x: number;
      y: number;
      radius: number;
      density: number;
      opacity: number;
      speedY: number;
      speedX: number;
    }

    const flakes: SnowflakeParticle[] = [];
    const maxFlakes = 160;

    for (let i = 0; i < maxFlakes; i++) {
      flakes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 3 + 1,
        density: Math.random() * maxFlakes,
        opacity: Math.random() * 0.7 + 0.3,
        speedY: Math.random() * 1.5 + 0.5,
        speedX: Math.random() * 1.5 - 0.75
      });
    }

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      
      // Render beautiful deep dark frost radial background in canvas
      const bgGrad = ctx.createRadialGradient(width / 2, height / 2, 10, width / 2, height / 2, Math.max(width, height));
      bgGrad.addColorStop(0, '#020617'); // slate-950
      bgGrad.addColorStop(1, '#0c0a09'); // stone-950
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Render subtle frosted fog waves
      ctx.fillStyle = 'rgba(6, 182, 212, 0.02)';
      ctx.beginPath();
      ctx.ellipse(width / 2, height, width * 0.8, height * 0.4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Render snow flakes
      for (let i = 0; i < maxFlakes; i++) {
        const f = flakes[i];
        ctx.beginPath();
        ctx.fillStyle = `rgba(224, 242, 254, ${f.opacity})`; // sky-100
        ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2, true);
        ctx.fill();

        // Update positions
        f.y += f.speedY;
        f.x += f.speedX;

        // Reset when snow falls off screen
        if (f.y > height) {
          flakes[i] = {
            x: Math.random() * width,
            y: 0,
            radius: f.radius,
            density: f.density,
            opacity: f.opacity,
            speedY: f.speedY,
            speedX: f.speedX
          };
        }
        if (f.x > width) {
          flakes[i].x = 0;
        } else if (f.x < 0) {
          flakes[i].x = width;
        }
      }

      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  // Scribe a new Wight / Raise the Dead handler
  const handleRaiseDead = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newWightName.trim()) return;

    // Synthesize short magical frost chime when dead is raised!
    if (!isSoundMuted) {
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContext();
        if (ctx.state === 'suspended') {
          ctx.resume();
        }
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(1046.50, ctx.currentTime); // C6 high chime
        osc.frequency.exponentialRampToValueAtTime(1318.51, ctx.currentTime + 0.3); // E6
        
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.0);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 1.0);
      } catch (err) {}
    }

    const roles = [
      'Glacial Code Vanguard',
      'Frozen State Commander',
      'Boreal Network Sentry',
      'Cryptic Database Specter'
    ];

    const randomRole = newWightRole.trim() || roles[Math.floor(Math.random() * roles.length)];
    const colors = ['#06b6d4', '#38bdf8', '#22d3ee', '#0891b2', '#00f5ff'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const raised: Wight = {
      id: `wight-${Date.now()}`,
      name: newWightName.trim(),
      originalRole: randomRole,
      dangerLevel: newWightDanger,
      glowColor: randomColor
    };

    setWights([raised, ...wights]);
    setNewWightName('');
    setNewWightRole('');
    
    // Cast frost wave animation briefly
    setIsCastingFrost(true);
    setTimeout(() => setIsCastingFrost(false), 800);
  };

  // Shatter / Deanimate a Wight
  const deanimateWight = (id: string) => {
    setWights(wights.filter(w => w.id !== id));
  };

  // Frost blast on clicking the Night King
  const triggerFrostBlast = (e?: React.MouseEvent<HTMLElement>) => {
    setIsCastingFrost(true);
    setTimeout(() => setIsCastingFrost(false), 1200);

    // Get click coordinates, default to center of viewport if event not provided
    const x = e ? e.clientX : window.innerWidth / 2;
    const y = e ? e.clientY : window.innerHeight / 2;

    const shardCount = 12;
    const shards = Array.from({ length: shardCount }).map((_, i) => {
      const angle = (i * 2 * Math.PI) / shardCount + (Math.random() * 0.4 - 0.2);
      const distance = 120 + Math.random() * 220; // end distance
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;
      const size = 10 + Math.random() * 18;
      return {
        id: i,
        tx,
        ty,
        size,
        rotation: Math.random() * 360,
      };
    });

    const newBlast = {
      id: Date.now() + Math.random(),
      x,
      y,
      shards
    };

    setBlasts(prev => [...prev, newBlast]);

    // Clean up blast after animation
    setTimeout(() => {
      setBlasts(prev => prev.filter(b => b.id !== newBlast.id));
    }, 1200);

    // Synthesize chilling shattering blast
    if (!isSoundMuted) {
      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
        const ctx = new AudioContext();
        if (ctx.state === 'suspended') {
          ctx.resume();
        }
        
        // Ice shatter noise
        const bufferSize = ctx.sampleRate * 0.6; // 0.6 seconds
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = Math.random() * 2 - 1;
        }
        
        const noise = ctx.createBufferSource();
        noise.buffer = buffer;
        
        const filter = ctx.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.setValueAtTime(1200, ctx.currentTime);
        filter.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.5);
        
        const gainNode = ctx.createGain();
        gainNode.gain.setValueAtTime(0.25, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
        
        // Add a low rumbling oscillator for absolute zero sub-bass impact
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(90, ctx.currentTime); // 90Hz bass drop
        osc.frequency.linearRampToValueAtTime(45, ctx.currentTime + 0.5);
        
        oscGain.gain.setValueAtTime(0.35, ctx.currentTime);
        oscGain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
        
        noise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(ctx.destination);
        
        osc.connect(oscGain);
        oscGain.connect(ctx.destination);
        
        noise.start();
        osc.start();
        noise.stop(ctx.currentTime + 0.6);
        osc.stop(ctx.currentTime + 0.6);
      } catch (err) {}
    }
  };

  return (
    <div id="night-king-realm-container" className="fixed inset-0 z-50 overflow-y-auto select-none font-sans bg-slate-950 text-slate-100">
      
      {/* Background Canvas */}
      <canvas ref={canvasRef} className="fixed inset-0 pointer-events-none z-0" />

      {/* Creeping Frost Cracks Icy Borders Overlay */}
      <div className="fixed inset-0 pointer-events-none z-10 border-[16px] border-cyan-500/5 shadow-[inset_0_0_80px_rgba(34,211,238,0.15)]" />

      {/* Dynamic Absolute Zero Blast Rings & Shards */}
      {blasts.map(blast => (
        <div key={blast.id} className="fixed inset-0 pointer-events-none z-50">
          {/* Main Expanding Cold Ring */}
          <motion.div
            initial={{ width: 0, height: 0, opacity: 1, borderWidth: '16px' }}
            animate={{ 
              width: '180vmax', 
              height: '180vmax', 
              opacity: 0,
              borderWidth: '2px'
            }}
            transition={{ duration: 1.0, ease: [0.1, 0.8, 0.3, 1] }}
            className="absolute rounded-full border-cyan-400 shadow-[0_0_80px_rgba(34,211,238,0.9),inset_0_0_50px_rgba(34,211,238,0.7)]"
            style={{
              left: blast.x,
              top: blast.y,
              transform: 'translate(-50%, -50%)',
            }}
          />

          {/* Secondary White Frost Ice-Dust Ring */}
          <motion.div
            initial={{ width: 0, height: 0, opacity: 0.9, borderWidth: '12px' }}
            animate={{ 
              width: '140vmax', 
              height: '140vmax', 
              opacity: 0,
              borderWidth: '1px'
            }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.1, 0.8, 0.3, 1] }}
            className="absolute rounded-full border-white shadow-[0_0_60px_rgba(255,255,255,0.8),inset_0_0_40px_rgba(255,255,255,0.5)]"
            style={{
              left: blast.x,
              top: blast.y,
              transform: 'translate(-50%, -50%)',
            }}
          />

          {/* Ice Crystal Shards flying outward */}
          <div
            className="absolute"
            style={{ left: blast.x, top: blast.y }}
          >
            {blast.shards.map(shard => (
              <motion.div
                key={shard.id}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0.4, rotate: 0 }}
                animate={{ 
                  x: shard.tx, 
                  y: shard.ty, 
                  opacity: 0, 
                  scale: 1.4, 
                  rotate: shard.rotation + 240 
                }}
                transition={{ duration: 0.9, ease: [0.1, 0.8, 0.2, 1] }}
                className="absolute text-cyan-200 select-none drop-shadow-[0_0_12px_rgba(34,211,238,0.95)]"
                style={{
                  transform: 'translate(-50%, -50%)',
                }}
              >
                <Snowflake style={{ width: shard.size, height: shard.size }} />
              </motion.div>
            ))}
          </div>
        </div>
      ))}

      {/* Casting Frost Wave Flash effect */}
      <AnimatePresence>
        {isCastingFrost && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ 
              opacity: [0, 0.75, 0.1, 0], 
              backdropFilter: ['blur(0px)', 'blur(4px)', 'blur(1px)', 'blur(0px)'] 
            }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 bg-gradient-to-r from-cyan-400/30 via-white/40 to-cyan-400/30 pointer-events-none z-40"
          />
        )}
      </AnimatePresence>

      {/* Inner Immersive Sub-Interface */}
      <div className="relative z-20 w-full min-h-screen flex flex-col justify-between py-8 px-4 md:px-8 max-w-6xl mx-auto">
        
        {/* TOP COMMANDS & MELT OPTION */}
        <header className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full border border-cyan-400/30 flex items-center justify-center bg-cyan-950/40 text-cyan-400 shadow-[0_0_15px_rgba(34,211,238,0.3)] animate-pulse">
              <Skull className="w-5 h-5" />
            </div>
            <div>
              <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-cyan-400 block font-black">
                THE KINGDOM OF PERMAFROST
              </span>
              <h1 className="font-display text-xl text-white tracking-[0.1em] uppercase font-bold">
                THE NIGHT KING'S BENCH
              </h1>
            </div>
          </div>

          {/* Melt the Frost Button */}
          <motion.button
            onClick={onMelt}
            whileHover={{ scale: 1.05 }}
            whileActive={{ scale: 0.95 }}
            className="px-5 py-2.5 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 border border-orange-500/40 rounded text-xs font-mono uppercase tracking-[0.18em] text-white shadow-[0_0_25px_rgba(239,68,68,0.4)] hover:shadow-[0_0_35px_rgba(249,115,22,0.6)] cursor-pointer flex items-center gap-2 font-bold transition-all"
            title="Shatter the winter spell and return to summer portfolio!"
          >
            <Flame className="w-4 h-4 text-amber-200 animate-bounce" />
            DRACARYS: MELT WINTER
          </motion.button>
        </header>

        {/* LONG NIGHT TICKER */}
        <div className="w-full bg-cyan-950/20 border-y border-cyan-500/10 backdrop-blur-sm py-2 mb-10 overflow-hidden relative shadow-inner">
          <div className="absolute top-0 bottom-0 left-0 w-8 bg-gradient-to-r from-slate-950 to-transparent z-10" />
          <div className="absolute top-0 bottom-0 right-0 w-8 bg-gradient-to-l from-slate-950 to-transparent z-10" />
          <div className="h-[20px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={tickerIndex}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="font-mono text-[10px] md:text-xs text-cyan-300 tracking-[0.08em] font-medium uppercase text-center"
              >
                {COLD_MESSAGES[tickerIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* HERO NIGHT KING CHARACTER & STORY GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-12">
          
          {/* LEFT COLUMN: THE DETAILED VECTOR NIGHT KING PORTRAIT */}
          <div className="lg:col-span-5 flex flex-col items-center">
            <motion.div
              id="night-king-portrait-trigger"
              onClick={triggerFrostBlast}
              whileHover={{ scale: 1.02 }}
              animate={isCastingFrost ? {
                x: [0, -6, 6, -6, 6, -3, 3, 0],
                y: [0, 4, -4, 4, -4, 2, -2, 0],
              } : {}}
              transition={{ duration: 0.5 }}
              className="w-72 h-72 md:w-80 md:h-80 bg-slate-900/40 border border-cyan-500/20 hover:border-cyan-400 rounded-2xl relative cursor-pointer group flex items-center justify-center p-3 shadow-[0_0_40px_rgba(6,182,212,0.15)] select-none"
              title="Click the Night King to unleash absolute zero ice blast!"
            >
              {/* Frozen Ambient Halo */}
              <div className="absolute inset-2 rounded-xl border border-dashed border-cyan-500/10 animate-spin-slow pointer-events-none" />
              <div className="absolute inset-0 bg-radial-glow opacity-30 group-hover:opacity-55 transition-opacity pointer-events-none rounded-2xl" 
                style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.2) 0%, transparent 70%)' }}
              />

              {/* HIGH FIDELITY GEOMETRIC NIGHT KING VECTOR ART */}
              <svg
                viewBox="0 0 120 120"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full drop-shadow-[0_0_20px_rgba(34,211,238,0.45)]"
              >
                {/* Collar Armor of Obsidian & Runes */}
                <path d="M 35 110 L 85 110 L 80 92 L 40 92 Z" fill="#0c111d" stroke="#06b6d4" strokeWidth="0.8" />
                <path d="M 28 116 L 92 116 L 85 110 L 35 110 Z" fill="#020617" stroke="#0891b2" strokeWidth="0.5" />
                {/* Runic Carvings on shoulders */}
                <path d="M 32 113 Q 40 111 48 113" stroke="#22d3ee" strokeWidth="0.8" opacity="0.6" strokeLinecap="round" />
                <path d="M 88 113 Q 80 111 72 113" stroke="#22d3ee" strokeWidth="0.8" opacity="0.6" strokeLinecap="round" />

                {/* Sinuous Frozen Neck */}
                <path d="M 45 92 Q 50 82 48 76 L 72 76 Q 70 82 75 92 Z" fill="#1e293b" stroke="#334155" strokeWidth="0.8" />
                <path d="M 48 76 L 72 76 L 70 92 L 50 92 Z" fill="#0f172a" opacity="0.4" />
                {/* Neck tendons of ice */}
                <path d="M 52 79 L 55 90" stroke="#06b6d4" strokeWidth="1" strokeLinecap="round" opacity="0.5" />
                <path d="M 68 79 L 65 90" stroke="#06b6d4" strokeWidth="1" strokeLinecap="round" opacity="0.5" />

                {/* Sinister Angular Head / Face Structure */}
                <path
                  d="M 60 76 
                     C 42 75, 34 52, 38 38 
                     C 42 24, 78 24, 82 38 
                     C 86 52, 78 75, 60 76 Z"
                  fill="#1e293b" // slate-800
                  stroke="#0891b2" // cyan-600
                  strokeWidth="1.2"
                />

                {/* Creeping frost shadows and icy cheeks contours */}
                <path d="M 44 48 C 48 55, 54 62, 60 62 Z" fill="#0f172a" opacity="0.5" />
                <path d="M 76 48 C 72 55, 66 62, 60 62 Z" fill="#0f172a" opacity="0.5" />
                <path d="M 48 38 L 54 44 M 72 38 L 66 44" stroke="#0891b2" strokeWidth="1" opacity="0.4" />

                {/* Sharp Ice Chin */}
                <path d="M 52 72 L 60 76 L 68 72 Z" fill="#0f172a" stroke="#06b6d4" strokeWidth="0.5" />

                {/* Sinister Mouth Slit */}
                <path d="M 50 63 Q 60 66 70 63" stroke="#0c0a09" strokeWidth="1.5" strokeLinecap="round" />
                <path d="M 53 63 Q 60 61 67 63" stroke="#38bdf8" strokeWidth="0.5" strokeLinecap="round" opacity="0.4" />

                {/* Sharp Pointed Frozen Nose */}
                <path d="M 60 42 L 56 55 L 60 58 Z" fill="#0f172a" stroke="#0891b2" strokeWidth="0.6" />
                <path d="M 60 42 L 64 55 L 60 58 Z" fill="#1e293b" stroke="#38bdf8" strokeWidth="0.4" />

                {/* THE CROWN OF HORNS (9 glorious ice spikes curving from skull) */}
                <g>
                  {/* Horn 1: Central Spike */}
                  <path d="M 60 27 L 60 11 L 63 26 Z" fill="#38bdf8" stroke="#e0f2fe" strokeWidth="0.5" />
                  <path d="M 60 27 L 60 11 L 57 26 Z" fill="#0ea5e9" />
                  
                  {/* Horn 2 & 3: Inner Left and Right */}
                  <path d="M 50 28 L 44 14 L 52 26 Z" fill="#38bdf8" stroke="#e0f2fe" strokeWidth="0.4" />
                  <path d="M 50 28 L 44 14 L 48 27 Z" fill="#0ea5e9" />
                  
                  <path d="M 70 28 L 76 14 L 68 26 Z" fill="#38bdf8" stroke="#e0f2fe" strokeWidth="0.4" />
                  <path d="M 70 28 L 76 14 L 72 27 Z" fill="#0ea5e9" />

                  {/* Horn 4 & 5: Middle Left and Right */}
                  <path d="M 42 32 L 30 20 L 43 28 Z" fill="#0ea5e9" stroke="#bae6fd" strokeWidth="0.4" />
                  <path d="M 42 32 L 30 20 L 38 31 Z" fill="#0284c7" />

                  <path d="M 78 32 L 90 20 L 77 28 Z" fill="#0ea5e9" stroke="#bae6fd" strokeWidth="0.4" />
                  <path d="M 78 32 L 90 20 L 82 31 Z" fill="#0284c7" />

                  {/* Horn 6 & 7: Lower Left and Right */}
                  <path d="M 36 38 L 22 30 L 37 34 Z" fill="#0ea5e9" stroke="#7dd3fc" strokeWidth="0.4" />
                  <path d="M 74 38 L 98 30 L 73 34 Z" fill="#0ea5e9" stroke="#7dd3fc" strokeWidth="0.4" />

                  {/* Horn 8 & 9: Back Temples */}
                  <path d="M 38 25 L 34 10 Q 42 18 42 24" fill="#bae6fd" stroke="#38bdf8" strokeWidth="0.3" />
                  <path d="M 82 25 L 86 10 Q 78 18 78 24" fill="#bae6fd" stroke="#38bdf8" strokeWidth="0.3" />
                </g>

                {/* THE EYE SOCKETS - Deep cold shadows */}
                <path d="M 44 42 C 41 40, 48 37, 52 39 Z" fill="#0c111d" />
                <path d="M 76 42 C 79 40, 72 37, 68 39 Z" fill="#0c111d" />

                {/* GLOWING ICE-BLUE MENACING SLIT EYES (With pulsed scaling) */}
                <motion.g
                  animate={{
                    scale: [1, 1.25, 1],
                    opacity: [0.85, 1, 0.85]
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 1.8,
                    ease: 'easeInOut'
                  }}
                  style={{ transformOrigin: '60px 40px' }}
                >
                  {/* Left Slit */}
                  <ellipse cx="48" cy="40" rx="3.5" ry="1.2" fill="#00f5ff" />
                  <circle cx="48" cy="40" r="0.8" fill="#ffffff" />
                  {/* Right Slit */}
                  <ellipse cx="72" cy="40" rx="3.5" ry="1.2" fill="#00f5ff" />
                  <circle cx="72" cy="40" r="0.8" fill="#ffffff" />
                </motion.g>

                {/* Forehead Frost Cracks (White Walker symbol details) */}
                <path d="M 60 28 Q 60 35 55 38" stroke="#38bdf8" strokeWidth="0.8" opacity="0.5" strokeLinecap="round" />
                <path d="M 60 28 Q 63 34 68 35" stroke="#38bdf8" strokeWidth="0.8" opacity="0.5" strokeLinecap="round" />
              </svg>

              {/* Glowing active label */}
              <div className="absolute -bottom-2.5 bg-slate-950 px-3.5 py-1 border border-cyan-500/40 rounded-full text-[10px] font-mono tracking-[0.25em] text-cyan-400 uppercase select-none font-bold shadow-[0_0_15px_rgba(34,211,238,0.4)]">
                THE NIGHT KING
              </div>
            </motion.div>
            
            <p className="font-mono text-[9px] text-cyan-500 uppercase tracking-[0.15em] mt-6 text-center italic max-w-xs">
              * Click him to cast a chilling shockwave of absolute zero *
            </p>
          </div>

          {/* RIGHT COLUMN: NIGHT KING'S LORE & PROFILE CHRONICLES */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="bg-slate-900/40 border border-cyan-500/15 rounded-md p-6 relative backdrop-blur-sm shadow-xl">
              <span className="font-mono text-[9px] uppercase tracking-widest text-cyan-500 font-semibold">THE GREAT MAESTER'S LORE</span>
              <h2 className="font-display text-2xl font-black text-white uppercase tracking-wider mt-1.5 border-b border-cyan-500/10 pb-3">
                THE SCOURGE OF ARITHMETIC FOG
              </h2>
              <p className="font-sans text-sm text-slate-300 leading-relaxed italic mt-4">
                "Born in the extreme glacial bounds beyond the Shivering Sea, Saurabh's shadow avatar is the Night King — the architect of absolute-zero code. While mortal developers tire and freeze when the compiler is dark, the Night King reigns supreme in the frozen state, animating skeletal databases and summoning blizzard networks to scale across infinite shards."
              </p>
            </div>

            {/* FROSTED SKILLS GRIMOIRE (Re-themed portfolio skills) */}
            <div className="bg-slate-900/40 border border-cyan-500/15 rounded-md p-6 relative backdrop-blur-sm shadow-xl">
              <span className="font-mono text-[9px] uppercase tracking-widest text-cyan-400 font-semibold">GLACIAL SYSTEMS GRIMOIRE</span>
              <h3 className="font-display text-lg font-bold text-white uppercase tracking-wide mt-1 mb-4">
                Saurabh's Cryogenic Powers
              </h3>

              <div className="space-y-4">
                {/* Skill 1 */}
                <div>
                  <div className="flex justify-between items-center text-xs font-mono mb-1">
                    <span className="text-cyan-300 uppercase tracking-widest font-bold">1. Necromancy Frameworks (React, TS)</span>
                    <span className="text-cyan-400">100% Core Mastery</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-cyan-500/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '100%' }}
                      transition={{ duration: 1.5, delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-cyan-600 to-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 italic">
                    Waking silent static pixels from the grave, reanimating them with dynamic, fully compiled interactive life.
                  </p>
                </div>

                {/* Skill 2 */}
                <div>
                  <div className="flex justify-between items-center text-xs font-mono mb-1">
                    <span className="text-cyan-300 uppercase tracking-widest font-bold">2. Blizzard API Streams (Node, Express)</span>
                    <span className="text-cyan-400">95% Frozen Flow</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-cyan-500/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '95%' }}
                      transition={{ duration: 1.5, delay: 0.4 }}
                      className="h-full bg-gradient-to-r from-cyan-600 to-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 italic">
                    Blasting high-speed payloads at sub-zero latency across the Seven Kingdoms, freezing buffer memory into immutable caches.
                  </p>
                </div>

                {/* Skill 3 */}
                <div>
                  <div className="flex justify-between items-center text-xs font-mono mb-1">
                    <span className="text-cyan-300 uppercase tracking-widest font-bold">3. Permafrost Vaults (PostgreSQL, Firestore)</span>
                    <span className="text-cyan-400">92% Cryogenic Safety</span>
                  </div>
                  <div className="h-1.5 w-full bg-slate-950 rounded-full overflow-hidden border border-cyan-500/10">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '92%' }}
                      transition={{ duration: 1.5, delay: 0.6 }}
                      className="h-full bg-gradient-to-r from-cyan-600 to-cyan-300 shadow-[0_0_8px_rgba(34,211,238,0.6)]"
                    />
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1 italic">
                    Locking relational ledgers and unstructured scroll records in deep glaciers, safe from solar flares and warm database drops.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>

        {/* INTERACTIVE SUMMONING ALtar: THE ARMY OF THE DEAD */}
        <section className="mt-8 bg-slate-900/30 border border-cyan-500/10 rounded-lg p-6 relative backdrop-blur-sm shadow-2xl">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b border-cyan-500/10 pb-4 mb-6 gap-4">
            <div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-cyan-400 font-bold block">
                SUMMON & ALIGN WIGHTS
              </span>
              <h3 className="font-display text-xl font-bold text-white uppercase tracking-wider mt-0.5">
                THE ARMY OF THE DEAD ({wights.length} ACTIVE)
              </h3>
            </div>
            
            <p className="font-sans text-xs text-slate-400 italic">
              "Every mortal developer that falls in battle is raised with blue eyes and enlisted to write optimized TypeScript."
            </p>
          </div>

          {/* Wight Summoner Form */}
          <form onSubmit={handleRaiseDead} className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end mb-8 bg-slate-950/40 p-4 border border-cyan-500/5 rounded">
            <div className="md:col-span-4">
              <label className="font-mono text-[9px] text-cyan-500 uppercase tracking-widest block mb-1">
                Scribe Wight Name
              </label>
              <input
                type="text"
                required
                value={newWightName}
                onChange={(e) => setNewWightName(e.target.value)}
                placeholder="e.g. Jorah the Reanimated"
                className="w-full bg-slate-900 border border-cyan-500/20 focus:border-cyan-400 px-3 py-2 text-xs rounded text-white placeholder-slate-600 outline-none transition-colors"
              />
            </div>

            <div className="md:col-span-4">
              <label className="font-mono text-[9px] text-cyan-500 uppercase tracking-widest block mb-1">
                Wight System Role (Optional)
              </label>
              <input
                type="text"
                value={newWightRole}
                onChange={(e) => setNewWightRole(e.target.value)}
                placeholder="e.g. Glacial Buffer Master"
                className="w-full bg-slate-900 border border-cyan-500/20 focus:border-cyan-400 px-3 py-2 text-xs rounded text-white placeholder-slate-600 outline-none transition-colors"
              />
            </div>

            <div className="md:col-span-2">
              <label className="font-mono text-[9px] text-cyan-500 uppercase tracking-widest block mb-1">
                Danger / Tier
              </label>
              <select
                value={newWightDanger}
                onChange={(e) => setNewWightDanger(e.target.value as any)}
                className="w-full bg-slate-900 border border-cyan-500/20 focus:border-cyan-400 px-2 py-2 text-xs rounded text-white outline-none transition-colors"
              >
                <option value="Skeptical">Skeptical</option>
                <option value="Savage">Savage</option>
                <option value="Elite">Elite</option>
                <option value="Legendary">Legendary</option>
              </select>
            </div>

            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full py-2 bg-cyan-950/60 hover:bg-cyan-900 border border-cyan-500/30 hover:border-cyan-400 text-cyan-300 font-mono text-[10px] uppercase tracking-widest rounded-sm font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Plus className="w-3.5 h-3.5 text-cyan-400" />
                RAISE DEAD
              </button>
            </div>
          </form>

          {/* Wight Army Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <AnimatePresence>
              {wights.map((w) => (
                <motion.div
                  key={w.id}
                  initial={{ opacity: 0, scale: 0.9, y: 15 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: -15 }}
                  transition={{ duration: 0.35 }}
                  className="bg-slate-950/60 border border-cyan-500/10 hover:border-cyan-400/30 rounded p-4 relative group overflow-hidden flex flex-col justify-between h-[120px] shadow-lg"
                >
                  <div>
                    {/* Glowing icy dot */}
                    <div className="flex justify-between items-start">
                      <span className="font-mono text-[8px] tracking-wider text-cyan-500 uppercase">
                        {w.dangerLevel} Wight
                      </span>
                      <div className="w-1.5 h-1.5 rounded-full shadow-[0_0_8px_currentColor] animate-pulse" style={{ color: w.glowColor }} />
                    </div>

                    <h4 className="font-display text-sm font-bold text-slate-100 uppercase mt-1 truncate">
                      {w.name}
                    </h4>
                    <p className="font-sans text-[10px] text-slate-400 italic mt-0.5 truncate">
                      {w.originalRole}
                    </p>
                  </div>

                  <div className="flex justify-between items-center mt-3 border-t border-cyan-500/5 pt-2">
                    <span className="font-mono text-[8px] text-slate-600">
                      ID: {w.id.substring(w.id.length - 6)}
                    </span>
                    
                    {/* Shatter / Deanimate Button */}
                    <button
                      onClick={() => deanimateWight(w.id)}
                      className="p-1 text-slate-600 hover:text-red-400 rounded transition-colors opacity-0 group-hover:opacity-100 cursor-pointer"
                      title="De-animate wight (Shatter to pieces)"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>

        {/* ICE FOOTER */}
        <footer className="mt-16 text-center border-t border-cyan-500/10 pt-6">
          <p className="font-mono text-[9px] text-cyan-600 uppercase tracking-[0.2em]">
            THE CROWN OF ABSOLUTE ZERO • FROZEN RECORDS © 305 AC
          </p>
        </footer>

      </div>
    </div>
  );
};
