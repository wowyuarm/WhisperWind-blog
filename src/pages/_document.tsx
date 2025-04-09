import { Html, Head, Main, NextScript } from 'next/document';
import { getSiteConfig } from '@/lib/config';

export default function Document() {
  // 注意：_document.tsx中不能使用hooks和React上下文
  // 我们使用HeadMeta组件在各个页面中动态设置页面标题、描述和favicon
  
  // 获取仓库名称以用于basePath
  const repoName = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : '';
  const isProduction = process.env.NODE_ENV === 'production';
  const basePath = isProduction && repoName ? `/${repoName}` : '';
  
  // 构建基础URL，注意结尾的斜杠，<base>标签需要
  const baseUrl = isProduction && repoName
    ? `https://wowyuarm.github.io/${repoName}/` 
    : '/';
  
  return (
    <Html lang="zh-CN"> {/* 设置全局语言 */}
      <Head>
        {/* 设置Base URL以确保所有相对路径正确 */}
        <base href={baseUrl} />
        
        {/* 在这里可以添加自定义字体链接、全局meta标签等 */}
        {/* 页面特定的metadata和favicon已在各页面HeadMeta组件中设置 */}
        {/* Favicon配置 - 使用相对路径 */}
        <link rel="icon" href="favicon.ico" sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href="favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png" />
        <link rel="apple-touch-icon" href="apple-touch-icon.png" />
        <link rel="manifest" href="site.webmanifest" />
        <meta name="theme-color" content="#ffffff" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
} 