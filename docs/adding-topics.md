# Adding a topic

[Project setup](../README.md) | [Architecture](architecture.md)

Keep UI and lesson text in English. Start with `src/types/topic.ts`, `src/types/study-blocks.ts` and a relevant existing lesson. Give definitions plain wording, verify technical claims against authoritative sources, and include reading links in `sources`. Distinguish conceptual pseudocode from runnable examples.

1. Create `src/data/topics/your-topic/your-topic.ts`, following `solid.ts`. Import `Topic` from `../../../types/topic.ts` and annotate the exported topic with it.
2. Use a unique lowercase/hyphenated topic ID and a category ID from `categories.ts`.
3. Each section needs `id`, `title`, `definition`, and `explanation`. The definition is direct wording; comparisons belong in optional `analogy`. Optional fields also include `letter`, before/after code, and takeaway.
4. Supply an `exerciseBank` with **five concepts**. Each concept has a unique `id`, three `apply` questions and three `identify` questions: 30 total. Each question has a unique `id`, `title`, `prompt`, `options`, and a matching `correctOptionId`. Every option has feedback. Use scenarios different from the lesson examples. Code is optional. Keep the bank in `your-topic-exercises.ts` inside the same `your-topic/` folder as the lesson. Use this two-file folder structure for every topic.
5. Import your topic in `src/data/topics.ts` and add it to the array. Put it first to feature it.
6. Add the final application activity and unique artwork described below. Run `npm test` and `npm run build`; manually review the lesson on mobile and desktop in both themes.

For example, after creating `topics/present-simple/present-simple.ts`:

```ts
// src/data/topics.ts
import type { Topic } from "../types/topic.ts";
import { solid } from "./topics/solid/solid.ts";
import { presentSimple } from "./topics/present-simple/present-simple.ts";

export const topics: Topic[] = [presentSimple, solid];
```

`ExerciseBank` has five concept slots, each with two three-question tuples. TypeScript enforces the 30-question shape; tests validate data and the balanced 10-question selection. Reserve section IDs `introduction`, `practice`, `project`, and `recap` for built-in navigation.

To add a category, add `{ id: "science", label: "Science", color: "#287b6c" }` to `categories.ts`, then use `category: "science"` in the topic. Filters are generated from that list.

## Reuse existing lesson blocks

`TopicSection.blocks` supports text, code, timelines, flows, cards and classification activities. `Topic.recapBlocks` can reuse these formats in the recap. Use existing renderers before adding a new block kind; add a new kind only when the content needs a format that existing blocks cannot express clearly.

Every topic supplies `project: ReflectionData` for its final application activity. Its title, scenario, field labels, prompts, suggestions and closing text all come from data. `Reflection` supports any number of fields, so another topic needs no custom reflection component. Drafts are temporary and suggestions are not automatic grading.

Optional `difficulty`, `practiceIntroduction`, `recapFormula` and `closingThought` customize a lesson without topic-specific branches in reusable components.

## Give the topic its own artwork

Create a dedicated React SVG component and matching CSS in `src/components/library/illustrations/`. Add its identifier to `Topic.illustration` in `src/types/topic.ts`, register the component in `FeaturedTopic.tsx`, import its stylesheet in `src/styles/index.css`, and set the identifier in the topic data. There is no generic illustration fallback.

Use the established palette and visual language, but invent artwork that represents the new subject. Motion should reinforce that drawing, loop gently on card hover or keyboard focus, and avoid layout shifts. Keep the idle drawing complete and disable animation for reduced-motion preferences. CSS is sufficient; a new topic does not require an animation dependency.

## Keep additions easy to locate

Each topic folder contains `<slug>.ts` and `<slug>-exercises.ts`; register the topic directly in `src/data/topics.ts` without extra index files. Content belongs in `data`, shared contracts in `types`, and UI behavior beside its owning component. Explain any new reusable structure in `docs/architecture.md` rather than adding task history to `AGENTS.md`.
