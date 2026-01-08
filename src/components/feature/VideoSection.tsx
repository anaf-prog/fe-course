"use client"

import { useState, useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { Play, ChevronLeft, ChevronRight } from "lucide-react"
import { FaYoutube } from "react-icons/fa"
import { videos, VideoCardProps } from "@/components/feature/VideosSection/videosData"

export default function VideoSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const cardRefs = useRef<(HTMLDivElement | null)[]>([])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleCards, setVisibleCards] = useState(1)

  // Inisialisasi ref array
  useEffect(() => {
    cardRefs.current = cardRefs.current.slice(0, videos.length)
  }, [videos.length])

  // Deteksi jumlah card yang terlihat berdasarkan ukuran layar
  useEffect(() => {
    const updateVisibleCards = () => {
      if (typeof window === 'undefined') return
      
      const width = window.innerWidth
      if (width >= 1024) {
        setVisibleCards(4) // desktop
      } else if (width >= 640) {
        setVisibleCards(2) // tablet
      } else {
        setVisibleCards(1) // mobile
      }
    }

    updateVisibleCards()
    window.addEventListener('resize', updateVisibleCards)
    return () => window.removeEventListener('resize', updateVisibleCards)
  }, [])

  const scrollLeft = () => {
    if (containerRef.current && cardRefs.current[0]) {
      const container = containerRef.current
      const cardWidth = cardRefs.current[0].offsetWidth + 24 // width + gap
      
      container.scrollBy({ 
        left: -cardWidth * visibleCards, 
        behavior: 'smooth' 
      })
      setCurrentIndex(prev => Math.max(0, prev - 1))
    }
  }

  const scrollRight = () => {
    if (containerRef.current && cardRefs.current[0]) {
      const container = containerRef.current
      const cardWidth = cardRefs.current[0].offsetWidth + 24 // width + gap
      
      container.scrollBy({ 
        left: cardWidth * visibleCards, 
        behavior: 'smooth' 
      })
      setCurrentIndex(prev => Math.min(
        Math.ceil(videos.length / visibleCards) - 1, 
        prev + 1
      ))
    }
  }

  // Handle scroll untuk update currentIndex
  const handleScroll = () => {
    if (containerRef.current && cardRefs.current[0]) {
      const container = containerRef.current
      const cardWidth = cardRefs.current[0].offsetWidth + 24
      const scrollLeft = container.scrollLeft
      const newIndex = Math.round(scrollLeft / (cardWidth * visibleCards))
      setCurrentIndex(Math.max(0, Math.min(newIndex, Math.ceil(videos.length / visibleCards) - 1)))
    }
  }

  const canScrollLeft = currentIndex > 0
  const canScrollRight = currentIndex < Math.ceil(videos.length / visibleCards) - 1

  return (
    <section className="relative py-24 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6C37]/10 border border-[#FF6C37]/20 mb-6">
            <FaYoutube className="w-4 h-4 text-[#FF6C37]" />
            <span className="text-sm font-medium text-[#FF6C37]">
              Video Tutorials
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            CAD <span className="text-[#FF6C37]">Tutorial</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            Watch our comprehensive tutorials
          </p>
        </motion.div>

        {/* Video Carousel dengan Container Relative */}
        <div className="relative group/carousel px-2">
            {/* Navigation Buttons - SEJAJAR DENGAN CARD */}
            <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10">
                <button
                onClick={scrollLeft}
                disabled={!canScrollLeft}
                className={`p-3 rounded-full border backdrop-blur-sm transition-all duration-300 transform hover:scale-110 ${
                    canScrollLeft 
                    ? 'border-slate-600 hover:border-[#FF6C37] text-white bg-slate-900/50 hover:bg-[#FF6C37]/20' 
                    : 'border-slate-800 text-slate-600 cursor-not-allowed opacity-50'
                }`}
                >
                <ChevronLeft className="w-6 h-6" />
                </button>
            </div>

            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10">
                <button
                onClick={scrollRight}
                disabled={!canScrollRight}
                className={`p-3 rounded-full border backdrop-blur-sm transition-all duration-300 transform hover:scale-110 ${
                    canScrollRight 
                    ? 'border-slate-600 hover:border-[#FF6C37] text-white bg-slate-900/50 hover:bg-[#FF6C37]/20' 
                    : 'border-slate-800 text-slate-600 cursor-not-allowed opacity-50'
                }`}
                >
                <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            {/* Container dengan overflow-hidden TANPA memotong tombol */}
            <div className="overflow-hidden">
                {/* Scroll Container */}
                <div 
                ref={containerRef}
                onScroll={handleScroll}
                className="flex overflow-x-auto scrollbar-hide gap-6 pb-8 snap-x snap-mandatory"
                style={{ 
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none',
                  scrollBehavior: 'smooth'
                }}
                >
                {videos.map((video, index) => (
                    <div 
                    key={index} 
                    ref={(el: HTMLDivElement | null) => {
                      cardRefs.current[index] = el
                    }}
                    className="flex-shrink-0 w-[calc(100%-1rem)] sm:w-[calc(50%-1.5rem)] lg:w-[calc(25%-1.5rem)] snap-start"
                    >
                    <VideoCard {...video} />
                    </div>
                ))}
                </div>
            </div>

            {/* Gradient Overlay yang lebih tipis - HANYA ketika hover */}
            <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#030712]/80 via-transparent to-transparent pointer-events-none opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300" />
            <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#030712]/80 via-transparent to-transparent pointer-events-none opacity-0 group-hover/carousel:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Additional Resources */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <div className="inline-flex flex-col sm:flex-row items-center justify-between gap-6 p-8 rounded-2xl bg-gradient-to-r from-slate-900/60 to-slate-800/30 border border-slate-700/50 backdrop-blur-sm max-w-3xl mx-auto w-full">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-xl bg-[#FF6C37]/10 border border-[#FF6C37]/20">
                <FaYoutube className="w-8 h-8 text-[#FF6C37]" />
              </div>
              <div className="text-left">
                <h3 className="text-white font-semibold text-xl mb-1">More on YouTube</h3>
                <p className="text-slate-400">Subscribe to our channel for weekly tutorials</p>
              </div>
            </div>
            <a 
              href="https://www.youtube.com/@indonesiandraftingschool6818" 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-8 py-3 bg-[#FF6C37] hover:bg-[#E55A2B] text-white font-medium rounded-lg transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,108,55,0.3)] whitespace-nowrap flex items-center gap-2"
            >
              <FaYoutube className="w-5 h-5" />
              Visit Channel
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function VideoCard({ title, description, youtubeId, category }: VideoCardProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="group relative h-full"
    >
      {/* Card glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#FF6C37]/20 to-[#3B82F6]/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
      
      <div className="relative bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 rounded-2xl overflow-hidden hover:border-slate-600/50 transition-all duration-300 h-full flex flex-col">
        {/* Video Thumbnail/Player */}
        <div className="relative aspect-video bg-slate-800 overflow-hidden flex-shrink-0">
          {!isPlaying ? (
            <>
              {/* YouTube Thumbnail */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg)`,
                }}
              />
              
              {/* Overlay dengan play button */}
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                <button
                  onClick={() => setIsPlaying(true)}
                  className="relative group/play"
                >
                  <div className="absolute inset-0 bg-[#FF6C37] rounded-full animate-ping opacity-20 group-hover/play:opacity-40" />
                  <div className="relative w-16 h-16 bg-[#FF6C37] hover:bg-[#ff8154] rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_0_40px_rgba(255,108,55,0.5)] group-hover/play:shadow-[0_0_60px_rgba(255,108,55,0.7)]">
                    <Play className="w-6 h-6 text-white ml-1" />
                  </div>
                </button>
              </div>
              
              {/* Category badge */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-slate-900/80 backdrop-blur-sm text-xs font-medium text-slate-300 rounded-full">
                  {category}
                </span>
              </div>
            </>
          ) : (
            /* YouTube Iframe Player */
            <div className="w-full h-full">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1&rel=0`}
                title={title}
                className="w-full h-full border-0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          )}
        </div>
        
        {/* Content - Flexible height */}
        <div className="p-6 flex flex-col flex-grow">
          <h3 className="text-xl font-bold text-white mb-3 group-hover:text-[#FF6C37] transition-colors duration-300 line-clamp-2">
            {title}
          </h3>
          <p className="text-slate-400 flex-grow line-clamp-3">
            {description}
          </p>
          <div className="mt-4 pt-4 border-t border-slate-800/50">
            <div className="flex items-center gap-2">
              <FaYoutube className="w-4 h-4 text-[#FF6C37]" />
              <span className="text-sm text-slate-400">Click to play video</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}