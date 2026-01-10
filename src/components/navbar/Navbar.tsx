import { motion } from "framer-motion"
import { Menu, X, Sparkles } from "lucide-react"

interface NavbarProps {
  scrolled: boolean
  mobileMenuOpen: boolean
  setMobileMenuOpen: (open: boolean) => void
}

export default function Navbar({ scrolled, mobileMenuOpen, setMobileMenuOpen }: NavbarProps) {
  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
      scrolled ? "bg-[#030712]/90 backdrop-blur-md border-b border-slate-800" : "bg-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <div className="w-8 h-8 bg-[#FF6C37] rounded-lg flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-white">MyCourse<span className="text-[#FF6C37]">.dev</span></span>
          </motion.div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="/" className="text-slate-300 hover:text-white transition-colors">Home</a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors">Documentation</a>
            <a href="/about" className="text-slate-300 hover:text-white transition-colors">About Us</a>
            <a href="#" className="text-slate-300 hover:text-white transition-colors">Blog</a>
            
            <div className="flex items-center gap-4">
              <button className="text-slate-300 hover:text-white px-4 py-2">Sign In</button>
              <button className="bg-[#FF6C37] hover:bg-[#FF5500] text-white px-6 py-2 rounded-md transition-colors">
                Get Started
              </button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-slate-300"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="md:hidden mt-4 pb-4 border-t border-slate-800 pt-4"
          >
            <div className="flex flex-col gap-4">
              <a href="/" className="text-slate-300 hover:text-white transition-colors">Home</a>
              <a href="#" className="text-slate-300 hover:text-white py-2">Documentation</a>
              <a href="/about" className="text-slate-300 hover:text-white transition-colors">About Us</a>
              <a href="#" className="text-slate-300 hover:text-white py-2">Blog</a>
              <div className="flex flex-col gap-2 pt-2">
                <button className="text-slate-300 hover:text-white py-2">Sign In</button>
                <button className="bg-[#FF6C37] hover:bg-[#FF5500] text-white py-2 rounded-md">
                  Get Started
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  )
}