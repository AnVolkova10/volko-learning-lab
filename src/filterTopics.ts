import type { Category, Topic } from "./data/topics.ts";

// Every search word must match somewhere in the topic's searchable fields.
export function filterTopics(
  topics: Topic[],
  categories: Category[],
  query: string,
  categoryId: string,
) {
  const words = query
    .trim()
    .toLocaleLowerCase("en")
    .split(/\s+/)
    .filter(Boolean);

  return topics.filter((topic) => {
    if (categoryId !== "all" && topic.category !== categoryId) return false;
    const category = categories.find((item) => item.id === topic.category);
    const text = [
      topic.title,
      topic.description,
      category?.label,
      ...topic.tags,
    ]
      .join(" ")
      .toLocaleLowerCase("en");
    return words.every((word) => text.includes(word));
  });
}
