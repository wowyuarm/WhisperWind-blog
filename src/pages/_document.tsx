import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="zh-CN"> {/* 设置全局语言 */}
      <Head>
        {/* 在这里可以添加自定义字体链接、meta标签等 */}
        {/* 例如，如果 ghibli-font.css 不需要全局导入，可以在这里链接 */}
        {/* <link rel="stylesheet" href="/fonts/ghibli-font.css" /> */}
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
} 