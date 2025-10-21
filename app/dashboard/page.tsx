'use client';

import * as React from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Plus, TrendingUp, Clock, Eye, Sparkles } from 'lucide-react';
import { listPosts } from '@/lib/api';

export default function DashboardOverviewPage() {
  const [stats, setStats] = React.useState({
    totalPosts: 0,
    recentPosts: 0,
    totalTags: 0,
  });

  React.useEffect(() => {
    const posts = listPosts();
    const now = Date.now();
    const weekAgo = now - 7 * 24 * 60 * 60 * 1000;
    const recentPosts = posts.filter((p) => new Date(p.date).getTime() > weekAgo);
    const allTags = new Set<string>();
    posts.forEach((p) => (p.tags || []).forEach((t) => allTags.add(t)));

    setStats({
      totalPosts: posts.length,
      recentPosts: recentPosts.length,
      totalTags: allTags.size,
    });
  }, []);

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">Dashboard</h1>
          <p className="text-muted-foreground">
            Manage your blog posts and content
          </p>
        </div>
        <Link href="/dashboard/create">
          <Button size="lg" className="shadow-md">
            <Plus className="mr-2 h-5 w-5" />
            New Post
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalPosts}</div>
            <p className="text-xs text-muted-foreground mt-1">
              All published articles
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">This Week</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.recentPosts}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Posts from last 7 days
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-all duration-200 hover:scale-[1.02]">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Tags</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{stats.totalTags}</div>
            <p className="text-xs text-muted-foreground mt-1">
              Unique categories
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card className="shadow-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          <Link href="/dashboard/create" className="block">
            <Button variant="outline" size="lg" className="w-full justify-start">
              <Plus className="mr-2 h-5 w-5" />
              Create New Post
            </Button>
          </Link>
          <Link href="/dashboard/posts" className="block">
            <Button variant="outline" size="lg" className="w-full justify-start">
              <FileText className="mr-2 h-5 w-5" />
              View All Posts
            </Button>
          </Link>
          <Link href="/" className="block">
            <Button variant="outline" size="lg" className="w-full justify-start">
              <Eye className="mr-2 h-5 w-5" />
              View Public Site
            </Button>
          </Link>
        </CardContent>
      </Card>

      {/* Welcome Card */}
      <Card className="bg-gradient-to-br from-primary/10 via-primary/5 to-background border-primary/20 shadow-sm">
        <CardHeader>
          <CardTitle>Welcome to Your Blog Dashboard</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <p className="text-sm text-muted-foreground leading-relaxed">
            This is your content management hub. From here you can create new posts,
            manage existing content, and view your blog's statistics.
          </p>
          <div className="grid gap-2 text-sm">
            <div className="flex items-start gap-2">
              <div className="rounded-full bg-primary/20 p-1 mt-0.5">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              </div>
              <span className="text-muted-foreground">Create and publish blog posts with rich content</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="rounded-full bg-primary/20 p-1 mt-0.5">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              </div>
              <span className="text-muted-foreground">Organize posts with tags and categories</span>
            </div>
            <div className="flex items-start gap-2">
              <div className="rounded-full bg-primary/20 p-1 mt-0.5">
                <div className="h-1.5 w-1.5 rounded-full bg-primary" />
              </div>
              <span className="text-muted-foreground">Track your content with analytics and insights</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

