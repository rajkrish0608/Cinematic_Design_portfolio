"use client";

import Hero from "@/components/sections/Hero";
import Identity from "@/components/sections/Identity";
import Projects from "@/components/sections/Projects";
import Skills from "@/components/sections/Skills";
import Timeline from "@/components/sections/Timeline";
import Awards from "@/components/sections/Awards";
import BeyondCode from "@/components/sections/BeyondCode";
import Contact from "@/components/sections/Contact";
import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Home() {
  
  useEffect(() => {
    // Initialize Lenis for smooth scrolling
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 2,
    });

    lenis.on('scroll', ScrollTrigger.update);

    const rafFunction = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(rafFunction);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(rafFunction);
      lenis.destroy();
    };
  }, []);

  return (
    <main className="relative z-10 w-full overflow-hidden">
      <Hero />
      <Identity />
      <Projects />
      <Skills />
      <Timeline />
      <Awards />
      <BeyondCode />
      <Contact />
    </main>
  );
}
