// ========== DATA INSTRUCTORS ==========
export const instructors = [
    {
    id: 1,
    name: "Me",
    role: "Lead CAD Instructor",
    expertise: "AutoCAD, Revit, Fusion 360",
    experience: "8+ years",
    image: "AR",
    bio: "Professional CAD instructor with extensive experience in industrial design and architecture. Passionate about teaching practical CAD skills that students can apply directly in their careers.",
    email: "me@example.com",
    location: "Jakarta, Indonesia",
    certifications: [
      "Autodesk Certified Professional - AutoCAD",
      "Autodesk Certified Professional - Revit",
      "Certified SolidWorks Associate",
      "Professional Engineer License"
    ],
    workExperience: [
      "Senior CAD Instructor at Tech Academy (2020-Present)",
      "Lead Designer at ArchiDesign Studio (2016-2020)",
      "CAD Consultant at Engineering Solutions (2014-2016)",
      "Drafter at BuildCorp (2012-2014)"
    ],
    education: [
      "Master of Engineering in Industrial Design - University of Technology",
      "Bachelor of Architecture - Design Institute",
      "Certified CAD Specialist Program"
    ],
    specializations: ["3D Modeling", "Parametric Design", "Architectural Visualization", "MEP Design"],
    profilePhoto: "/images/auto.png" // Optional
  }
//   ,
//   {
//     name: "Sarah Wijaya",
//     role: "3D Modeling Expert",
//     expertise: "Fusion 360, Inventor",
//     experience: "6+ years",
//     image: "SW"
//   }
// ,
//   {
//     name: "Budi Santoso",
//     role: "Architecture Specialist",
//     expertise: "Revit Architecture",
//     experience: "10+ years",
//     image: "BS"
//   }
// ,
//   {
//     name: "Maya Putri",
//     role: "MEP Instructor",
//     expertise: "Plant 3D, Navisworks",
//     experience: "7+ years",
//     image: "MP"
//   }
]

// ========== DATA LEARNING METHODS ==========
export const learningMethods = [
  {
    icon: "Video",
    title: "Live Zoom",
    description: "Step-by-step learning in zoom with practical examples"
  },
  {
    icon: "Download",
    title: "Project Files",
    description: "Downloadable project files for hands-on practice"
  },
  {
    icon: "Settings",
    title: "Live Workshops",
    description: "Weekly live sessions with industry experts"
  },
  {
    icon: "BarChart",
    title: "Progress Tracking",
    description: "Monitor your learning journey with analytics"
  }
]

// ========== DATA CURRICULUM ==========
export const curriculum = [
  {
    level: "Beginner",
    courses: ["CAD Fundamentals", "2D Drawing Basics", "Interface Navigation"],
    duration: "4 weeks",
    projects: 3
  },
  {
    level: "Intermediate",
    courses: ["3D Modeling", "Parametric Design", "Assembly Creation"],
    duration: "6 weeks",
    projects: 5
  },
  {
    level: "Advanced",
    courses: ["Simulation", "Rendering", "Professional Workflows"],
    duration: "8 weeks",
    projects: 7
  }
]

// ========== DATA FACILITIES ==========
export const facilities = [
  "Access to All Autodesk Software",
  "24/7 Support from Instructors",
  "Project Portfolio Building",
  "Industry Certification Prep",
  "Job Placement Assistance",
  "Community Access"
]

// ========== TABS NAVIGATION ==========
export const tabs = [
  { id: "about", label: "About Us", icon: "Building" },
  { id: "team", label: "Instructor", icon: "Users" },
  { id: "curriculum", label: "Curriculum", icon: "BookOpen" },
  { id: "facilities", label: "Facilities", icon: "Award" }
]