"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

// Ensure ScrollTrigger is registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface StatCounterProps {
  end: number;
  suffix?: string;
  label: string;
}

export default function StatCounter({ end, suffix = "", label }: StatCounterProps) {
  const counterRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!counterRef.current) return;
    
    const obj = { val: 0 };
    
    gsap.to(obj, {
      val: end,
      duration: 2,
      ease: "power2.out",
      scrollTrigger: {
        trigger: counterRef.current,
        start: "top 85%",
      },
      onUpdate: () => {
        setValue(Math.floor(obj.val));
      }
    });
  }, [end]);

  return (
    <div ref={counterRef} className="flex flex-col items-center md:items-start group">
      <div className="font-syne text-[clamp(40px,4vw,64px)] font-bold text-[#F2F0EB] leading-none mb-2">
        {value}{suffix}
      </div>
      <div className="font-instrument text-[10px] text-[#7A7A72] tracking-[0.2em] uppercase max-w-[120px] leading-tight group-hover:text-[#FF6B00] transition-colors">
        {label}
      </div>
    </div>
  );
}
