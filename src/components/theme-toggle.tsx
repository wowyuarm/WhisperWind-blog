"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark'>('light')

  // 等待组件挂载后再执行，避免服务端渲染问题
  useEffect(() => {
    setMounted(true)
    // 这里只是示意，实际应该读取系统或用户设置的主题
    // 在此例中，我们固定为亮色主题，因为吉卜力风格适合亮色主题
    setTheme('light')
  }, [])

  if (!mounted) {
    return (
      <Button 
        variant="ghost" 
        size="icon" 
        className="rounded-full bg-background/60 border-2 border-primary/20 hover:bg-primary/10 hover:-translate-y-0.5 transition-all duration-300"
        aria-label="切换主题"
      >
        <div className="w-5 h-5"></div>
      </Button>
    )
  }

  return (
    <Button 
      variant="ghost" 
      size="icon" 
      className="rounded-full bg-background/60 border-2 border-primary/20 hover:bg-primary/10 hover:-translate-y-0.5 transition-all duration-300"
      aria-label="切换主题"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      {/* 太阳/月亮图标 - 吉卜力风格 */}
      {theme === 'light' ? (
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-amber-600"
        >
          <circle cx="12" cy="12" r="5.5" stroke="currentColor" strokeWidth="1.5" />
          <path d="M12 2V4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M12 20V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M4 12L2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M22 12L20 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M19.7782 4.22183L18.364 5.63604" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M5.63608 18.364L4.22187 19.7782" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M19.7782 19.7782L18.364 18.364" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M5.63608 5.63604L4.22187 4.22183" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          <path d="M11 7.5C9 9 9.5 11.5 9.5 11.5C9.5 11.5 12 11 14 9C16 7 15.5 4.5 15.5 4.5C15.5 4.5 13 6 11 7.5Z" fill="currentColor" opacity="0.6" />
        </svg>
      ) : (
        <svg 
          width="20" 
          height="20" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="text-indigo-400"
        >
          <path
            d="M21.5 14.0784C20.3003 14.7189 18.9301 15.0821 17.4751 15.0821C12.7491 15.0821 8.91792 11.2509 8.91792 6.52485C8.91792 5.06986 9.28115 3.69968 9.92163 2.5C5.6751 3.49636 2.5 7.31282 2.5 11.9111C2.5 17.4191 6.9665 21.8856 12.4745 21.8856C17.0728 21.8856 20.8892 18.7105 21.8856 14.464C21.7553 14.3281 21.632 14.1964 21.5 14.0784Z"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.5 6.5C16.5 6.5 15 8 14 9C13 10 13 11.5 13 11.5"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 16.5C17.5 16 18.5 15 18.5 15"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8 8.5C8 8.5 8.5 7 9.5 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </Button>
  )
} 