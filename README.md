# Volko Learning Lab

A personal learning library built with React, TypeScript, Vite and plain CSS. Lessons combine plain definitions, examples, reusable visual blocks, ten questions drawn from a bank of thirty, and a final application activity.

Static application with no backend or required API keys. The browser saves the theme preference; practice answers and writing drafts last only for the current topic visit.

## Run locally

Use Node.js 24. `.nvmrc` records that recommendation for Node version managers. It is not Maven configuration; it neither installs Node nor configures Vercel by itself.

```sh
npm install
npm run dev
```

| Command           | Purpose                                                |
| ----------------- | ------------------------------------------------------ |
| `npm run dev`     | Development server with automatic updates.             |
| `npm test`        | All tests in `tests/`, using Node's built-in runner.   |
| `npm run build`   | Type-check application and tests, then create `dist/`. |
| `npm run preview` | Serve an existing production build locally.            |

## Project guides

- [Architecture and file responsibilities](docs/architecture.md): folder boundaries, data flow, hash navigation, CSS and practical SOLID examples.
- [Add a study topic](docs/adding-topics.md): lesson files, exercise banks, reusable blocks, final practice and artwork.
- [Project conventions](AGENTS.md): concise instructions for extending the library.

To add a topic, create its lesson and exercise files in `src/data/topics/<slug>/`, use the contracts in `src/types/`, and register it in `src/data/topics.ts`. The topic guide covers the complete process.

## GitHub and Vercel

Static Vite build: `npm run build`, output `dist`, recommended Node 24. With GitHub connected and `main` configured as the production branch, pushes trigger Vercel builds. No environment variables are required by this application.

Only publish intended content: lesson data becomes downloadable JavaScript. `node_modules/` and `dist/` are generated and ignored.

© 2026 Ángela Curzi
