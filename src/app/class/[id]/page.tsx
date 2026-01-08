'use client'

import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ArrowLeft, Zap, Shield, Clock, Users, BookOpen, GraduationCap, CheckCircle, Award, Calendar, Code } from 'lucide-react'
import Link from 'next/link'
import { features } from '@/components/feature/FeatureSection/featuresData'

export default function CourseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const courseId = params.id as string
  const [course, setCourse] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Cari course berdasarkan ID
    const foundCourse = features.find(f => f.id === courseId)
    
    if (foundCourse) {
      setCourse(foundCourse)
    } else {
      // Jika tidak ditemukan, redirect ke home
      router.push('/')
    }
    setLoading(false)
  }, [courseId, router])

  if (loading || !course) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center">
        <div className="text-white">Loading course details...</div>
      </div>
    )
  }

  // Data spesifik untuk setiap course
  const courseDetails = {
    autocad: {
      whatYoullLearn: [
        "Master 2D Drafting & Annotation techniques",
        "Create professional 3D Models & Visualizations",
        "Collaborate effectively with team members",
        "Customize AutoCAD using APIs and scripts",
        "Apply industry-specific workflows"
      ],
      courseBenefits: [
        "Get certified by industry experts",
        "Build a professional portfolio project",
        "Lifetime access to course materials",
        "Join exclusive community of designers",
        "Get career guidance and mentorship"
      ],
      duration: "6 Weeks",
      level: "Beginner to Intermediate",
      projects: "4 Real Projects",
      certificate: "Yes, Accredited"
    },
    inventor: {
      whatYoullLearn: [
        "Parametric Modeling fundamentals",
        "Advanced Assembly Design techniques",
        "Sheet Metal Design workflows",
        "Stress Analysis and simulation",
        "Professional Rendering & Animation"
      ],
      courseBenefits: [
        "Industry-recognized certification",
        "Portfolio-ready design projects",
        "Mentorship from CAD professionals",
        "Access to exclusive job board",
        "Continuous learning support"
      ],
      duration: "8 Weeks",
      level: "Intermediate",
      projects: "5 Real Projects",
      certificate: "Yes, with Industry Recognition"
    },
    fusion360: {
      whatYoullLearn: [
        "Cloud-based Collaboration workflows",
        "Generative Design principles",
        "CAM & CNC Programming basics",
        "Electronics & PCB Design integration",
        "Simulation & Testing methodologies"
      ],
      courseBenefits: [
        "Master in-demand cloud CAD skills",
        "Build AI-powered design projects",
        "Access to manufacturing network",
        "Mobile design workflow mastery",
        "Entrepreneurship guidance"
      ],
      duration: "10 Weeks",
      level: "All Levels",
      projects: "6 Real Projects",
      certificate: "Yes, Advanced Certification"
    },
    plant3d: {
      whatYoullLearn: [
        "Professional P&ID Creation",
        "3D Plant Modeling techniques",
        "Automatic ISO Generation",
        "Collaborative Review processes",
        "Data & Report Management systems"
      ],
      courseBenefits: [
        "Specialized plant design skills",
        "Industry compliance knowledge",
        "Safety protocol mastery",
        "Project coordination expertise",
        "High-demand industry certification"
      ],
      duration: "8 Weeks",
      level: "Advanced",
      projects: "3 Industrial Projects",
      certificate: "Yes, Specialized Certification"
    },
    zwcad: {
      whatYoullLearn: [
        "Complete DWG Compatibility mastery",
        "Professional 2D Drafting Tools",
        "Efficient 3D Modeling techniques",
        "LISP Programming & API Support",
        "Performance optimization strategies"
      ],
      courseBenefits: [
        "Cost-effective CAD expertise",
        "Rapid skill transfer from AutoCAD",
        "Open-source tool mastery",
        "Local industry network access",
        "Budget-conscious design skills"
      ],
      duration: "5 Weeks",
      level: "Beginner",
      projects: "3 Real Projects",
      certificate: "Yes, Professional Certification"
    }
  }

  const details = courseDetails[course.id as keyof typeof courseDetails] || courseDetails.zwcad

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      {/* Header dengan back button */}
      <header className="border-b border-slate-800 sticky top-0 z-50 bg-slate-950/90 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <Link 
              href="/" 
              className="text-white hover:text-[#FF6C37] flex items-center gap-2 transition-colors group"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> 
              <span className="hidden sm:inline">Back to Courses</span>
              <span className="sm:hidden">Back</span>
            </Link>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2 text-white">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                <span className="text-sm">Enrollment Open</span>
              </div>
              <button className="bg-[#FF6C37] hover:bg-[#ff8154] text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm sm:text-base">
                Enroll Now
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Konten utama */}
      <main className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto"
        >

          {/* Hero Section */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-6 md:gap-8 mb-12">
            <div className="w-20 h-20 rounded-xl bg-slate-800 flex items-center justify-center p-4 flex-shrink-0">
              <BookOpen className="w-12 h-12 text-[#FF6C37]" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-5xl font-bold text-white">
                  {course.title} Masterclass
                </h1>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${course.color.replace('text-', 'bg-')}/20 ${course.color}`}>
                  Professional Course
                </span>
              </div>
              <p className="text-lg md:text-xl text-slate-300 mb-6">
                Master {course.title} with industry experts - from basics to advanced professional workflows
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 text-slate-400">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{details.duration}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <GraduationCap className="w-4 h-4" />
                  <span className="text-sm">{details.level}</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Award className="w-4 h-4" />
                  <span className="text-sm">Certificate Included</span>
                </div>
                <div className="flex items-center gap-2 text-slate-400">
                  <Users className="w-4 h-4" />
                  <span className="text-sm">Live Sessions</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detail Content */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              {/* Course Overview */}
              <div className="bg-slate-900/50 backdrop-blur-xs border border-slate-800 rounded-2xl p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <BookOpen className="w-6 h-6 text-[#FF6C37]" />
                  <h2 className="text-2xl font-bold text-white">Course Overview</h2>
                </div>
                
                <div className="prose prose-invert max-w-none">
                  <p className="text-slate-300 text-lg mb-8 leading-relaxed">
                    This comprehensive masterclass will transform you from a beginner to a proficient {course.title} professional. 
                    Through hands-on projects, real-world scenarios, and expert guidance, you'll gain the skills demanded by 
                    top design firms and engineering companies worldwide.
                  </p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* What You'll Learn */}
                    <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-[#FF6C37]/20 flex items-center justify-center">
                          <Zap className="w-5 h-5 text-[#FF6C37]" />
                        </div>
                        <h3 className="text-xl font-bold text-white">What You'll Learn</h3>
                      </div>
                      <ul className="space-y-4">
                        {details.whatYoullLearn.map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-slate-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    {/* Course Benefits */}
                    <div className="bg-slate-800/30 rounded-xl p-6 border border-slate-700/50">
                      <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 rounded-lg bg-[#FF6C37]/20 flex items-center justify-center">
                          <Shield className="w-5 h-5 text-[#FF6C37]" />
                        </div>
                        <h3 className="text-xl font-bold text-white">Course Benefits</h3>
                      </div>
                      <ul className="space-y-4">
                        {details.courseBenefits.map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <div className="w-6 h-6 rounded-full bg-[#FF6C37]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                              <div className="w-2 h-2 rounded-full bg-[#FF6C37]"></div>
                            </div>
                            <span className="text-slate-300">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Course Highlights */}
              <div className="bg-slate-900/50 backdrop-blur-xs border border-slate-800 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-6">Course Highlights</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="w-5 h-5 text-[#FF6C37]" />
                    <div>
                      <p className="text-white font-medium">Duration</p>
                      <p className="text-slate-400 text-sm">{details.duration}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <GraduationCap className="w-5 h-5 text-[#FF6C37]" />
                    <div>
                      <p className="text-white font-medium">Skill Level</p>
                      <p className="text-slate-400 text-sm">{details.level}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Code className="w-5 h-5 text-[#FF6C37]" />
                    <div>
                      <p className="text-white font-medium">Hands-on Projects</p>
                      <p className="text-slate-400 text-sm">{details.projects}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Award className="w-5 h-5 text-[#FF6C37]" />
                    <div>
                      <p className="text-white font-medium">Certificate</p>
                      <p className="text-slate-400 text-sm">{details.certificate}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Enrollment Card */}
              <div className="bg-slate-900/50 backdrop-blur-xs border border-slate-800 rounded-2xl p-6">
                <h3 className="text-xl font-bold text-white mb-4">Enroll Now</h3>
                <div className="space-y-4 mb-6">
                  <div className="bg-slate-800/30 rounded-lg p-4 border border-[#FF6C37]/30">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-white font-semibold">Full Course Access</span>
                      <span className="text-[#FF6C37] font-bold text-2xl">$499</span>
                    </div>
                    <p className="text-sm text-slate-400">One-time payment, lifetime access</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <button className="w-full bg-[#FF6C37] hover:bg-[#ff8154] text-white py-3 rounded-lg font-medium transition-colors">
                    Enroll Now - Full Access
                  </button>
                </div>
                
                <div className="mt-6 pt-6 border-t border-slate-800">
                  <p className="text-sm text-slate-400">
                    <CheckCircle className="w-4 h-4 inline mr-2 text-green-500" />
                    Free to repeat if you don't understand
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </main>

      {/* Footer CTA */}
      <footer className="border-t border-slate-800 mt-12">
        <div className="container mx-auto px-4 sm:px-6 py-12">
          <div className="bg-gradient-to-r from-slate-900 to-slate-800/50 rounded-2xl p-8 md:p-12 border border-slate-700/50">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-3xl font-bold text-white mb-4">
                Ready to Master {course.title}?
              </h2>
              <p className="text-xl text-slate-300 mb-8">
                Join 5,000+ professionals who transformed their careers with our masterclass.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-[#FF6C37] hover:bg-[#ff8154] text-white px-8 py-3 rounded-lg font-medium transition-all hover:scale-105">
                  Enroll Now - Start Learning Today
                </button>
                <button className="border border-slate-700 hover:border-[#FF6C37] text-white px-8 py-3 rounded-lg font-medium transition-all hover:scale-105">
                  Schedule Career Consultation
                </button>
              </div>
              <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">98%</div>
                  <div className="text-sm text-slate-400">Satisfaction Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">5,000+</div>
                  <div className="text-sm text-slate-400">Students Enrolled</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">24/7</div>
                  <div className="text-sm text-slate-400">Support Access</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-white">Lifetime</div>
                  <div className="text-sm text-slate-400">Course Access</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}