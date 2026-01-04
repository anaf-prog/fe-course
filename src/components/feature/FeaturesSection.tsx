import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

interface FeaturesSectionProps {
  isMounted: boolean
}

export default function FeaturesSection({ isMounted }: FeaturesSectionProps) {
  const [lightPosition, setLightPosition] = useState({ x: -100, y: 50 })
  const [isAnimating, setIsAnimating] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  
  // Data untuk 4 card features dengan logo CAD
  const features = [
    { 
      logo: "/images/A-cad.png", 
      title: "AutoCAD", 
      desc: "Advanced CAD design tools for professional engineering projects",
      color: "text-red-400" 
    },
    { 
      logo: "/images/I-cad.png", 
      title: "Autodesk Inventor", 
      desc: "Intelligent CAD solutions with automation",
      color: "text-yellow-400" 
    },
    { 
      logo: "/images/F-cad.png", 
      title: "Autodesk Fusion 360", 
      desc: "Fusion CAD platform for seamless 3D modeling and simulation",
      color: "text-orange-400" 
    },
    { 
      logo: "/images/P3d-cad.png", 
      title: "Autodesk Plant 3D", 
      desc: "Professional 3D CAD studio for architectural and product design",
      color: "text-red-400" 
    },
  ]

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
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {isMounted && [...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[1px] bg-gradient-to-r from-transparent via-[#FF6C37]/20 to-transparent"
            initial={{ x: "-100%", y: `${Math.random() * 100}%` }}
            animate={{ x: "200%" }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            style={{
              width: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Complete CAD Solutions <span className="text-[#FF6C37]">Suite</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Professional CAD tools for engineering, architecture, and product design
          </p>
        </motion.div>

        {/* Container untuk grid */}
        <div className="relative max-w-5xl mx-auto">
          {/* SVG Background dengan efek light runner */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.3 }}
              className="relative w-[500px] h-[400px]"
              ref={containerRef}
            >
              {/* Base SVG (grayscale) */}
              <img 
                src="/images/autodesk-3.svg"
                alt="Autodesk Background"
                className="absolute w-full h-full object-contain filter grayscale opacity-25 transition-opacity duration-700"
                onError={(e) => {
                  e.currentTarget.style.display = 'none'
                }}
              />
              
              {/* SVG dengan efek cahaya */}
              <div className="absolute w-full h-full">
                <img 
                  src="/images/autodesk-3.svg"
                  alt="Autodesk Glow"
                  className="absolute w-full h-full object-contain"
                  style={{
                    filter: 'url(#glowFilter)',
                    opacity: 0.7,
                    transform: `translate(${lightPosition.x * 0.1}px, ${lightPosition.y * 0.1}px)`,
                    transition: 'transform 0.1s linear, opacity 0.3s ease',
                  }}
                />
                
                {/* SVG Filter untuk efek glow */}
                <svg style={{ position: 'absolute', width: 0, height: 0 }}>
                  <defs>
                    <filter id="glowFilter">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feFlood floodColor="#22c55e" floodOpacity="0.8" result="color" />
                      <feComposite in="color" in2="blur" operator="in" result="coloredBlur" />
                      <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>
                </svg>
              </div>
              
              {/* Light runner effect */}
              <div
                className="absolute pointer-events-none"
                style={{
                  left: `${lightPosition.x}%`,
                  top: `${lightPosition.y}%`,
                  width: '120px',
                  height: '120px',
                  transform: 'translate(-50%, -50%)',
                  background: 'radial-gradient(circle, rgba(34,197,94,0.8) 0%, rgba(59,130,246,0.6) 30%, rgba(59,130,246,0.3) 50%, transparent 70%)',
                  filter: 'blur(20px)',
                  opacity: 0.9,
                  transition: 'left 0.1s linear, top 0.1s linear',
                  mixBlendMode: 'screen',
                }}
              />
            </motion.div>
          </div>

          {/* Grid untuk 4 card - 2x2 layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-8 hover:border-[#FF6C37]/30 transition-all duration-300 overflow-hidden min-h-[280px] flex flex-col"
              >
                {/* Hover effect background */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#FF6C37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10 flex-1 flex flex-col">
                  {/* Logo container */}
                  <div className="flex items-start mb-6">
                    <div className="w-16 h-16 rounded-xl bg-slate-800 flex items-center justify-center p-3 mr-4">
                      <div className="relative w-full h-full">
                        <img 
                          src={feature.logo} 
                          alt={feature.title}
                          className="w-full h-full object-contain"
                          onError={(e) => {
                            e.currentTarget.src = `https://placehold.co/100x100/1e293b/ffffff?text=${feature.title.charAt(0)}`
                          }}
                        />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
                      <div className={`text-sm font-medium ${feature.color}`}>
                        CAD Design Platform
                      </div>
                    </div>
                  </div>
                  
                  {/* Description */}
                  <p className="text-slate-400 text-lg mb-6 flex-1">
                    {feature.desc}
                  </p>
                  
                  {/* Bottom section */}
                  <div className="mt-auto pt-6 border-t border-slate-800">
                    <button className="text-[#FF6C37] hover:text-[#ff8154] font-medium flex items-center gap-2 group text-lg">
                      Explore Features
                      <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Animated Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { value: "50K+", label: "CAD Professionals" },
            { value: "99.9%", label: "Precision Accuracy" },
            { value: "4.9/5", label: "User Rating" },
            { value: "Global", label: "Support Network" }
          ].map((stat, index) => (
            <div 
              key={stat.label} 
              className="relative p-6 group cursor-pointer"
            >
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="absolute -inset-4 bg-gradient-to-br from-[#FF6C37]/10 to-transparent 
                          rounded-2xl blur-xl opacity-0 group-hover:opacity-100 
                          transition-all duration-500 pointer-events-none"
              />
              
              <div className="relative z-10 transform group-hover:scale-105 transition-transform duration-300">
                <div className="text-5xl font-bold text-white mb-2 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-slate-400 group-hover:text-slate-300 transition-colors">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}