"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const TIMELINE_EVENTS = [
  { year: "2024", title: "Microsoft × Stanford Finalist", desc: "Recognized internationally for innovative system design." },
  { year: "2023", title: "Harvard Hackathon Winner", desc: "Global first place for offline-first resilience tech." },
  { year: "2023", title: "Pradyog Founder & VP", desc: "Scaled community to 200+ active student engineers." },
  { year: "2023", title: "IIIT Delhi Esya Winner", desc: "National first place in hardware and software integration." },
  { year: "2023", title: "B.Tech Computer Engineering", desc: "Began formal education in core computer science systems." }
];

export default function Timeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const eventsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current || !lineRef.current) return;

    // Draw the straight vertical line
    gsap.fromTo(lineRef.current,
      { height: "0%" },
      {
        height: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: 1,
        }
      }
    );

    // Fade in events as the line passes them
    eventsRef.current.forEach((event, i) => {
      if (!event) return;
      
      gsap.fromTo(event, 
        { opacity: 0, x: -30 },
        { 
          opacity: 1, 
          x: 0, 
          ease: "power2.out",
          scrollTrigger: {
            trigger: event,
            start: "top 60%",
            end: "top 40%",
            scrub: 1
          }
        }
      );
    });

  }, []);

  return (
    <section id="timeline" ref={sectionRef} className="relative w-full py-32 bg-[#050505] border-t border-[#C0C0C0]/10">
      
      <div className="absolute top-12 right-12 font-mono text-[#D4AF37] text-xs uppercase tracking-widest opacity-60">
        Chapter 03 // The Evolution
      </div>
      
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative pt-20">
        
        <h2 className="font-display font-extrabold text-[clamp(40px,6vw,100px)] text-[#F5F5F0] mb-32 uppercase tracking-tight">
          THE EVOLUTION
        </h2>

        <div className="relative pl-8 md:pl-0">
          
          {/* Straight Minimal Line */}
          <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 top-0 h-full w-[1px] bg-[#C0C0C0]/10">
            <div ref={lineRef} className="w-full bg-gradient-to-b from-[#D4AF37] via-[#C0C0C0] to-transparent" />
          </div>

          {/* Timeline Events */}
          <div className="flex flex-col gap-24 relative z-10 py-16">
            {TIMELINE_EVENTS.map((event, idx) => {
              const isLeft = idx % 2 === 0;
              return (
                <div 
                  key={idx} 
                  ref={(el) => { eventsRef.current[idx] = el; }}
                  className={`flex w-full ${isLeft ? 'md:justify-start' : 'md:justify-end'}`}
                >
                  <div className={`w-full md:w-[45%] relative group ${
                    isLeft ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'
                  } pl-8 md:pl-0`}>
                    
                    {/* Connecting Marker */}
                    <div className={`hidden md:block absolute top-2 w-12 h-[1px] bg-[#C0C0C0]/30 transition-all duration-500 group-hover:bg-[#D4AF37] group-hover:w-16 ${
                      isLeft ? 'right-0' : 'left-0'
                    }`} />
                    
                    <div className="font-mono text-sm text-[#D4AF37] mb-4 tracking-widest">{event.year}</div>
                    <h3 className="font-serif italic text-3xl md:text-4xl text-[#F5F5F0] mb-4">{event.title}</h3>
                    <p className="font-sans text-[#8A8A85] text-lg leading-relaxed max-w-sm ml-0 md:ml-auto md:mr-0">
                      {event.desc}
                    </p>
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
