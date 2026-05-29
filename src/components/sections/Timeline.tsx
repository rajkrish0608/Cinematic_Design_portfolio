"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import SpotlightCard from "../ui/SpotlightCard";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TIMELINE_EVENTS = [
  { era: "Student", year: "2021", title: "The Foundation", desc: "B.Tech Computer Engineering. Began formal education diving deep into core computer science systems, OS, and low-level programming." },
  { era: "Builder", year: "2022", title: "Theory to Practice", desc: "Started building complex hardware-software integrations, transitioning from academic theory to real-world engineering." },
  { era: "Hackathons", year: "2023", title: "Global Competitions", desc: "Harvard Hackathon & IIIT Delhi Esya Winner. Global first place for building offline-first resilience tech under extreme time pressure." },
  { era: "Research", year: "2023", title: "Pushing Boundaries", desc: "Microsoft × Stanford Finalist. Recognized internationally for innovative system design and applied research in AI." },
  { era: "Founder", year: "2023", title: "Pradyog Ecosystem", desc: "Founded and scaled a community of 200+ active student engineers, leading product vision and technical architecture." },
  { era: "AI Engineer", year: "2024 - Present", title: "Intelligent Systems", desc: "Architecting deep learning systems, integrating CV and NLP into autonomous robotics, and building the future of intelligent agents." }
];

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const eventsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !pathRef.current) return;

    // Get the length of the SVG path
    const pathLength = pathRef.current.getTotalLength();
    
    // Set initial dash array and offset to hide the line
    gsap.set(pathRef.current, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength
    });

    // Draw the SVG line as user scrolls
    gsap.to(pathRef.current, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 30%",
        end: "bottom 80%",
        scrub: 1,
      }
    });

    // Fade in events as the line passes them
    eventsRef.current.forEach((event, i) => {
      if (!event) return;
      
      gsap.fromTo(event, 
        { opacity: 0, y: 50, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: event,
            start: "top 75%",
            end: "top 50%",
            scrub: 1
          }
        }
      );
    });

  }, []);

  return (
    <section id="timeline" ref={sectionRef} className="snap-start relative w-full py-32 bg-[#050505] border-t border-[#C0C0C0]/10 overflow-hidden">
      
      <div className="absolute top-12 right-12 font-mono text-[#D4AF37] text-xs uppercase tracking-widest opacity-60">
        Chapter 03 // The Journey
      </div>
      
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative pt-20">
        
        <h2 className="font-display font-extrabold text-[clamp(40px,6vw,100px)] text-[#F5F5F0] mb-32 uppercase tracking-tight">
          THE JOURNEY
        </h2>

        <div className="relative pl-12 md:pl-0">
          
          {/* Animated Wavy SVG Line */}
          <div className="absolute left-6 md:left-1/2 md:-translate-x-1/2 top-0 h-full w-[40px] md:w-[100px] pointer-events-none z-0">
            <svg 
              className="w-full h-full" 
              viewBox="0 0 100 1200" 
              preserveAspectRatio="none"
              fill="none"
            >
              {/* Background faint line */}
              <path 
                d="M50,0 C20,150 80,300 50,450 C20,600 80,750 50,900 C20,1050 80,1200 50,1200" 
                stroke="rgba(192,192,192,0.1)" 
                strokeWidth="2"
              />
              {/* Highlight drawing line */}
              <path 
                ref={pathRef}
                d="M50,0 C20,150 80,300 50,450 C20,600 80,750 50,900 C20,1050 80,1200 50,1200" 
                stroke="#D4AF37" 
                strokeWidth="3"
                style={{ filter: 'drop-shadow(0 0 8px rgba(212,175,55,0.6))' }}
              />
            </svg>
          </div>

          {/* Timeline Events */}
          <div className="flex flex-col gap-32 relative z-10 py-16">
            {TIMELINE_EVENTS.map((event, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <div 
                  key={idx} 
                  ref={(el) => { eventsRef.current[idx] = el; }}
                  className={`flex w-full ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}
                >
                  <div className={`w-full md:w-[42%] relative group ${
                    isLeft ? 'md:text-right md:pr-12' : 'md:text-left md:pl-12'
                  }`}>
                    
                    {/* Connecting Node/Dot on the Line */}
                    <div className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-[#050505] border-2 border-[#D4AF37] z-20 shadow-[0_0_15px_rgba(212,175,55,0.5)] ${
                      isLeft ? 'right-full translate-x-1.5 md:-right-[calc(10%_+_24px)] md:translate-x-0' : 'right-full -translate-x-2 md:-left-[calc(9.5%_+_18px)] md:-translate-x-0'
                    }`} />
                    
                    <SpotlightCard className="glass-panel p-8 rounded-3xl pointer-events-auto">
                      <div className="flex flex-col gap-2 relative z-10">
                        <div className="font-mono text-xs text-[#D4AF37] mb-1 tracking-widest uppercase">
                          Era // {event.era} ({event.year})
                        </div>
                        <h3 className="font-serif italic text-2xl md:text-3xl text-[#F5F5F0] mb-2">{event.title}</h3>
                        <p className="font-sans text-[#8A8A85] text-sm md:text-base leading-relaxed">
                          {event.desc}
                        </p>
                      </div>
                    </SpotlightCard>

                  </div>
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
