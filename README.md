# Volko Learning Lab

Volko's personal learning library: a place to turn handwritten notes into searchable lessons with clear examples and a little practice. The first lesson covers all five SOLID principles, with TypeScript examples, analogies, a quiz, and further reading.

Built with React, TypeScript, Vite, and plain CSS. Topic content lives in one local TypeScript file. There is no backend, account system, database, or note editor. Only the light/dark theme preference is saved in the browser's localStorage; quiz answers are temporary.

## Run locally

Use **Node.js 24** and npm. The `.nvmrc` file records the Node version.

```sh
npm install
npm run dev
```

Open the local URL Vite prints. These commands work in PowerShell and other common shells.

| Command           | What it does                                                      |
| ----------------- | ----------------------------------------------------------------- |
| `npm run dev`     | Starts Vite and updates the browser as you edit.                  |
| `npm test`        | Runs the search and category-filter tests.                        |
| `npm run build`   | Checks TypeScript, then creates the production files in `dist/`.  |
| `npm run preview` | Serves an existing production build locally. Run the build first. |

## How the pieces connect

Start at the top of this list and follow the data into the screen:

| File                                 | Responsibility                                                                                                   |
| ------------------------------------ | ---------------------------------------------------------------------------------------------------------------- |
| `index.html`                         | Provides the page metadata and the `root` element where React mounts.                                            |
| `src/main.tsx`                       | Loads the CSS and renders `App` inside React's `StrictMode`.                                                     |
| `src/App.tsx`                        | Chooses the library or a topic from the URL, owns search/filter state, and renders the shared header and footer. |
| `src/data/topics.ts`                 | Defines the small content types and exports the categories and lessons. Edit this for tomorrow's note.           |
| `src/components/Library.tsx`         | Displays the featured lesson, search, category buttons, topic cards, and empty state.                            |
| `src/filterTopics.ts`                | Filters the supplied data without touching the screen or changing the original array.                            |
| `src/components/TopicDetail.tsx`     | Receives a topic and composes its reusable reading blocks, optional exercise, recap, and sources.                |
| `src/components/Exercise.tsx`        | Owns the selected answer and shows feedback when you check it.                                                   |
| `src/components/LessonBlocks.tsx`    | Contains the reusable code example, analogy, takeaway, and recap components.                                     |
| `src/components/TableOfContents.tsx` | Builds the sidebar links from section IDs and titles.                                                            |
| `src/components/LibraryParts.tsx`    | Shares the tag list and back-to-library link across screens.                                                     |
| `src/components/ThemeToggle.tsx`     | Switches between light and dark themes and remembers the preference.                                             |
| `src/styles.css`                     | Contains the visual design, responsive layouts, focus styles, and reduced-motion rules.                          |
| `src/filterTopics.test.ts`           | Checks the filtering behavior using Node's built-in test runner.                                                 |

`package.json` defines dependencies and commands; `package-lock.json` locks installed versions. `vite.config.ts` enables React, and `tsconfig.json` enables strict TypeScript checks. `public/favicon.svg` is the browser icon. `.gitignore` keeps generated files, local settings, and common credential files out of Git.

Search looks at the title, description, category label, and tags. It ignores case and surrounding whitespace; every word you type must appear somewhere in those fields. The selected category is applied too. `App` keeps these choices when you open a lesson and return to the library in the same session.

Topic links use `#/topics/solid`; section links add a section ID, such as `#/topics/solid/srp`. The hash stays in the browser, so direct links and refreshes work on a static host without server routing rules. Browser Back and Forward work too.

The header's theme button switches light/dark mode and saves the choice under `volko-theme`. Without a saved choice, the page starts with your system preference. A small script in `index.html` applies the theme before the first paint; `ThemeToggle` handles later button clicks. If browser storage is blocked, switching still works for the current page.

The reading UI is assembled from small components that tomorrow's topic can reuse:

