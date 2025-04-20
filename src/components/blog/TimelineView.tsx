"use client"

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PostMeta } from '@/lib/content';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';

interface TimelineViewProps {
  posts: PostMeta[];
  className?: string;
  title?: string;
}

type PostsByMonth = {
  [key: string]: {
    month: string;
    year: number;
    posts: PostMeta[];
  };
};

export function TimelineView({ posts, className = "", title = "足迹" }: TimelineViewProps) {
  // 按月份组织文章
  const [postsByMonth, setPostsByMonth] = useState<PostsByMonth>({});
  const [expandedMonths, setExpandedMonths] = useState<Set<string>>(new Set());
  const [sortedMonthKeys, setSortedMonthKeys] = useState<string[]>([]);
  const [activePostIndex, setActivePostIndex] = useState<string | null>(null);
  
  const toggleMonth = (monthKey: string) => {
    const newExpandedMonths = new Set(expandedMonths);
    if (newExpandedMonths.has(monthKey)) {
      newExpandedMonths.delete(monthKey);
    } else {
      newExpandedMonths.add(monthKey);
    }
    setExpandedMonths(newExpandedMonths);
  };

  const togglePostPreview = (postId: string) => {
    if (activePostIndex === postId) {
      setActivePostIndex(null);
    } else {
      setActivePostIndex(postId);
    }
  };
  
  // 初始化按月份组织的文章
  useEffect(() => {
    const byMonth: PostsByMonth = {};
    
    posts.forEach(post => {
      const date = new Date(post.publishDate);
      const year = date.getFullYear();
      const month = date.getMonth();
      const monthKey = `${year}-${month.toString().padStart(2, '0')}`;
      
      if (!byMonth[monthKey]) {
        byMonth[monthKey] = {
          month: new Intl.DateTimeFormat('zh-CN', { month: 'long' }).format(date),
          year,
          posts: []
        };
      }
      
      byMonth[monthKey].posts.push(post);
    });
    
    // 对每个月内的文章按日期排序（从新到旧）
    Object.keys(byMonth).forEach(monthKey => {
      byMonth[monthKey].posts.sort((a, b) => 
        new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
      );
    });
    
    // 对月份键按时间排序（从新到旧）
    const sortedKeys = Object.keys(byMonth).sort((a, b) => b.localeCompare(a));
    
    setPostsByMonth(byMonth);
    setSortedMonthKeys(sortedKeys);
  }, [posts]);
  
  // 每月的点的颜色，按季节变化
  const getMonthDotColor = (monthKey: string): string => {
    const month = parseInt(monthKey.split('-')[1]);
    
    // 基于月份选择颜色（春夏秋冬），使用更柔和的色调
    if (month >= 2 && month <= 4) { // 春季（3-5月）
      return 'bg-gradient-to-br from-pink-200/80 to-pink-300/80'; // 柔和樱花色
    } else if (month >= 5 && month <= 7) { // 夏季（6-8月）
      return 'bg-gradient-to-br from-green-200/80 to-green-300/80'; // 柔和翠绿色
    } else if (month >= 8 && month <= 10) { // 秋季（9-11月）
      return 'bg-gradient-to-br from-amber-200/80 to-amber-300/80'; // 柔和金色
    } else { // 冬季（12-2月）
      return 'bg-gradient-to-br from-blue-100/80 to-blue-200/80'; // 柔和蓝色
    }
  };
  
  // 季节相关的装饰元素
  const getSeasonDecoration = (monthKey: string) => {
    const month = parseInt(monthKey.split('-')[1]);
    
    if (month >= 2 && month <= 4) { // 春季
      return (
        <svg 
          className="absolute right-0 top-1/3 w-10 h-10 text-pink-100 opacity-20"
          viewBox="0 0 100 100" 
          fill="currentColor"
        >
          <path d="M50,0 C60,20 80,30 100,30 C80,40 60,60 60,100 C50,80 20,60 0,70 C20,60 40,30 50,0 Z" />
        </svg>
      );
    } else if (month >= 5 && month <= 7) { // 夏季
      return (
        <svg 
          className="absolute right-0 top-1/3 w-10 h-10 text-green-100 opacity-20" 
          viewBox="0 0 100 100" 
          fill="currentColor"
        >
          <circle cx="50" cy="50" r="40" />
          <path d="M50,10 C55,25 75,25 90,50 C75,75 55,75 50,90 C45,75 25,75 10,50 C25,25 45,25 50,10 Z" />
        </svg>
      );
    } else if (month >= 8 && month <= 10) { // 秋季
      return (
        <svg 
          className="absolute right-0 top-1/3 w-10 h-10 text-amber-100 opacity-20" 
          viewBox="0 0 100 100" 
          fill="currentColor"
        >
          <path d="M30,10 C50,10 70,30 70,50 C70,70 50,90 30,90 C10,90 10,70 10,50 C10,30 10,10 30,10 Z" />
          <path d="M85,20 C90,30 90,45 80,55 C70,65 55,65 45,60 C40,55 40,40 50,30 C60,20 75,20 85,20 Z" />
        </svg>
      );
    } else { // 冬季
      return (
        <svg 
          className="absolute right-0 top-1/3 w-10 h-10 text-blue-100 opacity-20" 
          viewBox="0 0 100 100" 
          fill="currentColor"
        >
          <path d="M50,0 L53,47 L100,50 L53,53 L50,100 L47,53 L0,50 L47,47 Z" />
        </svg>
      );
    }
  };
  
  // 定义动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0 }
  };
  
  return (
    <div className={`${className}`}>
      {title && (
        <h2 className="text-2xl font-bold mb-6 text-primary/90 pl-12">{title}</h2>
      )}
      <motion.div
        className="max-w-3xl mx-auto relative"
        variants={containerVariants}
        initial="hidden"
        animate="show"
      >
        {/* 主时间线 */}
        <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/40 via-primary/30 to-primary/20 opacity-20"></div>
        
        {sortedMonthKeys.map((monthKey, index) => {
          const { month, year, posts: monthPosts } = postsByMonth[monthKey];
          const isExpanded = expandedMonths.has(monthKey);
          const displayPosts = isExpanded ? monthPosts : monthPosts.slice(0, 10);
          const hasMorePosts = monthPosts.length > 10;
          
          return (
            <motion.div 
              key={monthKey}
              className="mb-14 relative"
              variants={itemVariants}
            >
              {/* 季节性装饰 */}
              {getSeasonDecoration(monthKey)}
              
              {/* 月份标题 */}
              <motion.div 
                className="flex items-center mb-5"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.2 }}
              >
                {/* 月份指示图标 */}
                <div className={`w-8 h-8 rounded-full shadow-sm ${getMonthDotColor(monthKey)} flex items-center justify-center text-white z-10 relative overflow-hidden`}>
                  <span className="text-sm font-medium">{month.charAt(0)}</span>
                  {/* 装饰性波浪效果 */}
                  <motion.div 
                    className="absolute inset-0 bg-white opacity-5"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.05, 0.1, 0.05]
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  />
                </div>
                
                {/* 年月标题 */}
                <div className="ml-4">
                  <h3 className="text-lg font-medium text-primary/90">{`${year}年`}</h3>
                  <p className="text-sm text-muted-foreground -mt-1">{month}</p>
                </div>
              </motion.div>
              
              {/* 文章列表 */}
              <div className="ml-4 relative">
                {/* 列表左侧月度连接线 */}
                <div className="absolute left-0 top-0 bottom-0 ml-[0.1rem] w-[2px] bg-primary/5 rounded-full"
                  style={{
                    backgroundImage: 'linear-gradient(to bottom, transparent, var(--color-primary-100), transparent)',
                    opacity: 0.3
                  }}
                ></div>
                
                <div className="pl-8">
                  <AnimatePresence>
                    {displayPosts.map((post, i) => (
                      <motion.div 
                        key={post.slug}
                        className="mb-4 relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ 
                          duration: 0.2, 
                          delay: i * 0.05
                        }}
                      >
                        {/* 日期指示点 - 现在可点击 */}
                        <button
                          onClick={() => togglePostPreview(post.slug)}
                          className="absolute left-[-28px] top-1.5 flex items-center justify-center w-6 h-6 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all z-10"
                          aria-label={`显示《${post.title}》的简介`}
                        >
                          <div className="w-4 h-4 rounded-full bg-primary/10 border-2 border-primary/20 shadow-sm"></div>
                          {/* 悬停和激活时的装饰效果 */}
                          <motion.div 
                            className="absolute w-6 h-6 rounded-full bg-primary/20 opacity-0"
                            initial={{ scale: 0 }}
                            animate={{ 
                              scale: activePostIndex === post.slug ? 1 : 0,
                              opacity: activePostIndex === post.slug ? 0.8 : 0
                            }}
                            whileHover={{ 
                              scale: 1,
                              opacity: 0.5
                            }}
                          />
                        </button>
                        
                        {/* 文章链接 */}
                        <div className="group hover:bg-white/40 hover:backdrop-blur-sm px-3 py-2 -mx-3 rounded-md transition-all duration-200">
                          <div className="flex items-baseline">
                            <span className="text-sm text-muted-foreground mr-2 bg-primary/5 px-2 py-0.5 rounded">
                              {formatDate(post.publishDate).split(' ')[0]}
                            </span>
                            <Link 
                              href={`/posts/${post.slug}`}
                              className="text-foreground hover:text-primary transition-colors duration-200"
                            >
                              <span className="text-base font-medium line-clamp-1">{post.title}</span>
                            </Link>
                          </div>
                          
                          {/* 文章摘要 - 现在在点击白点时显示 */}
                          {post.excerpt && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ 
                                height: activePostIndex === post.slug ? 'auto' : 0,
                                opacity: activePostIndex === post.slug ? 1 : 0,
                              }}
                              transition={{ duration: 0.2 }}
                              className="text-sm text-muted-foreground mt-1 pl-7 overflow-hidden bg-white/30 rounded-md p-2"
                            >
                              <p>{post.excerpt}</p>
                            </motion.div>
                          )}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                  
                  {/* "更多文章"提示 */}
                  {hasMorePosts && (
                    <motion.div 
                      className="text-center my-4"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                    >
                      <button
                        onClick={() => toggleMonth(monthKey)}
                        className="text-sm bg-white/40 hover:bg-white/60 transition-colors px-4 py-1.5 rounded-full text-primary shadow-sm flex items-center mx-auto border border-primary/10 z-20 relative"
                      >
                        {isExpanded ? (
                          <>
                            <span>收起内容</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                              <polyline points="18 15 12 9 6 15"></polyline>
                            </svg>
                          </>
                        ) : (
                          <>
                            <span>查看全部 {monthPosts.length} 篇文章</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                              <polyline points="6 9 12 15 18 9"></polyline>
                            </svg>
                          </>
                        )}
                      </button>
                    </motion.div>
                  )}
                  
                </div>
              </div>
              
              {/* 如果不是最后一个月，添加装饰性云朵 */}
              {index < sortedMonthKeys.length - 1 && (
                <motion.div 
                  className="absolute left-4 -bottom-7 -ml-4 opacity-35"
                  animate={{ 
                    y: [0, -3, 0],
                    rotate: [0, 1, 0]
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <svg width="25" height="15" viewBox="0 0 25 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.5 10C2.5 7.79086 4.29086 6 6.5 6C8.70914 6 10.5 7.79086 10.5 10H2.5Z" fill="currentColor" fillOpacity="0.8"/>
                    <path d="M8.5 8C8.5 5.79086 10.2909 4 12.5 4C14.7091 4 16.5 5.79086 16.5 8H8.5Z" fill="currentColor" fillOpacity="0.8"/>
                    <path d="M14.5 10C14.5 7.79086 16.2909 6 18.5 6C20.7091 6 22.5 7.79086 22.5 10H14.5Z" fill="currentColor" fillOpacity="0.8"/>
                  </svg>
                </motion.div>
              )}
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
} 
