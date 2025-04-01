import { Layout } from "@/components/layout/Layout";
import { PostCard } from "@/components/blog/PostCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getAllPostMetas } from "@/lib/content";
import Link from "next/link";

export default function Home() {
  // 获取所有文章的元数据
  const posts = getAllPostMetas();

  return (
    <Layout>
      {/* 英雄区域 - 增加更多空间展示背景图片 */}
      <section className="py-16 md:py-24 lg:py-28">
        <div className="max-w-4xl mx-auto text-center content-area">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 drop-shadow-sm">
            <span className="text-primary">WhisperWind</span> Blog
          </h1>
          <p className="text-lg md:text-xl mb-8 text-gray-700">
            开源博客模板，灵感来自于吉卜力风格
            <br />
            捕捉那种宁静、自然、略带魔法、温暖怀旧的氛围
            <br />
            <br />
            作者: 禹创(wowyuarm)
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="shadow-lg">
              <Link href="/archive">浏览文章</Link>
            </Button>
            <Button variant="outline" size="lg" asChild className="bg-white/80 shadow-lg">
              <Link href="/about">了解更多</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* 留出更多空间，让背景图片显现 */}
      <div className="py-16"></div>

      {/* 最新文章 */}
      <section className="py-12 md:py-16">
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-4 text-primary">最新文章</h2>
          <div className="w-20 h-1 bg-primary rounded-full"></div>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.slice(0, 3).map((post) => (
              <PostCard
                key={post.slug}
                title={post.title}
                slug={post.slug}
                excerpt={post.excerpt || ''}
                date={post.publishDate}
                tags={post.tags}
                coverImage={post.featuredImage}
              />
            ))}
          </div>
        ) : (
          <Card className="bg-white/85 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>暂无文章</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                目前还没有发布任何文章。请稍后再来查看，或者现在就开始创建你的第一篇文章。
              </p>
            </CardContent>
          </Card>
        )}

        {posts.length > 0 && (
          <div className="mt-10 text-center">
            <Button asChild variant="outline" className="bg-white/80">
              <Link href="/archive">查看所有文章</Link>
            </Button>
          </div>
        )}
      </section>

      {/* 再次留出空间 */}
      <div className="py-16"></div>

      {/* 特性介绍 */}
      <section className="py-12 md:py-16">
        <div className="mb-10">
          <h2 className="text-3xl font-bold mb-4 text-primary">主要特性</h2>
          <div className="w-20 h-1 bg-primary rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="bg-white/85 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6 mr-2 text-primary" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
                </svg>
                响应式设计
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                完美适配各种设备尺寸，从手机到桌面，提供一致的用户体验。
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/85 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6 mr-2 text-primary" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Markdown 支持
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                使用 Markdown 语法轻松编写格式丰富的文章，包括代码块、表格和图片。
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white/85 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-6 w-6 mr-2 text-primary" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                内容管理
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                集成 Decap CMS，通过直观的界面管理内容，无需编写代码。
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    </Layout>
  );
}
