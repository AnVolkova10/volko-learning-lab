import assert from "node:assert/strict";
import { test } from "node:test";
import { filterTopics } from "../src/lib/filterTopics.ts";
import { categories } from "../src/data/categories.ts";
import { topics } from "../src/data/topics.ts";
import type { Topic } from "../src/data/types.ts";

const englishTopic: Topic = {
  id: "daily-habits",
  illustration: "solid-foundations",
  title: "Present Simple",
  description: "Talk about routines.",
  category: "english",
  tags: ["Grammar"],
  readMinutes: 3,
  introduction: "A language note.",
  sections: [],
  recap: [],
  exerciseBank: topics[0].exerciseBank,
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
