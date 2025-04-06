"use client"

import { useEffect, useState } from "react";

export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    
    // 设置初始值
    setPrefersReducedMotion(mediaQuery.matches);
    
    // 监听偏好变化
    const handleChange = () => {
      setPrefersReducedMotion(mediaQuery.matches);
    };
    
    mediaQuery.addEventListener("change", handleChange);
    
    // 清理函数
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, []);

  return prefersReducedMotion;
}

// 用于调整动画参数的工具函数
export function getReducedMotionProps(prefersReducedMotion: boolean) {
  if (prefersReducedMotion) {
    return {
      transition: { duration: 0.1 },
      // 对于那些必须有的动画，我们可以大幅减少动画幅度和时长
      animate: { y: 0, opacity: 1 },
      exit: { opacity: 0 },
      initial: { opacity: 0 },
    };
  }
  
  // 如果用户没有要求减弱动画，则返回null，使用组件默认值
  return null;
} 