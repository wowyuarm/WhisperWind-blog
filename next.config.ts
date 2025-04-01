import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'export',
  images: {
    unoptimized: true, // 静态导出时需要设置图片为未优化
  }
};

export default nextConfig;
