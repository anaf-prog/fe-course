import { Sparkles } from "lucide-react"

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 py-12">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-2 mb-6 md:mb-0">
          <div className="w-8 h-8 bg-[#FF6C37] rounded-lg flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <span className="text-xl font-bold text-white">MyCourse</span>
        </div>
        <div className="text-slate-400 text-sm">
          © <span suppressHydrationWarning>{new Date().getFullYear()}</span> MyCourse Platform. All rights reserved.
        </div>
      </div>
    </footer>
  )
}