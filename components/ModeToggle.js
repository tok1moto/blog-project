import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';

export default function ModeToggle() {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  // Avoid rendering theme-dependent UI on the server to prevent hydration mismatch
  if (!mounted) {
    return <Button variant="outline" size="icon" aria-label="Toggle theme" style={{ visibility: 'hidden' }} />;
  }

  const isDark = resolvedTheme === 'dark';
  return (
    <Button variant="outline" size="icon" aria-label="Toggle theme" onClick={() => setTheme(isDark ? 'light' : 'dark')}>
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </Button>
  );
}


