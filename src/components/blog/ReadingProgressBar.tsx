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
    // 修改为顶部进度条
    <div className="fixed left-0 top-0 right-0 h-2 bg-primary/20 z-50">
      <motion.div 
        className="absolute left-0 top-0 h-full bg-primary z-[51]"
        style={{ 
          width: `${progress}%`,
          originX: 0
        }}
        initial={{ width: "0%" }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 0.1 }}
      />
    </div>
  ) : null;
}; 