import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * 合并Tailwind CSS类名
 * 使用clsx和tailwind-merge来合并和处理类名冲突
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * 格式化日期为中文格式
 * @param dateString 日期字符串
 * @returns 格式化后的日期字符串
 */
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("zh-CN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

/**
 * 处理图片路径，确保添加正确的仓库前缀
 * 在GitHub Pages环境下，给图片路径添加仓库名称前缀
 *
 * @param path 图片路径
 * @returns 处理后的路径
 */
export function processImagePath(path: string | undefined | null): string {
  if (!path) return '/images/logo.png'; // 如果没有路径，返回默认图片
  
  // 如果已经是完整URL，直接返回
  if (path.startsWith('http') || path.startsWith('https')) {
    return path;
  }
  
  // 判断是否在GitHub Pages环境中
  const isBrowser = typeof window !== 'undefined';
  console.log(`[processImagePath] isBrowser: ${isBrowser}`);
  
  let repoName = '';
  let isProduction = false;
  
  if (isBrowser) {
    const hostname = window.location.hostname;
    isProduction = hostname.includes('github.io');
    console.log(`[processImagePath] Browser环境: hostname=${hostname}, isProduction=${isProduction}`);
    
    if (isProduction) {
      const pathSegments = window.location.pathname.split('/');
      console.log(`[processImagePath] 路径段: ${JSON.stringify(pathSegments)}`);
      if (pathSegments.length > 1) {
        repoName = pathSegments[1];
      }
    }
  } else {
    // 服务器端环境
    repoName = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : '';
    isProduction = process.env.NODE_ENV === 'production';
    console.log(`[processImagePath] 服务器环境: GITHUB_REPOSITORY=${process.env.GITHUB_REPOSITORY}, repoName=${repoName}, NODE_ENV=${process.env.NODE_ENV}, isProduction=${isProduction}`);
  }
  
  // 确保path以"/"开头
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // 如果路径已经包含仓库名，直接返回
  if (isProduction && repoName && normalizedPath.startsWith(`/${repoName}/`)) {
    console.log(`[processImagePath] 路径已包含仓库名，直接返回: ${normalizedPath}`);
    return normalizedPath;
  }
  
  // 添加仓库名前缀（如果在GitHub Pages环境中）
  const finalPath = isProduction && repoName ? `/${repoName}${normalizedPath}` : normalizedPath;
  
  // 调试输出
  console.log(`[utils.processImagePath] 输入路径: ${path} -> 最终路径: ${finalPath} (isProduction=${isProduction}, repoName=${repoName})`);
  
  return finalPath;
} 