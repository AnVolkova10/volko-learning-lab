# Volko Learning Lab

A personal learning library built with React, TypeScript, Vite, and plain CSS. SOLID is the first topic: five plain definitions, detailed explanations, analogies, before/after examples, and a bank of 30 practice questions (10 per visit).

One file per topic. No backend, accounts, database, or editor. The browser saves only the light/dark preference; the current answer lasts until you advance to the next question. Reviewing starts the same selection again with blank answers.

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

| File                                   | Responsibility                                                                                                                |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `index.html`                           | HTML entry point, metadata, React mounting element, and small pre-paint theme initializer.                                    |
| `src/main.tsx`                         | Mounts `App` with `createRoot` and `StrictMode`, and loads the CSS entry point.                                               |
| `src/App.tsx`                          | URL navigation, search/filter state, screen selection, shared header/footer.                                                  |
| `src/App.css`                          | Skip link, footer, and missing-page layout.                                                                                   |
| `src/data/types.ts`                    | Contracts for categories, sections, questions, balanced exercise banks, and topics.                                           |
| `src/data/categories.ts`               | Category IDs, labels, and accent colors.                                                                                      |
| `src/data/topics.ts`                   | Small catalog of topic imports. The first entry is featured.                                                                  |
| `src/data/topics/solid/solid.ts`             | SOLID content only. Code strings are displayed, never executed by the app.                                                    |
| `src/lib/filterTopics.ts`              | Pure matching logic: takes data and criteria, returns matches without mutation or browser access.                             |
| `library/Library.tsx`                  | Composes the introduction, featured topic, and searchable collection.                                                         |
| `library/LibraryIntro.tsx` + `.css`    | Introduction and decorative paper note.                                                                                       |
| `library/FeaturedTopic.tsx` + `.css`   | Featured card and explicit topic illustration selection.                                                                                   |
| `library/TopicCollection.tsx` + `.css` | Search/filter logic, collection heading, topic cards, empty state, closing note.                                              |
| `topic/TopicDetail.tsx`                | Composes a topic's reusable reading and practice blocks.                                                                      |
| `topic/TableOfContents.tsx`            | Builds links from topic ID and section navigation fields.                                                                     |
| `topic/TopicDetail.css`                | Reading layout, header, and concept sections.                                                                                 |
| `topic/TableOfContents.css`            | Desktop/mobile table of contents.                                                                                             |
| `lesson/LessonBlocks.tsx`              | Stateless SimpleDefinition, Analogy, CodeExample, Takeaway, and Recap.                                                        |
| `lesson/LessonBlocks.css`              | Styles for those reading blocks.                                                                                              |
| `practice/Practice.tsx`                | Selects ten questions once, owns the active index, progress, and completion screen.                                           |
| `practice/Exercise.tsx`                | One question's selected answer, submission, feedback, and retry focus.                                                        |
| `practice/Exercise.css`                | Question layout, choices, feedback.                                                                                           |
| `shared/LibraryParts.tsx`              | Reusable Tags and BackToLibrary components.                                                                                   |
| `shared/LibraryParts.css`              | Shared tags, badges, buttons, and links.                                                                                      |
| `theme/ThemeToggle.tsx`                | Switches theme and safely stores the preference.                                                                              |
| `theme/ThemeToggle.css`                | Theme-button appearance and responsive sizing.                                                                                |
| `src/styles/index.css`                 | Explicit CSS load order: general rules before feature/block rules.                                                            |
| `src/styles/base.css`                  | Global typography, palette variables, reset, accessibility preferences.                                                       |
| `tests/filterTopics.test.ts`           | Search fields, case, multiple words, combined filters, empty results.                                                         |
| `tests/content.test.ts`                | Unique links, categories, definitions, thirty questions, valid answers.                                                       |
| `tests/render.test.ts`                 | React markup checks for five definitions and one active question and non-code topics. This is not a browser interaction test. |
| `package.json`                         | Commands and dependencies.                                                                                                    |
| `package-lock.json`                    | Exact dependency resolution; generated by npm.                                                                                |
| `vite.config.ts`                       | React support in Vite.                                                                                                        |
| `tsconfig.json`                        | Strict TypeScript checking for application and tests.                                                                         |
| `.nvmrc`                               | Recommended Node major version: 24.                                                                                           |
| `.gitignore`                           | Excludes generated output, dependencies, local configuration, common credentials.                                             |
| `public/favicon.svg`                   | Browser-tab icon.                                                                                                             |

