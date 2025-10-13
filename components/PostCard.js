import Link from 'next/link';

export default function PostCard({ post }) {
  const date = new Date(post.date).toLocaleDateString();
  return (
    <article className="rounded border border-gray-200 dark:border-gray-700 p-4 hover:shadow-sm transition">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          <Link href={`/posts/${post.id}`}>{post.title}</Link>
        </h3>
        <span className="text-xs text-gray-500">{date}</span>
      </div>
      <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">by {post.author}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {(post.tags || []).map((t) => (
          <span key={t} className="text-xs bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded">
            {t}
          </span>
        ))}
      </div>
      <p className="mt-3 text-sm line-clamp-3">{post.content}</p>
      <div className="mt-3">
        <Link href={`/posts/${post.id}`} className="text-blue-600 dark:text-blue-400 text-sm">Read more →</Link>
      </div>
    </article>
  );
}


