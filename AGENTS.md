# Volko Learning Lab

Project-specific conventions supplement the global `AGENTS.md`.

This repository predates Angela's canonical Vite structure.
Preserve the existing architecture; do not reorganize it merely to match the global folder convention.

## Project architecture

- Static React + TypeScript + Vite with plain CSS.
- This project intentionally uses plain CSS; do not migrate it to CSS Modules solely to match the global default.
- Keep lesson content in data and rendering/interaction in components.
- Reusable components must not contain topic-specific wording.
- Keep component CSS alongside its owner with matching names.
- Keep tests in `tests/`.
- `src/lib/` is a historical project convention for existing pure selection/filtering helpers.
- Preserve current `src/lib/` usage, but do not expand it into a generic miscellaneous folder.
- Preserve the current visual identity, mobile behavior, both themes, keyboard accessibility and reduced-motion support.

## Adding topics

- Start with `src/data/types.ts`, `src/data/study-blocks.ts`, and one relevant existing topic.
- Place topic content and exercises in:

  `src/data/topics/<slug>/`

  using:
  - `<slug>.ts`
  - `<slug>-exercises.ts`

- Register the topic in `src/data/topics.ts`, newest first.
- Reuse the existing lesson and practice renderers.
- Write UI and lesson content in English.
- Use plain definitions, focused explanations, concrete examples and opportunities to practice.
- Verify technical claims against authoritative sources and include relevant reading links.
- Distinguish assumptions, conceptual pseudocode and runnable examples.
- Supply 30 exercises:
  - 5 concept groups
  - 2 exercise kinds
  - 3 variants each
- Reuse the existing balanced 10-question selection logic.
- Practice scenarios must differ from explanation examples.
- Include a final application activity through `Reflection`, sized to the subject.
- Keep writing fields and suggested answers in data rather than hardcoding topic terminology into reusable components.
- Give each topic original artwork related to its subject.
- Reuse the visual system, not another topic's illustration.

## File map

- `src/data/types.ts` and `src/data/study-blocks.ts` — topic and reusable block contracts.
- `src/data/topics/` — topic content and exercises.
- `src/components/lesson/` — reusable reading and reflection blocks.
- `src/components/topic/` — topic-page composition and contents navigation.
- `src/components/practice/` — practice interaction.
- `src/components/library/` — catalog, featured UI, carousel and artwork.
- `src/lib/` — existing filtering/selection helpers.
- `src/styles/` — global CSS system.

Preserve these boundaries unless there is a concrete reason to change them.

## Validation

- Run `npm run build` for app changes.
- Run `npm test` when content, contracts, selection logic or behavior changes.
- Do not add tests merely to mirror low-impact styling changes.

## Documentation

- Consult `README.md` when deeper setup, architecture or file-map context is needed.
- Do not duplicate implementation history or temporary task notes into this file.
- When introducing a new project-specific structure, explain what problem it solves, where it lives and how future topics can reuse it.
