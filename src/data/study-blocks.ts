// Optional building blocks for visual lessons. Content stays separate from React.
export type ClassificationData = {
  title: string;
  instruction: string;
  categories: string[];
  items: { text: string; answer: string; explanation: string }[];
};

export type ReflectionData = {
  title: string;
  scenario: string;
  fields: { label: string; prompt: string; suggestion: string }[];
  closing: string;
};

export type StudyBlock =
  | { kind: "text"; title: string; text: string }
  | {
      kind: "flow";
      title: string;
      steps: string[];
      connector?: "arrow" | "plus";
      caption?: string;
    }
  | {
      kind: "cards";
      title: string;
      layout?: "layers";
      items: {
        title: string;
        text: string;
        example?: string;
        remember?: string;
      }[];
    }
  | { kind: "classification"; activity: ClassificationData };
