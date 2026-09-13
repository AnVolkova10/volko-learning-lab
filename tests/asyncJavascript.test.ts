import assert from "node:assert/strict";
import { test } from "node:test";
import { asyncJavascript } from "../src/data/topics/async-javascript/async-javascript.ts";
import { selectExercises } from "../src/lib/selectExercises.ts";

test("async lesson has comparable timelines, valid predictions and balanced practice", () => {
  assert.equal(asyncJavascript.sections.length, 7);
  const blocks = asyncJavascript.sections.flatMap(
    (section) => section.blocks ?? [],
  );
  const timelines = blocks.filter((block) => block.kind === "timeline");
  assert.equal(timelines.length, 2);
  assert.equal(timelines[0].totalSeconds, timelines[1].totalSeconds);
  for (const timeline of timelines) {
    assert.ok(timeline.totalSeconds > 0);
    for (const row of timeline.rows) {
      assert.ok(row.start >= 0 && row.duration > 0);
      assert.ok(row.start + row.duration <= timeline.totalSeconds);
    }
  }
  const end = (timeline: (typeof timelines)[number]) =>
    Math.max(...timeline.rows.map((row) => row.start + row.duration));
  assert.equal(end(timelines[0]), 3);
  assert.equal(end(timelines[1]), 2);
  const predictions = blocks.filter((block) => block.kind === "classification");
  assert.equal(predictions.length, 5);
  for (const { activity } of predictions) {
    for (const item of activity.items) {
      assert.ok(activity.categories.includes(item.answer));
      assert.ok(item.explanation.trim());
    }
  }
  assert.equal(asyncJavascript.project?.fields.length, 4);
  for (const random of [() => 0, () => 0.5, () => 0.999]) {
    const draw = selectExercises(asyncJavascript.exerciseBank, random);
    for (const concept of asyncJavascript.exerciseBank) {
      for (const kind of ["apply", "identify"] as const) {
        assert.equal(
          draw.filter((item) => concept[kind].includes(item)).length,
          1,
        );
      }
    }
  }
});
