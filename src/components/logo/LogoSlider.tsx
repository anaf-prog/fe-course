import { motion } from "framer-motion"
import { useMemo } from "react"

type LogoItem = {
  src: string
  color: string
  label: string
}

type LogoProps = {
  src: string
  color: string
  label?: string 
  showLabel?: boolean
}

import { useState } from 'react';

function Logo({ src, color, label, showLabel = true }: LogoProps) {
  const [isHovered, setIsHovered] = useState(false);
  
  // Fungsi untuk mendapatkan warna solid dari gradient
  const getSolidColor = (colorString: string): string => {
    if (colorString.includes('gradient')) {
      const match = colorString.match(/#[0-9A-Fa-f]{6}/);
      return match ? match[0] : "#3b82f6";
    }
    return colorString;
  };

  const solidColor = getSolidColor(color);
  
  return (
    <div 
      className="flex flex-col items-center"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        className="relative h-20 w-32 cursor-pointer flex-shrink-0"
        initial="rest"
        animate={isHovered ? "hover" : "rest"}
      >
        {/* GLOW EFFECT */}
        <motion.div
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 0.7 },
          }}
          transition={{ duration: 0.4 }}
          className="absolute -inset-4 rounded-2xl blur-xl pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${solidColor}33 0%, transparent 70%)`,
          }}
        />
        
        {/* DEFAULT (ABU-ABU) */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: "#6b7280",
            maskImage: `url(${src})`,
            WebkitMaskImage: `url(${src})`,
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
            maskSize: "contain",
            WebkitMaskSize: "contain",
          }}
        />

        {/* HOVER COLOR / GRADIENT */}
        <motion.div
          variants={{
            rest: { opacity: 0 },
            hover: { opacity: 1 },
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0"
          style={{
            background: color, 
            maskImage: `url(${src})`,
            WebkitMaskImage: `url(${src})`,
            maskRepeat: "no-repeat",
            WebkitMaskRepeat: "no-repeat",
            maskPosition: "center",
            WebkitMaskPosition: "center",
            maskSize: "contain",
            WebkitMaskSize: "contain",
          }}
        />
      </motion.div>
      
      {/* Label/Nama di bawah gambar */}
      {showLabel && label && (
        <p 
          className="mt-4 text-center text-sm font-medium
                     transition-all duration-300"
          style={{
            color: isHovered ? solidColor : '#94a3b8',
            opacity: isHovered ? 1 : 0.7,
          }}
        >
          {label}
        </p>
      )}
    </div>
  )
}

interface LogoSliderProps {
  logos?: LogoItem[]
  duplicateSets?: number
  animationDuration?: number
  gap?: string
  logoSize?: string
  showGradientOverlay?: boolean
  showLabels?: boolean
}

export default function LogoSlider({
  logos = [
    { src: "/images/auto.png", color: "linear-gradient(135deg, #22c55e 0%, #3b82f6 100%)", label: "AutoDesk" },
    { src: "/images/cad.png", color: "#ef4444", label: "AutoCAD" },
    { src: "/images/inventor.png", color: "#FFD700", label: "Inventor" },
    { src: "/images/fusion.png", color: "#FF6C37", label: "Fusion 360" },
    { src: "/images/p3d.png", color: "#3b82f6", label: "Plant 3D" },
    { src: "/images/zw.png", color: "#3b82f6", label: "ZWCAD" },
  ],
  duplicateSets = 4,
  animationDuration = 40,
  gap = "mx-10",
  logoSize = "h-20 w-32",
  showGradientOverlay = true,
  showLabels = true,
}: LogoSliderProps) {
  // Generate semua logo
  const allLogos = useMemo(() => {
    const result: LogoItem[] = []
    for (let i = 0; i < duplicateSets; i++) {
      result.push(...logos)
    }
    return result
  }, [logos, duplicateSets])

  // Hitung translateX secara dinamis
  const translateXPercentage = useMemo(() => {
    return `${-100 / duplicateSets}%`
  }, [duplicateSets])

  // Hitung keyframes untuk animasi
  const animationKeyframes = useMemo(() => {
    return `
      @keyframes slide-infinitely {
        0% {
          transform: translateX(0);
        }
        100% {
          transform: translateX(${translateXPercentage});
        }
      }
    `
  }, [translateXPercentage])

  return (
    <section className="py-16 bg-[#030712]">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-slate-500 mb-10 text-sm uppercase tracking-widest">
          Software yang digunakan
        </p>

        <div className="relative overflow-hidden">
          {showGradientOverlay && (
            <div className="absolute inset-0 bg-gradient-to-r from-[#030712] via-transparent to-[#030712] z-10 pointer-events-none" />
          )}
          
          <div 
            className="flex animate-slide-infinitely"
            style={{
              animationDuration: `${animationDuration}s`,
            }}
          >
            {allLogos.map((logo, index) => (
              <div key={`logo-${index}`} className={gap}>
                <Logo 
                  src={logo.src} 
                  color={logo.color}
                  label={logo.label}
                  showLabel={showLabels}
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx global>{`
        ${animationKeyframes}
        
        .animate-slide-infinitely {
          animation: slide-infinitely linear infinite;
          display: flex;
          width: max-content;
          align-items: center; /* Pastikan vertikal align */
        }
        
        .animate-slide-infinitely:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  )
}