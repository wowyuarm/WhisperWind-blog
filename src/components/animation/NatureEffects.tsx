"use client"

import { motion } from "framer-motion";
import { useReducedMotion } from "./ReducedMotion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

// 飘落的叶子效果
export function FallingLeaves({ count = 10, className = "" }) {
  const prefersReducedMotion = useReducedMotion();
  
  if (prefersReducedMotion) return null; // 如果用户偏好减弱动画，则不显示这个效果
  
  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden z-0", className)}>
      {Array.from({ length: count }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-3 h-3 bg-primary/20 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `-10%`,
          }}
          animate={{
            y: ["0%", "100vh"],
            x: [
              `${0}px`,
              `${(Math.random() - 0.5) * 200}px`,
              `${(Math.random() - 0.5) * 300}px`,
              `${(Math.random() - 0.5) * 200}px`,
              `${(Math.random() - 0.5) * 300}px`,
            ],
            rotate: [0, 360 * (Math.random() > 0.5 ? 1 : -1)],
            opacity: [0, 0.2, 0.5, 0.2, 0],
            scale: [Math.random() * 0.5 + 0.3, Math.random() * 0.5 + 0.5],
          }}
          transition={{
            duration: Math.random() * 20 + 20,
            ease: "linear",
            repeat: Infinity,
            delay: Math.random() * 20,
          }}
        />
      ))}
    </div>
  );
}

// 轻微波纹效果
export function Ripple({ className = "" }) {
  const prefersReducedMotion = useReducedMotion();
  
  if (prefersReducedMotion) return null;
  
  return (
    <div className={cn("absolute inset-0 pointer-events-none overflow-hidden z-0", className)}>
      {Array.from({ length: 3 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-primary/10"
          style={{
            left: "50%",
            top: "50%",
            translateX: "-50%",
            translateY: "-50%",
          }}
          initial={{ width: 10, height: 10, opacity: 0 }}
          animate={{ 
            width: [10, 300 + i * 50], 
            height: [10, 300 + i * 50],
            opacity: [0, 0.1, 0]
          }}
          transition={{
            duration: 8,
            ease: "easeOut",
            repeat: Infinity,
            delay: i * 2.5,
          }}
        />
      ))}
    </div>
  );
}

// 微风吹过的效果
interface WindEffectProps {
  children: ReactNode;
  intensity?: "light" | "medium";
  direction?: "left" | "right";
  className?: string;
}

export function WindEffect({ 
  children, 
  intensity = "light", 
  direction = "right", 
  className = "" 
}: WindEffectProps) {
  const prefersReducedMotion = useReducedMotion();
  
  const intensityValues = {
    light: { skew: 1, y: 2 },
    medium: { skew: 2, y: 5 },
  };
  
  const directionMultiplier = direction === "right" ? 1 : -1;
  const { skew, y } = intensityValues[intensity];
  
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }
  
  return (
    <motion.div
      className={cn("relative", className)}
      animate={{
        skewX: [
          0,
          skew * directionMultiplier,
          0
        ],
        y: [0, -y, 0]
      }}
      transition={{
        duration: 8,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "mirror",
      }}
    >
      {children}
    </motion.div>
  );
} 