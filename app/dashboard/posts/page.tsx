'use client';

import * as React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Edit, Trash2, Search, Calendar, User } from 'lucide-react';
import { listPosts, deletePost } from '@/lib/api';
import { Toast } from '@/components/toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import type { Post } from '@/lib/api';

export default function DashboardPostsPage() {
  const [posts, setPosts] = React.useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = React.useState<Post[]>([]);
  const [search, setSearch] = React.useState('');
  const [deleteId, setDeleteId] = React.useState<string | null>(null);
  const [deleting, setDeleting] = React.useState(false);
  const [toast, setToast] = React.useState<{ message: string; type: 'success' | 'error' } | null>(null);

  const loadPosts = React.useCallback(() => {
    const allPosts = listPosts();
    setPosts(allPosts);
    setFilteredPosts(allPosts);
  }, []);

  React.useEffect(() => {
    loadPosts();
  }, [loadPosts]);

  React.useEffect(() => {
    if (!search) {
      setFilteredPosts(posts);
      return;
    }
    const q = search.toLowerCase();
    const filtered = posts.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.author.toLowerCase().includes(q) ||
        (p.tags || []).some((t) => t.toLowerCase().includes(q))
    );
    setFilteredPosts(filtered);
  }, [search, posts]);

  const handleDelete = () => {
    if (!deleteId) return;
    setDeleting(true);
    setTimeout(() => {
      const success = deletePost(deleteId);
      setDeleting(false);
      setDeleteId(null);
      if (success) {
        setToast({ message: 'Post deleted successfully', type: 'success' });
        loadPosts();
      } else {
        setToast({ message: 'Failed to delete post', type: 'error' });
      }
    }, 150);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight">All Posts</h1>
          <p className="text-muted-foreground">
            Manage and edit your blog posts ({filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'})
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative max-w-md">
        <Input
          placeholder="Search by title, author, or tags..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      </div>

      {/* Posts List */}
      <div className="space-y-3">
        {filteredPosts.length === 0 ? (
          <Card className="shadow-sm">
            <CardContent className="p-12 text-center">
              <p className="text-lg font-medium text-muted-foreground">
                {search ? 'No posts match your search' : 'No posts yet'}
              </p>
              {!search && (
                <Link href="/dashboard/create">
                  <Button className="mt-4">Create your first post</Button>
                </Link>
              )}
            </CardContent>
          </Card>
        ) : (
          filteredPosts.map((post, index) => {
            const date = new Date(post.date);
            return (
              <Card 
                key={post.id} 
                className="hover:shadow-md transition-all duration-200 hover:scale-[1.01] animate-slide-up shadow-sm"
                style={{ animationDelay: `${index * 30}ms` }}
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between gap-6">
                    <div className="flex-1 space-y-2">
                      <h3 className="text-xl font-semibold tracking-tight">
                        <Link href={`/posts/${post.id}`} className="hover:text-primary transition-colors">
                          {post.title}
                        </Link>
                      </h3>
                      
                      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5" />
                          <span>{post.author}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Calendar className="h-3.5 w-3.5" />
                          <span>{date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        </div>
                      </div>

                      {post.tags && post.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary ring-1 ring-inset ring-primary/20"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 shrink-0">
                      <Link href={`/dashboard/edit/${post.id}`}>
                        <Button variant="outline" size="icon" className="shadow-sm">
                          <Edit className="h-4 w-4" />
                        </Button>
                      </Link>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={() => setDeleteId(post.id)}
                        className="shadow-sm hover:border-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Delete Dialog */}
      <Dialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <DialogContent onClose={() => setDeleteId(null)}>
          <DialogHeader>
            <DialogTitle>Delete Post?</DialogTitle>
            <DialogDescription>
              This action cannot be undone. The post will be permanently deleted.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteId(null)}
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

