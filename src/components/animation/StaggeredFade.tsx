"use client"

import { motion } from "framer-motion";
import { ReactNode } from "react";

interface StaggeredFadeProps {
  children: ReactNode;
  className?: string;
  delayOffset?: number; // 初始延迟（秒）
  stagger?: number; // 每个子元素之间的延迟（秒）
}

export function StaggeredFade({
  children,
  className = "",
  delayOffset = 0.1,
  stagger = 0.1,
}: StaggeredFadeProps) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: stagger,
        delayChildren: delayOffset,
      },
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      animate="show"
      exit="hidden"
    >
      {children}
    </motion.div>
  );
}

interface FadeItemProps {
  children: ReactNode;
  className?: string;
  duration?: number;
  y?: number; // Y轴偏移量，可设为0禁用上滑效果
}

export function FadeItem({
  children,
  className = "",
  duration = 0.5,
  y = 15,
}: FadeItemProps) {
  const item = {
    hidden: { opacity: 0, y: y },
    show: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: duration, 
        ease: [0.22, 1, 0.36, 1],
      } 
    },
  };

  return (
    <motion.div className={className} variants={item}>
      {children}
    </motion.div>
  );
} 