import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "w-full h-full" }) => {
  return (
    <svg 
      viewBox="0 0 400 400" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg" 
      className={className}
    >
      <defs>
        {/* Soft luxurious emerald-teal gradient for the human and leaf body */}
        <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0B4D3E" />
          <stop offset="30%" stopColor="#117964" />
          <stop offset="70%" stopColor="#14836B" />
          <stop offset="100%" stopColor="#063E32" />
        </linearGradient>
        {/* Elegant gold metallic gradient for outlines, veins, framing arcs, and spiritual dots */}
        <linearGradient id="goldGrad" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#C5A059" />
          <stop offset="50%" stopColor="#F1E2BF" />
          <stop offset="100%" stopColor="#C19A50" />
        </linearGradient>
      </defs>

      {/* Elegant thin golden arcs framing the sides */}
      {/* Left outer thin gold arc */}
      <path 
        d="M 150 245 C 100 215, 105 145, 145 110" 
        stroke="url(#goldGrad)" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        fill="none"
      />
      {/* Right outer thin gold arc */}
      <path 
        d="M 250 245 C 300 215, 295 145, 255 110" 
        stroke="url(#goldGrad)" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        fill="none"
      />

      {/* Center inner gold framing accents */}
      {/* Left inner accent */}
      <path 
        d="M 172 225 C 130 185, 150 115, 182 92" 
        stroke="url(#goldGrad)" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
        fill="none" 
      />
      {/* Right inner accent */}
      <path 
        d="M 228 225 C 270 185, 250 115, 218 92" 
        stroke="url(#goldGrad)" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
        fill="none" 
      />

      {/* 5 spiritual golden dots vertically stacked above head, decreasing in size */}
      <circle cx="200" cy="80" r="5.0" fill="url(#goldGrad)" />
      <circle cx="200" cy="66" r="4.0" fill="url(#goldGrad)" />
      <circle cx="200" cy="54" r="3.1" fill="url(#goldGrad)" />
      <circle cx="200" cy="44" r="2.2" fill="url(#goldGrad)" />
      <circle cx="200" cy="35" r="1.4" fill="url(#goldGrad)" />

      {/* Symmetrical leaves pointing outwards at the bottom */}
      {/* Left organic leaf */}
      <path 
        d="M 200 275 C 155 265, 115 225, 110 155 C 145 170, 185 210, 200 275 Z" 
        fill="url(#emeraldGrad)" 
      />
      {/* Left leaf golden spine/vein */}
      <path 
        d="M 200 275 C 172 225, 142 190, 125 178" 
        stroke="url(#goldGrad)" 
        strokeWidth="2" 
        strokeLinecap="round" 
        fill="none" 
      />

      {/* Right organic leaf */}
      <path 
        d="M 200 275 C 245 265, 285 225, 290 155 C 255 170, 215 210, 200 275 Z" 
        fill="url(#emeraldGrad)" 
      />
      {/* Right leaf golden spine/vein */}
      <path 
        d="M 200 275 C 228 225, 258 190, 275 178" 
        stroke="url(#goldGrad)" 
        strokeWidth="2" 
        strokeLinecap="round" 
        fill="none" 
      />

      {/* Center stylized medical/holistic human figure inside the flame */}
      {/* Head of the figure */}
      <circle cx="200" cy="110" r="10" fill="url(#emeraldGrad)" />

      {/* Stylized body curving from the center leaf stalk up to arms raised */}
      <path 
        d="M 200 275 
           C 190 235, 188 205, 196 178 
           C 188 172, 180 155, 176 135 
           C 174 125, 176 110, 178 102 
           C 181 113, 186 123, 194 135 
           C 196 142, 197 150, 198 158 
           C 202 158, 204 142, 206 135 
           C 214 123, 219 113, 222 102 
           C 224 110, 226 125, 224 135 
           C 220 155, 212 172, 204 178 
           C 212 205, 210 235, 200 275 Z" 
        fill="url(#emeraldGrad)" 
      />
    </svg>
  );
};
