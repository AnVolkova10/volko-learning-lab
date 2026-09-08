import type { TopicSection } from "../data/topics";

type TableOfContentsProps = {
  topicId: string;
  sections: Pick<TopicSection, "id" | "title" | "letter">[];
  hasExercise: boolean;
};

export function TableOfContents({
  topicId,
  sections,
  hasExercise,
}: TableOfContentsProps) {
  return (
    <aside className="lesson-sidebar">
      <nav aria-label="On this page">
        <p className="eyebrow">IN THIS NOTE</p>
        <a href={`#/topics/${topicId}/introduction`}>Before we begin</a>
        {sections.map((section) => (
          <a href={`#/topics/${topicId}/${section.id}`} key={section.id}>
            <span>{section.letter || "·"}</span>
            {section.title}
          </a>
        ))}
        {hasExercise && (
          <a href={`#/topics/${topicId}/practice`}>
            ✳ &nbsp; Put it into practice
          </a>
        )}
        <a href={`#/topics/${topicId}/recap`}>Your pocket recap</a>
      </nav>
      <p className="sidebar-note">
        Take your time.
        <br />
        <em>Understanding beats memorizing.</em>
      </p>
    </aside>
  );
}
