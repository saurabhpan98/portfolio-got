export type HouseType = 'stark' | 'targaryen' | 'lannister' | 'nightswatch';

export interface HouseInfo {
  id: HouseType;
  name: string;
  words: string;
  sigilName: string;
  primaryColor: string; // e.g. gold, red, blue, grey
  accentColor: string;
  bgGradient: string;
  stoneColor: string; // stone color texture
  description: string;
}

export interface Skill {
  name: string;
  category: 'frontend' | 'backend' | 'devops' | 'lore';
  level: number; // 1-5
  gotAnalog: string; // GoT lore counterpart
}

export interface Project {
  id: string;
  title: string;
  gotCodename: string;
  description: string;
  loreDescription: string;
  techStack: string[];
  role: string;
  alliance: HouseType;
  liveUrl?: string;
  githubUrl?: string;
  forgedYear: string;
  status: 'In Battle' | 'Standing Strong' | 'Citadel Approved';
}

export interface RavenMessage {
  id: string;
  senderName: string;
  senderTitle: string;
  senderEmail: string;
  allegiance: HouseType;
  message: string;
  timestamp: string;
}
