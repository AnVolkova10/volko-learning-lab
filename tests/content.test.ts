import assert from "node:assert/strict";
import { test } from "node:test";
import { categories } from "../src/data/categories.ts";
import { topics } from "../src/data/topics.ts";

test("topic and section IDs form unique, valid navigation targets", () => {
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
    for (const section of topic.sections) {
      assert.match(section.id, /^[a-z0-9-]+$/);
      assert.ok(
        section.definition.trim(),
        `${topic.id}/${section.id} needs a plain definition`,
      );
      assert.ok(section.explanation.trim());
    }
  }
});

test("every topic has thirty independently identified questions with valid answers", () => {
  for (const topic of topics) {
    const exercises = topic.exerciseBank.flatMap(concept => [...concept.apply, ...concept.identify]);
    assert.equal(topic.exerciseBank.length, 5);
    for (const concept of topic.exerciseBank) {
      assert.equal(concept.apply.length, 3);
      assert.equal(concept.identify.length, 3);
    }
    assert.equal(exercises.length, 30);
    assert.equal(
      new Set(exercises.map((exercise) => exercise.id)).size,
      30,
    );
    for (const exercise of exercises) {
      assert.ok(exercise.title.trim());
      assert.ok(exercise.prompt.trim());
      assert.ok(exercise.options.length >= 2);
      assert.equal(
        new Set(exercise.options.map((option) => option.id)).size,
        exercise.options.length,
      );
      assert.equal(
        exercise.options.filter(
          (option) => option.id === exercise.correctOptionId,
        ).length,
        1,
      );
      assert.ok(
        exercise.options.every(
          (option) => option.label.trim() && option.explanation.trim(),
        ),
      );
    }
  }
});

test("SOLID includes six questions and a complete explanation for every principle", () => {
  const solid = topics.find((topic) => topic.id === "solid")!;
  assert.deepEqual(
    solid.exerciseBank.map((concept) => concept.id),
    ["s", "o", "l", "i", "d"],
  );
  assert.equal(solid.sections.length, 5);
  for (const section of solid.sections) {
    for (const value of [
      section.definition,
      section.explanation,
      section.analogy,
      section.mistake,
      section.beforeCode,
      section.better,
      section.afterCode,
      section.takeaway,
    ]) {
      assert.ok(value?.trim());
    }
  }
});
