"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import AnnotationBox from "@/components/ui/AnnotationBox";
import StatCounter from "@/components/ui/StatCounter";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Identity() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current || !bioRef.current) return;
    
    // Depth-zoom cinematic transition
    gsap.fromTo(contentRef.current, 
      { scale: 0.8, opacity: 0, filter: "blur(10px)" },
      {
        scale: 1,
        opacity: 1,
        filter: "blur(0px)",
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "center center",
          scrub: 1
        }
      }
    );

    // Fade up lines of bio
    const bioLines = bioRef.current.children;
    gsap.fromTo(bioLines,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "center 80%",
          scrub: 1
        }
      }
    );

  }, []);

  return (
    <section id="identity" ref={sectionRef} className="snap-start relative w-full min-h-screen py-32 bg-[#050505] overflow-hidden">
      
      {/* Editorial Number */}
      <div className="absolute top-12 right-12 font-mono text-[#D4AF37] text-xs uppercase tracking-widest opacity-60">
        Chapter 01 // The Mindset
      </div>
      
      <div ref={contentRef} className="max-w-[1200px] mx-auto px-6 md:px-12 h-full flex flex-col justify-center mt-32">
        
        {/* Editorial Bio Block */}
        <div ref={bioRef} className="flex flex-col gap-12 font-serif text-[clamp(32px,5vw,72px)] text-[#F5F5F0] leading-[1.1] tracking-tight">
          
          <div className="flex gap-4 items-start">
            <span className="text-[#D4AF37] text-2xl md:text-5xl font-sans mt-2 md:mt-4">"</span>
            <div>
              I don't build for portfolios. <br/>
              <span className="italic text-[#C0C0C0]">I build for impact.</span>
            </div>
          </div>

          <div className="font-sans text-xl md:text-3xl font-light text-[#C0C0C0] leading-[1.5] max-w-4xl mt-8">
            As a Robotics & AI Engineer, I engineer systems that <span className="text-[#F5F5F0] font-medium">think, sense, and act</span>.
            From battlefield AI wearables to offline-first platforms.
          </div>
          
          <div className="font-sans text-lg md:text-xl font-light text-[#8A8A85] leading-[1.6] max-w-3xl mt-4">
            Currently B.Tech Computer Engineering (Batch '27). Recognized globally as a <AnnotationBox label="🏆 HBS 2023">Harvard Winner</AnnotationBox> and <AnnotationBox label="🥈 Finalist">Microsoft × Stanford</AnnotationBox> Finalist. 
            Founder of <AnnotationBox label="Pradyog · IEEE CS Vice Chair">Pradyog</AnnotationBox> with 200+ active members.
          </div>

        </div>

        {/* Minimal Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 md:gap-12 border-t border-[#C0C0C0]/20 pt-16 mt-32">
          <div>
            <div className="text-[#8A8A85] font-mono text-xs tracking-widest uppercase mb-4">Intl Awards</div>
            <StatCounter end={2} label="" suffix="×" />
          </div>
          <div>
            <div className="text-[#8A8A85] font-mono text-xs tracking-widest uppercase mb-4">Natl Awards</div>
            <StatCounter end={5} label="" suffix="×" />
          </div>
          <div>
            <div className="text-[#8A8A85] font-mono text-xs tracking-widest uppercase mb-4">Community</div>
            <StatCounter end={200} label="" suffix="+" />
          </div>
          <div>
            <div className="text-[#8A8A85] font-mono text-xs tracking-widest uppercase mb-4">Deployed</div>
            <StatCounter end={14} label="" />
          </div>
          <div>
            <div className="text-[#8A8A85] font-mono text-xs tracking-widest uppercase mb-4">Papers</div>
            <StatCounter end={2} label="" />
          </div>
        </div>

      </div>
    </section>
  );
}
