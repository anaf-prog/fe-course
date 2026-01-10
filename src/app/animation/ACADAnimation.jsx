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

  useEffect(() => {
    // Cursor blink effect
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    
    return () => clearInterval(cursorInterval)
  }, [])

  // FIX: Perbaikan typing animation dengan menghapus delay yang menyebabkan race condition
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
    const width = canvas.width
    const height = canvas.height
    
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
  }, [currentStep])

  const dotPos = getRedDotPosition(currentStep)

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-8">
      <div className="bg-gray-900 border border-gray-700 rounded-xl overflow-hidden shadow-2xl shadow-cyan-900/20">
        {/* AutoCAD Header Bar */}
        <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-6 py-3 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="flex gap-1">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
            <div className="text-cyan-300 font-mono text-sm">
              AutoCAD 2024 - [Drawing1.dwg]
            </div>
          </div>
          <div className="text-gray-400 text-sm font-mono">
            Model Space •
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Main Drawing Area */}
          <div className="lg:w-3/4 p-6">
            <div className="relative">
              <canvas
                ref={canvasRef}
                width={800}
                height={500}
                className="w-full h-auto bg-gray-950 rounded-lg border-2 border-gray-800"
              />
              
              {/* Command Display */}
              <div className="absolute bottom-4 left-4 bg-black/90 border border-gray-700 px-3 py-2 rounded text-xs font-mono min-w-[300px]">
                <div className="text-green-400">
                  Command: <span className="text-cyan-200">{commandText}</span>
                  <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>▌</span>
                </div>
                <div className="text-gray-400 mt-1 flex justify-between">
                  <span>
                    {currentStep < animationSteps.length ? 
                      `Step ${currentStep + 1}/${animationSteps.length}` : 
                      'Animation Complete'}
                  </span>
                  <span className="text-cyan-300">
                    {currentStep < 14 ? 'Drawing Rectangle' : 
                    currentStep < 19 ? 'Drawing Circle' : 
                    currentStep < 29 ? 'Adding Dimensions' : 
                    currentStep < 30 ? 'Preparing Triangle' :
                    currentStep < 37 ? 'Drawing Triangle' :
                    currentStep < 46 ? 'Adding Triangle Dimensions' :
                    'Completed'}
                  </span>
                </div>
              </div>
              
              {/* Red Dot Info */}
              <div className="absolute top-4 left-4 bg-black/80 border border-red-800 px-3 py-2 rounded text-xs font-mono">
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-red-300">Tracking Point</span>
                </div>
                <div className="text-gray-300">
                  Follows cursor during drawing
                </div>
              </div>
              
            </div>
          </div>

          {/* AutoCAD Tool Palette */}
          <ACADPalette 
            currentStep={currentStep} 
            animationSteps={animationSteps}
            dotPos={dotPos}
          />
        </div>

        {/* AutoCAD Command Line Footer */}
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
      </div>
    </div>
  )
}

export default ACADAnimation