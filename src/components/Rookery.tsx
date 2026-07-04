import React, { useState, useEffect } from 'react';
import { HouseType, RavenMessage } from '../types';
import { HOUSES } from '../data';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Scroll, Mail, MessageSquare, Shield, Clock, Trash2, ArrowRight } from 'lucide-react';

interface RookeryProps {
  activeHouse: HouseType;
  accentColor: string;
}

export const Rookery: React.FC<RookeryProps> = ({ activeHouse, accentColor }) => {
  const [senderName, setSenderName] = useState('');
  const [senderTitle, setSenderTitle] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [messageHouse, setMessageHouse] = useState<HouseType>(activeHouse);
  const [message, setMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const [isSending, setIsSending] = useState(false);
  const [showSealStamp, setShowSealStamp] = useState(false);
  const [dispatchedRavens, setDispatchedRavens] = useState<RavenMessage[]>([]);

  // Load ravens on mount
  useEffect(() => {
    const saved = localStorage.getItem('saurabh_got_ravens');
    if (saved) {
      try {
        setDispatchedRavens(JSON.parse(saved));
      } catch (e) {
        console.error('Error loading ravens', e);
      }
    }
  }, []);

  // Update chosen house when activeHouse changes
  useEffect(() => {
    setMessageHouse(activeHouse);
  }, [activeHouse]);

  // Save ravens to localStorage
  const saveRavens = (ravens: RavenMessage[]) => {
    setDispatchedRavens(ravens);
    localStorage.setItem('saurabh_got_ravens', JSON.stringify(ravens));
  };

  const handleSendRaven = (e: React.FormEvent) => {
    e.preventDefault();
    if (!senderName || !senderEmail || !message) {
      setErrorMessage('Please fill out all parchment fields (Name, Email, and Message) before dispatching the raven.');
      return;
    }

    setErrorMessage(null);
    setIsSending(true);

    // Simulate flying raven and wax sealing sequence
    setTimeout(() => {
      setShowSealStamp(true);
      
      setTimeout(() => {
        const newRaven: RavenMessage = {
          id: `raven-${Date.now()}`,
          senderName,
          senderTitle: senderTitle || 'Wandering Noble',
          senderEmail,
          allegiance: messageHouse,
          message,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        const updated = [newRaven, ...dispatchedRavens];
        saveRavens(updated);
        
        // Reset inputs
        setSenderName('');
        setSenderTitle('');
        setSenderEmail('');
        setMessage('');
        setIsSending(false);
        setShowSealStamp(false);
      }, 1200);

    }, 1800);
  };

  const handleReleaseRaven = (id: string) => {
    const updated = dispatchedRavens.filter((r) => r.id !== id);
    saveRavens(updated);
  };

  const getHouseName = (houseId: HouseType) => {
    return HOUSES.find((h) => h.id === houseId)?.name || 'Neutral Land';
  };

  const getHouseBadgeColor = (houseId: HouseType) => {
    switch (houseId) {
      case 'stark': return 'border-sky-500/20 text-sky-400 bg-sky-950/20';
      case 'targaryen': return 'border-red-500/20 text-red-400 bg-red-950/20';
      case 'lannister': return 'border-amber-500/20 text-amber-400 bg-amber-950/20';
      case 'nightswatch': return 'border-slate-500/20 text-slate-400 bg-slate-900/40';
    }
  };

  const getHouseSealColor = (houseId: HouseType) => {
    switch (houseId) {
      case 'stark': return 'bg-sky-900 border-sky-800 text-sky-200';
      case 'targaryen': return 'bg-red-800 border-red-900 text-red-100';
      case 'lannister': return 'bg-amber-800 border-amber-950 text-amber-100';
      case 'nightswatch': return 'bg-zinc-800 border-zinc-950 text-zinc-300';
    }
  };

  return (
    <section id="contact-section" className="w-full max-w-5xl mx-auto px-4 py-16">
      
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="sub-title-label block mb-2">The Rookery</span>
        <h2 className="bold-header-title text-3xl md:text-4xl lg:text-5xl tracking-[0.15em] uppercase font-black">
          SEND A RAVEN (CONTACT)
        </h2>
        <p className="font-sans text-sm md:text-base text-stone-400 max-w-xl mx-auto mt-3 italic">
          Draft a scroll of opportunity, collaboration, or allegiance to Saurabh Panchal. The ravens fly swift.
        </p>
        <div className="ornamental-line" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left column: Contact Scroll Form */}
        <div className="lg:col-span-7 relative">
          
          {/* Animated Raven Dispatch overlay */}
          <AnimatePresence>
            {isSending && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-stone-950/95 z-20 rounded-lg flex flex-col items-center justify-center p-6 border border-gold/30 backdrop-blur-md"
              >
                {!showSealStamp ? (
                  <div className="text-center space-y-6">
                    {/* Animated Raven graphic flying using CSS */}
                    <div className="relative w-32 h-32 mx-auto flex items-center justify-center">
                      <motion.svg
                        viewBox="0 0 100 100"
                        className="w-24 h-24 text-stone-400"
                        animate={{
                          y: [0, -15, 0],
                        }}
                        transition={{
                          repeat: Infinity,
                          duration: 1.2,
                          ease: "easeInOut"
                        }}
                      >
                        {/* Custom wings flapping path */}
                        <path
                          d="M 10 50 Q 30 20, 50 45 Q 70 20, 90 50 Q 50 65, 10 50 Z"
                          fill="currentColor"
                        />
                        <circle cx="50" cy="48" r="4" fill="#ef4444" />
                      </motion.svg>
                    </div>

                    <h3 className="font-display text-xl text-gold uppercase tracking-widest">
                      Raven dispatched into the skies...
                    </h3>
                    <p className="font-sans italic text-stone-400 text-sm max-w-sm">
                      Flying across the Riverlands and over the Neck to carry your message scroll to Oldtown's rookery towers...
                    </p>
                  </div>
                ) : (
                  <motion.div
                    initial={{ scale: 2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-center space-y-4"
                  >
                    {/* Glowing hot wax seal stamp circle */}
                    <div className="w-24 h-24 rounded-full bg-red-700 mx-auto flex items-center justify-center text-white border-4 border-red-800 text-3xl font-bold shadow-2xl animate-pulse">
                      SP
                    </div>
                    <h3 className="font-display text-xl text-red-500 uppercase tracking-widest font-extrabold">
                      LETTER WAX SEALED
                    </h3>
                    <p className="font-sans text-stone-300 text-sm italic">
                      Locked securely in the Citadel scrolls register.
                    </p>
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Actual Scroll Form */}
          <form 
            onSubmit={handleSendRaven}
            className="parchment-bg rounded-lg text-stone-900 overflow-hidden"
          >
            {/* Top wood roller decoration */}
            <div className="h-4 bg-amber-950 w-full" />

            <div className="p-5 sm:p-8 md:p-10 parchment-border space-y-6">
              
              <div className="flex items-center gap-2 mb-2 border-b border-amber-900/20 pb-3">
                <Scroll className="w-5 h-5 text-amber-900" />
                <h3 className="font-display text-lg font-bold tracking-widest text-amber-950 uppercase">
                  DRAFT SCROLL CORRESPONDENCE
                </h3>
              </div>

              {errorMessage && (
                <div className="bg-red-50 border-l-4 border-red-700 p-4 rounded text-red-950 font-sans text-sm animate-pulse flex items-start gap-2.5">
                  <div className="w-5 h-5 rounded-full bg-red-700 text-white flex items-center justify-center font-display text-[9px] font-bold shrink-0 mt-0.5">!</div>
                  <p className="italic">"{errorMessage}"</p>
                </div>
              )}

              {/* Form Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Sender Name */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="sender-name" className="font-display text-xs font-bold text-amber-950 uppercase tracking-wider block">
                    My Noble Lord / Lady's Name *
                  </label>
                  <div className="relative">
                    <input
                      id="sender-name"
                      type="text"
                      required
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      placeholder="e.g. Lady Arya Stark"
                      className="w-full bg-white/70 border border-amber-900/30 rounded px-3 py-2 font-sans text-base text-stone-900 placeholder:text-stone-500/70 focus:outline-none focus:border-amber-900/80 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Noble Title */}
                <div className="space-y-1.5 text-left">
                  <label htmlFor="sender-title" className="font-display text-xs font-bold text-amber-950 uppercase tracking-wider block">
                    House Title / Guild (Company)
                  </label>
                  <input
                    id="sender-title"
                    type="text"
                    value={senderTitle}
                    onChange={(e) => setSenderTitle(e.target.value)}
                    placeholder="e.g. Master Archer / Recruiter"
                    className="w-full bg-white/70 border border-amber-900/30 rounded px-3 py-2 font-sans text-base text-stone-900 placeholder:text-stone-500/70 focus:outline-none focus:border-amber-900/80 focus:bg-white"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5 text-left md:col-span-2">
                  <label htmlFor="sender-email" className="font-display text-xs font-bold text-amber-950 uppercase tracking-wider block">
                    Return Scroll Address (Email) *
                  </label>
                  <div className="relative flex">
                    <span className="inline-flex items-center px-3 rounded-l border border-r-0 border-amber-900/30 bg-amber-950/5 text-amber-900">
                      <Mail className="w-4 h-4" />
                    </span>
                    <input
                      id="sender-email"
                      type="email"
                      required
                      value={senderEmail}
                      onChange={(e) => setSenderEmail(e.target.value)}
                      placeholder="noble.soul@westeros.com"
                      className="w-full bg-white/70 border border-amber-900/30 rounded-r px-3 py-2 font-sans text-base text-stone-900 placeholder:text-stone-500/70 focus:outline-none focus:border-amber-900/80 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Alliance Select */}
                <div className="space-y-1.5 text-left md:col-span-2">
                  <label htmlFor="sender-alliance" className="font-display text-xs font-bold text-amber-950 uppercase tracking-wider block">
                    Seal Allegiance For This Letter
                  </label>
                  <select
                    id="sender-alliance"
                    value={messageHouse}
                    onChange={(e) => setMessageHouse(e.target.value as HouseType)}
                    className="w-full bg-white/70 border border-amber-900/30 rounded px-3 py-2 font-sans text-base text-stone-900 focus:outline-none focus:border-amber-900/80 focus:bg-white"
                  >
                    {HOUSES.map((h) => (
                      <option key={h.id} value={h.id}>
                        {h.name} ("{h.words}")
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message scroll */}
                <div className="space-y-1.5 text-left md:col-span-2">
                  <label htmlFor="scroll-message" className="font-display text-xs font-bold text-amber-950 uppercase tracking-wider block">
                    Write Your Message Scroll *
                  </label>
                  <div className="relative">
                    <span className="absolute top-3 left-3 text-amber-900/40">
                      <MessageSquare className="w-4 h-4" />
                    </span>
                    <textarea
                      id="scroll-message"
                      required
                      rows={4}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="My Lord Saurabh, I request your presence to forged a mighty dynamic interface... "
                      className="w-full bg-white/70 border border-amber-900/30 rounded pl-10 pr-3 py-2 font-sans text-base text-stone-900 placeholder:text-stone-500/70 focus:outline-none focus:border-amber-900/80 focus:bg-white resize-none"
                    />
                  </div>
                </div>

              </div>

              {/* Submit CTA */}
              <button
                id="send-raven-btn"
                type="submit"
                className="w-full py-3 bg-red-800 hover:bg-red-950 text-white font-display font-bold text-sm tracking-widest uppercase rounded shadow-lg shadow-red-950/30 flex items-center justify-center gap-2 cursor-pointer transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <Send className="w-4 h-4" />
                Dispatch Raven (Send Message)
              </button>

            </div>

            {/* Bottom wood roller decoration */}
            <div className="h-4 bg-amber-950 w-full" />
          </form>
        </div>

        {/* Right column: Dispatched scroll log list */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-2 justify-center lg:justify-start">
            <Shield className="w-5 h-5 text-gold" />
            <h3 className="font-display text-xl text-stone-300 tracking-wide uppercase">
              THE ROOKERY: RAVEN SCROLL LOGS
            </h3>
          </div>

          <p className="font-sans text-sm text-stone-400 text-center lg:text-left">
            Messages dispatched in this session are catalogued below in real time. (Stored locally in the browser).
          </p>

          <AnimatePresence>
            {dispatchedRavens.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="bg-stone-950/40 border border-stone-900 rounded-md p-8 text-center"
              >
                <Scroll className="w-8 h-8 text-stone-700 mx-auto mb-3" />
                <p className="font-sans text-stone-500 italic text-base">
                  No ravens rest in the cages currently. Send a scroll using the parchment form to dispatch your first messenger!
                </p>
              </motion.div>
            ) : (
              <div className="space-y-4 max-h-[450px] overflow-y-auto pr-2">
                {dispatchedRavens.map((raven) => (
                  <motion.div
                    key={raven.id}
                    layout
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, x: -20 }}
                    className="bg-stone-950/80 border border-stone-800 rounded p-5 relative overflow-hidden flex flex-col gap-3 group shadow-xl"
                  >
                    {/* Seal Stamp representing sender house */}
                    <div className={`absolute top-4 right-4 w-8 h-8 rounded-full border flex items-center justify-center font-display text-[9px] font-bold shadow transform rotate-12 ${getHouseSealColor(raven.allegiance)}`}>
                      {raven.senderName.substring(0, 2).toUpperCase()}
                    </div>

                    <div>
                      {/* Name & Title */}
                      <div className="flex flex-col text-left">
                        <h4 className="font-display text-base font-bold text-stone-200 tracking-wide">
                          {raven.senderName}
                        </h4>
                        <span className="font-sans text-xs text-stone-400">
                          {raven.senderTitle}
                        </span>
                      </div>
                      
                      {/* Return address */}
                      <span className="font-mono text-[10px] text-stone-500 mt-1 block">
                        Rookery Address: {raven.senderEmail}
                      </span>
                    </div>

                    <div className="border-t border-stone-900 pt-3">
                      <p className="font-sans text-stone-300 italic text-base text-left leading-relaxed">
                        "{raven.message}"
                      </p>
                    </div>

                    {/* Metadata Footer */}
                    <div className="flex justify-between items-center border-t border-stone-900/60 pt-3 mt-1">
                      <div className="flex items-center gap-1.5 text-stone-500">
                        <Clock className="w-3.5 h-3.5" />
                        <span className="font-mono text-[9px] uppercase tracking-wider">
                          Arrived at {raven.timestamp}
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className={`font-mono text-[9px] px-2 py-0.5 rounded border uppercase ${getHouseBadgeColor(raven.allegiance)}`}>
                          {getHouseName(raven.allegiance).split(' ')[1] || 'Neutral'}
                        </span>

                        <button
                          onClick={() => handleReleaseRaven(raven.id)}
                          className="text-stone-600 hover:text-red-400 p-1 rounded transition-colors duration-200 cursor-pointer"
                          title="Release Raven from Cages"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
