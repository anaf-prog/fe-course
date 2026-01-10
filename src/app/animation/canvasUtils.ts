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
  time: number,
  canvasDimensions: { width: number, height: number } = { width: 800, height: 500 }
): void => {
  ctx.clearRect(0, 0, width, height)
  
  // Faktor scaling dari canvas asli (800x500) ke canvas sekarang
  const scaleX = width / 800
  const scaleY = height / 500
  
  // Fungsi helper untuk scale koordinat
  const scaleCoord = (x: number, y: number) => ({
    x: x * scaleX,
    y: y * scaleY
  })
  
  // Scale semua koordinat
  const scaledRectPoints = {
    x1: rectPoints.x1 * scaleX,
    y1: rectPoints.y1 * scaleY,
    x2: rectPoints.x2 * scaleX,
    y2: rectPoints.y2 * scaleY,
    x3: rectPoints.x3 * scaleX,
    y3: rectPoints.y3 * scaleY,
    x4: rectPoints.x4 * scaleX,
    y4: rectPoints.y4 * scaleY,
    width: rectPoints.width * scaleX,
    height: rectPoints.height * scaleY
  }
  
  const scaledCircleCenter = scaleCoord(circleCenter.x, circleCenter.y)
  const scaledCircleRadius = circleRadius * Math.min(scaleX, scaleY)
  
  const scaledTrianglePoints = {
    x1: trianglePoints.x1 * scaleX,
    y1: trianglePoints.y1 * scaleY,
    x2: trianglePoints.x2 * scaleX,
    y2: trianglePoints.y2 * scaleY,
    x3: trianglePoints.x3 * scaleX,
    y3: trianglePoints.y3 * scaleY
  }
  
  const scaledTriangleCenter = scaleCoord(triangleCenter.x, triangleCenter.y)
  const scaledTriangleRadius = triangleRadius * Math.min(scaleX, scaleY)
  
  // Draw AutoCAD-like dark background
  ctx.fillStyle = '#0a0a0a'
  ctx.fillRect(0, 0, width, height)
  
  // Draw subtle grid - lebih terpusat
  ctx.strokeStyle = '#1a1a1a'
  ctx.lineWidth = 0.5
  const gridSize = 40 * Math.min(scaleX, scaleY)
  
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
  ctx.font = `${10 * Math.min(scaleX, scaleY)}px monospace`
  ctx.fillText('X', centerX + 20, centerY - 5)
  ctx.fillText('Y', centerX + 5, centerY - 20)
  
  // Draw rectangle (step 4-14)
  if (currentStep >= 4) {
    ctx.strokeStyle = '#00FF00' // Green for lines
    ctx.lineWidth = 2 * Math.min(scaleX, scaleY)
    
    // First line (top) - mulai menggambar dari step 8
    if (currentStep >= 8) {
      ctx.beginPath()
      ctx.moveTo(scaledRectPoints.x1, scaledRectPoints.y1)
      ctx.lineTo(scaledRectPoints.x2, scaledRectPoints.y2)
      ctx.stroke()
    }
    
    // Second line (right) - mulai menggambar dari step 10
    if (currentStep >= 10) {
      ctx.beginPath()
      ctx.moveTo(scaledRectPoints.x2, scaledRectPoints.y2)
      ctx.lineTo(scaledRectPoints.x3, scaledRectPoints.y3)
      ctx.stroke()
    }
    
    // Third line (bottom) - mulai menggambar dari step 12
    if (currentStep >= 12) {
      ctx.beginPath()
      ctx.moveTo(scaledRectPoints.x3, scaledRectPoints.y3)
      ctx.lineTo(scaledRectPoints.x4, scaledRectPoints.y4)
      ctx.stroke()
    }
    
    // Fourth line (left) - closing rectangle - mulai menggambar dari step 14
    if (currentStep >= 14) {
      ctx.beginPath()
      ctx.moveTo(scaledRectPoints.x4, scaledRectPoints.y4)
      ctx.lineTo(scaledRectPoints.x1, scaledRectPoints.y1)
      ctx.stroke()
      
      // Animated closing line - hanya animasi di step 14
      if (currentStep === 14) {
        const progress = (time * 0.005) % 1
        ctx.setLineDash([10 * scaleX, 5 * scaleX])
        ctx.lineDashOffset = -time * 0.1
        ctx.beginPath()
        ctx.moveTo(scaledRectPoints.x4, scaledRectPoints.y4)
        ctx.lineTo(
          scaledRectPoints.x4 + (scaledRectPoints.x1 - scaledRectPoints.x4) * progress,
          scaledRectPoints.y4 + (scaledRectPoints.y1 - scaledRectPoints.y4) * progress
        )
        ctx.stroke()
        ctx.setLineDash([])
      }
    }
  }
  
  // Draw circle (step 15-19) - PERBAIKAN: Sinkron dengan command
  if (currentStep >= 15) {
    ctx.strokeStyle = '#00FFFF' // Cyan for circle
    ctx.lineWidth = 2 * Math.min(scaleX, scaleY)
    
    // Animasi menggambar lingkaran sesuai dengan step command
    if (currentStep === 19) {
      // Animated circle drawing - saat mengetik radius
      const progress = Math.min(1, time * 0.003)
      ctx.beginPath()
      ctx.arc(scaledCircleCenter.x, scaledCircleCenter.y, scaledCircleRadius, 0, Math.PI * 2 * progress)
      ctx.stroke()
    } else if (currentStep > 19) {
      // Lingkaran sudah selesai
      ctx.beginPath()
      ctx.arc(scaledCircleCenter.x, scaledCircleCenter.y, scaledCircleRadius, 0, Math.PI * 2)
      ctx.stroke()
    }
  }
  
  // Draw dimensions for rectangle and circle
  ctx.strokeStyle = '#FF9900' // Orange for dimensions
  ctx.lineWidth = 1 * Math.min(scaleX, scaleY)
  ctx.fillStyle = '#FF9900'
  ctx.font = `${11 * Math.min(scaleX, scaleY)}px Arial`
  
  // Horizontal dimension (above rectangle) - step 20-22
  // PERBAIKAN: Sinkron dengan command - mulai gambar di step 22 (setelah "Horizontal dimension added")
  if (currentStep >= 22) {
    const dimY = scaledRectPoints.y1 - 30 * scaleY
    
    // Dimension line
    ctx.beginPath()
    ctx.moveTo(scaledRectPoints.x1, dimY)
    ctx.lineTo(scaledRectPoints.x2, dimY)
    ctx.stroke()
    
    // Extension lines
    ctx.beginPath()
    ctx.moveTo(scaledRectPoints.x1, scaledRectPoints.y1)
    ctx.lineTo(scaledRectPoints.x1, dimY)
    ctx.stroke()
    
    ctx.beginPath()
    ctx.moveTo(scaledRectPoints.x2, scaledRectPoints.y2)
    ctx.lineTo(scaledRectPoints.x2, dimY)
    ctx.stroke()
    
    // Dimension text
    const dimText = `${(rectPoints.width * scaleX).toFixed(0)}.00`
    ctx.fillText(dimText, (scaledRectPoints.x1 + scaledRectPoints.x2) / 2 - 20 * scaleX, dimY - 5 * scaleY)
  }
  
  // Vertical dimension (left of rectangle) - step 23-25
  // PERBAIKAN: Sinkron dengan command - mulai gambar di step 25 (setelah "Vertical dimension added")
  if (currentStep >= 25) {
    const dimX = scaledRectPoints.x1 - 30 * scaleX
    
    // Dimension line
    ctx.beginPath()
    ctx.moveTo(dimX, scaledRectPoints.y1)
    ctx.lineTo(dimX, scaledRectPoints.y4)
    ctx.stroke()
    
    // Extension lines
    ctx.beginPath()
    ctx.moveTo(scaledRectPoints.x1, scaledRectPoints.y1)
    ctx.lineTo(dimX, scaledRectPoints.y1)
    ctx.stroke()
    
    ctx.beginPath()
    ctx.moveTo(scaledRectPoints.x4, scaledRectPoints.y4)
    ctx.lineTo(dimX, scaledRectPoints.y4)
    ctx.stroke()
    
    // Dimension text (rotated)
    ctx.save()
    ctx.translate(dimX - 15 * scaleX, (scaledRectPoints.y1 + scaledRectPoints.y4) / 2)
    ctx.rotate(-Math.PI / 2)
    const dimText = `${(rectPoints.height * scaleY).toFixed(0)}.00`
    ctx.fillText(dimText, 0, 0)
    ctx.restore()
  }
  
  // Radius dimension for circle - step 26-28
  // PERBAIKAN: Sinkron dengan command - mulai gambar di step 28 (setelah "Radius dimension added")
  if (currentStep >= 28) {
    const angle = Math.PI / 4 // 45 degrees
    const arrowX = scaledCircleCenter.x + scaledCircleRadius * Math.cos(angle)
    const arrowY = scaledCircleCenter.y + scaledCircleRadius * Math.sin(angle)
    const textX = scaledCircleCenter.x + (scaledCircleRadius / 2) * Math.cos(angle)
    const textY = scaledCircleCenter.y + (scaledCircleRadius / 2) * Math.sin(angle)
    
    // Leader line
    ctx.beginPath()
    ctx.moveTo(scaledCircleCenter.x, scaledCircleCenter.y)
    ctx.lineTo(arrowX, arrowY)
    ctx.stroke()
    
    // Arrow head
    const arrowSize = 8 * Math.min(scaleX, scaleY)
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
    ctx.fillText(`R${circleRadius}.00`, textX + 10 * scaleX, textY - 5 * scaleY)
  }
  
  // ===== TAMBAHAN UNTUK SEGITIGA (step 30-36) =====
  // PERBAIKAN: Sinkron dengan command - mulai gambar segitiga setelah command polygon
  if (currentStep >= 30) {
    ctx.strokeStyle = '#FF00FF' // Magenta for triangle - WARNA UNGU
    ctx.lineWidth = 2 * Math.min(scaleX, scaleY)
    
    // Draw first side - step 34+ (setelah "Specify radius of circle:")
    if (currentStep >= 34) {
      ctx.beginPath()
      ctx.moveTo(scaledTrianglePoints.x1, scaledTrianglePoints.y1)
      ctx.lineTo(scaledTrianglePoints.x2, scaledTrianglePoints.y2)
      ctx.stroke()
    }
    
    // Draw second side - step 35+
    if (currentStep >= 35) {
      ctx.beginPath()
      ctx.moveTo(scaledTrianglePoints.x2, scaledTrianglePoints.y2)
      ctx.lineTo(scaledTrianglePoints.x3, scaledTrianglePoints.y3)
      ctx.stroke()
    }
    
    // Draw third side - step 36+ (menyelesaikan segitiga)
    if (currentStep >= 36) {
      ctx.beginPath()
      ctx.moveTo(scaledTrianglePoints.x3, scaledTrianglePoints.y3)
      ctx.lineTo(scaledTrianglePoints.x1, scaledTrianglePoints.y1)
      ctx.stroke()
    }
    
    // Animated triangle drawing (step 33 untuk radius) - animasi lingkaran pembentuk segitiga
    if (currentStep === 33) {
      // Draw circumscribed circle untuk triangle
      ctx.strokeStyle = '#FF00FF'
      ctx.lineWidth = 1 * Math.min(scaleX, scaleY)
      ctx.setLineDash([5 * scaleX, 3 * scaleX])
      ctx.beginPath()
      const progress = Math.min(1, time * 0.003)
      ctx.arc(scaledTriangleCenter.x, scaledTriangleCenter.y, scaledTriangleRadius, 0, Math.PI * 2 * progress)
      ctx.stroke()
      ctx.setLineDash([])
    }
  }
  // ===============================================
  
  // ===== TAMBAHAN DIMENSI UNTUK SEGITIGA =====
  // PERBAIKAN: Sinkron dengan command untuk dimensi segitiga
  ctx.strokeStyle = '#FF9900' // Orange untuk dimensi segitiga juga
  ctx.lineWidth = 1 * Math.min(scaleX, scaleY)
  ctx.fillStyle = '#FF9900'
  ctx.font = `${11 * Math.min(scaleX, scaleY)}px Arial`
  
  // Aligned dimension for triangle side 1 - step 37-39
  // Mulai gambar setelah "Aligned dimension added" pertama (step 39)
  if (currentStep >= 39) {
    // Side 1 (x1,y1 to x2,y2)
    const midX1 = (scaledTrianglePoints.x1 + scaledTrianglePoints.x2) / 2
    const midY1 = (scaledTrianglePoints.y1 + scaledTrianglePoints.y2) / 2
    
    // Calculate perpendicular offset
    const dx1 = scaledTrianglePoints.x2 - scaledTrianglePoints.x1
    const dy1 = scaledTrianglePoints.y2 - scaledTrianglePoints.y1
    const length1 = Math.sqrt(dx1*dx1 + dy1*dy1)
    const perpX1 = -dy1 / length1 * 40 * scaleX
    const perpY1 = dx1 / length1 * 40 * scaleY
    
    // Dimension line
    ctx.beginPath()
    ctx.moveTo(scaledTrianglePoints.x1 + perpX1, scaledTrianglePoints.y1 + perpY1)
    ctx.lineTo(scaledTrianglePoints.x2 + perpX1, scaledTrianglePoints.y2 + perpY1)
    ctx.stroke()
    
    // Extension lines
    ctx.beginPath()
    ctx.moveTo(scaledTrianglePoints.x1, scaledTrianglePoints.y1)
    ctx.lineTo(scaledTrianglePoints.x1 + perpX1, scaledTrianglePoints.y1 + perpY1)
    ctx.stroke()
    
    ctx.beginPath()
    ctx.moveTo(scaledTrianglePoints.x2, scaledTrianglePoints.y2)
    ctx.lineTo(scaledTrianglePoints.x2 + perpX1, scaledTrianglePoints.y2 + perpY1)
    ctx.stroke()
    
    // Dimension text
    ctx.save()
    ctx.translate(midX1 + perpX1 * 1.2, midY1 + perpY1 * 1.2)
    const angle1 = Math.atan2(dy1, dx1)
    ctx.rotate(angle1)
    ctx.fillText(`${(length1 / scaleX).toFixed(0)}.00`, 0, -15 * scaleY)
    ctx.restore()
  }
  
  // Aligned dimension for triangle side 2 - step 40-42
  // Mulai gambar setelah "Aligned dimension added" kedua (step 42)
  if (currentStep >= 42) {
    // Side 2 (x2,y2 to x3,y3)
    const midX2 = (scaledTrianglePoints.x2 + scaledTrianglePoints.x3) / 2
    const midY2 = (scaledTrianglePoints.y2 + scaledTrianglePoints.y3) / 2
    
    const dx2 = scaledTrianglePoints.x3 - scaledTrianglePoints.x2
    const dy2 = scaledTrianglePoints.y3 - scaledTrianglePoints.y2
    const length2 = Math.sqrt(dx2*dx2 + dy2*dy2)
    const perpX2 = -dy2 / length2 * 40 * scaleX
    const perpY2 = dx2 / length2 * 40 * scaleY
    
    // Dimension line
    ctx.beginPath()
    ctx.moveTo(scaledTrianglePoints.x2 + perpX2, scaledTrianglePoints.y2 + perpY2)
    ctx.lineTo(scaledTrianglePoints.x3 + perpX2, scaledTrianglePoints.y3 + perpY2)
    ctx.stroke()
    
    // Extension lines
    ctx.beginPath()
    ctx.moveTo(scaledTrianglePoints.x2, scaledTrianglePoints.y2)
    ctx.lineTo(scaledTrianglePoints.x2 + perpX2, scaledTrianglePoints.y2 + perpY2)
    ctx.stroke()
    
    ctx.beginPath()
    ctx.moveTo(scaledTrianglePoints.x3, scaledTrianglePoints.y3)
    ctx.lineTo(scaledTrianglePoints.x3 + perpX2, scaledTrianglePoints.y3 + perpY2)
    ctx.stroke()
    
    // Dimension text
    ctx.save()
    ctx.translate(midX2 + perpX2 * 1.2, midY2 + perpY2 * 1.2)
    const angle2 = Math.atan2(dy2, dx2)
    ctx.rotate(angle2)
    ctx.fillText(`${(length2 / scaleX).toFixed(0)}.00`, 0, -15 * scaleY)
    ctx.restore()
  }
  
  // Aligned dimension for triangle side 3 - step 43-45
  // Mulai gambar setelah "Aligned dimension added" ketiga (step 45)
  if (currentStep >= 45) {
    // Side 3 (x3,y3 to x1,y1)
    const midX3 = (scaledTrianglePoints.x3 + scaledTrianglePoints.x1) / 2
    const midY3 = (scaledTrianglePoints.y3 + scaledTrianglePoints.y1) / 2
    
    const dx3 = scaledTrianglePoints.x1 - scaledTrianglePoints.x3
    const dy3 = scaledTrianglePoints.y1 - scaledTrianglePoints.y3
    const length3 = Math.sqrt(dx3*dx3 + dy3*dy3)
    const perpX3 = -dy3 / length3 * 40 * scaleX
    const perpY3 = dx3 / length3 * 40 * scaleY
    
    // Dimension line
    ctx.beginPath()
    ctx.moveTo(scaledTrianglePoints.x3 + perpX3, scaledTrianglePoints.y3 + perpY3)
    ctx.lineTo(scaledTrianglePoints.x1 + perpX3, scaledTrianglePoints.y1 + perpY3)
    ctx.stroke()
    
    // Extension lines
    ctx.beginPath()
    ctx.moveTo(scaledTrianglePoints.x3, scaledTrianglePoints.y3)
    ctx.lineTo(scaledTrianglePoints.x3 + perpX3, scaledTrianglePoints.y3 + perpY3)
    ctx.stroke()
    
    ctx.beginPath()
    ctx.moveTo(scaledTrianglePoints.x1, scaledTrianglePoints.y1)
    ctx.lineTo(scaledTrianglePoints.x1 + perpX3, scaledTrianglePoints.y1 + perpY3)
    ctx.stroke()
    
    // Dimension text
    ctx.save()
    ctx.translate(midX3 + perpX3 * 1.2, midY3 + perpY3 * 1.2)
    const angle3 = Math.atan2(dy3, dx3)
    ctx.rotate(angle3)
    ctx.fillText(`${(length3 / scaleX).toFixed(0)}.00`, 0, -15 * scaleY)
    ctx.restore()
  }
  // ===========================================
  
  // Draw red tracking dot - PERBAIKAN: Gunakan scaling
  const rawDotPos: DotPosition = getRedDotPosition(currentStep)
  const scaledDotPos = {
    x: rawDotPos.x * scaleX,
    y: rawDotPos.y * scaleY,
    animating: rawDotPos.animating,
    fromX: rawDotPos.fromX ? rawDotPos.fromX * scaleX : undefined,
    fromY: rawDotPos.fromY ? rawDotPos.fromY * scaleY : undefined,
    toX: rawDotPos.toX ? rawDotPos.toX * scaleX : undefined,
    toY: rawDotPos.toY ? rawDotPos.toY * scaleY : undefined
  }
  
  let displayX = scaledDotPos.x
  let displayY = scaledDotPos.y
  
  // Animate dot movement if needed
  if (scaledDotPos.animating && currentStep < 45) {
    const animProgress = Math.min(1, (time % 60) / 60)
    displayX = (scaledDotPos.fromX || 0) + ((scaledDotPos.toX || 0) - (scaledDotPos.fromX || 0)) * animProgress
    displayY = (scaledDotPos.fromY || 0) + ((scaledDotPos.toY || 0) - (scaledDotPos.fromY || 0)) * animProgress
  }
  
  // Draw red dot
  ctx.fillStyle = '#FF0000'
  ctx.beginPath()
  ctx.arc(displayX, displayY, 4 * Math.min(scaleX, scaleY), 0, Math.PI * 2)
  ctx.fill()
  
  // Draw halo effect
  ctx.strokeStyle = '#FF0000'
  ctx.lineWidth = 1 * Math.min(scaleX, scaleY)
  ctx.beginPath()
  ctx.arc(displayX, displayY, 6 * Math.min(scaleX, scaleY), 0, Math.PI * 2)
  ctx.stroke()
  
  // Draw coordinates display
  ctx.fillStyle = '#888'
  ctx.font = `${11 * Math.min(scaleX, scaleY)}px monospace`
  ctx.textAlign = 'right'
  ctx.fillText(`X: ${displayX.toFixed(0)}`, width - 100 * scaleX, 20 * scaleY)
  ctx.fillText(`Y: ${displayY.toFixed(0)}`, width - 100 * scaleX, 35 * scaleY)
  ctx.fillText(`Z: 0.0`, width - 100 * scaleX, 50 * scaleY)
  ctx.textAlign = 'left'
  
  // Draw current coordinates near the dot
  ctx.fillStyle = '#FF6666'
  ctx.font = `${10 * Math.min(scaleX, scaleY)}px monospace`
  ctx.textAlign = 'left'
  ctx.fillText(`${displayX.toFixed(0)},${displayY.toFixed(0)}`, displayX + 8 * scaleX, displayY - 8 * scaleY)
}