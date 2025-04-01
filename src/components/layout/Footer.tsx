import Link from "next/link";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-secondary/30 backdrop-blur-sm mt-auto bg-warm-paper/90">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-10 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4 watercolor-underline inline-block">WhisperWind Blog</h3>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4 watercolor-underline inline-block">导航</h3>
              <ul className="space-y-3">
                <li>
                  <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:-translate-x-1 inline-block border-b border-transparent hover:border-primary/20">
                    首页
                  </Link>
                </li>
                <li>
                  <Link href="/archive" className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:-translate-x-1 inline-block border-b border-transparent hover:border-primary/20">
                    归档
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:-translate-x-1 inline-block border-b border-transparent hover:border-primary/20">
                    关于
                  </Link>
                </li>
                <li>
                  <Link href="/tags" className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 hover:-translate-x-1 inline-block border-b border-transparent hover:border-primary/20">
                    标签
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-primary mb-4 watercolor-underline inline-block">联系</h3>
              <ul className="space-y-3">
                <li>
                  <a 
                    href="https://github.com/wowyuarm/whisperwind-blog" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm text-muted-foreground hover:text-primary transition-all duration-300 inline-flex items-center group"
                  >
                    <svg
                      className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:rotate-12"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.163 6.839 9.489.5.092.682-.217.682-.48 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.091-.646.349-1.086.635-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.682-.103-.253-.447-1.27.098-2.646 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.376.202 2.394.1 2.646.64.699 1.026 1.591 1.026 2.682 0 3.841-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.137 20.161 22 16.416 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                    <span className="group-hover:-translate-x-1 transition-transform duration-300 border-b border-transparent group-hover:border-primary/20">GitHub</span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t-2 border-secondary/20 mt-10 pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-muted-foreground">
              &copy; {currentYear} WhisperWind Blog. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground mt-4 md:mt-0">
              基于 <span className="text-primary hover:underline transition-all duration-300">Next.js</span> 构建
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
} 