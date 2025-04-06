'use client';

import { useState, useRef } from 'react';
import { CopyIcon, CheckIcon } from '@radix-ui/react-icons';
import { cn } from '@/lib/utils';

type CodeBlockProps = {
  language: string;
  value: string | any;
  className?: string;
};

export const CodeBlock = ({ language, value, className, ...props }: CodeBlockProps) => {
  const [copied, setCopied] = useState(false);
  const codeRef = useRef<HTMLElement>(null);
  
  // 智能处理代码内容
  const processCodeContent = (content: any): string => {
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
      if ('props' in content && content.props && 'children' in content.props) {
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
  
  const codeContent = processCodeContent(value);
  
  const handleCopy = async () => {
    if (codeRef.current) {
      try {
        await navigator.clipboard.writeText(codeRef.current.textContent || '');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy code', err);
      }
    }
  };
  
  return (
    <div className="my-6 relative">
      {/* 语言标签和复制按钮行 */}
      <div className="flex items-center justify-between rounded-t-md bg-primary/5 px-4 py-2 text-xs border-t border-l border-r border-border">
        <span className="font-medium text-primary/80">
          {language}
        </span>
        <button 
          onClick={handleCopy}
          className={cn(
            "p-1.5 rounded-full",
            "bg-background/50 hover:bg-background/80 transition-colors",
            "focus:outline-none focus:ring-1 focus:ring-primary/30",
            copied ? "text-green-500" : "text-muted-foreground"
          )}
          aria-label={copied ? "代码已复制" : "复制代码"}
          title={copied ? "代码已复制" : "复制代码"}
        >
          {copied ? <CheckIcon className="h-3.5 w-3.5" /> : <CopyIcon className="h-3.5 w-3.5" />}
        </button>
      </div>
      
      {/* 代码内容 */}
      <pre 
        className={cn(
          "overflow-x-auto rounded-b-md bg-card/30 p-4 border border-t-0 border-border",
          className
        )}
        {...props}
      >
        <code
          ref={codeRef}
          className={`language-${language} text-sm`}
        >
          {codeContent}
        </code>
      </pre>
    </div>
  );
};