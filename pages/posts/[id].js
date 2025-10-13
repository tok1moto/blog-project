import { useRouter } from 'next/router';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';
import { deletePost, getPost } from '@/lib/api';
import Toast from '@/components/Toast';
import ClientOnly from '@/components/ClientOnly';

export default function PostDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    const timer = setTimeout(() => {
      const p = getPost(id);
      if (!p) setError('Post not found');
      setPost(p);
      setLoading(false);
    }, 150);
    return () => clearTimeout(timer);
  }, [id]);

  function onDelete() {
    if (!post) return;
    const confirmed = window.confirm('Delete this post?');
    if (!confirmed) return;
    setDeleting(true);
    setTimeout(() => {
      deletePost(post.id);
      setDeleting(false);
      setToast({ message: 'Post deleted', type: 'success' });
      setTimeout(() => router.replace('/'), 400);
    }, 150);
  }

  const date = post ? new Date(post.date) : null;

  return (
    <div>
      <NavBar />
      <main className="container py-6">
        {loading ? (
          <p className="text-sm text-gray-500">Loading…</p>
        ) : error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : (
          <article>
            <div className="flex items-center justify-between">
              <h1 className="text-2xl font-bold">{post.title}</h1>
              <div className="flex gap-2">
                <Link href={`/edit/${post.id}`} className="px-3 py-1 border rounded text-sm">Edit</Link>
                <button onClick={onDelete} disabled={deleting} className="px-3 py-1 border rounded text-sm text-red-600 border-red-300 dark:border-red-700">{deleting ? 'Deleting…' : 'Delete'}</button>
              </div>
            </div>
            <ClientOnly fallback={<p className="text-sm text-gray-500 mt-1">by {post.author}</p>}>
              <p className="text-sm text-gray-500 mt-1">by {post.author} • Published on {date ? date.toLocaleString() : ''}</p>
            </ClientOnly>
            <div className="mt-3 flex flex-wrap gap-2">
              {(post.tags || []).map(t => (
                <span key={t} className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">{t}</span>
              ))}
            </div>
            <div className="prose dark:prose-invert max-w-none mt-6 whitespace-pre-wrap">{post.content}</div>
          </article>
        )}
      </main>
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}


