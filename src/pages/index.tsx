import Head from 'next/head';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { PostCard } from "@/components/blog/PostCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllPostMetas, type PostMeta } from "@/lib/content";
import Link from "next/link";
import { getSiteConfig, type SiteConfig } from "@/lib/config";

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

export default function Home({ recentPosts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>WhisperWind Blog</title>
        <meta name="description" content="WhisperWind Blog" />
      </Head>
      {/* 英雄区域 */}
      <section className="py-16 md:py-24 lg:py-28 relative">
        <div className="max-w-4xl mx-auto text-center content-area opacity-0 animate-fade-in-up">
          <div className="mb-8 animate-slow-float">
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 drop-shadow-sm">
              <span className="text-primary">WhisperWind</span> Blog
            </h1>
          </div>
          <div className="opacity-0 animate-fade-in-up animation-delay-300">
            <p className="text-lg md:text-xl mb-8 text-gray-700">
              开源博客模板，灵感来自于吉卜力风格
              <br />
              捕捉那种宁静、自然、略带魔法、温暖怀旧的氛围
              <br />
              <br />
              作者: 禹创(wowyuarm)
            </p>
          </div>
          <div className="opacity-0 animate-fade-in-up animation-delay-500">
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild size="lg" className="shadow-lg">
                <Link href="/archive">浏览文章</Link>
              </Button>
              <Button variant="outline" size="lg" asChild className="bg-white/80 shadow-lg">
                <Link href="/about">了解更多</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 留出更多空间，让背景图片显现 */}
      <div className="py-16"></div>

      {/* 最新文章 */}
      <section className="py-12 md:py-16">
        <div className="opacity-0 animate-fade-in-up">
          <div className="mb-10">
            <h2 className="text-3xl font-bold mb-4 text-primary">最新文章</h2>
            <div className="w-20 h-1 bg-primary rounded-full"></div>
          </div>
        </div>

        <div className="opacity-0 animate-fade-in-up animation-delay-300">
          {recentPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {recentPosts.map((post) => (
                <div 
                  key={post.slug} 
                  className="opacity-0 animate-fade-in-up animation-delay-300 transition-transform duration-300 hover:-translate-y-1"
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
            <Button asChild variant="outline" className="bg-white/80">
              <Link href="/archive">查看所有文章</Link>
            </Button>
          </div>
        )}
      </section>

      {/* 再次留出空间 */}
      <div className="py-16 relative"></div>
    </>
  );
}
