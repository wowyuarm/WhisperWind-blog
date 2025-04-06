import type { NextConfig } from "next";

const repoName = 'WhisperWind-blog'; // Your repository name
const isGithubActions = process.env.GITHUB_ACTIONS || false;

let assetPrefix = undefined;
let basePath = undefined;

if (isGithubActions) {
  // Set assetPrefix and basePath only when deploying via GitHub Actions
  assetPrefix = `/${repoName}/`;
  basePath = `/${repoName}`;
}

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  images: {
    unoptimized: true, // 静态导出时需要设置图片为未优化
  },
  assetPrefix: assetPrefix, // Add assetPrefix
  basePath: basePath,       // Add basePath
};

export default nextConfig;
