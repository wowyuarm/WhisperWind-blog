import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeStringify from 'rehype-stringify';
import remarkGfm from 'remark-gfm';

const postsDirectory = path.join(process.cwd(), 'src/content/posts');
const pagesDirectory = path.join(process.cwd(), 'src/content/pages');

export interface PostMeta {
  title: string;
  publishDate: string;
  slug: string;
  tags?: string[];
  featuredImage?: string;
  excerpt?: string;
}

export interface Post extends PostMeta {
  content: string;
}

/**
 * 从Markdown文件中获取元数据和内容
 */
function parseMarkdownFile(filePath: string): Post {
  // 读取文件内容时明确指定编码为UTF-8
  const fileContents = fs.readFileSync(filePath, 'utf8');
  
  // 尝试规范化文件内容编码，处理可能存在的BOM等问题
  const normalizedContent = fileContents.replace(/^\uFEFF/, '');
  
  // 使用gray-matter解析frontmatter
  const { data, content } = matter(normalizedContent);
  
  // 处理tags字段，支持多种格式
  let tags: string[] = [];
  if (data.tags) {
    // 如果已经是数组，处理数组中的每一项
    if (Array.isArray(data.tags)) {
      // 处理数组中每一项，解析可能包含分隔符的标签
      const processedTags: string[] = [];
      data.tags.forEach(tag => {
        if (typeof tag === 'string') {
          // 先尝试用中文顿号"、"分割
          if (tag.includes('、')) {
            const splitTags = tag.split('、').map(t => t.trim()).filter(Boolean);
            processedTags.push(...splitTags);
          } 
          // 再尝试用英文逗号","分割
          else if (tag.includes(',')) {
            const splitTags = tag.split(',').map(t => t.trim()).filter(Boolean);
            processedTags.push(...splitTags);
          }
          // 如果没有分隔符，作为单个标签
          else {
            processedTags.push(tag.trim());
          }
        } else if (tag) {
          // 处理非字符串标签
          processedTags.push(String(tag).trim());
        }
      });
      tags = processedTags;
    } 
    // 如果是字符串，可能包含分隔符，尝试分割
    else if (typeof data.tags === 'string') {
      // 先尝试用中文顿号"、"分割
      if (data.tags.includes('、')) {
        tags = data.tags.split('、').map(tag => tag.trim()).filter(Boolean);
      } 
      // 再尝试用英文逗号","分割
      else if (data.tags.includes(',')) {
        tags = data.tags.split(',').map(tag => tag.trim()).filter(Boolean);
      }
      // 如果没有分隔符，作为单个标签
      else {
        tags = [data.tags.trim()];
      }
    }
  }
  
  // 处理发布日期，确保始终是字符串格式
  let publishDate = data.publishDate || new Date().toISOString();
  if (typeof publishDate !== 'string') {
    publishDate = String(publishDate);
  }
  
  // 提取元数据
  const meta = {
    title: data.title,
    publishDate,  // 使用处理后的日期
    slug: data.slug || path.basename(filePath, '.md'),
    tags: tags,
    featuredImage: data.featuredImage || null,
    excerpt: data.excerpt || content.trim().split('\n')[0].slice(0, 150),
  };
  
  return {
    ...meta,
    content
  };
}

/**
 * 获取所有文章
 */
export function getAllPosts(): Post[] {
  // 确保目录存在
  if (!fs.existsSync(postsDirectory)) {
    fs.mkdirSync(postsDirectory, { recursive: true });
    return [];
  }
  
  // 读取目录中的所有文件
  const fileNames = fs.readdirSync(postsDirectory);
  const allPosts = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const filePath = path.join(postsDirectory, fileName);
      return parseMarkdownFile(filePath);
    })
    .sort((a, b) => {
      // 确保使用字符串日期进行比较，避免返回Date对象
      const dateA = new Date(b.publishDate).getTime();
      const dateB = new Date(a.publishDate).getTime();
      return dateA - dateB;
    });
  
  return allPosts;
}

/**
 * 获取指定slug的文章
 */
export function getPostBySlug(slug: string): Post | null {
  // 确保目录存在
  if (!fs.existsSync(postsDirectory)) {
    return null;
  }
  
  // 尝试直接匹配文件名
  const filePath = path.join(postsDirectory, `${slug}.md`);
  if (fs.existsSync(filePath)) {
    const post = parseMarkdownFile(filePath);
    // 确保publishDate是字符串
    if (typeof post.publishDate !== 'string') {
      post.publishDate = String(post.publishDate);
    }
    return post;
  }
  
  // 如果没有直接匹配，遍历所有文件查找匹配的slug
  const fileNames = fs.readdirSync(postsDirectory);
  for (const fileName of fileNames) {
    if (fileName.endsWith('.md')) {
      const filePath = path.join(postsDirectory, fileName);
      const post = parseMarkdownFile(filePath);
      if (post.slug === slug) {
        // 确保publishDate是字符串
        if (typeof post.publishDate !== 'string') {
          post.publishDate = String(post.publishDate);
        }
        return post;
      }
    }
  }
  
  return null;
}

/**
 * 获取所有文章的元数据
 */
export function getAllPostMetas(): PostMeta[] {
  const basePath = process.env.NODE_ENV === 'production' && process.env.GITHUB_REPOSITORY
    ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}`
    : '';

  const posts = getAllPosts();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  return posts.map(({ content: _, ...meta }) => {
    // 确保publishDate是字符串格式
    if (typeof meta.publishDate !== 'string') {
      meta.publishDate = String(meta.publishDate);
    }
    return {
      ...meta,
      featuredImage: meta.featuredImage ? `${basePath}${meta.featuredImage}` : undefined,
    };
  });
}

/**
 * 将Markdown转换为HTML
 * @deprecated Use react-markdown component instead for client-side rendering.
 */
export async function markdownToHtml(markdown: string): Promise<string> {
  const result = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeStringify)
    .process(markdown);
  
  return result.toString();
}

/**
 * 获取单页面内容
 */
export function getPageContent(slug: string): Post | null {
  // 确保目录存在
  if (!fs.existsSync(pagesDirectory)) {
    fs.mkdirSync(pagesDirectory, { recursive: true });
    return null;
  }
  
  const filePath = path.join(pagesDirectory, `${slug}.md`);
  if (fs.existsSync(filePath)) {
    return parseMarkdownFile(filePath);
  }
  
  return null;
} 