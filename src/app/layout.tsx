import type { Metadata } from "next";
// 移除Geist Mono导入，改用本地字体
import { Nunito } from 'next/font/google';
import "./globals.css";
import Script from "next/script";
import { MotionConfig } from "framer-motion";

// 使用Nunito作为主要字体，它更圆润友好
const nunito = Nunito({ 
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-nunito',
});

export const metadata: Metadata = {
  title: "WhisperWind Blog",
  description: "开源博客模板，灵感来自于吉卜力风格",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" className={`${nunito.variable}`}>
      <head>
        {/* Netlify Identity Widget 用于Decap CMS认证 */}
        <Script src="https://identity.netlify.com/v1/netlify-identity-widget.js" strategy="afterInteractive" />
      </head>
      <body className="antialiased">
        <MotionConfig reducedMotion="user">
          {children}
        </MotionConfig>
        
        {/* 用于Netlify Identity重定向的脚本 */}
        <Script id="netlify-identity-redirect">
          {`
            if (window.netlifyIdentity) {
              window.netlifyIdentity.on("init", user => {
                if (!user) {
                  window.netlifyIdentity.on("login", () => {
                    document.location.href = "/admin/";
                  });
                }
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}
