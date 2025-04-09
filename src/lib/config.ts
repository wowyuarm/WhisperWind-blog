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
  author: 'Your Name',
  logo: '/images/logo.png',
  favicon: '/favicon.ico',
  social: {
    github: 'https://github.com/yourusername/WhisperWind-blog',
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
  // 检测是否在客户端
  const isBrowser = typeof window !== 'undefined';
  
  // 从环境变量或window.location获取仓库名称
  let repoName = '';
  let isProduction = false;
  
  if (isBrowser) {
    // 客户端环境，从URL检测 - 必须同时满足hostname包含github.io
    // 避免localhost开发环境被误判为生产环境
    const hostname = window.location.hostname;
    isProduction = hostname.includes('github.io');
    
    if (isProduction && hostname !== 'localhost' && !hostname.includes('127.0.0.1')) {
      // 从路径提取仓库名称
      const pathSegments = window.location.pathname.split('/');
      if (pathSegments.length > 1) {
        repoName = pathSegments[1]; // 通常是第二个路径部分
      }
    }
  } else {
    // 服务器端环境，使用环境变量
    repoName = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : '';
    isProduction = process.env.NODE_ENV === 'production';
  }
  
  const basePath = isProduction ? `/${repoName}` : '';

  // 处理默认配置
  const processConfig = (config: SiteConfig) => {
    // 确保路径正确，无论是开发环境还是生产环境
    const processPath = (path: string | null | undefined) => {
      if (!path) return null;
      
      // 如果已经是完整URL，直接返回
      if (path.startsWith('http') || path.startsWith('https')) {
        return path;
      }
      
      // 如果已经包含仓库名称，直接返回
      if (isProduction && repoName && path.includes(repoName)) {
        return path;
      }
      
      // 确保path以"/"开头
      const normalizedPath = path.startsWith('/') ? path : `/${path}`;
      
      // 添加basePath前缀
      return `${basePath}${normalizedPath}`;
    };
    
    return {
      ...config,
      avatar: processPath(config.avatar),
      favicon: processPath(config.favicon),
      logo: processPath(config.logo),
    };
  };

  // 当在浏览器环境中运行时，返回处理过的默认配置
  if (isBrowser) {
    console.debug(`[config] isProduction=${isProduction}, repoName=${repoName}, basePath=${basePath}`);
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