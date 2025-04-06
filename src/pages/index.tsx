import Head from 'next/head';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { PostCard } from "@/components/blog/PostCard";
import { Button } from "@/components/ui/button";
import { AnimatedButton } from "@/components/ui/animated-button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllPostMetas, type PostMeta } from "@/lib/content";
import Link from "next/link";
import { getSiteConfig, type SiteConfig } from "@/lib/config";
import { useEffect, useState } from 'react';
import { HeadMeta } from '@/components/layout/HeadMeta';

// Define props type
interface HomePageProps {
  recentPosts: PostMeta[];
  siteConfig: SiteConfig;
}

export const getStaticProps: GetStaticProps<HomePageProps> = async () => {
  // 获取最新的4篇文章
  const recentPosts = getAllPostMetas()
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime())
    .slice(0, 4);
  
  const siteConfig = getSiteConfig();
  
  return {
    props: {
      recentPosts,
      siteConfig,
    },
  };
};

export default function Home({ recentPosts, siteConfig }: InferGetStaticPropsType<typeof getStaticProps>) {
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
        <section className="py-12 md:py-16 lg:py-20 relative">
          <div className="max-w-4xl mx-auto text-center content-area opacity-0 animate-fade-in-up">
            <div className="mb-6 animate-slow-float">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4 drop-shadow-sm">
                <span className="text-primary">WhisperWind</span> Blog
              </h1>
            </div>
          </div>
        </section>

        {/* 留出更多空间，让背景图片显现 */}
        <div className="py-8"></div>

        {/* 主章节 */}
        <section className="py-6 md:py-10">
          <div className="opacity-0 animate-fade-in-up">
            <div className="mb-6">
              <h2 className="text-3xl font-bold mb-3 text-primary">最新文章</h2>
              <div className="w-20 h-1 bg-primary rounded-full"></div>
            </div>
          </div>

          <div className="opacity-0 animate-fade-in-up animation-delay-300">
            {recentPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 content-visibility-auto">
                {recentPosts.map((post, index) => (
                  <div 
                    key={post.slug} 
                    className="opacity-0 animate-fade-in-up animation-delay-300 hover:-translate-y-1 transition-transform duration-300"
                    style={{ 
                      containIntrinsicSize: '0 500px' // 提示浏览器预留空间
                    }}
                  >
                    <PostCard
                      title={post.title}
                      slug={post.slug}
                      excerpt={post.excerpt || ''}
                      publishDate={post.publishDate}
                      tags={post.tags}
                      featuredImage={post.featuredImage}
                    />
                  </div>
                ))}
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

          {recentPosts.length > 0 && (
            <div className="mt-10 text-center opacity-0 animate-fade-in-up animation-delay-700">
              <AnimatedButton 
                asChild 
                variant="outline" 
                className="bg-white/80"
                animationIntensity={reducedMotion ? "none" : "subtle"}
              >
                <Link href="/archive">查看所有文章</Link>
              </AnimatedButton>
            </div>
          )}
        </section>

        {/* 再次留出空间 */}
        <div className="py-16 relative"></div>
      </div>
    </>
  );
}
