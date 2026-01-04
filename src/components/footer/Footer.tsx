import { Sparkles } from "lucide-react"
import { FaWhatsapp, FaInstagram, FaFacebookF, FaTwitter, FaYoutube, FaEnvelope } from "react-icons/fa"

export default function Footer() {
  // Ganti dengan link media sosial Anda
  const socialLinks = {
    whatsapp: "https://wa.me/yournumber",
    instagram: "https://instagram.com/yourusername",
    facebook: "https://facebook.com/yourusername",
    twitter: "https://twitter.com/yourusername",
    youtube: "https://youtube.com/yourchannel",
    gmail: "mailto:youremail@gmail.com"
  }

  return (
    <footer className="border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        {/* Logo dan Nama Brand */}
        <div className="flex items-center gap-2 mb-6 md:mb-0 order-1 md:order-1">
          <div className="w-8 h-8 bg-[#FF6C37] rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">MyCourse</span>
        </div>

        {/* Media Sosial - Di Tengah */}
        <div className="flex flex-col items-center justify-center mb-6 md:mb-0 order-2 md:order-2">
          <div className="mb-4">
            <span className="text-white font-semibold text-lg tracking-wide">
              Contact & Follow Me
            </span>
          </div>
          
          {/* Ikon Media Sosial */}
          <div className="flex items-center justify-center gap-6">
            <a 
              href={socialLinks.whatsapp} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-green-500 transition-colors duration-300 transform hover:scale-110"
              aria-label="WhatsApp"
            >
              <FaWhatsapp className="w-7 h-7" />
            </a>
            <a 
              href={socialLinks.instagram} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-pink-600 transition-colors duration-300 transform hover:scale-110"
              aria-label="Instagram"
            >
              <FaInstagram className="w-7 h-7" />
            </a>
            <a 
              href={socialLinks.facebook} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-600 transition-colors duration-300 transform hover:scale-110"
              aria-label="Facebook"
            >
              <FaFacebookF className="w-7 h-7" />
            </a>
            <a 
              href={socialLinks.twitter} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-blue-400 transition-colors duration-300 transform hover:scale-110"
              aria-label="Twitter"
            >
              <FaTwitter className="w-7 h-7" />
            </a>
            <a 
              href={socialLinks.youtube} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-red-600 transition-colors duration-300 transform hover:scale-110"
              aria-label="YouTube"
            >
              <FaYoutube className="w-7 h-7" />
            </a>
            <a 
              href={socialLinks.gmail} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-slate-400 hover:text-red-500 transition-colors duration-300 transform hover:scale-110"
              aria-label="Email"
            >
              <FaEnvelope className="w-7 h-7" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-slate-400 text-sm order-3 md:order-3">
          © <span suppressHydrationWarning>{new Date().getFullYear()}</span> MyCourse Platform. All rights reserved.
        </div>
      </div>
    </footer>
  )
}