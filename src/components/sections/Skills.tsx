"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ------------------------------------------------------------------ */
/*  Skill Data                                                        */
/* ------------------------------------------------------------------ */

interface Skill {
  name: string;
  icon: string;
  iconColor?: string;
  proficiency: number;
  desc: string;
}

const SKILLS: Skill[] = [
  // Row 1 – Languages & Web
  { name: "Python",       icon: "🐍",  proficiency: 95, desc: "Core language for scripting, ML & automation" },
  { name: "C/C++",        icon: "C++", iconColor: "#6295CB", proficiency: 90, desc: "Firmware & systems‑level programming" },
  { name: "JavaScript",   icon: "JS",  iconColor: "#F7DF1E", proficiency: 92, desc: "Full‑stack web development" },
  { name: "TypeScript",   icon: "TS",  iconColor: "#3178C6", proficiency: 90, desc: "Type‑safe modern applications" },
  { name: "React",        icon: "⚛️",  proficiency: 88, desc: "Component‑driven UIs at scale" },
  { name: "Next.js",      icon: "N",   iconColor: "#F5F5F0", proficiency: 85, desc: "SSR, ISR & full‑stack React framework" },
  { name: "Node.js",      icon: "⬢",   iconColor: "#68A063", proficiency: 82, desc: "Server‑side runtime & REST APIs" },
  { name: "TailwindCSS",  icon: "≋",   iconColor: "#38BDF8", proficiency: 92, desc: "Utility‑first rapid UI styling" },

  // Row 2 – AI & Hardware
  { name: "TensorFlow",   icon: "TF",  iconColor: "#FF6F00", proficiency: 85, desc: "Model training & edge deployment" },
  { name: "PyTorch",      icon: "🔥",  proficiency: 85, desc: "Deep learning research & prototyping" },
  { name: "OpenCV",       icon: "CV",  iconColor: "#5DBA3B", proficiency: 80, desc: "Real‑time computer vision pipelines" },
  { name: "ROS",          icon: "🤖",  proficiency: 83, desc: "Robotic middleware & navigation" },
  { name: "Arduino",      icon: "∞",   iconColor: "#00979D", proficiency: 95, desc: "Rapid hardware prototyping" },
  { name: "ESP32",        icon: "ESP", iconColor: "#E7352C", proficiency: 90, desc: "IoT & wireless embedded systems" },
  { name: "Raspberry Pi", icon: "🍓",  proficiency: 80, desc: "Edge computing & Linux SBCs" },
  { name: "MATLAB",       icon: "M",   iconColor: "#EF6C00", proficiency: 78, desc: "Signal processing & simulations" },

  // Row 3 – DevOps & Design
  { name: "Linux",        icon: "🐧",  proficiency: 90, desc: "Server administration & dev environments" },
  { name: "Git",          icon: "⎇",   iconColor: "#F05032", proficiency: 92, desc: "Version control & collaboration" },
  { name: "Docker",       icon: "🐳",  proficiency: 78, desc: "Containerised deployments" },
  { name: "Figma",        icon: "◈",   iconColor: "#A259FF", proficiency: 75, desc: "UI/UX design & prototyping" },
  { name: "Firebase",     icon: "🔥",  proficiency: 82, desc: "Auth, Firestore & real‑time data" },
  { name: "MongoDB",      icon: "🍃",  proficiency: 80, desc: "NoSQL document databases" },
  { name: "PostgreSQL",   icon: "🐘",  proficiency: 76, desc: "Relational data & complex queries" },
  { name: "AWS",          icon: "AWS", iconColor: "#FF9900", proficiency: 72, desc: "Cloud infrastructure & services" },

  // Row 4 – Creative & Niche
  { name: "Three.js",     icon: "3",   iconColor: "#F5F5F0", proficiency: 78, desc: "WebGL 3D experiences" },
  { name: "GSAP",         icon: "GS",  iconColor: "#88CE02", proficiency: 85, desc: "High‑performance web animations" },
  { name: "Blender",      icon: "◎",   iconColor: "#EA7600", proficiency: 70, desc: "3D modelling & rendering" },
  { name: "Solidworks",   icon: "SW",  iconColor: "#D42020", proficiency: 72, desc: "Mechanical CAD & assemblies" },
  { name: "LIDAR",        icon: "◉",   iconColor: "#EF4444", proficiency: 75, desc: "Sensor fusion & point clouds" },
  { name: "Embedded C",   icon: "eC",  iconColor: "#8B9DC3", proficiency: 88, desc: "Bare‑metal MCU firmware" },
];

/* ------------------------------------------------------------------ */
/*  Skill Tile                                                        */
/* ------------------------------------------------------------------ */

