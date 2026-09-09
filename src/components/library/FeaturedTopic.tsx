import type { CSSProperties } from "react";
import type { Topic } from "../../data/types";
import { categories } from "../../data/categories";

export function FeaturedTopic({ topic: featured }: { topic: Topic }) {
  return (
    <section className="featured" aria-labelledby="featured-title">
      <div className="featured-content">
        <p className="eyebrow">
          <span className="status-dot" /> THE LATEST ADDITION
        </p>
        <span
          className="badge featured-badge"
          style={
            {
              "--category-color": categories.find(
                (item) => item.id === featured.category,
              )?.color,
            } as CSSProperties
          }
        >
          {categories.find((item) => item.id === featured.category)?.label}
        </span>
        <h2 id="featured-title">{featured.title}</h2>
        <p>{featured.description}</p>
        <div className="featured-bottom">
          <a className="button light" href={`#/topics/${featured.id}`}>
            Let's learn something <span aria-hidden="true">↗</span>
          </a>
          <span className="reading-time">{featured.readMinutes} min read</span>
        </div>
      </div>
      <div className="solid-art" aria-hidden="true">
        <span className="art-caption">
          {featured.id === "solid"
            ? "GOOD CODE STARTS WITH GOOD FOUNDATIONS."
            : "EVERY NEW IDEA STARTS WITH CURIOSITY."}
        </span>
        <div className="solid-blocks">
          {(featured.id === "solid"
            ? ["S", "O", "L", "I", "D"]
            : ["L", "E", "A", "R", "N"]
          ).map((letter, index) => (
            <span
              key={letter}
              style={{ "--block-index": index } as CSSProperties}
            >
              {letter}
            </span>
          ))}
        </div>
        <div className="art-baseline" />
        <span className="art-footnote">
          {featured.id === "solid"
            ? "Five principles. A clearer way to build."
            : "One new idea. A little more possibility."}
        </span>
        <span className="art-star">✳</span>
      </div>
    </section>
  );
}
