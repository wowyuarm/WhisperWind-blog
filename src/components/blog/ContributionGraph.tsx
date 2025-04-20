"use client"

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { PostMeta } from '@/lib/content';

interface ContributionGraphProps {
  posts: PostMeta[];
  className?: string;
}

// 定义半年的日期范围，基于最新文章而非当前日期
const getDateRange = (posts: PostMeta[]) => {
  let latestPostDate = new Date();
  if (posts && posts.length > 0) {
    const sortedPosts = [...posts].sort((a, b) => 
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
    );
    latestPostDate = new Date(sortedPosts[0].publishDate);
  }
  
  // 计算最新文章的月份和年份
  const latestMonth = latestPostDate.getMonth();
  const latestYear = latestPostDate.getFullYear();
  
  // 将结束日期设置为最新文章所在月份的下一个月的最后一天
  const endDate = new Date(latestYear, latestMonth + 2, 0); // next month's last day
  
  // 开始日期设置为结束日期往前推5个月的第一天
  const startDate = new Date(latestYear, latestMonth + 2 - 6, 1); // 6 months before end date
  
  // 将开始日期调整为周日，以匹配GitHub的周对齐
  const startDay = startDate.getDay();
  if (startDay > 0) { // 如果不是周日，调整到前一个周日
    startDate.setDate(startDate.getDate() - startDay);
  }

  return { startDate, endDate };
};

// 将日期格式化为 'YYYY-MM-DD' 格式
const formatDate = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// 生成竖向（GitHub风格）的日期网格数据
const generateVerticalGrid = (posts: PostMeta[]) => {
  const { startDate, endDate } = getDateRange(posts);
  const verticalGrid: (Date | null)[][] = []; // 外层数组是周，内层数组是天 (0-6)
  const numWeeks = Math.ceil((endDate.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000));

  for (let i = 0; i < numWeeks; i++) {
    verticalGrid.push(new Array(7).fill(null));
  }

  const currentDate = new Date(startDate);
  while (currentDate <= endDate) {
    const weekIndex = Math.floor((currentDate.getTime() - startDate.getTime()) / (7 * 24 * 60 * 60 * 1000));
    const dayOfWeek = currentDate.getDay(); // 0 = Sunday, 6 = Saturday

    if (weekIndex >= 0 && weekIndex < verticalGrid.length) {
      verticalGrid[weekIndex][dayOfWeek] = new Date(currentDate);
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  return verticalGrid;
};

export function ContributionGraph({ posts, className = "" }: ContributionGraphProps) {
  const [contributionData, setContributionData] = useState<Record<string, number>>({});
  const [verticalGrid, setVerticalGrid] = useState<(Date | null)[][]>([]);
  const [months, setMonths] = useState<{label: string, startColumnIndex: number}[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  
  // 计算贡献数据和网格
  useEffect(() => {
    const gridData = generateVerticalGrid(posts);
    setVerticalGrid(gridData);
    
    // --- 计算月份标签 --- 
    const monthLabels: {label: string, startColumnIndex: number}[] = [];
    let currentMonth = -1;
    let currentYear = -1;

    // 遍历每一列（一周）的日期
    gridData.forEach((week, weekIndex) => {
      // 找到本周中第一个有效日期
      const firstValidDay = week.find(d => d !== null);
      if (firstValidDay) {
        const month = firstValidDay.getMonth();
        const year = firstValidDay.getFullYear();
        
        // 如果是新的一个月，添加标签
        if (currentMonth !== month || currentYear !== year) {
          // 添加新月份的标签
          monthLabels.push({
            label: new Intl.DateTimeFormat('zh-CN', { month: 'short' }).format(firstValidDay),
            startColumnIndex: weekIndex
          });
          
          currentMonth = month;
          currentYear = year;
        }
      }
    });
    
    setMonths(monthLabels);
    
    // --- 计算贡献数量 --- 
    const contributions: Record<string, number> = {};
    let max = 0;
    posts.forEach(post => {
      const date = post.publishDate.split('T')[0];
      contributions[date] = (contributions[date] || 0) + 1;
      max = Math.max(max, contributions[date]);
    });
    setContributionData(contributions);
    
    setTimeout(() => setIsVisible(true), 300);
  }, [posts]);
  
  // 获取每个方格的提示信息
  const getTooltip = (date: Date): string => {
    const dateStr = formatDate(date);
    const count = contributionData[dateStr] || 0;
    const formattedDate = new Intl.DateTimeFormat('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }).format(date);
    return count === 0 ? `${formattedDate}: 无贡献` : `${formattedDate}: ${count} 次贡献`;
  };
  
  // 根据贡献的内联样式
  const getSquareStyle = (date: Date | null) => {
    if (!date) return { backgroundColor: 'transparent' }; // 空白格子
    
    const dateStr = formatDate(date);
    const count = contributionData[dateStr] || 0;
    
    if (count === 0) {
      return { backgroundColor: 'rgba(231, 229, 228, 0.3)' }; // 无贡献颜色
    }
    return { backgroundColor: 'var(--color-primary)' }; // 有贡献颜色
  };
  
  const squareSize = 14; // 减小方格尺寸，使其更紧凑 (w-3.5)
  const gap = 3;  // 减小间距，使其更紧凑

  return (
    <div className={`${className}`}>
      <motion.div 
        className="w-full flex justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="relative py-4">
          {/* 月份标签 - 优化定位 */}
          <div className="relative h-5 mb-2">
            {months.map((month, i) => {
              // 计算月份标签的位置偏移
              const leftPosition = month.startColumnIndex * (squareSize + gap);
              return (
                <div
                  key={i}
                  className="absolute top-0 text-xs text-muted-foreground whitespace-nowrap"
                  style={{ left: `${leftPosition}px` }}
                >
                  {month.label}
                </div>
              );
            })}
          </div>

          {/* 贡献网格 */}
          <div className="grid grid-flow-col auto-cols-max gap-[3px]">
            {verticalGrid.map((week, weekIndex) => (
              <div key={weekIndex} className="grid grid-rows-7 gap-[3px]">
                {week.map((date, dayIndex) => (
                  <motion.div
                    key={`${weekIndex}-${dayIndex}`}
                    className="w-3.5 h-3.5 rounded-sm hover:ring-1 hover:ring-primary/50 transition-all duration-200"
                    style={getSquareStyle(date)}
                    title={date ? getTooltip(date) : undefined}
                    initial={{ scale: 0 }}
                    animate={{ scale: isVisible ? 1 : 0 }}
                    transition={{
                      duration: 0.3,
                      delay: (weekIndex * 7 + dayIndex) * 0.005
                    }}
                    whileHover={{
                      scale: date ? 1.3 : 1,
                      transition: { duration: 0.2 }
                    }}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
