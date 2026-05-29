"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { MoveRight, Code, Sparkles, Zap, Layers, Cpu, Globe } from "lucide-react";

// Placeholder items for the marquee
const PLAYGROUND_ITEMS = [
  { id: 1, title: "Generative AI UI", icon: <Cpu className="w-5 h-5" />, category: "Experiment" },
  { id: 2, title: "WebGL Shaders", icon: <Layers className="w-5 h-5" />, category: "Visuals" },
  { id: 3, title: "Micro-Interactions", icon: <Zap className="w-5 h-5" />, category: "UX Design" },
  { id: 4, title: "3D Particles", icon: <Sparkles className="w-5 h-5" />, category: "Three.js" },
  { id: 5, title: "Custom Hooks", icon: <Code className="w-5 h-5" />, category: "React" },
  { id: 6, title: "Spatial Computing", icon: <Globe className="w-5 h-5" />, category: "AR/VR" },
];

export function Playground() {
  const marqueeRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!marqueeRef.current) return;
    
    // GSAP horizontal scroll loop
    const marquee = marqueeRef.current;
    
    const animation = gsap.to(marquee, {
      xPercent: -50,
      ease: "none",
      duration: 30, // Adjusted duration for smooth continuous scrolling
      repeat: -1,
    });

    // Pause animation on hover for better user experience
    const handleMouseEnter = () => animation.pause();
    const handleMouseLeave = () => animation.play();

    marquee.addEventListener("mouseenter", handleMouseEnter);
    marquee.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      animation.kill();
      marquee.removeEventListener("mouseenter", handleMouseEnter);
      marquee.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section className="relative py-32 bg-[#050505] overflow-hidden border-t border-white/5">
      {/* Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-white/[0.02] blur-[100px] rounded-full pointer-events-none" />
      
      <div className="container mx-auto px-6 mb-16 relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="max-w-xl">
            <h2 className="text-4xl md:text-5xl font-light tracking-tight text-white mb-4">
              <span className="text-white/40">The</span> Playground
            </h2>
            <p className="text-white/50 text-lg font-light">
              A collection of side quests, experiments, and creative coding explorations.
            </p>
          </div>
          <button className="group flex items-center gap-2 text-sm font-medium text-white/70 hover:text-white transition-colors cursor-pointer">
            View all experiments
            <MoveRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full overflow-hidden flex -mx-4 group/marquee">
        <div 
          ref={marqueeRef} 
          className="flex whitespace-nowrap will-change-transform"
          style={{ width: "fit-content" }}
        >
          {/* Duplicate list multiple times to ensure seamless looping across all screen sizes */}
          {[...PLAYGROUND_ITEMS, ...PLAYGROUND_ITEMS, ...PLAYGROUND_ITEMS, ...PLAYGROUND_ITEMS].map((item, index) => (
            <div 
              key={`${item.id}-${index}`}
              className="inline-flex w-[280px] md:w-[360px] h-[220px] md:h-[280px] flex-shrink-0 mx-3 md:mx-4"
            >
              <div className="group w-full h-full relative rounded-2xl bg-[#0a0a0a] border border-white/5 p-6 flex flex-col justify-between overflow-hidden hover:border-white/20 transition-all duration-500 cursor-pointer">
                
                {/* Subtle gradient background inside card on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                
                <div className="relative z-10 flex justify-between items-start">
                  <div className="p-3 bg-white/5 rounded-xl text-white/70 group-hover:text-white group-hover:bg-white/10 transition-colors duration-300">
                    {item.icon}
                  </div>
                  <span className="text-xs font-mono text-white/40 px-3 py-1 bg-white/5 rounded-full backdrop-blur-md">
                    {item.category}
                  </span>
                </div>

                <div className="relative z-10 mt-auto">
                  <h3 className="text-xl md:text-2xl font-medium text-white/90 group-hover:text-white mb-3 transition-colors duration-300">
                    {item.title}
                  </h3>
                  <div className="h-[2px] w-8 bg-white/10 group-hover:w-full group-hover:bg-white/60 transition-all duration-500 ease-out" />
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Edge Gradients for smooth fading effect */}
        <div className="absolute top-0 bottom-0 left-0 w-24 md:w-48 bg-gradient-to-r from-[#050505] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-24 md:w-48 bg-gradient-to-l from-[#050505] to-transparent z-10 pointer-events-none" />
      </div>
    </section>
  );
}

export default Playground;
