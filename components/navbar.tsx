'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import { Plus, LayoutDashboard, Home, PenTool } from 'lucide-react';
import { cn } from '@/lib/utils';

export function Navbar() {
  const pathname = usePathname();
  const isDashboard = pathname?.startsWith('/dashboard');

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 lg:gap-10">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="rounded-lg bg-gradient-to-br from-primary to-primary/80 p-2 shadow-md transition-all duration-200 group-hover:shadow-lg group-hover:scale-105">
                <PenTool className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-lg font-bold tracking-tight hidden sm:inline-block">
                My Blog
              </span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-1">
              <Link href="/">
                <Button
                  variant={!isDashboard ? 'default' : 'ghost'}
                  size="sm"
                  className={cn(
                    'transition-all duration-200',
                    !isDashboard && 'pointer-events-none'
                  )}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Home
                </Button>
              </Link>
              <Link href="/dashboard">
                <Button
                  variant={isDashboard ? 'default' : 'ghost'}
                  size="sm"
                  className={cn(
                    'transition-all duration-200',
                    isDashboard && 'pointer-events-none'
                  )}
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/dashboard/create">
              <Button size="sm" className="shadow-sm">
                <Plus className="mr-2 h-4 w-4" />
                <span className="hidden sm:inline">New Post</span>
                <span className="sm:hidden">New</span>
              </Button>
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
