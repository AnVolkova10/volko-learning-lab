# Volko Learning Lab

A personal learning library built with React, TypeScript, Vite, and plain CSS. SOLID is the first topic: five plain definitions, detailed explanations, analogies, before/after examples, and five practice questions.

One file per topic. No backend, accounts, database, or editor. The browser saves only the light/dark preference; quiz answers last while the topic stays open.

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

## Every file and its responsibility

Component paths below are relative to `src/components/`. Folders group related work; small related components can share a file.

| File                         | Responsibility                                                                                                  |
| ---------------------------- | --------------------------------------------------------------------------------------------------------------- |
| `index.html`                 | HTML entry point, metadata, React mounting element, and small pre-paint theme initializer.                      |
| `src/main.tsx`               | Mounts `App` with `createRoot` and `StrictMode`, and loads the CSS entry point.                                 |
| `src/App.tsx`                | URL navigation, search/filter state, screen selection, shared header/footer.                                    |
| `src/App.css`                | Header, footer, and missing-page layout.                                                                        |
| `src/data/types.ts`          | Contracts for categories, sections, questions, five-question sets, and topics.                                  |
| `src/data/categories.ts`     | Category IDs, labels, and accent colors.                                                                        |
| `src/data/topics.ts`         | Small catalog of topic imports. The first entry is featured.                                                    |
| `src/data/topics/solid.ts`   | SOLID content only. Code strings are displayed, never executed by the app.                                      |
| `src/lib/filterTopics.ts`    | Pure matching logic: takes data and criteria, returns matches without mutation or browser access.               |
| `library/Library.tsx`        | Introduction, feature, search, category filters, cards, empty state.                                            |
| `library/intro.css`          | Introduction and decorative paper note.                                                                         |
| `library/featured.css`       | Featured card and decorative letter blocks.                                                                     |
| `library/library.css`        | Collection heading, search, filters, empty state, closing note.                                                 |
| `library/cards.css`          | Topic cards and collection note.                                                                                |
| `topic/TopicDetail.tsx`      | Composes a topic's reusable reading and practice blocks.                                                        |
| `topic/TableOfContents.tsx`  | Builds links from topic ID and section navigation fields.                                                       |
| `topic/topic.css`            | Reading layout, header, and concept sections.                                                                   |
| `topic/sidebar.css`          | Desktop/mobile table of contents.                                                                               |
| `lesson/LessonBlocks.tsx`    | Stateless SimpleDefinition, Analogy, CodeExample, Takeaway, and Recap.                                          |
| `lesson/lesson.css`          | Styles for those reading blocks.                                                                                |
| `practice/Practice.tsx`      | Renders the five-question practice section.                                                                     |
| `practice/Exercise.tsx`      | One question's selected answer, submission, feedback, and retry focus.                                          |
| `practice/practice.css`      | Question layout, choices, feedback.                                                                             |
| `shared/LibraryParts.tsx`    | Reusable Tags and BackToLibrary components.                                                                     |
| `shared/shared.css`          | Shared tags, badges, buttons, and links.                                                                        |
| `theme/ThemeToggle.tsx`      | Switches theme and safely stores the preference.                                                                |
| `theme/theme.css`            | Theme-button appearance and responsive sizing.                                                                  |
| `src/styles/index.css`       | Explicit CSS load order: general rules before feature/block rules.                                              |
| `src/styles/base.css`        | Global typography, palette variables, reset, accessibility preferences.                                         |
| `tests/filterTopics.test.ts` | Search fields, case, multiple words, combined filters, empty results.                                           |
| `tests/content.test.ts`      | Unique links, categories, definitions, five questions, valid answers.                                           |
| `tests/render.test.ts`       | React markup checks for five definitions/questions and non-code topics. This is not a browser interaction test. |
| `package.json`               | Commands and dependencies.                                                                                      |
| `package-lock.json`          | Exact dependency resolution; generated by npm.                                                                  |
| `vite.config.ts`             | React support in Vite.                                                                                          |
| `tsconfig.json`              | Strict TypeScript checking for application and tests.                                                           |
| `.nvmrc`                     | Recommended Node major version: 24.                                                                             |
| `.gitignore`                 | Excludes generated output, dependencies, local configuration, common credentials.                               |
| `public/favicon.svg`         | Browser-tab icon.                                                                                               |

`node_modules/` and `dist/` are generated and ignored. Do not edit them.

## Data flow

`topics/solid.ts` exports a `Topic`. `data/topics.ts` registers it. `App` finds the requested topic by ID and passes it to `TopicDetail`. The page maps its sections to reusable blocks. `Practice` maps the five question objects to five independent `Exercise` components.

`Library` calls `filterTopics`. Every search word must occur somewhere in the title, description, category label, or tags. Case and surrounding spaces are ignored. The category filter applies at the same time. `App` preserves these choices when you visit a lesson and return.

