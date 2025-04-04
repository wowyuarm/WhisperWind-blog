import React from 'react'
import Link from 'next/link'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { formatDate } from '@/lib/utils'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'
import Image from 'next/image'

interface PostCardProps {
  title: string
  slug: string
  excerpt?: string
  publishDate: string
  tags?: string[]
  featuredImage?: string
}

export function PostCard({ title, slug, excerpt, publishDate, tags = [], featuredImage }: PostCardProps) {
  const formattedDate = formatDate(publishDate)

  return (
    <article className="group h-full">
      <Card className="h-full bg-warm-paper border-secondary/20 shadow-ghibli transition-all duration-300 group-hover:shadow-lg group-hover:-translate-y-1 overflow-hidden">
        {featuredImage && (
          <div className="w-full h-40 overflow-hidden rounded-t-xl relative">
            <Image 
              src={featuredImage} 
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-warm-paper/80 to-transparent opacity-40"></div>
          </div>
        )}
        <CardHeader className="space-y-2">
          <div className="space-y-1.5">
            <CardTitle className="tracking-wide transition-colors duration-300 group-hover:text-primary">
              <Link href={`/posts/${slug}`} className="hover:underline decoration-primary/30 underline-offset-4">
                {title}
              </Link>
            </CardTitle>
            <p className="text-muted-foreground text-sm tracking-wide flex items-center">
              <svg 
                className="w-4 h-4 mr-1 text-primary/60 transition-transform duration-300 hover:scale-110" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              {formattedDate}
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground/90 leading-relaxed tracking-wide relative">
            {excerpt}
            <span className="absolute -inset-x-1 -inset-y-2 bg-gradient-to-b from-transparent to-warm-paper/80 z-0"></span>
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {tags.map((tag) => (
              <div
                key={tag}
                className="transition-transform duration-200 hover:-translate-y-0.5 hover:scale-105"
              >
                <Badge variant="secondary" className="tracking-wide bg-secondary/15 border-secondary/40 group-hover:bg-secondary/30 transition-colors duration-300">
                  {tag}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="pt-4 border-t border-secondary/20">
          <Link href={`/posts/${slug}`} passHref className="w-full">
            <Button variant="outline" className="w-full text-primary tracking-wide bg-warm-paper border-secondary/40 group-hover:border-primary/40">
              阅读文章
              <svg 
                className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1" 
                xmlns="http://www.w3.org/2000/svg" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </article>
  )
} 