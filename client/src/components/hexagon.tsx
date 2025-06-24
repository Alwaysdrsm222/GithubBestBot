import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HexagonProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: "orange" | "yellow" | "light-orange" | "warm-yellow";
  className?: string;
  animate?: boolean;
  children?: React.ReactNode;
}

const sizeClasses = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-16 h-16",
  xl: "w-20 h-20",
};

const colorClasses = {
  orange: "bg-[hsl(var(--tiger-orange))]",
  yellow: "bg-[hsl(var(--tiger-yellow))]",
  "light-orange": "bg-[hsl(var(--light-orange))]",
  "warm-yellow": "bg-[hsl(var(--warm-yellow))]",
};

export default function Hexagon({ 
  size = "md", 
  color = "orange", 
  className, 
  animate = false,
  children 
}: HexagonProps) {
  const hexComponent = (
    <div 
      className={cn(
        "hexagon flex items-center justify-center",
        sizeClasses[size],
        colorClasses[color],
        className
      )}
    >
      {children}
    </div>
  );

  if (animate) {
    return (
      <motion.div
        animate={{
          y: [-5, 5, -5],
          rotate: [0, 360],
        }}
        transition={{
          y: {
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
          },
          rotate: {
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          },
        }}
      >
        {hexComponent}
      </motion.div>
    );
  }

  return hexComponent;
}
