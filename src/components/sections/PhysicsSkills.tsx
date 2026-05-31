"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import Matter from "matter-js";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface SkillPill {
  title: string;
  color: string;
  isEmoji?: boolean;
  proficiency: number;
}

const TABS = [
  {
    label: "Robotics & AI",
    pills: [
      { title: "ESP32", color: "#FDA872", proficiency: 95 },
      { title: "ROS", color: "#8B9FF8", proficiency: 85 },
      { title: "TensorFlow", color: "#50A18A", proficiency: 88 },
      { title: "Computer Vision", color: "#FC9ECD", proficiency: 92 },
      { title: "TinyML", color: "#B9B9B9", proficiency: 80 },
      { title: "Arduino", color: "#FDA872", proficiency: 98 },
      { title: "LIDAR", color: "#8B9FF8", proficiency: 82 },
      { title: "PyTorch", color: "#FC9ECD", proficiency: 85 },
      { title: "Raspberry Pi", color: "#50A18A", proficiency: 90 },
      { title: "Embedded C", color: "#B9B9B9", proficiency: 94 },
      { title: "OpenCV", color: "#FDA872", proficiency: 89 },
      { title: "SLAM", color: "#8B9FF8", proficiency: 78 },
      { title: "🤖", color: "#50A18A", isEmoji: true, proficiency: 100 },
      { title: "🔥", color: "#FC9ECD", isEmoji: true, proficiency: 100 },
      { title: "🧠", color: "#8B9FF8", isEmoji: true, proficiency: 100 },
      { title: "⚡", color: "#FDA872", isEmoji: true, proficiency: 100 },
      { title: "🎯", color: "#B9B9B9", isEmoji: true, proficiency: 100 },
    ] as SkillPill[],
  },
  {
    label: "Tech Stacks",
    pills: [
      { title: "Python", color: "#FDA872", proficiency: 96 },
      { title: "C/C++", color: "#8B9FF8", proficiency: 92 },
      { title: "React", color: "#50A18A", proficiency: 88 },
      { title: "Next.js", color: "#B9B9B9", proficiency: 85 },
      { title: "TypeScript", color: "#FC9ECD", proficiency: 90 },
      { title: "Node.js", color: "#FDA872", proficiency: 82 },
      { title: "Linux", color: "#8B9FF8", proficiency: 94 },
      { title: "Docker", color: "#50A18A", proficiency: 80 },
      { title: "Firebase", color: "#FC9ECD", proficiency: 85 },
      { title: "Git", color: "#B9B9B9", proficiency: 95 },
      { title: "MongoDB", color: "#FDA872", proficiency: 82 },
      { title: "GSAP", color: "#50A18A", proficiency: 88 },
      { title: "Three.js", color: "#FC9ECD", proficiency: 78 },
      { title: "🥷🏼", color: "#FDA872", isEmoji: true, proficiency: 100 },
      { title: "🖥️", color: "#FC9ECD", isEmoji: true, proficiency: 100 },
      { title: "🧑🏽‍💻", color: "#8B9FF8", isEmoji: true, proficiency: 100 },
    ] as SkillPill[],
  },
  {
    label: "What I Build",
    pills: [
      { title: "Battlefield Wearables", color: "#FDA872", proficiency: 95 },
      { title: "Health Systems", color: "#8B9FF8", proficiency: 90 },
      { title: "Autonomous Rovers", color: "#50A18A", proficiency: 88 },
      { title: "IoT Platforms", color: "#FC9ECD", proficiency: 92 },
      { title: "AI Pipelines", color: "#B9B9B9", proficiency: 85 },
      { title: "Research Papers", color: "#FDA872", proficiency: 80 },
      { title: "Emergency Systems", color: "#FC9ECD", proficiency: 85 },
      { title: "Edge Computing", color: "#50A18A", proficiency: 92 },
      { title: "Offline-first Apps", color: "#8B9FF8", proficiency: 88 },
      { title: "Sensor Networks", color: "#B9B9B9", proficiency: 94 },
      { title: "🚀", color: "#FC9ECD", isEmoji: true, proficiency: 100 },
      { title: "🎖️", color: "#8B9FF8", isEmoji: true, proficiency: 100 },
      { title: "✨", color: "#FC9ECD", isEmoji: true, proficiency: 100 },
      { title: "🔬", color: "#50A18A", isEmoji: true, proficiency: 100 },
      { title: "🛡️", color: "#FDA872", isEmoji: true, proficiency: 100 },
    ] as SkillPill[],
  },
];

