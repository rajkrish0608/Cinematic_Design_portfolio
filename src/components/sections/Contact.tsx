"use client";

import { useState } from "react";
import MagneticButton from "@/components/ui/MagneticButton";

export default function Contact() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: ""
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network request
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSent(true);
    }, 1500);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="snap-start relative w-full py-32 bg-[#050505] min-h-screen flex items-center border-t border-[#C0C0C0]/10 overflow-hidden">
      
      {/* Background Soft Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] h-[80vw] max-w-[800px] max-h-[800px] bg-[#D4AF37] rounded-full blur-[120px] opacity-[0.03] mix-blend-screen pointer-events-none" />
      </div>

      <div className="absolute top-12 right-12 font-mono text-[#D4AF37] text-xs uppercase tracking-widest opacity-60">
        Chapter 04 // The Climax
      </div>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        
        {/* Left Column: CTA Typography */}
        <div className="flex flex-col justify-center h-full">
          <h2 className="font-display font-extrabold text-[clamp(50px,8vw,120px)] text-[#F5F5F0] leading-[0.9] tracking-tight uppercase mb-8">
            Let's build<br />
            <span className="text-[#D4AF37] italic font-serif">something</span><br />
            unforgettable.
          </h2>
          
          <p className="font-sans text-xl text-[#8A8A85] max-w-md mb-12">
            Whether it's deploying AI models to the edge, or architecting resilient systems. The best work happens in collaboration.
          </p>

          <div className="flex flex-wrap gap-8">
            {['LinkedIn', 'GitHub', 'Email', 'Twitter'].map((social) => (
              <a 
                key={social}
                href="#"
                className="group flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#F5F5F0] hover:text-[#D4AF37] transition-colors"
              >
                {social} 
                <span className="text-[10px] transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform opacity-50 group-hover:opacity-100">↗</span>
              </a>
            ))}
          </div>
        </div>

        {/* Right Column: Glassmorphic Form */}
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[#C0C0C0]/5 to-transparent rounded-2xl blur-xl" />
          
          <div className="relative bg-white/[0.02] backdrop-blur-2xl border border-white/[0.05] rounded-2xl p-8 md:p-12 shadow-2xl">
            <h3 className="font-serif italic text-2xl text-[#F5F5F0] mb-8">Initiate connection.</h3>
            
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              
              <div className="relative group">
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formState.name}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/10 py-4 font-sans text-lg text-[#F5F5F0] placeholder:text-[#8A8A85] focus:outline-none focus:border-[#D4AF37] transition-colors"
                  placeholder="Your Name"
                />
              </div>

              <div className="relative group">
                <input 
                  type="email" 
                  name="email"
                  required
                  value={formState.email}
                  onChange={handleChange}
                  className="w-full bg-transparent border-b border-white/10 py-4 font-sans text-lg text-[#F5F5F0] placeholder:text-[#8A8A85] focus:outline-none focus:border-[#D4AF37] transition-colors"
                  placeholder="Your Email Address"
                />
              </div>

              <div className="relative group">
                <textarea 
                  name="message"
                  required
                  value={formState.message}
                  onChange={handleChange}
                  rows={4}
                  className="w-full bg-transparent border-b border-white/10 py-4 font-sans text-lg text-[#F5F5F0] placeholder:text-[#8A8A85] focus:outline-none focus:border-[#D4AF37] transition-colors resize-none"
                  placeholder="Tell me about the project..."
                />
              </div>

              <MagneticButton 
                type="submit"
                disabled={isSubmitting || isSent}
                className={`mt-8 w-full py-5 rounded-full font-mono text-xs uppercase tracking-[0.2em] transition-all duration-500 overflow-hidden relative group ${
                  isSent 
                    ? "bg-transparent border border-[#C0C0C0]/30 text-[#F5F5F0]" 
                    : "bg-[#D4AF37] text-black hover:bg-[#F5F5F0]"
                }`}
              >
                <div className="relative z-10 flex items-center justify-center gap-3">
                  {isSubmitting ? (
                    <span className="animate-pulse">TRANSMITTING...</span>
                  ) : isSent ? (
                    <>
                      <span>MESSAGE RECEIVED</span>
                    </>
                  ) : (
                    <>
                      <span>SEND TRANSMISSION</span>
                      <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </>
                  )}
                </div>
              </MagneticButton>
            </form>
          </div>
        </div>

      </div>
    </section>
  );
}
