import { useState } from "react"
import TabsNavigation from "@/components/feature/TabSection/TabNavigation"
import AboutTab from "@/components/feature/TabSection/AboutTab"
import TeamTab from "@/components/feature/TabSection/TeamTab"
import CurriculumTab from "@/components/feature/TabSection/CurriculumTab"
import FacilitiesTab from "@/components/feature/TabSection/FacilitiesTab"
import {
  instructors,
  learningMethods,
  curriculum,
  facilities,
  tabs
} from "@/components/feature/TabSection/data"

export default function TabsSection() {
  const [activeTab, setActiveTab] = useState("about")

  return (
    <section className="py-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* ========== TABS NAVIGATION ========== */}
        <TabsNavigation 
          activeTab={activeTab} 
          setActiveTab={setActiveTab} 
          tabs={tabs}
        />

        {/* ========== TAB CONTENT ========== */}
        <div className="mt-12">
          
          {/* ========== ABOUT TAB ========== */}
          {activeTab === "about" && (
            <AboutTab learningMethods={learningMethods} />
          )}

          {/* ========== TEAM TAB ========== */}
          {activeTab === "team" && (
            <TeamTab instructors={instructors} />
          )}

          {/* ========== CURRICULUM TAB ========== */}
          {activeTab === "curriculum" && (
            <CurriculumTab curriculum={curriculum} />
          )}

          {/* ========== FACILITIES TAB ========== */}
          {activeTab === "facilities" && (
            <FacilitiesTab facilities={facilities} />
          )}
        </div>
      </div>
    </section>
  )
}