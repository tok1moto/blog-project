import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEY = 'blog_posts_v1';

function readAll() {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeAll(posts) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

function seedIfEmpty() {
  const posts = readAll();
  if (posts.length === 0) {
    const now = new Date().toISOString();
    const demo = [
      {
        id: uuidv4(),
        title: 'Welcome to the Blog',
        author: 'Admin',
        date: now,
        tags: ['intro', 'nextjs'],
        content: 'This is a sample post to get you started.',
      },
      {
        id: uuidv4(),
        title: 'Building with Tailwind CSS',
        author: 'Jane Doe',
        date: now,
        tags: ['tailwind', 'css'],
        content: 'Tailwind enables rapid UI development with utility classes.',
      },
    ];
    writeAll(demo);
  }
}

export function listPosts({ search = '', tag = '', from = '', to = '' } = {}) {
  seedIfEmpty();
  let posts = readAll();
  if (search) {
    const q = search.toLowerCase();
    posts = posts.filter(p =>
      p.title.toLowerCase().includes(q) ||
      p.content.toLowerCase().includes(q) ||
      p.author.toLowerCase().includes(q)
    );
  }
  if (tag) {
    posts = posts.filter(p => (p.tags || []).includes(tag));
  }
  if (from) {
    const f = new Date(from).getTime();
    posts = posts.filter(p => new Date(p.date).getTime() >= f);
  }
  if (to) {
    const t = new Date(to).getTime();
    posts = posts.filter(p => new Date(p.date).getTime() <= t);
  }
  return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
}

export function getPost(id) {
  seedIfEmpty();
  return readAll().find(p => p.id === id) || null;
}

export function createPost({ title, author, date, tags, content }) {
  const posts = readAll();
  const newPost = {
    id: uuidv4(),
    title: title?.trim() || 'Untitled',
    author: author?.trim() || 'Anonymous',
    date: date || new Date().toISOString(),
    tags: Array.isArray(tags) ? tags : String(tags || '')
      .split(',')
      .map(s => s.trim())
      .filter(Boolean),
    content: content || '',
  };
  posts.push(newPost);
  writeAll(posts);
  return newPost;
}

export function updatePost(id, updates) {
  const posts = readAll();
  const idx = posts.findIndex(p => p.id === id);
  if (idx === -1) return null;
  const merged = {
    ...posts[idx],
    ...updates,
    tags: updates.tags !== undefined
      ? (Array.isArray(updates.tags) ? updates.tags : String(updates.tags || '')
        .split(',')
        .map(s => s.trim())
        .filter(Boolean))
      : posts[idx].tags,
  };
  posts[idx] = merged;
  writeAll(posts);
  return merged;
}

export function deletePost(id) {
  const posts = readAll();
  const next = posts.filter(p => p.id !== id);
  writeAll(next);
  return posts.length !== next.length;
}


