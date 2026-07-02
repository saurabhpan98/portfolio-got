import React from 'react';
import { HouseType } from '../types';
import { motion } from 'motion/react';
import { BookOpen, GraduationCap, Calendar, Compass, Shield, Sword, Award } from 'lucide-react';

interface CitadelStudiesProps {
  activeHouse: HouseType;
  accentColor: string;
}

interface CampaignItem {
  id: string;
  role: string;
  gotRole: string;
  company: string;
  gotCompany: string;
  period: string;
  location: string;
  achievements: string[];
  skillsForged: string[];
}

interface StudyItem {
  id: string;
  degree: string;
  gotDegree: string;
  institution: string;
  gotInstitution: string;
  period: string;
  honors: string;
  description: string;
}

const CAMPAIGNS: CampaignItem[] = [
  {
    id: 'exp1',
    role: 'Senior Full Stack Engineer',
    gotRole: 'Chief Systems Alchemist (Senior Full Stack Developer)',
    company: 'House of Tech',
    gotCompany: 'The Royal Guild of Code Smiths',
    period: '2024 - Present (305 AC)',
    location: 'King\'s Landing (Remote)',
    achievements: [
      'Led a squadron of 6 apprentice coders to build and defend high-volume web systems, improving speed by 35%.',
      'Engineered scalable microservice towers, reinforcing them with Docker garrisons and load-balancer shield walls.',
      'Designed real-time interactive trading boards handling high-frequency gold and copper trades for global banks.'
    ],
    skillsForged: ['React', 'Next.js', 'Kubernetes', 'FastAPI', 'Node.js']
  },
  {
    id: 'exp2',
    role: 'Software Engineer',
    gotRole: 'Royal Scribe & Treasurer (Full Stack Developer)',
    company: 'Fintech Solutions',
    gotCompany: 'The Iron Treasury of Braavos',
    period: '2022 - 2024 (303 - 305 AC)',
    location: 'Braavos Vaults',
    achievements: [
      'Scribed secure digital double-entry ledgers, auditing gold-rate fluctuations with millisecond cryptographic seals.',
      'Refactored legacy ledger scripts, replacing corrupt scrolls with highly optimized TypeScript blades, saving 40% in server maintenance costs.',
      'Established high-speed Raven Dispatch servers using Redis and WebSocket channels for instant notification of loans.'
    ],
    skillsForged: ['React', 'TypeScript', 'PostgreSQL', 'Redis', 'Socket.io']
  },
  {
    id: 'exp3',
    role: 'Associate Software Developer',
    gotRole: 'Squire Coder & Script Repairer',
    company: 'Oldtown Softwares',
    gotCompany: 'The Oldtown Laboratory Guild',
    period: '2020 - 2022 (301 - 303 AC)',
    location: 'The Citadel Scriptorium',
    achievements: [
      'Maintained massive archive search queries, indexing ancient books and records with Elasticsearch query formulas.',
      'Fixed hundreds of critical memory leaks and server crashes that threatened to freeze communications across the realm.',
      'Created custom layout templates and UI grids for internal Maesters, resulting in a 50% increase in research data efficiency.'
    ],
    skillsForged: ['JavaScript', 'HTML/CSS', 'Express.js', 'MongoDB', 'Git']
  }
];

const STUDIES: StudyItem[] = [
  {
    id: 'edu1',
    degree: 'Bachelor of Technology in Computer Science & Engineering',
    gotDegree: 'Grand Scholar of Computational Alchemy (B.Tech in CSE)',
    institution: 'Royal University',
    gotInstitution: 'The High Citadel of Oldtown — Order of the Obsidian Chain',
    period: '2016 - 2020 (297 - 301 AC)',
    honors: 'First Class with High distinction',
    description: 'Spent four winters in the Great Citadel, studying the sacred laws of silicon structures, memory storage scrolls, multi-thread sorcery, and algorithm structures.'
  },
  {
    id: 'edu2',
    degree: 'Specialized Certification in Advanced Cloud & Systems Architectures',
    gotDegree: 'Forge Apprentice of the Valyrian Guild (Cloud Certification)',
    institution: 'Citadel Forge Labs',
    gotInstitution: 'The Valyrian Academy of Systems Engineering',
    period: '2021 (302 AC)',
    honors: 'Valyrian Steel Seal Certified',
    description: 'Mastered the forge of complex high-availability castle infrastructure, cloud deployment pathways, and automated deployment ravens.'
  }
];

