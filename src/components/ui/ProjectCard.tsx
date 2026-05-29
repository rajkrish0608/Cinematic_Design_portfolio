"use client";

import { useState } from "react";
import { GitHubRepo } from "@/hooks/useGitHubRepos";

interface Project {
  id: string;
  title: string;
  tags: string[];
  description: string;
  githubSlug: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  repoData?: GitHubRepo;
}

export default function ProjectCard({ project, index, repoData }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative w-full h-full flex-shrink-0 bg-[#0A0A0A] border border-[#C0C0C0]/10 overflow-hidden group cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      data-cursor="VIEW"
    >
      {/* Background Image/Pattern Placeholder */}
      <div className="absolute inset-0 z-0 bg-[#0A0A0A] transition-transform duration-700 group-hover:scale-105">
        <div className="absolute inset-0 opacity-[0.03] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
      </div>

      {/* Top Left Number */}
      <div className="absolute top-8 left-8 font-mono text-[#8A8A85] text-sm z-20">
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Default View (Title only) */}
      <div className={`absolute inset-0 z-10 p-8 flex flex-col justify-end bg-gradient-to-t from-[#050505] via-transparent to-transparent transition-opacity duration-700 ${isHovered ? 'opacity-0' : 'opacity-100'}`}>
        <h3 className="font-display font-bold text-4xl text-[#F5F5F0] text-balance tracking-tight">
          {project.title}
        </h3>
      </div>

      {/* Cinematic Blur Reveal */}
      <div 
        className={`absolute inset-0 z-20 p-8 flex flex-col justify-between transition-all duration-700 ease-out bg-black/60 backdrop-blur-xl ${isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8 pointer-events-none'}`}
      >
        <div className="flex flex-wrap gap-3 mt-12">
          {project.tags.map((tag, i) => (
            <span key={i} className="px-3 py-1 border border-[#D4AF37]/30 rounded-full text-[10px] font-mono uppercase tracking-widest text-[#D4AF37]">
              {tag}
            </span>
          ))}
        </div>

        <div>
          <h3 className="font-display font-bold text-3xl md:text-4xl text-[#F5F5F0] mb-4 text-balance tracking-tight">
            {project.title}
          </h3>
          <p className="font-sans text-[#C0C0C0] text-lg mb-8 leading-relaxed max-w-sm">
            {project.description}
          </p>

          <div className="flex items-center justify-between border-t border-[#C0C0C0]/20 pt-6">
            {repoData ? (
              <div className="flex items-center gap-6 text-xs font-mono text-[#8A8A85]">
                <span className="flex items-center gap-1">
                  <span className="text-[#D4AF37]">★</span> {repoData.stargazers_count}
                </span>
                <span>{repoData.language || "Tech"}</span>
              </div>
            ) : (
              <div className="text-xs font-mono text-[#8A8A85]">
                Fetching telemetry...
              </div>
            )}
            
            <a 
              href={repoData?.html_url || "#"} 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#F5F5F0] hover:text-[#D4AF37] transition-colors"
            >
              Access Data <span className="text-[10px]">↗</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
