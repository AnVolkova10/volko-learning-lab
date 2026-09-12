import type { CSSProperties } from "react";

export function SolidArtwork() {
  return (
    <div className="solid-art" aria-hidden="true">
      <span className="art-caption">
        GOOD CODE STARTS WITH GOOD FOUNDATIONS.
      </span>
      <div className="solid-blocks">
        {["S", "O", "L", "I", "D"].map((letter, index) => (
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
        Five principles. A clearer way to build.
      </span>
      <span className="art-star">✳</span>
    </div>
  );
}
