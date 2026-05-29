'use client';

import React, { useState, useEffect } from 'react';
import { motion, useMotionValue, useAnimationFrame, animate } from 'framer-motion';

const HOBBIES = [
  { id: 1, title: 'Photography', icon: '📸', desc: 'Capturing moments, light, and stories through the lens.', color: 'from-purple-500/10 to-blue-500/10' },
  { id: 2, title: 'Gaming', icon: '🎮', desc: 'Exploring immersive virtual worlds and complex narratives.', color: 'from-green-500/10 to-emerald-500/10' },
  { id: 3, title: 'Reading', icon: '📚', desc: 'Diving deep into Sci-Fi, Fantasy, and Tech literature.', color: 'from-orange-500/10 to-red-500/10' },
  { id: 4, title: 'Traveling', icon: '✈️', desc: 'Experiencing new cultures, foods, and diverse perspectives.', color: 'from-cyan-500/10 to-blue-500/10' },
  { id: 5, title: 'Coding', icon: '💻', desc: 'Building aesthetic, interactive, and premium web experiences.', color: 'from-indigo-500/10 to-purple-500/10' },
  { id: 6, title: 'Music', icon: '🎸', desc: 'Listening to synthwave and experimenting with beats.', color: 'from-pink-500/10 to-rose-500/10' },
  { id: 7, title: 'Fitness', icon: '🏋️', desc: 'Staying active, pushing limits, and maintaining balance.', color: 'from-yellow-500/10 to-orange-500/10' },
  { id: 8, title: 'Design', icon: '✨', desc: 'Crafting beautiful UI/UX and visual brand identities.', color: 'from-teal-500/10 to-cyan-500/10' },
];

export default function About() {
  const [isClient, setIsClient] = useState(false);
  useEffect(() => setIsClient(true), []);

  const rotation = useMotionValue(0);
  const [isDragging, setIsDragging] = useState(false);

  // Auto-rotation when not dragging
  useAnimationFrame((t, delta) => {
    if (!isDragging) {
      rotation.set(rotation.get() - delta * 0.015);
    }
  });

  const handlePan = (e: any, info: any) => {
    rotation.set(rotation.get() + info.delta.x * 0.5);
  };

  const handlePanStart = () => setIsDragging(true);
  
  const handlePanEnd = (e: any, info: any) => {
    setIsDragging(false);
    // Add inertia/momentum to the rotation
    animate(rotation, rotation.get() + info.velocity.x * 0.5, {
      type: 'inertia',
      velocity: info.velocity.x * 0.5,
      bounceStiffness: 0,
      bounceDamping: 0,
      timeConstant: 300,
    });
  };

  if (!isClient) return null;

  return (
    <section id="about" className="relative w-full min-h-screen bg-[#050505] flex flex-col items-center justify-center overflow-hidden py-32 border-t border-[#C0C0C0]/5">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#D4AF37]/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-blue-600/5 rounded-full blur-[100px] pointer-events-none" />

      {/* Floating Name Pill */}
      <div className="absolute top-12 flex justify-center w-full z-20 pointer-events-none">
        <div className="flex items-center gap-3 px-5 py-2.5 rounded-full bg-[#111]/60 backdrop-blur-md border border-[#C0C0C0]/10 shadow-[0_0_20px_rgba(0,0,0,0.5)]">
          <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center text-[9px] font-display font-bold text-[#050505]">
            RK
          </div>
          <span className="font-sans text-[12px] font-medium text-[#C0C0C0] tracking-wide">
            raj krish
          </span>
        </div>
      </div>

      <div className="absolute top-32 text-center w-full z-10 pointer-events-none">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-5xl md:text-7xl font-bold tracking-tighter text-[#F5F5F0]"
        >
          Beyond the Code
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-[#C0C0C0]/70 mt-4 text-lg md:text-xl font-light tracking-wide"
        >
          Drag to explore my hobbies & interests
        </motion.p>
      </div>

      {/* 3D Carousel Container */}
      <div className="relative w-full max-w-[100vw] h-[500px] mt-32 flex items-center justify-center [perspective:1200px]">
        <motion.div
          className="relative w-[280px] h-[400px] cursor-grab active:cursor-grabbing"
          style={{ 
            transformStyle: 'preserve-3d',
            rotateY: rotation,
            rotateX: 5,
          }}
          onPanStart={handlePanStart}
          onPan={handlePan}
          onPanEnd={handlePanEnd}
        >
          {HOBBIES.map((hobby, index) => {
            const angle = (360 / HOBBIES.length) * index;
            // Radius of the cylinder
            const radius = 420; 

            return (
              <motion.div
                key={hobby.id}
                className={`absolute inset-0 w-full h-full rounded-[2rem] bg-gradient-to-br ${hobby.color} bg-[#111]/40 backdrop-blur-xl border border-white/10 p-8 flex flex-col items-center justify-center gap-6 text-white shadow-[0_0_40px_rgba(0,0,0,0.8)] transition-colors duration-300 group`}
                style={{
                  transformStyle: 'preserve-3d',
                  transform: `rotateY(${angle}deg) translateZ(${radius}px)`,
                  backfaceVisibility: 'hidden', // Clean visuals by hiding backside
                }}
              >
                {/* Content Layer (pops out in 3D) */}
                <div 
                  className="flex flex-col items-center text-center pointer-events-none"
                  style={{ transform: 'translateZ(50px)' }}
                >
                  <div className="text-7xl mb-6 drop-shadow-[0_0_20px_rgba(255,255,255,0.2)] transition-transform duration-500 group-hover:scale-110">
                    {hobby.icon}
                  </div>
                  <h3 className="font-display text-3xl font-bold tracking-tight mb-3 text-[#F5F5F0]">
                    {hobby.title}
                  </h3>
                  <p className="font-sans text-sm text-[#C0C0C0]/80 leading-relaxed">
                    {hobby.desc}
                  </p>
                </div>

                {/* Aesthetic corner accents */}
                <div className="absolute top-6 left-6 w-1 h-1 rounded-full bg-[#D4AF37]/50" />
                <div className="absolute top-6 right-6 w-1 h-1 rounded-full bg-[#D4AF37]/50" />
                <div className="absolute bottom-6 left-6 w-1 h-1 rounded-full bg-[#D4AF37]/50" />
                <div className="absolute bottom-6 right-6 w-1 h-1 rounded-full bg-[#D4AF37]/50" />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Decorative ambient grid */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,transparent,black,transparent)] opacity-[0.03] pointer-events-none" />
    </section>
  );
}
