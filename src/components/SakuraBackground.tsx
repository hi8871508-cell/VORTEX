// src/components/SakuraBackground.tsx
import React from "react";

export const SakuraBackground: React.FC = () => {
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none">
      {/* Deep esports night backdrop with soft atmospheric gradients */}
      <div className="absolute inset-0 bg-[#0c0a17]" />
      
      {/* Top subtle magenta/purple ambient bloom */}
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-gradient-to-b from-pink-600/10 via-purple-600/5 to-transparent rounded-full blur-3xl" />
      
      {/* Subtle cherry blossom silhouettes like the screenshot */}
      <svg
        className="absolute top-0 right-0 w-full h-full opacity-15 max-w-2xl translate-x-1/4 pointer-events-none"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 600 900"
        fill="none"
      >
        <path
          d="M480 -50 C 460 120, 390 220, 420 380 C 440 500, 360 620, 380 750"
          stroke="#ec4899"
          strokeWidth="1.5"
          strokeDasharray="4 4"
          opacity="0.4"
        />
        <path
          d="M520 20 C 490 180, 430 300, 460 480 C 480 620, 400 750, 420 900"
          stroke="#a855f7"
          strokeWidth="1"
          opacity="0.3"
        />
        
        {/* Blossom clusters matching Screenshot 1 & 2 */}
        <g fill="#ec4899" opacity="0.5">
          {/* Flower 1 */}
          <circle cx="430" cy="180" r="14" />
          <circle cx="415" cy="170" r="12" />
          <circle cx="445" cy="170" r="12" />
          <circle cx="420" cy="195" r="12" />
          <circle cx="440" cy="195" r="12" />
          <circle cx="430" cy="182" r="6" fill="#fbcfe8" />

          {/* Flower 2 */}
          <circle cx="395" cy="340" r="16" />
          <circle cx="380" cy="330" r="14" />
          <circle cx="410" cy="330" r="14" />
          <circle cx="385" cy="355" r="14" />
          <circle cx="405" cy="355" r="14" />
          <circle cx="395" cy="342" r="7" fill="#fbcfe8" />

          {/* Flower 3 */}
          <circle cx="440" cy="520" r="15" />
          <circle cx="425" cy="510" r="13" />
          <circle cx="455" cy="510" r="13" />
          <circle cx="430" cy="535" r="13" />
          <circle cx="450" cy="535" r="13" />
          <circle cx="440" cy="522" r="6" fill="#fbcfe8" />

          {/* Flower 4 */}
          <circle cx="370" cy="680" r="18" />
          <circle cx="350" cy="670" r="15" />
          <circle cx="390" cy="670" r="15" />
          <circle cx="355" cy="700" r="15" />
          <circle cx="385" cy="700" r="15" />
          <circle cx="370" cy="685" r="8" fill="#fbcfe8" />
        </g>

        {/* Drifting petals */}
        <g fill="#f43f5e" opacity="0.45">
          <ellipse cx="360" cy="240" rx="8" ry="4" transform="rotate(25 360 240)" />
          <ellipse cx="460" cy="290" rx="7" ry="3.5" transform="rotate(-15 460 290)" />
          <ellipse cx="320" cy="410" rx="9" ry="4" transform="rotate(40 320 410)" />
          <ellipse cx="440" cy="450" rx="6" ry="3" transform="rotate(-30 440 450)" />
          <ellipse cx="340" cy="590" rx="8" ry="4" transform="rotate(15 340 590)" />
          <ellipse cx="420" cy="630" rx="7" ry="3.5" transform="rotate(-45 420 630)" />
          <ellipse cx="300" cy="780" rx="8" ry="4" transform="rotate(30 300 780)" />
        </g>
      </svg>
    </div>
  );
};
