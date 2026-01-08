import { motion } from "framer-motion"

interface BackgroundAnimationProps {
  isMounted: boolean
}

export default function BackgroundAnimation({ isMounted }: BackgroundAnimationProps) {
  return (
    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
      {isMounted && [...Array(10)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute h-[1px] bg-gradient-to-r from-transparent via-[#FF6C37]/20 to-transparent"
          initial={{ x: "-100%", y: `${Math.random() * 100}%` }}
          animate={{ x: "200%" }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            delay: Math.random() * 5
          }}
          style={{
            width: `${Math.random() * 100 + 50}px`,
            top: `${Math.random() * 100}%`,
          }}
        />
      ))}
    </div>
  )
}