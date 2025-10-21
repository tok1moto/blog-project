'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { EditorForm } from '@/components/editor-form';
import { Toast } from '@/components/toast';
import { getPost, updatePost } from '@/lib/api';
import type { Post } from '@/lib/api';

export default function EditPostPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [post, setPost] = React.useState<Post | null>(null);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
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

  const handleSubmit = (data: Partial<Post>) => {
    if (!post) return;
    setSubmitting(true);
    setTimeout(() => {
      const updated = updatePost(post.id, data);
      setSubmitting(false);
      if (!updated) {
        setToast({ message: 'Failed to update post', type: 'error' });
        return;
      }
      setToast({ message: 'Post updated successfully', type: 'success' });
      setTimeout(() => {
        router.push(`/posts/${post.id}`);
      }, 400);
    }, 150);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Edit Post</h1>
        <p className="text-muted-foreground">
          Update your blog post content
        </p>
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
        <EditorForm
          initialData={post}
          onSubmit={handleSubmit}
          submitLabel="Save Changes"
          isSubmitting={submitting}
        />
      ) : null}

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

