import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { PostCard } from "@/components/blog/PostCard";
import { getAllPostMetas, type PostMeta } from "@/lib/content";
import { getSiteConfig, type SiteConfig } from "@/lib/config";
import { HeadMeta } from '@/components/layout/HeadMeta';

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

// 设置不显示页脚
ArchivePage.showFooter = false;

export default function ArchivePage({ posts, siteConfig }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <HeadMeta
        title="文章归档"
        description="浏览WhisperWind Blog的所有文章归档"
        siteConfig={siteConfig}
      />
      <div className="py-8 md:py-12">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">文章归档</h1>
          <div className="w-20 h-1 bg-primary rounded-full mb-6"></div>
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