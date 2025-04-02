import { Layout } from "@/components/layout/Layout";
import { Badge } from "@/components/ui/badge";
import { getPostBySlug, getAllPostMetas } from "@/lib/content";
import { formatDate } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Suspense } from "react";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import Image from "next/image";

// 定义 Props 类型
interface PostPageProps {
  params: {
    slug: string;
  };
}

// Temporarily remove generateStaticParams
// export async function generateStaticParams(): Promise<PostPageProps['params'][]> {
//   const posts = getAllPostMetas();
//   return posts.map((post) => ({
//     slug: post.slug,
//   }));
// }

// // 生成页面元数据 (Temporarily commented out for debugging)
// export function generateMetadata({ params }: PostPageProps) {
//   const post = getPostBySlug(params.slug);
  
//   if (!post) {
//     return {
//       title: "文章未找到 - WhisperWind Blog",
//       description: "您查找的文章不存在或已被删除",
//     };
//   }
  
//   return {
//     title: `${post.title} - WhisperWind Blog`,
//     description: post.excerpt || "阅读WhisperWind Blog的最新文章",
//   };
// }

export default function PostPage({ params }: PostPageProps) {
  return (
    <Layout>
      <div>
        <h1>Post Slug (Simplified): {params.slug}</h1>
        <p>This is a simplified page for debugging build errors.</p>
      </div>
    </Layout>
  );
}