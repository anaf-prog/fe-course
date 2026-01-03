"use client"

import { useState, useEffect } from "react"
import Navbar from "@/components/navbar/Navbar"
import Hero from "@/components/hero/Hero"
import LogoSlider from "@/components/logo/LogoSlider"
import FeaturesSection from "@/components/feature/FeaturesSection"
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
      
      <FeaturesSection isMounted={isMounted} />
      
      <Footer />
    </div>
  )
}