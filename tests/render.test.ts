import assert from "node:assert/strict";
import { test } from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";
import { createServer } from "vite";
import { topics } from "../src/data/topics.ts";
import type { Topic } from "../src/data/types.ts";

// This checks generated markup, not browser clicks or visual layout.
test("the reading page renders five definitions and one active question, including non-code topics", async () => {
  const server = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
  });
  try {
    const { TopicDetail } = await server.ssrLoadModule(
      "/src/components/topic/TopicDetail.tsx",
    );
    const solid = topics.find((topic) => topic.id === "solid")!;
    const html = renderToStaticMarkup(
      createElement(TopicDetail, { topic: solid }),
    );
    assert.equal((html.match(/class="simple-definition"/g) || []).length, 5);
    assert.equal((html.match(/class="exercise-card"/g) || []).length, 1);
    assert.equal((html.match(/<form/g) || []).length, 1);
    assert.equal((html.match(/Check my answer/g) || []).length, 1);

    const nonCodeTopic: Topic = {
      ...solid,
      id: "language-render-check",
      category: "english",
      sections: [
        {
          id: "habits",
          title: "Daily habits",
          definition: "Actions you repeat.",
          explanation: "Use the present simple.",
        },
      ],
      exerciseBank: solid.exerciseBank.map((concept) => ({
        ...concept,
        apply: concept.apply.map((question) => ({
          ...question,
          code: undefined,
        })),
        identify: concept.identify.map((question) => ({
          ...question,
          code: undefined,
        })),
      })) as Topic["exerciseBank"],
    };
    const nonCodeHtml = renderToStaticMarkup(
      createElement(TopicDetail, { topic: nonCodeTopic }),
    );
    assert.equal((nonCodeHtml.match(/<pre/g) || []).length, 0);
    assert.equal((nonCodeHtml.match(/class="exercise-card"/g) || []).length, 1);
    assert.ok(nonCodeHtml.includes("Daily habits"));

    const delegation = topics.find((topic) => topic.id === "agent-delegation")!;
    const delegationHtml = renderToStaticMarkup(
      createElement(TopicDetail, { topic: delegation }),
    );
    assert.equal(
      (delegationHtml.match(/class="classification"/g) || []).length,
      5,
    );
    assert.equal((delegationHtml.match(/<textarea/g) || []).length, 8);
    assert.equal(
      (delegationHtml.match(/class="exercise-card"/g) || []).length,
      1,
    );
    assert.ok(delegationHtml.includes('id="project"'));
    assert.ok(delegationHtml.includes('hidden="" class="reflection-solution"'));
    assert.ok(delegationHtml.includes("GOOD AGENT DELEGATION"));
  } finally {
    await server.close();
  }
});
