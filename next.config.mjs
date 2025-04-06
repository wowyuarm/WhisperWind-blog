/**
 * @type {import('next').NextConfig}
 */

// 获取仓库名称以用于basePath
const repoName = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : '';
const isProduction = process.env.NODE_ENV === 'production';
const basePath = isProduction && repoName ? `/${repoName}` : '';

const nextConfig = {
  output: 'export',
  trailingSlash: true, // 确保静态导出时URLs以"/"结尾
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true, // 在构建时忽略ESLint错误
  },
  // 为GitHub Pages配置正确的基础路径
  basePath: basePath,
  // 为静态资源设置前缀路径
  assetPrefix: basePath,
  // 配置页面生成方式
  exportPathMap: async function() {
    return {
      // 静态页面路径
      '/': { page: '/' },
      '/archive/': { page: '/archive' },
      '/tags/': { page: '/tags' },
      '/about/': { page: '/about' },
      '/links/': { page: '/links' },
      // 标签页和文章页在getStaticPaths中处理
    };
  },
};

export default nextConfig;
