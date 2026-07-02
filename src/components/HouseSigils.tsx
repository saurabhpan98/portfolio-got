import React from 'react';

interface SigilProps {
  className?: string;
  color?: string;
  glow?: boolean;
}

export const StarkSigil: React.FC<SigilProps> = ({ className = 'w-24 h-24', color = 'currentColor', glow = false }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className} transition-all duration-500`}
      style={glow ? { filter: `drop-shadow(0 0 12px ${color}80)` } : {}}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background shield/circle outline */}
      <circle cx="50" cy="50" r="46" stroke={color} strokeWidth="1" strokeDasharray="3,3" opacity="0.4" />
      <circle cx="50" cy="50" r="42" stroke={color} strokeWidth="1" opacity="0.2" />
      
      {/* Direwolf Head Silhouette */}
      <path
        d="M 15 45 
           C 20 40, 28 35, 38 34 
           C 32 40, 31 46, 33 50 
           C 35 48, 41 45, 45 40 
           C 40 45, 42 53, 44 56 
           C 46 54, 52 50, 56 45 
           C 51 51, 52 57, 54 60 
           C 56 59, 62 55, 68 47 
           C 65 52, 65 57, 67 61 
           C 71 58, 77 50, 85 35
           C 82 45, 78 52, 74 58
           C 70 64, 62 70, 52 75
           C 48 77, 42 77, 36 78
           C 28 79, 21 76, 17 71
           C 15 69, 14 65, 14 62
           C 14 59, 12 55, 10 52
           C 12 51, 14 50, 15 45 Z"
        fill={color}
        fillRule="evenodd"
        className="transition-colors duration-500"
      />
      
      {/* Sharp eye */}
      <polygon points="32,44 35,44 34,46" fill="#1e293b" />
      
      {/* Snout and jaws */}
      <path
        d="M 10 52 C 11 53, 14 55, 14 58 C 14 60, 16 62, 18 61"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      
      {/* Fangs details */}
      <path d="M 14 58 L 15 56 M 16 59 L 17 57" stroke={color} strokeWidth="1" />
      
      {/* Nordic rune markings or decorative lines */}
      <path d="M 50 8 C 50 8, 45 15, 40 15 M 50 8 C 50 8, 55 15, 60 15" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M 50 92 C 50 92, 45 85, 40 85 M 50 92 C 50 92, 55 85, 60 85" stroke={color} strokeWidth="1" opacity="0.3" />
    </svg>
  );
};

export const TargaryenSigil: React.FC<SigilProps> = ({ className = 'w-24 h-24', color = 'currentColor', glow = false }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className} transition-all duration-500`}
      style={glow ? { filter: `drop-shadow(0 0 12px ${color}80)` } : {}}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="46" stroke={color} strokeWidth="1" strokeDasharray="5,3" opacity="0.4" />
      <circle cx="50" cy="50" r="42" stroke={color} strokeWidth="1" opacity="0.2" />

      {/* Coiling Three-Headed Dragon Silhouette */}
      <g fill={color} className="transition-colors duration-500">
        {/* Main Body Coils */}
        <path d="M 50 25 C 65 25, 75 35, 75 50 C 75 65, 65 75, 50 75 C 35 75, 25 65, 25 50 C 25 40, 32 30, 42 27 C 36 32, 34 40, 36 48 C 38 56, 45 62, 53 62 C 61 62, 67 55, 67 47 C 67 39, 60 32, 50 32 C 45 32, 42 35, 40 38 C 42 34, 46 30, 50 25 Z" fillRule="evenodd" />
        
        {/* Left Dragon Head */}
        <path d="M 32 32 C 28 28, 22 25, 17 28 C 14 30, 15 35, 18 37 C 21 39, 25 38, 27 39 C 25 42, 21 44, 18 47 C 22 47, 26 44, 29 42 C 30 40, 31 36, 32 32 Z" />
        
        {/* Center Dragon Head */}
        <path d="M 50 28 C 50 22, 46 14, 50 8 C 54 14, 50 22, 50 28 Z M 48 18 C 43 16, 39 12, 42 7 C 45 11, 47 15, 48 18 Z M 52 18 C 57 16, 61 12, 58 7 C 55 11, 53 15, 52 18 Z" />
        
        {/* Right Dragon Head */}
        <path d="M 68 32 C 72 28, 78 25, 83 28 C 86 30, 85 35, 82 37 C 79 39, 75 38, 73 39 C 75 42, 79 44, 82 47 C 78 47, 74 44, 71 42 C 70 40, 69 36, 68 32 Z" />
        
        {/* Dragon Tail Spike */}
        <path d="M 50 72 L 47 85 L 50 92 L 53 85 L 50 72 Z" />
        <path d="M 44 71 L 34 81 L 39 84 L 44 71 Z" />
        <path d="M 56 71 L 66 81 L 61 84 L 56 71 Z" />
      </g>
    </svg>
  );
};

