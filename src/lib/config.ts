import path from 'path';
import { useRouter } from 'next/router'

interface SocialLinks {
  github?: string;
  twitter?: string;
  weibo?: string;
  zhihu?: string;
  [key: string]: string | undefined;
}

export interface SiteConfig {
  title: string;
  description: string;
  author: string;
  logo?: string | null;
  favicon?: string | null;
  social: SocialLinks;
  avatar?: string | null;
}

export interface FriendLink {
  name: string;
  url: string;
  description?: string;
  icon?: string;
  type?: 'personal' | 'official';
}

export interface LinksConfig {
  links: FriendLink[];
}

// 默认配置，将在客户端和服务端都可用
export const defaultSiteConfig: SiteConfig = {
  title: '🍃WhisperWind Blog',
  description: '一个具有吉卜力风格的开源博客模板',
  author: '禹创',
  logo: '/images/logo.png',
  favicon: '/favicon.ico',
  social: {
    github: 'https://github.com/wowyuarm/WhisperWind-blog'
  },
  avatar: '/images/avatar.jpg',
};

// 默认友情链接
const defaultFriendLinks: FriendLink[] = [];

let fs: any;
if (typeof window === 'undefined') {
  // Only import fs in server-side context
  fs = require('fs');
}

/**
 * 获取网站配置
 */
export function getSiteConfig(): SiteConfig {
  const basePath = process.env.NODE_ENV === 'production' && process.env.GITHUB_REPOSITORY
    ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}`
    : '';

  // 处理默认配置
  const processConfig = (config: SiteConfig) => ({
    ...config,
    avatar: config.avatar ? `${basePath}${config.avatar}` : null,
    favicon: config.favicon ? `${basePath}${config.favicon}` : null,
  });

  // 当在浏览器环境中运行时，返回处理过的默认配置
  if (typeof window !== 'undefined') {
    return processConfig(defaultSiteConfig);
  }

  // 以下代码只在服务器端运行
  try {
    const configPath = path.join(process.cwd(), 'src/content/config.json');
    
    if (fs.existsSync(configPath)) {
      const fileContents = fs.readFileSync(configPath, 'utf8');
      const config = JSON.parse(fileContents) as SiteConfig;
      return processConfig(config);
    }
    
    return processConfig(defaultSiteConfig);
  } catch (error) {
    console.error('读取配置文件失败:', error);
    return processConfig(defaultSiteConfig);
  }
}

/**
 * 获取友情链接
 */
export function getFriendLinks(): FriendLink[] {
  // 当在浏览器环境中运行时，直接返回默认链接
  if (typeof window !== 'undefined') {
    return defaultFriendLinks;
  }

  // 以下代码只在服务器端运行
  try {
    const linksPath = path.join(process.cwd(), 'src/content/links.json');
    
    if (fs.existsSync(linksPath)) {
      const fileContents = fs.readFileSync(linksPath, 'utf8');
      const data = JSON.parse(fileContents) as LinksConfig;
      return data.links || [];
    }
    
    return defaultFriendLinks;
  } catch (error) {
    console.error('读取友链文件失败:', error);
    return defaultFriendLinks;
  }
} 