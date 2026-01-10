// Update animation steps untuk center drawing
export interface AnimationStep {
  cmd: string;
  delay: number;
}

export interface RectPoints {
  x1: number; y1: number;
  x2: number; y2: number;
  x3: number; y3: number;
  x4: number; y4: number;
  width: number;
  height: number;
}

export interface TrianglePoints {
  x1: number; y1: number;  // Vertex 1
  x2: number; y2: number;  // Vertex 2  
  x3: number; y3: number;  // Vertex 3
}

export interface CircleCenter {
  x: number;
  y: number;
}

export interface DotPosition {
  x: number;
  y: number;
  animating?: boolean;
  fromX?: number;
  fromY?: number;
  toX?: number;
  toY?: number;
}

export const animationSteps: AnimationStep[] = [
  { cmd: "Command: _GRID", delay: 800 },
  { cmd: "Grid ON", delay: 500 },
  { cmd: "Command: _OSNAP", delay: 800 },
  { cmd: "Object snap ON", delay: 500 },
  { cmd: "Command: LINE", delay: 1000 },
  { cmd: "Specify first point:", delay: 700 },
  { cmd: "300,200", delay: 600 }, // START POINT DI TENGAH
  { cmd: "Specify next point:", delay: 700 },
  { cmd: "500,200", delay: 1000 }, // GARIS KE KANAN
  { cmd: "Specify next point:", delay: 700 },
  { cmd: "500,400", delay: 1000 }, // GARIS KE BAWAH
  { cmd: "Specify next point:", delay: 700 },
  { cmd: "300,400", delay: 1000 }, // GARIS KE KIRI
  { cmd: "Specify next point:", delay: 700 },
  { cmd: "C", delay: 1200 }, // CLOSE RECTANGLE
  { cmd: "Command: CIRCLE", delay: 1000 },
  { cmd: "Specify center point:", delay: 700 },
  { cmd: "400,300", delay: 600 }, // CENTER DI TENGAH RECTANGLE
  { cmd: "Specify radius:", delay: 700 },
  { cmd: "80", delay: 1200 }, // RADIUS 80
  { cmd: "Command: _DIMLINEAR", delay: 1000 },
  { cmd: "Select horizontal line", delay: 600 },
  { cmd: "Horizontal dimension added", delay: 1500 },
  { cmd: "Command: _DIMLINEAR", delay: 1000 },
  { cmd: "Select vertical line", delay: 600 },
  { cmd: "Vertical dimension added", delay: 1500 },
  { cmd: "Command: _DIMRADIUS", delay: 1000 },
  { cmd: "Select arc or circle:", delay: 700 },
  { cmd: "Radius dimension added", delay: 1500 },
  // ===== TAMBAHAN SEGITIGA =====
  { cmd: "Command: _LINE", delay: 1000 },
  { cmd: "Specify first point:", delay: 700 },
  { cmd: "150,240", delay: 600 }, // VERTEX 1 (kiri atas)
  { cmd: "Specify next point:", delay: 700 },
  { cmd: "90,360", delay: 800 }, // VERTEX 2 (bawah kiri)
  { cmd: "Specify next point:", delay: 700 },
  { cmd: "210,360", delay: 800 }, // VERTEX 3 (bawah kanan)
  { cmd: "Specify next point:", delay: 700 },
  { cmd: "C", delay: 1000 }, // CLOSE SEGITIGA
  { cmd: "Command: _DIMALIGNED", delay: 1000 },
  { cmd: "Select triangle side 1", delay: 600 },
  { cmd: "Aligned dimension added", delay: 1500 },
  { cmd: "Command: _DIMALIGNED", delay: 1000 },
  { cmd: "Select triangle side 2", delay: 600 },
  { cmd: "Aligned dimension added", delay: 1500 },
  { cmd: "Command: _DIMALIGNED", delay: 1000 },
  { cmd: "Select triangle side 3", delay: 600 },
  { cmd: "Aligned dimension added", delay: 1500 },
  // =============================
  { cmd: "Regenerating model...", delay: 2000 },
]

// Coordinate untuk drawing (semua di center canvas)
export const rectPoints: RectPoints = {
  x1: 300, y1: 200,  // Top-left
  x2: 500, y2: 200,  // Top-right
  x3: 500, y3: 400,  // Bottom-right
  x4: 300, y4: 400,  // Bottom-left
  width: 200,        // 500 - 300
  height: 200        // 400 - 200
}

// Coordinate untuk segitiga (equilateral triangle)
export const trianglePoints: TrianglePoints = {
  x1: 150, y1: 240,  // Vertex 1 (kiri atas)
  x2: 90, y2: 360,   // Vertex 2 (bawah kiri)
  x3: 210, y3: 360   // Vertex 3 (bawah kanan)
}

export const circleCenter: CircleCenter = { x: 400, y: 300 } // Center of rectangle
export const circleRadius: number = 80

// Track red dot position berdasarkan current step
export const getRedDotPosition = (currentStep: number): DotPosition => {
  // Animasi dot mengikuti drawing process
  if (currentStep < 6) return { x: 400, y: 300 } // Center of canvas
  
  switch(currentStep) {
    case 6:  // Specify first point
      return { x: 300, y: 200 }
    case 8:  // Specify next point (first line)
      return { x: 500, y: 200, animating: true, fromX: 300, fromY: 200, toX: 500, toY: 200 }
    case 10: // Specify next point (second line)
      return { x: 500, y: 400, animating: true, fromX: 500, fromY: 200, toX: 500, toY: 400 }
    case 12: // Specify next point (third line)
      return { x: 300, y: 400, animating: true, fromX: 500, fromY: 400, toX: 300, toY: 400 }
    case 14: // Close rectangle
      return { x: 300, y: 200, animating: true, fromX: 300, fromY: 400, toX: 300, toY: 200 }
    case 16: // Circle center point
      return { x: 400, y: 300 }
    case 18: // Circle radius
      return { x: 480, y: 300, animating: true, fromX: 400, fromY: 300, toX: 480, toY: 300 }
    // ===== TAMBAHAN UNTUK SEGITIGA =====
    case 31: // Triangle vertex 1
      return { x: 150, y: 240 }
    case 33: // Triangle vertex 2
      return { x: 90, y: 360, animating: true, fromX: 150, fromY: 240, toX: 90, toY: 360 }
    case 35: // Triangle vertex 3
      return { x: 210, y: 360, animating: true, fromX: 90, fromY: 360, toX: 210, toY: 360 }
    case 37: // Close triangle
      return { x: 150, y: 240, animating: true, fromX: 210, fromY: 360, toX: 150, toY: 240 }
    // ==================================
    default:
      return { x: 400, y: 300 } // Default position
  }
}