"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar/Navbar"
import Hero from "@/components/hero/Hero"
import LogoSlider from "@/components/logo/LogoSlider"
import ACADAnimation from "@/app/animation/ACADAnimation"
import FeaturesSection from "@/components/feature/FeaturesSection"
import VideoSection from "@/components/feature/VideoSection"
import MapSection from "@/components/map/MapSection"
import Footer from "@/components/footer/Footer"

export default function Home() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#030712] overflow-x-hidden">
      <Navbar 
        scrolled={scrolled} 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
      />
      
      <Hero />
      
      <LogoSlider />

            {/* ========== AUTOCAD ANIMATION DEMO ========== */}
      <section className="py-16 bg-gradient-to-b from-[#030712] to-[#030712]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gray-800/50 rounded-full border border-gray-700">
              <div className="w-2 h-2 bg-cyan-500 rounded-full animate-pulse"></div>
              <span className="text-cyan-300 text-sm font-mono">AUTOCAD DEMO</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              <span className="bg-gradient-to-r from-cyan-400 via-green-400 to-cyan-400 bg-clip-text text-transparent">
                AutoCAD in Action
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Watch our automated AutoCAD demo creating precise technical drawings in real-time.
              Every line, circle, and dimension is programmatically generated.
            </p>
          </div>
          
          <ACADAnimation />
          
          <div className="mt-12 text-center text-gray-500 text-sm max-w-3xl mx-auto">
            <p className="mb-4">
              This demo showcases automated CAD operations including line drawing, circle creation, 
              dimensioning, and coordinate tracking — all rendered programmatically in your browser.
            </p>
            <div className="flex flex-wrap justify-center gap-6 mt-6">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span>Line Drawing</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-cyan-500 rounded-full"></div>
                <span>Circle Creation</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <span>Dimensioning</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span>Coordinate Tracking</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <FeaturesSection isMounted={isMounted} />

      <VideoSection />

      <MapSection />
      
      <Footer />
    </div>
  )
}