"use client";

import { useState } from "react";

interface AnnotationBoxProps {
  children: React.ReactNode;
  label: string;
}

export default function AnnotationBox({ children, label }: AnnotationBoxProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span 
      className="relative inline-block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className={`transition-colors duration-300 ${isHovered ? 'text-[#FF6B00]' : ''}`}>
        {children}
      </span>
      
      {/* Dashed border container that appears on hover */}
      <span 
        className={`absolute inset-0 border border-dashed border-[#FF6B00] rounded pointer-events-none transition-all duration-300 ${
          isHovered ? 'opacity-100 scale-110' : 'opacity-0 scale-100'
        }`}
        style={{ padding: '0.1em 0.2em', margin: '-0.1em -0.2em' }}
      >
        {/* Label Tag */}
        <span 
          className={`absolute -top-6 left-1/2 -translate-x-1/2 bg-[#FF6B00] text-white font-mono text-[10px] px-2 py-0.5 rounded-sm whitespace-nowrap shadow-lg shadow-[#FF6B00]/20 transition-all duration-300 delay-75 ${
            isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          {label}
        </span>
      </span>
    </span>
  );
}
