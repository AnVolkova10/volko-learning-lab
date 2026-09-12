import { useId, useState } from "react";
import type { ReflectionData } from "../../data/study-blocks";

export function Reflection({ activity }: { activity: ReflectionData }) {
  const id = useId();
  const [revealed, setRevealed] = useState(false);
  return (
    <div className="reflection">
      <h3>{activity.title}</h3>
      <p>{activity.scenario}</p>
      <p className="reflection-note">
        Write your own response first. These notes stay on this page only and
        are cleared when you leave or reload. Nothing is sent to an AI.
      </p>
      <div className="reflection-fields">
        {activity.fields.map((field, index) => (
          <div key={field.label}>
            <label htmlFor={`${id}-${index}`}>{field.label}</label>
            <p id={`${id}-${index}-hint`}>{field.prompt}</p>
            <textarea
              id={`${id}-${index}`}
              aria-describedby={`${id}-${index}-hint`}
              rows={3}
            />
          </div>
        ))}
      </div>
      <button
        className="button primary"
        aria-expanded={revealed}
        aria-controls={`${id}-solution`}
        onClick={() => setRevealed(!revealed)}
      >
        {revealed ? "Hide suggested response" : "Reveal a suggested response"}
      </button>
      <div
        id={`${id}-solution`}
        hidden={!revealed}
        className="reflection-solution"
      >
        <h4>One possible response</h4>
        <p>
          This is a starting point to adapt, not an automatically graded answer.
        </p>
        <dl>
          {activity.fields.map((field) => (
            <div key={field.label}>
              <dt>{field.label}</dt>
              <dd>{field.suggestion}</dd>
            </div>
          ))}
        </dl>
        <p>{activity.closing}</p>
      </div>
    </div>
  );
}
