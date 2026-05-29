"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const EXPERTISE = [
  "JavaScript (ES6+)",
  "TypeScript",
  "React / Next.js",
  "GSAP / Three.js",
  "Node.js",
  "WebGL / GLSL",
  "UI / UX Design",
  "System Design",
  "Performance"
];

export default function Marquee() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const items = containerRef.current.children;
    const totalWidth = containerRef.current.scrollWidth / 2;

    gsap.to(containerRef.current, {
      x: -totalWidth,
      ease: "none",
      duration: 25,
      repeat: -1,
      modifiers: {
        x: gsap.utils.unitize(x => parseFloat(x) % totalWidth)
      }
    });
  }, []);

  return (
    <div className="w-full overflow-hidden bg-[#0F0F0F]/40 border-t border-b border-[#C0C0C0]/10 py-4 flex items-center relative h-[60px] backdrop-blur-md">
      <div className="absolute left-6 md:left-12 z-10 glass-panel px-4 py-1.5 flex items-center gap-3 shadow-[10px_0_20px_#050505]">
        <div className="w-5 h-5 rounded-full border border-[#C0C0C0]/20 flex items-center justify-center font-display text-[8px] text-[#F5F5F0]">RK</div>
        <span className="font-mono text-[10px] uppercase tracking-widest text-[#F5F5F0]">Expertise</span>
      </div>

      <div 
        ref={containerRef} 
        className="flex whitespace-nowrap items-center w-max pl-[200px]"
      >
        {/* Double array for infinite scroll */}
        {[...EXPERTISE, ...EXPERTISE].map((item, idx) => (
          <div key={idx} className="flex items-center">
            <span className="mx-6 text-[#C0C0C0]/40 font-mono text-xs">→</span>
            <span className="font-sans text-xs tracking-widest uppercase text-[#8A8A85] hover:text-[#F5F5F0] transition-colors cursor-default">
              {item}
            </span>
          </div>
        ))}
      </div>
      
      {/* Right fade out gradient */}
      <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-[#050505] to-transparent pointer-events-none z-10 flex items-center justify-end pr-6">
        <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
      </div>
    </div>
  );
}
