import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { Calendar, X, Mail, MapPin, Award, Briefcase, BookOpen, Globe } from "lucide-react"

interface Instructor {
  id: number
  name: string
  role: string
  expertise: string
  experience: string
  image: string
  // Data tambahan untuk detail
  bio: string
  email: string
  location: string
  certifications: string[]
  workExperience: string[]
  education: string[]
  specializations: string[]
  profilePhoto?: string // URL untuk foto profil
}

interface TeamTabProps {
  instructors: Instructor[]
}

// ========== TEAM TAB ==========
export default function TeamTab({ instructors }: TeamTabProps) {
  const [selectedInstructor, setSelectedInstructor] = useState<Instructor | null>(null)
  const count = instructors.length

  const openProfile = (instructor: Instructor) => {
    setSelectedInstructor(instructor)
  }

  const closeProfile = () => {
    setSelectedInstructor(null)
  }

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <h2 className="text-4xl font-bold text-white mb-12 text-center">
          Meet Our <span className="text-[#FF6C37]">Expert Instructors</span>
        </h2>
        
        {/* Solusi dengan Flexbox - Lebih mudah kontrol ukuran card */}
        <div className={`
          flex flex-wrap justify-center gap-8
          ${count === 1 ? "max-w-sm mx-auto" : ""}
        `}>
          {instructors.map((instructor, index) => (
            <motion.div
              key={instructor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="
                group bg-slate-900/50 border border-slate-800 rounded-xl p-6 text-center 
                hover:border-[#FF6C37]/30 transition-all
                w-full max-w-[320px]  /* UKURAN TETAP SAMA */
                flex-shrink-0  /* Mencegah card menyusut */
              "
            >
              {/* Profile Avatar */}
              <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-gradient-to-br from-[#FF6C37] to-purple-600 flex items-center justify-center text-2xl font-bold text-white">
                {instructor.profilePhoto ? (
                  <img 
                    src={instructor.profilePhoto} 
                    alt={instructor.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  instructor.image
                )}
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">{instructor.name}</h3>
              <div className="text-[#FF6C37] font-medium mb-3">{instructor.role}</div>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center justify-center gap-2 text-slate-400">
                  <span className="text-sm">Expertise: {instructor.expertise}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-slate-400">
                  <Calendar className="w-4 h-4" />
                  <span className="text-sm">{instructor.experience} experience</span>
                </div>
              </div>
              
              <button 
                onClick={() => openProfile(instructor)}
                className="text-[#FF6C37] hover:text-[#ff8154] font-medium text-sm"
              >
                View Profile
              </button>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Modal Profile Detail */}
      <AnimatePresence>
        {selectedInstructor && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeProfile}
              className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            >
              {/* Modal Content */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-slate-900 border border-slate-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
              >
                {/* Modal Header */}
                <div className="sticky top-0 bg-slate-900/90 backdrop-blur-sm border-b border-slate-800 p-6 flex justify-between items-start z-10">
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedInstructor.name}</h3>
                    <p className="text-[#FF6C37] font-medium">{selectedInstructor.role}</p>
                  </div>
                  <button
                    onClick={closeProfile}
                    className="text-slate-400 hover:text-white p-2 hover:bg-slate-800 rounded-lg transition-colors"
                  >
                    <X className="w-6 h-6" />
                  </button>
                </div>

                {/* Modal Body */}
                <div className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Profile Info */}
                    <div className="lg:col-span-1">
                      {/* Profile Photo */}
                      <div className="w-48 h-48 rounded-full mx-auto mb-6 bg-gradient-to-br from-[#FF6C37] to-purple-600 overflow-hidden border-4 border-slate-800">
                        {selectedInstructor.profilePhoto ? (
                          <img 
                            src={selectedInstructor.profilePhoto} 
                            alt={selectedInstructor.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-white">
                            {selectedInstructor.image}
                          </div>
                        )}
                      </div>

                      {/* Contact Info */}
                      <div className="space-y-4 mb-8">
                        <div className="flex items-center gap-3 text-slate-300">
                          <Mail className="w-5 h-5 text-[#FF6C37]" />
                          <span className="text-sm">{selectedInstructor.email}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-300">
                          <MapPin className="w-5 h-5 text-[#FF6C37]" />
                          <span className="text-sm">{selectedInstructor.location}</span>
                        </div>
                        <div className="flex items-center gap-3 text-slate-300">
                          <Calendar className="w-5 h-5 text-[#FF6C37]" />
                          <span className="text-sm">{selectedInstructor.experience} experience</span>
                        </div>
                      </div>

                      {/* Expertise */}
                      <div className="mb-8">
                        <h4 className="text-lg font-semibold text-white mb-3">Expertise</h4>
                        <div className="flex flex-wrap gap-2">
                          {selectedInstructor.specializations.map((spec, index) => (
                            <span 
                              key={index}
                              className="px-3 py-1 bg-slate-800 text-slate-300 text-sm rounded-full"
                            >
                              {spec}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Details */}
                    <div className="lg:col-span-2 space-y-8">
                      {/* Bio */}
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                          <BookOpen className="w-5 h-5 text-[#FF6C37]" />
                          About
                        </h4>
                        <p className="text-slate-400 leading-relaxed">
                          {selectedInstructor.bio}
                        </p>
                      </div>

                      {/* Work Experience */}
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                          <Briefcase className="w-5 h-5 text-[#FF6C37]" />
                          Work Experience
                        </h4>
                        <ul className="space-y-3">
                          {selectedInstructor.workExperience.map((exp, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <div className="w-2 h-2 mt-2 rounded-full bg-[#FF6C37] flex-shrink-0" />
                              <span className="text-slate-400 text-sm">{exp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Certifications */}
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                          <Award className="w-5 h-5 text-[#FF6C37]" />
                          Certifications
                        </h4>
                        <ul className="space-y-3">
                          {selectedInstructor.certifications.map((cert, index) => (
                            <li key={index} className="flex items-center gap-3">
                              <div className="w-2 h-2 rounded-full bg-[#FF6C37] flex-shrink-0" />
                              <span className="text-slate-400 text-sm">{cert}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Education */}
                      <div>
                        <h4 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
                          <Globe className="w-5 h-5 text-[#FF6C37]" />
                          Education
                        </h4>
                        <ul className="space-y-3">
                          {selectedInstructor.education.map((edu, index) => (
                            <li key={index} className="flex items-start gap-3">
                              <div className="w-2 h-2 mt-2 rounded-full bg-[#FF6C37] flex-shrink-0" />
                              <span className="text-slate-400 text-sm">{edu}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Modal Footer */}
                <div className="sticky bottom-0 bg-slate-900/90 backdrop-blur-sm border-t border-slate-800 p-6 flex justify-end">
                  <button
                    onClick={closeProfile}
                    className="px-6 py-2 bg-[#FF6C37] hover:bg-[#ff8154] text-white font-medium rounded-lg transition-colors"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}



// import { motion } from "framer-motion"
// import { Calendar } from "lucide-react"

// interface Instructor {
//   name: string
//   role: string
//   expertise: string
//   experience: string
//   image: string
// }

// interface TeamTabProps {
//   instructors: Instructor[]
// }

// // ========== TEAM TAB ==========
// export default function TeamTab({ instructors }: TeamTabProps) {
//   const count = instructors.length
  
//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//     >
//       <h2 className="text-4xl font-bold text-white mb-12 text-center">
//         Meet Our <span className="text-[#FF6C37]">Expert Instructors</span>
//       </h2>
      
//       {/* Solusi dengan Flexbox - Lebih mudah kontrol ukuran card */}
//       <div className={`
//         flex flex-wrap justify-center gap-8
//         ${count === 1 ? "max-w-sm mx-auto" : ""}
//       `}>
//         {instructors.map((instructor, index) => (
//           <motion.div
//             key={instructor.name}
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             viewport={{ once: true }}
//             transition={{ delay: index * 0.1 }}
//             whileHover={{ y: -8 }}
//             className="
//               group bg-slate-900/50 border border-slate-800 rounded-xl p-6 text-center 
//               hover:border-[#FF6C37]/30 transition-all
//               w-full max-w-[320px]  /* UKURAN TETAP SAMA */
//               flex-shrink-0  /* Mencegah card menyusut */
//             "
//           >
//             {/* Profile Avatar */}
//             <div className="w-24 h-24 rounded-full mx-auto mb-4 bg-gradient-to-br from-[#FF6C37] to-purple-600 flex items-center justify-center text-2xl font-bold text-white">
//               {instructor.image}
//             </div>
            
//             <h3 className="text-xl font-bold text-white mb-2">{instructor.name}</h3>
//             <div className="text-[#FF6C37] font-medium mb-3">{instructor.role}</div>
            
//             <div className="space-y-2 mb-4">
//               <div className="flex items-center justify-center gap-2 text-slate-400">
//                 <span className="text-sm">Expertise: {instructor.expertise}</span>
//               </div>
//               <div className="flex items-center justify-center gap-2 text-slate-400">
//                 <Calendar className="w-4 h-4" />
//                 <span className="text-sm">{instructor.experience} experience</span>
//               </div>
//             </div>
            
//             <button className="text-[#FF6C37] hover:text-[#ff8154] font-medium text-sm">
//               View Profile
//             </button>
//           </motion.div>
//         ))}
//       </div>
//     </motion.div>
//   )
// }