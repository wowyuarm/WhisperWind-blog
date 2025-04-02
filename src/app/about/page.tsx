import { Layout } from "@/components/layout/Layout";
import { getPageContent, markdownToHtml } from "@/lib/content";

export const metadata = {
  title: "关于我们 - WhisperWind Blog",
  description: "关于WhisperWind博客模板项目的信息",
};

export default async function AboutPage() {
  // 从Markdown文件获取"关于"页面内容
  const pageData = getPageContent('about');
  
  // 如果找不到页面内容，返回默认内容
  if (!pageData) {
    return (
      <Layout>
        <section className="py-12">
          <div className="prose prose-lg mx-auto">
            <h1 className="text-4xl font-bold mb-4 text-primary">关于我们</h1>
            <p>关于页面内容正在编辑中...</p>
          </div>
        </section>
      </Layout>
    );
  }
  
  // 将Markdown转换为HTML
  const contentHtml = await markdownToHtml(pageData.content);

  return (
    <Layout>
      <section className="py-12">
        <article className="prose prose-lg max-w-4xl mx-auto dark:prose-invert">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-4 text-primary">{pageData.title}</h1>
            <div className="w-20 h-1 bg-primary rounded-full mx-auto"></div>
          </div>
          
          <div 
            className="mt-8 content-area"
            dangerouslySetInnerHTML={{ __html: contentHtml }} 
          />
        </article>
      </section>
    </Layout>
  );
} 