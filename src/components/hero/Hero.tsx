import { motion } from "framer-motion"
import { Zap, ChevronRight } from "lucide-react"
import { useEffect, useRef } from "react"

export default function Hero() {
  const gridContainerRef = useRef<HTMLDivElement>(null)
  const gridSize = 64 // 4rem = 64px

  useEffect(() => {
    if (!gridContainerRef.current) return

    const container = gridContainerRef.current
    const colors = ['#FF6C37', '#EF4444', '#3B82F6', '#10B981']
    let runner: HTMLDivElement | null = null
    let animationId: number | null = null
    let isRunning = true

    const createLightRunner = () => {
      if (!isRunning) return
      
      // Hapus runner lama jika ada
      if (runner) {
        runner.remove()
      }
      
      // Pilih arah random: horizontal, vertical, atau diagonal
      const directionType = Math.floor(Math.random() * 4) // 0: horizontal, 1: vertical, 2: diagonal-right, 3: diagonal-left
      
      // Pilih warna random (HANYA untuk titik cahaya)
      const lightColor = colors[Math.floor(Math.random() * colors.length)]
      
      // Buat elemen light runner (titik)
      runner = document.createElement('div')
      runner.className = 'absolute pointer-events-none'
      
      // Tentukan posisi awal berdasarkan arah
      let startX = 0
      let startY = 0
      
      switch(directionType) {
        case 0: // Horizontal dari kiri
          startX = -50
          startY = Math.floor(Math.random() * 6) * gridSize
          break
        case 1: // Vertical dari atas
          startX = Math.floor(Math.random() * 8) * gridSize
          startY = -50
          break
        case 2: // Diagonal kanan dari kiri atas
          startX = -50
          startY = -50
          break
        case 3: // Diagonal kiri dari kanan atas
          startX = container.offsetWidth + 50
          startY = -50
          break
      }
      
      runner.style.cssText = `
        left: ${startX}px;
        top: ${startY}px;
        width: 12px;
        height: 12px;
        background: ${lightColor};
        border-radius: 50%;
        box-shadow: 
          0 0 20px ${lightColor},
          0 0 40px ${lightColor},
          0 0 60px ${lightColor},
          0 0 80px ${lightColor};
        z-index: 1;
        opacity: 0.9;
        transform: translate(-50%, -50%);
      `
      
      container.appendChild(runner)
      
      // Animasi berdasarkan arah
      const duration = 2500 + Math.random() * 1500
      const startTime = Date.now()
      
      const animate = () => {
        if (!runner || !isRunning) return
        
        const elapsed = Date.now() - startTime
        const progress = Math.min(elapsed / duration, 1)
        
        // Hitung posisi berdasarkan arah dan progress
        let newX = startX
        let newY = startY
        
        switch(directionType) {
          case 0: // Horizontal: kiri → kanan
            newX = startX + (progress * (container.offsetWidth + 100))
            break
          case 1: // Vertical: atas → bawah (terbatas karena mask)
            newY = startY + (progress * (container.offsetHeight * 0.7 + 100))
            break
          case 2: // Diagonal kanan: kiri atas → kanan bawah
            newX = startX + (progress * (container.offsetWidth + 100))
            newY = startY + (progress * (container.offsetHeight * 0.7 + 100))
            break
          case 3: // Diagonal kiri: kanan atas → kiri bawah
            newX = startX - (progress * (container.offsetWidth + 100))
            newY = startY + (progress * (container.offsetHeight * 0.7 + 100))
            break
        }
        
        runner!.style.left = `${newX}px`
        runner!.style.top = `${newY}px`
        
        // Efek pulse ringan
        const pulseScale = 1 + (Math.sin(elapsed / 200) * 0.1)
        runner!.style.transform = `translate(-50%, -50%) scale(${pulseScale})`
        
        if (progress < 1) {
          animationId = requestAnimationFrame(animate)
        } else {
          // Selesaikan animasi, mulai lagi dengan delay
          runner.style.opacity = '0'
          runner.style.transition = 'opacity 0.5s ease-out'
          
          setTimeout(() => {
            if (runner) runner.remove()
            runner = null
            // Buat runner baru dengan delay random
            setTimeout(createLightRunner, 800 + Math.random() * 1200)
          }, 500)
        }
      }
      
      animationId = requestAnimationFrame(animate)
    }

    // Mulai dengan satu runner
    setTimeout(createLightRunner, 1000)

    // Cleanup
    return () => {
      isRunning = false
      if (runner) runner.remove()
      if (animationId) cancelAnimationFrame(animationId)
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      
      {/* Background Effects */}
      <div className="absolute inset-0">
        {/* Glow besar di tengah */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-[#FF6C37]/5 blur-[150px]" />
        
        {/* Grid pattern DENGAN MASK - HANYA DI SINI CAHAYA BERJALAN */}
        <div 
          ref={gridContainerRef}
          className="absolute inset-0"
          style={{
            maskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 110%)',
            WebkitMaskImage: 'radial-gradient(ellipse 80% 50% at 50% 0%, #000 70%, transparent 110%)'
          }}
        >
          {/* Grid dasar */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        </div>
      </div>

      {/* Content - TIDAK KENA ANIMASI */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center">
        
        {/* Badge - TETAP OREN */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6C37]/10 border border-[#FF6C37]/20 mb-8"
        >
          <Zap className="w-4 h-4 text-[#FF6C37]" />
          <span className="text-sm font-medium text-[#FF6C37]">
            Launch Week: New Features Added
          </span>
        </motion.div>

        {/* Main Heading - TETAP OREN */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-white tracking-tighter leading-none"
        >
          Build faster with
          <br />
          <span className="relative">
            <span className="text-[#FF6C37]">MyCourse</span>
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="absolute -top-2 -right-4 md:-top-4 md:-right-8 text-2xl md:text-4xl"
            >
              🚀
            </motion.span>
          </span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-8 text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto font-medium"
        >
          Professional CAD tools for architects, engineers, and designers.
          <br />
          <span className="text-slate-300">Mechanical, architectural, electrical, and MEP design in one ecosystem</span>
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-12 flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <button className="group relative px-10 py-5 bg-[#FF6C37] hover:bg-[#E55A2B] text-white font-bold rounded-xl transition-all duration-300 shadow-[0_0_50px_rgba(255,108,55,0.4)] hover:shadow-[0_0_80px_rgba(255,108,55,0.6)] hover:scale-105 flex items-center gap-3 text-lg">
            <Zap className="w-6 h-6" />
            Start Your CAD Journey Today
            <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
          </button>
        </motion.div>

      </div>
    </section>
  )
}
