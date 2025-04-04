import Head from 'next/head';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { PostCard } from "@/components/blog/PostCard";
import { getAllPostMetas, type PostMeta } from "@/lib/content";
import { getSiteConfig, type SiteConfig } from "@/lib/config";

// Define props type
interface ArchivePageProps {
  posts: PostMeta[];
  siteConfig: SiteConfig;
}

export const getStaticProps: GetStaticProps<ArchivePageProps> = async () => {
  // 获取所有文章的元数据并按日期排序
  const posts = getAllPostMetas().sort((a, b) => {
    return new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime();
  });
  const siteConfig = getSiteConfig();
  return {
    props: {
      posts,
      siteConfig,
    },
  };
};

export default function ArchivePage({ posts }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>文章归档 - WhisperWind Blog</title>
        <meta name="description" content="浏览WhisperWind Blog的所有文章归档" />
      </Head>
      <div className="py-8 md:py-12">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">文章归档</h1>
          <div className="w-20 h-1 bg-primary rounded-full mb-6"></div>
          <p className="text-muted-foreground mb-8 max-w-3xl">
            这里收录了WhisperWind Blog上的所有文章，按发布时间降序排列。
            你可以浏览所有的文章，查找感兴趣的内容。
          </p>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
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
        ) : (
          <div className="p-8 text-center border border-dashed rounded-lg">
            <h3 className="text-xl font-medium mb-2">暂无文章</h3>
            <p className="text-muted-foreground">
              目前还没有发布任何文章。请稍后再来查看。
            </p>
          </div>
        )}
      </div>
    </>
  );
} 