import { 
  rectPoints, 
  trianglePoints,
  triangleCenter,
  triangleRadius,
  circleCenter, 
  circleRadius, 
  getRedDotPosition, 
  DotPosition 
} from './animationData'

export const drawCanvas = (
  ctx: CanvasRenderingContext2D, 
  width: number, 
  height: number, 
  currentStep: number, 
  time: number
): void => {
  ctx.clearRect(0, 0, width, height)
  
  // Draw AutoCAD-like dark background
  ctx.fillStyle = '#0a0a0a'
  ctx.fillRect(0, 0, width, height)
  
  // Draw subtle grid - lebih terpusat
  ctx.strokeStyle = '#1a1a1a'
  ctx.lineWidth = 0.5
  const gridSize = 40
  
  // Draw grid lines
  for (let x = 0; x < width; x += gridSize) {
    ctx.beginPath()
    ctx.moveTo(x, 0)
    ctx.lineTo(x, height)
    ctx.stroke()
  }
  
  for (let y = 0; y < height; y += gridSize) {
    ctx.beginPath()
    ctx.moveTo(0, y)
    ctx.lineTo(width, y)
    ctx.stroke()
  }
  
  // Draw crosshairs di center
  const centerX = width / 2
  const centerY = height / 2
  
  ctx.strokeStyle = '#333'
  ctx.lineWidth = 1
  
  ctx.beginPath()
  ctx.moveTo(centerX - 15, centerY)
  ctx.lineTo(centerX + 15, centerY)
  ctx.moveTo(centerX, centerY - 15)
  ctx.lineTo(centerX, centerY + 15)
  ctx.stroke()
  
  // Draw coordinate system indicator
  ctx.fillStyle = '#666'
  ctx.font = '10px monospace'
  ctx.fillText('X', centerX + 20, centerY - 5)
  ctx.fillText('Y', centerX + 5, centerY - 20)
  
  // Draw rectangle (step 4-14)
  if (currentStep >= 4) {
    ctx.strokeStyle = '#00FF00' // Green for lines
    ctx.lineWidth = 2
    
    // First line (top)
    if (currentStep >= 8) {
      ctx.beginPath()
      ctx.moveTo(rectPoints.x1, rectPoints.y1)
      ctx.lineTo(rectPoints.x2, rectPoints.y2)
      ctx.stroke()
    }
    
    // Second line (right)
    if (currentStep >= 10) {
      ctx.beginPath()
      ctx.moveTo(rectPoints.x2, rectPoints.y2)
      ctx.lineTo(rectPoints.x3, rectPoints.y3)
      ctx.stroke()
    }
    
    // Third line (bottom)
    if (currentStep >= 12) {
      ctx.beginPath()
      ctx.moveTo(rectPoints.x3, rectPoints.y3)
      ctx.lineTo(rectPoints.x4, rectPoints.y4)
      ctx.stroke()
    }
    
    // Fourth line (left) - closing rectangle
    if (currentStep >= 14) {
      ctx.beginPath()
      ctx.moveTo(rectPoints.x4, rectPoints.y4)
      ctx.lineTo(rectPoints.x1, rectPoints.y1)
      ctx.stroke()
      
      // Animated closing line
      if (currentStep === 14) {
        const progress = (time * 0.005) % 1
        ctx.setLineDash([10, 5])
        ctx.lineDashOffset = -time * 0.1
        ctx.beginPath()
        ctx.moveTo(rectPoints.x4, rectPoints.y4)
        ctx.lineTo(
          rectPoints.x4 + (rectPoints.x1 - rectPoints.x4) * progress,
          rectPoints.y4 + (rectPoints.y1 - rectPoints.y4) * progress
        )
        ctx.stroke()
        ctx.setLineDash([])
      }
    }
  }
  
  // Draw circle (step 15-19)
  if (currentStep >= 15) {
    ctx.strokeStyle = '#00FFFF' // Cyan for circle
    ctx.lineWidth = 2
    
    if (currentStep === 19) {
      // Animated circle drawing
      const progress = Math.min(1, time * 0.003)
      ctx.beginPath()
      ctx.arc(circleCenter.x, circleCenter.y, circleRadius, 0, Math.PI * 2 * progress)
      ctx.stroke()
    } else if (currentStep > 19) {
      ctx.beginPath()
      ctx.arc(circleCenter.x, circleCenter.y, circleRadius, 0, Math.PI * 2)
      ctx.stroke()
    }
  }
  
  // Draw dimensions for rectangle and circle
  ctx.strokeStyle = '#FF9900' // Orange for dimensions
  ctx.lineWidth = 1
  ctx.fillStyle = '#FF9900'
  ctx.font = '11px Arial'
  
  // Horizontal dimension (above rectangle) - step 20-22
  if (currentStep >= 22) {
    const dimY = rectPoints.y1 - 30
    
    // Dimension line
    ctx.beginPath()
    ctx.moveTo(rectPoints.x1, dimY)
    ctx.lineTo(rectPoints.x2, dimY)
    ctx.stroke()
    
    // Extension lines
    ctx.beginPath()
    ctx.moveTo(rectPoints.x1, rectPoints.y1)
    ctx.lineTo(rectPoints.x1, dimY)
    ctx.stroke()
    
    ctx.beginPath()
    ctx.moveTo(rectPoints.x2, rectPoints.y2)
    ctx.lineTo(rectPoints.x2, dimY)
    ctx.stroke()
    
    // Dimension text
    ctx.fillText('200.00', (rectPoints.x1 + rectPoints.x2) / 2 - 20, dimY - 5)
  }
  
  // Vertical dimension (left of rectangle) - step 23-25
  if (currentStep >= 25) {
    const dimX = rectPoints.x1 - 30
    
    // Dimension line
    ctx.beginPath()
    ctx.moveTo(dimX, rectPoints.y1)
    ctx.lineTo(dimX, rectPoints.y4)
    ctx.stroke()
    
    // Extension lines
    ctx.beginPath()
    ctx.moveTo(rectPoints.x1, rectPoints.y1)
    ctx.lineTo(dimX, rectPoints.y1)
    ctx.stroke()
    
    ctx.beginPath()
    ctx.moveTo(rectPoints.x4, rectPoints.y4)
    ctx.lineTo(dimX, rectPoints.y4)
    ctx.stroke()
    
    // Dimension text (rotated)
    ctx.save()
    ctx.translate(dimX - 15, (rectPoints.y1 + rectPoints.y4) / 2)
    ctx.rotate(-Math.PI / 2)
    ctx.fillText('200.00', 0, 0)
    ctx.restore()
  }
  
  // Radius dimension for circle - step 26-28
  if (currentStep >= 28) {
    const angle = Math.PI / 4 // 45 degrees
    const arrowX = circleCenter.x + circleRadius * Math.cos(angle)
    const arrowY = circleCenter.y + circleRadius * Math.sin(angle)
    const textX = circleCenter.x + (circleRadius / 2) * Math.cos(angle)
    const textY = circleCenter.y + (circleRadius / 2) * Math.sin(angle)
    
    // Leader line
    ctx.beginPath()
    ctx.moveTo(circleCenter.x, circleCenter.y)
    ctx.lineTo(arrowX, arrowY)
    ctx.stroke()
    
    // Arrow head
    const arrowSize = 8
    const angle1 = angle - Math.PI / 6
    const angle2 = angle + Math.PI / 6
    
    ctx.beginPath()
    ctx.moveTo(arrowX, arrowY)
    ctx.lineTo(
      arrowX - arrowSize * Math.cos(angle1),
      arrowY - arrowSize * Math.sin(angle1)
    )
    ctx.moveTo(arrowX, arrowY)
    ctx.lineTo(
      arrowX - arrowSize * Math.cos(angle2),
      arrowY - arrowSize * Math.sin(angle2)
    )
    ctx.stroke()
    
    // Radius text
    ctx.fillText('R80.00', textX + 10, textY - 5)
  }
  
  // ===== TAMBAHAN UNTUK SEGITIGA (step 30-36) =====
  if (currentStep >= 30) {
    ctx.strokeStyle = '#FF00FF' // Magenta for triangle - WARNA UNGU
    ctx.lineWidth = 2
    
    // Draw first side (step 34+)
    if (currentStep >= 34) {
      ctx.beginPath()
      ctx.moveTo(trianglePoints.x1, trianglePoints.y1)
      ctx.lineTo(trianglePoints.x2, trianglePoints.y2)
      ctx.stroke()
    }
    
    // Draw second side (step 35+)
    if (currentStep >= 35) {
      ctx.beginPath()
      ctx.moveTo(trianglePoints.x2, trianglePoints.y2)
      ctx.lineTo(trianglePoints.x3, trianglePoints.y3)
      ctx.stroke()
    }
    
    // Draw third side (step 36+)
    if (currentStep >= 36) {
      ctx.beginPath()
      ctx.moveTo(trianglePoints.x3, trianglePoints.y3)
      ctx.lineTo(trianglePoints.x1, trianglePoints.y1)
      ctx.stroke()
    }
    
    // Animated triangle drawing (step 33 untuk radius)
    if (currentStep === 33) {
      // Draw circumscribed circle untuk triangle
      ctx.strokeStyle = '#FF00FF'
      ctx.lineWidth = 1
      ctx.setLineDash([5, 3])
      ctx.beginPath()
      const progress = Math.min(1, time * 0.003)
      ctx.arc(triangleCenter.x, triangleCenter.y, triangleRadius, 0, Math.PI * 2 * progress)
      ctx.stroke()
      ctx.setLineDash([])
    }
  }
  // ===============================================
  
  // ===== TAMBAHAN DIMENSI UNTUK SEGITIGA =====
  // Aligned dimension for triangle side 1 - step 37-39
  if (currentStep >= 39) {
    // Side 1 (x1,y1 to x2,y2)
    const midX1 = (trianglePoints.x1 + trianglePoints.x2) / 2
    const midY1 = (trianglePoints.y1 + trianglePoints.y2) / 2
    
    // Calculate perpendicular offset
    const dx1 = trianglePoints.x2 - trianglePoints.x1
    const dy1 = trianglePoints.y2 - trianglePoints.y1
    const length1 = Math.sqrt(dx1*dx1 + dy1*dy1)
    const perpX1 = -dy1 / length1 * 40
    const perpY1 = dx1 / length1 * 40
    
    // Dimension line - GUNAKAN WARNA YANG SAMA DENGAN DIMENSI LAINNYA
    ctx.strokeStyle = '#FF9900' // Orange untuk dimensi segitiga juga
    ctx.lineWidth = 1
    ctx.fillStyle = '#FF9900'
    
    ctx.beginPath()
    ctx.moveTo(trianglePoints.x1 + perpX1, trianglePoints.y1 + perpY1)
    ctx.lineTo(trianglePoints.x2 + perpX1, trianglePoints.y2 + perpY1)
    ctx.stroke()
    
    // Extension lines
    ctx.beginPath()
    ctx.moveTo(trianglePoints.x1, trianglePoints.y1)
    ctx.lineTo(trianglePoints.x1 + perpX1, trianglePoints.y1 + perpY1)
    ctx.stroke()
    
    ctx.beginPath()
    ctx.moveTo(trianglePoints.x2, trianglePoints.y2)
    ctx.lineTo(trianglePoints.x2 + perpX1, trianglePoints.y2 + perpY1)
    ctx.stroke()
    
    // Dimension text
    ctx.save()
    ctx.translate(midX1 + perpX1 * 1.2, midY1 + perpY1 * 1.2)
    const angle1 = Math.atan2(dy1, dx1)
    ctx.rotate(angle1)
    ctx.fillText(`${length1.toFixed(0)}.00`, 0, -15)
    ctx.restore()
  }
  
  // Aligned dimension for triangle side 2 - step 40-42
  if (currentStep >= 42) {
    // Side 2 (x2,y2 to x3,y3)
    const midX2 = (trianglePoints.x2 + trianglePoints.x3) / 2
    const midY2 = (trianglePoints.y2 + trianglePoints.y3) / 2
    
    const dx2 = trianglePoints.x3 - trianglePoints.x2
    const dy2 = trianglePoints.y3 - trianglePoints.y2
    const length2 = Math.sqrt(dx2*dx2 + dy2*dy2)
    const perpX2 = -dy2 / length2 * 40
    const perpY2 = dx2 / length2 * 40
    
    // Dimension line
    ctx.strokeStyle = '#FF9900'
    ctx.lineWidth = 1
    ctx.fillStyle = '#FF9900'
    
    ctx.beginPath()
    ctx.moveTo(trianglePoints.x2 + perpX2, trianglePoints.y2 + perpY2)
    ctx.lineTo(trianglePoints.x3 + perpX2, trianglePoints.y3 + perpY2)
    ctx.stroke()
    
    // Extension lines
    ctx.beginPath()
    ctx.moveTo(trianglePoints.x2, trianglePoints.y2)
    ctx.lineTo(trianglePoints.x2 + perpX2, trianglePoints.y2 + perpY2)
    ctx.stroke()
    
    ctx.beginPath()
    ctx.moveTo(trianglePoints.x3, trianglePoints.y3)
    ctx.lineTo(trianglePoints.x3 + perpX2, trianglePoints.y3 + perpY2)
    ctx.stroke()
    
    // Dimension text - PERBAIKAN: Teks di atas garis
    ctx.save()
    ctx.translate(midX2 + perpX2 * 1.2, midY2 + perpY2 * 1.2)
    const angle2 = Math.atan2(dy2, dx2)
    ctx.rotate(angle2)
    ctx.fillText(`${length2.toFixed(0)}.00`, 0, -15)
    ctx.restore()
  }
  
  // Aligned dimension for triangle side 3 - step 43-45
  if (currentStep >= 45) {
    // Side 3 (x3,y3 to x1,y1)
    const midX3 = (trianglePoints.x3 + trianglePoints.x1) / 2
    const midY3 = (trianglePoints.y3 + trianglePoints.y1) / 2
    
    const dx3 = trianglePoints.x1 - trianglePoints.x3
    const dy3 = trianglePoints.y1 - trianglePoints.y3
    const length3 = Math.sqrt(dx3*dx3 + dy3*dy3)
    const perpX3 = -dy3 / length3 * 40
    const perpY3 = dx3 / length3 * 40
    
    // Dimension line
    ctx.strokeStyle = '#FF9900'
    ctx.lineWidth = 1
    ctx.fillStyle = '#FF9900'
    
    ctx.beginPath()
    ctx.moveTo(trianglePoints.x3 + perpX3, trianglePoints.y3 + perpY3)
    ctx.lineTo(trianglePoints.x1 + perpX3, trianglePoints.y1 + perpY3)
    ctx.stroke()
    
    // Extension lines
    ctx.beginPath()
    ctx.moveTo(trianglePoints.x3, trianglePoints.y3)
    ctx.lineTo(trianglePoints.x3 + perpX3, trianglePoints.y3 + perpY3)
    ctx.stroke()
    
    ctx.beginPath()
    ctx.moveTo(trianglePoints.x1, trianglePoints.y1)
    ctx.lineTo(trianglePoints.x1 + perpX3, trianglePoints.y1 + perpY3)
    ctx.stroke()
    
    // Dimension text - PERBAIKAN: Teks di atas garis
    ctx.save()
    ctx.translate(midX3 + perpX3 * 1.2, midY3 + perpY3 * 1.2)
    const angle3 = Math.atan2(dy3, dx3)
    ctx.rotate(angle3)
    ctx.fillText(`${length3.toFixed(0)}.00`, 0, -15)
    ctx.restore()
  }
  // ===========================================
  
  // Draw red tracking dot
  const dotPos: DotPosition = getRedDotPosition(currentStep)
  let displayX = dotPos.x
  let displayY = dotPos.y
  
  // Animate dot movement if needed
  if (dotPos.animating && currentStep < 45) {
    const animProgress = Math.min(1, (time % 60) / 60)
    displayX = (dotPos.fromX || 0) + ((dotPos.toX || 0) - (dotPos.fromX || 0)) * animProgress
    displayY = (dotPos.fromY || 0) + ((dotPos.toY || 0) - (dotPos.fromY || 0)) * animProgress
  }
  
  // Draw red dot
  ctx.fillStyle = '#FF0000'
  ctx.beginPath()
  ctx.arc(displayX, displayY, 4, 0, Math.PI * 2)
  ctx.fill()
  
  // Draw halo effect
  ctx.strokeStyle = '#FF0000'
  ctx.lineWidth = 1
  ctx.beginPath()
  ctx.arc(displayX, displayY, 6, 0, Math.PI * 2)
  ctx.stroke()
  ctx.fillStyle = '#888'
  ctx.font = '11px monospace'
  ctx.textAlign = 'right' // Align kanan supaya rapi
  ctx.fillText(`X: ${displayX.toFixed(0)}`, width - 100, 20)
  ctx.fillText(`Y: ${displayY.toFixed(0)}`, width - 100, 35)
  ctx.fillText(`Z: 0.0`, width - 100, 50)
  ctx.textAlign = 'left' // Reset ke default
  
  // Draw current coordinates near the dot
  ctx.fillStyle = '#FF6666'
  ctx.font = '10px monospace'
  ctx.textAlign = 'left'
  ctx.fillText(`${displayX.toFixed(0)},${displayY.toFixed(0)}`, displayX + 8, displayY - 8)
}