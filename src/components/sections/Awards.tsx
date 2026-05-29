"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import StatCounter from "@/components/ui/StatCounter";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const AWARDS = [
  { 
    icon: "I", 
    title: "Harvard Business School Hackathon", 
    subtitle: "Global Winner · 2023",
    project: "Alzheimer's Detection System"
  },
  { 
    icon: "II", 
    title: "Microsoft × Stanford", 
    subtitle: "Global Finalist · 2024",
    project: "AI Threat Detection System"
  },
  { 
    icon: "I", 
    title: "IIIT Delhi Esya-23", 
    subtitle: "National Winner · 2023",
    project: "Autonomous Rover"
  },
  { 
    icon: "III", 
    title: "SKIT Startup Expo", 
    subtitle: "National Podium · 2023",
    project: "Offline Survival Companion"
  }
];

export default function Awards() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(cardsRef.current,
      { 
        y: 60,
        opacity: 0,
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.1,
        duration: 1.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
        }
      }
    );
  }, []);

  return (
    <section id="awards" ref={sectionRef} className="snap-start relative w-full py-32 bg-[#050505] overflow-hidden border-t border-[#C0C0C0]/10">
      
      <div className="absolute top-12 right-12 font-mono text-[#D4AF37] text-xs uppercase tracking-widest opacity-60">
        Chapter 03.2 // Validation
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 relative z-10 pt-10">
        
        {/* Counter Header */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 border-b border-[#C0C0C0]/10 pb-16">
          <StatCounter end={2} label="INTERNATIONAL" suffix="×" />
          <StatCounter end={5} label="NATIONAL" suffix="×" />
          <StatCounter end={2} label="RESEARCH PAPERS" />
        </div>

        {/* Minimalist Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {AWARDS.map((award, idx) => (
            <div 
              key={idx}
              ref={(el) => { cardsRef.current[idx] = el; }}
              className="bg-white/[0.01] border border-white/[0.05] p-10 rounded-2xl flex flex-col justify-between group hover:bg-white/[0.03] transition-all duration-500"
            >
              <div>
                <div className="font-serif italic text-4xl text-[#D4AF37] mb-8 opacity-60">
                  {award.icon}
                </div>
                <h3 className="font-display font-bold text-2xl text-[#F5F5F0] mb-4 leading-tight">
                  {award.title}
                </h3>
              </div>
              
              <div className="border-t border-white/5 pt-6 mt-8">
                <div className="font-mono text-[10px] uppercase tracking-widest text-[#D4AF37] mb-2">{award.subtitle}</div>
                <div className="font-sans text-[#8A8A85] text-sm">Built: {award.project}</div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
