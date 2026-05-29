"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import gsap from "gsap";

export default function TransitionCurtain() {
  const pathname = usePathname();
  const curtainRef = useRef<HTMLDivElement>(null);
  const [isFirstMount, setIsFirstMount] = useState(true);

  useEffect(() => {
    if (!curtainRef.current) return;
    const columns = curtainRef.current.children;

    if (isFirstMount) {
      // On initial load, the curtain covers the screen (yPercent: 0 default)
      // Slide them down out of view (yPercent: 100)
      gsap.to(columns, {
        yPercent: 100,
        duration: 0.9,
        stagger: 0.05,
        ease: "power4.inOut",
        onComplete: () => {
          gsap.set(curtainRef.current, { pointerEvents: "none" });
          setIsFirstMount(false);
        }
      });
    } else {
      // On route change, we enable pointer events to block interactions
      gsap.set(curtainRef.current, { pointerEvents: "auto" });
      
      const tl = gsap.timeline({
        onComplete: () => {
          gsap.set(curtainRef.current, { pointerEvents: "none" });
        }
      });

      // Quickly position them above the viewport
      tl.set(columns, { yPercent: -100 });

      // Slide in from the top to cover the screen
      tl.to(columns, {
        yPercent: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "power3.inOut"
      });

      // Slide out to the bottom to reveal the new page
      tl.to(columns, {
        yPercent: 100,
        duration: 0.6,
        stagger: 0.05,
        ease: "power3.inOut"
      }, "+=0.1"); // slight pause while screen is fully covered
    }
  }, [pathname]);

  return (
    <div 
      ref={curtainRef}
      className="fixed inset-0 z-[100] flex pointer-events-auto"
    >
      {[...Array(5)].map((_, i) => (
        <div 
          key={i}
          className="flex-1 h-full bg-[#050505] border-r border-[#151515] last:border-r-0"
        />
      ))}
    </div>
  );
}
