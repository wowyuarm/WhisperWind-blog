import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
// import { Layout } from "@/components/layout/Layout"; // Removed unused import
import { Badge } from "@/components/ui/badge";
import { getPostBySlug, getAllPostMetas, Post } from "@/lib/content";
import { formatDate, processImagePath } from "@/lib/utils";
import Link from "next/link";
// import { Suspense } from "react"; // Removed unused import
import { getSiteConfig, type SiteConfig } from "@/lib/config"; // Import getSiteConfig
import { HeadMeta } from '@/components/layout/HeadMeta';
// import { ReadingProgressBar } from '@/components/blog/ReadingProgressBar'; // 移除导入，因为已在Layout中全局使用
import { MarkdownRenderer } from '@/components/blog/MarkdownRenderer';
import Image from "next/image";

// Define props type from getStaticProps
interface PostPageProps {
  post: Post | null; // Allow null if post not found
  siteConfig: SiteConfig; // Add siteConfig to props
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPostMetas();
  const paths = posts.map((post) => ({
    params: { slug: post.slug },
  }));

  return {
    paths,
    fallback: false, // false means other routes should 404
  };
};

export const getStaticProps: GetStaticProps<PostPageProps, { slug: string }> = async (context) => {
  const slug = context.params?.slug;
  
  if (!slug) {
    return { notFound: true }; // Should not happen with fallback: false, but good practice
  }

  const post = getPostBySlug(slug);

  if (!post) {
    return { notFound: true }; // Return 404 if post not found
  }

  const siteConfig = getSiteConfig(); // Get site config

  return {
    props: {
      post,
      siteConfig, // Add siteConfig to returned props
    },
  };
};

// 设置不显示页脚
PostPage.showFooter = false;

export default function PostPage({ post, siteConfig }: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!post) {
    return <div>文章不存在或已被删除</div>;
  }
  
  const formattedDate = formatDate(post.publishDate);
  const featuredImage = processImagePath(post.featuredImage);

  return (
    <>
      <HeadMeta
        title={post.title}
        description={post.excerpt || `阅读文章: ${post.title}`}
        siteConfig={siteConfig}
        ogImage={featuredImage}
      />
      
      <article className="pb-16 pt-10">
        <div className="max-w-4xl mx-auto px-4">
          {/* 文章头部 */}
          <header className="mb-8">
            <h1 className="text-4xl font-bold mb-4 text-primary leading-tight">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center text-muted-foreground mb-6 gap-x-4 gap-y-2">
              <div className="flex items-center">
                <svg 
                  className="w-4 h-4 mr-1 text-primary/60" 
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
                <span>{formattedDate}</span>
              </div>
              
              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <Link href={`/tags/${tag}`} key={tag}>
                      <Badge variant="secondary" className="hover:-translate-y-0.5 transition-transform">
                        {tag}
                      </Badge>
                    </Link>
                  ))}
                </div>
              )}
            </div>
            
            {/* 特色图片 */}
            {featuredImage && (
              <div className="relative h-[300px] md:h-[400px] w-full rounded-lg overflow-hidden mb-8">
                <Image 
                  src={featuredImage} 
                  alt={post.title}
                  fill
                  className="object-cover" 
                />
              </div>
            )}
          </header>
          
          {/* 文章内容 */}
          <div className="prose prose-lg prose-blue dark:prose-invert max-w-4xl mx-auto">
            <MarkdownRenderer content={post.content} />
          </div>
          
          {/* 文章底部区域 */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex justify-end">
              <Link href="/archive" className="px-4 py-2 bg-primary/10 text-primary rounded-md hover:bg-primary/20 transition-colors flex items-center gap-2">
                <span>浏览更多文章</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="16" 
                  height="16" 
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
              </Link>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
