'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export const ReadingProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
    
    const updateProgressBar = () => {
      // 计算滚动进度 = 当前滚动位置 / (总高度 - 视口高度)
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const winHeight = window.innerHeight;
      const scrollPercent = scrollTop / (docHeight - winHeight);
      setProgress(Math.min(scrollPercent * 100, 100));
    };
    
    // 添加滚动事件监听器
    window.addEventListener('scroll', updateProgressBar);
    
    // 初始更新
    updateProgressBar();
    
    // 清理监听器
    return () => window.removeEventListener('scroll', updateProgressBar);
  }, [isClient]);
  
  return isClient ? (
    // 只保留右侧进度条
    <div className="fixed right-0 top-0 bottom-0 w-2 bg-primary/20 z-50">
      <motion.div 
        className="absolute right-0 top-0 w-full bg-primary z-[51]"
        style={{ 
          height: `${progress}%`,
          originY: 0
        }}
        initial={{ height: "0%" }}
        animate={{ height: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  ) : null;
}; 