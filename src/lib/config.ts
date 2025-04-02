import fs from 'fs';
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

/**
 * 获取网站配置
 */
export function getSiteConfig(): SiteConfig {
  try {
    const configPath = path.join(process.cwd(), 'src/content/config.json');
    
    if (fs.existsSync(configPath)) {
      const fileContents = fs.readFileSync(configPath, 'utf8');
      return JSON.parse(fileContents) as SiteConfig;
    }
    
    // 如果配置文件不存在，返回默认配置
    return {
      title: 'WhisperWind Blog',
      description: '一个具有吉卜力风格的开源博客模板',
      author: '禹创',
      social: {
        github: 'https://github.com/wowyuarm/WhisperWind-blog'
      }
    };
  } catch (error) {
    console.error('读取配置文件失败:', error);
    
    // 返回默认配置
    return {
      title: 'WhisperWind Blog',
      description: '一个具有吉卜力风格的开源博客模板',
      author: '禹创',
      social: {
        github: 'https://github.com/wowyuarm/WhisperWind-blog'
      }
    };
  }
}

/**
 * 获取友情链接
 */
export function getFriendLinks(): FriendLink[] {
  try {
    const linksPath = path.join(process.cwd(), 'src/content/links.json');
    
    if (fs.existsSync(linksPath)) {
      const fileContents = fs.readFileSync(linksPath, 'utf8');
      const data = JSON.parse(fileContents) as LinksConfig;
      return data.links || [];
    }
    
    return [];
  } catch (error) {
    console.error('读取友链文件失败:', error);
    return [];
  }
} 