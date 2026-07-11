import React, { useState, useEffect } from 'react';
import { HouseType, Project } from '../types';
import { PROJECTS, HOUSES } from '../data';
import { StarkSigil, TargaryenSigil, LannisterSigil, NightsWatchSigil } from './HouseSigils';
import { motion, AnimatePresence } from 'motion/react';
import { Award, Github, Terminal, ArrowLeft, ArrowRight, RefreshCw, Star, GitBranch } from 'lucide-react';

interface RealmProjectsProps {
  activeHouse: HouseType;
  accentColor: string;
}

export const RealmProjects: React.FC<RealmProjectsProps> = ({ activeHouse, accentColor }) => {
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [isLoading, setIsLoading] = useState(true);
  const [syncStatus, setSyncStatus] = useState<'synced' | 'syncing' | 'fallback'>('syncing');
  const [startIndex, setStartIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(4);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewModes, setViewModes] = useState<Record<string, 'tech' | 'lore'>>({});

  // Monitor screen size for responsive carousel counts
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(4);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Fetch real repositories from GitHub and map to GoT themes
  useEffect(() => {
    let active = true;
    const fetchGithubProjects = async () => {
      try {
        setSyncStatus('syncing');
        const res = await fetch('https://api.github.com/users/saurabhpan98/repos?per_page=100&sort=pushed');
        if (!res.ok) {
          throw new Error('GitHub API response not OK');
        }
        const data = await res.json();
        
        if (!active) return;

        if (Array.isArray(data) && data.length > 0) {
          const mapped: Project[] = data.map((repo: any, idx: number) => {
            const name = repo.name || 'mystic-scroll';
            
            // Format Title
            const title = name
              .replace(/[-_]/g, ' ')
              .split(' ')
              .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
              .join(' ');

            // Deterministic Game of Thrones titles
            const GOT_CODENAMES = [
              "Braavos Vault Ledger",
              "Dracarys Patrol Grid",
              "Scroll Weaver Matrix",
              "Castle Black Shadowcomms",
              "Valyrian Guard Shield",
              "Kings Landing Garrison",
              "Harrenhal Ruin Watcher",
              "Iron Islands Longship",
              "Sunstone Sentry",
              "Winterfell Hearthfire",
              "Wildfire Combustion Core",
              "Nightfort Silent Bell"
            ];
            const gotCodename = GOT_CODENAMES[idx % GOT_CODENAMES.length];

            // Deterministic roles
            const GOT_ROLES = [
              "Grand Treasurer (Lead Architect)",
              "Dragon Lord Engineer (Spatial Specialist)",
              "Archmaester Scribe (Search Specialist)",
              "Lord Commander of Signals (Real-Time Lead)",
              "Shield of the Citadel (DevOps Master)",
              "Hand of the King (Principal Developer)",
              "Master of Whispers (Security Alchemist)",
              "Keeper of the Vaults (Database Warden)"
            ];
            const role = GOT_ROLES[idx % GOT_ROLES.length];

            // Deterministic alliance/house mapping based on repository naming
            const ALLIANCES: HouseType[] = ['stark', 'targaryen', 'lannister', 'nightswatch'];
            const lowerName = name.toLowerCase();
            let alliance: HouseType = ALLIANCES[idx % ALLIANCES.length];
            if (lowerName.includes('stark') || lowerName.includes('winter') || lowerName.includes('wolf') || lowerName.includes('north') || lowerName.includes('ice')) {
              alliance = 'stark';
            } else if (lowerName.includes('dragon') || lowerName.includes('fire') || lowerName.includes('targaryen') || lowerName.includes('red') || lowerName.includes('flame')) {
              alliance = 'targaryen';
            } else if (lowerName.includes('gold') || lowerName.includes('lannister') || lowerName.includes('lion') || lowerName.includes('bank') || lowerName.includes('ledger')) {
              alliance = 'lannister';
            } else if (lowerName.includes('crow') || lowerName.includes('wall') || lowerName.includes('black') || lowerName.includes('night') || lowerName.includes('shield')) {
              alliance = 'nightswatch';
            }

            // High-quality lore-descriptions reflecting real programming language
            const lang = repo.language || 'TypeScript';
            let loreDescription = `An ancient scroll recovered from the ruins of Valyria, preserving essential tactical secrets and computational runes of the dragon lords.`;
            if (lang === 'TypeScript') {
              loreDescription = `Commissioned by the Archmaesters of the Citadel to craft unbreakable Valyrian steel type constraints for the Seventh Kingdom.`;
            } else if (lang === 'JavaScript') {
              loreDescription = `Forged in the virtual vaults of Braavos to manage high-interest transactions and layout rendering scrolls.`;
            } else if (lang === 'Python') {
              loreDescription = `A secretive potion formulas ledger compiled in the dungeons of the Red Keep for advanced analysis and dragon flight telemetry.`;
            } else if (lang === 'Rust') {
              loreDescription = `An impenetrable fortress armor forged in the deep fires of Pyke, guaranteeing absolute safety and memory survival during winter sieges.`;
            } else if (lang === 'Go') {
              loreDescription = `A rapid raven message relay network established across the Narrow Sea to coordinate trading vessels with millisecond velocities.`;
            } else if (lang === 'HTML' || lang === 'CSS') {
              loreDescription = `A collection of royal tapestries and aesthetic seals decorated in the Great Hall of King's Landing to represent sovereign authority.`;
            }

            // Tech Stack list mapped dynamically
            const techStack: string[] = [];
            if (repo.language) {
              techStack.push(repo.language);
            }
            if (repo.topics && Array.isArray(repo.topics)) {
              repo.topics.forEach((topic: string) => {
                const cleanTopic = topic.length < 12 ? topic.charAt(0).toUpperCase() + topic.slice(1) : topic;
                if (!techStack.includes(cleanTopic) && techStack.length < 5) {
                  techStack.push(cleanTopic);
                }
              });
            }
            if (techStack.length === 0) {
              techStack.push('React', 'TypeScript', 'Tailwind CSS');
            }

            // Map year realistically based on repo creation date
            const createdYear = new Date(repo.created_at).getFullYear();
            const gotYear = 290 + (createdYear - 2018);
            const forgedYear = `${gotYear} AC`;

            // Status mapping
            let status: 'In Battle' | 'Standing Strong' | 'Citadel Approved' = 'In Battle';
            if (repo.stargazers_count > 2) {
              status = 'Citadel Approved';
            } else if (repo.forks_count > 0 || repo.archived) {
              status = 'Standing Strong';
            }

            return {
              id: name,
              title,
              gotCodename,
              description: repo.description || "A highly secured dynamic web construct forged with precision layouts and robust algorithmic barriers to defend the realm.",
              loreDescription,
              techStack,
              role,
              alliance,
              liveUrl: repo.homepage || repo.html_url,
              githubUrl: repo.html_url,
              forgedYear,
              status
            };
          });

          setProjects(mapped);
          setSyncStatus('synced');
        }
      } catch (err) {
        console.warn('GitHub API limit reached or network restricted. Standard Citadel Archive loaded.', err);
        if (active) {
          setProjects(PROJECTS);
          setSyncStatus('fallback');
        }
      } finally {
        if (active) {
          setIsLoading(false);
        }
      }
    };

    fetchGithubProjects();
    return () => {
      active = false;
    };
  }, [accentColor]);

  const toggleViewMode = (projectId: string) => {
    setViewModes((prev) => ({
      ...prev,
      [projectId]: prev[projectId] === 'tech' ? 'lore' : 'tech',
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

  const handlePrev = () => {
    setStartIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev + 1) % projects.length);
  };

  const getVisibleProjects = () => {
    if (projects.length <= visibleCount) return projects;
    const visible = [];
    for (let i = 0; i < visibleCount; i++) {
      const idx = (startIndex + i) % projects.length;
      visible.push(projects[idx]);
    }
    return visible;
  };

  return (
    <section id="projects-section" className="w-full max-w-6xl mx-auto px-4 py-16 border-b border-stone-800/40">
      
      {/* Section Header */}
      <div className="text-center mb-12 relative">
        <span className="sub-title-label block mb-2">Architectural Monoliths</span>
        <h2 className="bold-header-title text-3xl md:text-4xl lg:text-5xl tracking-[0.15em] uppercase font-black">
          THE REALM'S GREAT KEEPS
        </h2>
        <p className="font-sans text-sm md:text-base text-stone-400 max-w-xl mx-auto mt-3 italic">
          Behold the real-time keeps synced directly from Saurabh's GitHub. Hover to inspect their active defenses.
        </p>
        <div className="ornamental-line" />

        {/* Dynamic Sync Badge */}
        <div className="absolute right-4 top-0 hidden md:flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase">
          {syncStatus === 'syncing' && (
            <span className="text-amber-500 flex items-center gap-1.5">
              <RefreshCw className="w-3.5 h-3.5 animate-spin" />
              Syncing Scrolls...
            </span>
          )}
          {syncStatus === 'synced' && (
            <span className="text-emerald-400 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              GitHub Active Sync
            </span>
          )}
          {syncStatus === 'fallback' && (
            <span className="text-stone-500 flex items-center gap-1.5" title="Showing cached Keeps due to rate limits">
              ● Citadel Archive Cache
            </span>
          )}
        </div>
      </div>

      {/* Main Carousel Wrapper */}
      <div className="relative px-0 sm:px-12">
        
        {/* Left Arrow Button */}
        {projects.length > visibleCount && (
          <button
            onClick={handlePrev}
            className="hidden lg:flex absolute left-0 top-1/2 -translate-y-1/2 p-3.5 border border-stone-800 bg-stone-950/90 hover:border-gold hover:bg-stone-900 rounded-full cursor-pointer transition-all duration-300 z-10 text-stone-400 hover:text-gold hover:shadow-[0_0_15px_rgba(218,165,32,0.4)]"
            title="Inspect previous keep"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}

        {/* Right Arrow Button */}
        {projects.length > visibleCount && (
          <button
            onClick={handleNext}
            className="hidden lg:flex absolute right-0 top-1/2 -translate-y-1/2 p-3.5 border border-stone-800 bg-stone-950/90 hover:border-gold hover:bg-stone-900 rounded-full cursor-pointer transition-all duration-300 z-10 text-stone-400 hover:text-gold hover:shadow-[0_0_15px_rgba(218,165,32,0.4)]"
            title="Inspect next keep"
          >
            <ArrowRight className="w-5 h-5" />
          </button>
        )}

        {/* Projects Grid Container with motion transitions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence mode="popLayout" initial={false}>
            {getVisibleProjects().map((project: Project, idx: number) => {
              const house = HOUSES.find(h => h.id === project.alliance) || HOUSES[0];
              const currentMode = viewModes[project.id] || 'lore';
              const isLore = currentMode === 'lore';

              return (
                <motion.div
                  key={`${project.id}-${idx}`}
                  layout
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.4 }}
                  className="bg-stone-950/80 rounded-md border border-stone-800/80 hover:border-gold/50 transition-all duration-500 overflow-hidden flex flex-col justify-between shadow-2xl relative group h-[480px]"
                >
                  {/* House primary color banner trim */}
                  <div 
                    className="h-1.5 w-full transition-colors duration-500" 
                    style={{ backgroundColor: house.primaryColor }}
                  />

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Sub-Header metadata */}
                      <div className="flex justify-between items-center mb-3">
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono text-[9px] text-stone-500 uppercase tracking-widest">
                            {project.forgedYear}
                          </span>
                          <span className="text-stone-800">•</span>
                          <div className="flex items-center gap-1">
                            {getHouseSigil(project.alliance)}
                            <span className="font-display text-[9px] uppercase font-bold text-stone-400 tracking-wider">
                              {house.name.replace('House ', '')}
                            </span>
                          </div>
                        </div>
                        
                        {/* Status Label */}
                        <span className={`font-mono text-[8px] px-1.5 py-0.5 rounded border uppercase font-semibold tracking-wider ${
                          project.status === 'Citadel Approved' 
                            ? 'bg-emerald-950/20 border-emerald-800/40 text-emerald-400' 
                            : project.status === 'Standing Strong' 
                            ? 'bg-sky-950/20 border-sky-800/40 text-sky-400' 
                            : 'bg-amber-950/20 border-amber-800/40 text-amber-400'
                        }`}>
                          {project.status}
                        </span>
                      </div>

                      {/* Title & Codename */}
                      <h3 className="font-display text-base md:text-lg text-stone-100 tracking-wide font-black group-hover:text-gold transition-colors duration-300 line-clamp-2">
                        {project.title}
                      </h3>
                      <p className="font-mono text-[10px] text-gold-hover uppercase tracking-widest mt-0.5 mb-4">
                        Codename: {project.gotCodename}
                      </p>

                      {/* Mode toggle (Parchment scroll switches) */}
                      <div className="flex bg-stone-900/40 p-0.5 rounded border border-stone-900/60 max-w-full mb-4">
                        <button
                          onClick={() => toggleViewMode(project.id)}
                          className={`flex-1 py-1 text-center rounded-sm font-display text-[9px] tracking-wider uppercase cursor-pointer transition-all duration-300 ${
                            isLore 
                              ? 'bg-gold text-stone-950 font-bold' 
                              : 'text-stone-400 hover:text-stone-200'
                          }`}
                        >
                          Song (Lore)
                        </button>
                        <button
                          onClick={() => toggleViewMode(project.id)}
                          className={`flex-1 py-1 text-center rounded-sm font-display text-[9px] tracking-wider uppercase cursor-pointer transition-all duration-300 ${
                            !isLore 
                              ? 'bg-gold text-stone-950 font-bold' 
                              : 'text-stone-400 hover:text-stone-200'
                          }`}
                        >
                          Records (Tech)
                        </button>
                      </div>

                      {/* Interactive dynamic content */}
                      <div className="min-h-[140px] max-h-[180px] overflow-y-auto">
                        <AnimatePresence mode="wait">
                          {isLore ? (
                            <motion.p
                              key="lore-view"
                              initial={{ opacity: 0, x: -5 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: 5 }}
                              transition={{ duration: 0.2 }}
                              className="font-sans text-stone-300 text-xs italic leading-relaxed pl-2.5 border-l border-gold/30"
                            >
                              "{project.loreDescription}"
                            </motion.p>
                          ) : (
                            <motion.div
                              key="tech-view"
                              initial={{ opacity: 0, x: 5 }}
                              animate={{ opacity: 1, x: 0 }}
                              exit={{ opacity: 0, x: -5 }}
                              transition={{ duration: 0.2 }}
                              className="space-y-2.5 font-sans text-stone-300 text-xs"
                            >
                              <p className="leading-relaxed line-clamp-4">
                                {project.description}
                              </p>
                              <div className="text-[10px] text-stone-400 flex items-center gap-1.5 pt-0.5">
                                <Award className="w-3.5 h-3.5 text-gold shrink-0" />
                                <span className="line-clamp-1">Role: <strong className="text-stone-300">{project.role}</strong></span>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Footer - Tech Stack & Links */}
                    <div className="pt-3 border-t border-stone-900/60 mt-auto flex flex-col gap-2.5">
                      {/* Tech Badges */}
                      <div className="flex flex-wrap gap-1">
                        {project.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="font-mono text-[8px] px-1.5 py-0.5 rounded border border-stone-800/80 bg-stone-900 text-stone-400 uppercase tracking-wider"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      {/* Interaction link row */}
                      <div className="flex items-center justify-between mt-1">
                        <button
                          onClick={() => {
                            setSelectedProject(project);
                          }}
                          className="flex items-center gap-1 text-[9px] font-mono uppercase text-stone-400 hover:text-gold cursor-pointer transition-all"
                        >
                          <Terminal className="w-3.5 h-3.5" />
                          <span>Schematics</span>
                        </button>

                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-1.5 border border-stone-800 hover:border-gold rounded-full text-stone-400 hover:text-gold transition-all duration-300 flex items-center justify-center bg-stone-900/30"
                          title="Inspect GitHub repository"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      </div>
                    </div>

                  </div>

                  {/* Decorative Sigil in background of card */}
                  <div className="absolute right-3 top-12 opacity-[0.015] pointer-events-none transform scale-125 rotate-12 transition-transform duration-1000 group-hover:scale-150 group-hover:rotate-45">
                    {getHouseSigil(project.alliance)}
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Carousel controls and slide progress indicator */}
        {projects.length > visibleCount && (
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-8 px-2">
            {/* Nav Arrows (Mobile Only display or Tablet alternative layout) */}
            <div className="flex items-center gap-3">
              <button
                onClick={handlePrev}
                className="p-2 border border-stone-800 bg-stone-950 hover:border-gold hover:bg-stone-900 rounded-full text-stone-400 hover:text-gold cursor-pointer transition-all"
                title="Previous Keeps"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
              
              <span className="font-mono text-[10px] text-stone-500 uppercase tracking-widest min-w-[120px] text-center">
                Keep {startIndex + 1} - {Math.min(startIndex + visibleCount, projects.length)} of {projects.length}
              </span>

              <button
                onClick={handleNext}
                className="p-2 border border-stone-800 bg-stone-950 hover:border-gold hover:bg-stone-900 rounded-full text-stone-400 hover:text-gold cursor-pointer transition-all"
                title="Next Keeps"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Pagination Indicators (Dots) */}
            <div className="flex items-center gap-1.5 overflow-x-auto max-w-full py-2">
              {projects.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setStartIndex(i)}
                  className={`h-1 rounded-full transition-all duration-300 shrink-0 ${
                    i === startIndex 
                      ? 'w-6 bg-gold' 
                      : 'w-1.5 bg-stone-800 hover:bg-stone-600'
                  }`}
                  title={`Focus Keep ${i + 1}`}
                />
              ))}
            </div>
          </div>
        )}

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
