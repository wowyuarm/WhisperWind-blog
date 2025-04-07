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
 * 获取应用的基础路径，用于正确引用静态资源
 * 这个函数在客户端和服务器端都能正确工作
 */
export function getBasePath(): string {
  // 在浏览器环境中，从当前URL提取basePath
  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname;
    // 匹配URL中的仓库名部分，例如从 /WhisperWind-blog/about/ 中提取 /WhisperWind-blog
    const match = pathname.match(/^\/([^\/]+)/);
    return match ? match[0] : '';
  }
  
  // 在服务器环境中，使用环境变量（如果有）
  if (process.env.GITHUB_REPOSITORY) {
    const repoName = process.env.GITHUB_REPOSITORY.split('/')[1];
    return `/${repoName}`;
  }
  
  // 默认返回空字符串
  return '';
}

/**
 * 获取资源的完整URL路径
 * @param path 资源的相对路径，如 /images/avatar.jpg
 */
export function getAssetPath(path: string): string {
  // 如果已经是完整URL，直接返回
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  
  // 确保路径以 / 开头
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // 拼接基础路径和资源路径
  return `${getBasePath()}${normalizedPath}`;
} 