export default function PhysicsSkills() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<unknown>(null);
  const renderLoopRef = useRef<number | null>(null);
  const pillElementsRef = useRef<HTMLDivElement[]>([]);
  const bodiesRef = useRef<unknown[]>([]);
  const [activeTab, setActiveTab] = useState(0);

  const measurePillWidth = useCallback((text: string, isEmoji?: boolean): number => {
    if (isEmoji) return 60;
    const len = text.length;
    return Math.max(len * 9 + 48, 80);
  }, []);

  const initPhysics = useCallback(
    (tabIndex: number) => {
      const container = canvasRef.current as HTMLDivElement;
      if (!container) return;

      // Stop previous loop
      if (renderLoopRef.current) {
        cancelAnimationFrame(renderLoopRef.current);
        renderLoopRef.current = null;
      }

      // Clear old engine
      if (engineRef.current) {
        const eng = engineRef.current as import("matter-js").Engine & { __cleanup?: () => void };
        eng.__cleanup?.();
        Matter.Runner && Matter.Runner.stop && Matter.Runner.stop(eng as unknown as import("matter-js").Runner);
        Matter.World.clear(eng.world, false);
        Matter.Engine.clear(eng);
        engineRef.current = null;
      }

      // Remove old pills
      pillElementsRef.current.forEach((el) => el.parentNode?.removeChild(el));
      pillElementsRef.current = [];
      bodiesRef.current = [];

      const width = container.clientWidth || window.innerWidth;
      const height = container.clientHeight || window.innerHeight - 80;

      // Create engine
      const engine = Matter.Engine.create({ gravity: { x: 0, y: 1.5, scale: 0.001 } });
      engineRef.current = engine;

      const T = 80; // wall thickness

      // Walls: floor, left, right
      const walls = [
        Matter.Bodies.rectangle(width / 2, height + T / 2, width + T * 2, T, { isStatic: true, restitution: 0.3, friction: 0.8 }),
        Matter.Bodies.rectangle(-T / 2, height / 2, T, height * 2, { isStatic: true }),
        Matter.Bodies.rectangle(width + T / 2, height / 2, T, height * 2, { isStatic: true }),
      ];
      Matter.World.add(engine.world, walls);

      // Create pills
      const pills = TABS[tabIndex].pills;
      const pillH = 46;

      pills.forEach((pill, i) => {
        const pillW = measurePillWidth(pill.title, pill.isEmoji);
        const r = pillH / 2;

        // Start above viewport at random x, staggered y
        const x = Math.random() * (width * 0.8) + width * 0.1;
        const y = -(80 + i * 50 + Math.random() * 200);
        const angle = (Math.random() - 0.5) * 0.8;

        const body = Matter.Bodies.rectangle(x, y, pillW, pillH, {
          chamfer: { radius: r },
          friction: 0.5,
          frictionAir: 0.018,
          restitution: 0.35,
          density: 0.003,
          angle,
        });

        Matter.World.add(engine.world, body);
        (bodiesRef.current as import("matter-js").Body[]).push(body);

        // DOM element
        const el = document.createElement("div");
        el.className = "group physics-pill";
        el.style.cssText = `
          position:absolute;left:0;top:0;
          width:${pillW}px;height:${pillH}px;
          background:${pill.color};
          border-radius:${r}px;
          display:flex;align-items:center;justify-content:center;
          font-size:${pill.isEmoji ? "22px" : "13px"};
          font-weight:600;color:#111;
          cursor:grab;user-select:none;
          pointer-events:auto;
          white-space:nowrap;
          box-shadow:0 2px 12px rgba(0,0,0,0.18);
          will-change:transform;
          opacity:0;
          transform-origin:center center;
        `;
        
        // Add the title
        const titleSpan = document.createElement("span");
        titleSpan.textContent = pill.title;
        titleSpan.style.pointerEvents = "none";
        el.appendChild(titleSpan);

        // Add hover tooltip for proficiency if it's not an emoji
        if (!pill.isEmoji) {
          const tooltip = document.createElement("div");
          tooltip.className = "absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-32 p-3 bg-[#050505] rounded-xl opacity-0 translate-y-2 pointer-events-none transition-all duration-300 z-50 group-hover:opacity-100 group-hover:translate-y-0";
          tooltip.style.boxShadow = "0 10px 25px rgba(0,0,0,0.3)";
          
          tooltip.innerHTML = `
            <div class="absolute -bottom-[6px] left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-[#050505]"></div>
            <div class="flex justify-between items-center mb-2 relative z-10">
              <span class="font-mono text-[9px] uppercase tracking-widest text-[#8A8A85]">Mastery</span>
              <span class="font-mono text-[10px] text-[#D4AF37] font-bold">${pill.proficiency}%</span>
            </div>
            <div class="w-full h-[2px] bg-[#1A1A1A] rounded-full overflow-hidden relative z-10">
              <div class="h-full bg-[#D4AF37]" style="width: ${pill.proficiency}%"></div>
            </div>
          `;
          
          el.appendChild(tooltip);
        }
        container.appendChild(el);
        pillElementsRef.current.push(el);

        // Fade in staggered
        gsap.to(el, { opacity: 1, delay: 0.1 + i * 0.04, duration: 0.4, ease: "power2.out" });
      });

      // ─── Mouse constraint via raw DOM events ──────────────────────────
      // We bypass Lenis by attaching to the container's native events
      // and computing mouse position relative to the container.

      let draggedBody: import("matter-js").Body | null = null;
      let dragOffset = { x: 0, y: 0 };
      const dragConstraintRef: { c: import("matter-js").Constraint | null } = { c: null };

      function getRelPos(e: MouseEvent | TouchEvent) {
        if (!container) return { x: 0, y: 0 };
        const rect = container.getBoundingClientRect();
        const clientX = "touches" in e ? e.touches[0].clientX : (e as MouseEvent).clientX;
        const clientY = "touches" in e ? e.touches[0].clientY : (e as MouseEvent).clientY;
        return { x: clientX - rect.left, y: clientY - rect.top };
      }

      function onPointerDown(e: MouseEvent | TouchEvent) {
        const pos = getRelPos(e);
        const bodies = (bodiesRef.current as import("matter-js").Body[]);
        // Find which body was hit
        for (let i = bodies.length - 1; i >= 0; i--) {
          const b = bodies[i];
          if (Matter.Bounds.contains(b.bounds, pos)) {
            draggedBody = b;
            dragOffset = { x: pos.x - b.position.x, y: pos.y - b.position.y };

            // Create a constraint to drag the body
            const constraint = Matter.Constraint.create({
              pointA: pos,
              bodyB: b,
              pointB: { x: 0, y: 0 },
              stiffness: 0.2,
              damping: 0.1,
            });
            dragConstraintRef.c = constraint;
            Matter.World.add(engine.world, constraint);

            // Set body velocity to 0 on grab
            Matter.Body.setVelocity(b, { x: 0, y: 0 });
            container.style.cursor = "grabbing";
            e.preventDefault();
            e.stopPropagation();
            break;
          }
        }
      }

      function onPointerMove(e: MouseEvent | TouchEvent) {
        if (!draggedBody || !dragConstraintRef.c) return;
        const pos = getRelPos(e);
        dragConstraintRef.c.pointA = pos;
        e.preventDefault();
        e.stopPropagation();
      }

      function onPointerUp(e: MouseEvent | TouchEvent) {
        if (!draggedBody || !dragConstraintRef.c) return;
        Matter.World.remove(engine.world, dragConstraintRef.c);
        dragConstraintRef.c = null;
        draggedBody = null;
        container.style.cursor = "grab";
        e.preventDefault();
        e.stopPropagation();
      }

      // Attach native events with capture to beat Lenis
      container.addEventListener("mousedown", onPointerDown, { capture: true, passive: false });
      window.addEventListener("mousemove", onPointerMove, { capture: true, passive: false });
      window.addEventListener("mouseup", onPointerUp, { capture: true, passive: false });
      container.addEventListener("touchstart", onPointerDown, { capture: true, passive: false });
      window.addEventListener("touchmove", onPointerMove, { capture: true, passive: false });
      window.addEventListener("touchend", onPointerUp, { capture: true, passive: false });

      // Store cleanup
      (engine as unknown as Record<string, unknown>).__cleanup = () => {
        container.removeEventListener("mousedown", onPointerDown, { capture: true });
        window.removeEventListener("mousemove", onPointerMove, { capture: true });
        window.removeEventListener("mouseup", onPointerUp, { capture: true });
        container.removeEventListener("touchstart", onPointerDown, { capture: true });
        window.removeEventListener("touchmove", onPointerMove, { capture: true });
        window.removeEventListener("touchend", onPointerUp, { capture: true });
      };

      // ─── Render loop ──────────────────────────────────────────────────
      const loop = () => {
        Matter.Engine.update(engine, 1000 / 60);

        (bodiesRef.current as import("matter-js").Body[]).forEach((body, i) => {
          const el = pillElementsRef.current[i];
          if (!el) return;
          const { x, y } = body.position;
          const angleDeg = (body.angle * 180) / Math.PI;
          const w = parseFloat(el.style.width);
          const h = parseFloat(el.style.height);
          el.style.transform = `translate(${x - w / 2}px, ${y - h / 2}px) rotate(${angleDeg}deg)`;
        });

        renderLoopRef.current = requestAnimationFrame(loop);
      };

      renderLoopRef.current = requestAnimationFrame(loop);
    },
    [measurePillWidth]
  );

  useEffect(() => {
    initPhysics(activeTab);

    return () => {
      if (renderLoopRef.current) cancelAnimationFrame(renderLoopRef.current);
      if (engineRef.current) {
        const eng = engineRef.current as import("matter-js").Engine & { __cleanup?: () => void };
        eng.__cleanup?.();
        Matter.World.clear(eng.world, false);
        Matter.Engine.clear(eng);
        engineRef.current = null;
      }
      pillElementsRef.current.forEach((el) => el.parentNode?.removeChild(el));
      pillElementsRef.current = [];
      bodiesRef.current = [];
    };
  }, [activeTab, initPhysics]);

  // Resize
  useEffect(() => {
    let t: NodeJS.Timeout;
    const onResize = () => { clearTimeout(t); t = setTimeout(() => initPhysics(activeTab), 300); };
    window.addEventListener("resize", onResize);
    return () => { window.removeEventListener("resize", onResize); clearTimeout(t); };
  }, [activeTab, initPhysics]);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="snap-start"
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        background: "#F5F5F0",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {/* Header */}
      <div style={{ padding: "48px 48px 0", flexShrink: 0 }}>
        <div style={{ fontFamily: "var(--font-mono,'JetBrains Mono',monospace)", fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase", color: "#1a1a1a", opacity: 0.5, marginBottom: "8px" }}>
          THE ARSENAL
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px", marginTop: "16px" }}>
          {TABS.map((tab, idx) => (
            <button
              key={idx}
              onClick={() => setActiveTab(idx)}
              style={{
                fontFamily: "var(--font-mono,'JetBrains Mono',monospace)",
                fontSize: "11px",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                padding: "8px 20px",
                borderRadius: "999px",
                border: "none",
                cursor: "pointer",
                transition: "all 0.3s ease",
                background: activeTab === idx ? "#1a1a1a" : "transparent",
                color: activeTab === idx ? "#F5F5F0" : "rgba(26,26,26,0.45)",
                outline: activeTab === idx ? "none" : "1px solid rgba(26,26,26,0.15)",
              }}
            >
              {activeTab === idx ? `( ${tab.label} )` : tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Physics canvas — fills rest of the section, cursor:grab on hover */}
      <div
        ref={canvasRef}
        style={{
          position: "relative",
          flex: 1,
          overflow: "hidden",
          cursor: "grab",
          touchAction: "none",
        }}
      />
    </section>
  );
}
