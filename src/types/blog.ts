export interface Post {
  title: string;
  slug: string;
  excerpt: string;
  date: string;
  coverImage?: string;
  tags: string[];
  content?: string;
} 