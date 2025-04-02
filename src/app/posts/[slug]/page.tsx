import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { getPostBySlug, getAllPostMetas } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import Image from "next/image";

// 定义 Props 类型
interface PostPageProps {
  params: {
    slug: string;
  };
}

// 为静态生成页面提供路径参数
export async function generateStaticParams(): Promise<PostPageProps['params'][]> {
  const posts = getAllPostMetas();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// // 生成页面元数据 (Temporarily commented out for debugging)
// export function generateMetadata({ params }: PostPageProps) {
//   const post = getPostBySlug(params.slug);
  
//   if (!post) {
//     return {
//       title: "文章未找到 - WhisperWind Blog",
//       description: "您查找的文章不存在或已被删除",
//     };
//   }
  
//   return {
//     title: `${post.title} - WhisperWind Blog`,
//     description: post.excerpt || "阅读WhisperWind Blog的最新文章",
//   };
// }

export default async function PostPage({ params }: PostPageProps) {
  // 获取文章数据
  const post = getPostBySlug(params.slug);
  
  // 如果文章不存在，返回404页面
  if (!post) {
    notFound();
  }
  
  return (
    <Layout>
      <article className="py-8 md:py-12 max-w-4xl mx-auto">
        {/* 文章标题和元信息 */}
        <header className="mb-8">
          <div className="mb-6">
            <Link 
              href="/archive" 
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              ← 返回文章列表
            </Link>
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-6">
            <time dateTime={post.publishDate}>
              {formatDate(post.publishDate)}
            </time>
            
            {post.tags && (
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag: string) => (
                  <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`}>
                    <Badge variant="outline" className="hover:bg-primary hover:text-primary-foreground transition-colors">
                      {tag}
                    </Badge>
                  </Link>
                ))}
              </div>
            )}
          </div>
          
          {/* 特色图片 */}
          {post.featuredImage && (
            <div className="mb-8 aspect-[21/9] relative overflow-hidden rounded-lg">
              <Image
                src={post.featuredImage}
                alt={post.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          )}
        </header>
        
        {/* 文章内容 */}
        <div className="prose prose-blue dark:prose-invert max-w-none">
          <Suspense fallback={<div>加载中...</div>}>
            <Markdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight, rehypeRaw]}
            >
              {post.content}
            </Markdown>
          </Suspense>
        </div>
      </article>
    </Layout>
  );
}