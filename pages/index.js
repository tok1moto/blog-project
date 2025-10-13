import { useEffect, useState } from 'react';
import NavBar from '@/components/NavBar';
import PostCard from '@/components/PostCard';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Calendar, Search, X } from 'lucide-react';
import { motion } from 'framer-motion';
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
        <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
          <h1 className="text-2xl font-bold mb-4">Latest Posts</h1>
          <div className="grid gap-3 md:grid-cols-6 mb-6">
            <div className="relative md:col-span-3">
              <Input
                placeholder="Search by title, content, or author"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="pl-9"
              />
              <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
            </div>
            <Select value={tag} onChange={e => setTag(e.target.value)}>
              <option value="">All tags</option>
              {allTags.map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </Select>
            <div className="grid grid-cols-2 gap-3 md:col-span-2">
              <div className="relative">
                <Input type="date" value={from} onChange={e => setFrom(e.target.value)} />
                <Calendar className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              </div>
              <div className="relative">
                <Input type="date" value={to} onChange={e => setTo(e.target.value)} />
                <Calendar className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              </div>
            </div>
            <div className="flex items-center">
              <Button variant="outline" className="w-full" onClick={() => { setSearch(''); setTag(''); setFrom(''); setTo(''); }}>
                <X size={16} className="mr-2" /> Clear filters
              </Button>
            </div>
          </div>
        </motion.div>

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


