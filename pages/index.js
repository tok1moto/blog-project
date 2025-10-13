import { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';
import PostCard from '@/components/PostCard';
import { listPosts } from '@/lib/api';

export default function HomePage() {
  const [search, setSearch] = useState('');
  const [tag, setTag] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);
  const [allTags, setAllTags] = useState([]);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const result = listPosts({ search, tag, from, to });
      setPosts(result);
      setLoading(false);
    }, 200); // simulate network latency
    return () => clearTimeout(timer);
  }, [search, tag, from, to]);

  useEffect(() => {
    // Compute available tags on client to avoid SSR hydration mismatch
    const tags = new Set();
    const base = listPosts();
    base.forEach(p => (p.tags || []).forEach(t => tags.add(t)));
    setAllTags(Array.from(tags));
  }, []);

  return (
    <div>
      <NavBar />
      <main className="container py-6">
        <h1 className="text-2xl font-bold mb-4">Latest Posts</h1>

        <div className="grid gap-3 md:grid-cols-4 mb-6">
          <input
            className="md:col-span-2 border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-800"
            placeholder="Search by title, content, or author"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-800"
            value={tag}
            onChange={e => setTag(e.target.value)}
          >
            <option value="">All tags</option>
            {allTags.map(t => (
              <option key={t} value={t}>{t}</option>
            ))}
          </select>
          <div className="grid grid-cols-2 gap-3 md:col-span-1">
            <input type="date" className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-800" value={from} onChange={e => setFrom(e.target.value)} />
            <input type="date" className="border border-gray-300 dark:border-gray-600 rounded px-3 py-2 bg-white dark:bg-gray-800" value={to} onChange={e => setTo(e.target.value)} />
          </div>
        </div>

        {loading ? (
          <p className="text-sm text-gray-500">Loading posts…</p>
        ) : posts.length === 0 ? (
          <p className="text-sm text-gray-500">No posts found.</p>
        ) : (
          <div className="grid gap-4">
            {posts.map(p => (
              <PostCard key={p.id} post={p} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}


