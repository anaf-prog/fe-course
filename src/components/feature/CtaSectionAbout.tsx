import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"

export default function CTASection() {
  return (
    <section className="py-20 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-900/50" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="bg-gradient-to-br from-slate-900 to-slate-950 border border-slate-800 rounded-2xl p-12"
        >
          <h2 className="text-4xl font-bold text-white mb-6">
            Start Your CAD Journey <span className="text-[#FF6C37]">Today</span>
          </h2>
          <p className="text-xl text-slate-400 mb-8 max-w-2xl mx-auto">
            Join thousands of professionals who have transformed their careers 
            with our comprehensive CAD training programs.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group relative px-8 py-4 bg-[#FF6C37] hover:bg-[#ff8154] text-white font-bold rounded-lg transition-all duration-300 shadow-[0_0_40px_rgba(255,108,55,0.3)] flex items-center gap-2">
              Explore Courses
              <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
            <button className="px-8 py-4 border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white rounded-lg transition-all duration-300">
              Book Free Consultation
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}