| Visible piece                      | Component and inputs                                                        |
| ---------------------------------- | --------------------------------------------------------------------------- |
| Back to the library                | `BackToLibrary`: optional CSS class and arrow direction.                    |
| Your pocket recap                  | `Recap`: the recap strings.                                                 |
| Put your intuition to the test     | `Exercise`: the question, optional code, answer choices, and feedback.      |
| Remember this                      | `Takeaway`: the short takeaway text.                                        |
| Before/after code or exercise code | `CodeExample`: code and an accessible label, with an optional header.       |
| Think of it this way               | `Analogy`: the analogy text.                                                |
| In this note sidebar               | `TableOfContents`: topic ID, section links, and whether an exercise exists. |
| Colored topic tags                 | `Tags`: the tag strings.                                                    |

Related reading blocks share one file because they are small and have no state. Each is a separate component with a clear input; a new topic uses them by supplying content, without duplicating JSX. `Exercise` stays separate because it manages answer selection and feedback.

## Add tomorrow's topic

Open `src/data/topics.ts`. Paste this object **inside the `topics` array**, before the current first object to feature it, or at the end to keep the current feature. Keep the comma after the object.

```ts
{
  id: 'present-simple',
  title: 'Present Simple: Daily Habits',
  description: 'Describe routines and build small, useful English sentences.',
  category: 'english',
  tags: ['Grammar', 'Daily life'],
  readMinutes: 3,
  introduction:
    'Use the present simple to describe habits and regular activities.',
  sections: [
    {
      id: 'habits',
      title: 'Start with a familiar routine',
      explanation:
        'With I, you, we, and they, use the base verb: I study every day. With he, she, and it, the verb usually takes -s or -es: She studies every day.',
      takeaway: 'I study. She studies. Start with one habit you know well.',
    },
  ],
  recap: [
    'Use the present simple for regular habits.',
    'Remember the verb ending with he, she, and it.',
  ],
},
```

Give each topic a unique URL-friendly `id`. Give its sections unique IDs too; reserve `introduction`, `practice`, and `recap` for the built-in sections. Set `readMinutes` to your estimated reading time. The **first topic in the array is featured**.

The `Topic` and `TopicSection` types at the top of the file show the available fields. Fields marked `?` are optional: a language note can omit code and the exercise entirely. The SOLID entry demonstrates the optional before/after examples, analogies, quiz, and sources. Code strings are displayed as text, never executed by the app.

To add a category, add an entry to `categories`:

```ts
{ id: 'science', label: 'Science', color: '#287b6c' },
```

Then use `category: 'science'` in the topic. The ID must match exactly. Its filter button and label come from the data automatically. Choose a color that remains readable on a light background.

Save, check the new note in the browser, and run `npm test` and `npm run build` before publishing your change.

## Where SOLID helps here

Content, filtering, layout, and quiz interaction have separate responsibilities. Components accept focused props, and the detail view renders the same content shape for different subjects. New topics and categories extend the collection through data rather than new branches in the renderer.

These are practical uses of single responsibility, focused interfaces, and extension through composition. `Takeaway` needs only text; `TableOfContents` needs only navigable section fields, not code examples or lesson explanations. Shared blocks keep the same behavior wherever they are used. There is no inheritance hierarchy or external service boundary that calls for extra machinery: LSP and DIP remain useful design checks, not reasons to add artificial classes or dependency injection.

## GitHub to Vercel

The deployment is a static Vite build: **build command `npm run build`, output directory `dist`, Node.js 24**.

Once Vercel is connected to this GitHub repository with `main` as its production branch, a push to `main` triggers a new build. A successful build updates the production website. Branches and pull requests can receive preview deployments so you can inspect a change before merging it. A failed build leaves the previous successful production deployment available.

The app needs no API keys or environment variables. Everything committed as lesson content becomes part of the downloadable site, so keep notes intended for publication here. `.env` files, `.vercel`, dependency folders, and build output are ignored; check the Git diff before committing any additional files.

Volko © 2026
