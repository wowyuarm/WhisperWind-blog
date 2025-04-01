import React from 'react'
import Link from 'next/link'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { formatDate } from '@/lib/utils'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card'

interface PostCardProps {
  title: string
  slug: string
  excerpt: string
  date: string
  tags?: string[]
  coverImage?: string
}

export function PostCard({ title, slug, excerpt, date, tags = [], coverImage }: PostCardProps) {
  const formattedDate = formatDate(date)

  return (
    <article className="group">
      <Card className="h-full bg-warm-paper border-secondary/20 shadow-ghibli">
        <CardHeader className="space-y-2">
          <div className="space-y-1.5">
            <CardTitle className="tracking-wide transition-colors duration-300 group-hover:text-primary">
              {title}
            </CardTitle>
            <p className="text-muted-foreground text-sm tracking-wide">{formattedDate}</p>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-foreground/90 leading-relaxed tracking-wide relative">
            {excerpt}
            <span className="absolute -inset-x-1 -inset-y-2 bg-gradient-to-b from-transparent to-warm-paper/80 z-0"></span>
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            {tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="tracking-wide border-watercolor">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
        <CardFooter className="pt-4 border-t border-secondary/20">
          <Link href={`/posts/${slug}`} passHref>
            <Button variant="outline" className="w-full text-primary tracking-wide border-watercolor">
              阅读文章
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </article>
  )
} 