import type { CSSProperties } from "react";
import type { Topic } from "../../data/types";
import { categories } from "../../data/categories";

import { SolidArtwork } from "./illustrations/SolidArtwork";
import { DelegationArtwork } from "./illustrations/DelegationArtwork";

// Each topic must choose a bespoke illustration; there is no generic fallback.
const illustrations = {
  "solid-foundations": SolidArtwork,
  "delegation-map": DelegationArtwork,
};

export function FeaturedTopic({
  topic: featured,
  latest = true,
}: {
  topic: Topic;
  latest?: boolean;
}) {
  const Illustration = illustrations[featured.illustration];
  return (
    <section
      className="featured"
      aria-labelledby={`featured-title-${featured.id}`}
    >
      <div className="featured-content">
        <p className="eyebrow">
          <span className="status-dot" />{" "}
          {latest ? "THE LATEST ADDITION" : "FROM YOUR LIBRARY"}
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
        <h2 id={`featured-title-${featured.id}`}>{featured.title}</h2>
        <p>{featured.description}</p>
        <div className="featured-bottom">
          <a className="button light" href={`#/topics/${featured.id}`}>
            Let's learn something <span aria-hidden="true">↗</span>
          </a>
          <span className="reading-time">{featured.readMinutes} min read</span>
        </div>
      </div>
      <Illustration />
    </section>
  );
}
