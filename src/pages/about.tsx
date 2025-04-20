import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { getPageContent, type Post } from "@/lib/content";
import { getSiteConfig, type SiteConfig } from "@/lib/config";
import { HeadMeta } from '@/components/layout/HeadMeta';
import { MarkdownRenderer } from '@/components/blog/MarkdownRenderer';

// Define the expected props type from getStaticProps
interface AboutPageProps {
  pageData: Post | null;
  siteConfig: SiteConfig;
}

export const getStaticProps: GetStaticProps<AboutPageProps> = async () => {
  const pageData = getPageContent('about');
  const siteConfig = getSiteConfig();
  
  return {
    props: {
      pageData: pageData || {
        title: '关于',
        publishDate: new Date().toISOString(),
        slug: 'about',
        content: '正在建设中，请稍后访问。',
        tags: []
      },
      siteConfig,
    },
  };
};

export default function AboutPage({ pageData, siteConfig }: InferGetStaticPropsType<typeof getStaticProps>) {
  // 确保 pageData 不为 null
  const content = pageData?.content ?? '正在建设中，请稍后访问。';
  const title = pageData?.title ?? '关于';

  return (
    <>
      <HeadMeta
        title={`关于 | ${siteConfig.title}`}
        description="了解更多关于我们的信息"
        siteConfig={siteConfig}
      />
      
      <section className="py-12">
        <article className="prose prose-lg max-w-4xl mx-auto dark:prose-invert">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-4 text-primary">{title}</h1>
            <div className="w-20 h-1 bg-primary rounded-full mx-auto"></div>
          </div>
          
          <div className="mt-8 content-area">
             <MarkdownRenderer content={content} />
          </div>
        </article>
      </section>
    </>
  );
}

// 设置不显示页脚
AboutPage.showFooter = false; 
