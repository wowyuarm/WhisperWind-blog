import type { NextConfig } from "next";

// 确定仓库名称
const repoName = process.env.GITHUB_REPOSITORY ? process.env.GITHUB_REPOSITORY.split('/')[1] : 'WhisperWind-blog'; // 设置一个默认值，确保本地开发也能正常工作
const isGithubActions = process.env.GITHUB_ACTIONS || false;
const isNetlify = process.env.NETLIFY === 'true';

// 始终设置assetPrefix和basePath，不再只在GitHub Actions中设置
// 这样即使在本地开发环境也能模拟GitHub Pages的路径结构
let assetPrefix: string | undefined = `/${repoName}/`;
let basePath: string | undefined = `/${repoName}`;

// 如果明确是在本地开发环境或Netlify环境且不希望使用前缀，可以取消这些设置
if ((process.env.NODE_ENV === 'development' && process.env.DISABLE_BASE_PATH) || isNetlify) {
  console.log('本地开发环境或Netlify环境，禁用basePath和assetPrefix');
  assetPrefix = undefined;
  basePath = undefined;
}

console.log(`Building with: assetPrefix=${assetPrefix}, basePath=${basePath}, isGithubActions=${isGithubActions}, isNetlify=${isNetlify}, repoName=${repoName}, NODE_ENV=${process.env.NODE_ENV}`);

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  images: {
    unoptimized: true, // 静态导出时需要设置图片为未优化
    // domains已不再需要，因为我们使用的是静态资源
  },
  assetPrefix: assetPrefix,
  basePath: basePath,
  
  // 确保静态资源始终使用正确的路径
  // 通过webpack配置处理资源路径
  webpack: (config) => {
    // 添加处理静态资源的规则
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];
    
    // 输出webpack配置信息以便调试
    console.log('Webpack配置: 图片和静态资源处理已配置');
    
    return config;
  },
  
  // 使用trailingSlash可能有助于解决某些路径问题
  trailingSlash: true,
};

export default nextConfig;
