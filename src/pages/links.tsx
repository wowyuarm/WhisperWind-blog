import Head from 'next/head';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getFriendLinks, getSiteConfig, type FriendLink, type SiteConfig } from "@/lib/config";
import Link from "next/link";
import Image from "next/image";
import { AnimatedButton } from '@/components/ui/animated-button';
import { cn } from '@/lib/utils';
import { HeadMeta } from '@/components/layout/HeadMeta';

// Define props type
interface LinksPageProps {
  links: FriendLink[];
  siteConfig: SiteConfig;
}

export const getStaticProps: GetStaticProps<LinksPageProps> = async () => {
  const links = getFriendLinks();
  const siteConfig = getSiteConfig();
  return {
    props: {
      links,
      siteConfig,
    },
  };
};

// 设置不显示页脚
LinksPage.showFooter = false;

export default function LinksPage({ links, siteConfig }: InferGetStaticPropsType<typeof getStaticProps>) {
  // 分类处理友链
  const personalLinks = links.filter(link => link.type === 'personal');
  const officialLinks = links.filter(link => link.type === 'official' || !link.type); // 不设置类型的默认为官方

  return (
    <>
      <HeadMeta
        title="友情链接"
        description="WhisperWind Blog 的友情链接"
        siteConfig={siteConfig}
      />
      <div className="hand-drawn-vertical-lines">
        <section className="py-12 content-container">
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold mb-4 text-primary">友情链接</h1>
            <div className="mt-4 w-20 h-1 bg-primary rounded-full mx-auto"></div>
          </div>

          {/* 个人博客部分 */}
          {personalLinks.length > 0 && (
            <div className="mt-12 mb-16">
              <h2 className="text-2xl font-bold mb-6 text-foreground/90 border-l-4 border-primary pl-3">
                个人博客
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {personalLinks.map((link, index) => (
                  <FriendLinkCard key={index} link={link} siteConfig={siteConfig} />
                ))}
              </div>
            </div>
          )}

          {/* 官方网站部分 */}
          {officialLinks.length > 0 && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6 text-foreground/90 border-l-4 border-secondary pl-3">
                官方网站
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {officialLinks.map((link, index) => (
                  <FriendLinkCard key={index} link={link} isOfficial siteConfig={siteConfig} />
                ))}
              </div>
            </div>
          )}

          {/* 没有友链时显示的内容 */}
          {links.length === 0 && (
            <Card className="bg-white/90 backdrop-blur-sm mt-8">
              <CardHeader>
                <CardTitle>暂无友情链接</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  目前还没有添加任何友情链接。
                </p>
              </CardContent>
            </Card>
          )}
        </section>
      </div>
    </>
  );
}

// 友链卡片组件
function FriendLinkCard({ 
  link, 
  isOfficial = false, 
  siteConfig 
}: { 
  link: FriendLink; 
  isOfficial?: boolean;
  siteConfig: SiteConfig;
}) {
  // 如果未配置图标，则使用网站logo作为默认图标
  const iconSrc = link.icon || siteConfig.logo || '/images/logo.png';

  return (
    <Card className={cn(
      "bg-white/90 backdrop-blur-sm hover:shadow-lg transition-all duration-300 group relative overflow-hidden h-full border-2",
      isOfficial ? "border-secondary/30" : "border-primary/30",
      "hover:-translate-y-1"
    )}>
      <CardHeader className={cn(
        "pb-2",
        isOfficial ? "bg-secondary/10" : "bg-primary/10"
      )}>
        <CardTitle className={isOfficial ? "text-foreground" : "text-primary"}>
          <Link href={link.url} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center">
            <div className="relative w-8 h-8 mr-3 rounded-md overflow-hidden flex-shrink-0 bg-white/50 p-1 shadow-sm">
              <Image 
                src={iconSrc}
                alt={`${link.name} 图标`} 
                width={32}
                height={32}
                className="object-contain"
                onError={(e) => {
                  // 图标加载失败时显示首字母
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.parentElement!.innerHTML = `<div class="w-full h-full flex items-center justify-center text-white text-sm font-bold ${isOfficial ? 'bg-secondary' : 'bg-primary'}">${link.name.charAt(0)}</div>`;
                }}
              />
            </div>
            <span className="truncate">{link.name}</span>
          </Link>
        </CardTitle>
        {link.description && (
          <CardDescription className="mt-2 line-clamp-2 text-sm">{link.description}</CardDescription>
        )}
      </CardHeader>
      <CardContent className="pt-4">
        <AnimatedButton asChild variant="outline" className="w-full mt-2" animationIntensity="subtle">
          <Link 
            href={link.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className={cn(
              "flex items-center justify-center",
              isOfficial ? "text-secondary-foreground" : "text-primary"
            )}
          >
            <span>访问网站</span>
            <svg 
              className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:translate-x-1" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </Link>
        </AnimatedButton>
      </CardContent>
    </Card>
  );
} 