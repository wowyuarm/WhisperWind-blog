/** @type {import('next').NextConfig} */

// 获取仓库名称以用于basePath
const repoName = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : '';
const branchName = process.env.GITHUB_REF ? process.env.GITHUB_REF.split('/').pop() : '';
const isProduction = process.env.NODE_ENV === 'production';
const basePath = isProduction && repoName ? `/${repoName}` : '';

// 日志输出，帮助调试
if (isProduction) {
  console.log(`Building for GitHub Pages: BasePath = ${basePath}, RepoName = ${repoName}`);
}

const nextConfig = {
  output: 'export',
  trailingSlash: true, // 确保静态导出时URLs以"/"结尾
  images: {
    unoptimized: true, // 使用未优化的图片，避免Next.js图片优化带来的复杂性
    loader: 'custom',
    loaderFile: './src/lib/imageLoader.ts',
    domains: ['wowyuarm.github.io'], // 允许来自GitHub Pages的图片
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'wowyuarm.github.io',
      },
    ],
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
}

module.exports = nextConfig; 