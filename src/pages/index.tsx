import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { AnimatedButton } from "@/components/ui/animated-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllPostMetas, type PostMeta } from "@/lib/content";
import Link from "next/link";
import { getSiteConfig, type SiteConfig } from "@/lib/config";
import { useEffect, useState } from 'react';
import { HeadMeta } from '@/components/layout/HeadMeta';
import { ContributionGraph } from '@/components/blog/ContributionGraph';
import { TimelineView } from '@/components/blog/TimelineView';
import { motion } from 'framer-motion';

// Define props type
interface HomePageProps {
  allPosts: PostMeta[];
  siteConfig: SiteConfig;
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  // 获取所有文章
  const allPosts = getAllPostMetas()
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  
  const siteConfig = getSiteConfig();
  
  return {
    props: {
      allPosts,
      siteConfig,
    },
  };
};

export default function Home({ allPosts, siteConfig }: InferGetStaticPropsType<typeof getStaticProps>) {
  // 首次加载时禁用动画，避免大量动画同时运行
  const [enableAnimation, setEnableAnimation] = useState(false);
  
  // 在组件挂载后，等待一段时间再启用动画，确保页面已经稳定渲染
  useEffect(() => {
    const timer = setTimeout(() => {
      setEnableAnimation(true);
    }, 1000); // 等待1秒后再启用动画
    
    return () => clearTimeout(timer);
  }, []);
  
  // 根据屏幕宽度计算是否启用部分动画，移动设备可能性能更差
  const [reducedMotion, setReducedMotion] = useState(false);
  
  useEffect(() => {
    // 检查是否是移动设备或用户已启用减少动画模式
    const checkReducedMotion = () => {
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isMobile = window.innerWidth < 768;
      setReducedMotion(prefersReducedMotion || isMobile);
    };
    
    checkReducedMotion();
    window.addEventListener('resize', checkReducedMotion);
    
    return () => window.removeEventListener('resize', checkReducedMotion);
  }, []);

  return (
    <>
      <HeadMeta
        title="首页"
        description="发现精彩内容，探索深度思考"
        siteConfig={siteConfig}
      />
      
      {/* 根据动画状态添加CSS类 */}
      <div className={enableAnimation ? 'animations-enabled' : 'animations-disabled'}>
        {/* 英雄区域 */}
        <section className="py-10 md:py-14 lg:py-16 relative">
          <div className="max-w-4xl mx-auto text-center content-area opacity-0 animate-fade-in-up">
            <div className="mb-4 animate-slow-float">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-3 drop-shadow-sm">
                <span className="text-primary">WhisperWind</span> Blog
              </h1>
              <p className="text-lg text-muted-foreground">寻找有趣的想法，记录思考的过程</p>
            </div>
          </div>
          
          {/* 装饰性云朵 */}
          <div className="absolute left-1/4 bottom-0 opacity-20 text-primary">
            <motion.svg 
              width="60" 
              height="30" 
              viewBox="0 0 60 30" 
              fill="currentColor"
              animate={{ y: [0, -5, 0], x: [0, 3, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <path d="M10 20C10 13.3726 15.3726 8 22 8C28.6274 8 34 13.3726 34 20H10Z" />
              <path d="M26 16C26 9.37258 31.3726 4 38 4C44.6274 4 50 9.37258 50 16H26Z" />
              <path d="M44 20C44 13.3726 49.3726 8 56 8C62.6274 8 68 13.3726 68 20H44Z" />
            </motion.svg>
          </div>
          
          <div className="absolute right-1/4 top-10 opacity-15 text-primary">
            <motion.svg 
              width="40" 
              height="20" 
              viewBox="0 0 60 30" 
              fill="currentColor"
              animate={{ y: [0, -3, 0], x: [0, -2, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            >
              <path d="M10 20C10 13.3726 15.3726 8 22 8C28.6274 8 34 13.3726 34 20H10Z" />
              <path d="M26 16C26 9.37258 31.3726 4 38 4C44.6274 4 50 9.37258 50 16H26Z" />
            </motion.svg>
          </div>
        </section>

        {/* GitHub式贡献图 */}
        <section className="py-4 md:py-6">
          <div className="opacity-0 animate-fade-in-up animation-delay-300">
            {allPosts.length > 0 ? (
              <div className="relative mx-auto w-full">
                <ContributionGraph 
                  posts={allPosts} 
                  className="relative z-10 rounded-lg scale-100 md:scale-110 transform origin-center"
                />
              </div>
            ) : (
              <Card className="bg-white/90">
                <CardHeader>
                  <CardTitle>暂无文章</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    目前还没有发布任何文章。请稍后再来查看。
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </section>
        
        {/* 过渡装饰云朵 */}
        <div className="relative h-16">
          <motion.div
            className="absolute left-1/2 -ml-10 text-primary/20"
            animate={{ y: [-2, 2, -2], rotate: [0, 1, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <svg width="80" height="40" viewBox="0 0 80 40" fill="currentColor">
              <path d="M15 25C15 18.3726 20.3726 13 27 13C33.6274 13 39 18.3726 39 25H15Z" />
              <path d="M31 21C31 14.3726 36.3726 9 43 9C49.6274 9 55 14.3726 55 21H31Z" />
              <path d="M47 25C47 18.3726 52.3726 13 59 13C65.6274 13 71 18.3726 71 25H47Z" />
            </svg>
          </motion.div>
        </div>

        {/* 时间线视图 */}
        <section className="py-3 md:py-5">
          <div className="opacity-0 animate-fade-in-up">
            <div className="mb-4 relative">
              <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-primary/20 to-transparent top-1/2 -z-10"></div>
              <h2 className="text-3xl font-bold text-primary inline-block bg-warm-paper/90 px-4 mx-auto relative left-1/2 -translate-x-1/2">足迹</h2>
            </div>
          </div>

          <div className="opacity-0 animate-fade-in-up animation-delay-300">
            {allPosts.length > 0 ? (
              <div className="relative w-full mx-auto">
                <TimelineView 
                  posts={allPosts} 
                  className="relative z-10"
                  title="" 
                />
                
                {/* 手绘风格背景 */}
                <div className="absolute inset-0 rounded-lg pointer-events-none overflow-hidden">
                  <div className="absolute top-10 left-20 w-40 h-40 bg-primary/3 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-20 right-20 w-60 h-60 bg-primary/2 rounded-full blur-3xl"></div>
                </div>
              </div>
            ) : (
              <Card className="bg-white/90">
                <CardHeader>
                  <CardTitle>暂无文章</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    目前还没有发布任何文章。请稍后再来查看。
                  </p>
                </CardContent>
              </Card>
            )}
          </div>

          {allPosts.length > 0 && (
            <div className="mt-10 text-center opacity-0 animate-fade-in-up animation-delay-700">
              <AnimatedButton 
                asChild 
                variant="outline" 
                className="bg-white/60 border border-primary/10 shadow-sm"
                animationIntensity={reducedMotion ? "none" : "subtle"}
              >
                <Link href="/archive">查看归档页</Link>
              </AnimatedButton>
            </div>
          )}
        </section>

        {/* 页脚装饰 */}
        <div className="py-12 relative">
          <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 text-primary/15 w-full max-w-md flex justify-center">
            <motion.svg 
              width="200" 
              height="30" 
              viewBox="0 0 200 30" 
              fill="currentColor"
              animate={{ y: [0, -3, 0], scale: [1, 1.02, 1] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <path d="M20 30C20 23.3726 25.3726 18 32 18C38.6274 18 44 23.3726 44 30H20Z" />
              <path d="M36 26C36 19.3726 41.3726 14 48 14C54.6274 14 60 19.3726 60 26H36Z" />
              <path d="M52 30C52 23.3726 57.3726 18 64 18C70.6274 18 76 23.3726 76 30H52Z" />
              <path d="M68 26C68 19.3726 73.3726 14 80 14C86.6274 14 92 19.3726 92 26H68Z" />
              <path d="M84 30C84 23.3726 89.3726 18 96 18C102.627 18 108 23.3726 108 30H84Z" />
              <path d="M100 26C100 19.3726 105.373 14 112 14C118.627 14 124 19.3726 124 26H100Z" />
              <path d="M116 30C116 23.3726 121.373 18 128 18C134.627 18 140 23.3726 140 30H116Z" />
              <path d="M132 26C132 19.3726 137.373 14 144 14C150.627 14 156 19.3726 156 26H132Z" />
              <path d="M148 30C148 23.3726 153.373 18 160 18C166.627 18 172 23.3726 172 30H148Z" />
              <path d="M164 26C164 19.3726 169.373 14 176 14C182.627 14 188 19.3726 188 26H164Z" />
            </motion.svg>
          </div>
        </div>
      </div>
    </>
  );
}