`node_modules/` and `dist/` are generated and ignored. Do not edit them.

## Data flow

`topics/solid/solid.ts` exports a `Topic`. `data/topics.ts` registers it. `App` finds the requested topic by ID and passes it to `TopicDetail`. The page maps its sections to reusable blocks. `Practice` selects one variant per concept and kind, shuffles those ten questions, and renders one `Exercise` at a time. Checking reveals feedback; Next question advances; Finish practice shows completion. The question key resets local answer state for each new question. A lazy state initializer keeps that draw stable while answering, changing theme, or following section links. Leaving the topic and returning starts a new draw; random draws may repeat questions.

`TopicCollection` calls `filterTopics`. Every search word must occur somewhere in the title, description, category label, or tags. Case and surrounding spaces are ignored. The category filter applies at the same time. `App` preserves these choices when you visit a lesson and return.

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

1. Create `src/data/topics/your-topic/your-topic.ts`, following `solid.ts`. Import `Topic` from `../../types.ts` and annotate the exported topic with it.
2. Use a unique lowercase/hyphenated topic ID and a category ID from `categories.ts`.
3. Each section needs `id`, `title`, `definition`, and `explanation`. The definition is direct wording; comparisons belong in optional `analogy`. Optional fields also include `letter`, before/after code, and takeaway.
4. Supply an `exerciseBank` with **five concepts**. Each concept has a unique `id`, three `apply` questions and three `identify` questions: 30 total. Each question has a unique `id`, `title`, `prompt`, `options`, and a matching `correctOptionId`. Every option has feedback. Use scenarios different from the lesson examples. Code is optional. Keep the bank in `your-topic-exercises.ts` inside the same `your-topic/` folder as the lesson. Use this two-file folder structure for every topic.
5. Import your topic in `src/data/topics.ts` and add it to the array. Put it first to feature it.
6. Run tests/build and inspect it in the browser.

For example, after creating `topics/present-simple/present-simple.ts`:

```ts
// src/data/topics.ts
import type { Topic } from "./types.ts";
import { solid } from "./topics/solid/solid.ts";
import { presentSimple } from "./topics/present-simple/present-simple.ts";

export const topics: Topic[] = [presentSimple, solid];
```

`ExerciseBank` has five concept slots, each with two three-question tuples. TypeScript enforces the 30-question shape; tests validate data and the balanced 10-question selection. Reserve section IDs `introduction`, `practice`, and `recap` for built-in navigation.

To add a category, add `{ id: "science", label: "Science", color: "#287b6c" }` to `categories.ts`, then use `category: "science"` in the topic. Filters are generated from that list.

## CSS and themes

CSS is grouped by feature beside its TSX. Each sheet includes its responsive and dark overrides. Shared typography/palette variables belong in `base.css`; shared buttons/badges belong in `LibraryParts.css`. `index.css` makes the cascade order explicit. There is no duplicate light/dark component tree.

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

## Random practice and mobile layout

- `src/data/topics/solid/solid-exercises.ts`: all 30 authored SOLID questions, grouped by concept and kind. Two small helpers avoid repeating option-object structure and principle labels. Variant suffixes are internal IDs only.
- `src/lib/selectExercises.ts`: choose one of three variants for each concept/kind, then Fisher-Yates shuffle a fresh array. No data mutation, storage, or UI dependencies.
- `tests/selectExercises.test.ts`: verifies balance, uniqueness, every variant being reachable, shuffling, and no bank mutation using predictable random functions.

