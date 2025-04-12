import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
// import { Layout } from "@/components/layout/Layout"; // Removed unused import
import { Badge } from "@/components/ui/badge";
import { getPostBySlug, getAllPostMetas, Post } from "@/lib/content";
import { formatDate, processImagePath } from "@/lib/utils";
import Link from "next/link";
// import { Suspense } from "react"; // Removed unused import
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import Image from "next/image";
// import ErrorPage from 'next/error'; // 删除未使用的导入
import { getSiteConfig, type SiteConfig } from "@/lib/config"; // Import getSiteConfig
import { HeadMeta } from '@/components/layout/HeadMeta';
// import { ReadingProgressBar } from '@/components/blog/ReadingProgressBar'; // 移除导入，因为已在Layout中全局使用
import { CodeBlock } from '@/components/blog/CodeBlock';

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
    return <div>Post not found</div>; // 或者可以显示一个更友好的404页面
  }
  
  // 处理文章特色图片路径，使用通用的图片路径处理函数
  const featuredImage = processImagePath(post.featuredImage);

  return (
    <>
      <HeadMeta
        title={post.title}
        description={post.excerpt || post.title}
        ogImage={featuredImage}
        siteConfig={siteConfig}
      />
      
      <article className="py-8 md:py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          {/* 文章标题和元信息 */}
          <header className="mb-8">
            <div className="mb-6">
              <Link 
                href="/archive" 
                className="text-sm text-muted-foreground hover:text-foreground flex items-center"
              >
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
                  className="mr-1"
                >
                  <polyline points="15 18 9 12 15 6"></polyline>
                </svg>
                返回文章列表
              </Link>
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-4">
              <time dateTime={post.publishDate} className="flex items-center">
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
                  className="mr-1"
                >
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                  <line x1="16" y1="2" x2="16" y2="6"></line>
                  <line x1="8" y1="2" x2="8" y2="6"></line>
                  <line x1="3" y1="10" x2="21" y2="10"></line>
                </svg>
                {formatDate(post.publishDate)}
              </time>
              
              {post.tags && (
                <div className="flex flex-wrap gap-2 items-center">
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
                    className="mr-1"
                  >
                    <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path>
                    <line x1="7" y1="7" x2="7.01" y2="7"></line>
                  </svg>
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
            {featuredImage && (
              <div className="mt-6 mb-8 aspect-[21/9] relative overflow-hidden rounded-lg shadow-md">
                <Image
                  src={featuredImage}
                  alt={post.title}
                  fill
                  priority
                  className="object-cover"
                />
              </div>
            )}
          </header>
          
          {/* 文章内容 */}
          <div className="prose prose-lg prose-blue dark:prose-invert max-w-4xl mx-auto">
            <Markdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight, rehypeRaw]}
              components={{
                // 自定义代码块渲染
                code({ className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '');
                  const language = match ? match[1] : '';
                  
                  // 智能处理代码内容
                  const processCodeContent = (content: unknown): string => {
                    if (typeof content === 'string') {
                      return content.replace(/\n$/, '');
                    }
                    
                    if (Array.isArray(content)) {
                      return content
                        .map(item => processCodeContent(item))
                        .filter(Boolean)
                        .join('');
                    }
                    
                    if (content && typeof content === 'object') {
                      // 如果是React元素或其他特殊对象，尝试获取其文本内容
                      if (content !== null && 
                          'props' in content && 
                          content.props && 
                          typeof content.props === 'object' && 
                          'children' in content.props) {
                        return processCodeContent(content.props.children);
                      }
                      
                      // 如果是普通对象，尝试获取其字符串表示
                      try {
                        const str = String(content);
                        return str === '[object Object]' ? '' : str;
                      } catch {
                        return '';
                      }
                    }
                    
                    return String(content || '');
                  };
                  
                  const codeContent = processCodeContent(children);
                  
                  return match ? (
                    <CodeBlock
                      language={language}
                      value={codeContent}
                      {...props}
                    />
                  ) : (
                    <code className={className} {...props}>
                      {processCodeContent(children)}
                    </code>
                  );
                },
                // 不渲染h1标题，因为页面顶部已经有文章标题了
                h1: () => null,
                // 重新映射h2-h6标题
                h2: ({ children }) => <h2>{children}</h2>,
                h3: ({ children }) => <h3>{children}</h3>,
                h4: ({ children }) => <h4>{children}</h4>,
                h5: ({ children }) => <h5>{children}</h5>,
                h6: ({ children }) => <h6>{children}</h6>
              }}
            >
              {post.content}
            </Markdown>
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