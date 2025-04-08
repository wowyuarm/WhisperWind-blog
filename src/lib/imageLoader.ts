export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  // 获取仓库名称
  const repoName = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : '';
  const isProduction = process.env.NODE_ENV === 'production';
  const basePath = isProduction ? `/${repoName}` : '';

  // 如果src已经是完整的URL，直接返回
  if (src.startsWith('http') || src.startsWith('https')) {
    return src;
  }

  // 如果src已经包含仓库名称，直接返回
  if (isProduction && repoName && src.includes(repoName)) {
    return src;
  }

  // 如果src是相对路径，添加basePath
  if (src.startsWith('/')) {
    // 确保basePath非空时，不重复添加斜杠
    return `${basePath}${src}`;
  }

  // 其他情况，假设是相对路径
  return `${basePath}/${src}`;
} 