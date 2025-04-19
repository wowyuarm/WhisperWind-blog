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
  featuredImage?: string | null;
  excerpt?: string;
}

export interface Post extends PostMeta {
  content: string;
}

/**
 * 从Markdown文件中获取元数据和内容
 */
function parseMarkdownFile(filePath: string): Post {
  try {
    // 读取文件内容时明确指定编码为UTF-8
    const fileContents = fs.readFileSync(filePath, 'utf8');
    
    // 尝试规范化文件内容编码，处理可能存在的BOM等问题
    const normalizedContent = fileContents.replace(/^\uFEFF/, '');
    
    // 使用gray-matter解析frontmatter
    const { data, content } = matter(normalizedContent);
    
    // 安全获取日期，并确保返回 ISO 字符串
    const getValidDate = (dateInput: string | Date | undefined): string => {
      // 如果输入为空，返回当前日期的 ISO 字符串
      if (!dateInput) {
        console.warn(`Missing date in ${filePath}, using current date instead`);
        return new Date().toISOString();
      }
      
      let date: Date;

      try {
        // 尝试将输入（无论是字符串还是日期对象）转换为 Date 对象
        date = new Date(dateInput);

        // 检查转换后的日期是否有效
        if (isNaN(date.getTime())) {
          console.warn(`Invalid date format or value in ${filePath}: "${dateInput}", using current date instead`);
          return new Date().toISOString(); // 无效则返回当前日期的 ISO 字符串
        }

        // 如果日期有效，返回其 ISO 字符串表示
        return date.toISOString();

      } catch (error) {
        // 如果在 new Date() 构造过程中出现任何错误
        console.error(`Error constructing date in ${filePath} from input "${dateInput}":`, error);
        return new Date().toISOString(); // 出错则返回当前日期的 ISO 字符串
      }
    };
    
    // 确保标签是数组
    const getTags = (tags: unknown) => {
      if (!tags) return [];
      if (Array.isArray(tags)) return tags.filter(tag => tag && typeof tag === 'string');
      if (typeof tags === 'string') return [tags];
      console.warn(`Invalid tags format in ${filePath}:`, tags);
      return [];
    };
    
    // 提取元数据
    const meta = {
      title: data.title || path.basename(filePath, '.md'),
      publishDate: getValidDate(data.publishDate),
      slug: data.slug || path.basename(filePath, '.md'),
      tags: getTags(data.tags),
      featuredImage: data.featuredImage || null,
      excerpt: data.excerpt || content.trim().split('\n')[0].slice(0, 150),
    };
    
    return {
      ...meta,
      content
    };
  } catch (error) {
    console.error(`Error parsing markdown file ${filePath}:`, error);
    // 提供一个基本的后备对象而不是让操作完全失败
    return {
      title: path.basename(filePath, '.md'),
      publishDate: new Date().toISOString(),
      slug: path.basename(filePath, '.md'),
      tags: [],
      content: '内容解析出错'
    };
  }
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
  
  try {
    // 读取目录中的所有文件
    const fileNames = fs.readdirSync(postsDirectory);
    const allPosts = fileNames
      .filter((fileName) => fileName.endsWith('.md'))
      .map((fileName) => {
        try {
          const filePath = path.join(postsDirectory, fileName);
          return parseMarkdownFile(filePath);
        } catch (error) {
          console.error(`Error processing file ${fileName}:`, error);
          // 提供后备对象
          return {
            title: fileName.replace('.md', ''),
            publishDate: new Date().toISOString(),
            slug: fileName.replace('.md', ''),
            tags: [],
            content: '内容处理出错'
          };
        }
      })
      .sort((a, b) => {
        try {
          const dateA = new Date(a.publishDate).getTime();
          const dateB = new Date(b.publishDate).getTime();
          
          // 验证日期有效性
          if (isNaN(dateA) || isNaN(dateB)) {
            console.warn(`Invalid date comparison: ${a.publishDate} vs ${b.publishDate}`);
            return 0; // 保持顺序不变
          }
          
          return dateB - dateA;
        } catch (error) {
          console.error('Date comparison error:', error);
          return 0; // 保持顺序不变
        }
      });
    
    return allPosts;
  } catch (error) {
    console.error('Error reading posts directory:', error);
    return [];
  }
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
      featuredImage: meta.featuredImage ? `${basePath}${meta.featuredImage}` : null,
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
