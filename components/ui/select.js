export function Select({ children, className = '', ...props }) {
  return (
    <select
      className={'h-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ' + className}
      {...props}
    >
      {children}
    </select>
  );
}


