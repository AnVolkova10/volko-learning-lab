import { solidExercises } from "./solid-exercises.ts";
import type { Topic } from "../../types.ts";

export const solid: Topic = {
  id: "solid",
  illustration: "solid-foundations",
  title: "The Five Principles of SOLID",
  description:
    "Five thoughtful habits for writing code that is easier to understand, change, and grow. Small TypeScript examples, everyday analogies, and a little practice.",
  category: "programming",
  tags: ["Software design", "TypeScript", "Clean code"],
  readMinutes: 18,
  introduction:
    "SOLID is a set of five software design principles. They began in object-oriented design, but their questions are useful for frontend functions, components, and modules too: What should this part own? What can change independently? What does a caller expect? Explore one principle at a time. The goal is understandable code, and each extra abstraction should earn its place.",
  sections: [
    {
      id: "srp",
      letter: "S",
      definition:
        "Give each part of your code one clear responsibility. Change it only when the requirements for that responsibility change.",
      title: "Single Responsibility Principle",
      explanation:
        "A module should have one reason to change: one cohesive responsibility driven by the same kind of requirements. A responsibility can involve several methods or steps. Think about who asks for a change and why. A visual redesign and a new storage strategy are independent reasons to change, so they usually belong in separate places.",
      analogy:
        "A notebook designer chooses the page layout; an archivist decides where notebooks are stored. Changing the shelf system should not require redesigning every page.",
      mistake:
        "This function mixes presentation with persistence. A new heading style and a new way to save notes both require editing it. Counting its lines or methods would miss the real issue.",
      beforeCode: `function createTitle(title: string) {
  const heading = document.createElement('h2');
  heading.textContent = title;
  localStorage.setItem('last-title', title);
  return heading;
}`,
      better:
        "Give title rendering and saving separate functions. A caller can coordinate them. Each function can evolve for its own reason without hiding a storage side effect inside a rendering function.",
      afterCode: `function createTitle(title: string) {
  const heading = document.createElement('h2');
  heading.textContent = title;
  return heading;
}

function saveTitle(title: string) {
  localStorage.setItem('last-title', title);
}

const heading = createTitle('SOLID');
saveTitle('SOLID');`,
      takeaway:
        "Group code by why it changes. One responsibility can contain many related steps.",
    },
    {
      id: "ocp",
      letter: "O",
      definition:
        "Make it possible to add a new behavior without rewriting the existing code that already works for the old behaviors.",
      title: "Open-Closed Principle",
      explanation:
        "Software should be open for extension and closed for modification. When a kind of variation keeps appearing, provide a way to add that behavior while leaving the stable algorithm alone. This does not mean never editing existing code: bug fixes and changed requirements still need edits. Choose extension points for real needs.",
      analogy:
        "A notebook with removable dividers lets you add a new subject without rebinding all the pages you already use.",
      mistake:
        "Each new validation rule means editing this shared function again. As rules grow, unrelated checks become tangled and old behavior is easier to break.",
      beforeCode: `function validateTitle(value: string): string[] {
  const errors: string[] = [];
  if (!value.trim()) errors.push('Add a title.');
  if (value.length > 80) errors.push('Use 80 characters or fewer.');
  return errors;
}`,
      better:
        "Let the validator run a list of rule functions. Adding another rule extends behavior through the list; the loop stays the same. In React, passing children or a callback can offer a similarly small extension point.",
      afterCode: `type Rule = (value: string) => string | null;

function validate(value: string, rules: Rule[]): string[] {
  return rules.flatMap((rule) => {
    const error = rule(value);
    return error === null ? [] : [error];
  });
}

const required: Rule = (value) =>
  value.trim() ? null : 'Add a title.';
const shortTitle: Rule = (value) =>
  value.length <= 80 ? null : 'Use 80 characters or fewer.';

validate('My next topic', [required, shortTitle]);`,
      takeaway:
        "Add a new behavior at a useful extension point; keep the shared algorithm stable.",
    },
    {
      id: "lsp",
      letter: "L",
      definition:
        "A replacement must do everything the original type promises. Code using it should still work without special exceptions for that replacement.",
      title: "Liskov Substitution Principle",
      explanation:
        "A subtype must be usable wherever its base type is expected while preserving that type’s behavioral contract. It must accept the promised inputs and deliver the promised outcomes. Matching TypeScript signatures alone cannot guarantee that behavior. This applies to objects implementing a shared interface as well as to inherited classes.",
      analogy:
        "If a library catalog promises “no result” for an unknown book, a replacement catalog should also handle that search. It should not suddenly require you to know that the book exists.",
      mistake:
        "TitleReader accepts any ID and promises undefined for a missing title. This implementation throws instead, so a caller’s normal fallback never runs. The implementation adds a hidden requirement: the ID must exist.",
      beforeCode: `interface TitleReader {
  // Accept any ID; return undefined when it is missing.
  getTitle(id: string): string | undefined;
}

const reader: TitleReader = {
  getTitle(id) {
    if (id !== 'solid') throw new Error('Unknown topic');
    return 'The Five Principles of SOLID';
  },
};

reader.getTitle('unknown') ?? 'Topic not found'; // Throws!`,
      better:
        "Preserve the missing-title behavior. Callers can substitute this implementation and keep their fallback logic. An exception is a violation here because this specific contract promises a normal missing result; contracts can explicitly allow errors in other situations.",
      afterCode: `interface TitleReader {
  // Accept any ID; return undefined when it is missing.
  getTitle(id: string): string | undefined;
}

const titles = new Map([
  ['solid', 'The Five Principles of SOLID'],
]);

const reader: TitleReader = {
  getTitle: (id) => titles.get(id),
};

reader.getTitle('unknown') ?? 'Topic not found'; // Fallback works.`,
      takeaway:
        "A compatible type must keep its behavioral promises, including edge cases.",
    },
    {
      id: "isp",
      letter: "I",
      definition:
        "Require only the properties or functions that a piece of code actually uses. Do not make it accept extra features it does not need.",
      title: "Interface Segregation Principle",
      explanation:
        "Clients should only depend on the capabilities they use. Here, a client is code that consumes an interface, such as a component calling a method. Give that client a focused contract instead of making it accept a large object with unrelated methods. Small, cohesive interfaces make dependencies clearer.",
      analogy:
        "A reading-room pass lets you borrow a book. You should not need an archivist’s editing and deletion controls just to read its title.",
      mistake:
        "The label function only reads a title, yet its parameter requires saving and deleting too. A read-only source must provide meaningless methods just to satisfy this oversized interface.",
      beforeCode: `interface TopicEditor {
  getTitle(): string;
  saveTitle(title: string): void;
  deleteTopic(): void;
}

function titleLabel(source: TopicEditor) {
  return source.getTitle();
}

titleLabel({
  getTitle: () => 'SOLID',
  saveTitle: () => {}, // Only here to satisfy the type.
  deleteTopic: () => {},
});`,
      better:
        "Describe only what the label needs. An editor can still have additional capabilities, but this reader does not depend on them. For React components, this often means a few precise props instead of an entire application object.",
      afterCode: `interface TitleSource {
  getTitle(): string;
}

function titleLabel(source: TitleSource) {
  return source.getTitle();
}

titleLabel({ getTitle: () => 'SOLID' });`,
      takeaway:
        "Shape an interface around its caller’s needs. Avoid forcing unused capabilities on it.",
    },
    {
      id: "dip",
      letter: "D",
      definition:
        "Write important rules using a small description of what they need. Pass in the code that provides it, instead of tying the rules to one specific implementation.",
      title: "Dependency Inversion Principle",
      explanation:
        "High-level policy should depend on a useful abstraction, and low-level details should implement that abstraction. The policy describes what the app wants to accomplish; the detail describes how. Keep the abstraction focused on the policy’s needs. In TypeScript, a function type is often enough.",
      analogy:
        "A study routine asks you to record a completed session. It can work with a paper journal or a digital tracker because the routine does not dictate how the record is stored.",
      mistake:
        "The policy “a correct answer completes the lesson” knows about localStorage and its key format. Changing the storage mechanism would also require editing the learning rule.",
      beforeCode: `function recordAnswer(topicId: string, correct: boolean) {
  if (correct) {
    localStorage.setItem('completed:' + topicId, 'true');
  }
}`,
      better:
        "Let the policy accept a completion function. A browser-specific implementation fulfills that contract, and the caller connects them. This is dependency injection as a small technique for supporting inversion; it does not require a container or framework. Storage failures would be handled by the calling UI in a real feature.",
      afterCode: `type SaveCompletion = (topicId: string) => void;

function recordAnswer(
  topicId: string,
  correct: boolean,
  saveCompletion: SaveCompletion,
) {
  if (correct) saveCompletion(topicId);
}

const saveLocally: SaveCompletion = (topicId) => {
  localStorage.setItem('completed:' + topicId, 'true');
};

recordAnswer('solid', true, saveLocally);`,
      takeaway:
        "Let the policy define what it needs, and let interchangeable details provide it.",
    },
  ],
  exerciseBank: solidExercises,
  recap: [
    "S — Group things that change for the same reason; separate independent responsibilities.",
    "O — Extend at useful boundaries without repeatedly rewriting stable behavior.",
    "L — Keep the full contract when one implementation replaces another.",
    "I — Ask callers for only the capabilities you actually use.",
    "D — Let policy depend on a small contract that implementation details fulfill.",
    "Use these principles to solve a concrete maintenance problem. A plain function, a focused prop type, or composition may be all you need.",
  ],
  sources: [
    {
      title: "SRP — Robert C. Martin: The Single Responsibility Principle",
      url: "https://blog.cleancoder.com/uncle-bob/2014/05/08/SingleReponsibilityPrinciple.html",
    },
    {
      title: "OCP — Robert C. Martin: The Open Closed Principle",
      url: "https://blog.cleancoder.com/uncle-bob/2014/05/12/TheOpenClosedPrinciple.html",
    },
    {
      title:
        "LSP — Barbara Liskov and Jeannette Wing: A Behavioral Notion of Subtyping (PDF)",
      url: "https://www.cs.cmu.edu/~wing/publications/LiskovWing94.pdf",
    },
    {
      title:
        "ISP — Robert C. Martin: The Interface Segregation Principle (PDF)",
      url: "https://objectmentor.com/resources/articles/isp.pdf",
    },
    {
      title: "DIP — Robert C. Martin: The Dependency Inversion Principle (PDF)",
      url: "https://objectmentor.com/resources/articles/dip.pdf",
    },
  ],
};
