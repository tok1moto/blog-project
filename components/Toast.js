import { useEffect } from 'react';

export default function Toast({ message, type = 'success', onClose, duration = 2000 }) {
  useEffect(() => {
    const id = setTimeout(() => onClose?.(), duration);
    return () => clearTimeout(id);
  }, [duration, onClose]);

  const color = type === 'error' ? 'bg-red-600' : 'bg-green-600';

  return (
    <div className={`fixed bottom-4 left-1/2 -translate-x-1/2 text-white px-4 py-2 rounded shadow ${color}`}>
      {message}
    </div>
  );
}


