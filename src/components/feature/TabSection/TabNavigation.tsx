import { motion } from "framer-motion"
import { 
  Users, Building, BookOpen, Award 
} from "lucide-react"

interface Tab {
  id: string
  label: string
  icon: string
}

interface TabsNavigationProps {
  activeTab: string
  setActiveTab: (tab: string) => void
  tabs: Tab[]
}

// ========== TABS NAVIGATION ==========
export default function TabsNavigation({ activeTab, setActiveTab, tabs }: TabsNavigationProps) {
  const iconMap: { [key: string]: React.ElementType } = {
    Users: Users,
    Building: Building,
    BookOpen: BookOpen,
    Award: Award
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="flex flex-wrap justify-center gap-4 mb-12"
    >
      {tabs.map((tab) => {
        const IconComponent = iconMap[tab.icon]
        return (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-all ${
              activeTab === tab.id
                ? "bg-[#FF6C37] text-white"
                : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            <IconComponent className="w-4 h-4" />
            {tab.label}
          </button>
        )
      })}
    </motion.div>
  )
}