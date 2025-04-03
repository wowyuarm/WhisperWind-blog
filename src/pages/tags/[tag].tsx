import Head from 'next/head';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { PostCard } from "@/components/blog/PostCard";
import { getAllPostMetas, type PostMeta } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import { getSiteConfig, type SiteConfig } from "@/lib/config";

// Define props type
interface TagPageProps {
  tag: string;
  taggedPosts: PostMeta[];
  siteConfig: SiteConfig;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const posts = getAllPostMetas();
  const tags = new Set<string>();
  posts.forEach(post => {
    post.tags?.forEach(tag => tags.add(tag));
  });

  const paths = Array.from(tags).map(tag => ({
    params: { tag: encodeURIComponent(tag) }, // Ensure tag is URI encoded for the path
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<TagPageProps, { tag: string }> = async (context) => {
  const encodedTag = context.params?.tag;
  if (!encodedTag) {
    return { notFound: true };
  }
  const tag = decodeURIComponent(encodedTag);

  const allPosts = getAllPostMetas();
  const taggedPosts = allPosts
    .filter(post => post.tags && Array.isArray(post.tags) && post.tags.includes(tag))
    .sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

  if (taggedPosts.length === 0) {
    // Although fallback: false, this handles cases where a tag might exist but have no posts momentarily
    // or if getStaticPaths logic missed something.
    return { notFound: true }; 
  }

  const siteConfig = getSiteConfig();

  return {
    props: {
      tag,
      taggedPosts,
      siteConfig,
    },
  };
};

export default function TagPage({ tag, taggedPosts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>{tag} - 标签 - WhisperWind Blog</title>
        <meta name="description" content={`查看所有带有 \"${tag}\" 标签的文章列表`} />
      </Head>
      {/* Removed Layout wrapper */}
      <div className="py-8 md:py-12">
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            {/* Consider adding a link back to a page listing all tags if one exists */}
            <span className="text-sm text-muted-foreground">标签</span>
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
              publishDate={post.publishDate}
              tags={post.tags}
              featuredImage={post.featuredImage}
            />
          ))}
        </div>
      </div>
    </>
  );
} 