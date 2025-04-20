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

// 定义标签位置信息的接口
interface TagPosition {
  x: number;
  y: number;
  size: number;
  zOffset: number;
  floatDelay: number;
  rotation?: number;
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

// 优化标签大小计算函数
function getTagSize(count: number, maxCount: number): number {
  const minSize = 0.9; // 最小尺寸
  const maxSize = 2.0; // 稍微增大最大尺寸，增强差异感
  
  // 使用更平滑的比例计算
  const normalizedCount = count / maxCount;
  // 使用平方根函数使差异更明显但不过分
  const sizeFactor = Math.pow(normalizedCount, 0.55); // 稍微调整指数，增强层次感
  
  return minSize + (sizeFactor * (maxSize - minSize));
}

// 优化的标签位置计算函数 - 更自然的分布
function calculateTagPositions(tags: TagInfo[], cloudRadius: number): Record<string, TagPosition> {
  if (tags.length === 0) return {};
  
  const maxCount = Math.max(...tags.map(tag => tag.count));
  const positions: Record<string, TagPosition> = {};
  const usedPositions: {x: number, y: number, radius: number}[] = [];
  let currentIndex = 1;
  
  // 按文章数量排序
  const sortedTags = [...tags].sort((a, b) => b.count - a.count);
  
  // 处理中心标签
  if (sortedTags.length > 0) {
    const centerTag = sortedTags[0];
    const size = getTagSize(centerTag.count, maxCount);
    positions[centerTag.name] = {
      x: 0,
      y: 0,
      size,
      zOffset: 50,
      floatDelay: 0,
      // 中心标签保持无旋转
      rotation: 0
    };
    
    usedPositions.push({
      x: 0,
      y: 0,
      radius: size * 1.8 * 16 // 保护半径
    });
  }
  
  // 更自然的分布，使用均匀随机+冲突检测
  const restTags = sortedTags.slice(1);
  
  // 根据标签大小分组，但不严格分层
  restTags.forEach((tag) => {
    const size = getTagSize(tag.count, maxCount);
    const tagImportance = tag.count / maxCount;
    
    // 只保留旋转，移除形状变化
    // 根据重要性调整旋转角度 - 重要标签旋转更小
    const rotation = (Math.random() * 6 - 3) * (1 - tagImportance * 0.7);
    
    const tagRadius = size * 1.8 * 16;
    
    // 关键变化：使用更自然的分布方法
    // 根据标签重要性决定分布半径范围
    // 更重要的标签（文章数量多）更靠近中心，但带有随机性
    const distanceFactor = 0.8 - (tagImportance * 0.5) + (Math.random() * 0.3); // 0.3-0.8 + 随机性
    const baseDistance = cloudRadius * distanceFactor;
    
    // 寻找可用位置
    let validPosition = false;
    let attempts = 0;
    let x = 0, y = 0;
    let bestX = 0, bestY = 0, bestDistance = Infinity;
    
    while (!validPosition && attempts < 50) {
      // 完全随机的角度，不遵循螺旋
      const angle = Math.random() * Math.PI * 2;
      
      // 带随机性的距离，不严格遵循重要性
      const randomDistanceFactor = 0.8 + Math.random() * 0.4; // 0.8-1.2的随机系数
      const distance = baseDistance * randomDistanceFactor * (1 + attempts * 0.01);
      
      x = Math.cos(angle) * distance;
      y = Math.sin(angle) * distance;
      
      validPosition = true;
      
      // 检查是否与已有标签重叠
      for (const pos of usedPositions) {
        const dx = x - pos.x;
        const dy = y - pos.y;
        const minDistance = tagRadius + pos.radius + 15;
        const actualDistance = Math.sqrt(dx*dx + dy*dy);
        
        if (actualDistance < minDistance) {
          validPosition = false;
          if (actualDistance > bestDistance) {
            bestDistance = actualDistance;
            bestX = x;
            bestY = y;
          }
          break;
        }
      }
      
      attempts++;
    }
    
    if (!validPosition && bestDistance < Infinity) {
      x = bestX;
      y = bestY;
    }
    
    positions[tag.name] = {
      x,
      y,
      size,
      zOffset: 40 - Math.floor((currentIndex / tags.length) * 30),
      floatDelay: currentIndex * 0.1,
      rotation
    };
    
    usedPositions.push({x, y, radius: tagRadius});
    currentIndex++;
  });
  
  return positions;
}

// 优化的云朵SVG路径生成函数
function generateCloudPath(): string {
  const centerX = 50;
  const centerY = 40;
  const radius = 20 + Math.random() * 8; // 减小云朵大小
  
  let path = `M${centerX - radius * 0.8},${centerY} `;
  
  const bumps = 4 + Math.floor(Math.random() * 3); // 减少突起数量
  const angleStep = (2 * Math.PI) / bumps;
  
  for (let i = 0; i < bumps; i++) {
    const angle = i * angleStep;
    const bumpRadius = radius * (0.8 + Math.random() * 0.2); // 更均匀的突起
    const x = centerX + Math.cos(angle) * bumpRadius;
    const y = centerY + Math.sin(angle) * bumpRadius * 0.7;
    
    path += `Q${centerX + Math.cos(angle + angleStep/2) * bumpRadius * 1.1},`
    path += `${centerY + Math.sin(angle + angleStep/2) * bumpRadius * 0.7} `
    path += `${x},${y} `;
  }
  
  path += 'Z';
  return path;
}

// 优化纹理效果，使用更简单可靠的方式
const paperTextureCSS = `
  linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
  linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px),
  linear-gradient(rgba(0, 0, 0, 0.01) 1px, transparent 1px),
  linear-gradient(90deg, rgba(0, 0, 0, 0.01) 1px, transparent 1px)
`;

// 优化浮动动画，根据标签大小调整动画特性
const floatVariants = {
  float: (customData: { delay: number, importance: number }) => {
    // 重要性越高，动画越微妙；重要性越低，动画越活泼
    const { delay, importance } = customData;
    const magnitude = 1 - Math.min(0.8, importance); // 振幅系数，越小越重要，振幅越小
    
    return {
      y: [0, -3 * magnitude, 0],
      x: [0, (delay % 2 === 0 ? 1 : -1) * magnitude * 2, 0],
      rotate: [0, (delay % 2 === 0 ? 0.4 : -0.4) * magnitude, 0],
      transition: {
        repeat: Infinity,
        repeatType: "reverse" as const,
        duration: 4 + (3 * importance), // 重要标签周期更长
        ease: "easeInOut",
        delay: delay * 0.12 % 2
      }
    };
  }
};

// 设置不显示页脚
TagsIndexPage.showFooter = false;

export default function TagsIndexPage({ 
  tags,
  siteConfig
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const [cloudRadius, setCloudRadius] = useState(180);
  const [windowWidth, setWindowWidth] = useState(0);
  const [tagPositions, setTagPositions] = useState<Record<string, TagPosition>>({});
  const cloudContainerRef = useRef<HTMLDivElement>(null);
  const [cloudPaths, setCloudPaths] = useState<string[]>([]);
  const [positionsCalculated, setPositionsCalculated] = useState(false);
  
  // 修改标签加载动画，从虚化到显现
  const tagVariants = {
    hidden: { 
      opacity: 0, 
      filter: "blur(8px)",
      scale: 0.9
    },
    visible: (i: number) => ({ 
      opacity: 1, 
      filter: "blur(0px)",
      scale: 1,
      transition: { 
        delay: i * 0.04, // 略微增加延迟，使效果更明显
        duration: 0.7,   // 增加动画时长，让过渡更平滑
        opacity: { duration: 0.5 },
        filter: { duration: 0.6 },
        scale: { 
          type: "spring",
          stiffness: 50,
          damping: 10
        }
      }
    }),
    hover: { 
      scale: 1.05,
      filter: "drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1))",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };
  
  // 云朵背景动画 - 保持静态透明度，只移动位置
  const cloudVariants = {
    initial: () => ({
      opacity: 0.06,
      x: -20,
      y: -10 + Math.random() * 20
    }),
    animate: () => ({
      opacity: 0.06,
      x: 20,
      y: -10 + Math.random() * 20,
      transition: {
        duration: 30 + Math.random() * 40,
        repeat: Infinity,
        repeatType: "reverse" as const,
        ease: "linear",
        delay: Math.random() * 2
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
      // 标记为未计算状态
      setPositionsCalculated(false);
      
      // 使用新的算法计算所有标签位置
      const positions = calculateTagPositions(tags, cloudRadius);
      setTagPositions(positions);
      
      // 标记计算完成
      setTimeout(() => {
        setPositionsCalculated(true);
      }, 100); // 短暂延迟，确保位置已应用
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

        {/* 加载指示器 - 在标签准备好前显示 */}
        <motion.div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: positionsCalculated ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="text-primary/30 text-lg"
            initial={{ opacity: 0, filter: "blur(4px)" }}
            animate={{ 
              opacity: [0, 1, 1, 0], 
              filter: ["blur(4px)", "blur(0px)", "blur(0px)", "blur(4px)"]
            }}
            transition={{ 
              duration: 2, 
              repeat: Infinity,
              times: [0, 0.2, 0.8, 1]
            }}
          >
            正在准备标签云...
          </motion.div>
        </motion.div>

        <div 
          className="absolute inset-0 flex items-center justify-center" 
          style={{ perspective: 1000 }}
        >
          {positionsCalculated && tags.map((tag, index) => {
            const position = tagPositions[tag.name] || { x: 0, y: 0, size: 1, zOffset: 0, floatDelay: index };
            const size = position.size;
            const maxCount = Math.max(...tags.map(t => t.count));
            const importance = tag.count / maxCount; // 标签重要性
            
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
                custom={{
                  delay: position.floatDelay,
                  importance: importance // 传递重要性参数给动画
                }}
                initial="hidden"
                animate={["visible", "float"]}
                variants={{
                  ...tagVariants,
                  ...floatVariants
                }}
                whileHover="hover"
              >
                <Link href={`/tags/${tag.name}/`} className="block">
                  <motion.div
                    className={cn(
                      "flex items-center justify-center rounded-full cursor-pointer transition-all",
                      "bg-warm-paper/95 border border-primary/15 hover:border-primary/40",
                      "shadow-sm hover:shadow-md backdrop-blur-sm"
                    )}
                    style={{
                      width: `${3.2 * size}rem`,
                      height: `${3.2 * size}rem`,
                      minWidth: "3.2rem",
                      minHeight: "3.2rem",
                      backdropFilter: "blur(8px)",
                      background: `
                        ${paperTextureCSS},
                        radial-gradient(circle at ${40 + Math.random() * 10}% ${35 + Math.random() * 15}%, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.03) 75%)
                      `,
                      backgroundSize: `
                        20px 20px,
                        20px 20px,
                        100px 100px,
                        100px 100px,
                        cover
                      `,
                      boxShadow: `0 ${1.5 + size}px ${3 + size * 2.5}px rgba(0, 0, 0, 0.08), 
                                inset 0 0 0 1px rgba(255, 255, 255, 0.35)`,
                      transform: `rotate(${position.rotation || 0}deg)`,
                      transformOrigin: 'center center',
                      willChange: 'transform',
                      backfaceVisibility: 'hidden',
                    }}
                    whileHover={{ 
                      backgroundColor: "rgba(var(--primary-rgb), 0.04)",
                      scale: 1 + Math.max(0.01, 0.03 * (1 - 0.7 * importance)), // 大标签缩放效果更小
                      boxShadow: `0 ${2 + size}px ${4 + size * 3}px rgba(0, 0, 0, 0.1), 
                                inset 0 0 0 1px rgba(255, 255, 255, 0.5)`,
                      transition: { 
                        duration: 0.35 + (importance * 0.2), // 重要标签过渡更慢
                        ease: "easeOut" 
                      }
                    }}
                    layout="position"
                  >
                    {/* 内容区域，保持水平 */}
                    <div 
                      className="text-center px-2 relative z-10"
                      style={{
                        transform: position.rotation ? `rotate(${-position.rotation}deg)` : 'none' // 内容反向旋转，保持水平
                      }}
                    >
                      <div className="font-medium whitespace-nowrap tracking-wide text-primary" style={{
                        fontSize: `${0.75 + (size - 0.9) * 0.5}rem`
                      }}>{tag.name}</div>
                      
                      {/* 突出显示文章数量 */}
                      <div 
                        className="mt-1 inline-block rounded-full px-2 py-0.5" 
                        style={{
                          fontSize: `${0.65 + (size - 0.9) * 0.3}rem`,
                          backgroundColor: "rgba(var(--primary-rgb), 0.06)",
                          color: "rgba(var(--primary-rgb), 0.9)",
                          fontWeight: size > 1.3 ? "600" : size > 1.1 ? "500" : "normal",
                          border: "1px solid rgba(var(--primary-rgb), 0.12)",
                          boxShadow: "inset 0 0 0 1px rgba(255, 255, 255, 0.15)",
                          transform: `scale(${0.9 + (size - 0.9) * 0.2})`,
                          letterSpacing: "0.02em"
                        }}
                      >
                        <span>{tag.count}</span>
                        <span className="opacity-60"> 篇</span>
                      </div>
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
