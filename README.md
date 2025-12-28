# Task Tracker

Lightweight Task Tracker built with React (hooks only). It provides task listing, add/edit/delete, search with debounce, filter by status, and sorting. Data is persisted locally using a small mock API that stores tasks in `localStorage`.

## Quick Start

Install dependencies:

```bash
npm ci
```

Run development server:

```bash
npm start
```

Build production bundle:

```bash
npm run build
```

Serve production build locally:

```bash
npx serve -s build
```

## Project Structure (important files)

- `src/App.js` — main app container
- `src/api/mockApi.js` — localStorage-backed mock API for persistence
- `src/hooks/useTasks.js` — task state management and CRUD
- `src/hooks/useDebounce.js` — debounce utility for search
- `src/hooks/useSort.js` — sorting helper
- `src/components/` — presentational components (`TaskList`, `TaskItem`, `TaskModal`, `FilterBar`, `SearchBar`)
- `public/index.html` — page template (title & meta updated)

## Notes

- This project uses plain CSS (no Tailwind) and a simple PostCSS/autoprefixer setup.
- If you encounter build errors mentioning Tailwind/PostCSS, run `npm ci` then ensure `postcss.config.js` has only autoprefixer configured.

If you'd like, I can run a production build and serve the output here (or guide you through running it locally). Paste any `build.log` contents if a build fails and I'll diagnose the errors.