Below 760px, lesson prose and answers use 16px text with 1.65 line height, code uses 14px, and question controls have at least 48px touch targets. Feature styles remain beside their components. Grid tracks use `minmax(0, 1fr)` and cards can shrink; long code scrolls inside its own block rather than widening the document. Desktop typography and spacing stay unchanged.

## Component boundaries and gentle motion

- `library/Library.tsx` is composition only, so it needs no CSS of its own. `LibraryIntro`, `FeaturedTopic`, and `TopicCollection` each own a matching stylesheet. Collection cards remain inside their collection because there is no second use requiring another public component yet.
- `header/SiteHeader.tsx` and `SiteHeader.css` own the sticky header and its scroll listener. Separate expand/collapse thresholds prevent flickering near the transition. The listener is removed when unmounted.
- `practice/Practice.css` owns progress, the sheet transition, and completion. `Exercise.css` owns the question, answers, and feedback.
- `shared/LibraryParts.tsx` intentionally keeps two tiny reusable pieces together: Tags and BackToLibrary. Its matching CSS also supplies shared visual primitives (buttons, badges, links, shell). A stylesheet need not imply one React component per selector.
- Animation uses CSS only, with no motion library. Reduced-motion preferences turn it off. Section links leave space for the sticky header; Next question returns focus to the question region.

## Visual topic: From Prompting to Delegation

`src/data/topics/agent-delegation/agent-delegation.ts` contains seven sections, the final Genosha delegation activity, the recap, and further-reading links. Its separate `agent-delegation-exercises.ts` contains 30 practice questions. The category is AI / Agentic Engineering; the new topic is first in the catalog so it is featured.

Optional fields extend existing topics without changing SOLID's content:

- `TopicSection.blocks` accepts text panels, flow diagrams, comparison/layer cards, and classifications. `src/data/study-blocks.ts` describes these content shapes.
- `lesson/StudyBlocks.tsx` renders those visual blocks; its matching CSS controls responsive layout.
- `lesson/Classification.tsx` owns category choices, feedback, and retries. Its CSS styles labeled native selects so the activity works with touch and keyboard.
- `lesson/Reflection.tsx` provides labeled writing fields and a suggested solution that can be revealed after thinking. Its matching CSS styles the draft and solution.
- `Topic.project` adds the final reflection and its table-of-contents link. `recapFormula` and `closingThought` customize the recap. `difficulty` and `practiceIntroduction` provide topic-specific labels.

Drafts and classification choices stay in the current page only. There is no AI API, grading service, database, or saved personal answer data. Revealing the suggestion preserves the draft; leaving the topic or reloading clears it. Tests cover the activity data, the balanced draw, and rendered markup; browser checks cover actual interactions.

### A unique illustration for each topic

Create a dedicated component and matching CSS in `src/components/library/illustrations/`. Add its identifier to `Topic.illustration` in `src/data/types.ts`, register the component in `FeaturedTopic.tsx`, and import its stylesheet in `src/styles/index.css`. Set that identifier in the topic data. SOLID owns its foundation blocks; delegation owns its mission map. There is no generic illustration fallback.

### Topic folders and reusable reflection

Each topic owns a folder containing its lesson and exercise bank. There are no extra index files: imports point directly to the named lesson file. `Reflection.tsx` uses topic-neutral response labels; its title, scenario, field labels, prompts, suggested answers, and closing text come from `ReflectionData`. It supports any number of fields without new components. Answers remain temporary and are not automatically graded.

### Featured carousel

FeaturedCarousel.tsx and its matching CSS rotate the latest topic plus up to four randomly selected older topics every five seconds. Selection stays stable during a visit. selectFeaturedTopics.ts owns the selection rule and has a focused test for small and larger catalogs. FeaturedTopic remains the reusable card. Hover and keyboard focus pause rotation; inactive slides are inert. The grid reserves the tallest card's height, and reduced-motion preferences remove transitions. No navigation controls or new dependencies were added.
