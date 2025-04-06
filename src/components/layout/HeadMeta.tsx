import Head from 'next/head';
import { SiteConfig } from '@/lib/config';

interface HeadMetaProps {
  title?: string;
  description?: string;
  ogImage?: string;
  siteConfig: SiteConfig;
}

export function HeadMeta({ 
  title, 
  description, 
  ogImage, 
  siteConfig 
}: HeadMetaProps) {
  const siteTitle = siteConfig?.title || '🍃WhisperWind Blog';
  const siteDescription = description || siteConfig?.description || '一个具有吉卜力风格的开源博客模板';
  const ogImg = ogImage || siteConfig?.logo || '/images/logo.png';
  
  // 构建标题: 如果提供了自定义标题，则使用"自定义标题 - 网站标题"的格式
  const fullTitle = title ? `${title} - ${siteTitle}` : siteTitle;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={siteDescription} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={siteDescription} />
      <meta property="og:image" content={ogImg} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={siteDescription} />
      <meta name="twitter:image" content={ogImg} />
    </Head>
  );
} 