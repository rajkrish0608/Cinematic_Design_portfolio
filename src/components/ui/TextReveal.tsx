"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface TextRevealProps {
  children: string;
  className?: string;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
  delay?: number;
  stagger?: number;
  triggerStart?: string;
}

export default function TextReveal({
  children,
  className = "",
  as: Tag = "div",
  delay = 0,
  stagger = 0.08,
  triggerStart = "top 85%",
}: TextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const lines = containerRef.current.querySelectorAll(".text-reveal-line");

    gsap.fromTo(
      lines,
      {
        y: "100%",
        opacity: 0,
      },
      {
        y: "0%",
        opacity: 1,
        duration: 1,
        stagger: stagger,
        delay: delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: triggerStart,
          toggleActions: "play none none reverse",
        },
      }
    );
  }, [delay, stagger, triggerStart]);

  // Split text by newlines or by natural wrap points
  const lines = children.split("\n").filter(Boolean);

  return (
    <div ref={containerRef} className={className}>
      {lines.map((line, idx) => (
        <div key={idx} className="overflow-hidden">
          <Tag className="text-reveal-line block" style={{ willChange: "transform" }}>
            {line}
          </Tag>
        </div>
      ))}
    </div>
  );
}
