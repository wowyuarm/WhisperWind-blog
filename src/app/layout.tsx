import type { Metadata } from "next";
// 移除Geist Mono导入，改用本地字体
import { Nunito } from 'next/font/google';
import "./globals.css";

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
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
