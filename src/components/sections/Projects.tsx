'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

const PROJECTS = [
  {
    id: 1, num: '01',
    title: 'LUMINA',
    type: 'Healthcare AI',
    tags: ['TensorFlow', 'Python', 'OpenCV'],
    description: 'An early-stage Alzheimer detection system leveraging neural networks to analyze medical imaging data with clinical-grade accuracy.',
    themeColor: '#0a1628',
    accentColor: '#1e3a5f',
    image: '/lumina.png',
  },
  {
    id: 2, num: '02',
    title: 'NEXORA',
    type: 'Defense Technology',
    tags: ['ESP32', 'C++', 'ROS', 'GSAP'],
    description: 'Battlefield-ready AI wearable for real-time threat detection, biometric monitoring and soldier situational awareness.',
    themeColor: '#0d1117',
    accentColor: '#161b22',
    image: '/nexora.png',
  },
  {
    id: 3, num: '03',
    title: 'HORIZON',
    type: 'Autonomous Robotics',
    tags: ['ROS', 'SLAM', 'Arduino', 'OpenCV'],
    description: 'A self-driving rover built with ROS and computer vision for navigating unstructured outdoor terrain with full autonomy.',
    themeColor: '#0f0a1a',
    accentColor: '#1a0f2e',
    image: '/horizon.png',
  },
];

