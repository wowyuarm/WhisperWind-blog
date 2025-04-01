import { Header } from "./Header";
import { Footer } from "./Footer";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-14">
        <div className="page-container relative rounded-xl overflow-hidden p-6 md:p-8">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
} 