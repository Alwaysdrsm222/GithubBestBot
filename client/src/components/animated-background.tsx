import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="fixed inset-0 -z-10">
      {/* Particle Background */}
      <div className="absolute inset-0 particle-bg opacity-50" />
      
      {/* Floating Hexagons */}
      <motion.div
        className="absolute top-20 left-10 w-20 h-20 hexagon bg-[hsl(var(--tiger-orange))]/30"
        animate={{
          y: [-20, 20, -20],
          rotate: [0, 360],
        }}
        transition={{
          y: {
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          },
          rotate: {
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      />
      
      <motion.div
        className="absolute bottom-20 right-10 w-16 h-16 hexagon bg-[hsl(var(--tiger-yellow))]/30"
        animate={{
          y: [20, -20, 20],
          rotate: [360, 0],
        }}
        transition={{
          y: {
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          },
          rotate: {
            duration: 25,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      />
      
      <motion.div
        className="absolute top-1/2 right-1/4 w-12 h-12 hexagon bg-[hsl(var(--light-orange))]/20"
        animate={{
          y: [-15, 15, -15],
          x: [-10, 10, -10],
          rotate: [0, 180, 360],
        }}
        transition={{
          y: {
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          },
          x: {
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          },
          rotate: {
            duration: 15,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      />
    </div>
  );
}
