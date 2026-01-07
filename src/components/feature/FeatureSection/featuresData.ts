// Data untuk card features dengan logo CAD
export interface FeatureItem {
  logo: string
  title: string
  desc: string
  color: string
}

export const features: FeatureItem[] = [
  { 
    logo: "/images/A-cad.png", 
    title: "AutoCAD", 
    desc: "Advanced CAD design tools for professional engineering projects",
    color: "text-red-400" 
  },
  { 
    logo: "/images/I-cad.png", 
    title: "Autodesk Inventor", 
    desc: "Intelligent CAD solutions with automation",
    color: "text-yellow-400" 
  },
  { 
    logo: "/images/F-cad.png", 
    title: "Autodesk Fusion 360", 
    desc: "Fusion CAD platform for seamless 3D modeling and simulation",
    color: "text-orange-400" 
  },
  { 
    logo: "/images/P3d-cad.png", 
    title: "Autodesk Plant 3D", 
    desc: "Professional 3D CAD studio for architectural and product design",
    color: "text-red-400" 
  },
  { 
    logo: "/images/z3d-cad.png", 
    title: "ZWCAD", 
    desc: "Powerful and cost-effective 2D/3D CAD solution compatible with DWG format",
    color: "text-blue-400" 
  },
]