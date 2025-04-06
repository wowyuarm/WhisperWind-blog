import Head from 'next/head';
import Link from 'next/link';
import React, { useState, useEffect, useRef } from 'react';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { getAllPostMetas } from '@/lib/content';
import { getSiteConfig, type SiteConfig } from '@/lib/config';
import { HeadMeta } from '@/components/layout/HeadMeta';

// 定义标签信息类型
interface TagInfo {
  name: string;
  count: number;
  // 圆形云布局的位置信息
  position?: {
    x: number;
    y: number;
    size: number;
  };
}

// 定义页面属性类型
interface TagsIndexPageProps {
  tags: TagInfo[];
  siteConfig: SiteConfig;
}

export const getStaticProps: GetStaticProps<TagsIndexPageProps> = async () => {
  try {
  const posts = getAllPostMetas();
    
    // 计算每个标签的文章数量
    const tagCounts: Record<string, number> = {};
    
    posts.forEach((post) => {
      if (post.tags && Array.isArray(post.tags)) {
        post.tags.forEach((tag) => {
          if (tag) {
            tagCounts[tag] = (tagCounts[tag] || 0) + 1;
          }
        });
      }
    });
    
    // 将标签计数转换为 TagInfo 数组
    const tags: TagInfo[] = Object.entries(tagCounts)
      .map(([name, count]) => ({ name, count }))
      .filter(tag => tag.name.trim() !== '') // 过滤空标签
      .sort((a, b) => b.count - a.count); // 按文章数量降序排序
    
  const siteConfig = getSiteConfig();

  return {
    props: {
      tags,
      siteConfig,
    },
  };
  } catch (error) {
    console.error('Error fetching tags:', error);
    return {
      props: {
        tags: [],
        siteConfig: getSiteConfig(),
      },
    };
  }
};

// 用于根据标签数量计算标签大小的函数
function getTagSize(count: number, maxCount: number): number {
  // 标签大小与文章数量成正比，但使用对数比例使差异不太极端
  const minSize = 0.65; // 减小最小尺寸
  const maxSize = 1.6; // 减小最大尺寸
  
  // 优化计算逻辑，使标签大小更均匀分布
  const normalizedCount = count / maxCount; // 标准化计数 (0-1范围)
  const logFactor = Math.log(normalizedCount * 9 + 1) / Math.log(10); // 对数缩放 (0-1范围)
  
  // 应用最小和最大大小限制
  return minSize + logFactor * (maxSize - minSize);
}

// 优化的标签位置计算函数
function calculateTagPositions(tags: TagInfo[], cloudRadius: number): Record<string, any> {
  // 没有标签时返回空对象
  if (tags.length === 0) return {};
  
  // 获取最大标签计数
  const maxCount = tags[0].count;
  
  // 创建保存所有标签位置的对象
  const positions: Record<string, any> = {};
  
  // 对标签进行深度克隆并按计数降序排序（确保高计数的标签先放置）
  const sortedTags = [...tags].sort((a, b) => b.count - a.count);
  
  // 记录已使用的位置，避免标签重叠
  const usedPositions: {x: number, y: number, radius: number}[] = [];
  
  // 设置中心标签
  if (sortedTags.length > 0) {
    const centerTag = sortedTags[0]; // 文章数量最多的标签
    const size = getTagSize(centerTag.count, maxCount);
    
    positions[centerTag.name] = {
      x: 0, // 正中心
      y: 0, // 正中心
      size: size,
      zOffset: 50, // 最高层级
      floatDelay: 0
    };
    
    // 记录中心标签的位置和大小
    const tagRadius = size * 1.6 * 16; // 减小标签半径换算倍数
    usedPositions.push({x: 0, y: 0, radius: tagRadius});
    
    // 移除中心标签，处理其余标签
    sortedTags.shift();
  }
  
  // 螺旋放置函数 - 根据标签数量从高到低，从中心向外螺旋放置
  const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // 黄金角
  let currentAngle = Math.random() * Math.PI * 2; // 随机起始角度
  let currentIndex = 1; // 跳过中心标签
  
  // 处理剩余标签
  sortedTags.forEach((tag, index) => {
    const size = getTagSize(tag.count, maxCount);
    const tagRadius = size * 1.6 * 16; // 减小标签半径换算倍数
    
    // 标签应该放置的距离中心的距离，与文章数量成反比
    // 文章数量越多，越靠近中心
    const normalizedCount = tag.count / maxCount;
    // 这里使用平方根函数使分布更加均匀
    const distanceRatio = Math.sqrt(1 - normalizedCount);
    
    // 初始放置距离（根据tag在排序后的位置）
    // 减小基础距离，使整体更紧凑
    let distance = cloudRadius * 0.15 + distanceRatio * cloudRadius * 0.65;
    
    // 增加角度变化，分散相同数量的标签
    const angleStep = goldenAngle + (index % 3) * 0.1;
    currentAngle += angleStep;
    
    // 寻找可放置的位置
    let validPosition = false;
    let attempts = 0;
    let x = 0, y = 0;
    
    // 尝试找到不重叠的位置
    while (!validPosition && attempts < 50) {
      // 计算基于当前角度和距离的位置
      x = Math.cos(currentAngle) * distance;
      y = Math.sin(currentAngle) * distance;
      
      // 检查与已放置标签的距离
      validPosition = true;
      for (const pos of usedPositions) {
        const dx = x - pos.x;
        const dy = y - pos.y;
        const minDistance = tagRadius + pos.radius + 3; // 减小额外间距
        const actualDistance = Math.sqrt(dx*dx + dy*dy);
        
        if (actualDistance < minDistance) {
          validPosition = false;
          break;
        }
      }
      
      // 如果位置无效，稍微调整角度和距离
      if (!validPosition) {
        currentAngle += 0.2; // 微调角度
        distance += 5; // 稍微增加距离
        attempts++;
      }
    }
    
    // 添加位置
    positions[tag.name] = {
      x: x,
      y: y,
      size: size,
      zOffset: 40 - currentIndex, // 确保高计数标签显示在上层
      floatDelay: currentIndex
    };
    
    // 记录已使用的位置
    usedPositions.push({x, y, radius: tagRadius});
    currentIndex++;
  });
  
  return positions;
}

