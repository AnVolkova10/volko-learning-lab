export function AsyncArtwork() {
  return (
    <div className="async-art" aria-hidden="true">
      <svg viewBox="0 0 440 340" fill="none">
        <ellipse
          className="async-orbit"
          cx="220"
          cy="161"
          rx="170"
          ry="123"
          transform="rotate(-12 220 161)"
        />
        <g transform="rotate(-8 208 124)">
          <circle className="async-shadow" cx="215" cy="132" r="79" />
          <circle className="async-clock" cx="208" cy="124" r="79" />
          <circle className="async-ring" cx="208" cy="124" r="66" />
          <path
            className="async-ticks"
            d="M208 66 V74 M208 174 V182 M150 124 H158 M258 124 H266 M167 83 L172 88 M249 83 L244 88 M167 165 L172 160 M249 165 L244 160"
          />
          <path className="async-hands" d="M208 124 L236 143" />
          <g transform="translate(208 124)">
            <path className="async-hands async-minute-hand" d="M0 0 V-38" />
          </g>
          <circle className="async-hub" cx="208" cy="124" r="5" />
        </g>
        <g transform="rotate(-5 220 252)">
          <rect
            className="async-paper"
            x="62"
            y="210"
            width="316"
            height="97"
            rx="12"
          />
          <path className="async-track" d="M82 238 H356 M82 278 H356" />
          <path className="async-first" d="M89 238 H230" />
          <path className="async-second" d="M89 278 H327" />
          <circle className="async-start" cx="89" cy="238" r="6" />
          <circle className="async-start" cx="89" cy="278" r="6" />
          <path
            className="async-finish"
            d="M222 238 L228 244 L239 231 M319 278 L325 284 L336 271"
          />
        </g>
        <g transform="rotate(12 339 121)">
          <rect
            className="async-note"
            x="307"
            y="91"
            width="66"
            height="61"
            rx="8"
          />
          <path
            className="async-hands"
            d="M326 112 L318 121 L326 130 M350 112 L358 121 L350 130 M342 107 L334 135"
          />
        </g>
        <path
          className="async-spark"
          d="M93 82 V106 M81 94 H105 M357 185 V201 M349 193 H365"
        />
      </svg>
      <p>Let the waits overlap.</p>
    </div>
  );
}
