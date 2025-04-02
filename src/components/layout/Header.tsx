"use client"

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "@/components/theme-toggle";
import { motion } from "framer-motion";

const navLinks = [
  { name: "首页", href: "/" },
  { name: "文章", href: "/archive" },
  { name: "标签", href: "/tags" },
  { name: "关于", href: "/about" },
  { name: "友链", href: "/links" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-secondary/30 bg-background/85 backdrop-blur-sm sticky top-0 z-10 w-full">
      <motion.div 
        className="container flex h-16 items-center justify-between px-4 md:px-6"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="mr-4 flex">
          <Link 
            href="/" 
            className="mr-8 flex items-center space-x-2 text-xl font-medium group transition-all duration-300"
            aria-label="WhisperWind Blog"
          >
            <motion.span 
              className="font-bold text-primary px-2 py-1 tracking-wide"
              whileHover={{ y: -3, transition: { duration: 0.3 } }}
            >
              WhisperWind
            </motion.span>
            <motion.span 
              className="text-secondary-foreground font-medium tracking-wide"
              whileHover={{ y: -3, transition: { duration: 0.3, delay: 0.05 } }}
            >
              Blog
            </motion.span>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <motion.div
                key={link.href}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <Link
                  href={link.href}
                  className={cn(
                    "relative text-foreground/70 hover:text-primary transition-colors duration-300 text-sm tracking-wide px-3 py-1.5 rounded-full",
                    pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                      ? "text-primary font-medium bg-primary/5 after:absolute after:bottom-0 after:left-1/2 after:w-1.5 after:h-1.5 after:bg-primary/50 after:rounded-full after:transform after:-translate-x-1/2 after:translate-y-1" 
                      : "hover:bg-background/50"
                  )}
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </nav>
        </div>
        <div className="flex items-center">
          <ThemeToggle />
          <motion.button 
            className="ml-6 md:hidden text-foreground/80 hover:text-primary transition-colors duration-300" 
            aria-label="Toggle Menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
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
          </motion.button>
        </div>
      </motion.div>
    </header>
  );
} 