'use client';

import * as React from 'react';
import { Navbar } from '@/components/navbar';
import { PostCard } from '@/components/post-card';
import { Input } from '@/components/ui/input';
import { Select } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Search, X, Filter, Sparkles, TrendingUp } from 'lucide-react';
import { listPosts } from '@/lib/api';
import type { Post } from '@/lib/api';

export default function HomePage() {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [allTags, setAllTags] = React.useState<string[]>([]);
  const [search, setSearch] = React.useState('');
  const [tag, setTag] = React.useState('');
  const [from, setFrom] = React.useState('');
  const [to, setTo] = React.useState('');
  const [loading, setLoading] = React.useState(true);
  const [showFilters, setShowFilters] = React.useState(false);

  React.useEffect(() => {
    // Get all tags
    const allPosts = listPosts();
    const tags = new Set<string>();
    allPosts.forEach((p) => (p.tags || []).forEach((t) => tags.add(t)));
    setAllTags(Array.from(tags));
  }, []);

  React.useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      const result = listPosts({ search, tag, from, to });
      setPosts(result);
      setLoading(false);
    }, 200);
    return () => clearTimeout(timer);
  }, [search, tag, from, to]);

  const clearFilters = () => {
    setSearch('');
    setTag('');
    setFrom('');
    setTo('');
  };

  const hasFilters = search || tag || from || to;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navbar />
      
      <main className="container py-8 md:py-12 space-y-8 md:space-y-12">
        {/* Hero Section */}
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-background border shadow-lg p-8 md:p-12 lg:p-16 animate-fade-in">
          <div className="absolute top-6 right-6 md:top-8 md:right-8 opacity-20">
            <Sparkles className="h-16 w-16 md:h-20 md:w-20 text-primary" />
          </div>
          <div className="relative z-10 max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-4 md:mb-6 font-bold tracking-tight text-balance">
              Welcome to{' '}
              <span className="bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
                My Blog
              </span>
            </h1>
            <p className="text-base md:text-lg lg:text-xl text-muted-foreground max-w-2xl text-balance">
              Discover stories, thinking, and expertise from writers on any topic.
            </p>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              <h2 className="text-2xl font-semibold tracking-tight">Latest Posts</h2>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowFilters(!showFilters)}
              className="gap-2"
            >
              <Filter className="h-4 w-4" />
              {showFilters ? 'Hide Filters' : 'Show Filters'}
            </Button>
          </div>

          {showFilters && (
            <div className="rounded-lg border bg-card p-4 md:p-6 shadow-sm animate-slide-down">
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search posts..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={tag} onChange={(e) => setTag(e.target.value)}>
                  <option value="">All Tags</option>
                  {allTags.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </Select>

                <Input
                  type="date"
                  value={from}
                  onChange={(e) => setFrom(e.target.value)}
                  placeholder="From date"
                />

                <Input
                  type="date"
                  value={to}
                  onChange={(e) => setTo(e.target.value)}
                  placeholder="To date"
                />
              </div>

              {hasFilters && (
                <div className="mt-4 flex items-center justify-between border-t pt-4">
                  <p className="text-sm text-muted-foreground">
                    {posts.length} {posts.length === 1 ? 'post' : 'posts'} found
                  </p>
                  <Button variant="ghost" onClick={clearFilters} size="sm">
                    <X className="mr-2 h-4 w-4" />
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Posts Grid */}
        <div className="space-y-6">
          {loading ? (
            <div className="rounded-lg border bg-card p-12 text-center shadow-sm">
              <div className="flex flex-col items-center gap-3">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                <p className="text-sm text-muted-foreground">Loading posts...</p>
              </div>
            </div>
          ) : posts.length === 0 ? (
            <div className="rounded-lg border bg-card p-12 text-center shadow-sm">
              <p className="text-lg font-medium text-muted-foreground">
                No posts found.
              </p>
              {hasFilters && (
                <Button variant="outline" onClick={clearFilters} size="sm" className="mt-4">
                  Clear filters to see all posts
                </Button>
              )}
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2">
              {posts.map((post, index) => (
                <div
                  key={post.id}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className="animate-slide-up"
                >
                  <PostCard post={post} />
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
