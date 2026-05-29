"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";

const PAGES = [
  { name: "Home", href: "#hero", icon: "⌂" },
  { name: "About", href: "#identity", icon: "◉" },
  { name: "Projects", href: "#projects", icon: "◫" },
  { name: "Skills", href: "#skills", icon: "◈" },
  { name: "Timeline", href: "#timeline", icon: "◷" },
  { name: "Contact", href: "#contact", icon: "✉" },
];

const CONNECT = [
  { name: "GitHub", href: "https://github.com/rajkrish0608", icon: "⌥" },
  { name: "LinkedIn", href: "https://linkedin.com/in/rajkrish0608", icon: "◻" },
  { name: "Instagram", href: "https://instagram.com/rajkrish0608", icon: "◎" },
  { name: "Twitter / X", href: "https://x.com/rajkrish0608", icon: "✕" },
];

const RESOURCES = [
  { name: "Resume", href: "/Raj_Resume.pdf", icon: "⤓" },
  { name: "Uses", href: "#skills", icon: "⚙" },
  { name: "Links", href: "#contact", icon: "⌗" },
];

export default function FloatingMenu() {
  const [open, setOpen] = useState(false);
  const [activePage, setActivePage] = useState("Home");
  const [isVisible, setIsVisible] = useState(true);
  const lastScrollY = useRef(0);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  // Close on escape
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  // Track scroll direction for visibility
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // If we scroll down, hide. If we scroll up, show.
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsVisible(false);
        setOpen(false); // Close menu if open when scrolling down
      } else {
        setIsVisible(true);
      }
      
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            const page = PAGES.find(p => p.href === `#${id}`);
            if (page) setActivePage(page.name);
          }
        });
      },
      { threshold: 0.3 }
    );

    PAGES.forEach(page => {
      const el = document.querySelector(page.href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleNavClick = (href: string, name: string) => {
    setActivePage(name);
    setOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div 
      ref={menuRef} 
      className={`fixed top-24 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ease-in-out ${
        isVisible ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0 pointer-events-none"
      }`}
    >
      {/* The Floating Pill Button */}
      <button
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-full transition-all duration-500 shadow-2xl shadow-black/50 ${
          open
            ? "bg-[#1A1A1A] border border-[#C0C0C0]/20"
            : "bg-[#111]/80 backdrop-blur-xl border border-[#C0C0C0]/10 hover:border-[#C0C0C0]/30 hover:bg-[#1A1A1A]"
        }`}
      >
        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#D4AF37] to-[#B8941F] flex items-center justify-center text-[10px] font-display font-bold text-[#050505]">
          RK
        </div>
        <span className="font-sans text-[12px] font-medium text-[#C0C0C0] tracking-wide">
          raj krish
        </span>
      </button>

      {/* The Command Menu Modal */}
      <div
        className={`absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[420px] max-h-[70vh] overflow-y-auto transition-all duration-500 ease-out origin-top ${
          open
            ? "opacity-100 scale-100 translate-y-0 pointer-events-auto"
            : "opacity-0 scale-95 -translate-y-4 pointer-events-none"
        }`}
      >
        <div className="bg-[#0C0C0C]/95 backdrop-blur-2xl border border-[#C0C0C0]/10 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden">
          
          {/* Header */}
          <div className="flex items-center justify-between px-6 pt-5 pb-4 border-b border-[#C0C0C0]/5">
            <span className="font-sans text-sm font-medium text-[#F5F5F0]">Menu</span>
            <button
              onClick={() => setOpen(false)}
              className="w-7 h-7 rounded-full bg-[#1A1A1A] border border-[#C0C0C0]/10 flex items-center justify-center text-[#8A8A85] hover:text-[#F5F5F0] transition-colors"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
          </div>

          {/* Pages Section */}
          <div className="px-5 pt-5 pb-3">
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#6A6A65] mb-3 px-1">Pages</div>
            <div className="grid grid-cols-2 gap-2">
              {PAGES.map((page) => (
                <button
                  key={page.name}
                  onClick={() => handleNavClick(page.href, page.name)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-sans transition-all duration-200 text-left ${
                    activePage === page.name
                      ? "bg-[#F5F5F0] text-[#050505] font-medium shadow-md"
                      : "bg-[#141414] text-[#C0C0C0] hover:bg-[#1A1A1A] border border-[#C0C0C0]/5 hover:border-[#C0C0C0]/15"
                  }`}
                >
                  <span className="text-base opacity-60">{page.icon}</span>
                  <span>{page.name}</span>
                  {activePage === page.name && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#050505]"></span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Connect Section */}
          <div className="px-5 pt-3 pb-3">
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#6A6A65] mb-3 px-1">Connect</div>
            <div className="grid grid-cols-2 gap-2">
              {CONNECT.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-sans bg-[#141414] text-[#C0C0C0] hover:bg-[#1A1A1A] border border-[#C0C0C0]/5 hover:border-[#C0C0C0]/15 transition-all duration-200"
                >
                  <span className="text-base opacity-60">{link.icon}</span>
                  <span>{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Resources Section */}
          <div className="px-5 pt-3 pb-5">
            <div className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#6A6A65] mb-3 px-1">Resources</div>
            <div className="grid grid-cols-3 gap-2">
              {RESOURCES.map((res) => (
                <a
                  key={res.name}
                  href={res.href}
                  target={res.href.startsWith("/") ? "_blank" : undefined}
                  rel={res.href.startsWith("/") ? "noopener noreferrer" : undefined}
                  onClick={() => {
                    setOpen(false);
                    if (res.href.startsWith("#")) {
                      const el = document.querySelector(res.href);
                      if (el) el.scrollIntoView({ behavior: "smooth" });
                    }
                  }}
                  className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-xs font-sans bg-[#141414] text-[#C0C0C0] hover:bg-[#1A1A1A] border border-[#C0C0C0]/5 hover:border-[#C0C0C0]/15 transition-all duration-200"
                >
                  <span className="opacity-60">{res.icon}</span>
                  <span>{res.name}</span>
                </a>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
