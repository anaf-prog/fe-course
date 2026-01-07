import { motion } from "framer-motion"

const stats = [
  { value: "50K+", label: "CAD Professionals" },
  { value: "99.9%", label: "Precision Accuracy" },
  { value: "4.9/5", label: "User Rating" },
  { value: "Global", label: "Support Network" }
]

export default function StatsSection() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
    >
      {stats.map((stat, index) => (
        <div 
          key={stat.label} 
          className="relative p-6 group cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="absolute -inset-4 bg-gradient-to-br from-[#FF6C37]/10 to-transparent 
                      rounded-2xl blur-xl opacity-0 group-hover:opacity-100 
                      transition-all duration-500 pointer-events-none"
          />
          
          <div className="relative z-10 transform group-hover:scale-105 transition-transform duration-300">
            <div className="text-5xl font-bold text-white mb-2 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              {stat.value}
            </div>
            <div className="text-slate-400 group-hover:text-slate-300 transition-colors">
              {stat.label}
            </div>
          </div>
        </div>
      ))}
    </motion.div>
  )
}