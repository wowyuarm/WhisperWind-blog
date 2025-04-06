"use client"

import React from "react"
import { motion } from "framer-motion"
import { Button, buttonVariants } from "./button"
import type { VariantProps } from "class-variance-authority"

// 优化的浮动按钮动画变体 - 性能更好
const floatVariants = {
  initial: { 
    y: 0,
    willChange: "transform"
  },
  animate: { 
    y: [-0.5, 0.5, -0.5], // 减小幅度，几乎不可察觉但仍有动感
    transition: {
      y: {
        repeat: Infinity,
        repeatType: "loop",
        duration: 4.5, // 稍微降低动画速率
        ease: "linear", // 线性缓动计算更轻量
      }
    }
  },
  hover: { 
    y: -2, // 减小悬停上移距离
    transition: { 
      duration: 0.15, // 更快的响应时间
    }
  }
}

type AnimatedButtonProps = React.ComponentProps<typeof Button> & {
  animationIntensity?: "none" | "subtle" | "medium"
}

export function AnimatedButton({
  className,
  variant,
  size,
  asChild = false,
  animationIntensity = "subtle",
  children,
  ...props
}: AnimatedButtonProps) {
  
  // 如果设置为无动画，直接返回普通按钮
  if (animationIntensity === "none") {
    return (
      <Button
        className={className}
        variant={variant}
        size={size}
        asChild={asChild}
        {...props}
      >
        {children}
      </Button>
    )
  }
  
  // 根据动画强度调整参数 - 降低强度差异减少性能压力
  const animationScale = animationIntensity === "medium" ? 1.25 : 1;
  const customVariants = {
    ...floatVariants,
    animate: { 
      y: [
        -0.5 * animationScale, 
        0.5 * animationScale, 
        -0.5 * animationScale
      ], 
      transition: floatVariants.animate.transition
    },
    hover: { 
      y: -2 * animationScale,
      transition: floatVariants.hover.transition
    }
  };

  // 使用Framer Motion的motion组件包装Button并启用硬件加速
  return (
    <motion.div
      initial="initial"
      animate="animate"
      whileHover="hover"
      variants={customVariants}
      className="inline-block will-change-transform"
      style={{
        transform: "translateZ(0)" // 强制硬件加速
      }}
    >
      <Button
        className={className}
        variant={variant}
        size={size}
        asChild={asChild}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  )
} 