import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';
import Toast from '@/components/Toast';
import { getPost, updatePost } from '@/lib/api';

export default function EditPage() {
  const router = useRouter();
  const { id } = router.query;
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [tags, setTags] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    const timer = setTimeout(() => {
      const p = getPost(id);
      if (!p) {
        setError('Post not found');
      } else {
        setTitle(p.title || '');
        setAuthor(p.author || '');
        setTags((p.tags || []).join(', '));
        setContent(p.content || '');
      }
      setLoading(false);
    }, 150);
    return () => clearTimeout(timer);
  }, [id]);

  function onSubmit(e) {
    e.preventDefault();
    if (!id) return;
    setSaving(true);
    setTimeout(() => {
      const updated = updatePost(id, { title, author, tags, content });
      setSaving(false);
      if (!updated) {
        setToast({ message: 'Failed to update', type: 'error' });
        return;
      }
      setToast({ message: 'Post updated', type: 'success' });
      setTimeout(() => router.push(`/posts/${id}`), 400);
    }, 150);
  }

  return (
    <div>
      <NavBar />
      <main className="container py-6">
        {loading ? (
          <p className="text-sm text-gray-500">Loading…</p>
        ) : error ? (
          <p className="text-sm text-red-600">{error}</p>
        ) : (
          <>
            <h1 className="text-2xl font-bold mb-4">Edit Post</h1>
            <form onSubmit={onSubmit} className="grid gap-4 max-w-2xl">
              <input className="border rounded px-3 py-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600" placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} required />
              <input className="border rounded px-3 py-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600" placeholder="Author" value={author} onChange={e => setAuthor(e.target.value)} />
              <input className="border rounded px-3 py-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600" placeholder="Tags (comma separated)" value={tags} onChange={e => setTags(e.target.value)} />
              <textarea className="border rounded px-3 py-2 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 min-h-[200px]" placeholder="Content" value={content} onChange={e => setContent(e.target.value)} />
              <div>
                <button disabled={saving} className="px-4 py-2 rounded bg-blue-600 text-white">{saving ? 'Saving…' : 'Save Changes'}</button>
              </div>
            </form>
          </>
        )}
      </main>
      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}
    </div>
  );
}


