import type { CSSProperties } from "react";
import { categories, type Topic } from "../data/topics";
import { Exercise } from "./Exercise";
import { Analogy, CodeExample, Recap, Takeaway } from "./LessonBlocks";
import { BackToLibrary, Tags } from "./LibraryParts";
import { TableOfContents } from "./TableOfContents";

export function TopicDetail({ topic }: { topic: Topic }) {
  const category = categories.find((item) => item.id === topic.category);
  return (
    <article className="topic-detail">
      <BackToLibrary className="back-link" arrow="left" />
      <header className="topic-header">
        <div className="topic-meta">
          <span
            className="badge"
            style={{ "--category-color": category?.color } as CSSProperties}
          >
            <span className="category-dot" />
            {category?.label}
          </span>
          <span>{topic.readMinutes} min read</span>
          <span>A NOTE WORTH KEEPING</span>
        </div>
        <h1 tabIndex={-1}>{topic.title}</h1>
        <p className="topic-description">{topic.description}</p>
        <Tags tags={topic.tags} />
      </header>
      <div className="lesson-layout">
        <TableOfContents
          topicId={topic.id}
          sections={topic.sections}
          hasExercise={Boolean(topic.exercise)}
        />
        <div className="lesson-content">
          <section id="introduction" tabIndex={-1} className="lesson-intro">
            <p className="eyebrow">BEFORE WE BEGIN</p>
            <h2>A little context before we begin.</h2>
            <p>{topic.introduction}</p>
          </section>
          {topic.sections.map((section, index) => (
            <section
              className="principle-section"
              key={section.id}
              id={section.id}
              tabIndex={-1}
            >
              <div className="principle-heading">
                <span className="principle-letter" aria-hidden="true">
                  {section.letter || String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="eyebrow">
                    CONCEPT {String(index + 1).padStart(2, "0")}
                  </p>
                  <h2>{section.title}</h2>
                </div>
              </div>
              <p>{section.explanation}</p>
              {section.analogy && <Analogy text={section.analogy} />}
              {section.mistake && (
                <>
                  <h3 className="example-title">
                    <span className="example-dot before" />
                    The common mistake
                  </h3>
                  <p>{section.mistake}</p>
                </>
              )}
              {section.beforeCode && (
                <CodeExample
                  code={section.beforeCode}
                  label="BEFORE"
                  accessibleLabel={`${section.title}: before example`}
                />
              )}
              {section.better && (
                <>
                  <h3 className="example-title">
                    <span className="example-dot after" />A better approach
                  </h3>
                  <p>{section.better}</p>
                </>
              )}
              {section.afterCode && (
                <CodeExample
                  code={section.afterCode}
                  label="AFTER"
                  accessibleLabel={`${section.title}: improved example`}
                />
              )}
              {section.takeaway && <Takeaway text={section.takeaway} />}
            </section>
          ))}
          {topic.exercise && (
            <section id="practice" tabIndex={-1} className="practice-section">
              <Exercise exercise={topic.exercise} />
            </section>
          )}
          <Recap items={topic.recap} />
          {topic.sources && (
            <details className="sources">
              <summary>A little further reading</summary>
              <ul>
                {topic.sources.map((source) => (
                  <li key={source.url}>
                    <a href={source.url} target="_blank" rel="noreferrer">
                      {source.title} ↗
                    </a>
                  </li>
                ))}
              </ul>
            </details>
          )}
          <BackToLibrary className="button primary lesson-return" />
        </div>
      </div>
    </article>
  );
}
