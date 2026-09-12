import assert from "node:assert/strict";
import { test } from "node:test";
import { topics } from "../src/data/topics.ts";
import { selectFeaturedTopics } from "../src/lib/selectFeaturedTopics.ts";

test("featured selection handles small catalogs and caps a unique draw at five", () => {
  assert.deepEqual(selectFeaturedTopics([]), []);
  assert.deepEqual(
    selectFeaturedTopics(topics.slice(0, 1)),
    topics.slice(0, 1),
  );
  assert.deepEqual(
    selectFeaturedTopics(topics.slice(0, 2)),
    topics.slice(0, 2),
  );
  const catalog = Array.from({ length: 9 }, (_, i) => ({
    ...topics[0],
    id: `topic-${i}`,
  }));
  const before = catalog.slice();
  for (const random of [() => 0, () => 0.5, () => 0.999]) {
    const draw = selectFeaturedTopics(catalog, random);
    assert.equal(draw.length, 5);
    assert.equal(draw[0], catalog[0]);
    assert.equal(new Set(draw.map((topic) => topic.id)).size, 5);
    assert.deepEqual(catalog, before);
  }
  assert.notDeepEqual(
    selectFeaturedTopics(catalog, () => 0),
    selectFeaturedTopics(catalog, () => 0.999),
  );
});
