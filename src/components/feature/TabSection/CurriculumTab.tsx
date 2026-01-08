import { motion } from "framer-motion"
import { CheckCircle, Calendar } from "lucide-react"

interface CurriculumLevel {
  level: string
  courses: string[]
  duration: string
  projects: number
}

interface CurriculumTabProps {
  curriculum: CurriculumLevel[]
}

// ========== CURRICULUM TAB ==========
export default function CurriculumTab({ curriculum }: CurriculumTabProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="text-4xl font-bold text-white mb-12 text-center">
        Structured <span className="text-[#FF6C37]">Learning Path</span>
      </h2>
      
      <div className="grid md:grid-cols-3 gap-8">
        {curriculum.map((level, index) => (
          <motion.div
            key={level.level}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="relative group"
          >
            <div className="absolute -inset-4 bg-gradient-to-br from-[#FF6C37]/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            
            <div className="relative bg-slate-900/50 border border-slate-800 rounded-xl p-8 h-full">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6C37]/10 border border-[#FF6C37]/20 mb-6">
                <span className="text-sm font-medium text-[#FF6C37]">
                  {level.level} Level
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">{level.level} Curriculum</h3>
              
              <div className="space-y-3 mb-6">
                {level.courses.map((course, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <CheckCircle className="w-4 h-4 text-[#FF6C37]" />
                    <span className="text-slate-300">{course}</span>
                  </div>
                ))}
              </div>
              
              <div className="pt-6 border-t border-slate-800">
                <div className="flex justify-between text-slate-400 mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>{level.duration}</span>
                  </div>
                  <div>
                    <span>{level.projects} Projects</span>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}