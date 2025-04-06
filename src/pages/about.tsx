import Head from 'next/head';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { getPageContent, type Post } from "@/lib/content";
import { getSiteConfig, type SiteConfig } from "@/lib/config";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

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
      pageData,
      siteConfig,
    },
  };
};

// Use InferGetStaticPropsType to get the props type
export default function AboutPage({ pageData }: InferGetStaticPropsType<typeof getStaticProps>) {
  // 如果找不到页面内容，显示默认信息
  if (!pageData) {
    return (
      <>
        <Head>
          <title>关于我们 - WhisperWind Blog</title>
        </Head>
        <section className="py-12">
          <div className="prose prose-lg mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-primary">关于我们</h1>
            <p>关于页面内容正在编辑中...</p>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{pageData.title} - WhisperWind Blog</title>
        <meta name="description" content={`关于 ${pageData.title} - WhisperWind Blog`} />
      </Head>
      <section className="py-12">
        <article className="prose prose-lg max-w-4xl mx-auto dark:prose-invert">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-4 text-primary">{pageData.title}</h1>
            <div className="w-20 h-1 bg-primary rounded-full mx-auto"></div>
          </div>
          
          <div className="mt-8 content-area">
             <Markdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeHighlight, rehypeRaw]}
              >
                {pageData.content}
              </Markdown>
          </div>
        </article>
      </section>
    </>
  );
}

// 设置不显示页脚
AboutPage.showFooter = false; 