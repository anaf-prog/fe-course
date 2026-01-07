import { motion } from "framer-motion"

export default function HeaderSection() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="text-center mb-16"
    >
      <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
        Complete CAD Solutions <span className="text-[#FF6C37]">Suite</span>
      </h2>
      <p className="text-xl text-slate-400 max-w-3xl mx-auto">
        Professional CAD tools for engineering, architecture, and product design
      </p>
    </motion.div>
  )
}