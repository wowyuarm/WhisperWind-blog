export default function imageLoader({ src }: { src: string }): string {
  const isBrowser = typeof window !== 'undefined';
  let repoName = '';
  let isProduction = false;

  if (isBrowser) {
    const hostname = window.location.hostname;
    isProduction = hostname.includes('github.io');
    if (isProduction) {
      const pathSegments = window.location.pathname.split('/').filter(Boolean);
      if (pathSegments.length > 0) {
        repoName = pathSegments[0];
      }
    }
  } else {
    // 服务器端（构建时）
    repoName = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : '';
    isProduction = process.env.NODE_ENV === 'production';
  }

  const basePath = isProduction && repoName ? `/${repoName}` : '';

  // 调试日志
  console.debug(`[imageLoader] Input src=${src}, isProduction=${isProduction}, repoName=${repoName}, basePath=${basePath}`);

  // 已经是绝对 URL
  if (src.startsWith('http') || src.startsWith('https')) {
    console.debug(`[imageLoader] Returning absolute URL: ${src}`);
    return src;
  }

  // 已经是带 basePath 的路径
  if (isProduction && repoName && src.startsWith(basePath)) {
    console.debug(`[imageLoader] Returning already prefixed path: ${src}`);
    return src;
  }

  // 确保 src 以 "/" 开头
  const normalizedSrc = src.startsWith('/') ? src : `/${src}`;
  const finalPath = `${basePath}${normalizedSrc}`;

  console.debug(`[imageLoader] Returning constructed path: ${finalPath}`);
  return finalPath;
} 