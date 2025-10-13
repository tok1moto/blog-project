# Personal Blogging Platform (Next.js Frontend)

An interactive single-page blogging platform built with Next.js and Tailwind CSS, featuring a smooth and responsive UI powered by shadcn/ui components.
The app supports full CRUD functionality — users can list, search/filter, view, create, edit, and delete posts — with a mock REST API backed by localStorage for offline testing and a Node.js + Express + MongoDB backend for persistent data storage.
The backend API manages all blog operations and provides endpoints for fetching, creating, updating, and deleting posts. MongoDB ensures scalability and flexibility in storing post data, while Express handles routing and middleware efficiently.
This project demonstrates end-to-end web app development — from frontend interactivity (Next.js) to backend API design (Express) and database integration (MongoDB).

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