export const LannisterSigil: React.FC<SigilProps> = ({ className = 'w-24 h-24', color = 'currentColor', glow = false }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className} transition-all duration-500`}
      style={glow ? { filter: `drop-shadow(0 0 12px ${color}80)` } : {}}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="50" cy="50" r="46" stroke={color} strokeWidth="1" strokeDasharray="1,2" opacity="0.5" />
      {/* Traditional Shield shape in background */}
      <path d="M 50 12 C 65 12, 78 16, 78 35 C 78 58, 64 78, 50 88 C 36 78, 22 58, 22 35 C 22 16, 35 12, 50 12 Z" stroke={color} strokeWidth="0.75" opacity="0.3" />

      {/* Lion Rampant Silhouette */}
      <path
        d="M 52 24 
           C 54 21, 58 20, 61 22
           C 59 24, 57 26, 56 28
           C 61 27, 65 29, 68 32
           C 65 33, 61 32, 58 33
           C 61 36, 62 40, 60 44
           C 57 41, 55 38, 53 36
           C 54 42, 52 48, 48 51
           C 51 53, 56 50, 60 47
           C 62 49, 60 52, 57 54
           C 53 56, 49 55, 46 54
           C 48 59, 52 64, 57 67
           C 61 65, 63 60, 65 55
           C 67 57, 65 62, 61 68
           C 56 73, 50 75, 44 75
           C 38 75, 34 71, 33 65
           C 32 58, 35 50, 38 43
           C 36 41, 32 40, 28 42
           C 30 38, 34 37, 38 38
           C 39 34, 42 29, 46 26
           C 48 28, 49 32, 48 35
           C 50 31, 51 27, 52 24 Z"
        fill={color}
        fillRule="evenodd"
        className="transition-colors duration-500"
      />
      
      {/* Majestic Coiled Tail */}
      <path
        d="M 33 65 C 27 64, 21 57, 19 49 C 18 43, 21 37, 25 35 C 24 38, 22 41, 22 44 C 22 51, 26 56, 30 59"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        className="transition-colors duration-500"
      />
      <path d="M 25 35 C 27 34, 29 32, 30 30" stroke={color} strokeWidth="1" />
      
      {/* Claws detail */}
      <path d="M 68 32 L 71 31 M 57 54 L 60 55 M 65 55 L 68 54" stroke={color} strokeWidth="1" />
    </svg>
  );
};

export const NightsWatchSigil: React.FC<SigilProps> = ({ className = 'w-24 h-24', color = 'currentColor', glow = false }) => {
  return (
    <svg
      viewBox="0 0 100 100"
      className={`${className} transition-all duration-500`}
      style={glow ? { filter: `drop-shadow(0 0 12px ${color}80)` } : {}}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Dynamic heavy geometric boundaries */}
      <rect x="12" y="12" width="76" height="76" stroke={color} strokeWidth="1" strokeDasharray="8,4" opacity="0.3" />
      <rect x="16" y="16" width="68" height="68" stroke={color} strokeWidth="0.5" opacity="0.1" />

      {/* The Wall Silhouette in Background */}
      <path d="M 10 75 Q 30 72, 50 76 T 90 73 L 90 90 L 10 90 Z" fill={color} opacity="0.15" />
      <path d="M 10 75 Q 30 72, 50 76 T 90 73" stroke={color} strokeWidth="1" opacity="0.4" />

      {/* Raven / Crow silhouette descending / spreading wings */}
      <g fill={color} className="transition-colors duration-500">
        {/* Core Body & Head */}
        <path d="M 50 32 C 48 32, 46 29, 46 26 C 46 23, 49 20, 50 16 C 51 20, 54 23, 54 26 C 54 29, 52 32, 50 32 Z" fillRule="evenodd" />
        <path d="M 50 32 C 46 36, 44 44, 44 54 C 44 62, 47 68, 50 74 C 53 68, 56 62, 56 54 C 56 44, 54 36, 50 32 Z" />
        
        {/* Beak */}
        <polygon points="50,16 48,12 50,14" />
        
        {/* Feathery wings left */}
        <path d="M 45 36 C 35 30, 24 28, 12 32 C 22 36, 32 42, 38 50 C 30 48, 22 47, 14 49 C 24 53, 33 58, 38 64 C 30 63, 22 63, 16 66 C 24 70, 32 74, 42 75 C 43 68, 44 55, 45 36 Z" />
        
        {/* Feathery wings right */}
        <path d="M 55 36 C 65 30, 76 28, 88 32 C 78 36, 68 42, 62 50 C 70 48, 78 47, 86 49 C 76 53, 67 58, 62 64 C 70 63, 78 63, 84 66 C 76 70, 68 74, 58 75 C 57 68, 56 55, 55 36 Z" />
        
        {/* Fan Tail */}
        <path d="M 50 74 L 44 86 L 50 92 L 56 86 Z" />
      </g>
    </svg>
  );
};
