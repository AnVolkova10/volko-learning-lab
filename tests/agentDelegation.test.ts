import assert from "node:assert/strict";
import { test } from "node:test";
import { agentDelegation } from "../src/data/topics/agent-delegation/agent-delegation.ts";
import { selectExercises } from "../src/lib/selectExercises.ts";

test("the guided topic has seven independently addressable sections and valid classifications", () => {
  assert.equal(agentDelegation.sections.length, 7);
  const classifications = agentDelegation.sections
    .flatMap((section) => section.blocks || [])
    .filter((block) => block.kind === "classification");
  assert.equal(classifications.length, 5);
  for (const { activity } of classifications) {
    assert.equal(new Set(activity.categories).size, activity.categories.length);
    assert.equal(
      new Set(activity.items.map((item) => item.text)).size,
      activity.items.length,
    );
    for (const item of activity.items) {
      assert.ok(activity.categories.includes(item.answer));
      assert.ok(item.explanation.trim());
    }
  }
  assert.deepEqual(
    agentDelegation.project?.fields.map((field) => field.label),
    [
      "GOAL",
      "WORK RULES",
      "PROJECT CONTEXT",
      "TOOLS",
      "BOUNDARIES",
      "VALIDATION",
      "ESCALATE IF",
      "STOP WHEN",
    ],
  );
  assert.ok(
    agentDelegation.project?.fields.every(
      (field) => field.prompt && field.suggestion,
    ),
  );
  assert.equal(agentDelegation.recapFormula?.length, 7);
});

test("delegation practice covers each concept and both kinds in every draw", () => {
  for (const value of [0, 0.5, 0.999]) {
    const draw = selectExercises(agentDelegation.exerciseBank, () => value);
    assert.equal(draw.length, 10);
    for (const concept of agentDelegation.exerciseBank) {
      for (const kind of ["apply", "identify"] as const) {
        assert.equal(
          draw.filter((question) => concept[kind].includes(question)).length,
          1,
        );
      }
    }
  }
});
