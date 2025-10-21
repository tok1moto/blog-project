# Brutalist Blog Platform

A bold, uncompromising blogging platform built with modern brutalist design principles.

## 🎨 Design Philosophy

This platform embraces **modern brutalism** — a design aesthetic that celebrates raw, honest, and functional interfaces:

### Core Principles

- **Strong Visual Hierarchy**: Heavy, sans-serif typography with extreme font weights (900)
- **High Contrast**: Pure black/white color schemes with minimal accent colors
- **Visible Structure**: Thick borders (3-5px) that define clear boundaries
- **Grid-Based Layouts**: Structured, geometric arrangements
- **Minimal Animation**: Sharp, instantaneous transitions (0.1s max)
- **Raw Typography**: Uppercase headings, bold tracking, zero border radius

### Design Tokens

```css
/* Typography */
- Font Weights: 700 (bold), 900 (black)
- Border Widths: 3px, 5px
- Border Radius: 0 (completely square)
- Letter Spacing: -0.02em for large text

/* Colors (both light/dark maintain brutalist contrast) */
- Light Mode: Black text on white background
- Dark Mode: White text on black background
```

## 🏗️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript
- **Styling**: TailwindCSS + Shadcn UI
- **Theme**: next-themes (dark/light mode)
- **Storage**: LocalStorage (client-side)
- **Icons**: lucide-react

## 📂 Project Structure

```
blog-plat/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout with theme provider
│   ├── page.tsx                 # Public home page
│   ├── posts/
│   │   └── [id]/
│   │       └── page.tsx         # Post detail page
│   └── dashboard/               # Dashboard section
│       ├── layout.tsx           # Dashboard layout with sidebar
│       ├── page.tsx             # Dashboard overview
│       ├── posts/
│       │   └── page.tsx         # Manage all posts
│       ├── create/
│       │   └── page.tsx         # Create new post
│       └── edit/
│           └── [id]/
│               └── page.tsx     # Edit existing post
├── components/                   # React components
│   ├── ui/                      # Shadcn UI components (brutalist-styled)
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── dialog.tsx
│   │   ├── input.tsx
│   │   ├── label.tsx
│   │   ├── select.tsx
│   │   └── textarea.tsx
│   ├── navbar.tsx               # Main navigation
│   ├── sidebar.tsx              # Dashboard sidebar
│   ├── post-card.tsx            # Post list card
│   ├── editor-form.tsx          # Post editor
│   ├── toast.tsx                # Notification toast
│   └── theme-toggle.tsx         # Dark/light mode toggle
├── lib/
│   ├── api.ts                   # Post CRUD operations
│   └── utils.ts                 # Utility functions
├── styles/
│   └── globals.css              # Global styles + brutalist tokens
└── tailwind.config.ts           # Tailwind configuration

```

## 🚀 Getting Started

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

### Type Check

```bash
npx tsc --noEmit
```

## 📱 Features

### Public View
- **Home Page**: Browse all blog posts with advanced filtering
  - Search by title, content, or author
  - Filter by tags
  - Date range filtering
- **Post Detail**: Read full posts with bold typography
- **Responsive Design**: Mobile-first, grid-based layouts

### Dashboard
- **Overview**: Statistics and quick actions
- **All Posts**: Manage posts with search and delete
- **Create Post**: Write new posts with the editor
- **Edit Post**: Update existing posts
- **Dark/Light Mode**: Theme toggle that preserves brutalist aesthetic

## 🎯 Key Components

### Navbar
- Sticky navigation with thick bottom border
- Quick access to public/dashboard views
- New post button and theme toggle

### Sidebar
- Dashboard navigation with active state styling
- Thick borders separating sections
- Bold uppercase labels

### PostCard
- Large, bold titles (3xl/5xl)
- Author and date metadata
- Tag badges with borders
- High-contrast hover states

### EditorForm
- Large input fields with thick borders
- Clear label hierarchy
- Textarea for content with generous padding

### Dialog/Modal
- Centered overlay with dark backdrop
- Thick border (5px) for prominence
- Bold action buttons

## 🎨 Customizing the Design

### Adjusting Border Thickness

Edit `tailwind.config.ts`:
```typescript
borderWidth: {
  '3': '3px',
  '5': '5px',
  '7': '7px', // Add thicker borders
}
```

### Changing Typography

Edit `styles/globals.css`:
```css
h1 { @apply text-5xl md:text-8xl uppercase; } /* Make even bolder */
```

### Modifying Colors

Edit CSS variables in `styles/globals.css`:
```css
:root {
  --foreground: 0 0% 0%;    /* Pure black */
  --background: 0 0% 100%;  /* Pure white */
}
```

## 📊 Data Management

Posts are stored in browser localStorage with the key `blog_posts_v1`. Each post includes:

```typescript
interface Post {
  id: string;
  title: string;
  author: string;
  date: string;      // ISO format
  tags: string[];
  content: string;
}
```

### API Functions

- `listPosts(options)` - Get filtered posts
- `getPost(id)` - Get single post
- `createPost(data)` - Create new post
- `updatePost(id, data)` - Update existing post
- `deletePost(id)` - Delete post

## 🌓 Dark Mode

Both light and dark themes maintain the brutalist aesthetic:

- **Light**: Black text on white, black borders
- **Dark**: White text on black, white borders
- High contrast preserved in both modes
- Theme toggle in navbar

## ♿ Accessibility

- Semantic HTML structure
- ARIA labels where needed
- Focus states with thick ring borders
- Keyboard navigation support
- High contrast for readability

## 📝 Typography Scale

```
text-5xl:  3rem    (48px)  - Page titles
text-6xl:  3.75rem (60px)  - Hero headings
text-7xl:  4.5rem  (72px)  - Large displays
text-8xl:  6rem    (96px)  - Extreme displays
```

All headings use `font-black` (900 weight) and `uppercase` by default.

## 🔧 Technical Notes

- **Client-side rendering** for all pages (uses `'use client'`)
- **LocalStorage** persistence (no backend required)
- **Simulated delays** for realistic UX (150-200ms)
- **TypeScript** for type safety
- **Responsive breakpoints**: sm (640px), md (768px), lg (1024px)

## 🎭 Design Inspiration

This platform draws from:
- Swiss design and the International Typographic Style
- 1960s Brutalist architecture
- Early web design aesthetics
- Terminal/command-line interfaces
- Protest poster typography

## 📄 License

This is a demonstration project. Feel free to use and modify as needed.

## 🤝 Contributing

When contributing, maintain these principles:
- No rounded corners (border-radius: 0)
- Bold typography (font-weight: 700-900)
- Thick borders (3-5px minimum)
- High contrast colors
- Minimal animations
- Uppercase for emphasis
- Grid-based layouts

---

**Built with intention. Designed with confidence. Styled with brutality.**
