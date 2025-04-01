import { Layout } from "@/components/layout/Layout";
import { getAllPostMetas } from "@/lib/content";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export const metadata = {
  title: "标签云 - WhisperWind Blog",
  description: "浏览所有文章标签，按标签分类查看内容",
};

export default function TagsPage() {
  // 获取所有文章的元数据
  const posts = getAllPostMetas();
  
  // 统计标签及其对应的文章数量
  const tagCounts: Record<string, number> = {};
  
  posts.forEach(post => {
    if (post.tags && Array.isArray(post.tags)) {
      post.tags.forEach(tag => {
        if (tag in tagCounts) {
          tagCounts[tag]++;
        } else {
          tagCounts[tag] = 1;
        }
      });
    }
  });
  
  // 按照文章数量排序标签
  const sortedTags = Object.entries(tagCounts).sort((a, b) => b[1] - a[1]);
  
  return (
    <Layout>
      <div className="py-8 md:py-12">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">标签云</h1>
          <div className="w-20 h-1 bg-primary rounded-full mb-6"></div>
          <p className="text-muted-foreground mb-8 max-w-3xl">
            通过标签浏览文章，点击标签查看相关文章列表。
            标签大小代表相关文章的数量。
          </p>
        </div>
        
        {sortedTags.length > 0 ? (
          <div className="flex flex-wrap gap-3">
            {sortedTags.map(([tag, count]) => {
              // 根据文章数量决定标签的样式大小
              const sizeClass = count > 5 ? "text-xl" : count > 3 ? "text-lg" : "text-base";
              
              return (
                <Link key={tag} href={`/tags/${encodeURIComponent(tag)}`}>
                  <Badge 
                    className={`${sizeClass} px-3 py-1.5 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors`}
                    variant="outline"
                  >
                    {tag} <span className="ml-1.5 opacity-70">({count})</span>
                  </Badge>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="p-8 text-center border border-dashed rounded-lg">
            <h3 className="text-xl font-medium mb-2">暂无标签</h3>
            <p className="text-muted-foreground">
              目前还没有任何文章标签。发布带有标签的文章后，标签将显示在这里。
            </p>
          </div>
        )}
      </div>
    </Layout>
  );
} 