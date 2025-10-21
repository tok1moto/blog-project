import { v4 as uuidv4 } from 'uuid';

export interface Post {
  id: string;
  title: string;
  author: string;
  date: string;
  tags: string[];
  content: string;
}

export interface ListPostsOptions {
  search?: string;
  tag?: string;
  from?: string;
  to?: string;
}

const STORAGE_KEY = 'blog_posts_v1';

function readAll(): Post[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeAll(posts: Post[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(posts));
}

function seedIfEmpty(): void {
  const posts = readAll();
  if (posts.length === 0) {
    const now = new Date().toISOString();
    const demo: Post[] = [
      {
        id: uuidv4(),
        title: 'Welcome to the Brutalist Blog',
        author: 'Admin',
        date: now,
        tags: ['intro', 'design'],
        content: 'Bold. Raw. Uncompromising. This is a blogging platform that doesn\'t apologize for its aesthetic. Strong typography, sharp grids, and visible structure create an interface that demands attention.',
      },
      {
        id: uuidv4(),
        title: 'The Power of Visual Hierarchy',
        author: 'Jane Doe',
        date: now,
        tags: ['design', 'brutalism'],
        content: 'In brutalist design, every element has purpose. Heavy borders define boundaries. Stark contrast guides the eye. Typography commands presence. This is design stripped to its essence.',
      },
      {
        id: uuidv4(),
        title: 'Building with Intent',
        author: 'John Smith',
        date: now,
        tags: ['development', 'nextjs'],
        content: 'Modern brutalism in web design isn\'t about being difficult—it\'s about being honest. Every border, every weight, every spacing decision is deliberate. The interface doesn\'t hide its construction; it celebrates it.',
      },
    ];
    writeAll(demo);
  }
}

export function listPosts(options: ListPostsOptions = {}): Post[] {
  seedIfEmpty();
  const { search = '', tag = '', from = '', to = '' } = options;
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
  
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getPost(id: string): Post | null {
  seedIfEmpty();
  return readAll().find(p => p.id === id) || null;
}

export function createPost(data: Partial<Post>): Post {
  const posts = readAll();
  const newPost: Post = {
    id: uuidv4(),
    title: data.title?.trim() || 'Untitled',
    author: data.author?.trim() || 'Anonymous',
    date: data.date || new Date().toISOString(),
    tags: Array.isArray(data.tags) 
      ? data.tags 
      : String(data.tags || '')
          .split(',')
          .map(s => s.trim())
          .filter(Boolean),
    content: data.content || '',
  };
  posts.push(newPost);
  writeAll(posts);
  return newPost;
}

export function updatePost(id: string, updates: Partial<Post>): Post | null {
  const posts = readAll();
  const idx = posts.findIndex(p => p.id === id);
  if (idx === -1) return null;
  
  const merged: Post = {
    ...posts[idx],
    ...updates,
    tags: updates.tags !== undefined
      ? (Array.isArray(updates.tags) 
          ? updates.tags 
          : String(updates.tags || '')
              .split(',')
              .map(s => s.trim())
              .filter(Boolean))
      : posts[idx].tags,
  };
  
  posts[idx] = merged;
  writeAll(posts);
  return merged;
}

export function deletePost(id: string): boolean {
  const posts = readAll();
  const next = posts.filter(p => p.id !== id);
  writeAll(next);
  return posts.length !== next.length;
}

