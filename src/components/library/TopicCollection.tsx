import type { CSSProperties } from "react";
import { topics } from "../../data/topics";
import { categories } from "../../data/categories";
import { filterTopics } from "../../lib/filterTopics";
import { Tags } from "../shared/LibraryParts";

export type LibraryProps = {
  query: string;
  onQueryChange: (query: string) => void;
  category: string;
  onCategoryChange: (category: string) => void;
};

export function TopicCollection({
  query,
  onQueryChange,
  category,
  onCategoryChange,
}: LibraryProps) {
  const matches = filterTopics(topics, categories, query, category);

  function resetFilters() {
    onQueryChange("");
    onCategoryChange("all");
  }

  return (
    <>
      <section className="browse" id="browse" aria-labelledby="browse-title">
        <div className="section-heading">
          <div>
            <p className="eyebrow">THE COLLECTION</p>
            <h2 id="browse-title">
              Follow your curiosity<span className="violet-period">.</span>
            </h2>
          </div>
          <span className="collection-count">
            {topics.length} {topics.length === 1 ? "topic" : "topics"} &
            counting
          </span>
        </div>
        <div className="search-field">
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="10.5" cy="10.5" r="6.5" />
            <path d="m16 16 5 5" />
          </svg>
          <label className="sr-only" htmlFor="search">
            Search topics
          </label>
          <input
            id="search"
            type="search"
            placeholder="Find a topic, an idea, a little inspiration…"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
          />
          <span className="search-hint">STAY CURIOUS</span>
        </div>
        <div
          className="filter-row"
          role="group"
          aria-label="Filter by category"
        >
          <button
            className={`filter-chip ${category === "all" ? "selected" : ""}`}
            aria-pressed={category === "all"}
            onClick={() => onCategoryChange("all")}
          >
            All topics <span>{topics.length}</span>
          </button>
          {categories.map((item) => (
            <button
              key={item.id}
              className={`filter-chip ${category === item.id ? "selected" : ""}`}
              aria-pressed={category === item.id}
              onClick={() => onCategoryChange(item.id)}
              style={{ "--category-color": item.color } as CSSProperties}
            >
              <span className="category-dot" />
              {item.label}
              <span>
                {topics.filter((topic) => topic.category === item.id).length}
              </span>
            </button>
          ))}
        </div>
        <p className="result-count" role="status">
          {matches.length} {matches.length === 1 ? "topic" : "topics"}
          {query.trim()
            ? ` matching “${query.trim()}”`
            : category !== "all"
              ? ` in ${categories.find((item) => item.id === category)?.label}`
              : " to explore"}
        </p>
        {matches.length ? (
          <div className="topic-grid">
            {matches.map((topic) => (
              <a
                className="topic-card"
                key={topic.id}
                href={`#/topics/${topic.id}`}
              >
                <div className="card-top">
                  <span
                    className="badge"
                    style={
                      {
                        "--category-color": categories.find(
                          (item) => item.id === topic.category,
                        )?.color,
                      } as CSSProperties
                    }
                  >
                    <span className="category-dot" />
                    {
                      categories.find((item) => item.id === topic.category)
                        ?.label
                    }
                  </span>
                  <span className="card-arrow" aria-hidden="true">
                    ↗
                  </span>
                </div>
                <h3>{topic.title}</h3>
                <p>{topic.description}</p>
                <Tags tags={topic.tags} />
                <div className="card-bottom">
                  <span>{topic.readMinutes} min read</span>
                  {topic.exerciseBank && (
                    <span>
                      <span className="tiny-star" aria-hidden="true">
                        ✳
                      </span>{" "}
                      Try it yourself
                    </span>
                  )}
                </div>
              </a>
            ))}
            <aside className="collection-note">
              <span className="small-flower" aria-hidden="true">
                ✳
              </span>
              <p>
                A growing library.
                <br />
                <em>An always-curious mind.</em>
              </p>
              <span>
                Programming, language, design, and whatever sparks the next
                question.
              </span>
            </aside>
          </div>
        ) : (
          <div className="empty-state">
            <span aria-hidden="true">✧</span>
            <h3>
              {query.trim()
                ? "No notes on that. Yet."
                : "A new corner of the library."}
            </h3>
            <p>
              {query.trim()
                ? "Try a different word or explore another category."
                : "There are no topics in this category yet. Explore the collection to find your next idea."}
            </p>
            <button className="button primary" onClick={resetFilters}>
              Show all topics <span aria-hidden="true">↗</span>
            </button>
          </div>
        )}
      </section>
      <div className="closing-note">
        <span aria-hidden="true">✧</span>
        <p>
          Small notes today. <em>New possibilities tomorrow.</em>
        </p>
      </div>
    </>
  );
}
