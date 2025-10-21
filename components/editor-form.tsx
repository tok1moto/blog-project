'use client';

import * as React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, Loader2 } from 'lucide-react';
import type { Post } from '@/lib/api';

interface EditorFormProps {
  initialData?: Partial<Post>;
  onSubmit: (data: Partial<Post>) => void;
  submitLabel?: string;
  isSubmitting?: boolean;
}

export function EditorForm({
  initialData,
  onSubmit,
  submitLabel = 'Publish',
  isSubmitting = false,
}: EditorFormProps) {
  const [title, setTitle] = React.useState(initialData?.title || '');
  const [author, setAuthor] = React.useState(initialData?.author || '');
  const [tags, setTags] = React.useState(
    Array.isArray(initialData?.tags) ? initialData.tags.join(', ') : ''
  );
  const [content, setContent] = React.useState(initialData?.content || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      author,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      content,
    });
  };

  const wordCount = content.split(/\s+/).filter(Boolean).length;
  const charCount = content.length;

  return (
    <form onSubmit={handleSubmit} className="animate-fade-in">
      <Card className="shadow-lg">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl">Post Editor</CardTitle>
          <p className="text-sm text-muted-foreground">
            Create and publish your blog post
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="title">Title *</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter an engaging post title"
              required
              className="text-lg font-medium"
            />
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="author">Author</Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Your name"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="tags">Tags</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="design, tutorial, productivity"
              />
              <p className="text-xs text-muted-foreground">
                Separate tags with commas
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="content">Content *</Label>
              <div className="text-xs text-muted-foreground">
                {wordCount} words · {charCount} characters
              </div>
            </div>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your post content here..."
              rows={16}
              className="min-h-[400px] font-mono text-sm"
              required
            />
          </div>

          <div className="flex items-center gap-3 pt-4 border-t">
            <Button 
              type="submit" 
              size="lg" 
              disabled={isSubmitting || !title.trim() || !content.trim()}
              className="shadow-md"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-5 w-5" />
                  {submitLabel}
                </>
              )}
            </Button>
            <p className="text-xs text-muted-foreground">
              {isSubmitting ? 'Publishing your post...' : 'Fill in all required fields to publish'}
            </p>
          </div>
        </CardContent>
      </Card>
    </form>
  );
}

