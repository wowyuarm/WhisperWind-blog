"use client"

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface HoverCardProps {
  children: ReactNode;
  className?: string;
  hoverScale?: number;
  hoverY?: number;
  duration?: number;
}

export function HoverCard({
  children,
  className = "",
  hoverScale = 1.02,
  hoverY = -3,
  duration = 0.3,
}: HoverCardProps) {
  return (
    <motion.div
      className={cn("relative", className)}
      whileHover={{ 
        scale: hoverScale, 
        y: hoverY,
        transition: { duration: duration, ease: "easeOut" }
      }}
      transition={{ duration: duration * 1.2, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

interface FloatEffectProps {
  children: ReactNode;
  className?: string;
  floatY?: number;
  duration?: number;
  delay?: number;
}

export function FloatEffect({
  children,
  className = "",
  floatY = 5,
  duration = 4,
  delay = 0,
}: FloatEffectProps) {
  return (
    <motion.div
      className={cn("relative", className)}
      animate={{
        y: [-floatY/2, floatY/2, -floatY/2],
      }}
      transition={{
        duration: duration,
        ease: "easeInOut",
        repeat: Infinity,
        delay: delay,
      }}
    >
      {children}
    </motion.div>
  );
} 