"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar/Navbar"  
import Footer from "@/components/footer/Footer"
import HeroSection from "@/components/hero/HeroAbout"
import TabsSection from "@/components/feature/TabSectionAbout"
import CTASection from "@/components/feature/CtaSectionAbout"

export default function AboutPage() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="min-h-screen bg-[#030712] overflow-x-hidden">
      {/* ========== NAVBAR ========== */}
      <Navbar 
        scrolled={scrolled} 
        mobileMenuOpen={mobileMenuOpen} 
        setMobileMenuOpen={setMobileMenuOpen} 
      />

      {/* ========== HERO ABOUT SECTION ========== */}
      <HeroSection />

      {/* ========== TABS SECTION ========== */}
      <TabsSection />

      {/* ========== CTA SECTION ========== */}
      <CTASection />

      {/* ========== FOOTER ========== */}
      <Footer />
    </div>
  )
}