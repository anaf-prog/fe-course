import { motion } from "framer-motion"
import { CheckCircle, Video, Download, Settings, BarChart } from "lucide-react"

interface LearningMethod {
  icon: string
  title: string
  description: string
}

interface AboutTabProps {
  learningMethods: LearningMethod[]
}

// ========== ABOUT TAB ==========
export default function AboutTab({ learningMethods }: AboutTabProps) {
  const iconMap: { [key: string]: React.ElementType } = {
    Video: Video,
    Download: Download,
    Settings: Settings,
    BarChart: BarChart
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="grid lg:grid-cols-2 gap-12 items-center"
    >
      <div>
        <h2 className="text-4xl font-bold text-white mb-6">
          Our Mission: <span className="text-[#FF6C37]">Empowering Drafter</span>
        </h2>
        <p className="text-lg text-slate-400 mb-6">
          MyCourse.dev was founded with a simple mission: to make professional CAD 
          education accessible to everyone. We believe that mastering tools like 
          AutoCAD, Inventor, and Fusion 360 should be straightforward and practical.
        </p>
        <p className="text-lg text-slate-400 mb-8">
          Our platform combines industry expertise with modern teaching methods 
          to help architects, engineers, and designers excel in their careers.
        </p>
        
        <div className="space-y-4">
          {[
            "Project-Based Learning Approach",
            "Industry-Standard Curriculum",
            "Expert-Led Instruction",
            "Career-Focused Training"
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-[#FF6C37]" />
              <span className="text-slate-300">{item}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="relative">
        <div className="absolute -inset-4 bg-gradient-to-br from-[#FF6C37]/10 to-transparent rounded-2xl blur-xl" />
        <div className="relative bg-slate-900/50 border border-slate-800 rounded-xl p-8">
          <h3 className="text-2xl font-bold text-white mb-6">Why Choose Us?</h3>
          
          <div className="space-y-6">
            {learningMethods.map((method, index) => {
              const IconComponent = iconMap[method.icon]
              return (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-[#FF6C37]/10 flex items-center justify-center text-[#FF6C37]">
                    <IconComponent className="w-8 h-8" />
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-white mb-1">{method.title}</h4>
                    <p className="text-slate-400">{method.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </motion.div>
  )
}