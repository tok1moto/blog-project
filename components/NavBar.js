import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function NavBar() {
  const [theme, setTheme] = useState('light');
  useEffect(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('theme') : null;
    const initial = saved || 'light';
    setTheme(initial);
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', initial === 'dark');
    }
  }, []);

  function toggleTheme() {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    if (typeof document !== 'undefined') {
      document.documentElement.classList.toggle('dark', next === 'dark');
    }
    if (typeof window !== 'undefined') localStorage.setItem('theme', next);
  }

  return (
    <nav className="border-b border-gray-200 dark:border-gray-700">
      <div className="container flex items-center justify-between py-4">
        <div className="flex items-center gap-4">
          <Link href="/" className="font-semibold text-lg">My Blog</Link>
          <Link href="/create" className="text-sm text-blue-600 dark:text-blue-400">New Post</Link>
        </div>
        <button onClick={toggleTheme} className="px-3 py-1 rounded border border-gray-300 dark:border-gray-600 text-sm">
          {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
        </button>
      </div>
    </nav>
  );
}


