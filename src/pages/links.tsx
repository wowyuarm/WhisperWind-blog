import Head from 'next/head';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getFriendLinks, getSiteConfig, type FriendLink, type SiteConfig } from "@/lib/config";
import Link from "next/link";
import Image from "next/image";

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

export default function LinksPage({ links }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>友情链接 - WhisperWind Blog</title>
        <meta name="description" content="WhisperWind Blog 的友情链接" />
      </Head>
      <section className="py-12">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 text-primary">友情链接</h1>
          <div className="mt-4 w-20 h-1 bg-primary rounded-full mx-auto"></div>
        </div>

        {links.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
            {links.map((link, index) => (
              <Card key={index} className="bg-white/90 backdrop-blur-sm hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-primary">
                    <Link href={link.url} target="_blank" rel="noopener noreferrer" className="hover:underline flex items-center">
                      {link.icon && (
                        <span className="relative w-6 h-6 mr-2 rounded-sm overflow-hidden flex-shrink-0">
                          <Image 
                            src={link.icon} 
                            alt={`${link.name} 图标`} 
                            fill
                            sizes="24px"
                            className="object-cover"
                          />
                        </span>
                      )}
                      {link.name}
                    </Link>
                  </CardTitle>
                  {link.description && (
                    <CardDescription>{link.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <Link 
                    href={link.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-sm text-primary hover:underline"
                  >
                    访问网站 →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
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
    </>
  );
} 