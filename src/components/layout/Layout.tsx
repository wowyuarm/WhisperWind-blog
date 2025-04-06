import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ReactNode } from "react";
import { type SiteConfig, defaultSiteConfig } from "@/lib/config";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from 'next/navigation';
import { ReadingProgressBar } from "@/components/blog/ReadingProgressBar";

interface LayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
  siteConfig?: SiteConfig;
}

export function Layout({ 
  children, 
  showHeader = true, 
  showFooter = true,
  siteConfig = defaultSiteConfig
}: LayoutProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col min-h-screen bg-warm-paper/90 overflow-x-hidden hand-drawn-bg hand-drawn-edge">
      {showHeader && <Header siteConfig={siteConfig} />}
      <ReadingProgressBar />
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="flex-1 w-full mx-auto container px-4 pb-12 relative paper-edge"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      {showFooter && <Footer siteConfig={siteConfig} />}
    </div>
  );
} 