import { motion } from "framer-motion"
import { ChevronRight, Database, Lock, Cloud, Code, Shield, Zap } from "lucide-react"

interface FeaturesSectionProps {
  isMounted: boolean
}

export default function FeaturesSection({ isMounted }: FeaturesSectionProps) {
  // Data untuk card features
  const features = [
    { icon: <Database />, title: "Database Management", desc: "Kelola database dengan mudah", color: "text-blue-400" },
    { icon: <Lock />, title: "Authentication", desc: "Sistem autentikasi aman", color: "text-green-400" },
    { icon: <Cloud />, title: "Cloud Storage", desc: "Penyimpanan cloud terintegrasi", color: "text-purple-400" },
    { icon: <Code />, title: "Auto APIs", desc: "API otomatis dari schema", color: "text-yellow-400" },
    { icon: <Shield />, title: "Security", desc: "Keamanan enterprise-grade", color: "text-red-400" },
    { icon: <Zap />, title: "Real-time", desc: "Updates real-time", color: "text-orange-400" },
  ]

  return (
    <section className="py-32 relative">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        {isMounted && [...Array(10)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute h-[1px] bg-gradient-to-r from-transparent via-[#FF6C37]/20 to-transparent"
            initial={{ x: "-100%", y: `${Math.random() * 100}%` }}
            animate={{ x: "200%" }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            style={{
              width: `${Math.random() * 100 + 50}px`,
              top: `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Everything you need to <span className="text-[#FF6C37]">build</span>
          </h2>
          <p className="text-xl text-slate-400 max-w-3xl mx-auto">
            A complete suite of tools in one powerful platform
          </p>
        </motion.div>

        {/* Animated Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative bg-slate-900/50 backdrop-blur-sm border border-slate-800 rounded-xl p-8 hover:border-[#FF6C37]/30 transition-all duration-300 overflow-hidden"
            >
              {/* Hover effect background */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#FF6C37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              <div className="relative z-10">
                <div className={`w-12 h-12 rounded-lg bg-slate-800 flex items-center justify-center mb-6 ${feature.color}`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
                <p className="text-slate-400">{feature.desc}</p>
                
                <div className="mt-6 pt-6 border-t border-slate-800">
                  <button className="text-[#FF6C37] hover:text-[#ff8154] font-medium flex items-center gap-2 group">
                    Learn more
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Animated Stats */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          {[
            { value: "50K+", label: "Active Developers" },
            { value: "99.9%", label: "Uptime" },
            { value: "∞", label: "Free Tier" },
            { value: "Global", label: "Edge Network" }
          ].map((stat, index) => (
            // Parent dengan group dan area hover yang lebih luas
            <div 
              key={stat.label} 
              className="relative p-6 group cursor-pointer"
            >
              {/* Glow effect dengan pointer-events: none */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="absolute -inset-4 bg-gradient-to-br from-[#FF6C37]/10 to-transparent 
                          rounded-2xl blur-xl opacity-0 group-hover:opacity-100 
                          transition-all duration-500 pointer-events-none"
              />
              
              {/* Konten stat */}
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
      </div>
    </section>
  )
}