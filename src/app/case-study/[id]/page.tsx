import React from "react";
import Link from "next/link";
import Image from "next/image";
import MagneticButton from "@/components/ui/MagneticButton";

const CASE_STUDIES = {
  "lumina": {
    title: "LUMINA",
    type: "Healthcare AI",
    year: "2024",
    role: "AI Architect",
    image: "/lumina.png",
    overview: "Lumina represents a paradigm shift in how we approach early-stage Alzheimer's detection. By leveraging 3D Convolutional Neural Networks and advanced medical imaging techniques, we achieved a level of predictive accuracy previously thought impossible for pre-symptomatic patients.",
    architecture: [
      {
        title: "Data Pipeline",
        desc: "Ingestion of multi-modal MRI scans with automated voxel normalization and skull-stripping preprocessing."
      },
      {
        title: "Core Model",
        desc: "A custom 3D ResNet architecture trained on a distributed GPU cluster to identify micro-atrophy patterns."
      },
      {
        title: "Clinical UI",
        desc: "A Next.js dashboard providing explainable AI (XAI) heatmaps to clinicians in real-time."
      }
    ]
  },
  "nexora": {
    title: "NEXORA",
    type: "Defense Technology",
    year: "2023",
    role: "Embedded Systems Lead",
    image: "/nexora.png",
    overview: "Built for extreme environments, Nexora is a tactical AI wearable that fuses biometric data with computer vision. It provides real-time threat analysis, vitals monitoring, and encrypted mesh communication without relying on cloud infrastructure.",
    architecture: [
      {
        title: "Edge Compute",
        desc: "Optimized TensorFlow Lite models running on a custom ESP32-S3 PCB with hardware acceleration."
      },
      {
        title: "Sensor Fusion",
        desc: "Kalman filtering combines IMU, heart rate, and thermal imaging data to detect stress anomalies."
      },
      {
        title: "Resilience",
        desc: "An offline-first mesh network protocol ensuring operational continuity even in signal-jammed areas."
      }
    ]
  },
  "horizon": {
    title: "HORIZON",
    type: "Autonomous Robotics",
    year: "2023",
    role: "Robotics Engineer",
    image: "/horizon.png",
    overview: "Horizon pushes the boundaries of untethered autonomy. A custom-built rover platform designed to navigate completely unstructured outdoor terrain using visual SLAM, depth sensing, and reinforcement learning-based path planning.",
    architecture: [
      {
        title: "Perception",
        desc: "Intel RealSense depth fusion with LiDAR data processed through ROS2 navigation stack."
      },
      {
        title: "Kinematics",
        desc: "A rocker-bogie suspension system mathematically modeled for high-torque obstacle traversal."
      },
      {
        title: "Pathing",
        desc: "A dynamic A* variant that updates cost-maps in real-time based on terrain ruggedness."
      }
    ]
  }
};

export default function CaseStudyPage({ params }: { params: { id: string } }) {
  const data = CASE_STUDIES[params.id as keyof typeof CASE_STUDIES];

  if (!data) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center text-[#F5F5F0]">
        <h1>Project Not Found</h1>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] text-[#F5F5F0] overflow-x-hidden selection:bg-[#C0C0C0] selection:text-[#050505]">
      {/* Cinematic Header Image */}
      <div className="relative w-full h-[60vh] md:h-[80vh] overflow-hidden">
        <div className="absolute inset-0 z-10 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/50" />
        <div className="absolute inset-0 z-10 bg-black/40 backdrop-blur-[2px]" />
        
        {/* Animated Reveal Image */}
        <div className="absolute inset-0 animate-scale-slow">
          <Image 
            src={data.image} 
            alt={data.title} 
            fill 
            className="object-cover object-center filter grayscale-[0.3]"
          />
        </div>

        <div className="absolute bottom-0 left-0 w-full z-20 p-6 md:p-12 lg:px-24">
          <Link href="/#projects" className="inline-flex items-center gap-2 font-mono text-xs text-[#D4AF37] uppercase tracking-widest hover:text-[#F5F5F0] transition-colors mb-8 group">
            <span className="transform group-hover:-translate-x-1 transition-transform">←</span> Return to Base
          </Link>
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <div className="font-mono text-sm tracking-widest text-[#C0C0C0] mb-4 uppercase">
                {data.type} // {data.year}
              </div>
              <h1 className="font-bebas text-[clamp(60px,12vw,180px)] leading-[0.85] tracking-normal text-[#F5F5F0] drop-shadow-2xl">
                {data.title}
              </h1>
            </div>
            <div className="pb-4 font-serif italic text-xl md:text-2xl text-[#8A8A85]">
              Role: <span className="text-[#D4AF37]">{data.role}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 lg:px-24 py-24 md:py-32 grid grid-cols-1 lg:grid-cols-12 gap-16">
        
        {/* Left Column: Overview */}
        <div className="lg:col-span-5">
          <h2 className="font-mono text-xs tracking-widest text-[#D4AF37] uppercase mb-8 border-b border-[#C0C0C0]/10 pb-4">
            01 // The Thesis
          </h2>
          <p className="font-sans text-xl md:text-2xl leading-relaxed text-[#F5F5F0] font-light">
            {data.overview}
          </p>
          
          <div className="mt-16">
            <MagneticButton className="px-8 py-4 rounded-full bg-[#1A1A1A] border border-[#C0C0C0]/20 text-[#F5F5F0] font-mono text-xs tracking-widest uppercase hover:bg-[#F5F5F0] hover:text-[#050505] transition-colors">
              View Source Code ↗
            </MagneticButton>
          </div>
        </div>

        {/* Right Column: Architecture */}
        <div className="lg:col-span-6 lg:col-start-7 flex flex-col gap-12">
          <h2 className="font-mono text-xs tracking-widest text-[#D4AF37] uppercase mb-2 border-b border-[#C0C0C0]/10 pb-4">
            02 // Architecture & Engineering
          </h2>
          
          {data.architecture.map((arch, idx) => (
            <div key={idx} className="group cursor-default">
              <div className="flex items-baseline gap-4 mb-3">
                <span className="font-mono text-[10px] text-[#8A8A85]">0{idx + 1}</span>
                <h3 className="font-serif italic text-2xl md:text-3xl text-[#F5F5F0] group-hover:text-[#D4AF37] transition-colors">
                  {arch.title}
                </h3>
              </div>
              <p className="font-sans text-[#8A8A85] text-base leading-relaxed pl-8">
                {arch.desc}
              </p>
            </div>
          ))}
        </div>

      </div>

      {/* Full-width Image Break */}
      <div className="w-full h-[50vh] relative">
        <div className="absolute inset-0 bg-[#D4AF37] mix-blend-overlay z-10 opacity-20" />
        <Image 
          src={data.image} 
          alt={`${data.title} Architecture`} 
          fill 
          className="object-cover object-center filter sepia-[0.3]"
        />
      </div>

    </main>
  );
}
