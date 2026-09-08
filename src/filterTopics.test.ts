import assert from "node:assert/strict";
import { test } from "node:test";
import { filterTopics } from "./filterTopics.ts";
import { categories, topics, type Topic } from "./data/topics.ts";

const englishTopic: Topic = {
  id: "daily-habits",
  title: "Present Simple",
  description: "Talk about routines.",
  category: "english",
  tags: ["Grammar"],
  readMinutes: 3,
  introduction: "A language note.",
  sections: [],
  recap: [],
};
const collection = [...topics, englishTopic];

test("blank searches return all topics without changing the input", () => {
  assert.deepEqual(
    filterTopics(collection, categories, "  ", "all"),
    collection,
  );
  assert.equal(collection.length, topics.length + 1);
});

test("search finds title, description, category label and tags, ignoring case", () => {
  for (const query of ["present", "ROUTINES", "English", "grammar"]) {
    assert.deepEqual(filterTopics(collection, categories, query, "all"), [
      englishTopic,
    ]);
  }
});

test("all words can match across different fields", () => {
  assert.deepEqual(
    filterTopics(collection, categories, "  SIMPLE   grammar  ", "all"),
    [englishTopic],
  );
});

test("category and query are combined", () => {
  assert.deepEqual(
    filterTopics(collection, categories, "grammar", "programming"),
    [],
  );
  assert.deepEqual(filterTopics(collection, categories, "", "english"), [
    englishTopic,
  ]);
  assert.deepEqual(filterTopics(collection, categories, "grammar", "english"), [
    englishTopic,
  ]);
});

test("unknown search, empty category, and empty collection have no matches", () => {
  assert.deepEqual(
    filterTopics(collection, categories, "astronaut", "all"),
    [],
  );
  assert.deepEqual(filterTopics(collection, categories, "", "3d"), []);
  assert.deepEqual(filterTopics([], categories, "", "all"), []);
});

test("published data has usable unique links and valid exercise answers", () => {
  assert.equal(new Set(topics.map((topic) => topic.id)).size, topics.length);
  assert.equal(
    new Set(categories.map((category) => category.id)).size,
    categories.length,
  );
  for (const topic of topics) {
    assert.match(topic.id, /^[a-z0-9-]+$/);
    assert.ok(categories.some((category) => category.id === topic.category));
    const ids = [
      "introduction",
      "practice",
      "recap",
      ...topic.sections.map((section) => section.id),
    ];
    assert.equal(new Set(ids).size, ids.length);
    if (topic.exercise) {
      assert.equal(
        topic.exercise.options.filter(
          (option) => option.id === topic.exercise?.correctOptionId,
        ).length,
        1,
      );
      assert.equal(
        new Set(topic.exercise.options.map((option) => option.id)).size,
        topic.exercise.options.length,
      );
    }
  }
});
