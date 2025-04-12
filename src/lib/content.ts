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
  
  // 提取元数据
  const meta = {
    title: data.title,
    publishDate: data.publishDate || new Date().toISOString(),
    slug: data.slug || path.basename(filePath, '.md'),
    tags: data.tags || [],
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
    .sort((a, b) => (new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()));
  
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
    return parseMarkdownFile(filePath);
  }
  
  // 如果没有直接匹配，遍历所有文件查找匹配的slug
  const fileNames = fs.readdirSync(postsDirectory);
  for (const fileName of fileNames) {
    if (fileName.endsWith('.md')) {
      const filePath = path.join(postsDirectory, fileName);
      const post = parseMarkdownFile(filePath);
      if (post.slug === slug) {
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