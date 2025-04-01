import { Layout } from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <Layout>
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <h1 className="text-9xl font-bold text-primary mb-4">404</h1>
        <h2 className="text-3xl font-bold mb-6">页面不存在</h2>
        <p className="text-muted-foreground max-w-md mb-8">
          您访问的页面可能已被移除、更名或暂时不可用。
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link href="/">返回首页</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/archive">浏览文章</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
} 