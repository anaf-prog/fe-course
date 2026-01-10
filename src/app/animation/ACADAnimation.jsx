"use client"

import { useState, useEffect, useRef } from 'react'
import { animationSteps, getRedDotPosition } from './animationData'
import { drawCanvas } from './canvasUtils'
import ACADPalette from './ACADPallete'

const ACADAnimation = () => {
  const canvasRef = useRef(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [commandText, setCommandText] = useState('')
  const [showCursor, setShowCursor] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    // Cursor blink effect hanya untuk desktop (di footer)
    if (!isMobile) {
      const cursorInterval = setInterval(() => {
        setShowCursor(prev => !prev)
      }, 500)
      
      return () => clearInterval(cursorInterval)
    }
  }, [isMobile])

  useEffect(() => {
    let typingInterval
    let typeWriter
    
    if (currentStep < animationSteps.length) {
      const step = animationSteps[currentStep]
      
      // Reset command text sebelum mulai typing
      setCommandText('')
      
      // Mulai typing langsung tanpa setTimeout tambahan
      let i = 0
      typingInterval = setInterval(() => {
        if (i < step.cmd.length) {
          setCommandText(prev => {
            // Pastikan kita selalu menambah ke string yang kosong
            if (prev.length !== i) {
              return step.cmd.substring(0, i + 1)
            }
            return prev + step.cmd.charAt(i)
          })
          i++
        } else {
          clearInterval(typingInterval)
          
          // Move to next step after delay
          typeWriter = setTimeout(() => {
            setCurrentStep(prev => prev + 1)
          }, step.delay)
        }
      }, 40) // Sedikit lebih lambat untuk efek yang lebih smooth
      
    } else {
      // Reset animation after completion
      setTimeout(() => {
        setCurrentStep(0)
      }, 3000)
    }
    
    return () => {
      if (typingInterval) clearInterval(typingInterval)
      if (typeWriter) clearTimeout(typeWriter)
    }
  }, [currentStep])

  useEffect(() => {
    // Canvas drawing animation
    const canvas = canvasRef.current
    if (!canvas) return
    
    const ctx = canvas.getContext('2d')
    // Set canvas dimensions based on screen size
    const width = isMobile ? 400 : 800
    const height = isMobile ? 250 : 500
    
    // Update canvas dimensions
    canvas.width = width
    canvas.height = height
    
    let animationFrame
    let time = 0
    
    const draw = () => {
      drawCanvas(ctx, width, height, currentStep, time)
      
      time++
      animationFrame = requestAnimationFrame(draw)
    }
    
    draw()
    
    return () => {
      cancelAnimationFrame(animationFrame)
    }
  }, [currentStep, isMobile])

  const dotPos = getRedDotPosition(currentStep)

  return (
    <div className="w-full max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
      <div className="bg-gray-900 border border-gray-700 rounded-lg sm:rounded-xl overflow-hidden shadow-xl sm:shadow-2xl shadow-cyan-900/20">
        {/* AutoCAD Header Bar */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-3 sm:px-6 py-2 sm:py-3 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="flex gap-1">
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-red-500 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-2 h-2 sm:w-3 sm:h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="text-cyan-300 font-mono text-xs sm:text-sm truncate">
              AutoCAD 2024 - [Drawing1.dwg]
            </div>
          </div>
          <div className="text-gray-400 text-xs sm:text-sm font-mono hidden sm:block">
            Model Space •
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Main Drawing Area */}
          <div className="lg:w-3/4 p-3 sm:p-6">
            <div className="relative">
              <canvas
                ref={canvasRef}
                className="w-full h-auto bg-gray-950 rounded-lg border-2 border-gray-800"
                style={{ 
                  height: isMobile ? '250px' : '500px',
                  maxHeight: isMobile ? '250px' : '500px'
                }}
              />
              
              {/* Command Display dihapus untuk mobile dan desktop */}
              {/* Red Dot Info - hidden on mobile */}
              {!isMobile && (
                <div className="absolute top-4 left-4 bg-black/80 border border-red-800 px-3 py-2 rounded text-xs font-mono">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                    <span className="text-red-300">Tracking Point</span>
                  </div>
                  <div className="text-gray-300">
                    Follows cursor during drawing
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* AutoCAD Tool Palette */}
          <ACADPalette 
            currentStep={currentStep} 
            animationSteps={animationSteps}
            dotPos={dotPos}
            isMobile={isMobile}
          />
        </div>

        {/* AutoCAD Command Line Footer - desktop saja */}
        {!isMobile ? (
          <div className="bg-black border-t border-gray-800 px-6 py-3">
            <div className="flex items-center justify-between text-xs font-mono">
              <div className="text-cyan-300">
                <span className="text-green-400">Command:</span> {commandText}
                <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>_</span>
              </div>
              <div className="text-gray-500 font-mono">
                {currentStep < animationSteps.length ? 
                  `>> ${animationSteps[currentStep].cmd}` : 
                  '>> Ready for next command...'}
              </div>
            </div>
          </div>
        ) : (
          // Mobile: hanya status progress sederhana (tanpa command line)
          <div className="bg-black border-t border-gray-800 px-3 py-2">
            <div className="flex items-center justify-between text-xs">
              <span className="text-gray-400">
                {currentStep < animationSteps.length ? 
                  `Step ${currentStep + 1} of ${animationSteps.length}` : 
                  'Animation Complete'}
              </span>
              <span className="text-cyan-300 font-mono">
                {Math.round((currentStep / animationSteps.length) * 100)}%
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ACADAnimation