import { Button } from "@/components/ui/button";
import Link from "next/link";
import Head from 'next/head';
import { motion } from 'framer-motion';
import { HeadMeta } from "@/components/layout/HeadMeta";
import { getSiteConfig } from "@/lib/config";

export default function Custom404() {
  const siteConfig = getSiteConfig();
  
  return (
    <>
      <HeadMeta
        title="页面未找到"
        description="抱歉，您请求的页面未找到"
        siteConfig={siteConfig}
      />
      <div className="min-h-[60vh] flex flex-col items-center justify-center py-16 text-center px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="max-w-md"
        >
          <h1 className="text-5xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl font-semibold mb-2">页面未找到</h2>
          <p className="text-muted-foreground mb-8">
            抱歉，您尝试访问的页面不存在或已被移除。
            可能是该标签不存在，或者链接已经失效。
          </p>

          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/" passHref>
              <Button variant="outline" className="min-w-[120px]">
                返回首页
              </Button>
            </Link>
            <Link href="/tags" passHref>
              <Button className="min-w-[120px]">
                浏览所有标签
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </>
  );
} 