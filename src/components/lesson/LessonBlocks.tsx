type CodeExampleProps = {
  code: string;
  accessibleLabel: string;
  label?: string;
  language?: string;
};

export function SimpleDefinition({ text }: { text: string }) {
  return (
    <div className="simple-definition">
      <h3>In plain words</h3>
      <p>{text}</p>
    </div>
  );
}

export function CodeExample({
  code,
  accessibleLabel,
  label,
  language = "TypeScript",
}: CodeExampleProps) {
  const snippet = (
    <pre tabIndex={0} aria-label={accessibleLabel}>
      <code>{code}</code>
    </pre>
  );

  // Exercise snippets have no header; lesson comparisons use BEFORE/AFTER.
  if (!label) return snippet;

  return (
    <div className="code-example">
      <div className="code-label">
        <span>{label}</span>
        <span>{language}</span>
      </div>
      {snippet}
    </div>
  );
}

export function Analogy({ text }: { text: string }) {
  return (
    <div className="analogy">
      <span aria-hidden="true">✧</span>
      <div>
        <h3>Think of it this way</h3>
        <p>{text}</p>
      </div>
    </div>
  );
}

export function Takeaway({ text }: { text: string }) {
  return (
    <div className="takeaway">
      <span aria-hidden="true">↳</span>
      <p>
        <strong>Remember this</strong>
        {text}
      </p>
    </div>
  );
}

export function Recap({ items }: { items: string[] }) {
  return (
    <section className="recap" id="recap" tabIndex={-1}>
      <p className="eyebrow">KEEP THE IMPORTANT BITS</p>
      <h2>Your pocket recap.</h2>
      <ul>
        {items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="recap-note">
        Close the note. Explain one idea in your own words. That is where
        understanding starts.
      </p>
    </section>
  );
}
