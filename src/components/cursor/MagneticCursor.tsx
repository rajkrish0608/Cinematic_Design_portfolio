"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function MagneticCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    
    const setDotX = gsap.quickSetter(dot, "x", "px");
    const setDotY = gsap.quickSetter(dot, "y", "px");
    const setRingX = gsap.quickSetter(ring, "x", "px");
    const setRingY = gsap.quickSetter(ring, "y", "px");

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      setDotX(mouseX);
      setDotY(mouseY);
    };

    window.addEventListener("mousemove", onMouseMove);

    const ticker = gsap.ticker.add(() => {
      const dt = 1.0 - Math.pow(1.0 - 0.15, gsap.ticker.deltaRatio());
      ringX += (mouseX - ringX) * dt;
      ringY += (mouseY - ringY) * dt;
      setRingX(ringX);
      setRingY(ringY);
    });

    const handleHoverEnter = (e: Event) => {
      const target = e.currentTarget as HTMLElement;
      const customLabel = target.getAttribute("data-cursor") || "EXPLORE";
      setLabel(`[ ${customLabel} ]`);

      gsap.to(ring, {
        width: 80,
        height: 80,
        backgroundColor: "rgba(255, 255, 255, 0.05)",
        borderColor: "rgba(255, 255, 255, 0.4)",
        backdropFilter: "blur(2px)",
        duration: 0.3,
        ease: "power2.out"
      });
      if (textRef.current) {
        gsap.to(textRef.current, { opacity: 1, duration: 0.2 });
      }
      gsap.to(dot, { opacity: 0, duration: 0.2 });
    };

    const handleHoverLeave = () => {
      gsap.to(ring, {
        width: 32,
        height: 32,
        backgroundColor: "transparent",
        borderColor: "rgba(192, 192, 192, 0.4)",
        backdropFilter: "blur(0px)",
        duration: 0.3,
        ease: "power2.out"
      });
      if (textRef.current) {
        gsap.to(textRef.current, { opacity: 0, duration: 0.2 });
      }
      gsap.to(dot, { opacity: 1, duration: 0.2 });
    };

    const addListeners = () => {
      const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, [data-cursor]');
      interactiveElements.forEach(el => {
        el.addEventListener("mouseenter", handleHoverEnter);
        el.addEventListener("mouseleave", handleHoverLeave);
      });
    };

    addListeners();

    const observer = new MutationObserver((mutations) => {
      let shouldRebind = false;
      mutations.forEach(m => {
        if (m.addedNodes.length > 0) shouldRebind = true;
      });
      if (shouldRebind) addListeners();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      gsap.ticker.remove(ticker);
      observer.disconnect();
      const interactiveElements = document.querySelectorAll('a, button, [role="button"], input, textarea, [data-cursor]');
      interactiveElements.forEach(el => {
        el.removeEventListener("mouseenter", handleHoverEnter);
        el.removeEventListener("mouseleave", handleHoverLeave);
      });
    };
  }, []);

  return (
    <>
      <div 
        ref={ringRef}
        className="pointer-events-none fixed top-0 left-0 w-8 h-8 rounded-full border border-white/20 z-[9999] flex items-center justify-center transform -translate-x-1/2 -translate-y-1/2 hidden md:flex transition-colors"
      >
        <span ref={textRef} className="opacity-0 font-mono text-[8px] text-white tracking-widest pointer-events-none">
          {label}
        </span>
      </div>
      <div 
        ref={dotRef}
        className="pointer-events-none fixed top-0 left-0 w-1.5 h-1.5 rounded-full bg-[#C0C0C0] z-[10000] transform -translate-x-1/2 -translate-y-1/2 hidden md:block mix-blend-difference"
      />
    </>
  );
}
