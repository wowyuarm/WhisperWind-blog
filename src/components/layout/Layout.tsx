import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageTransition } from "@/components/animation/PageTransition";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
  showHeader?: boolean;
  showFooter?: boolean;
}

export function Layout({ 
  children, 
  showHeader = true, 
  showFooter = true 
}: LayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-warm-paper/90 bg-[url('/images/ghibli-bg.png')] bg-fixed bg-cover bg-center overflow-x-hidden">
      {showHeader && <Header />}
      <PageTransition>
        <main className="flex-1 w-full mx-auto container px-4 pb-12 relative">
          {children}
        </main>
      </PageTransition>
      {showFooter && <Footer />}
    </div>
  );
} 