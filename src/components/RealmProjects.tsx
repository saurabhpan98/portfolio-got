import React, { useState } from 'react';
import { HouseType, Project } from '../types';
import { PROJECTS, HOUSES } from '../data';
import { StarkSigil, TargaryenSigil, LannisterSigil, NightsWatchSigil } from './HouseSigils';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Award, Layers, Globe, Github, Info, ChevronRight, Terminal } from 'lucide-react';

interface RealmProjectsProps {
  activeHouse: HouseType;
  accentColor: string;
}

export const RealmProjects: React.FC<RealmProjectsProps> = ({ activeHouse, accentColor }) => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewModes, setViewModes] = useState<Record<string, 'tech' | 'lore'>>({
    'iron-bank-ledger': 'lore',
    'dragon-aerial-radar': 'lore',
    'citadel-archive-search': 'lore',
    'ranger-raven-link': 'lore',
  });

  const toggleViewMode = (projectId: string) => {
    setViewModes((prev) => ({
      ...prev,
      [projectId]: prev[projectId] === 'lore' ? 'tech' : 'lore',
    }));
  };

  const getHouseSigil = (houseId: HouseType) => {
    const size = "w-6 h-6";
    switch (houseId) {
      case 'stark':
        return <StarkSigil className={size} color="#94a3b8" />;
      case 'targaryen':
        return <TargaryenSigil className={size} color="#dc2626" />;
      case 'lannister':
        return <LannisterSigil className={size} color="#fbbf24" />;
      case 'nightswatch':
        return <NightsWatchSigil className={size} color="#cbd5e1" />;
    }
  };

  return (
    <section id="projects-section" className="w-full max-w-6xl mx-auto px-4 py-16 border-b border-stone-800/40">
      
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="sub-title-label block mb-2">Architectural Monoliths</span>
        <h2 className="bold-header-title text-3xl md:text-4xl lg:text-5xl tracking-[0.15em] uppercase font-black">
          THE REALM'S GREAT KEEPS
        </h2>
        <p className="font-sans text-sm md:text-base text-stone-400 max-w-xl mx-auto mt-3 italic">
          Behold the digital keeps engineered across the seven web kingdoms. Hover to inspect their defenses.
        </p>
        <div className="ornamental-line" />
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {PROJECTS.map((project: Project) => {
          const house = HOUSES.find(h => h.id === project.alliance);
          const currentMode = viewModes[project.id] || 'lore';
          const isLore = currentMode === 'lore';

          return (
            <motion.div
              key={project.id}
              id={`project-card-${project.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5 }}
              className="bg-stone-950/80 rounded-md border border-stone-800 hover:border-gold/50 transition-all duration-500 overflow-hidden flex flex-col justify-between shadow-2xl relative group"
            >
              {/* Top Banner indicating House sponsor */}
              <div 
                className="h-1.5 w-full transition-colors duration-500" 
                style={{ backgroundColor: house?.primaryColor || accentColor }}
              />

              {/* Card Body */}
              <div className="p-6 md:p-8 flex-1">
                {/* Header info */}
                <div className="flex justify-between items-center mb-4">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] text-stone-500 uppercase tracking-widest">
                      Forged {project.forgedYear}
                    </span>
                    <span className="text-stone-700 select-none">•</span>
                    <div className="flex items-center gap-1.5">
                      {getHouseSigil(project.alliance)}
                      <span className="font-display text-[10px] uppercase font-bold text-stone-400">
                        {house?.name}
                      </span>
                    </div>
                  </div>
                  
                  {/* Status Indicator */}
                  <span className={`font-mono text-[10px] px-2 py-0.5 rounded border uppercase font-semibold ${
                    project.status === 'Citadel Approved' 
                      ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-400' 
                      : project.status === 'Standing Strong' 
                      ? 'bg-sky-950/20 border-sky-800/40 text-sky-400' 
                      : 'bg-amber-950/20 border-amber-800/40 text-amber-400'
                  }`}>
                    {project.status}
                  </span>
                </div>

                {/* Project Title */}
                <h3 className="font-display text-xl md:text-2xl text-stone-100 tracking-wide font-bold group-hover:text-gold transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="font-mono text-xs text-gold-hover uppercase tracking-widest mt-0.5 mb-6">
                  Codename: {project.gotCodename}
                </p>

                {/* Mode toggle (Parchment scroll switches) */}
                <div className="flex bg-stone-900/60 p-1 rounded-sm mb-6 border border-stone-900 max-w-xs">
                  <button
                    onClick={() => toggleViewMode(project.id)}
                    className={`flex-1 py-1 px-3 text-center rounded-sm font-display text-[10px] tracking-wider uppercase cursor-pointer transition-all duration-300 ${
                      isLore 
                        ? 'bg-gold text-stone-950 font-bold' 
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    Bard's Song (Lore)
                  </button>
                  <button
                    onClick={() => toggleViewMode(project.id)}
                    className={`flex-1 py-1 px-3 text-center rounded-sm font-display text-[10px] tracking-wider uppercase cursor-pointer transition-all duration-300 ${
                      !isLore 
                        ? 'bg-gold text-stone-950 font-bold' 
                        : 'text-stone-400 hover:text-stone-200'
                    }`}
                  >
                    Citadel Records (Tech)
                  </button>
                </div>

                {/* Animated content switch */}
                <div className="min-h-[100px]">
                  <AnimatePresence mode="wait">
                    {isLore ? (
                      <motion.p
                        key="lore-view"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ duration: 0.25 }}
                        className="font-sans text-stone-300 text-base italic leading-relaxed pl-3 border-l border-gold/30"
                      >
                        "{project.loreDescription}"
                      </motion.p>
                    ) : (
                      <motion.div
                        key="tech-view"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -10 }}
                        transition={{ duration: 0.25 }}
                        className="space-y-3 font-sans text-stone-300 text-base"
                      >
                        <p className="leading-relaxed">
                          {project.description}
                        </p>
                        <div className="text-sm text-stone-400 flex items-center gap-1.5 pt-1">
                          <Award className="w-4 h-4 text-gold" />
                          <span>Role: <strong className="text-stone-300">{project.role}</strong></span>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 md:p-8 bg-stone-950/40 border-t border-stone-900/60 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center justify-between">
                
                {/* Tech Materials Badges */}
                <div className="flex flex-wrap gap-1.5 max-w-full sm:max-w-[70%]">
                  {project.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[9px] px-2 py-0.5 rounded border border-stone-800 bg-stone-900 text-stone-300 uppercase tracking-wider"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => {
                      setSelectedProject(project);
                    }}
                    className="p-2 border border-stone-800 hover:border-gold rounded-full text-stone-400 hover:text-gold cursor-pointer transition-all duration-300 flex items-center justify-center"
                    title="See Blueprint Schematic"
                  >
                    <Terminal className="w-4 h-4" />
                  </button>

                  <a
                    href={project.githubUrl}
                    className="p-2 border border-stone-800 hover:border-gold rounded-full text-stone-400 hover:text-gold transition-all duration-300 flex items-center justify-center"
                    title="Inspect Scribe Files (GitHub)"
                  >
                    <Github className="w-4 h-4" />
                  </a>
                </div>

              </div>

              {/* Decorative Subtle watermark of House sigil in background of card */}
              <div className="absolute right-4 top-16 opacity-[0.02] pointer-events-none transform scale-150 rotate-12 transition-transform duration-1000 group-hover:scale-[1.8] group-hover:rotate-45">
                {getHouseSigil(project.alliance)}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Blueprint Schematic Terminal Modal */}
      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 15 }}
              className="bg-stone-950 border border-gold/40 rounded-md w-full max-w-2xl overflow-hidden shadow-2xl"
            >
              {/* Terminal header */}
              <div className="bg-stone-900 px-4 py-3 flex justify-between items-center border-b border-stone-800">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-600" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="font-mono text-xs text-stone-400 ml-2">CITADEL_SCHEMATIC://{selectedProject.id}.sh</span>
                </div>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="font-mono text-xs text-stone-400 hover:text-white px-2 py-1 rounded border border-stone-800 hover:border-stone-700 cursor-pointer"
                >
                  [CLOSE]
                </button>
              </div>

              {/* Terminal content */}
              <div className="p-6 font-mono text-xs md:text-sm text-emerald-400 overflow-y-auto max-h-96 space-y-4">
                <p className="text-stone-400"># Saurabh Citadel Foundry blueprints compiled for Lord Commander...</p>
                <div className="space-y-1">
                  <p className="text-white">$ cat info_sheet.json</p>
                  <p className="text-gold-hover">{`{`}</p>
                  <p className="pl-4">"realm_project": "{selectedProject.title}",</p>
                  <p className="pl-4">"got_code": "{selectedProject.gotCodename}",</p>
                  <p className="pl-4">"status": "{selectedProject.status}",</p>
                  <p className="pl-4">"overlord_developer": "Saurabh Panchal",</p>
                  <p className="pl-4">"forge_season": "{selectedProject.forgedYear}",</p>
                  <p className="pl-4">"materials": [</p>
                  {selectedProject.techStack.map((t, idx) => (
                    <p key={t} className="pl-8">"{t}"{idx < selectedProject.techStack.length - 1 ? ',' : ''}</p>
                  ))}
                  <p className="pl-4">]</p>
                  <p className="text-gold-hover">{`}`}</p>
                </div>

                <div className="space-y-1 pt-2">
                  <p className="text-white">$ ./test_defenses.sh</p>
                  <p className="text-emerald-500">{"[✓] SSL Shields: ENGAGED"}</p>
                  <p className="text-emerald-500">{"[✓] Valyrian TypeScript compiler: SECURED"}</p>
                  <p className="text-emerald-500">{"[✓] Wildfire Express engine loading latency: < 45ms"}</p>
                  <p className="text-amber-400">{"[!] Ravens warning queue: 0 messages pending"}</p>
                  <p className="text-stone-400"># Build succeeded. Fortress remains standing.</p>
                </div>
              </div>

              {/* Terminal Footer */}
              <div className="bg-stone-900 px-6 py-4 flex justify-between items-center border-t border-stone-800">
                <span className="font-sans text-[10px] text-stone-500">Saurabh Panchal • Castle Black Server Core v4.1</span>
                <button
                  onClick={() => setSelectedProject(null)}
                  className="px-4 py-1.5 bg-gold text-stone-950 font-display font-bold text-[10px] tracking-wider uppercase rounded cursor-pointer hover:bg-white transition-all duration-300"
                >
                  Conclude Inspection
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
