"use client"

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const navLinks = [
  { name: "首页", href: "/" },
  { name: "文章", href: "/archive" },
  { name: "标签", href: "/tags" },
  { name: "关于", href: "/about" },
  { name: "友链", href: "/links" },
];

export function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [logoError, setLogoError] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  const handleLogoError = () => {
    console.error("Logo加载失败");
    setLogoError(true);
  };

  return (
    <header className="border-b border-secondary/30 bg-background/85 backdrop-blur-sm sticky top-0 z-20 w-full">
      <motion.div 
        className="container flex h-16 items-center justify-between px-4 md:px-6 relative"
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
            <div className="relative w-8 h-8 mr-2 rounded-full overflow-hidden border-2 border-primary/20 flex items-center justify-center bg-white/70">
              {!logoError ? (
                <Image 
                  src="/images/logo.png" 
                  alt="WhisperWind Logo" 
                  width={32} 
                  height={32} 
                  className="object-cover rounded-full"
                  priority
                  onError={handleLogoError}
                  unoptimized
                />
              ) : (
                <span className="text-primary font-bold text-xl">W</span>
              )}
            </div>
            <motion.span 
              className="font-bold text-primary px-2 py-1 tracking-wide"
              whileHover={{ y: -3, transition: { duration: 0.3 } }}
            >
              🍃WhisperWind
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
          <motion.button 
            className="ml-4 md:hidden text-foreground/80 hover:text-primary transition-colors duration-300 p-2 -mr-2"
            aria-label="Toggle Menu"
            onClick={toggleMobileMenu}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <motion.path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                variants={{ open: { d: "M6 18L18 6M6 6l12 12" }, closed: { d: "M4 6h16M4 12h16M4 18h16" } }}
                animate={isMobileMenuOpen ? "open" : "closed"}
                initial={false}
                transition={{ duration: 0.3 }}
              />
            </svg>
          </motion.button>
        </div>

        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="absolute top-full left-0 right-0 md:hidden bg-background/95 backdrop-blur-md shadow-lg border-t border-secondary/30 py-4 z-10"
            >
              <nav className="flex flex-col items-center space-y-4 px-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={handleLinkClick}
                    className={cn(
                      "text-lg text-foreground/80 hover:text-primary transition-colors duration-300 w-full text-center py-2 rounded-md",
                      pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href))
                        ? "font-semibold text-primary bg-primary/10"
                        : "hover:bg-secondary/10"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  );
} 