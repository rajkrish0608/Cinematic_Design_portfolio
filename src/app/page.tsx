"use client";

import Hero from "@/components/sections/Hero";
import Identity from "@/components/sections/Identity";
import Projects from "@/components/sections/Projects";
import PhysicsSkills from "@/components/sections/PhysicsSkills";
import Timeline from "@/components/sections/Timeline";
import Awards from "@/components/sections/Awards";
import BeyondCode from "@/components/sections/BeyondCode";
import Contact from "@/components/sections/Contact";
import { useEffect } from "react";
import Lenis from "lenis";

export default function Home() {
  
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative z-10 w-full overflow-hidden">
      <Hero />
      <Identity />
      <Projects />
      <PhysicsSkills />
      <Timeline />
      <Awards />
      <BeyondCode />
      <Contact />
    </main>
  );
}
