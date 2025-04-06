/** @type {import('next').NextConfig} */

const nextConfig = {
  output: 'export',
  trailingSlash: true, // 确保静态导出时URLs以"/"结尾
  images: {
    unoptimized: true,
  },
  eslint: {
    ignoreDuringBuilds: true, // 在构建时忽略ESLint错误
  },
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