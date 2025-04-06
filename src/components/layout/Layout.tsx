import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ReactNode } from "react";
import { type SiteConfig } from "@/lib/config";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname } from 'next/navigation';

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
  siteConfig
}: LayoutProps) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col min-h-screen bg-warm-paper/90 overflow-x-hidden">
      {showHeader && <Header />}
      <AnimatePresence mode="wait">
        <motion.main
          key={pathname}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="flex-1 w-full mx-auto container px-4 pb-12 relative"
        >
          {children}
        </motion.main>
      </AnimatePresence>
      {showFooter && <Footer config={siteConfig} />}
    </div>
  );
} 