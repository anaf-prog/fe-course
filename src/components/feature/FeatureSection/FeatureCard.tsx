import { motion } from "framer-motion"
import { ChevronRight } from "lucide-react"
import { FeatureItem } from "./featuresData"
import Link from "next/link"

interface FeatureCardProps {
  feature: FeatureItem
  index: number
  groupIndex: number
  isSingle?: boolean
}

// Komponen FeatureCard untuk menampilkan kartu fitur individual
function FeatureCard({ 
  feature, 
  index, 
  groupIndex,
  isSingle = false 
}: FeatureCardProps) {
  return (
    <motion.div
      key={`${feature.title}-${groupIndex}-${index}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: (groupIndex * 0.2) + (index * 0.1) }}
      whileHover={{ y: -10, scale: 1.02 }}
      className={`group relative bg-slate-900/30 backdrop-blur-xs border border-slate-800 rounded-xl p-8 hover:border-[#FF6C37]/30 transition-all duration-300 overflow-hidden min-h-[280px] flex flex-col ${
        isSingle ? 'w-full md:w-1/2' : ''
      }`}
    >
      {/* Hover effect background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF6C37]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative z-10 flex-1 flex flex-col">
        {/* Logo container */}
        <div className="flex items-start mb-6">
          <div className="w-16 h-16 rounded-xl bg-slate-800 flex items-center justify-center p-3 mr-4">
            <div className="relative w-full h-full">
              <img 
                src={feature.logo} 
                alt={feature.title}
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.currentTarget.src = `https://placehold.co/100x100/1e293b/ffffff?text=${feature.title.charAt(0)}`
                }}
              />
            </div>
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white mb-2">{feature.title}</h3>
            <div className={`text-sm font-medium ${feature.color}`}>
              CAD Design Platform
            </div>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-slate-400 text-lg mb-6 flex-1">
          {feature.desc}
        </p>
        
        {/* Bottom section */}
        <div className="mt-auto pt-6 border-t border-slate-800">
          <Link 
            href={`/class/${feature.id}`}
            className="text-[#FF6C37] hover:text-[#ff8154] font-medium flex items-center gap-2 group text-lg"
          >
            Explore Features
            <ChevronRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

interface FeaturesGridProps {
  featureGroups: FeatureItem[][]
}

// Komponen FeaturesGrid untuk menampilkan grid dari kartu-kartu fitur
function FeaturesGrid({ featureGroups }: FeaturesGridProps) {
  return (
    <div className="relative z-10">
      {featureGroups.map((group, groupIndex) => {
        // Jika group hanya memiliki 1 item (seperti ZWCAD), tampilkan di tengah
        if (group.length === 1) {
          return (
            <div key={`group-${groupIndex}`} className="flex justify-center mb-8">
              {group.map((feature, index) => (
                <FeatureCard
                  key={`${feature.title}-${groupIndex}-${index}`}
                  feature={feature}
                  index={index}
                  groupIndex={groupIndex}
                  isSingle={true}
                />
              ))}
            </div>
          )
        }
        
        // Jika group memiliki 2 item, tampilkan dalam grid 2 kolom
        return (
          <div key={`group-${groupIndex}`} className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            {group.map((feature, index) => (
              <FeatureCard
                key={`${feature.title}-${groupIndex}-${index}`}
                feature={feature}
                index={index}
                groupIndex={groupIndex}
                isSingle={false}
              />
            ))}
          </div>
        )
      })}
    </div>
  )
}

export { FeatureCard, FeaturesGrid }
export default FeatureCard