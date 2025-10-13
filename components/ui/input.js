export function Input({ className = '', ...props }) {
  return (
    <input
      className={
        'h-10 w-full rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-3 py-2 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 ' +
        'placeholder:text-gray-400 dark:placeholder:text-gray-500 ' +
        'hover:border-gray-400 dark:hover:border-gray-500 ' +
        className
      }
      {...props}
    />
  );
}


