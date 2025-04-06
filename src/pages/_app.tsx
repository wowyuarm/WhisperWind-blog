import type { AppProps } from 'next/app';
import { Layout } from '@/components/layout/Layout'; // 确认 Layout 路径正确
import { MotionConfig } from 'framer-motion';
import '@/styles/globals.css'; // 使用新的CSS路径
import '@/styles/ghibli-font.css'; // Load the local font CSS
import { useEffect } from 'react';
// import { getSiteConfig } from '@/lib/config'; // Removed unused import
// import { SiteConfig } from '@/lib/config'; // Removed unused type import
// import { NextComponentType, NextPageContext } from 'next'; // Removed unused imports

// 这里可以导入字体，如果需要的话
// import '@/styles/ghibli-font.css'; // 如果 ghibli-font.css 需要全局加载

// Define a type for the Component that includes optional layout props
type ComponentWithLayoutProps = AppProps['Component'] & {
  showHeader?: boolean;
  showFooter?: boolean;
}

// Define the AppProps with the extended Component type
type MyAppProps = AppProps & {
  Component: ComponentWithLayoutProps;
}

function MyApp({ Component, pageProps }: MyAppProps) {
  // Assume siteConfig is always provided by getStaticProps for regular pages
  // For 404 or other error pages, siteConfig might be undefined.
  // Layout/Footer components need to handle undefined siteConfig gracefully.
  const siteConfig = pageProps.siteConfig;

  const showHeader = Component.showHeader !== false;
  const showFooter = Component.showFooter !== false;

  // 初始化Netlify Identity Widget
  useEffect(() => {
    // 检查window对象是否存在（在服务器端渲染时不存在）
    if (typeof window !== 'undefined') {
      // 动态导入netlify-identity-widget
      import('netlify-identity-widget').then(({ default: netlifyIdentity }) => {
        netlifyIdentity.init();

        // 处理登录后重定向
        if (window.location.hash.includes('#confirmation_token=') ||
            window.location.hash.includes('#access_token=')) {
          const adminPath = '/admin/';
          if (!window.location.pathname.endsWith(adminPath)) {
            // 获取GitHub Pages的正确路径
            const basePath = window.location.hostname.includes('github.io') 
              ? '/WhisperWind-blog' 
              : '';
            window.location.href = `${basePath}${adminPath}`;
          }
        }
      }).catch(err => {
        console.error('Failed to load netlify identity widget:', err);
      });
    }
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      {/* Pass siteConfig to Layout */}
      <Layout siteConfig={siteConfig} showHeader={showHeader} showFooter={showFooter}>
        <Component {...pageProps} />
      </Layout>
    </MotionConfig>
  );
}

export default MyApp; 