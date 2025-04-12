import React from 'react'
import Link from 'next/link'
import { Badge } from '../ui/badge'
import { AnimatedButton } from '../ui/animated-button'
import { formatDate } from '@/lib/utils'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'

interface PostCardProps {
  title: string
  slug: string
  excerpt?: string
  publishDate: string
  tags?: string[]
  featuredImage?: string // 保留属性但不显示图片
}

export function PostCard({ title, slug, excerpt, publishDate, tags = [] }: PostCardProps) {
  const formattedDate = formatDate(publishDate)

  // 使用cn函数合并类名
  const cardClasses = cn(
    "h-full bg-warm-paper border-secondary/20 shadow-ghibli transition-all duration-200 flex flex-col"
  )

  // 优化的浮动动画变体 - 减少动画帧数和幅度，启用硬件加速
  const floatVariants = {
    initial: { 
      y: 0,
      willChange: "transform" // 提示浏览器提前准备变换，优化性能
    },
    animate: { 
      y: [-1, 1, -1], // 减小幅度
      transition: {
        y: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 8, // 减慢速度，减少帧率压力
          ease: "linear", // 使用线性缓动简化计算
        }
      }
    },
    hover: { 
      y: -4, // 减小悬停上移距离
      scale: 1.01, // 减小放大倍数
      transition: { 
        duration: 0.2,
      }
    }
  }

  return (
    <article className="group h-full">
      <motion.div
        initial="initial"
        animate="animate"
        whileHover="hover"
        variants={floatVariants}
        className="h-full will-change-transform" // 添加 will-change 提示
        style={{
          transform: "translateZ(0)" // 强制硬件加速
        }}
      >
        <Card className={cardClasses}>
          <CardHeader className="space-y-2 pt-6 flex-initial">
            <div className="space-y-1.5">
              <CardTitle className="tracking-wide transition-colors duration-200 group-hover:text-primary line-clamp-2 h-[3.5rem]">
                <Link href={`/posts/${slug}`} className="hover:underline decoration-primary/30 underline-offset-4">
                  {title}
                </Link>
              </CardTitle>
              <p className="text-muted-foreground text-sm tracking-wide flex items-center">
                <svg 
                  className="w-4 h-4 mr-1 text-primary/60 transition-transform duration-200 hover:scale-105" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                {formattedDate}
              </p>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 flex-1 flex flex-col">
            <div className="relative h-24 overflow-hidden mb-auto">
              <p className="text-foreground/90 leading-relaxed tracking-wide line-clamp-3">
                {excerpt}
              </p>
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-warm-paper to-transparent"></div>
            </div>
            <div className="pt-2 mt-auto h-10">
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {tags.slice(0, 3).map((tag) => ( // 最多显示3个标签
                    <div
                      key={tag}
                      className="transition-transform duration-150 hover:-translate-y-0.5 hover:scale-105"
                    >
                      <Link href={`/tags/${tag}/`}>
                        <Badge variant="secondary" className="tracking-wide bg-secondary/15 border-secondary/40 group-hover:bg-secondary/30 transition-colors duration-200">
                          {tag}
                        </Badge>
                      </Link>
                    </div>
                  ))}
                  {tags.length > 3 && (
                    <Badge variant="outline" className="text-xs tracking-wide">
                      +{tags.length - 3}
                    </Badge>
                  )}
                </div>
              )}
            </div>
          </CardContent>
          <CardFooter className="pt-4 border-t border-secondary/20 flex-initial">
            <Link href={`/posts/${slug}`} passHref className="w-full">
              <AnimatedButton variant="outline" className="w-full text-primary tracking-wide bg-warm-paper border-secondary/40 group-hover:border-primary/40">
                阅读文章
                <svg 
                  className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </AnimatedButton>
            </Link>
          </CardFooter>
        </Card>
      </motion.div>
    </article>
  )
} 