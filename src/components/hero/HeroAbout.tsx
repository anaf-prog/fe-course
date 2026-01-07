import { motion } from "framer-motion"
import { GraduationCap } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[800px] w-[800px] rounded-full bg-[#FF6C37]/5 blur-[150px]" />
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#FF6C37]/10 border border-[#FF6C37]/20 mb-6">
            <GraduationCap className="w-4 h-4 text-[#FF6C37]" />
            <span className="text-sm font-medium text-[#FF6C37]">
              CAD Learning Platform
            </span>
          </div>

          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
            Transforming CAD Education
            <br />
            for <span className="text-[#FF6C37]">Professionals</span>
            <motion.span
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              className="inline-block ml-4"
            >
              🎓
            </motion.span>
          </h1>
          
          <p className="text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto">
            We provide comprehensive CAD training for architects, engineers, 
            and designers using industry-standard Autodesk software.
          </p>
        </motion.div>

        {/* Stats Banner */}
        <StatsBanner />
      </div>
    </section>
  )
}

function StatsBanner() {
  const stats = [
    { value: "5000+", label: "Students Trained" },
    { value: "98%", label: "Satisfaction Rate" },
    { value: "50+", label: "Expert Instructors" },
    { value: "24/7", label: "Support Available" }
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
    >
      {stats.map((stat, index) => (
        <div key={index} className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 text-center">
          <div className="text-3xl font-bold text-white mb-2">{stat.value}</div>
          <div className="text-slate-400">{stat.label}</div>
        </div>
      ))}
    </motion.div>
  )
}