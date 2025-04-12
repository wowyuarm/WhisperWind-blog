import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { getPageContent, type Post } from "@/lib/content";
import { getSiteConfig, type SiteConfig } from "@/lib/config";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import { HeadMeta } from '@/components/layout/HeadMeta';
import { CodeBlock } from '@/components/blog/CodeBlock';

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
export default function AboutPage({ pageData, siteConfig }: InferGetStaticPropsType<typeof getStaticProps>) {
  // 如果找不到页面内容，显示默认信息
  if (!pageData) {
    return (
      <>
        <HeadMeta
          title="关于我们"
          siteConfig={siteConfig}
        />
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
      <HeadMeta
        title={pageData.title}
        description={`关于 ${pageData.title} - WhisperWind Blog`}
        siteConfig={siteConfig}
      />
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