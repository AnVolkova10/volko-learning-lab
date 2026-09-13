import type { TopicSection } from "../../data/types";

type TableOfContentsProps = {
  topicId: string;
  sections: Pick<TopicSection, "id" | "title">[];
  hasProject?: boolean;
};

export function TableOfContents({
  topicId,
  sections,
  hasProject,
}: TableOfContentsProps) {
  return (
    <aside className="lesson-sidebar">
      <nav aria-label="On this page">
        <p className="eyebrow">IN THIS NOTE</p>
        <a href={`#/topics/${topicId}/introduction`}>Before we begin</a>
        {sections.map((section, index) => (
          <a href={`#/topics/${topicId}/${section.id}`} key={section.id}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            {section.title}
          </a>
        ))}

        <a href={`#/topics/${topicId}/practice`}>
          ✳ &nbsp; Ten practice questions
        </a>

        {hasProject && (
          <a href={`#/topics/${topicId}/project`}>Final practical exercise</a>
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
