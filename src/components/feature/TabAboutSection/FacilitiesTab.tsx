import { motion } from "framer-motion"
import { CheckCircle, MapPin, Mail, Globe } from "lucide-react"

interface FacilitiesTabProps {
  facilities: string[]
}

// ========== FACILITIES TAB ==========
export default function FacilitiesTab({ facilities }: FacilitiesTabProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-4xl mx-auto"
    >
      <h2 className="text-4xl font-bold text-white mb-12 text-center">
        Premium <span className="text-[#FF6C37]">Learning Facilities</span>
      </h2>
      
      <div className="grid md:grid-cols-2 gap-8 items-stretch">
        {/* Card 1 - What You Get */}
        <motion.div
          className="relative group h-full"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute -inset-4 bg-gradient-to-br from-[#FF6C37]/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="relative bg-slate-900/50 border border-slate-800 rounded-xl p-8 h-full">
            <h3 className="text-2xl font-bold text-white mb-6">What You Get</h3>
            <div className="space-y-4">
              {facilities.map((facility, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#FF6C37]/10 flex items-center justify-center">
                    <CheckCircle className="w-4 h-4 text-[#FF6C37]" />
                  </div>
                  <span className="text-slate-300">{facility}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Card 2 - Contact Information */}
        <motion.div
          className="relative group h-full"
          whileHover={{ y: -5 }}
          transition={{ duration: 0.2 }}
        >
          <div className="absolute -inset-4 bg-gradient-to-br from-[#FF6C37]/10 to-transparent rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          
          <div className="relative bg-slate-900/50 border border-slate-800 rounded-xl p-8 h-full">
            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#FF6C37]/10 flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-[#FF6C37]" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">Location</h4>
                  <p className="text-slate-400">Tech Hub Building, Jakarta</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#FF6C37]/10 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[#FF6C37]" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">Email</h4>
                  <p className="text-slate-400">info@mycourse.dev</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-[#FF6C37]/10 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-[#FF6C37]" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-white mb-1">Support Hours</h4>
                  <p className="text-slate-400">24/7 Technical Support</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}