// 生成云朵SVG路径
function generateCloudPath(): string {
  // 生成随机的云朵路径
  const centerX = 50;
  const centerY = 40;
  const radius = 25 + Math.random() * 10;
  
  // 创建基本的云朵形状
  let path = `M${centerX - radius * 0.8},${centerY} `;
  
  // 添加几个圆形突起来创建云朵效果
  const bumps = 5 + Math.floor(Math.random() * 3);
  const angleStep = (2 * Math.PI) / bumps;
  
  for (let i = 0; i < bumps; i++) {
    const angle = i * angleStep;
    const bumpRadius = radius * (0.7 + Math.random() * 0.3);
    const x = centerX + Math.cos(angle) * bumpRadius;
    const y = centerY + Math.sin(angle) * bumpRadius * 0.6;
    
    path += `Q${centerX + Math.cos(angle + angleStep/2) * bumpRadius * 1.2},`
    path += `${centerY + Math.sin(angle + angleStep/2) * bumpRadius * 0.8} `
    path += `${x},${y} `;
  }
  
  // 闭合路径
  path += 'Z';
  return path;
}

// 设置不显示页脚
TagsIndexPage.showFooter = false;

export default function TagsIndexPage({ 
  tags,
  siteConfig
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [cloudRadius, setCloudRadius] = useState(180);
  const [windowWidth, setWindowWidth] = useState(0);
  const [tagPositions, setTagPositions] = useState<Record<string, any>>({});
  const cloudContainerRef = useRef<HTMLDivElement>(null);
  const [cloudPaths, setCloudPaths] = useState<string[]>([]);
  
  // 定义标签动画
  const tagVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: (i: number) => ({ 
      opacity: 1, 
      scale: 1,
      transition: { 
        delay: i * 0.05, 
        duration: 0.6,
        type: "spring",
        stiffness: 50,
        damping: 8
      }
    }),
    hover: { 
      scale: 1.1,
      filter: "drop-shadow(0px 5px 15px rgba(0, 0, 0, 0.1))",
      transition: { duration: 0.3 }
    }
  };
  
  // 浮动动画设置 - 仅保留位置变化，移除透明度变化
  const floatVariants = {
    float: (i: number) => ({
      y: [0, i % 2 === 0 ? -3 : -5, 0],
      x: [0, i % 2 === 0 ? 2 : -2, 0],
      transition: {
        repeat: Infinity,
        repeatType: "reverse" as const,
        duration: 3 + (i % 4),
        ease: "easeInOut",
        delay: i * 0.2 % 2
      }
    })
  };
  
  // 云朵背景动画 - 保持静态透明度，只移动位置
  const cloudVariants = {
    initial: (i: number) => ({
      opacity: 0.06,
      x: -20,
      y: -10 + Math.random() * 20
    }),
    animate: (i: number) => ({
      opacity: 0.06,
      x: 20,
      y: -10 + Math.random() * 20,
      transition: {
        duration: 30 + Math.random() * 40,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "linear",
        delay: i * 2
      }
    })
  };
  
  // 生成装饰云朵
  useEffect(() => {
    const paths = Array.from({ length: 5 }, () => generateCloudPath());
    setCloudPaths(paths);
  }, []);
  
  // 计算和调整云大小
  useEffect(() => {
    const handleResize = () => {
      // 更新窗口宽度状态
      setWindowWidth(window.innerWidth);
      
      // 获取云容器的尺寸
      if (cloudContainerRef.current) {
        const containerWidth = cloudContainerRef.current.clientWidth;
        const containerHeight = Math.max(window.innerHeight * 0.6, 500);
        
        // 设置云半径 - 减小半径比例
        const radius = Math.min(containerWidth, containerHeight) * 0.36;
        setCloudRadius(radius);
      }
    };
    
    // 初始加载和调整窗口大小时计算
    window.addEventListener('resize', handleResize);
    // 初始计算
    handleResize();
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  // 使用优化的算法计算标签位置
  useEffect(() => {
    if (cloudContainerRef.current && windowWidth > 0 && tags.length > 0) {
      // 使用新的算法计算所有标签位置
      const positions = calculateTagPositions(tags, cloudRadius);
      setTagPositions(positions);
    }
  }, [tags, cloudRadius, windowWidth]);
  
  return (
    <>
      <HeadMeta 
        title="标签" 
        description="WhisperWind Blog的文章标签" 
        siteConfig={siteConfig} 
      />
      
      <div 
        ref={cloudContainerRef}
        className="relative min-h-[calc(100vh-8rem)] flex items-center justify-center py-6 md:py-10"
      >
        {/* 装饰云朵背景 */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
          {cloudPaths.map((path, i) => (
            <motion.svg
              key={i}
              className="absolute"
              width="200"
              height="120"
              viewBox="0 0 100 80"
              style={{
                top: `${10 + Math.random() * 70}%`,
                left: `${Math.random() * 70}%`,
                width: `${150 + Math.random() * 100}px`,
                height: `${100 + Math.random() * 60}px`,
              }}
              custom={i}
              variants={cloudVariants}
              initial="initial"
              animate="animate"
            >
              <path
                d={path}
                fill="currentColor"
                className="text-primary/10"
              />
            </motion.svg>
          ))}
        </div>

        <div 
          className="absolute inset-0 flex items-center justify-center" 
          style={{ perspective: 1000 }}
        >
          {tags.map((tag, index) => {
            const position = tagPositions[tag.name] || { x: 0, y: 0, size: 1, zOffset: 0, floatDelay: index };
            const size = position.size;
            
            return (
              <motion.div
                key={tag.name}
                className="absolute transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `calc(50% + ${position.x}px)`,
                  top: `calc(50% + ${position.y}px)`,
                  zIndex: Math.floor(10 + position.zOffset),
                  transform: `translate(-50%, -50%) translateZ(${position.zOffset}px)`
                }}
                custom={position.floatDelay}
                initial="hidden"
                animate={["visible", "float"]}
                variants={{
                  ...tagVariants,
                  ...floatVariants
                }}
                whileHover="hover"
              >
                <Link href={`/tags/${tag.name}/`} className="block">
                  <motion.div className={cn(
                    "flex items-center justify-center rounded-full cursor-pointer transition-all",
                    "bg-warm-paper border border-primary/20 hover:border-primary/50",
                    "shadow-sm overflow-hidden relative"
                  )}
                  style={{
                    width: `${3.2 * size}rem`, // 减小标签尺寸
                    height: `${3.2 * size}rem`, // 减小标签尺寸
                    minWidth: "3rem", // 减小最小宽度
                    minHeight: "3rem" // 减小最小高度
                  }}
                  whileHover={{ 
                    backgroundColor: "rgba(var(--primary-rgb), 0.08)",
                    transition: { duration: 0.2 }
                  }}
                  >
                    {/* 内容区域 */}
                    <div className="text-center px-2 relative z-10">
                      <div className="font-medium text-sm">{tag.name}</div> {/* 减小字体大小 */}
                      <div className="text-xs text-muted-foreground mt-0.5">{tag.count} 篇</div> {/* 减小上边距 */}
                    </div>
                  </motion.div>
              </Link>
              </motion.div>
            );
          })}
          </div>
      </div>
    </>
  );
} 