## The hash functions in App

For `https://example.com/#/topics/solid/srp`, `window.location.hash` is `#/topics/solid/srp`. The fragment stays in the browser, so a static host needs no extra server route.

1. `useState(window.location.hash)` reads the initial fragment, including a direct lesson link.
2. `hash.split("/")` gives `["#", "topics", "solid", "srp"]`. `const [, route, topicId]` intentionally skips the first item and reads the view and topic ID.
3. `isLibrary` recognizes an empty/home fragment. Otherwise `topics.find(...)` selects the topic. Unknown topics show the missing-page view.
4. The first effect registers `onHashChange`. Links and browser Back/Forward change the fragment; the handler copies it into React state, causing a render. Cleanup removes both listeners so they cannot accumulate.
5. `onSamePageLink` handles an edge case: clicking the current section again emits no hashchange. It finds the clicked link (even through its arrow), checks for the same fragment, and calls `focusPage` directly. Modified clicks, other mouse buttons, and already-handled events retain their normal behavior.
6. The second effect runs after rendering, updates the tab title, and calls `focusPage` after the destination elements exist.
7. `focusPage` reads the optional section ID. For `srp`, it focuses and scrolls to `id="srp"`. Otherwise it focuses `h1` and scrolls to the top. `preventScroll` separates focus from scrolling; `?.` safely skips a missing element.

The skip link focuses `main` without changing the hash route. No routing library is needed for these two views.

## Add tomorrow's topic

1. Create `src/data/topics/your-topic.ts`, following `solid.ts`. Import `Topic` from `../types.ts` and annotate the exported topic with it.
2. Use a unique lowercase/hyphenated topic ID and a category ID from `categories.ts`.
3. Each section needs `id`, `title`, `definition`, and `explanation`. The definition is direct wording; comparisons belong in optional `analogy`. Optional fields also include `letter`, before/after code, and takeaway.
4. Supply **five** objects in `exercises`. Each has a unique `id`, `title`, `prompt`, `options`, and a matching `correctOptionId`. Every option has its own explanation. Code is optional, so language/design questions use the same UI.
5. Import your topic in `src/data/topics.ts` and add it to the array. Put it first to feature it.
6. Run tests/build and inspect it in the browser.

For example, after creating `topics/present-simple.ts`:

```ts
// src/data/topics.ts
import type { Topic } from "./types.ts";
import { solid } from "./topics/solid.ts";
import { presentSimple } from "./topics/present-simple.ts";

export const topics: Topic[] = [presentSimple, solid];
```

`FiveExercises` is a tuple with five slots. TypeScript rejects four or six questions; tests validate actual data too. Reserve section IDs `introduction`, `practice`, and `recap` for built-in navigation.

To add a category, add `{ id: "science", label: "Science", color: "#287b6c" }` to `categories.ts`, then use `category: "science"` in the topic. Filters are generated from that list.

## CSS and themes

CSS is grouped by feature beside its TSX. Each sheet includes its responsive and dark overrides. Shared typography/palette variables belong in `base.css`; shared buttons/badges belong in `shared.css`. `index.css` makes the cascade order explicit. There is no duplicate light/dark component tree.

`index.html` applies the saved/system theme before painting. `ThemeToggle` handles later changes and stores `volko-theme`. If storage is blocked, switching still works for the current page. Quiz answers are not persisted.

## Practical SOLID

- **S:** Filtering, content, reading blocks, and answer interaction have separate responsibilities. `SimpleDefinition` displays one definition; it does not search or grade answers.
- **O:** A new topic extends the catalog through data. Existing rendering and filtering work without another topic-specific branch. A genuinely new format can still require an intentional renderer change.
- **L:** There is no class hierarchy. As a small structural-contract example, `TableOfContents` accepts section navigation fields; full `TopicSection` objects can be used in that narrower role without changing navigation behavior. Types verify structure, while tests/browser checks verify behavioral promises.
- **I:** `Takeaway` takes text, `Tags` takes tags, and TableOfContents takes navigable fields. They do not need entire topics or unrelated editor callbacks.
- **D:** Library controls call supplied `onQueryChange`/`onCategoryChange` functions instead of knowing how App stores state. This is a small dependency boundary, not a service architecture. There is no backend policy/storage boundary that warrants repository interfaces or an injection framework.

Reuse comes from stable content shapes and focused components, not from one file per HTML element.

## GitHub and Vercel

Static Vite application: build `npm run build`, output `dist`, recommended Node 24. With GitHub connected and `main` as production branch, a push triggers the next Vercel build. No API keys or environment variables are required. A failed build leaves the previous successful deployment available.

Only commit content intended for publication: lesson data becomes downloadable JavaScript.

Ángela Curzi 2026
