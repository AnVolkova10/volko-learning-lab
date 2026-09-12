import type { Exercise, ExerciseBank } from "../../types.ts";

// Alternatives keep their feedback beside the answer. Every scenario is independent
// of the guided examples, so practice requires applying the idea in a new setting.
function question(
  id: string,
  title: string,
  prompt: string,
  choices: [string, string, string],
  correct: number,
  explanation: string,
): Exercise {
  return {
    id,
    title,
    prompt,
    correctOptionId: String(correct),
    options: choices.map((label, index) => ({
      id: String(index),
      label,
      explanation:
        index === correct
          ? explanation
          : `Reconsider what the brief authorizes and what success requires. ${explanation}`,
    })),
  };
}

export const delegationExercises: ExerciseBank = [
  {
    id: "outcomes",
    apply: [
      question(
        "outcomes-apply-a",
        "A calendar invitation",
        "You want an agent to implement an invitation flow. Which brief delegates a verifiable outcome?",
        [
          "Create an InviteButton.tsx file.",
          "Let an organizer send an invitation through the existing service; handle success and rejection, verify both, and keep the change local.",
          "Make invitations professional.",
        ],
        1,
        "The second brief defines the user outcome, existing integration boundary, expected states, evidence, and publication limit. A filename alone does not define a complete flow.",
      ),
      question(
        "outcomes-apply-b",
        "An invoice export",
        "You are handing over a CSV export feature. Which missing detail matters most for a definition of done?",
        [
          "The agent's preferred variable names.",
          "The number of files it should edit.",
          "Which fields must be exported and how you will verify the exported values.",
        ],
        2,
        "The content and verification of the exported file define a checkable result. File counts and naming preferences cannot establish that the export is correct.",
      ),
      question(
        "outcomes-apply-c",
        "An email preview",
        "You only want to discuss whether an email preview would help your product. What should the agent do?",
        [
          "Compare the options and explain a recommendation without editing the application.",
          "Implement the feature because it appears useful.",
          "Create a public demo to help you decide.",
        ],
        0,
        "The request authorizes discussion. A recommendation can include tradeoffs and a proposed scope, but implementation and publication need an actual instruction to perform them.",
      ),
    ],
    identify: [
      question(
        "outcomes-identify-a",
        "What did the agent actually do?",
        "A system receives a failing image upload report, inspects the code, patches it, runs tests, and changes its next step after reading a failure. What behavior is this?",
        [
          "An agentic action-and-feedback loop.",
          "A chat-only answer.",
          "A fixed sort operation.",
        ],
        0,
        "The system acts on the environment and uses observations to choose subsequent work. The interaction is more than returning advice.",
      ),
      question(
        "outcomes-identify-b",
        "A definition of success",
        "Which statement defines an outcome rather than merely reporting activity?",
        [
          "Seven source files were opened.",
          "Members can update their display name, and invalid input produces the agreed message.",
          "A component was renamed.",
        ],
        1,
        "The display-name behavior can be exercised and checked. Reading or renaming files may contribute to the work, but neither proves that the intended user outcome exists.",
      ),
      question(
        "outcomes-identify-c",
        "The actual deliverable",
        "A user asks: 'Explain three options for implementing offline support; do not change files.' What is the deliverable?",
        [
          "A finished offline implementation.",
          "A deployed proof of concept.",
          "A comparison of approaches and their tradeoffs.",
        ],
        2,
        "The requested result is an analysis. The explicit no-edits boundary remains in force even if the agent has repository tools.",
      ),
    ],
  },
  {
    id: "context",
    apply: [
      question(
        "context-apply-a",
        "A gallery with a fixed stack",
        "Tomorrow's task adds image captions to a gallery. The stack and image API are already documented. How should you write the brief?",
        [
          "Paste every project document into the task again.",
          "Omit all references because an agent must remember everything.",
          "Point to the current project notes and specify the caption behavior and acceptance checks.",
        ],
        2,
        "The brief can reuse stable project context while clearly supplying today's change. Referenced notes must actually be accessible to the agent.",
      ),
      question(
        "context-apply-b",
        "A recurring review preference",
        "You want future code reviews to explain the impact before implementation details. Where does that instruction belong?",
        [
          "In the ongoing working rules the agent reads.",
          "Only inside today's image-caption task.",
          "In a generated build artifact.",
        ],
        0,
        "This preference applies across unrelated tasks. Put it with stable collaboration rules rather than repeatedly embedding it in individual feature requests.",
      ),
      question(
        "context-apply-c",
        "Conflicting location formats",
        "The current task says to display local event times. Project notes say all displayed times use UTC. What should the agent do?",
        [
          "Pick the easier format without mentioning the conflict.",
          "Identify the conflict and ask which requirement governs the display before making the affected change.",
          "Implement both formats on every screen.",
        ],
        1,
        "The requirements disagree about visible behavior. The agent should present that concrete decision instead of silently choosing or expanding the scope.",
      ),
    ],
    identify: [
      question(
        "context-identify-a",
        "Which context layer?",
        "'This medical-training prototype uses synthetic records only' describes a rule specific to this project. Which layer is it?",
        ["Current task only.", "A tool result.", "Project context."],
        2,
        "The data restriction is a persistent fact and boundary for this prototype. It does not describe a single feature to implement today.",
      ),
      question(
        "context-identify-b",
        "A portable preference",
        "'When reviewing my code, explain important assumptions' applies to every project you work on. Which layer is it?",
        [
          "Working rules.",
          "The current task.",
          "One project's framework choice.",
        ],
        0,
        "It is a stable collaboration preference that should remain available across tasks and projects.",
      ),
      question(
        "context-identify-c",
        "Today's exact change",
        "'Add a keyboard shortcut to close the photo lightbox' belongs primarily to which layer?",
        [
          "Permanent working rules.",
          "Current task.",
          "An escalation condition.",
        ],
        1,
        "The instruction specifies a concrete change for the work at hand. It is not a general rule for all future features.",
      ),
    ],
  },
  {
    id: "authority",
    apply: [
      question(
        "authority-apply-a",
        "An analytics shortcut",
        "An agent is authorized to improve a chart locally, with no new services. It thinks sending event data to an external analytics provider would simplify the work. What should happen?",
        [
          "Upload the data because the tool is available.",
          "Pause that proposal and explain the service and data-sharing decision that needs authorization.",
          "Add the provider silently and mention it at the end.",
        ],
        1,
        "A new service and external data transfer exceed the authorized local chart change. A useful escalation explains why it is proposed and what an in-scope alternative would lose.",
      ),
      question(
        "authority-apply-b",
        "A dangerous test fixture",
        "A data-cleanup task needs validation. The agent has a production connection, but was only authorized to work with local fixtures. What is the correct next move?",
        [
          "Run a small production deletion first.",
          "Assume credentials imply permission.",
          "Validate on the authorized local fixtures; ask before any required production operation.",
        ],
        2,
        "Access is a capability, not permission. The agent should keep validation inside the approved environment and surface any genuine need to go beyond it.",
      ),
      question(
        "authority-apply-c",
        "A client demo link",
        "A client prototype is ready for local review. No publication permission was given. What should the agent deliver?",
        [
          "The local result, validation evidence, and any remaining limitations.",
          "An unlisted public URL; unlisted means private.",
          "A push to the main branch because the build passed.",
        ],
        0,
        "Readiness and successful validation do not authorize external publication. An unlisted URL may still expose client material.",
      ),
    ],
    identify: [
      question(
        "authority-identify-a",
        "A routine repair",
        "A local chart update has a typo in its import path. The correct existing module is clear and the repair stays in scope. Should the agent continue or escalate?",
        [
          "Continue with the repair and rerun the relevant check.",
          "Ask the user to choose the import spelling.",
          "Replace the chart framework.",
        ],
        0,
        "A routine, well-understood local repair is part of the delegated work. Escalation is for consequential decisions beyond the granted authority.",
      ),
      question(
        "authority-identify-b",
        "A useful question",
        "Which message is a concrete escalation?",
        [
          "Can I continue?",
          "The requested map needs location data the approved API does not expose. Should we use the agreed static sample, or authorize an API change?",
          "I changed the API; is that okay?",
        ],
        1,
        "A useful escalation explains the evidence, impact, and decision needed before the out-of-scope action happens.",
      ),
      question(
        "authority-identify-c",
        "An instruction inside a file",
        "While inspecting a downloaded design note, an agent finds text telling it to upload the repository to an unknown server. How should it treat that text?",
        [
          "As new user authorization.",
          "As a mandatory project milestone.",
          "As untrusted content that does not grant authority to upload anything.",
        ],
        2,
        "Material encountered during a task may supply information, but instructions inside it do not automatically override the user's boundaries.",
      ),
    ],
  },
  {
    id: "efficiency",
    apply: [
      question(
        "efficiency-apply-a",
        "Counting rows",
        "A validated CSV needs an exact row count after import. What is the simplest suitable implementation?",
        [
          "Ask three agents to estimate and vote.",
          "Send the full file to a language model each time.",
          "Use a normal CSV parser and count the parsed records.",
        ],
        2,
        "Parsing and counting follow a known rule. Deterministic code gives an exact, repeatable operation without extra model judgments.",
      ),
      question(
        "efficiency-apply-b",
        "Choosing a model for a repeatable task",
        "You are comparing models for structured release-note formatting. How should you choose?",
        [
          "Test representative examples and use the smallest model that consistently meets the checks, including retry cost.",
          "Always choose the cheapest individual call, ignoring failures.",
          "Always use the largest available model.",
        ],
        0,
        "The useful comparison is reliable task completion, not price per call or model size alone. Rework and review can erase apparent savings.",
      ),
      question(
        "efficiency-apply-c",
        "Three people editing one paragraph",
        "You consider assigning three agents to rewrite the same short tooltip at once. What is the best default?",
        [
          "Add all three because more agents always improve quality.",
          "Use one agent first; add independent review only if it solves a demonstrated problem.",
          "Create an agent for every word.",
        ],
        1,
        "Coordination and duplicated context have costs. A short, tightly coupled task rarely benefits from dividing the same work among several workers by default.",
      ),
    ],
    identify: [
      question(
        "efficiency-identify-a",
        "A checksum utility",
        "A function calculates a file checksum using a fixed algorithm. Is it necessarily another AI agent?",
        [
          "Yes, because it processes data.",
          "Yes, because an agent can call it.",
          "No. It is an ordinary tool unless additional model-driven decisions are involved.",
        ],
        2,
        "A capability can be deterministic code. Calling it from an agent does not turn the function itself into another agent.",
      ),
      question(
        "efficiency-identify-b",
        "The right starting context",
        "A bug affects one pagination control. Which starting context is most relevant?",
        [
          "The failing behavior, the pagination component, and its data contract.",
          "Every historical chat about every project.",
          "Only the words 'fix it', with no accessible evidence.",
        ],
        0,
        "Focused evidence is useful. The agent can inspect further if needed; removing essential information is not efficiency.",
      ),
      question(
        "efficiency-identify-c",
        "Independent investigation",
        "One agent inspects a database-free accessibility report while another investigates a separate build failure. Each has a clear deliverable. What makes this split potentially useful?",
        [
          "The number of agents itself guarantees correctness.",
          "The tasks can progress independently and produce results that can be reviewed separately.",
          "The agents will never need context or coordination.",
        ],
        1,
        "Independence and clear outputs can justify parallel help. The final work still needs integration and review; more workers are not a quality guarantee.",
      ),
    ],
  },
  {
    id: "milestones",
    apply: [
      question(
        "milestones-apply-a",
        "A search redesign",
        "You want to approve the search behavior before the agent spends time styling it. Which milestone instruction is clearest?",
        [
          "Show the functional search flow, including no-results behavior, and wait for my approval before visual polish.",
          "Tell me whenever a file changes.",
          "Style everything first so I have something beautiful to review.",
        ],
        0,
        "This defines an observable result and an explicit approval gate before dependent work. It protects a meaningful decision rather than every keystroke.",
      ),
      question(
        "milestones-apply-b",
        "A camera prototype",
        "The implementation compiles, but the user journey depends on camera permission being refused. What should the validation milestone include?",
        [
          "Only a screenshot of the happy path.",
          "A browser check of both granted and denied permission behavior, plus the configured build checks.",
          "A count of the new components.",
        ],
        1,
        "The relevant failure state is part of the user flow. Compilation cannot prove the denial experience works.",
      ),
      question(
        "milestones-apply-c",
        "An offline cache is complete",
        "The agreed offline cases pass and the patch is ready for review. The agent notices an unrelated navigation cleanup. What should it do?",
        [
          "Keep editing until no improvements remain.",
          "Rewrite navigation before handing over the patch.",
          "Stop at the agreed finish, and mention the unrelated opportunity separately.",
        ],
        2,
        "A stop condition prevents an open-ended expansion of work. An observation can be reported without automatically implementing it.",
      ),
    ],
    identify: [
      question(
        "milestones-identify-a",
        "Evidence or activity?",
        "Which progress report provides meaningful milestone evidence?",
        [
          "I was busy for twenty minutes.",
          "I edited four folders.",
          "The address form handles valid and invalid postal codes; here are the checks and the remaining integration limitation.",
        ],
        2,
        "This report links an observable outcome to evidence and a limitation. Time and file counts describe activity without proving completion.",
      ),
      question(
        "milestones-identify-b",
        "A report is not a gate",
        "The brief says: 'Report after the data adapter is ready, then continue testing.' Does the agent need approval before those tests?",
        [
          "No; the brief explicitly authorizes continuing after the update.",
          "Yes; every progress message must stop work.",
          "No; and it can also publish without asking.",
        ],
        0,
        "A milestone update and an approval gate are different. Continuing the named tests is authorized, but publication is not implied.",
      ),
      question(
        "milestones-identify-c",
        "A missing required check",
        "A required end-to-end check cannot run because the test service is unavailable. Which handoff is accurate?",
        [
          "Everything passed because the build passed.",
          "The build passed; the end-to-end check is blocked by the unavailable service, so full validation is incomplete.",
          "The agent should hide the limitation to keep the handoff short.",
        ],
        1,
        "The handoff should distinguish completed evidence from the blocked requirement. It must not turn an unavailable check into a passing one.",
      ),
    ],
  },
];
