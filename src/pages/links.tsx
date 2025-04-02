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

export default function LinksPage({ links }: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Head>
        <title>友情链接 - WhisperWind Blog</title>
        <meta name="description" content="WhisperWind Blog 的友情链接和推荐资源" />
      </Head>
      <section className="py-12">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold mb-4 text-primary">友情链接</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            这里收集了一些我们喜欢的网站和资源，希望对你也有所帮助。
          </p>
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
                目前还没有添加任何友情链接。请通过管理界面添加链接，或者修改 <code>src/content/links.json</code> 文件。
              </p>
            </CardContent>
          </Card>
        )}
        
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-semibold mb-4 text-primary">添加你的网站</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-4">
            如果你有一个优质的网站或博客，欢迎与我们交换友链。请通过GitHub联系我们，或者提交一个Pull Request。
          </p>
        </div>
      </section>
    </>
  );
} 