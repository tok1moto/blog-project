'use client';

import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight, Calendar, User, Clock } from 'lucide-react';
import type { Post } from '@/lib/api';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const date = new Date(post.date);
  const readTime = Math.ceil(post.content.split(' ').length / 200);

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:scale-[1.01] animate-slide-up">
      <CardHeader>
        <div className="flex items-start justify-between gap-4 mb-3">
          <CardTitle className="text-2xl leading-tight flex-1 line-clamp-2">
            <Link 
              href={`/posts/${post.id}`} 
              className="hover:text-primary transition-colors duration-200"
            >
              {post.title}
            </Link>
          </CardTitle>
        </div>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Calendar className="h-3.5 w-3.5" />
            <span>{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <User className="h-3.5 w-3.5" />
            <span>{post.author}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            <span>{readTime} min read</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20 transition-colors hover:bg-primary/20"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
        
        <p className="line-clamp-3 text-sm text-muted-foreground leading-relaxed">
          {post.content}
        </p>
        
        <Link href={`/posts/${post.id}`} className="inline-block">
          <Button 
            variant="ghost" 
            className="group/btn p-0 h-auto font-medium text-primary hover:bg-transparent"
          >
            Read more
            <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
