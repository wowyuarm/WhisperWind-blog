import React from 'react';
import Markdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { CodeBlock } from './CodeBlock';
import Image from 'next/image';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

/**
 * 增强版Markdown渲染器，支持更多高级语法
 * - 原生支持GFM (表格、任务列表、自动链接等)
 * - 支持HTML标签渲染(居中、下划线等)
 * - 支持语法高亮
 * - 支持自定义组件覆盖
 */
export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content, className = '' }) => {
  return (
    <div className={`markdown-content ${className}`}>
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
            
            // 行内代码
            if (!language) {
              return <code className="bg-secondary/10 text-primary px-1.5 py-0.5 rounded font-mono text-sm" {...props}>{codeContent}</code>;
            }
            
            // 代码块
            return (
              <CodeBlock 
                value={codeContent} 
                language={language} 
              />
            );
          },
          
          // 支持居中文本渲染
          div({ node, className, children, ...props }) {
            const style = node?.properties?.style as string | undefined;
            if (style && style.includes('text-align: center')) {
              return <div className="text-center my-4" {...props}>{children}</div>;
            }
            return <div className={className} {...props}>{children}</div>;
          },
          
          // 支持下划线
          u({ children }) {
            return <u className="underline decoration-1">{children}</u>;
          },
          
          // 支持高亮标记
          mark({ children }) {
            return <mark className="bg-yellow-200 dark:bg-yellow-800/50 px-1 rounded">{children}</mark>;
          },
          
          // 样式化引用块
          blockquote({ children }) {
            return (
              <blockquote className="border-l-4 border-primary/30 pl-4 py-1 my-4 bg-primary/5 italic rounded-r">
                {children}
              </blockquote>
            );
          },
          
          // 样式化表格
          table({ children }) {
            return (
              <div className="overflow-x-auto my-6">
                <table className="min-w-full divide-y divide-gray-300 dark:divide-gray-700 border border-secondary/20 rounded">
                  {children}
                </table>
              </div>
            );
          },
          
          thead({ children }) {
            return <thead className="bg-secondary/10">{children}</thead>;
          },
          
          tbody({ children }) {
            return <tbody className="divide-y divide-gray-200 dark:divide-gray-800">{children}</tbody>;
          },
          
          th({ children }) {
            return <th className="px-4 py-3 text-left text-sm font-semibold text-primary">{children}</th>;
          },
          
          td({ children }) {
            return <td className="px-4 py-3 text-sm">{children}</td>;
          },
          
          // 无序列表
          ul({ children, ...props }) {
            return (
              <ul className="list-disc pl-6 my-4 space-y-2" {...props}>
                {children}
              </ul>
            );
          },
          
          // 有序列表
          ol({ children, ...props }) {
            return (
              <ol className="list-decimal pl-6 my-4 space-y-2" {...props}>
                {children}
              </ol>
            );
          },
          
          // 样式化任务列表和普通列表项
          li({ node, children, ...props }) {
            // 检查是否是任务列表项
            const firstChild = node?.children?.[0];
            if (
              firstChild?.type === 'element' && 
              firstChild?.tagName === 'input' && 
              firstChild?.properties?.type === 'checkbox'
            ) {
              const isChecked = !!(firstChild.properties.checked);
              
              return (
                <li className="flex items-start gap-2 my-1 list-none" {...props}>
                  <input 
                    type="checkbox" 
                    checked={isChecked} 
                    readOnly
                    className="mt-1 h-4 w-4 rounded-sm border-secondary/40 bg-white/80 dark:bg-black/20"
                  />
                  <span className={isChecked ? "line-through opacity-70" : ""}>
                    {/* 移除第一个子元素(checkbox)，只显示文本内容 */}
                    {React.Children.toArray(children).slice(1)}
                  </span>
                </li>
              );
            }
            
            // 普通列表项
            return <li className="my-1" {...props}>{children}</li>;
          },
          
          // 美化标题样式
          h1: ({ children }) => <h1 className="text-3xl font-bold my-6 text-primary/90 border-b pb-1 border-primary/10">{children}</h1>,
          h2: ({ children }) => <h2 className="text-2xl font-bold mt-8 mb-4 text-primary/90">{children}</h2>,
          h3: ({ children }) => <h3 className="text-xl font-semibold mt-6 mb-3 text-primary/90">{children}</h3>,
          h4: ({ children }) => <h4 className="text-lg font-semibold mt-5 mb-2 text-primary/90">{children}</h4>,
          h5: ({ children }) => <h5 className="text-base font-semibold mt-4 mb-2 text-primary/90">{children}</h5>,
          h6: ({ children }) => <h6 className="text-sm font-semibold mt-4 mb-2 text-primary/90">{children}</h6>,
          
          // 美化段落
          p: ({ children }) => <p className="my-4 leading-relaxed">{children}</p>,
          
          // 美化图片
          img: ({ src, alt, ...props }) => (
            <div className="my-6 flex justify-center">
              {src ? (
                <div className="relative max-w-full h-auto max-h-[600px]">
                  {/* 使用 next/image，但保留回退方案 */}
                  {src.startsWith('http') || src.startsWith('/') ? (
                    <Image 
                      src={src} 
                      alt={alt || ''} 
                      className="rounded-lg shadow-md object-contain"
                      width={800}
                      height={600}
                      style={{ objectFit: 'contain', maxHeight: '600px' }}
                    />
                  ) : (
                    // 回退到普通 img 标签，用于处理可能不符合 Next.js Image 要求的源
                    // eslint-disable-next-line @next/next/no-img-element
                    <img 
                      src={src} 
                      alt={alt || ''} 
                      className="rounded-lg shadow-md max-w-full max-h-[600px] object-contain" 
                      {...props} 
                    />
                  )}
                </div>
              ) : null}
            </div>
          ),
          
          // 美化链接
          a: ({ href, children }) => (
            <a 
              href={href} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-primary hover:underline underline-offset-2 transition-colors"
            >
              {children}
            </a>
          )
        }}
      >
        {content}
      </Markdown>
    </div>
  );
}; 
