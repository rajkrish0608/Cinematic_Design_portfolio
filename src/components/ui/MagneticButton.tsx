"use client";

import React, { useRef, useState } from "react";
import gsap from "gsap";

interface MagneticButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  intensity?: number;
}

export default function MagneticButton({ 
  children, 
  className = "", 
  intensity = 0.3,
  ...props 
}: MagneticButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!buttonRef.current || !textRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    gsap.to(buttonRef.current, {
      x: x * intensity,
      y: y * intensity,
      duration: 1,
      ease: "power3.out"
    });

    gsap.to(textRef.current, {
      x: x * (intensity * 0.5),
      y: y * (intensity * 0.5),
      duration: 1,
      ease: "power3.out"
    });
  };

  const handleMouseLeave = () => {
    if (!buttonRef.current || !textRef.current) return;
    
    gsap.to(buttonRef.current, {
      x: 0,
      y: 0,
      duration: 1,
      ease: "elastic.out(1, 0.3)"
    });

    gsap.to(textRef.current, {
      x: 0,
      y: 0,
      duration: 1,
      ease: "elastic.out(1, 0.3)"
    });
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-flex items-center justify-center ${className}`}
      {...props}
    >
      <div ref={textRef} className="pointer-events-none relative z-10 w-full h-full flex items-center justify-center">
        {children}
      </div>
    </button>
  );
}
