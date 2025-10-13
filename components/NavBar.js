import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ModeToggle from '@/components/ModeToggle';
import { Plus } from 'lucide-react';

export default function NavBar() {
  return (
    <nav className="border-b border-gray-200 dark:border-gray-700 bg-white/60 dark:bg-gray-900/60 backdrop-blur">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-6">
          <Link href="/" className="font-semibold text-lg">My Blog</Link>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/create">
            <Button>
              <Plus className="mr-2" size={16} /> New Post
            </Button>
          </Link>
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
}


