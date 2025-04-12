import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  // 注意：_document.tsx中不能使用hooks和React上下文
  // 我们使用HeadMeta组件在各个页面中动态设置页面标题、描述和favicon
  
  // 获取仓库名称以用于basePath
  const repoName = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : '';
  const isProduction = process.env.NODE_ENV === 'production';
  const basePath = isProduction && repoName ? `/${repoName}` : '';
  
  return (
    <Html lang="zh-CN"> {/* 设置全局语言 */}
      <Head>
        {/* 在这里可以添加自定义字体链接、全局meta标签等 */}
        {/* 页面特定的metadata和favicon已在各页面HeadMeta组件中设置 */}
        {/* Favicon配置 - 使用包含basePath的绝对路径 */}
        <link rel="icon" href={`${basePath}/favicon.ico`} sizes="any" />
        <link rel="icon" type="image/png" sizes="32x32" href={`${basePath}/favicon-32x32.png`} />
        <link rel="icon" type="image/png" sizes="16x16" href={`${basePath}/favicon-16x16.png`} />
        <link rel="apple-touch-icon" href={`${basePath}/apple-touch-icon.png`} />
        {/* Manifest链接将在客户端动态设置 */}
        {/* <link rel="manifest" href={`${basePath}/site.webmanifest`} /> */}
        <meta name="theme-color" content="#ffffff" />

        {/* Preload 字体文件，使用带basePath的路径 */}
        <link
          rel="preload"
          href={`${basePath}/fonts/Ghibli.otf`}
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href={`${basePath}/fonts/Ghibli-Bold.otf`}
          as="font"
          type="font/otf"
          crossOrigin="anonymous"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
} 