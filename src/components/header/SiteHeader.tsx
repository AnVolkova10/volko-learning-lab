import { useEffect, useState } from "react";
import { ThemeToggle } from "../theme/ThemeToggle";

export function SiteHeader({ isLibrary }: { isLibrary: boolean }) {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    // Separate thresholds avoid flickering near the transition point.
    const onScroll = () =>
      setCompact((current) => window.scrollY > (current ? 40 : 120));
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header className={`site-header-wrap ${compact ? "is-compact" : ""}`}>
      <div className="site-header shell">
        <a
          className="brand"
          href="#/"
          aria-label="Volko's learning library home"
          aria-current={isLibrary ? "page" : undefined}
        >
          <span className="brand-icon" aria-hidden="true">
            v<span>✳</span>
          </span>
          <span className="brand-name">
            the learning library
            <span className="brand-subtitle">A COLLECTION BY VOLKO</span>
          </span>
        </a>
        <div className="header-actions">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
