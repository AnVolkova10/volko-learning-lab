import { useEffect, useState } from "react";
import { topics } from "./data/topics";
import { Library } from "./components/library/Library";
import { TopicDetail } from "./components/topic/TopicDetail";
import { ThemeToggle } from "./components/theme/ThemeToggle";
import { BackToLibrary } from "./components/shared/LibraryParts";

function focusPage(hash: string) {
  // "#/topics/solid/srp" -> ["#", "topics", "solid", "srp"].
  // The last segment is an optional section inside the current lesson.
  const sectionId = hash.split("/")[3];
  const destination = sectionId
    ? document.getElementById(sectionId)
    : document.querySelector("h1");
  destination?.focus({ preventScroll: true });
  if (sectionId && destination) destination.scrollIntoView({ block: "start" });
  else window.scrollTo({ top: 0, behavior: "instant" });
}

export default function App() {
  const [hash, setHash] = useState(window.location.hash);
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  // Ignore "#"; read the view name and the topic ID from the URL.
  const [, route, topicId] = hash.split("/");
  const isLibrary = !hash || hash === "#" || hash === "#/";
  const topic =
    route === "topics" ? topics.find((item) => item.id === topicId) : undefined;

  useEffect(() => {
    // A normal link or browser Back/Forward changes the hash.
    // Copy it into React state so React renders the matching view.
    const onHashChange = () => setHash(window.location.hash);
    // Clicking the current section again does not emit a hashchange event.
    const onSamePageLink = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.ctrlKey ||
        event.metaKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const link =
        event.target instanceof Element
          ? event.target.closest<HTMLAnchorElement>('a[href^="#/"]')
          : null;
      if (link && link.hash === window.location.hash) {
        event.preventDefault();
        focusPage(link.hash);
      }
    };
    window.addEventListener("hashchange", onHashChange);
    document.addEventListener("click", onSamePageLink);
    return () => {
      window.removeEventListener("hashchange", onHashChange);
      document.removeEventListener("click", onSamePageLink);
    };
  }, []);

  useEffect(() => {
    // Effects run after React has rendered, so the destination exists now.
    document.title = topic
      ? `${topic.title} · Volko's Library`
      : "Volko's Learning Library";
    focusPage(hash);
  }, [hash, topic]);

  return (
    <>
      <a
        className="skip-link"
        href="#main"
        onClick={(event) => {
          event.preventDefault();
          document.getElementById("main")?.focus();
        }}
      >
        Skip to content
      </a>
      <header className="site-header shell">
        <a
          className="brand"
          href="#/"
          aria-label="Volko's learning library home"
        >
          <span className="brand-icon" aria-hidden="true">
            v<span>✳</span>
          </span>
          <span>
            the learning library
            <span className="brand-subtitle">A COLLECTION BY VOLKO</span>
          </span>
        </a>
        <div className="header-actions">
          <ThemeToggle />
          <a
            className="nav-link"
            href="#/"
            aria-current={isLibrary ? "page" : undefined}
          >
            My library <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>
      <main id="main" tabIndex={-1} className="shell">
        {isLibrary ? (
          <Library
            query={query}
            onQueryChange={setQuery}
            category={category}
            onCategoryChange={setCategory}
          />
        ) : topic ? (
          <TopicDetail key={topic.id} topic={topic} />
        ) : (
          <section className="not-found">
            <p className="eyebrow">A SMALL DETOUR</p>
            <h1 tabIndex={-1}>This page isn't in the library.</h1>
            <p>Let's find something else to learn.</p>
            <BackToLibrary className="button primary" />
          </section>
        )}
      </main>
      <footer className="site-footer shell">
        <span>Ángela Curzi 2026</span>
        <span>Stay curious. Keep a little of what you learn.</span>
        <BackToLibrary />
      </footer>
    </>
  );
}
