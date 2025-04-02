import { Layout } from "@/components/layout/Layout";
import { PostCard } from "@/components/blog/PostCard";
import { getAllPostMetas } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { notFound } from "next/navigation";

interface TagPageProps {
  params: {
    tag: string;
  };
}

export function generateMetadata({ params }: TagPageProps) {
  const decodedTag = decodeURIComponent(params.tag);
  
  return {
    title: `${decodedTag} - 标签 - WhisperWind Blog`,
    description: `查看所有带有"${decodedTag}"标签的文章列表`,
  };
}

export default function TagPage({ params }: TagPageProps) {
  const tag = decodeURIComponent(params.tag);
  
  // 获取所有文章的元数据
  const allPosts = getAllPostMetas();
  
  // 过滤出包含当前标签的文章，并按日期排序
  const taggedPosts = allPosts
    .filter(post => post.tags && Array.isArray(post.tags) && post.tags.includes(tag))
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());
  
  // 如果没有找到带有此标签的文章，返回404
  if (taggedPosts.length === 0) {
    notFound();
  }
  
  return (
    <Layout>
      <div className="py-8 md:py-12">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <Link href="/tags" className="text-sm text-muted-foreground hover:text-foreground">
              标签
            </Link>
            <span className="text-muted-foreground">/</span>
            <Badge variant="default" className="px-3 py-1">
              {tag}
            </Badge>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            带有 &quot;{tag}&quot; 标签的文章
          </h1>
          <div className="w-20 h-1 bg-primary rounded-full mb-6"></div>
          <p className="text-muted-foreground mb-8 max-w-3xl">
            找到 {taggedPosts.length} 篇带有 &quot;{tag}&quot; 标签的文章。
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {taggedPosts.map((post) => (
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
      </div>
    </Layout>
  );
} 