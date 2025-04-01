"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";

const navLinks = [
  { name: "首页", href: "/" },
  { name: "博文", href: "/posts" },
  { name: "标签", href: "/tags" },
  { name: "关于", href: "/about" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-border bg-background/85 backdrop-blur-sm sticky top-0 z-10 w-full">
      <div className="container flex h-16 items-center justify-between px-4 md:px-6">
        <div className="mr-4 flex">
          <Link 
            href="/" 
            className="mr-6 flex items-center space-x-2 text-xl font-medium group transition-all duration-300"
            aria-label="WhisperWind Blog"
          >
            <span className="font-bold text-primary group-hover:-translate-y-0.5 transition-transform duration-300 border-watercolor px-2 py-1 tracking-wide">WhisperWind</span>
            <span className="text-secondary-foreground font-medium group-hover:-translate-y-0.5 transition-transform duration-300 delay-75 tracking-wide">Blog</span>
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative text-foreground/80 hover:text-primary transition-colors duration-300 text-sm font-medium px-2 py-1 hover:-translate-y-0.5 tracking-wide",
                  pathname === link.href 
                    ? "text-primary after:absolute after:bottom-[-2px] after:left-1/2 after:w-8 after:h-[3px] after:bg-primary/30 after:rounded-full after:transform after:-translate-x-1/2 after:blur-[0.5px]" 
                    : ""
                )}
              >
                {link.name}
              </Link>
            ))}
          </nav>
        </div>
        <div className="flex items-center">
          <ThemeToggle />
          <button 
            className="ml-6 md:hidden text-foreground/80 hover:text-primary transition-colors duration-300" 
            aria-label="Toggle Menu"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" 
              />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
} 