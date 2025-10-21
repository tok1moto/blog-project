'use client';

import * as React from 'react';
import { useRouter } from 'next/navigation';
import { EditorForm } from '@/components/editor-form';
import { Toast } from '@/components/toast';
import { createPost } from '@/lib/api';
import type { Post } from '@/lib/api';

export default function CreatePostPage() {
  const router = useRouter();
  const [submitting, setSubmitting] = React.useState(false);
  const [toast, setToast] = React.useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const handleSubmit = (data: Partial<Post>) => {
    setSubmitting(true);
    setTimeout(() => {
      const post = createPost(data);
      setSubmitting(false);
      setToast({ message: 'Post created successfully', type: 'success' });
      setTimeout(() => {
        router.push(`/posts/${post.id}`);
      }, 400);
    }, 150);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">Create New Post</h1>
        <p className="text-muted-foreground">
          Write and publish a new blog post
        </p>
      </div>

      <EditorForm
        onSubmit={handleSubmit}
        submitLabel="Publish Post"
        isSubmitting={submitting}
      />

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

