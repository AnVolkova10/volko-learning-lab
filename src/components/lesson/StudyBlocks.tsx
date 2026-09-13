import type { StudyBlock } from "../../data/study-blocks";
import { Classification } from "./Classification";
import { CodeExample } from "./LessonBlocks";

export function FlowDiagram({
  title,
  steps,
  connector = "arrow",
  caption,
}: {
  title: string;
  steps: string[];
  connector?: "arrow" | "plus";
  caption?: string;
}) {
  return (
    <figure className="flow-diagram">
      <figcaption>{title}</figcaption>
      <ol className={`flow-steps ${connector === "plus" ? "flow-sum" : ""}`}>
        {steps.map((step, index) => (
          <li key={`${index}-${step}`}>
            <span>{step}</span>
            {index < steps.length - 1 && (
              <b aria-hidden="true">{connector === "plus" ? "+" : "→"}</b>
            )}
          </li>
        ))}
      </ol>
      {caption && <p>{caption}</p>}
    </figure>
  );
}

export function StudyBlocks({ blocks }: { blocks: StudyBlock[] }) {
  return (
    <div className="study-blocks">
      {blocks.map((block, index) => {
        switch (block.kind) {
          case "code":
            return (
              <CodeExample
                key={index}
                code={block.code}
                label={block.title}
                accessibleLabel={block.title}
              />
            );
          case "timeline":
            return (
              <figure className="study-timeline" key={index}>
                <figcaption>{block.title}</figcaption>
                <p className="timeline-scale">
                  Same scale: 0–{block.totalSeconds} seconds
                </p>
                {block.rows.map((row) => (
                  <div className="timeline-row" key={row.label}>
                    <span>
                      {row.label} · {row.start}–{row.start + row.duration}s
                    </span>
                    <div className="timeline-track" aria-hidden="true">
                      <span
                        style={{
                          marginLeft: `${(row.start / block.totalSeconds) * 100}%`,
                          width: `${(row.duration / block.totalSeconds) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
                <p>{block.caption}</p>
              </figure>
            );
          case "text":
            return (
              <div className="study-text" key={index}>
                <h3>{block.title}</h3>
                <p>{block.text}</p>
              </div>
            );
          case "flow":
            return <FlowDiagram key={index} {...block} />;
          case "classification":
            return <Classification key={index} activity={block.activity} />;
          case "cards":
            return (
              <div key={index} className="study-card-group">
                <h3>{block.title}</h3>
                <div
                  className={`study-cards ${block.layout === "layers" ? "study-layers" : ""}`}
                >
                  {block.items.map((item) => (
                    <div className="study-card" key={item.title}>
                      <h4>{item.title}</h4>
                      <p>{item.text}</p>
                      {item.example && (
                        <p>
                          <strong>Example.</strong> {item.example}
                        </p>
                      )}
                      {item.remember && (
                        <p className="card-reminder">
                          <strong>Remember this.</strong> {item.remember}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            );
        }
      })}
    </div>
  );
}
