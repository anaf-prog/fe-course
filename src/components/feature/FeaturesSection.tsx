import { useEffect, useRef, useState } from "react"
import BackgroundAnimation from "@/components/feature/FeatureSection/BackgroundAnimation"
import HeaderSection from "@/components/feature/FeatureSection/HeaderSection"
import AutodeskBackground from "@/components/feature/FeatureSection/AutodeskBackground"
import { FeaturesGrid } from "@/components/feature/FeatureSection/FeatureCard"
import StatsSection from "@/components/feature/FeatureSection/StatsSection"
import { features, FeatureItem } from "@/components/feature/FeatureSection/featuresData"

interface FeaturesSectionProps {
  isMounted: boolean
}

export default function FeaturesSection({ isMounted }: FeaturesSectionProps) {
  const [lightPosition, setLightPosition] = useState({ x: 50, y: 50 })
  const [isAnimating, setIsAnimating] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Fungsi untuk membagi features menjadi kelompok 2 item
  const groupFeaturesByTwo = (items: FeatureItem[]): FeatureItem[][] => {
    const groups: FeatureItem[][] = []
    for (let i = 0; i < items.length; i += 2) {
      groups.push(items.slice(i, i + 2))
    }
    return groups
  }

  const featureGroups = groupFeaturesByTwo(features)

  // Animasi cahaya yang bergerak dengan interval
  useEffect(() => {
    let animationFrameId: number
    let startTime: number | null = null
    let currentPath = 0
    
    // Jalur animasi (x%, y%)
    const paths = [
      // Diagonal dari kiri atas ke kanan bawah
      { startX: -20, startY: -20, endX: 120, endY: 120, duration: 6000 },
      // Horizontal dari kanan ke kiri
      { startX: 120, startY: 50, endX: -20, endY: 50, duration: 5000 },
      // Vertical dari bawah ke atas
      { startX: 50, startY: 120, endX: 50, endY: -20, duration: 4000 },
    ]

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      if (!isAnimating) return

      const path = paths[currentPath]
      const elapsed = timestamp - startTime
      const progress = Math.min(elapsed / path.duration, 1)
      
      // Hitung posisi berdasarkan progress
      const currentX = path.startX + (path.endX - path.startX) * progress
      const currentY = path.startY + (path.endY - path.startY) * progress
      
      setLightPosition({ x: currentX, y: currentY })
      
      if (progress >= 1) {
        // Selesai path saat ini, pindah ke path berikutnya dengan delay
        startTime = null
        currentPath = (currentPath + 1) % paths.length
        
        // Jeda 3 detik sebelum animasi berikutnya
        setTimeout(() => {
          if (isAnimating) {
            startTime = performance.now()
          }
        }, 3000)
      }
      
      animationFrameId = requestAnimationFrame(animate)
    }
    
    // Mulai animasi pertama dengan delay 1 detik
    setTimeout(() => {
      startTime = performance.now()
      animationFrameId = requestAnimationFrame(animate)
    }, 1000)
    
    return () => {
      setIsAnimating(false)
      cancelAnimationFrame(animationFrameId)
    }
  }, [isAnimating])

  return (
    <section className="py-32 relative">
      {/* Animasi background */}
      <BackgroundAnimation isMounted={isMounted} />

      <div className="max-w-7xl mx-auto px-6">
        {/* Header section */}
        <HeaderSection />
        
        {/* Container untuk grid */}
        <div className="relative max-w-5xl mx-auto">
          {/* SVG Background dengan efek light runner */}
          <AutodeskBackground 
            lightPosition={lightPosition} 
            containerRef={containerRef}
          />

          {/* Grid untuk card - dinamis berdasarkan jumlah item */}
          <FeaturesGrid featureGroups={featureGroups} />
        </div>

        {/* Animated Stats --> animasi di non aktifin dulu */}
        {/* <StatsSection /> */}
      </div>
    </section>
  )
}