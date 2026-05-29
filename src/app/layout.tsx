import type { Metadata } from "next";
import { JetBrains_Mono, Bebas_Neue } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/nav/Navigation";
import FloatingMenu from "@/components/nav/FloatingMenu";
import BootLoader from "@/components/loader/BootLoader";
import MagneticCursor from "@/components/cursor/MagneticCursor";
import TransitionCurtain from "@/components/ui/TransitionCurtain";
import CaseStudyTransition from "@/components/ui/CaseStudyTransition";

const jetbrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains-mono", weight: ["400"] });
const bebasNeue = Bebas_Neue({ subsets: ["latin"], variable: "--font-bebas-neue", weight: ["400"] });

export const metadata: Metadata = {
  title: "Raj Krish | Digital Craftsman",
  description: "Cinematic digital experiences that create impact.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link href="https://api.fontshare.com/v2/css?f[]=cabinet-grotesk@800,500,700,400&f[]=satoshi@700,500,300,400&display=swap" rel="stylesheet" />
      </head>
      <body
        className={`${jetbrainsMono.variable} ${bebasNeue.variable} antialiased bg-[#050505] text-[#F5F5F0] font-sans selection:bg-[#C0C0C0] selection:text-[#050505]`}
      >
        <div className="noise-overlay"></div>
        <TransitionCurtain />
        <BootLoader />
        <Navigation />
        <MagneticCursor />
        <FloatingMenu />
        <CaseStudyTransition />
        {children}
      </body>
    </html>
  );
}
