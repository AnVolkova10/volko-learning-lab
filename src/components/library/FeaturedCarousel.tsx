import { useEffect, useState } from "react";
import type { Topic } from "../../data/types";
import { selectFeaturedTopics } from "../../lib/selectFeaturedTopics";
import { FeaturedTopic } from "./FeaturedTopic";

export function FeaturedCarousel({ topics }: { topics: Topic[] }) {
  // A visit gets one stable selection, including while changing the theme.
  const [slides] = useState(() => selectFeaturedTopics(topics));
  const [active, setActive] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (slides.length < 2 || hovered || focused) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setActive((index) => (index + 1) % slides.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, [slides.length, hovered, focused]);

  if (!slides.length) return null;
  return (
    <div
      className="featured-carousel"
      role="region"
      aria-label="Featured topics"
      aria-roledescription="carousel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocusCapture={() => setFocused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget))
          setFocused(false);
      }}
    >
      {slides.map((topic, index) => (
        <div
          key={topic.id}
          className={`featured-slide${index === active ? " is-active" : ""}`}
          aria-hidden={index !== active}
          inert={index !== active}
        >
          <FeaturedTopic topic={topic} latest={index === 0} />
        </div>
      ))}
    </div>
  );
}
