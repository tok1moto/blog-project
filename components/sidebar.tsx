'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  FileText,
  Plus,
  Home,
} from 'lucide-react';

const sidebarItems = [
  {
    title: 'Overview',
    href: '/dashboard',
    icon: LayoutDashboard,
  },
  {
    title: 'All Posts',
    href: '/dashboard/posts',
    icon: FileText,
  },
  {
    title: 'Create New',
    href: '/dashboard/create',
    icon: Plus,
  },
  {
    title: 'Public View',
    href: '/',
    icon: Home,
  },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex w-64 border-r bg-card/50 backdrop-blur-sm">
      <div className="flex h-full flex-col w-full">
        <div className="border-b p-6">
          <h2 className="text-lg font-semibold tracking-tight">
            Navigation
          </h2>
        </div>
        
        <nav className="flex-1 p-3">
          <ul className="space-y-1">
            {sidebarItems.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      'flex items-center gap-3 px-3 py-2.5 text-sm font-medium rounded-md transition-all duration-200',
                      isActive
                        ? 'bg-primary text-primary-foreground shadow-sm'
                        : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {item.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        
        <div className="border-t p-4">
          <div className="rounded-lg bg-muted/50 p-3">
            <p className="text-xs text-muted-foreground">
              Blog Platform v1.0
            </p>
          </div>
        </div>
      </div>
    </aside>
  );
}
