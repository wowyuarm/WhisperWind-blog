import Head from 'next/head';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { Badge } from "@/components/ui/badge";
import { getAllPostMetas } from "@/lib/content";
import { getSiteConfig, type SiteConfig } from "@/lib/config";

// Define props type
interface TagsIndexPageProps {
  tags: string[];
  siteConfig: SiteConfig;
}

export const getStaticProps: GetStaticProps<TagsIndexPageProps> = async () => {
  const posts = getAllPostMetas();
  const tagsSet = new Set<string>();
  posts.forEach(post => {
    post.tags?.forEach(tag => tagsSet.add(tag));
  });
  const tags = Array.from(tagsSet).sort(); // Sort tags alphabetically
  const siteConfig = getSiteConfig();

  return {
    props: {
      tags,
      siteConfig,
    },
  };
};

export default function TagsIndexPage({ tags }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>所有标签 - WhisperWind Blog</title>
        <meta name="description" content="浏览 WhisperWind Blog 的所有文章标签" />
      </Head>
      <div className="py-8 md:py-12">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">所有标签</h1>
          <div className="w-20 h-1 bg-primary rounded-full mb-6"></div>
          <p className="text-muted-foreground mb-8 max-w-3xl">
            点击标签查看相关文章。
          </p>
        </div>

        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {tags.map((tag) => (
              <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`}>
                <Badge 
                  variant="outline" 
                  className="px-4 py-2 text-base hover:bg-primary/10 hover:border-primary/50 transition-colors cursor-pointer"
                >
                  {tag}
                </Badge>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">暂无标签。</p>
        )}
      </div>
    </>
  );
} 