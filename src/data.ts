import { HouseInfo, Skill, Project } from './types';

export const HOUSES: HouseInfo[] = [
  {
    id: 'stark',
    name: 'House Stark',
    words: 'Winter is Coming',
    sigilName: 'Direwolf',
    primaryColor: '#38bdf8', // Light Blue / Ice
    accentColor: '#94a3b8',  // Slate / Silver
    bgGradient: 'from-slate-900 via-slate-800 to-zinc-900',
    stoneColor: 'border-slate-700/60 shadow-sky-500/5',
    description: 'Lords of Winterfell, Wardens of the North. Saurabh channels the resilience of the North to write sturdy, solid-as-ice code that weathers any storm or scaling bug.'
  },
  {
    id: 'targaryen',
    name: 'House Targaryen',
    words: 'Fire and Blood',
    sigilName: 'Three-Headed Dragon',
    primaryColor: '#ef4444', // Crimson / Flame
    accentColor: '#f59e0b',  // Gold / Amber
    bgGradient: 'from-neutral-950 via-stone-900 to-red-950/40',
    stoneColor: 'border-red-900/40 shadow-red-500/5',
    description: 'Rulers of Dragonstone, riders of dragons. Saurabh brings the fierce, creative wildfire of the dragon lords to cook up blazing-fast performance and innovative web solutions.'
  },
  {
    id: 'lannister',
    name: 'House Lannister',
    words: 'Hear Me Roar',
    sigilName: 'Golden Lion',
    primaryColor: '#f59e0b', // Gold
    accentColor: '#dc2626',  // Lannister Red
    bgGradient: 'from-amber-950/40 via-stone-900 to-red-950/20',
    stoneColor: 'border-amber-700/40 shadow-amber-500/5',
    description: 'Lords of Casterly Rock, Wardens of the West. "A Lannister always pays his debts." In Saurabh\'s realm, this translates to an absolute guarantee of delivering clean, high-value, robust software on schedule.'
  },
  {
    id: 'nightswatch',
    name: 'Night\'s Watch',
    words: 'The Shield That Guards the Realm',
    sigilName: 'Black Crow',
    primaryColor: '#cbd5e1', // Silver/Grey
    accentColor: '#0f172a',  // Deep Obsidian
    bgGradient: 'from-black via-zinc-950 to-neutral-900',
    stoneColor: 'border-zinc-800/80 shadow-slate-500/5',
    description: 'Sworn brothers of the Wall. Saurabh stands as the shield that guards the realm of users, fighting the wildings of cyber threats, downtime, and server memory leaks.'
  }
];

export const SKILLS: Skill[] = [
  {
    name: 'React & React Native',
    category: 'frontend',
    level: 5,
    gotAnalog: 'The Dragonglass Blade'
  },
  {
    name: 'TypeScript',
    category: 'lore',
    level: 5,
    gotAnalog: 'Valyrian Steel Types'
  },
  {
    name: 'Node.js & Express',
    category: 'backend',
    level: 5,
    gotAnalog: 'Wildfire Core Alchemist'
  },
  {
    name: 'Next.js & Vite',
    category: 'frontend',
    level: 5,
    gotAnalog: 'The Kingsroad Courier'
  },
  {
    name: 'Tailwind CSS',
    category: 'frontend',
    level: 5,
    gotAnalog: 'The Royal Weaver\'s Silk'
  },
  {
    name: 'PostgreSQL & MongoDB',
    category: 'backend',
    level: 4,
    gotAnalog: 'Casterly Rock Gold Vaults'
  },
  {
    name: 'Docker & Kubernetes',
    category: 'devops',
    level: 4,
    gotAnalog: 'The Castle Fortifications'
  },
  {
    name: 'CI/CD Pipelines',
    category: 'devops',
    level: 4,
    gotAnalog: 'The Raven Message Relay'
  },
  {
    name: 'FastAPI & Python',
    category: 'backend',
    level: 4,
    gotAnalog: 'Citadel Maester Formulas'
  },
  {
    name: 'GenAI & LLM Integration',
    category: 'lore',
    level: 4,
    gotAnalog: 'Warg Minds & Greensight'
  }
];

export const PROJECTS: Project[] = [
  {
    id: 'iron-bank-ledger',
    title: 'The Iron Bank Ledger',
    gotCodename: 'Braavos Vault Ledger',
    description: 'A highly secure financial ledger dashboard built for auditing, transaction visualizers, double-entry ledgers, and secure wealth management panels.',
    loreDescription: 'Forged for the Iron Bank of Braavos to manage high-interest loans for kings and nobles. Uses triple-signed security scrolls, real-time dragon exchange rates, and interactive gold charts.',
    techStack: ['React', 'Node.js', 'PostgreSQL', 'Chart.js', 'Tailwind CSS'],
    role: 'Grand Treasurer (Lead Full Stack Developer)',
    alliance: 'lannister',
    liveUrl: '#',
    githubUrl: '#',
    forgedYear: '298 AC',
    status: 'Citadel Approved'
  },
  {
    id: 'dragon-aerial-radar',
    title: 'Dragonstone Aerial Radar',
    gotCodename: 'Dracarys Patrol Grid',
    description: 'An interactive real-time spatial positioning system featuring live movement coordinates, geographic tracking, and weather-shield calculations.',
    loreDescription: 'Crafted under Queen Daenerys to monitor dragon patrol routes over Blackwater Bay and coordinate Targaryen navy fleets with millisecond precision.',
    techStack: ['React', 'WebSockets', 'Leaflet Map', 'Vite', 'Tailwind CSS'],
    role: 'Dragon Lord Engineer (Front-End & GIS Specialist)',
    alliance: 'targaryen',
    liveUrl: '#',
    githubUrl: '#',
    forgedYear: '299 AC',
    status: 'Standing Strong'
  },
  {
    id: 'citadel-archive-search',
    title: 'The Citadel Archive Search',
    gotCodename: 'Scroll Weaver AI',
    description: 'An intelligent semantic search engine utilizing Vector Databases and Large Language Models to index, summarize, and cross-reference multi-format historical scrolls.',
    loreDescription: 'Built for the Archmaesters of Oldtown to extract cures for Greyscale and histories of the First Men from millions of dusty parchment pages using semantic warg-vision.',
    techStack: ['FastAPI', 'Gemini API', 'ChromaDB', 'React', 'TypeScript'],
    role: 'Archmaester coder (AI & RAG Engineer)',
    alliance: 'stark',
    liveUrl: '#',
    githubUrl: '#',
    forgedYear: '300 AC',
    status: 'Citadel Approved'
  },
  {
    id: 'ranger-raven-link',
    title: 'Ranger Raven Link',
    gotCodename: 'Castle Black Shadowcomms',
    description: 'A lightweight, secure peer-to-peer real-time communication portal featuring low-latency text channels, media attachment uploads, and offline queuing buffers.',
    loreDescription: 'Constructed for the sworn brothers of the Night\'s Watch to send silent encrypted warnings of White Walker activities back to Castle Black, even during extreme blizzards.',
    techStack: ['Next.js', 'Socket.io', 'Redis', 'WebRTC', 'Tailwind CSS'],
    role: 'Lord Commander of Signals (Real-time Specialist)',
    alliance: 'nightswatch',
    liveUrl: '#',
    githubUrl: '#',
    forgedYear: '301 AC',
    status: 'In Battle'
  }
];
