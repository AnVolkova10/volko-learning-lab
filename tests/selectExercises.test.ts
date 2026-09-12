import assert from "node:assert/strict";
import { test } from "node:test";
import { solidExercises } from "../src/data/topics/solid/solid-exercises.ts";
import { selectExercises } from "../src/lib/selectExercises.ts";

test("each session selects one variant per concept and kind without mutating the bank", () => {
  const before = JSON.stringify(solidExercises);
  for (const random of [() => 0, () => 0.5, () => 0.999]) {
    const selected = selectExercises(solidExercises, random);
    assert.equal(selected.length, 10);
    assert.equal(new Set(selected.map(question => question.id)).size, 10);
    for (const concept of solidExercises) {
      for (const kind of ["apply", "identify"] as const) {
        assert.equal(selected.filter(question => concept[kind].includes(question)).length, 1);
        assert.ok(selected.includes(concept[kind][Math.floor(random() * 3)]));
      }
    }
  }
  assert.equal(JSON.stringify(solidExercises), before);
});

test("the draw can select every alternative and shuffles question order", () => {
  const draws = [0, 0.5, 0.999].map(value => selectExercises(solidExercises, () => value));
  assert.equal(new Set(draws.flat().map(question => question.id)).size, 30);
  const originalOrder = solidExercises.flatMap(concept => [concept.apply[0], concept.identify[0]]);
  assert.notDeepEqual(draws[0], originalOrder);
});
