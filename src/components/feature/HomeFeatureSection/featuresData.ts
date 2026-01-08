export interface FeatureItem {
  id: string
  logo: string
  title: string
  desc: string
  color: string
}

export const featuresData: FeatureItem[][] = [
  [
    { 
      id: "autocad",
      logo: "/images/A-cad.png", 
      title: "AutoCAD", 
      desc: "Advanced CAD design tools for professional engineering projects",
      color: "text-red-400" 
    }
  ],
  [
    { 
      id: "autodesk-inventor",
      logo: "/images/I-cad.png", 
      title: "Autodesk Inventor", 
      desc: "Intelligent CAD solutions with automation",
      color: "text-yellow-400" 
    },
    { 
      id: "autodesk-fusion-360",
      logo: "/images/F-cad.png", 
      title: "Autodesk Fusion 360", 
      desc: "Fusion CAD platform for seamless 3D modeling and simulation",
      color: "text-orange-400" 
    }
  ],
  [
    { 
      id: "autodesk-plant-3d",
      logo: "/images/P3d-cad.png", 
      title: "Autodesk Plant 3D", 
      desc: "Professional 3D CAD studio for architectural and product design",
      color: "text-red-400" 
    },
    { 
      id: "zwcad",
      logo: "/images/z3d-cad.png", 
      title: "ZWCAD", 
      desc: "Powerful and cost-effective 2D/3D CAD solution compatible with DWG format",
      color: "text-blue-400" 
    }
  ]
]

// Untuk backward compatibility
export const features = featuresData.flat()