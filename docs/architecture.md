# Architecture

[Project setup](../README.md) | [Adding a topic](adding-topics.md)

## Folder responsibilities

- `src/app/`: root composition, hash navigation and app-level state.
- `src/screens/`: the library and topic reading views. The topic screen owns its table of contents.
- `src/components/`: reusable UI and the small functions owned by that UI.
- `src/data/`: category/catalog values and authored lessons with exercise banks.
- `src/types/`: shared content contracts; component-only props stay with their owner.
- `src/services/`: shared domain logic, currently the balanced exercise-selection policy.
- `src/styles/`: global styles and the explicit stylesheet load order.
- `tests/`: content, selection and rendered-markup checks.

Filtering and featured selection live beside the library components. Shared exercise-selection policy lives in `src/services/exerciseSelection.ts`, which exports `selectExercises`. The service depends only on the content contracts in `types`, so data and other consumers never need to import it from a UI folder. These remain plain functions with direct imports and focused tests; no classes, barrel files or empty canonical folders are needed.

Plain CSS remains intentional. `components/shared/LibraryParts` is an existing small grouping of Tags and BackToLibrary; its CSS also owns shared visual primitives. Keep that boundary until a separate styling change justifies reorganizing it.

## Every file and its responsibility

Component paths below are relative to `src/components/`. Folders group related work; small related components can share a file.

| File                                   | Responsibility                                                                                                                |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `index.html`                           | HTML entry point, metadata, React mounting element, and small pre-paint theme initializer.                                    |
| `src/main.tsx`                         | Mounts `App` with `createRoot` and `StrictMode`, and loads the CSS entry point.                                               |
| `src/app/App.tsx`                          | URL navigation, search/filter state, screen selection, shared header/footer.                                                  |
| `src/app/App.css`                          | Skip link, footer, and missing-page layout.                                                                                   |
| `src/types/topic.ts`                    | Contracts for categories, sections, questions, balanced exercise banks, and topics.                                           |
| `src/data/categories.ts`               | Category IDs, labels, and accent colors.                                                                                      |
| `src/data/topics.ts`                   | Small catalog of topic imports. The first entry is featured.                                                                  |
| `src/data/topics/solid/solid.ts`             | SOLID content only. Code strings are displayed, never executed by the app.                                                    |
| `src/components/library/filterTopics.ts`              | Pure matching logic: takes data and criteria, returns matches without mutation or browser access.                             |
| `src/screens/library/Library.tsx`                  | Composes the introduction, featured topic, and searchable collection.                                                         |
| `library/LibraryIntro.tsx` + `.css`    | Introduction and decorative paper note.                                                                                       |
| `library/FeaturedTopic.tsx` + `.css`   | Featured card and explicit topic illustration selection.                                                                                   |
| `library/TopicCollection.tsx` + `.css` | Search/filter logic, collection heading, topic cards, empty state, closing note.                                              |
| `src/screens/topic/TopicDetail.tsx`                | Composes a topic's reusable reading and practice blocks.                                                                      |
| `src/screens/topic/TableOfContents.tsx`            | Builds links from topic ID and section navigation fields.                                                                     |
| `src/screens/topic/TopicDetail.css`                | Reading layout, header, and concept sections.                                                                                 |
| `src/screens/topic/TableOfContents.css`            | Desktop/mobile table of contents.                                                                                             |
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

`topics/solid/solid.ts` exports a `Topic`. `data/topics.ts` registers it. `App` finds the requested topic by ID and passes it to `TopicDetail`. The page maps its sections to reusable blocks. `Practice` selects one variant per concept and kind, shuffles those ten questions, and renders one `Exercise` at a time. Checking reveals feedback; Next question advances; Finish practice shows completion. Practice owns answer state by question ID, so Previous question and review preserve choices and feedback. A lazy state initializer keeps that draw stable while answering, changing theme, or following section links. Leaving the topic and returning starts a new draw; random draws may repeat questions.

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

## Component boundaries and gentle motion

- `src/screens/library/Library.tsx` is composition only, so it needs no CSS of its own. `LibraryIntro`, `FeaturedTopic`, and `TopicCollection` each own a matching stylesheet. Collection cards remain inside their collection because there is no second use requiring another public component yet.
- `header/SiteHeader.tsx` and `SiteHeader.css` own the sticky header and its scroll listener. Separate expand/collapse thresholds prevent flickering near the transition. The listener is removed when unmounted.
- `practice/Practice.css` owns progress, the centered card flip, and completion. `Exercise.css` owns the question, answers, and feedback.
- `shared/LibraryParts.tsx` intentionally keeps two tiny reusable pieces together: Tags and BackToLibrary. Its matching CSS also supplies shared visual primitives (buttons, badges, links, shell). A stylesheet need not imply one React component per selector.
- Animation uses CSS only, with no motion library. Reduced-motion preferences turn it off. Section links leave space for the sticky header; Next question returns focus to the question region.

## Additional reusable pieces

| Location | Responsibility |
| --- | --- |
| `src/types/study-blocks.ts` | Visual block, classification and reflection contracts. |
| `src/components/lesson/StudyBlocks.tsx` + `.css` | Renders text, code, timelines, flows, cards and classifications from data. |
| `src/components/lesson/Classification.tsx` + `.css` | Classification choices, feedback and retries. |
| `src/components/lesson/Reflection.tsx` + `.css` | Temporary writing fields and suggested answers from topic data. |
| `src/components/library/FeaturedCarousel.tsx` + `.css` | Featured-card rotation and pause behavior. |
| `src/components/library/selectFeaturedTopics.ts` | Latest topic plus up to four randomly sampled older topics. |
| `src/components/library/illustrations/` | Subject-specific React SVG artwork with matching CSS. |
| `src/services/exerciseSelection.ts` | One variant per concept/kind, followed by an immutable shuffle. |
| `tests/selectExercises.test.ts` | Balance, uniqueness, reachable variants and bank immutability. |
| `tests/selectFeaturedTopics.test.ts` | Featured selection for small and larger catalogs. |
| `tests/agentDelegation.test.ts`, `tests/asyncJavascript.test.ts` | Topic-specific content and exercise checks. |

Practice selections stay stable while answering, changing theme or navigating sections. Answers, reflection drafts and classification choices stay in memory for the current topic visit. There is no grading API or saved personal-answer database.

## Validation boundaries

`npm test` runs Node tests, including a Vite SSR markup check. `npm run build` type-checks application and tests, then bundles the static site. Neither command proves browser interaction or visual appearance. Visual review is manual unless explicitly requested.
