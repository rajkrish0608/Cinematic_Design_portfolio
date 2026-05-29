"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import dynamic from "next/dynamic";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ParticleSphere = dynamic(() => import("@/components/ui/ParticleSphere"), {
  ssr: false,
});

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const topTextRef = useRef<HTMLDivElement>(null);
  const bottomTextRef = useRef<HTMLDivElement>(null);
  const revealedContentRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Initial fade in for the main texts
    gsap.fromTo([topTextRef.current, bottomTextRef.current], 
      { opacity: 0, scale: 0.9 },
      { opacity: 1, scale: 1, duration: 2, ease: "power4.out", delay: 0.5 }
    );

    // Initial fade in for peripheral elements
    gsap.fromTo(containerRef.current.querySelectorAll('.hero-peripheral'), 
      { opacity: 0, y: 20 },
      { opacity: 1, y: 0, duration: 1.5, stagger: 0.1, ease: "power3.out", delay: 1.5 }
    );

    // Split text animation on scroll
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "+=80%",
        scrub: 1,
        pin: true,
      }
    });

    tl.to(topTextRef.current, { y: -150, opacity: 0.2 }, 0)
      .to(bottomTextRef.current, { y: 150, opacity: 0.2 }, 0)
      .fromTo(revealedContentRef.current, 
        { opacity: 0, scale: 0.8, filter: "blur(10px)" }, 
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1 }, 
        0
      );

  }, []);

  return (
    <section id="hero" ref={containerRef} className="relative w-full h-screen flex items-center justify-center pt-24 overflow-hidden bg-[#050505]">
      
      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-50">
        <ParticleSphere />
      </div>

      <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center h-full pb-20">
        
        {/* Left Column: Stats Cards */}
        <div className="hidden lg:flex lg:col-span-3 flex-col gap-4 hero-peripheral opacity-0 mt-12">
          
          <div className="glass-panel p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] border border-[#C0C0C0]/10 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4AF37" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#F5F5F0]">AVAILABLE</div>
              <div className="text-xs text-[#8A8A85] flex items-center gap-2">For new projects <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></span></div>
            </div>
          </div>

          <div className="glass-panel p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] border border-[#C0C0C0]/10 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C0C0C0" strokeWidth="2"><path d="M12 2a5 5 0 1 0 0 10 5 5 0 0 0 0-10zM2 22a10 10 0 0 1 20 0"/></svg>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#F5F5F0]">BASED IN</div>
              <div className="text-xs text-[#8A8A85]">Bengaluru, India</div>
            </div>
          </div>

          <div className="glass-panel p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] border border-[#C0C0C0]/10 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C0C0C0" strokeWidth="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#F5F5F0]">EXPERIENCE</div>
              <div className="text-xs text-[#8A8A85]">3+ years</div>
            </div>
          </div>

          <div className="glass-panel p-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-[#1A1A1A] border border-[#C0C0C0]/10 flex items-center justify-center">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#C0C0C0" strokeWidth="2"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/></svg>
            </div>
            <div>
              <div className="text-[10px] font-mono uppercase tracking-widest text-[#F5F5F0]">FOCUS</div>
              <div className="text-xs text-[#8A8A85]">Interaction & AI</div>
            </div>
          </div>

        </div>

        {/* Center Column: Massive Typography that splits */}
        <div className="col-span-1 lg:col-span-6 flex flex-col justify-center items-center relative h-full">
          
          <div ref={topTextRef} className="font-bebas text-[clamp(100px,18vw,280px)] leading-[0.8] tracking-normal text-[#F5F5F0] drop-shadow-2xl z-20 relative">
            RAJ
          </div>

          {/* Hidden content that reveals when text splits */}
          <div ref={revealedContentRef} className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none opacity-0">
            <div className="text-[#8A8A85] font-sans text-sm md:text-base mb-4 flex items-center gap-2">
              <span className="text-lg">+</span> Digital craftsman with obsessive curiosity.
            </div>
            <p className="font-sans font-light text-2xl md:text-4xl text-[#F5F5F0] text-center">
              Building cinematic<br/>digital <span className="italic text-[#D4AF37]">experiences.</span>
            </p>
          </div>

          <div ref={bottomTextRef} className="font-bebas text-[clamp(100px,18vw,280px)] leading-[0.8] tracking-normal text-[#F5F5F0] drop-shadow-2xl z-20 relative">
            KRISH
          </div>

        </div>

        {/* Right Column: Portrait & Featured */}
        <div className="hidden lg:flex lg:col-span-3 flex-col gap-6 items-end hero-peripheral opacity-0 mt-12">
          
          <div className="glass-panel w-full aspect-[3/4] p-2 relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] to-transparent z-10"></div>
            <Image 
              src="/profile.jpg" 
              alt="Raj Krish" 
              fill 
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover rounded-xl filter grayscale contrast-125 opacity-80"
            />
            {/* The circular scroll dial has been removed from here! */}
          </div>

          <div className="glass-panel p-4 w-full relative overflow-hidden group cursor-pointer">
            <div className="absolute top-4 right-4 w-8 h-8 rounded-full border border-[#C0C0C0]/20 flex items-center justify-center text-[#F5F5F0] group-hover:bg-[#F5F5F0] group-hover:text-[#050505] transition-colors">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17l9.2-9.2M17 17V7H7"/></svg>
            </div>
            <div className="text-[10px] font-mono uppercase tracking-widest text-[#8A8A85] mb-1">FEATURED PROJECT</div>
            <div className="font-display font-bold text-xl text-[#F5F5F0] mb-12">HYPERNOVA</div>
            
            <div className="flex gap-4 text-[9px] font-mono uppercase tracking-widest text-[#8A8A85]">
              <span>2024</span>
              <span>WEBGL</span>
              <span>INTERACTION</span>
            </div>
          </div>

        </div>

      </div>

      {/* Bottom Circular Dial */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-32 h-32 hero-peripheral opacity-0">
        <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow opacity-50">
          <path id="textPath" d="M 50, 50 m -35, 0 a 35,35 0 1,1 70,0 a 35,35 0 1,1 -70,0" fill="transparent" />
          <text className="font-mono text-[9px] uppercase tracking-[0.3em] fill-[#C0C0C0]">
            <textPath href="#textPath" startOffset="0%">
              · SCROLL TO EXPLORE · DESIGN · CODE · INTERACT
            </textPath>
          </text>
        </svg>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-[#1A1A1A] border border-[#C0C0C0]/20 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-[#F5F5F0]"></div>
        </div>
      </div>

    </section>
  );
}
