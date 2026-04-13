import React from 'react';

export default function Logo({ size = 38, className = '' }) {
  const id = `bulb_${size}`;
  return (
    <svg width={size} height={size} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <defs>
        {/* Radial gradient for bulb glow - shows illumination */}
        <radialGradient id={`${id}_bulb`} cx="45%" cy="35%">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#FFA500" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FF6B6B" stopOpacity="0.2" />
        </radialGradient>

        {/* Blue-Violet gradient for outline */}
        <linearGradient id={`${id}_outline`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1A56DB" />
          <stop offset="100%" stopColor="#7C3AED" />
        </linearGradient>

        {/* Intense glow filter for bulb lightness */}
        <filter id={`${id}_glow`}>
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>

        {/* Light emission effect */}
        <filter id={`${id}_emission`}>
          <feGaussianBlur stdDeviation="1.5" />
        </filter>
      </defs>

      {/* Radiating light rays - showing ideas spreading */}
      <g opacity="0.4" stroke={`url(#${id}_outline)`} strokeWidth="0.8" strokeLinecap="round">
        {/* 8 rays radiating outward */}
        <line x1="24" y1="2" x2="24" y2="6" />
        <line x1="34" y1="8" x2="31" y2="11" />
        <line x1="42" y1="24" x2="38" y2="24" />
        <line x1="34" y1="40" x2="31" y2="37" />
        <line x1="24" y1="46" x2="24" y2="42" />
        <line x1="14" y1="40" x2="17" y2="37" />
        <line x1="6" y1="24" x2="10" y2="24" />
        <line x1="14" y1="8" x2="17" y2="11" />
      </g>

      {/* Main lightbulb - glass bulb shape */}
      <g>
        {/* Bulb outline stroke */}
        <path
          d="M 16 18 C 14 20 13 23 13 26 C 13 32 17.5 37 24 37 C 30.5 37 35 32 35 26 C 35 23 34 20 32 18 C 31 16 30 14.5 30 13 C 30 10 27 8 24 8 C 21 8 18 10 18 13 C 18 14.5 17 16 16 18 Z"
          fill={`url(#${id}_bulb)`}
          stroke={`url(#${id}_outline)`}
          strokeWidth="1.5"
          filter={`url(#${id}_glow)`}
          opacity="0.9"
        />

        {/* Inner light highlight - shows glass shine */}
        <ellipse
          cx="20"
          cy="15"
          rx="3"
          ry="4"
          fill="white"
          opacity="0.4"
          filter={`url(#${id}_emission)`}
        />
      </g>

      {/* Lightbulb base/socket - threaded metal part */}
      <g stroke={`url(#${id}_outline)`} strokeWidth="1" fill="none">
        {/* Base cylinder */}
        <rect x="18" y="36" width="12" height="6" fill="#1A56DB" opacity="0.3" stroke={`url(#${id}_outline)`} strokeWidth="1" />
        
        {/* Threading lines on base */}
        <line x1="18" y1="39" x2="30" y2="39" opacity="0.5" />
        <line x1="18" y1="41" x2="30" y2="41" opacity="0.5" />
      </g>

      {/* Idea sparkles - showing creative energy */}
      <g fill={`url(#${id}_outline)`} opacity="0.5">
        {/* Top-right sparkle */}
        <circle cx="38" cy="12" r="1" />
        {/* Bottom-left sparkle */}
        <circle cx="10" cy="34" r="1" />
        {/* Small accent sparkles */}
        <circle cx="35" cy="8" r="0.6" />
        <circle cx="13" cy="38" r="0.6" />
      </g>
    </svg>
  );
}
