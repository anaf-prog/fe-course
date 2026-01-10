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
  const [canvasReady, setCanvasReady] = useState(false)
  const [canvasDimensions, setCanvasDimensions] = useState({ width: 800, height: 500 })

  // Detect mobile screen
  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      
      setCanvasReady(false)
      setTimeout(() => setCanvasReady(true), 100)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Initialize canvas dimensions
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current
      const parent = canvas.parentElement
      
      if (parent) {
        const width = isMobile ? Math.min(400, parent.clientWidth - 32) : 800
        const height = isMobile ? 300 : 500
        
        canvas.width = width
        canvas.height = height
        
        canvas.style.width = `${width}px`
        canvas.style.height = `${height}px`
        
        setCanvasDimensions({ width, height })
        setCanvasReady(true)
      }
    }
  }, [isMobile])

  // Cursor blink effect
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)
    
    return () => clearInterval(cursorInterval)
  }, [])

  // Animation steps - FIXED untuk sinkronisasi antara command dan gambar
  useEffect(() => {
    let typingInterval
    let typeWriter
    let stepTimer
    
    if (currentStep < animationSteps.length) {
      const step = animationSteps[currentStep]
      
      setCommandText('')
      
      let i = 0
      typingInterval = setInterval(() => {
        if (i < step.cmd.length) {
          setCommandText(prev => step.cmd.substring(0, i + 1))
          i++
        } else {
          clearInterval(typingInterval)
          
          // Timer untuk berpindah ke step berikutnya
          // Gunakan delay dari step yang sesuai dengan animasi
          stepTimer = setTimeout(() => {
            setCurrentStep(prev => {
              const nextStep = prev + 1
              return nextStep
            })
          }, step.delay)
        }
      }, 40) // Kecepatan typing: 40ms per karakter
      
    } else {
      // Ketika mencapai akhir, tunggu 3 detik lalu reset ke awal
      typeWriter = setTimeout(() => {
        setCurrentStep(0)
        setCommandText('')
      }, 3000)
    }
    
    return () => {
      if (typingInterval) clearInterval(typingInterval)
      if (typeWriter) clearTimeout(typeWriter)
      if (stepTimer) clearTimeout(stepTimer)
    }
  }, [currentStep])

  // Canvas drawing animation - DIUBAH untuk sinkronisasi yang lebih baik
  useEffect(() => {
    if (!canvasReady || !canvasRef.current) return
    
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    
    if (!ctx) return
    
    let animationFrame
    let time = 0
    
    const draw = () => {
      // Clear canvas terlebih dahulu
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      
      // Pastikan canvas memiliki ukuran yang benar
      if (canvas.width === 0 || canvas.height === 0) {
        canvas.width = isMobile ? 400 : 800
        canvas.height = isMobile ? 300 : 500
      }
      
      // Gambar animasi berdasarkan currentStep
      // Jika currentStep melebihi jumlah step, gambar step terakhir
      const stepToDraw = Math.min(currentStep, animationSteps.length - 1)
      drawCanvas(ctx, canvas.width, canvas.height, stepToDraw, time, canvasDimensions)
      
      time++
      animationFrame = requestAnimationFrame(draw)
    }
    
    draw()
    
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame)
    }
  }, [currentStep, isMobile, canvasReady, canvasDimensions])

  // Fungsi untuk mendapatkan posisi dot yang di-scaling
  const getScaledDotPosition = () => {
    const rawPos = getRedDotPosition(Math.min(currentStep, animationSteps.length - 1))
    
    // Scaling faktor dari canvas 800x500 ke canvas sekarang
    const scaleX = canvasDimensions.width / 800
    const scaleY = canvasDimensions.height / 500
    
    // Scale koordinat
    const scaledPos = {
      x: rawPos.x * scaleX,
      y: rawPos.y * scaleY
    }
    
    // Jika ada animasi, scale juga titik awal dan akhir
    if (rawPos.animating) {
      scaledPos.animating = true
      if (rawPos.fromX !== undefined) scaledPos.fromX = rawPos.fromX * scaleX
      if (rawPos.fromY !== undefined) scaledPos.fromY = rawPos.fromY * scaleY
      if (rawPos.toX !== undefined) scaledPos.toX = rawPos.toX * scaleX
      if (rawPos.toY !== undefined) scaledPos.toY = rawPos.toY * scaleY
    }
    
    return scaledPos
  }

  const dotPos = getScaledDotPosition()

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
            Model Space • Scale: {(canvasDimensions.width/800).toFixed(2)}x
          </div>
        </div>

        <div className="flex flex-col lg:flex-row">
          {/* Main Drawing Area */}
          <div className="lg:w-3/4 p-3 sm:p-6">
            <div className="relative flex justify-center">
              <div className="relative bg-gray-950 rounded-lg border-2 border-gray-800 overflow-hidden">
                <canvas
                  ref={canvasRef}
                  className="block"
                  style={{
                    width: isMobile ? '100%' : '800px',
                    maxWidth: '100%',
                    height: isMobile ? '300px' : '500px',
                    background: '#0a0a0a'
                  }}
                />
                
                {/* Command Display untuk mobile */}
                {isMobile && (
                  <div className="absolute bottom-2 left-2 right-2 bg-black/90 border border-gray-700 px-3 py-2 rounded text-xs font-mono backdrop-blur-sm">
                    <div className="text-green-400 text-xs">
                      Command: <span className="text-cyan-200">{commandText}</span>
                      <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>▌</span>
                    </div>
                    <div className="text-gray-400 mt-1 flex justify-between items-center">
                      <span className="text-xs">
                        {currentStep < animationSteps.length ? 
                          `Step ${currentStep + 1}/${animationSteps.length}` : 
                          'Complete - Restarting...'}
                      </span>
                      <span className="text-cyan-300 text-xs truncate ml-2">
                        {currentStep < 6 ? 'Setting up...' :
                        currentStep < 15 ? 'Drawing Rectangle' : 
                        currentStep < 20 ? 'Drawing Circle' : 
                        currentStep < 30 ? 'Adding Dimensions' : 
                        currentStep < 37 ? 'Drawing Triangle' :
                        currentStep < 46 ? 'Adding Triangle Dims' :
                        'Zooming & Complete'}
                      </span>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </div>

          {/* AutoCAD Tool Palette */}
          <ACADPalette 
            currentStep={Math.min(currentStep, animationSteps.length - 1)} 
            animationSteps={animationSteps}
            dotPos={dotPos}
            isMobile={isMobile}
            canvasDimensions={canvasDimensions}
          />
        </div>

        {/* AutoCAD Command Line Footer - untuk desktop */}
        {!isMobile && (
          <div className="bg-black border-t border-gray-800 px-6 py-3">
            <div className="flex items-center justify-between text-sm font-mono">
              <div className="text-cyan-300 flex-1">
                <span className="text-green-400">Command:</span> {commandText}
                <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>_</span>
              </div>
              <div className="text-gray-500 flex items-center gap-4">
                <span className="truncate max-w-md">
                  {currentStep < animationSteps.length ? 
                    `>> ${animationSteps[currentStep].cmd}` : 
                    '>> Complete! Restarting animation...'}
                </span>
                {dotPos && (
                  <span className="text-xs text-red-300 whitespace-nowrap">
                    [Cursor: {dotPos.x.toFixed(0)},{dotPos.y.toFixed(0)}]
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Debug info untuk mobile */}
      {isMobile && process.env.NODE_ENV === 'development' && (
        <div className="mt-4 p-2 bg-yellow-900/20 border border-yellow-700 rounded text-xs text-yellow-200">
          <div className="grid grid-cols-2 gap-2">
            <div>
              Canvas: {canvasDimensions.width}x{canvasDimensions.height}
            </div>
            <div>
              Step: {currentStep}/{animationSteps.length}
            </div>
            <div>
              Scale: {(canvasDimensions.width/800).toFixed(2)}x
            </div>
            <div>
              Rectangle: {Math.round(200 * (canvasDimensions.width/800))}x{Math.round(200 * (canvasDimensions.height/500))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ACADAnimation