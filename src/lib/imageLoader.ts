export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
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
  
  // 调试日志
  if (isBrowser) {
    console.debug(`[imageLoader] src=${src}, isProduction=${isProduction}, repoName=${repoName}, basePath=${basePath}`);
  }

  // 如果src已经是完整的URL，直接返回
  if (src.startsWith('http') || src.startsWith('https')) {
    return src;
  }

  // 如果src已经包含仓库名称，直接返回
  if (isProduction && repoName && src.includes(repoName)) {
    return src;
  }

  // 确保src以"/"开头
  const normalizedSrc = src.startsWith('/') ? src : `/${src}`;
  
  // 返回完整路径
  return `${basePath}${normalizedSrc}`;
} 