import type { Topic } from "../data/types.ts";

// Keep the latest first; sample up to four others without changing the catalog.
export function selectFeaturedTopics(
  topics: Topic[],
  random = Math.random,
): Topic[] {
  if (!topics.length) return [];
  const previous = topics.slice(1);
  for (let i = previous.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [previous[i], previous[j]] = [previous[j], previous[i]];
  }
  return [topics[0], ...previous.slice(0, 4)];
}