export const CitadelStudies: React.FC<CitadelStudiesProps> = ({ activeHouse, accentColor }) => {
  return (
    <section id="campaigns-section" className="w-full max-w-5xl mx-auto px-4 py-16 border-b border-stone-800/40">
      
      {/* Section Header */}
      <div className="text-center mb-12">
        <span className="sub-title-label block mb-2">Service Records</span>
        <h2 className="bold-header-title text-3xl md:text-4xl lg:text-5xl tracking-[0.15em] uppercase font-black">
          CAMPAIGNS & CITADEL STUDIES
        </h2>
        <p className="font-sans text-sm md:text-base text-stone-400 max-w-xl mx-auto mt-3 italic">
          Behold Saurabh's verified campaigns under the Great Houses, alongside his academic training at the High Citadel.
        </p>
        <div className="ornamental-line" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        
        {/* Left: Professional Experience / Campaigns Timeline (8 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex items-center gap-2.5 mb-4 text-left">
            <Sword className="w-5 h-5" style={{ color: accentColor }} />
            <h3 className="font-display text-xl text-[#f3e5ab] tracking-[0.1em] font-extrabold uppercase">
              CAMPAIGNS & SIEGES (EXPERIENCE)
            </h3>
          </div>

          <p className="font-sans text-sm text-stone-400 text-left mb-6">
            Chronological records of active military campaigns in software guilds:
          </p>

          {/* Timeline Layout */}
          <div className="relative border-l-2 border-stone-800 pl-6 space-y-8 text-left">
            {CAMPAIGNS.map((camp, idx) => {
              return (
                <motion.div 
                  key={camp.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="relative group"
                >
                  {/* Timeline bullet */}
                  <div 
                    className="absolute -left-[31px] top-1 w-4 h-4 rounded-full border-2 border-stone-950 bg-stone-900 flex items-center justify-center transition-all duration-300 group-hover:scale-125"
                    style={{ borderColor: accentColor }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: accentColor }} />
                  </div>

                  {/* Header info */}
                  <div className="mb-2">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-stone-500 block">
                      {camp.period} • {camp.location}
                    </span>
                    <h4 className="font-display text-base md:text-lg font-black text-white uppercase tracking-wide group-hover:text-gold transition-colors">
                      {camp.gotRole}
                    </h4>
                    <p className="font-sans text-xs text-gold-hover font-bold italic mt-0.5">
                      {camp.gotCompany} <span className="text-stone-500 font-normal">({camp.company})</span>
                    </p>
                  </div>

                  {/* Achievements list */}
                  <ul className="space-y-1.5 font-sans text-stone-300 text-sm list-inside list-disc">
                    {camp.achievements.map((ach, aIdx) => (
                      <li key={aIdx} className="leading-relaxed hover:text-white transition-colors pl-1">
                        {ach}
                      </li>
                    ))}
                  </ul>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {camp.skillsForged.map((skill) => (
                      <span 
                        key={skill}
                        className="font-mono text-[9px] px-2 py-0.5 bg-stone-950/60 border border-stone-900 rounded uppercase text-stone-400"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Right: Education (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="flex items-center gap-2.5 mb-4 justify-start">
            <GraduationCap className="w-5 h-5" style={{ color: accentColor }} />
            <h3 className="font-display text-xl text-[#f3e5ab] tracking-[0.1em] font-extrabold uppercase">
              CITADEL ACADEMICS (EDUCATION)
            </h3>
          </div>

          <p className="font-sans text-sm text-stone-400 text-left mb-6">
            The scrolls of academic training and scholarly ranks awarded:
          </p>

          <div className="space-y-6 text-left">
            {STUDIES.map((study, idx) => {
              return (
                <motion.div
                  key={study.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="bg-stone-950/40 border border-stone-900 rounded-md p-5 relative overflow-hidden group hover:border-stone-800 transition-colors"
                >
                  {/* Decorative book watermark */}
                  <div className="absolute right-3 bottom-3 opacity-[0.02] group-hover:opacity-[0.06] transition-opacity duration-300">
                    <BookOpen className="w-16 h-16 text-white" />
                  </div>

                  <div className="flex justify-between items-start mb-2">
                    <span className="font-mono text-[9px] uppercase tracking-wider text-stone-500">
                      {study.period}
                    </span>
                    <div className="flex items-center gap-1 font-mono text-[9px] text-gold-hover border border-gold/20 px-1.5 py-0.5 rounded uppercase">
                      <Award className="w-3 h-3" />
                      {study.honors}
                    </div>
                  </div>

                  <h4 className="font-display text-sm font-black text-white uppercase tracking-wide leading-snug">
                    {study.gotDegree}
                  </h4>
                  
                  <p className="font-sans text-xs text-stone-400 font-bold mt-1">
                    {study.gotInstitution}
                  </p>
                  
                  <p className="font-sans text-xs text-stone-500 mt-0.5 italic">
                    ({study.degree} @ {study.institution})
                  </p>

                  <p className="font-sans text-stone-300 text-xs mt-3 leading-relaxed border-t border-stone-900/60 pt-3 italic">
                    "{study.description}"
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
