"use client";

import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import FragmentImage from "./FragmentTransition";
import { useRouter } from "next/navigation";

export default function CaseStudyTransition() {
  const [active, setActive] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [targetId, setTargetId] = useState("");
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  // Listen for a custom event to trigger the transition
  useEffect(() => {
    const handleTrigger = (e: CustomEvent) => {
      setImageUrl(e.detail.imageUrl);
      setTargetId(e.detail.id);
      setActive(true);
      setProgress(0);
      
      // Start the explosion after a tiny delay
      setTimeout(() => {
        setProgress(1.5);
      }, 100);

      // Route after the explosion is mostly done
      setTimeout(() => {
        router.push(`/case-study/${e.detail.id}`);
      }, 1500);
      
      // Clean up after routing
      setTimeout(() => {
        setActive(false);
      }, 2500);
    };

    window.addEventListener("trigger-case-study" as any, handleTrigger);
    return () => window.removeEventListener("trigger-case-study" as any, handleTrigger);
  }, [router]);

  if (!active) return null;

  return (
    <div className="fixed inset-0 z-[100000] pointer-events-none bg-[#050505]/80 backdrop-blur-sm transition-all duration-500">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <ambientLight intensity={1} />
        <FragmentImage imageUrl={imageUrl} progress={progress} />
      </Canvas>
    </div>
  );
}
