import { motion } from "framer-motion"
import { RefObject } from "react"

interface AutodeskBackgroundProps {
  lightPosition: { x: number; y: number }
  containerRef: RefObject<HTMLDivElement>
}

export default function AutodeskBackground({ 
  lightPosition, 
  containerRef 
}: AutodeskBackgroundProps) {
  return (
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
  )
}