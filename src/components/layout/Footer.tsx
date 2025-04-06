import Link from "next/link";
import { type SiteConfig } from "@/lib/config";

// Define props for Footer, making config optional
interface FooterProps {
  config?: SiteConfig; // Make config optional
}

export function Footer({ config }: FooterProps) { // config can be undefined
  const currentYear = new Date().getFullYear();
  
  // 获取admin链接，直接指向index.html
  const getAdminUrl = () => {
    return "/admin/index.html"; // 直接链接到HTML文件
  };

  // Handle undefined config gracefully
  if (!config) {
    // Render a minimal footer or nothing
    return (
      <footer className="border-t border-secondary/30 backdrop-blur-sm mt-auto bg-warm-paper/90 py-8">
        <div className="container mx-auto px-4 text-center">
           <p className="text-xs text-muted-foreground">
            &copy; {currentYear} 🍃WhisperWind Blog. Minimal Footer.
          </p>
        </div>
      </footer>
    );
  }

  return (
    <footer className="border-t border-secondary/30 backdrop-blur-sm mt-auto bg-warm-paper/90 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex flex-col items-center md:items-start mb-8 md:mb-0">
            <Link href="/" className="font-bold text-primary text-xl tracking-wide mb-2">
              🍃WhisperWind Blog
            </Link>
            <p className="text-sm text-muted-foreground text-center md:text-left max-w-xs">
              {config.description}
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end">
            <div className="flex space-x-4 mb-4">
              {config.social.github && (
                <a 
                  href={config.social.github} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 p-2 rounded-full hover:bg-primary/5"
                  aria-label="GitHub"
                >
                  <svg
                    className="h-5 w-5 hover:scale-110 transition-transform duration-300"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.163 6.839 9.489.5.092.682-.217.682-.48 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.091-.646.349-1.086.635-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.376.202 2.394.1 2.646.64.699 1.026 1.591 1.026 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                  </svg>
                </a>
              )}
              {config.social.twitter && (
                <a 
                  href={config.social.twitter} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 p-2 rounded-full hover:bg-primary/5"
                  aria-label="X"
                >
                  <svg
                    className="h-5 w-5 hover:scale-110 transition-transform duration-300"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                </a>
              )}
            </div>
            
            <div className="flex space-x-4 text-sm text-muted-foreground">
              <Link href="/" className="hover:text-primary transition-colors duration-300">
                首页
              </Link>
              <Link href="/about" className="hover:text-primary transition-colors duration-300">
                关于
              </Link>
              <Link href="/links" className="hover:text-primary transition-colors duration-300">
                友链
              </Link>
              <Link href={getAdminUrl()} target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors duration-300">
                管理
              </Link>
            </div>
          </div>
        </div>
        
        <div className="border-t border-secondary/20 mt-8 pt-6 flex flex-col items-center">
          <p className="text-xs text-muted-foreground text-center">
            &copy; {currentYear} 🍃WhisperWind Blog. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 