function SkillTile({ skill }: { skill: Skill }) {
  const [hovered, setHovered] = useState(false);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);

  // Animate proficiency bar width on hover
  useEffect(() => {
    if (!barRef.current) return;
    if (hovered) {
      gsap.fromTo(
        barRef.current,
        { width: "0%" },
        { width: `${skill.proficiency}%`, duration: 0.6, ease: "power3.out" }
      );
    }
  }, [hovered, skill.proficiency]);

  const isEmoji = /\p{Emoji_Presentation}/u.test(skill.icon) || skill.icon.length > 3;

  return (
    <div
      className="relative group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* ---- Glass Tile ---- */}
      <div
        className={`
          relative w-[72px] h-[72px] flex items-center justify-center
          bg-[#111]/60 backdrop-blur-md
          border rounded-2xl cursor-pointer
          transition-all duration-300 ease-out
          ${hovered
            ? "border-[#D4AF37]/60 -translate-y-2 shadow-[0_0_24px_rgba(212,175,55,0.15)]"
            : "border-[#C0C0C0]/10 shadow-none"
          }
        `}
      >
        {isEmoji ? (
          <span className="text-2xl select-none leading-none">{skill.icon}</span>
        ) : (
          <span
            className="font-mono font-bold text-sm select-none leading-none"
            style={{ color: skill.iconColor ?? "#F5F5F0" }}
          >
            {skill.icon}
          </span>
        )}
      </div>

      {/* ---- Floating Tooltip ---- */}
      <div
        ref={tooltipRef}
        className={`
          absolute bottom-full left-1/2 -translate-x-1/2 mb-4 z-50
          w-56 p-4
          bg-[#0A0A0A]/90 backdrop-blur-xl
          border border-[#D4AF37]/20 rounded-xl
          shadow-[0_8px_40px_rgba(0,0,0,0.6),0_0_20px_rgba(212,175,55,0.08)]
          pointer-events-none
          transition-all duration-300 ease-out
          ${hovered
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2"
          }
        `}
      >
        {/* Arrow */}
        <div className="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-[#0A0A0A]/90 border-r border-b border-[#D4AF37]/20" />

        {/* Skill Name */}
        <div className="font-display font-bold text-sm text-[#F5F5F0] mb-2 tracking-tight">
          {skill.name}
        </div>

        {/* Proficiency label */}
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#8A8A85]">
            Proficiency
          </span>
          <span className="font-mono text-xs font-semibold text-[#D4AF37]">
            {skill.proficiency}%
          </span>
        </div>

        {/* Proficiency bar */}
        <div className="w-full h-[3px] bg-white/[0.06] rounded-full overflow-hidden mb-3">
          <div
            ref={barRef}
            className="h-full rounded-full bg-gradient-to-r from-[#D4AF37]/0 via-[#D4AF37]/60 to-[#D4AF37]"
            style={{ width: hovered ? `${skill.proficiency}%` : "0%" }}
          />
        </div>

        {/* Description */}
        <p className="font-sans text-[11px] leading-relaxed text-[#8A8A85]">
          {skill.desc}
        </p>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main Section                                                      */
/* ------------------------------------------------------------------ */

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const tilesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!tilesRef.current) return;

    const tiles = tilesRef.current.querySelectorAll<HTMLElement>(".skill-tile");

    gsap.set(tiles, { opacity: 0, y: 40 });

    ScrollTrigger.create({
      trigger: tilesRef.current,
      start: "top 85%",
      once: true,
      onEnter: () => {
        gsap.to(tiles, {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power3.out",
          stagger: {
            each: 0.04,
            grid: "auto",
            from: "start",
          },
        });
      },
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative w-full py-32 md:py-40 bg-[#050505] overflow-hidden"
    >
      {/* ---- Ambient radial glow ---- */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/3 w-[900px] h-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(212,175,55,0.03) 0%, transparent 70%)",
          }}
        />
      </div>

      {/* ---- Content ---- */}
      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="mb-20 text-center">
          <span className="inline-block font-mono text-xs tracking-[0.3em] uppercase text-[#D4AF37] mb-4">
            My Skills
          </span>
          <h2 className="font-display font-extrabold text-[clamp(40px,6vw,80px)] text-[#F5F5F0] leading-[1] tracking-tight">
            The{" "}
            <span className="italic text-[#D4AF37]">Arsenal</span>
          </h2>
        </div>

        {/* Tile Grid */}
        <div
          ref={tilesRef}
          className="flex flex-wrap justify-center gap-4 md:gap-5"
        >
          {SKILLS.map((skill) => (
            <div key={skill.name} className="skill-tile">
              <SkillTile skill={skill} />
            </div>
          ))}
        </div>

        {/* Subtle bottom stat line */}
        <div className="mt-16 flex items-center justify-center gap-8 text-[#8A8A85]">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#D4AF37]/40" />
            <span className="font-mono text-[10px] tracking-widest uppercase">
              {SKILLS.length} Technologies
            </span>
          </div>
          <div className="w-px h-3 bg-[#C0C0C0]/10" />
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-[#D4AF37]/40" />
            <span className="font-mono text-[10px] tracking-widest uppercase">
              4 Disciplines
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
