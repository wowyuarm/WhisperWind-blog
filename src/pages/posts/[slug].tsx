import Head from 'next/head';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
// import { Layout } from "@/components/layout/Layout"; // Removed unused import
import { Badge } from "@/components/ui/badge";
import { getPostBySlug, getAllPostMetas, Post } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import Link from "next/link";
// import { Suspense } from "react"; // Removed unused import
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import Image from "next/image";
import ErrorPage from 'next/error'; // For handling not found in getStaticProps
import { getSiteConfig, type SiteConfig } from "@/lib/config"; // Import getSiteConfig

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
  // Handle case where post is null (though getStaticProps should return notFound: true)
  if (!post) {
    // This typically won't be reached if fallback: false and getStaticProps returns notFound
    return <ErrorPage statusCode={404} />;
  }

  return (
    <>
      <Head>
        <title>{post.title} - WhisperWind Blog</title>
        <meta name="description" content={post.excerpt || `阅读文章 ${post.title}`} />
      </Head>
      {/* Removed Layout wrapper */}
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
          {/* Suspense might not be strictly necessary here with getStaticProps */}
          <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight, rehypeRaw]}
          >
            {post.content}
          </Markdown>
        </div>
      </article>
    </>
  );
}