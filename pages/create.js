import { useRouter } from 'next/router';
import { useState } from 'react';
import NavBar from '@/components/NavBar';
import Toast from '@/components/Toast';
import { createPost } from '@/lib/api';

export default function CreatePage() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  function onSubmit(e) {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      const post = createPost({ title, author, tags, content });
      setSubmitting(false);
      setToast({ message: 'Post created', type: 'success' });
      setTimeout(() => router.push(`/posts/${post.id}`), 400);
    }, 150);
  }

  return (
    <div>
      <NavBar />
      <main className="container py-6">
        <h1 className="text-2xl font-bold mb-4">Create New Post</h1>
        <form onSubmit={onSubmit} className="grid gap-4 max-w-2xl">
          <input className="border rounded px-3 py-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
          <input className="border rounded px-3 py-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600" placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} />
          <input className="border rounded px-3 py-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600" placeholder="Tags (comma separated)" value={tags} onChange={e => setTags(e.target.value)} />
          <textarea className="border rounded px-3 py-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 min-h-[200px]" placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
          <div>
            <button disabled={submitting} className="px-4 py-2 rounded bg-blue-600 text-white">{submitting ? 'Creating…' : 'Create Post'}</button>
          </div>
        </form>
      </main>
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}


