'use client';

import * as React from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ToastProps {
  message: string;
  type?: 'success' | 'error' | 'info';
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type = 'info', onClose, duration = 3000 }: ToastProps) {
  React.useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  const icons = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
  };

  const Icon = icons[type];

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-in slide-in-from-bottom-5">
      <div
        className={cn(
          'flex items-center gap-3 border-3 border-border bg-background p-4 shadow-lg min-w-[300px]',
          type === 'success' && 'border-green-500',
          type === 'error' && 'border-red-500'
        )}
      >
        <Icon className="h-5 w-5 flex-shrink-0" />
        <p className="flex-1 text-sm font-bold uppercase tracking-tight">
          {message}
        </p>
        <button
          onClick={onClose}
          className="flex-shrink-0 opacity-70 transition-opacity hover:opacity-100"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
