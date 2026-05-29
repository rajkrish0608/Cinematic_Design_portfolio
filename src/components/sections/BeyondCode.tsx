"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Image from "next/image";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const HOBBIES = [
  {
    label: "I Build",
    image: "/profile.jpg",
    rotation: -8,
    borderColor: "border-[#D4AF37]/40",
  },
  {
    label: "I Compete",
    image: "/profile.jpg",
    rotation: 0,
    borderColor: "border-[#4A90E2]/40",
    featured: true,
  },
  {
    label: "I Lead",
    image: "/profile.jpg",
    rotation: 6,
    borderColor: "border-[#C0C0C0]/20",
  },
];

export default function BeyondCode() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    gsap.fromTo(
      sectionRef.current.querySelectorAll(".hobby-card"),
      { opacity: 0, y: 60, scale: 0.9 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "center center",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      id="beyond-code"
      className="snap-start relative py-32 bg-[#050505] overflow-hidden border-t border-[#C0C0C0]/10"
    >
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[#D4AF37] rounded-full blur-[200px] opacity-[0.02] pointer-events-none" />

      {/* Floating Name Pill (like the reference "aman" pill) */}
      <div className="flex justify-center mb-16">
        <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#111]/60 backdrop-blur-md border border-[#C0C0C0]/10">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center text-[9px] font-display font-bold text-[#050505]">
            RK
          </div>
          <span className="font-sans text-[12px] font-medium text-[#C0C0C0] tracking-wide">
            raj krish
          </span>
        </div>
      </div>

      {/* Cards Container */}
      <div className="relative max-w-[900px] mx-auto px-6 flex items-center justify-center gap-0 md:gap-[-20px]">
        {HOBBIES.map((hobby, idx) => (
          <div
            key={idx}
            ref={(el) => { cardsRef.current[idx] = el; }}
            className={`hobby-card relative cursor-pointer transition-all duration-700 ease-out ${
              idx === activeIndex ? "z-20 scale-105" : "z-10 scale-95 opacity-70"
            }`}
            style={{
              transform: `rotate(${idx === activeIndex ? 0 : hobby.rotation}deg) ${idx === activeIndex ? "scale(1.05)" : "scale(0.95)"}`,
              marginLeft: idx > 0 ? "-30px" : "0",
            }}
            onClick={() => setActiveIndex(idx)}
            onMouseEnter={() => setActiveIndex(idx)}
          >
            <div
              className={`relative w-[220px] md:w-[280px] h-[300px] md:h-[380px] rounded-2xl overflow-hidden border-2 transition-all duration-500 ${
                idx === activeIndex
                  ? hobby.borderColor + " shadow-2xl shadow-black/50"
                  : "border-[#C0C0C0]/10"
              }`}
            >
              <Image
                src={hobby.image}
                alt={hobby.label}
                fill
                sizes="280px"
                className={`object-cover transition-all duration-700 ${
                  idx === activeIndex
                    ? "grayscale-0 brightness-100"
                    : "grayscale brightness-75"
                }`}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>
          </div>
        ))}
      </div>

      {/* Active Label */}
      <div className="text-center mt-12">
        <h3 className="font-display font-bold text-4xl md:text-5xl text-[#F5F5F0] tracking-tight transition-all duration-500">
          {HOBBIES[activeIndex].label}
        </h3>
      </div>
    </section>
  );
}
