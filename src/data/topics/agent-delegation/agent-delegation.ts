import type { Topic } from "../../types.ts";
import { delegationExercises } from "./agent-delegation-exercises.ts";

export const agentDelegation: Topic = {
  id: "agent-delegation",
  illustration: "delegation-map",
  title: "From Prompting to Delegation: How to Direct AI Agents",
  description:
    "You already work with coding agents. Now learn to delegate larger outcomes with clear boundaries, useful evidence, and fewer interruptions.",
  category: "agentic-engineering",
  tags: ["AI agents", "Delegation", "Developer workflow"],
  readMinutes: 20,
  difficulty: "Beginner to Intermediate",
  introduction:
    "How can I give an AI agent more autonomy without losing control, wasting tokens, or having to supervise every individual step? That is the question for this note. You already ask coding agents to inspect repositories, edit files, use tools, fix errors, and deliver working features. We will name the moving parts and make your instructions easier to act on. Allow about 18–20 minutes for the guided reading; the optional practice and final written plan take extra time. Each section is a small, independent session: understand an idea, inspect an example, and make a decision.",
  sections: [
    {
      id: "already-using-agents",
      title: "You Are Already Using Agents",
      definition:
        "An agent uses tools and the results of its actions to decide what to do next toward a goal. A chat-only exchange ends by giving you an answer.",
      explanation:
        "The important difference is what happens after the model responds. If it explains how to fix a component and waits for you to edit it, you are doing the work. If it inspects the component, makes a change, runs a check, reads the failure, and adjusts the implementation, it is acting in an agent loop. The same product can support both kinds of interaction. A chat-shaped screen does not tell you which kind of work is happening.",
      blocks: [
        {
          kind: "flow",
          title: "Chat: an answer is the deliverable",
          steps: ["User", "Model", "Answer"],
        },
        {
          kind: "flow",
          title: "Agent: results guide the next action",
          steps: [
            "Goal",
            "Think",
            "Tool",
            "Result",
            "Decide",
            "Repeat",
            "Stop",
          ],
          caption:
            "Think means choosing a useful next action; it does not mean the agent must show you private internal reasoning. Ask for its plan, decisions, and evidence.",
        },
        {
          kind: "cards",
          title: "Build my learning library and deploy it",
          items: [
            {
              title: "Investigate and implement",
              text: "Inspect the repository and instructions. Find the actual entry point and existing components. Build the requested screens using the current stack. Run the production build, read any errors, and fix the relevant code.",
              example:
                "A missing import is ordinary implementation work. The agent can resolve it without requesting approval for the filename.",
            },
            {
              title: "Publish and verify — when authorized",
              text: "Review the changes for credentials, push to the intended GitHub repository, deploy the connected Vercel project, then open the live site and exercise the important flow. Stop with links and the checks that actually ran.",
              example:
                "If your rule says local changes only, the agent stops before pushing. A deployment example in a lesson never overrides that rule.",
            },
          ],
        },
        {
          kind: "text",
          title: "An action is not the same as a verified result",
          text: "A tool saying that a deployment command finished is evidence about that command. It is not proof that the mobile layout works or that the right account received the deployment. Ask for evidence tied to the goal: the build result, the destination, and a check of the live interaction. A fixed script can also run several tools; we call the task agentic here when the model uses results to choose the next step rather than merely following an unchanging sequence.",
        },
        {
          kind: "classification",
          activity: {
            title: "Chat or agentic task?",
            instruction:
              "Classify the behavior described, not the product name.",
            categories: ["CHAT", "AGENTIC TASK"],
            items: [
              {
                text: "Explain why CSS Grid can overflow. Return an explanation only.",
                answer: "CHAT",
                explanation:
                  "The requested output is an answer. No action-and-feedback loop is required.",
              },
              {
                text: "Inspect the overflowing page, edit its layout, test it at 390px, and fix any remaining overflow.",
                answer: "AGENTIC TASK",
                explanation:
                  "The agent must act, observe results, and decide whether more work is needed.",
              },
            ],
          },
        },
      ],
      takeaway:
        "You are already directing agents when you delegate actions and let their results guide the next step.",
    },
    {
      id: "agent-anatomy",
      title: "The Anatomy of an Agent",
      definition:
        "An agent combines a goal, relevant context, a model, tools, a repeated work loop, and a clear condition for stopping.",
      explanation:
        "You do not need a new framework to understand these six parts. Imagine asking an agent to fix a broken login. The request supplies a direction, but the agent also needs information about the failure and access to appropriate tools. It needs to know what a successful login looks like and which changes are allowed. Leaving those details implicit creates avoidable guesses, even with a capable model.",
      blocks: [
        {
          kind: "flow",
          title: "What enters the loop?",
          steps: [
            "Goal + context",
            "Model chooses",
            "Tool acts",
            "Result returns",
            "Continue or stop",
          ],
          caption:
            "A result can be useful even when it is a failure. A failing test narrows the next investigation.",
        },
        {
          kind: "cards",
          title: "Six parts, in plain words",
          items: [
            {
              title: "Goal",
              text: "The result you want to exist when the work ends.",
              example:
                "Users with valid credentials can sign in and reach their dashboard.",
              remember:
                "Describe the outcome, not just an action like editing a file.",
            },
            {
              title: "Context",
              text: "The information needed to make sensible decisions about this work.",
              example:
                "The login fails only after session expiry; the project uses an existing authentication service.",
              remember:
                "Give useful facts and constraints, not every document you own.",
            },
            {
              title: "Model",
              text: "The AI that interprets the task and proposes the next step.",
              example:
                "It compares the error with the login code and decides which behavior to inspect next.",
              remember:
                "A convincing explanation is still a hypothesis until checked.",
            },
            {
              title: "Tools",
              text: "Capabilities the agent can call to inspect or change something.",
              example:
                "Repository search, a file editor, a test runner, and a browser using a test account.",
              remember:
                "Tool access provides capability; your instructions define permission.",
            },
            {
              title: "Loop",
              text: "The repeated cycle of acting, reading the result, and deciding what follows.",
              example:
                "Reproduce a failed login, patch the request handling, rerun the test, and inspect the result.",
              remember:
                "Each repeat should produce evidence or progress, not just another guess.",
            },
            {
              title: "Stop condition",
              text: "An observable point where the agent must end its work.",
              example:
                "The agreed login cases pass and the patch is ready for review; no deployment is requested.",
              remember:
                "Done should be checkable by someone other than the agent.",
            },
          ],
        },
        {
          kind: "classification",
          activity: {
            title: "Unpack: Fix the broken login",
            instruction:
              "Match each piece of the brief to the part it supplies.",
            categories: ["GOAL", "CONTEXT", "TOOLS", "STOP CONDITION"],
            items: [
              {
                text: "Valid users can sign in after their previous session expires.",
                answer: "GOAL",
                explanation: "This describes the behavior you want restored.",
              },
              {
                text: "The failure started after the client began using the existing refresh endpoint.",
                answer: "CONTEXT",
                explanation:
                  "This is evidence to guide investigation, not an instruction to replace authentication.",
              },
              {
                text: "Use repository search, the existing test runner, and a browser with a test account.",
                answer: "TOOLS",
                explanation:
                  "These are capabilities for inspecting and validating the repair.",
              },
              {
                text: "End after valid and invalid login cases pass and the patch is ready for review.",
                answer: "STOP CONDITION",
                explanation:
                  "This defines the agreed finish rather than an endless cleanup task.",
              },
            ],
          },
        },
      ],
      takeaway:
        "A useful brief gives the agent something to achieve, something to work with, and a way to know when to stop.",
    },
    {
      id: "prompting-vs-delegation",
      title: "Prompting vs Delegation",
      definition:
        "Prompting can request an individual action. Delegation gives responsibility for an outcome, within rules you define.",
      explanation:
        "Suppose a settings screen needs a new notification preference. You could ask for a toggle, review it, ask for state handling, review it, then remember to request an error message. You become the task scheduler and must keep the whole feature in your head. Delegation changes the unit of work: the agent owns the agreed user flow, including the checks that make it complete.",
      blocks: [
        {
          kind: "flow",
          title: "Direct every step",
          steps: ["Task", "Review", "Task", "Review", "Task", "Review"],
        },
        {
          kind: "flow",
          title: "Delegate an outcome",
          steps: [
            "Goal + rules + constraints + definition of done",
            "Agent works",
            "Milestone review",
          ],
        },
        {
          kind: "cards",
          title: "Two briefs for the same screen",
          items: [
            {
              title: "An isolated instruction",
              text: "Add a notification toggle to settings. This is fine if you only want to explore its appearance. It does not say whether preferences must persist, what happens on failure, or whether the task includes integration.",
            },
            {
              title: "A delegated objective",
              text: "Let users change their notification preference through the existing API. Reuse our form components, preserve the API contract, and handle saving, success, and failure. Verify the agreed cases. Show the functional flow before polishing the UI; stop before publishing.",
            },
          ],
        },
        {
          kind: "text",
          title: "Definition of done",
          text: "This means the evidence that makes the task complete. For the settings screen, it could be: the current value loads, the user can change it, a failed save leaves a clear retry path, and relevant tests pass. That is more useful than 'make it good'. The agent may choose local implementation details, such as a helper name, while you retain control of user behavior, scope, and release decisions.",
        },
        {
          kind: "text",
          title: "Discussing an idea is a different request",
          text: "'What do you think about replacing our settings page?' asks for analysis. It does not authorize a replacement. State whether a conversation is exploration, a plan, or implementation. Likewise, a permanent rule such as 'keep changes local' should remain in force while the agent works on a larger objective. More autonomy inside a task should not quietly expand its authority.",
        },
        {
          kind: "classification",
          activity: {
            title: "Working rule or current task?",
            instruction:
              "Would this instruction still apply to tomorrow's unrelated feature?",
            categories: ["WORK RULE", "TASK"],
            items: [
              {
                text: "Do not implement an idea when I am only asking to discuss it.",
                answer: "WORK RULE",
                explanation:
                  "This describes an ongoing collaboration preference.",
              },
              {
                text: "Add a retry message to the notification settings screen.",
                answer: "TASK",
                explanation:
                  "This names a specific result for the current piece of work.",
              },
              {
                text: "Prefer existing dependencies when they already solve the problem.",
                answer: "WORK RULE",
                explanation: "This guides decisions across multiple tasks.",
              },
            ],
          },
        },
      ],
      takeaway:
        "Don't supervise every action. Supervise the decisions that matter.",
    },
    {
      id: "context-layers",
      title: "The Three Layers of Context",
      definition:
        "Separate how you work, what is true about this project, and what you want done now. These three layers change at different speeds.",
      explanation:
        "Mixing everything into every prompt makes instructions harder to maintain. A preference about architecture might apply for months; the project's visual identity lasts for the project; a loader request lasts for one task. Put each instruction where you can find and update it. You can then write a short current brief without losing the stable facts that guide implementation.",
      blocks: [
        {
          kind: "cards",
          title: "Three layers for an audio-analysis prototype",
          layout: "layers",
          items: [
            {
              title: "WORK RULES · how we collaborate",
              text: "Avoid unnecessary architecture. Use Conventional Commits. Do not automatically implement ideas that are only being discussed.",
              example:
                "Keep these in the working instructions your agent actually reads. A commit naming rule applies when committing is authorized; it does not grant permission to commit.",
            },
            {
              title: "PROJECT CONTEXT · what is true here",
              text: "React + TypeScript + Vite. Norauto brand. The existing backend must not be modified.",
              example:
                "Keep project-specific facts close to the repository, with links to the actual design and integration contracts.",
            },
            {
              title: "CURRENT TASK · what changes today",
              text: "Replace the generic spinner with an audio-analysis loader.",
              example:
                "Specify the loading, completed, and failed states, where the loader appears, and the evidence you want to review.",
            },
          ],
        },
        {
          kind: "text",
          title: "Stable does not mean automatically available",
          text: "A rule written in a document the agent never receives cannot guide it. Check which instruction files your environment loads, and point to the relevant project notes. If two sources disagree, have the agent identify the conflict rather than choose silently. The three-layer model organizes information; it is not a universal technical priority order for every agent product. Norauto here is a teaching example, not a new brand rule for this learning library.",
        },
        {
          kind: "classification",
          activity: {
            title: "Place each instruction in its layer",
            instruction:
              "Choose WORK RULE, PROJECT RULE, or TASK. Here PROJECT RULE includes project facts as well as project-specific constraints.",
            categories: ["WORK RULE", "PROJECT RULE", "TASK"],
            items: [
              {
                text: "Use Conventional Commits when an authorized commit is made.",
                answer: "WORK RULE",
                explanation:
                  "This is a recurring working convention in the example.",
              },
              {
                text: "This prototype uses React, TypeScript, and Vite.",
                answer: "PROJECT RULE",
                explanation: "The stack describes this project's environment.",
              },
              {
                text: "Replace the generic spinner with an audio-analysis loader.",
                answer: "TASK",
                explanation: "This is the specific change requested now.",
              },
              {
                text: "Keep the prototype consistent with the Norauto brand.",
                answer: "PROJECT RULE",
                explanation:
                  "The brand belongs to the project, not every future project.",
              },
              {
                text: "Avoid architecture that solves no current problem.",
                answer: "WORK RULE",
                explanation:
                  "This guides how you want work approached across tasks.",
              },
              {
                text: "For this prototype, leave the existing backend unchanged.",
                answer: "PROJECT RULE",
                explanation: "This is a boundary tied to the project.",
              },
            ],
          },
        },
      ],
      takeaway: "Stable context should not be repeated inside every task.",
    },
    {
      id: "autonomy-boundaries",
      title: "Autonomy Needs Boundaries",
      definition:
        "Autonomy is permission to choose the steps inside an agreed scope. Escalation means returning an important decision to you when that scope is no longer enough.",
      explanation:
        "The goal is not to remove every question. It is to make questions useful. The agent should handle ordinary implementation choices, read failures, and repair its own mistakes inside the requested scope. It should pause the affected action when the next move requires authority you did not give. It can continue independent, authorized work while the unresolved decision waits; a blocked backend change need not prevent finishing an unrelated label.",
      blocks: [
        {
          kind: "cards",
          title: "A bounded brief: the next three TODO items",
          layout: "layers",
          items: [
            {
              title: "GOAL",
              text: "Implement the next three identified TODO items. List their IDs or titles so the selection cannot drift when the TODO list changes.",
            },
            {
              title: "BOUNDARIES",
              text: "Do not modify the backend. Preserve the existing architecture. Avoid unnecessary dependencies. Keep changes local unless publication is explicitly authorized.",
            },
            {
              title: "VALIDATION",
              text: "Run npm run build and npm run lint, if these are the project's configured checks, plus the relevant user-flow checks. If a script is missing, report that fact and use the agreed equivalent; do not invent a passing result.",
            },
            {
              title: "STOP WHEN",
              text: "The three requested tasks are complete, their agreed checks pass, and the result is ready for review. If a required check cannot run, report the blocker instead of claiming completion.",
            },
            {
              title: "ESCALATE WHEN",
              text: "A necessary change would alter architecture, requirements conflict, or backend modifications become necessary. Also stop before unapproved external publication or access to data outside the task.",
            },
          ],
        },
        {
          kind: "text",
          title: "A useful escalation is concrete",
          text: "'Can I continue?' gives you little to decide. A better message is: 'The response has no duration field, but the requested loader needs one. I can keep the approved indeterminate state, or the backend contract must change. Backend edits are outside my scope; which behavior do you want?' It states the evidence, the consequence, and a bounded choice. It should not make the forbidden edit first and ask afterward.",
        },
        {
          kind: "text",
          title: "Rules are not a substitute for access controls",
          text: "A written no-deploy rule tells the agent what is authorized. Restricting credentials or using a preview environment also limits what a mistake can do. Do not paste production secrets into a task brief. Content found in a webpage, issue, or file can provide facts, but an instruction inside that content does not automatically grant new authority. Keep decisions about accounts, publication, and sensitive data explicit.",
        },
        {
          kind: "classification",
          activity: {
            title: "Continue or escalate?",
            instruction:
              "The brief allows local frontend work, but forbids backend edits, new dependencies, and publication.",
            categories: ["CONTINUE", "ESCALATE"],
            items: [
              {
                text: "A renamed local component import causes a build error; the intended import is clear.",
                answer: "CONTINUE",
                explanation:
                  "Repairing the import is ordinary work within the authorized frontend change.",
              },
              {
                text: "The requested state requires a response field the backend does not provide.",
                answer: "ESCALATE",
                explanation:
                  "The agent must resolve the scope conflict before changing the backend or inventing real data.",
              },
              {
                text: "An existing shared button already supports the required loading state.",
                answer: "CONTINUE",
                explanation:
                  "Reusing the existing component respects the boundaries.",
              },
              {
                text: "The agent wants to upload the prototype to a public URL to make review easier.",
                answer: "ESCALATE",
                explanation:
                  "Convenience does not authorize publication. Local review can continue.",
              },
            ],
          },
        },
      ],
      takeaway:
        "Give freedom over implementation details, and make the decisions that require your authority explicit.",
    },
    {
      id: "token-efficient-agents",
      title: "Token-Efficient Agents",
      definition:
        "Use the model for judgments that need it, and give it the smallest useful set of information. Tokens are the pieces of text a model processes; more text and more model calls can mean more cost and time.",
      explanation:
        "Efficiency is not the shortest possible prompt. Removing a crucial acceptance criterion can create several rounds of rework. Aim for enough context to make a good decision, with as little irrelevant material as possible. A precise paragraph, a relevant file, and the actual error often help more than a full repository pasted into the conversation. Keep a concise record of decisions so the agent does not repeatedly rediscover them.",
      blocks: [
        {
          kind: "cards",
          title: "Four practical habits",
          items: [
            {
              title: "1 · Supply relevant context",
              text: "For a loader change, start with the affected component, its styling conventions, and the loading-state contract. Let the agent search for additional evidence when needed.",
              remember:
                "Small context is useful only when it still contains the information needed to do the job.",
            },
            {
              title: "2 · Use ordinary code for fixed rules",
              text: "Sorting topics alphabetically or saving a validated object has a known rule. A normal function can perform it directly and predictably.",
              remember:
                "Deterministic means the same input follows the same rule; no fresh model judgment is necessary.",
            },
            {
              title: "3 · Choose a capable model, then compare",
              text: "Use the smallest model that reliably meets the task's checks. A simple formatting task may need less capability than diagnosing a failure across several systems.",
              remember:
                "Measure the whole task, including retries and review. A cheaper call that causes more rework may not save anything.",
            },
            {
              title: "4 · Add agents only for a reason",
              text: "A second agent needs its own context, task, and result review. Independent work may benefit from parallel help; tightly coupled edits can create duplicated investigation and conflicting changes.",
              remember:
                "Start with one agent and add another only when the split has a concrete benefit.",
            },
          ],
        },
        {
          kind: "cards",
          title: "A tool is not automatically another agent",
          items: [
            {
              title: "A tool executes a capability",
              text: "saveTopic(), sortTopics(), and writeFile() can be ordinary functions. The agent chooses when to call them; the code performs a defined operation. These names alone do not imply an AI model.",
              example:
                "sortTopics() compares titles with a fixed rule and returns an ordered list.",
            },
            {
              title: "Another agent makes further decisions",
              text: "A delegated worker may inspect a separate accessibility flow, choose checks, and return findings. That adds another model-driven loop, not merely another function call.",
              example:
                "If one normal validation function can check every required topic field, you do not need an agent to judge each field.",
            },
          ],
        },
        {
          kind: "text",
          title: "A small efficiency review",
          text: "Before adding complexity, ask what is being repeated: reading irrelevant files, re-explaining stable rules, formatting output, or making genuinely difficult decisions? Remove the repeat that has a clear cause. For now, you do not need to study caching, retrieval systems, embeddings, pricing tables, or model APIs. The useful first step is distinguishing information the model needs from work ordinary code can already do.",
        },
      ],
      takeaway:
        "Use AI where intelligence is needed. Use code where intelligence isn't needed.",
    },
    {
      id: "milestones",
      title: "Milestones Instead of Micromanagement",
      definition:
        "A milestone is a meaningful result you can inspect before more work builds on it. Review the outcome and important decisions, while the agent handles the steps between them.",
      explanation:
        "A milestone should answer a question you care about. 'I edited five files' reports activity. 'The upload flow works, including retry after a failed request' gives you something to assess. Choose checkpoints where feedback could change the next phase. You do not need to approve every utility function, but you may want to approve the user flow before the agent spends time polishing its appearance.",
      blocks: [
        {
          kind: "flow",
          title: "Micromanagement",
          steps: ["Task", "Review", "Task", "Review", "Task", "Review"],
        },
        {
          kind: "flow",
          title: "Milestone supervision",
          steps: [
            "Goal",
            "Autonomous work",
            "Milestone",
            "Autonomous work",
            "Milestone",
            "Final review",
          ],
        },
        {
          kind: "cards",
          title: "What would you review at each milestone?",
          layout: "layers",
          items: [
            {
              title: "Functional UX complete",
              text: "The main flow and its important states work with agreed sample data. Review what the user can do, what happens on failure, and whether the flow solves the right problem.",
            },
            {
              title: "Final UI implemented",
              text: "The approved design is applied. Inspect the real rendered page at mobile and desktop widths, including long content and controls. A build cannot tell you whether a button is clipped.",
            },
            {
              title: "Integration complete",
              text: "The UI uses the agreed data contract. Review success, loading, empty, and error behavior. If access was unavailable and mocks remain, that limitation must be visible in the handoff.",
            },
            {
              title: "Build and lint passing",
              text: "The configured checks pass and relevant interactions have been tested. Fixes should be checked as they are made too; this milestone confirms the final state rather than postponing validation until the end.",
            },
            {
              title: "Ready for human review",
              text: "Receive a concise change summary, evidence, remaining limitations, and the proposed next decision. A ready-for-review state does not itself authorize merging or deployment.",
            },
          ],
        },
        {
          kind: "text",
          title: "Choose which reviews are gates",
          text: "A progress update can simply keep you informed. A gate requires your response before dependent work proceeds. Say which you mean: 'Report after integration, then continue validation' differs from 'Wait for my UX approval before styling'. You can increase the size of delegated tasks as the agent demonstrates reliable results, while keeping the same rules about scope and evidence. Clear gates reduce interruptions without hiding consequential decisions.",
        },
      ],
      takeaway: "Supervise milestones, not keystrokes.",
    },
  ],
  exerciseBank: delegationExercises,
  practiceIntroduction:
    "Five challenges to apply these ideas and five to recognize good delegation decisions. Each visit draws ten mixed questions from a bank of thirty, using situations beyond the guided examples.",
  project: {
    title: "Direct a Genosha prototype",
    scenario:
      "You are starting a new Genosha project. The client wants a React prototype based on a Figma design. Design the delegation below. You have not been told that a backend, live credentials, or permission to publish exists. State those uncertainties instead of inventing requirements. Decide which milestone needs your approval and what the agent can complete independently.",
    fields: [
      {
        label: "GOAL",
        prompt: "What working result should the agent deliver?",
        suggestion:
          "Build a reviewable React prototype of the agreed Figma screens and primary user journey. Confirm the target screens and essential interactions before implementation. Use realistic, non-sensitive sample data where integration has not been authorized. The goal is a working prototype, not a new production platform.",
      },
      {
        label: "WORK RULES",
        prompt: "Which collaboration preferences should hold across tasks?",
        suggestion:
          "Prefer simple components and existing dependencies. Separate discussion from permission to implement. Make focused changes, preserve unrelated work, and explain meaningful decisions. Use the team's commit convention only if committing is authorized. For this exercise, keep the result local and ready for my review.",
      },
      {
        label: "PROJECT CONTEXT",
        prompt: "Which project facts and references does the agent need?",
        suggestion:
          "Provide the repository, the exact Figma file and screen references, agreed brand assets, target device widths, and any documented data contracts. Inspect the actual stack before proposing changes. Treat missing designs, contradictory states, or unknown integration requirements as unresolved facts. Do not invent a Genosha-wide technology standard from this brief.",
      },
      {
        label: "TOOLS",
        prompt:
          "Which capabilities help, and what access is actually available?",
        suggestion:
          "Use the available Figma reader, repository search, file editing, the project's package scripts, and a browser for local verification. If a connector cannot access the design, report the missing access and continue only work that does not depend on it. Having a GitHub or deployment tool available does not authorize using it to publish.",
      },
      {
        label: "BOUNDARIES",
        prompt: "What must remain unchanged or require explicit permission?",
        suggestion:
          "Work within the agreed prototype scope. Do not modify an existing backend, add infrastructure, install unnecessary dependencies, expose client material, or publish externally. Preserve the existing architecture where there is one. Use approved sample data; do not request production credentials just to demonstrate a UI.",
      },
      {
        label: "VALIDATION",
        prompt: "What evidence would persuade you the prototype works?",
        suggestion:
          "Run the configured build, lint, and relevant tests. In the browser, check the primary journey, loading and error states, keyboard navigation, and the agreed mobile and desktop widths against Figma. Report exact checks and any unavailable integration. A screenshot is visual evidence; it does not prove the buttons or network states work.",
      },
      {
        label: "ESCALATE IF",
        prompt: "Which important decisions exceed the agent's authority?",
        suggestion:
          "Pause affected work if Figma and the written requirements conflict, essential screens are missing, a backend change is required, or a new dependency or architectural change becomes necessary. Bring me the evidence, impact, and a small set of options. Obtain my functional-UX approval before final visual polish; continue independent checks while a separate decision waits.",
      },
      {
        label: "STOP WHEN",
        prompt:
          "What is the finish line, including review and publication limits?",
        suggestion:
          "Stop when the agreed screens and interactions are implemented, the approved visual direction is applied, validation passes, and a local review handoff lists changes and limitations. If a required check or input is unavailable, report the blocked part instead of declaring it complete. Leave commit, push, and deployment to me unless I explicitly change that boundary.",
      },
    ],
    closing:
      "Compare your draft with this solution by asking: can the agent identify success, act without asking about every detail, and recognize when a decision belongs to me? Several answers can work. The quality of the delegation is in those boundaries, not in copying this wording.",
  },
  recapFormula: [
    "Goal",
    "Relevant context",
    "Tools",
    "Boundaries",
    "Autonomy",
    "Escalation conditions",
    "Stop conditions",
  ],
  recap: [
    "Delegate an outcome with evidence of completion, rather than an endless sequence of isolated edits.",
    "Keep working rules, project facts, and the current task distinct and available to the agent.",
    "Give the agent room to choose implementation details; reserve decisions outside its authority for you.",
    "Use ordinary tools for fixed operations. Extra context and extra agents need a concrete purpose.",
    "Review meaningful milestones and name which reviews must wait for your approval.",
  ],
  closingThought:
    "The goal isn't to tell the agent every step. The goal is to create an environment where it can make good decisions without you.",
  sources: [
    {
      title: "Anthropic — Building effective agents (foundational concepts)",
      url: "https://www.anthropic.com/engineering/building-effective-agents",
    },
    {
      title: "Anthropic — Effective context engineering for AI agents",
      url: "https://www.anthropic.com/engineering/effective-context-engineering-for-ai-agents",
    },
    {
      title: "OWASP — Prompt injection prevention and tool permissions",
      url: "https://cheatsheetseries.owasp.org/cheatsheets/LLM_Prompt_Injection_Prevention_Cheat_Sheet.html",
    },
  ],
};