const TOTAL = PROJECTS.length;
const CIRCUMFERENCE = 373.85; // 2π × 59.5

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const reelRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [dashOffset, setDashOffset] = useState(CIRCUMFERENCE);

  useEffect(() => {
    if (!sectionRef.current || !stackRef.current) return;

    const ctx = gsap.context(() => {
      // Circle progress
      ScrollTrigger.create({
        trigger: stackRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1,
        onUpdate: (self) => {
          const p = self.progress;
          setDashOffset(CIRCUMFERENCE * (1 - p));
          const idx = Math.min(Math.floor(p * TOTAL), TOTAL - 1);
          setActiveIdx(idx);
        },
      });

    }, sectionRef);

    return () => { ctx.revert(); };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="projects"
      style={{ position: 'relative', background: '#050505' }}
    >
      {/* ── Sticky hero-image bridge ── */}
      <div style={{
        position: 'sticky', top: 0,
        height: '100vh', width: '100%',
        padding: '8px', zIndex: 1,
        pointerEvents: 'none',
      }}>
        <div style={{
          width: '100%', height: '100%',
          borderRadius: '32px', overflow: 'hidden',
          background: '#050505', position: 'relative',
        }}>
          <img
            src="/profile.jpg"
            alt=""
            style={{
              width: '100%', height: '100%',
              objectFit: 'cover',
              filter: 'brightness(0.35) blur(2px)',
              transform: 'scale(1.04)',
            }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, rgba(5,5,5,0) 40%, rgba(5,5,5,0.95) 100%)',
          }} />
        </div>
      </div>

      {/* ── Projects stack (overlays the sticky hero image) ── */}
      <div
        ref={stackRef}
        style={{ marginTop: '-100vh', position: 'relative', zIndex: 10 }}
      >
        {/* Circular progress counter — sticky within stack */}
        <div style={{
          position: 'sticky', top: '48px',
          left: '48px', marginBottom: '-180px',
          width: '120px', height: '120px',
          zIndex: 100, pointerEvents: 'none',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="120" height="120" viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)', position: 'absolute' }}>
            <circle cx="60" cy="60" r="59.5" fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="1" />
            <circle
              cx="60" cy="60" r="59.5"
              fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              strokeDashoffset={dashOffset}
              style={{ transition: 'stroke-dashoffset 0.4s ease-out' }}
            />
          </svg>
          <div style={{
            position: 'relative', zIndex: 1,
            textAlign: 'center', color: '#fff',
            fontFamily: "'JetBrains Mono', 'DM Mono', monospace",
            fontSize: '10px', letterSpacing: '0.08em',
            textTransform: 'uppercase',
          }}>
            <div style={{ opacity: 0.4, marginBottom: '2px' }}>PROJECT</div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px', justifyContent: 'center' }}>
              {/* Slot machine reel */}
              <div style={{ height: '1em', overflow: 'hidden', lineHeight: '1em' }}>
                <div
                  ref={reelRef}
                  style={{
                    transform: `translateY(-${activeIdx}em)`,
                    transition: 'transform 0.4s cubic-bezier(0.25,0.46,0.45,0.94)',
                  }}
                >
                  {PROJECTS.map(p => (
                    <div key={p.id} style={{ height: '1em', lineHeight: '1em' }}>{p.num}</div>
                  ))}
                </div>
              </div>
              <span style={{ opacity: 0.4 }}>| {String(TOTAL).padStart(2, '0')}</span>
            </div>
          </div>
        </div>

        {/* Project cards */}
        {PROJECTS.map((project, i) => (
          <div
            key={project.id}
            className="project-card-wrapper"
            style={{ height: '150vh', position: 'relative' }}
          >
            <div 
              className="project-card-inner"
              style={{
                position: 'sticky', top: 0,
                height: '100vh', overflow: 'hidden',
                borderRadius: '32px', margin: '8px',
                transformOrigin: 'top center',
              }}>
              {/* Background */}
              <div style={{
                position: 'absolute', inset: 0,
                background: project.themeColor,
              }} />
              {/* Gradient overlay */}
              <div style={{
                position: 'absolute', inset: 0,
                background: `radial-gradient(ellipse at 70% 50%, ${project.accentColor} 0%, ${project.themeColor} 60%)`,
              }} />
              <div style={{
                position: 'absolute', inset: 0,
                background: 'linear-gradient(135deg, rgba(212,175,55,0.03) 0%, transparent 50%)',
              }} />

              {/* Content */}
              <div style={{
                position: 'relative', zIndex: 10,
                height: '100%', padding: '48px 56px',
                display: 'flex', flexDirection: 'column',
                justifyContent: 'space-between',
              }}>
                {/* TOP ROW */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <span style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '10px', letterSpacing: '0.2em',
                    textTransform: 'uppercase', color: '#fff',
                    opacity: 0.5,
                  }}>{project.type}</span>
                  <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                    {project.tags.map((tag, tagIdx, arr) => (
                      <React.Fragment key={tag}>
                        <span style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: '10px', letterSpacing: '0.15em',
                          textTransform: 'uppercase', color: '#fff',
                          opacity: 0.45,
                        }}>{tag}</span>
                        {tagIdx < arr.length - 1 && (
                          <span style={{ color: '#D4AF37', opacity: 0.6 }}>·</span>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>

                {/* BOTTOM LEFT */}
                <div>
                  <div style={{
                    fontSize: 'clamp(56px,7vw,110px)',
                    fontWeight: 400,
                    color: '#F5F5F0',
                    letterSpacing: '-0.04em',
                    lineHeight: 0.9,
                    marginBottom: '20px',
                    fontFamily: "'Bebas Neue', 'Unica One', display",
                  }}>
                    {project.title}
                  </div>
                  <p style={{
                    color: 'rgba(245,245,240,0.6)',
                    fontSize: '15px',
                    maxWidth: '420px',
                    lineHeight: 1.6,
                    marginBottom: '28px',
                    fontFamily: 'Satoshi, sans-serif',
                  }}>{project.description}</p>
                  <button
                    onClick={() => {
                      const event = new CustomEvent('trigger-case-study', {
                        detail: { id: project.title.toLowerCase(), imageUrl: project.image }
                      });
                      window.dispatchEvent(event);
                    }}
                    style={{
                      display: 'inline-flex', alignItems: 'center', gap: '8px',
                      padding: '10px 20px',
                      border: '1px solid rgba(255,255,255,0.2)',
                      borderRadius: '999px',
                      color: '#F5F5F0',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '11px',
                      letterSpacing: '0.15em',
                      textDecoration: 'none',
                      textTransform: 'uppercase',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={e => {
                      const el = e.currentTarget as HTMLButtonElement;
                      el.style.background = 'rgba(212,175,55,0.1)';
                      el.style.borderColor = 'rgba(212,175,55,0.4)';
                    }}
                    onMouseLeave={e => {
                      const el = e.currentTarget as HTMLButtonElement;
                      el.style.background = 'transparent';
                      el.style.borderColor = 'rgba(255,255,255,0.2)';
                    }}
                  >
                    ( DECONSTRUCT ↗ )
                  </button>
                </div>
              </div>

              {/* Project Image on Right */}
              <div style={{
                position: 'absolute', right: '5%', top: '50%', transform: 'translateY(-50%)',
                width: '45%', height: '70%',
                borderRadius: '16px', overflow: 'hidden',
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.5)',
              }}>
                <img 
                  src={project.image} 
                  alt={project.title}
                  style={{
                    width: '100%', height: '100%', objectFit: 'cover',
                    filter: 'grayscale(0.2) contrast(1.1)',
                  }}
                />
              </div>

              {/* Decorative project number - large behind */}
              <div style={{
                position: 'absolute', right: '56px', bottom: '40px',
                fontSize: 'clamp(120px,18vw,240px)',
                fontWeight: 700,
                color: 'rgba(255,255,255,0.03)',
                lineHeight: 1,
                letterSpacing: '-0.06em',
                userSelect: 'none',
                pointerEvents: 'none',
                fontFamily: "'Bebas Neue', display",
                zIndex: 0,
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
