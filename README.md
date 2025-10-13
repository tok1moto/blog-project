# Personal Blogging Platform (Next.js Frontend)

Interactive single-page blog UI built with Next.js, Tailwind CSS, and a mock REST API backed by `localStorage`. Supports CRUD: list, search/filter, view, create, edit, and delete posts.

## Features
- Responsive layout with Tailwind
- Post list with search and filters (tag, date range)
- Post details with tag badges and published date
- Create/Edit/Delete posts with confirmation and toasts
- Dark/Light mode toggle (persisted)

## Getting Started

1. Install dependencies
```bash
npm install
```

2. Run the dev server
```bash
npm run dev
```

3. Open `http://localhost:3000`

## Project Structure
- `pages/index.js`: list, search, filters
- `pages/posts/[id].js`: post detail, delete
- `pages/create.js`: new post form
- `pages/edit/[id].js`: edit form
- `components/NavBar.js`: nav + theme toggle
- `components/PostCard.js`: post preview card
- `components/Toast.js`: simple toast component
- `lib/api.js`: mock REST API using `localStorage`

## Notes
- Initial demo posts are seeded on first load
- Data persists per-browser via `localStorage`
- Replace `lib/api.js` with real API calls when backend is available

