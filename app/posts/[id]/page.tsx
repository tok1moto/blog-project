'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Navbar } from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Toast } from '@/components/toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Calendar, User, Edit, Trash2, ArrowLeft } from 'lucide-react';
import { getPost, deletePost } from '@/lib/api';
import type { Post } from '@/lib/api';

export default function PostDetailPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [post, setPost] = React.useState<Post | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [showDeleteDialog, setShowDeleteDialog] = React.useState(false);
  const [deleting, setDeleting] = React.useState(false);
  const [toast, setToast] = React.useState<{ message: string; type: 'success' | 'error' } | null>(null);

  React.useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const p = getPost(params.id);
      if (!p) {
        setError('Post not found');
      } else {
        setPost(p);
      }
      setLoading(false);
    }, 150);
    return () => clearTimeout(timer);
  }, [params.id]);

  const handleDelete = () => {
    if (!post) return;
    setDeleting(true);
    setTimeout(() => {
      deletePost(post.id);
      setDeleting(false);
      setShowDeleteDialog(false);
      setToast({ message: 'Post deleted', type: 'success' });
      setTimeout(() => router.push('/'), 400);
    }, 150);
  };

  const date = post ? new Date(post.date) : null;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navbar />

      <main className="container py-8 md:py-12">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Posts
            </Button>
          </Link>
        </div>

        {loading ? (
          <div className="rounded-lg border bg-card p-12 text-center shadow-sm">
            <div className="flex flex-col items-center gap-3">
              <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
              <p className="text-sm text-muted-foreground">Loading post...</p>
            </div>
          </div>
        ) : error ? (
          <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-12 text-center shadow-sm">
            <p className="text-lg font-medium text-destructive">
              {error}
            </p>
          </div>
        ) : post ? (
          <article className="animate-fade-in">
            {/* Header */}
            <div className="rounded-xl border bg-card shadow-lg p-6 md:p-8 lg:p-12 mb-6">
              <div className="flex items-start justify-between gap-6 mb-6">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight flex-1 text-balance">
                  {post.title}
                </h1>
                <div className="flex gap-2 shrink-0">
                  <Link href={`/dashboard/edit/${post.id}`}>
                    <Button variant="outline" size="icon" className="shadow-sm">
                      <Edit className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => setShowDeleteDialog(true)}
                    className="shadow-sm hover:border-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 md:gap-6 text-sm text-muted-foreground mb-6">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>{post.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {date?.toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </span>
                </div>
              </div>

              {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="rounded-xl border bg-card shadow-lg p-6 md:p-8 lg:p-12">
              <div className="prose prose-slate dark:prose-invert max-w-none">
                <div className="text-base md:text-lg leading-relaxed whitespace-pre-wrap text-foreground">
                  {post.content}
                </div>
              </div>
            </div>
          </article>
        ) : null}
      </main>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent onClose={() => setShowDeleteDialog(false)}>
          <DialogHeader>
            <DialogTitle>Delete Post?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. The post will be permanently deleted.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowDeleteDialog(false)}
              disabled={deleting}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleting}
            >
              {deleting ? 'Deleting...' : 'Delete'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
}

