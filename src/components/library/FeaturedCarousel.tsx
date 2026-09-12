import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import type { Topic } from "../../data/types";
import { selectFeaturedTopics } from "../../lib/selectFeaturedTopics";
import { FeaturedTopic } from "./FeaturedTopic";

export function FeaturedCarousel({ topics }: { topics: Topic[] }) {
  // A visit gets one stable selection, including while changing the theme.
  const [slides] = useState(() => selectFeaturedTopics(topics));
  const [active, setActive] = useState(0);
  const card = useRef<HTMLDivElement>(null);
  const animation = useRef<Animation | null>(null);
  const [turning, setTurning] = useState(false);
  useEffect(() => () => animation.current?.cancel(), []);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    if (slides.length < 2 || hovered || focused) return;
    const timer = window.setInterval(async () => {
      const element = card.current;
      if (document.hidden || !element || animation.current) return;
      const advance = () => setActive((index) => (index + 1) % slides.length);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        advance();
        return;
      }
      setTurning(true);
      try {
        animation.current = element.animate(
          [{ transform: "rotateY(0deg)" }, { transform: "rotateY(-90deg)" }],
          {
            duration: 260,
            easing: "cubic-bezier(.55, 0, 1, .45)",
            fill: "forwards",
          },
        );
        await animation.current.finished;
        if (!element.isConnected) return;
        flushSync(advance);
        animation.current.cancel();
        animation.current = element.animate(
          [{ transform: "rotateY(90deg)" }, { transform: "rotateY(0deg)" }],
          {
            duration: 340,
            easing: "cubic-bezier(0, .55, .45, 1)",
            fill: "forwards",
          },
        );
        await animation.current.finished;
      } catch {
        // Leaving the library cancels the in-flight turn.
      } finally {
        animation.current?.cancel();
        animation.current = null;
        if (element.isConnected) setTurning(false);
      }
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
      <div className="featured-carousel-card" ref={card} aria-busy={turning}>
        {slides.map((topic, index) => (
          <div
            key={topic.id}
            className={`featured-slide${index === active ? " is-active" : ""}`}
            aria-hidden={index !== active}
            inert={index !== active || turning}
          >
            <FeaturedTopic topic={topic} latest={index === 0} />
          </div>
        ))}
      </div>
    </div>
  );
}
