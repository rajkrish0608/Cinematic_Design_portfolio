"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const PHRASES = [
  "I build.",
  "I design.",
  "I obsess."
];

export default function BootLoader() {
  const [completed, setCompleted] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!textRef.current || !containerRef.current) return;

    const tl = gsap.timeline({
      onComplete: () => {
        gsap.to(containerRef.current, {
          opacity: 0,
          duration: 1.5,
          ease: "power2.inOut",
          onComplete: () => setCompleted(true)
        });
      }
    });

    PHRASES.forEach((phrase, i) => {
      tl.to(textRef.current, {
        opacity: 0,
        duration: 0.4,
        ease: "power2.inOut",
        onComplete: () => setCurrentIndex(i)
      })
      .to(textRef.current, {
        opacity: 1,
        duration: 0.8,
        ease: "power2.inOut"
      })
      .to({}, { duration: 0.6 }) // pause
    });

  }, []);

  if (completed) return null;

  return (
    <div 
      ref={containerRef}
      className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center font-display text-[#F5F5F0] text-3xl md:text-5xl tracking-widest uppercase pointer-events-none"
    >
      <div ref={textRef} className="opacity-0">
        {PHRASES[currentIndex]}
      </div>
    </div>
  );
}
