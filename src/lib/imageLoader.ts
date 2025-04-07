import { getBasePath } from './utils';

export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  // 如果src已经是完整的URL，直接返回
  if (src.startsWith('http') || src.startsWith('https')) {
    return src;
  }
  
  // 获取运行时的基础路径
  const basePath = getBasePath();
  
  // 如果src是以/开头的绝对路径，添加basePath
  if (src.startsWith('/')) {
    return `${basePath}${src}`;
  }
  
  // 其他情况，作为相对路径处理
  return `${basePath}/${src}`;
} 