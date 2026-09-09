import type { TopicSection } from "../../data/types";

type TableOfContentsProps = {
  topicId: string;
  sections: Pick<TopicSection, "id" | "title" | "letter">[];
};

export function TableOfContents({ topicId, sections }: TableOfContentsProps) {
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

        <a href={`#/topics/${topicId}/practice`}>
          ✳ &nbsp; Ten practice questions
        </a>

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
