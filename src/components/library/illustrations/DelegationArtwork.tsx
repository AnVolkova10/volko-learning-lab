// A mission card, independent work routes, and a shared review point.
export function DelegationArtwork() {
  return (
    <div className="delegation-art" aria-hidden="true">
      <svg viewBox="0 0 440 350" fill="none">
        <ellipse
          className="delegation-orbit"
          cx="220"
          cy="174"
          rx="178"
          ry="133"
          transform="rotate(-16 220 174)"
        />
        <path
          className="delegation-route"
          d="M216 119 C216 159 94 121 94 179 M229 119 C229 148 337 128 337 178 M220 126 V185 M94 235 C94 279 196 248 211 288 M337 232 C337 280 243 249 229 288 M220 229 V285"
        />
        <g transform="rotate(-7 220 78)">
          <rect
            className="delegation-shadow"
            x="140"
            y="39"
            width="166"
            height="89"
            rx="9"
          />
          <rect
            className="delegation-paper"
            x="134"
            y="32"
            width="166"
            height="89"
            rx="9"
          />
          <path className="delegation-ink" d="M150 54 H168 M150 61 H162" />
          <text className="delegation-label" x="217" y="62" textAnchor="middle">
            THE MISSION
          </text>
          <text className="delegation-title" x="217" y="93" textAnchor="middle">
            One clear goal.
          </text>
          <path
            className="delegation-pin"
            d="M275 26 V46 C275 54 286 54 286 46 V26 C286 13 269 13 269 26 V45"
          />
        </g>
        <g transform="rotate(-10 94 204)">
          <rect
            className="delegation-shadow"
            x="65"
            y="181"
            width="68"
            height="64"
            rx="12"
          />
          <rect
            className="delegation-work"
            x="59"
            y="174"
            width="68"
            height="64"
            rx="12"
          />
          <path
            className="delegation-ink"
            d="M82 194 L72 204 L82 214 M104 194 L114 204 L104 214 M98 190 L90 218"
          />
        </g>
        <g transform="rotate(5 220 204)">
          <rect
            className="delegation-shadow"
            x="192"
            y="182"
            width="62"
            height="56"
            rx="28"
          />
          <circle className="delegation-sage" cx="220" cy="204" r="30" />
          <circle className="delegation-ink" cx="217" cy="201" r="10" />
          <path className="delegation-ink" d="M225 209 L234 218" />
        </g>
        <g transform="rotate(10 337 204)">
          <rect
            className="delegation-shadow"
            x="312"
            y="175"
            width="59"
            height="70"
            rx="7"
          />
          <rect
            className="delegation-sand"
            x="306"
            y="168"
            width="59"
            height="70"
            rx="7"
          />
          <path
            className="delegation-ink"
            d="M318 186 L321 189 L326 182 M333 186 H353 M318 202 L321 205 L326 198 M333 202 H353 M318 218 L321 221 L326 214 M333 218 H347"
          />
        </g>
        <circle className="delegation-review" cx="220" cy="304" r="23" />
        <path className="delegation-check" d="M209 304 L217 312 L231 295" />
        <text className="delegation-label" x="260" y="310">
          REVIEW
        </text>
        <g className="delegation-compass" transform="translate(366 72)">
          <circle r="21" />
          <path d="M-7 10 L0 -13 L7 10 L0 5 Z M0 -28 V-24 M0 24 V28 M-28 0 H-24 M24 0 H28" />
        </g>
        <circle className="delegation-dot" cx="54" cy="122" r="3" />
        <circle className="delegation-dot" cx="375" cy="271" r="3" />
      </svg>
      <p>Set the direction. Leave room for the work.</p>
    </div>
  );
}
