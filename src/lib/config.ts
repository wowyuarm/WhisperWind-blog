import path from 'path';

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
  logo?: string;
  social: SocialLinks;
}

export interface FriendLink {
  name: string;
  url: string;
  description?: string;
  icon?: string;
}

export interface LinksConfig {
  links: FriendLink[];
}

// 默认配置，将在客户端和服务端都可用
const defaultSiteConfig: SiteConfig = {
  title: 'WhisperWind Blog',
  description: '一个具有吉卜力风格的开源博客模板',
  author: '禹创',
  social: {
    github: 'https://github.com/wowyuarm/WhisperWind-blog'
  }
};

// 默认友情链接
const defaultFriendLinks: FriendLink[] = [];

/**
 * 获取网站配置
 */
export function getSiteConfig(): SiteConfig {
  // 当在浏览器环境中运行时，直接返回默认配置
  if (typeof window !== 'undefined') {
    return defaultSiteConfig;
  }

  // 以下代码只在服务器端运行
  try {
    // 动态导入fs，只在服务器端使用
    const fs = require('fs');
    const configPath = path.join(process.cwd(), 'src/content/config.json');
    
    if (fs.existsSync(configPath)) {
      const fileContents = fs.readFileSync(configPath, 'utf8');
      return JSON.parse(fileContents) as SiteConfig;
    }
    
    // 如果配置文件不存在，返回默认配置
    return defaultSiteConfig;
  } catch (error) {
    console.error('读取配置文件失败:', error);
    
    // 返回默认配置
    return defaultSiteConfig;
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
    // 动态导入fs，只在服务器端使用
    const fs = require('fs');
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