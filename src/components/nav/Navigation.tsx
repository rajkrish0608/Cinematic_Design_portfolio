"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Plus } from "lucide-react"; // Assuming lucide-react is installed, if not I'll just use SVG

const NAV_LINKS = [
  { name: "WORK", href: "#projects" },
  { name: "ABOUT", href: "#identity" },
  { name: "EXPERIMENTS", href: "#experiments" },
  { name: "JOURNAL", href: "#journal" },
  { name: "CONTACT", href: "#contact" }
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <>
      <nav className="fixed top-6 w-full z-40 px-6 md:px-12 flex justify-between items-start pointer-events-none">
        
        {/* Left Header - Creative Developer */}
        <div className="hidden lg:flex flex-col gap-1 font-mono text-[10px] uppercase tracking-widest text-[#8A8A85] mt-4">
          <div className="flex items-center gap-2">
            <span className="w-1 h-1 rounded-full bg-[#D4AF37]"></span>
            CREATIVE DEVELOPER
          </div>
          <div className="ml-3">PRODUCT ENGINEER</div>
        </div>

        {/* Center Pill Navigation */}
        <div className={`glass-panel px-4 py-3 flex items-center gap-8 pointer-events-auto transition-all duration-500 rounded-full ${scrolled ? 'bg-[#050505]/80' : 'bg-[#0F0F0F]/40'}`}>
          
          {/* RK Logo Circle */}
          <Link href="/" className="w-10 h-10 rounded-full border border-[#C0C0C0]/20 flex items-center justify-center font-display font-medium text-sm text-[#F5F5F0] hover:bg-[#F5F5F0] hover:text-[#050505] transition-colors">
            RK
          </Link>

          <span className="w-1 h-1 rounded-full bg-[#C0C0C0]/40 hidden md:block"></span>

          {/* Links */}
          <div className="hidden md:flex items-center gap-8 font-sans text-[11px] font-medium tracking-widest uppercase">
            {NAV_LINKS.map((link, idx) => (
              <Link 
                key={idx} 
                href={link.href}
                className="text-[#C0C0C0] hover:text-[#F5F5F0] transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Let's Build Button */}
          <a href="/Raj_Resume.pdf" target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-3 bg-[#1A1A1A] border border-[#C0C0C0]/10 rounded-full pl-6 pr-1.5 py-1.5 text-[11px] font-sans font-medium tracking-widest uppercase text-[#F5F5F0] hover:bg-[#F5F5F0] hover:text-[#050505] transition-all group">
            LET'S BUILD
            <div className="w-7 h-7 rounded-full bg-[#F5F5F0] text-[#050505] flex items-center justify-center group-hover:bg-[#050505] group-hover:text-[#F5F5F0] transition-colors">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            </div>
          </a>
        </div>

        {/* Right Menu Circle */}
        <div className="pointer-events-auto flex items-center gap-4 mt-2">
          <button 
            onClick={toggleMobileMenu}
            className="w-12 h-12 rounded-full border border-[#C0C0C0]/20 glass-panel flex flex-col items-center justify-center gap-1 hover:bg-[#1A1A1A] transition-colors"
          >
            <div className="flex gap-1">
              <span className="w-1 h-1 rounded-full bg-[#F5F5F0]"></span>
              <span className="w-1 h-1 rounded-full bg-[#F5F5F0]"></span>
            </div>
            <div className="flex gap-1">
              <span className="w-1 h-1 rounded-full bg-[#F5F5F0]"></span>
              <span className="w-1 h-1 rounded-full bg-[#F5F5F0]"></span>
            </div>
          </button>
          <span className="font-mono text-[10px] uppercase tracking-widest text-[#8A8A85] hidden lg:block">
            MENU
          </span>
        </div>

      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-50 bg-[#050505]/95 backdrop-blur-2xl flex flex-col justify-center px-8 transition-transform duration-700 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button 
          onClick={() => setMobileMenuOpen(false)}
          className="absolute top-10 right-10 w-12 h-12 rounded-full border border-[#C0C0C0]/20 flex items-center justify-center text-[#F5F5F0]"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M18 6L6 18M6 6l12 12"/></svg>
        </button>

        <div className="flex flex-col gap-6 relative z-10">
          {NAV_LINKS.map((link, idx) => (
            <Link 
              key={idx} 
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="font-display text-5xl md:text-7xl font-bold text-[#F5F5F0] hover:text-[#D4AF37] transition-colors uppercase leading-none tracking-tight"
            >
              {link.name}
            </Link>
          ))}
          
          <a href="/Raj_Resume.pdf" target="_blank" rel="noopener noreferrer" className="mt-8 font-mono text-sm uppercase tracking-widest text-[#D4AF37] border-b border-[#D4AF37] w-fit pb-1">
            Download Resume
          </a>
        </div>
      </div>
    </>
  );
}
