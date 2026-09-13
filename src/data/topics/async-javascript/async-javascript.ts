import type { Topic } from "../../../types/topic.ts";
import { asyncExercises } from "./async-javascript-exercises.ts";

export const asyncJavascript: Topic = {
  id: "async-javascript",
  illustration: "async-clock",
  title: "Async JavaScript Without Mystery",
  description:
    "Understand what runs now, what waits, and what can happen together. Promises, async / await, and practical frontend flows you can reason about.",
  category: "javascript-frontend",
  tags: ["JavaScript", "Promises", "Frontend"],
  readMinutes: 20,
  difficulty: "Beginner to Intermediate",
  introduction:
    "You can use await and still feel unsure about what happens next. This note builds an explanation from small examples: what a function returns, what a Promise represents, and which result the next step needs. Bring basic familiarity with functions, variables, and arrays. Plan about 18–20 minutes for guided study including code tracing and prediction activities; the ten-question practice and final written exercise take extra time. These snippets are examples to read, not requests this website executes. Stop at each prediction before checking its answer.",
  sections: [
    {
      id: "sync-and-async",
      title: "Synchronous vs Asynchronous JavaScript",
      definition:
        "Synchronous code finishes the current step before the next step runs. Asynchronous APIs let you start an operation and handle its result later, while other work can continue.",
      explanation:
        "A page can request data without making the person wait to open a menu. The request takes time, but the JavaScript that starts it does not have to occupy the main thread for the entire wait. The main thread is where ordinary page JavaScript and much interaction work happen. Non-blocking means this thread is free during the wait; it does not mean that the requested result is already available. Using a value before it arrives is still a mistake.",
      blocks: [
        {
          kind: "code",
          title: "Predict before checking",
          code: 'console.log("A");\n\nsetTimeout(() => {\n  console.log("B");\n}, 1000);\n\nconsole.log("C");',
        },
        {
          kind: "classification",
          activity: {
            title: "Which output comes first?",
            instruction:
              "Make your prediction before checking the explanation.",
            categories: ["A, B, C", "A, C, B", "B, A, C"],
            items: [
              {
                text: "What is the complete output order?",
                answer: "A, C, B",
                explanation:
                  "A runs immediately. setTimeout schedules a callback and returns; C runs next. B runs later, after the timer is eligible and JavaScript can run its callback. The 1000ms delay is not an exact appointment.",
              },
            ],
          },
        },
        {
          kind: "flow",
          title: "Two different kinds of work",
          steps: [
            "Run current code",
            "Register a timer or request",
            "Continue current code",
            "Handle the result later",
          ],
          caption:
            "Registering work happens now. Its callback runs later; a timer does not put the following line on hold.",
        },
        {
          kind: "cards",
          title: "Waiting is different from calculating",
          items: [
            {
              title: "Waiting for an API",
              text: "The browser manages the network operation. When current JavaScript finishes, the page can handle other events while the request is pending. Show a loading state and keep unrelated controls available.",
            },
            {
              title: "Calculating a huge result",
              text: "A long synchronous loop still occupies the main thread. Adding async to its function does not move that loop elsewhere. Splitting work or using a worker is a separate subject.",
            },
          ],
        },
        {
          kind: "text",
          title: "One boundary to remember",
          text: "JavaScript does not interrupt an ordinary running function to execute a timer callback in the middle. The event loop coordinates when queued work can run. Tasks, microtasks, and rendering deserve their own future lesson. For now, distinguish code that runs immediately from code registered for later, and do not infer exact timing from the delay.",
        },
      ],
      takeaway:
        "Start an operation now; use its result when it becomes available. Waiting and blocking are different.",
    },
    {
      id: "promises",
      title: "Promises",
      definition:
        "A Promise is an object representing an operation’s eventual outcome: a value if it succeeds, or a reason if it fails.",
      explanation:
        "Think “a value that may be available later”, with one important addition: the operation may fail. The Promise is available immediately; its successful value might not be. A Promise can also already be settled when you receive it. Assigning getUser() to a variable does not necessarily give you the user: it may give you the Promise that will provide that user. Check the function’s contract, not just its name.",
      blocks: [
        {
          kind: "cards",
          title: "Three states",
          items: [
            {
              title: "Pending",
              text: "No final outcome yet. Pending is neither success nor failure.",
            },
            {
              title: "Fulfilled",
              text: "The operation succeeded with a value. A success handler can use it.",
            },
            {
              title: "Rejected",
              text: "The operation failed with a reason, commonly an Error. A rejection handler can decide what to do.",
            },
          ],
        },
        {
          kind: "flow",
          title: "The lifecycle",
          steps: [
            "Start request",
            "Receive a Promise",
            "Pending",
            "Settles: fulfilled OR rejected",
          ],
          caption:
            "The final outcomes are alternatives, not consecutive stages. Once settled, the final outcome cannot change.",
        },
        {
          kind: "code",
          title: "Use a frontend helper",
          code: '// Assume getUser(): Promise<{ name: string }>\n// showName and showError update the UI.\ngetUser()\n  .then((user) => {\n    showName(user.name);\n  })\n  .catch((error) => {\n    showError("Could not load your profile.");\n  });',
        },
        {
          kind: "text",
          title: "What then and catch do",
          text: "Calling .then() registers a fulfillment handler; it does not synchronously unwrap the value. .catch() handles rejection in the preceding chain, including an error thrown by the preceding success handler. Both return a new Promise, which lets you connect steps. If a handler starts an operation that the next step must wait for, return its Promise from the handler. Otherwise the chain cannot track it.",
        },
        {
          kind: "code",
          title: "Follow the returned value",
          code: "Promise.resolve(4)\n  .then((value) => value + 2)\n  .then((value) => console.log(value));",
        },
        {
          kind: "classification",
          activity: {
            title: "Follow the value",
            instruction:
              "Make your prediction before checking the explanation.",
            categories: ["4", "6", "undefined"],
            items: [
              {
                text: "What does the final handler log?",
                answer: "6",
                explanation:
                  "The first handler receives 4 and returns 6. The Promise returned by that .then() fulfills with 6, which reaches the next handler.",
              },
            ],
          },
        },
        {
          kind: "text",
          title: "A failure path can become a success path",
          text: "If catch returns a fallback, its returned Promise fulfills with that fallback. If catch throws, failure continues. Returning an empty list can be a valid offline fallback, but silently converting every failure into an empty list can make a broken request look like successful “no results”. Choose the meaning deliberately.",
        },
      ],
      takeaway:
        "A Promise is the result container, not the successful value itself. Follow success and failure.",
    },
    {
      id: "async-await",
      title: "async / await",
      definition:
        "An async function returns a Promise. Inside it, await suspends the rest of that function until a value is available or a rejection can be thrown there.",
      explanation:
        "async/await expresses Promise-based steps in an order that is often easier to read. It does not introduce a different kind of asynchronous operation. In both versions below, getUser provides a Promise, success updates the name, and failure reaches an error handler. These helpers are illustrative application functions, not built-in browser APIs. The caller can observe the function’s completion through its returned Promise.",
      blocks: [
        {
          kind: "code",
          title: "Promise-chain version",
          code: 'function loadProfile() {\n  return getUser()\n    .then((user) => showName(user.name))\n    .catch(() => showError("Profile unavailable."));\n}',
        },
        {
          kind: "code",
          title: "Equivalent async / await version",
          code: 'async function loadProfile() {\n  try {\n    const user = await getUser();\n    showName(user.name);\n  } catch (error) {\n    showError("Profile unavailable.");\n  }\n}',
        },
        {
          kind: "text",
          title: "Which part pauses?",
          text: "Only the continuation after await waits for the result. The caller receives a Promise and can continue. Once current synchronous work finishes, the browser can process other events during the pending operation. Statements before the first await run synchronously. Statements after it can still contain expensive synchronous work: async is not a guarantee that everything inside is responsive.",
        },
        {
          kind: "code",
          title: "A value returned through a Promise",
          code: "async function answer() {\n  return 42;\n}\n\nasync function displayAnswer() {\n  const value = await answer();\n  console.log(value);\n}",
        },
        {
          kind: "classification",
          activity: {
            title: "Read the contract",
            instruction:
              "Make your prediction before checking the explanation.",
            categories: ["Promise", "Number"],
            items: [
              {
                text: "answer() returns…",
                answer: "Promise",
                explanation:
                  "async makes the returned value available through a Promise. The call itself does not return a plain number.",
              },
              {
                text: "Inside displayAnswer, value is a…",
                answer: "Number",
                explanation:
                  "await produces the fulfilled value, 42. A rejection would instead throw at that await.",
              },
            ],
          },
        },
        {
          kind: "text",
          title: "Where await is allowed",
          text: "Use await inside an async function, or at the top level of a module that supports top-level await. It is not valid at the top level of an ordinary classic script. An async outer function does not automatically make its nested callbacks async. When a normal function calls an async function, it receives a Promise: return it, handle it, or await it in an appropriate context.",
        },
      ],
      takeaway:
        "await pauses this continuation, not the whole browser. async gives the caller a Promise.",
    },
    {
      id: "errors",
      title: "Error Handling That Reaches the UI",
      definition:
        "Handle failure where you can make a useful decision: show an error, provide a deliberate fallback, or pass the failure to a caller.",
      explanation:
        "A request has more than one way to fail. The network may be unavailable, the server may return an unsuccessful status, or the response body may not be valid JSON. fetch normally fulfills with a Response even for HTTP 404 or 500. That describes a failed HTTP result, but it is not automatically a rejected Promise. response.ok is true for status codes from 200 through 299. Decide what your application counts as success before using the body.",
      blocks: [
        {
          kind: "code",
          title: "Loading, success, and failure",
          code: '// UI helpers and endpoint are illustrative.\nasync function loadProfile() {\n  setLoading(true);\n  setError(null);\n  try {\n    const response = await fetch("/api/profile");\n    if (!response.ok) {\n      throw new Error(`HTTP ${response.status}`);\n    }\n    const data = await response.json();\n    showProfile(data);\n  } catch (error) {\n    setError("Could not load your profile. Try again.");\n  } finally {\n    setLoading(false);\n  }\n}',
        },
        {
          kind: "flow",
          title: "Make every outcome visible",
          steps: [
            "Start loading; clear stale error",
            "Request and check status",
            "Read body",
            "Show data OR show error",
            "Finally: end loading",
          ],
        },
        {
          kind: "text",
          title: "Why there are two awaits",
          text: "The first waits for the response to become available. The second waits for its body to be read and parsed as JSON. A response can arrive before its body is completely consumed. If parsing fails, the second await throws into the same catch. Parsed JSON still needs to match the expected shape: await and TypeScript annotations do not validate server data. Validation is a separate responsibility beyond this small example.",
        },
        {
          kind: "classification",
          activity: {
            title: "Which path is taken?",
            instruction: "Choose a path, then check why it applies.",
            categories: ["Catch", "Success path"],
            items: [
              {
                text: "The server returns HTTP 500.",
                answer: "Catch",
                explanation:
                  "fetch can fulfill, but the explicit response.ok check throws. Catch handles the error and finally ends loading.",
              },
              {
                text: "HTTP 200 arrives with valid JSON and showProfile succeeds.",
                answer: "Success path",
                explanation:
                  "Both awaited steps succeed, so showProfile runs. Finally still ends loading.",
              },
            ],
          },
        },
        {
          kind: "text",
          title: "Catching a failure is a policy decision",
          text: "This example handles failure locally and does not rethrow it. Its caller therefore cannot interpret fulfillment of loadProfile() as proof that the profile loaded. That is fine for a UI event handler that owns the message. A data helper should usually return useful data or propagate failure so its caller can decide. Logging an error is not the same as recovering from it.",
        },
      ],
      takeaway:
        "Check status, await body parsing, and leave the interface usable after either outcome.",
    },
    {
      id: "concurrency",
      title: "Sequential vs Concurrent Work",
      definition:
        "Sequential work starts one operation after another finishes. Concurrent work lets independent operations overlap while they are waiting.",
      explanation:
        "Before choosing syntax, ask what each operation needs to start. If getPosts requires the user ID returned by getUser, that dependency is real. If both already have their inputs, waiting for one before starting the other adds avoidable delay. Concurrent does not mean two ordinary functions are executing on the main thread at the exact same instant. Here it means the network waits overlap.",
      blocks: [
        {
          kind: "code",
          title: "Sequential: the second call starts later",
          code: "// Both helpers already have all their inputs.\nconst user = await getUser();\nconst posts = await getPosts();",
        },
        {
          kind: "code",
          title: "Concurrent: start both, then await the group",
          code: "const [user, posts] = await Promise.all([\n  getUser(),\n  getPosts(),\n]);",
        },
        {
          kind: "timeline",
          title: "Sequential: about 3 seconds",
          totalSeconds: 3,
          rows: [
            {
              label: "User request",
              start: 0,
              duration: 1,
            },
            {
              label: "Posts request",
              start: 1,
              duration: 2,
            },
          ],
          caption:
            "Assume requests take 1s and 2s, with negligible processing overhead. Sequential duration is approximately their sum.",
        },
        {
          kind: "timeline",
          title: "Concurrent: about 2 seconds",
          totalSeconds: 3,
          rows: [
            {
              label: "User request",
              start: 0,
              duration: 1,
            },
            {
              label: "Posts request",
              start: 0,
              duration: 2,
            },
          ],
          caption:
            "Same scale, different start times. The duration is approximately the longest request, not a guaranteed production timing.",
        },
        {
          kind: "text",
          title: "What starts the work?",
          text: "The calls getUser() and getPosts() start these operations. Promise.all receives their Promises and provides one Promise for the group. Its result array preserves input order, even if the second request finishes first. Promise.all([await getUser(), await getPosts()]) defeats this example: the awaited expressions are evaluated before the array reaches Promise.all, so those calls start sequentially.",
        },
        {
          kind: "code",
          title: "A real dependency",
          code: "const user = await getUser();\nconst posts = await getPostsForUser(user.id);",
        },
        {
          kind: "classification",
          activity: {
            title: "Choose a schedule",
            instruction: "Choose a path, then check why it applies.",
            categories: ["Concurrent", "Sequential"],
            items: [
              {
                text: "Load a public category list and a public help article from independent endpoints.",
                answer: "Concurrent",
                explanation:
                  "Neither needs the other’s result. Assuming no other resource or side-effect constraints, their waits can overlap.",
              },
              {
                text: "Create a draft, then attach a cover using its new draft ID.",
                answer: "Sequential",
                explanation:
                  "The cover operation cannot start correctly until creation returns the ID.",
              },
            ],
          },
        },
        {
          kind: "text",
          title: "When one operation fails",
          text: "Promise.all rejects when an input rejects; it does not cancel the other operations. Use it when all results are needed for the next step. If partial results are useful, a deliberate fallback or Promise.allSettled may fit better; that API deserves later practice. Hundreds of independent requests may also need a concurrency limit. Independence permits overlap, but resource limits and side effects still matter.",
        },
      ],
      takeaway:
        "Draw dependencies first. Start independent work together; await results where you need them.",
    },
    {
      id: "common-mistakes",
      title: "Common Mistakes",
      definition:
        "Most async mistakes come from using a result too early, hiding failure, or waiting at the wrong boundary.",
      explanation:
        "Trace three things when a page behaves strangely: the value in each variable, the moment each operation starts, and the place its failure can be observed. These questions are more useful than adding await everywhere. A Promise is still a real object, so incorrect code may run until a missing property exposes the mistake. Clear return types and small functions make this easier to notice.",
      blocks: [
        {
          kind: "cards",
          title: "Six mistakes to recognize",
          items: [
            {
              title: "Forgetting await",
              text: "const user = getUser() stores a Promise when getUser is async. user.name does not read its eventual name. Await the result in an async function or use a fulfillment handler.",
            },
            {
              title: "Unnecessary sequential awaits",
              text: "Starting independent requests one at a time stretches the wait. Check their dependencies and use Promise.all when the next step needs all results.",
            },
            {
              title: "await in the wrong context",
              text: "A nested callback is not async just because its surrounding function is. Use the correct context and handle the Promise that an async function returns.",
            },
            {
              title: "Swallowing errors",
              text: "An empty catch hides failure without recovery or communication. A fallback must be intentional; do not make broken requests silently look successful.",
            },
            {
              title: "Assuming HTTP errors reject",
              text: "await fetch(url) can produce a Response with status 404. Check response.ok before treating that response as success.",
            },
            {
              title: "Making ordinary work async",
              text: "A small array filter is synchronous. An async wrapper changes the return contract without making the calculation faster or moving it off the main thread.",
            },
          ],
        },
        {
          kind: "code",
          title: "A missing await also affects catch",
          code: '// Problem: a later rejection escapes this catch.\nasync function brokenSave() {\n  try {\n    saveSettings(); // Returns a Promise.\n  } catch (error) {\n    showError("Save failed.");\n  }\n}\n\n// This handler owns the failure, so await in its try.\nasync function saveWithFeedback() {\n  try {\n    await saveSettings();\n    showSuccess();\n  } catch (error) {\n    showError("Save failed.");\n  }\n}',
        },
        {
          kind: "text",
          title: "A small debugging routine",
          text: "Name the expected type: Response, parsed data, or a Promise of either? Mark which statements run before the first await and which require a result. Then simulate failure at each awaited step. If no caller or handler notices a rejection, the flow needs an error boundary. If you catch it locally, decide whether to communicate, return a documented fallback, or rethrow. Retries also need limits and care with repeated side effects.",
        },
      ],
      takeaway:
        "Do not add async by habit. Make the result, dependency, and failure path explicit.",
    },
    {
      id: "agents",
      title: "Why This Matters for AI Agents",
      definition:
        "An agent often waits for external results before deciding its next action. Async JavaScript connects those waits without blocking unrelated work.",
      explanation:
        "Model calls, web requests, and asynchronous file APIs can all return Promises. A tool may use them, but not every tool is asynchronous: sorting a short list can remain a normal function. The word agent does not change the JavaScript rules. If a model request needs a tool result, it must receive that completed result, not its Promise. Independent inspections can overlap.",
      blocks: [
        {
          kind: "code",
          title: "Dependent steps — conceptual pseudocode",
          code: "// Imagined API names, not a real SDK.\nasync function takeAgentStep(goal) {\n  const response = await model.generate(goal);\n  const toolResult = await runTool(response.toolCall);\n  const nextStep = await model.generate(toolResult);\n  return nextStep;\n}",
        },
        {
          kind: "flow",
          title: "Follow the data",
          steps: [
            "Model chooses a tool",
            "Tool produces a result",
            "Model uses that result",
          ],
          caption:
            "Each step needs the preceding output. Starting all three together breaks those dependencies.",
        },
        {
          kind: "code",
          title: "Independent read-only inspections",
          code: "// Assume authorized, independent read-only helpers.\nasync function gatherContext() {\n  const [research, repository] = await Promise.all([\n    searchWeb(),\n    inspectRepository(),\n  ]);\n  return { research, repository };\n}",
        },
        {
          kind: "text",
          title: "Concurrency does not grant authority",
          text: "Read-only and independent are explicit assumptions. Two edits to the same file may conflict; deployment may depend on a successful build; a tool call may need approval. Promise.all schedules result collection, not permission to expand a task. A production agent also needs validation, timeouts, bounded retries, permissions, and stop conditions beyond these tiny snippets.",
        },
        {
          kind: "text",
          title: "Connect this to your previous lesson",
          text: "A milestone review often depends on several checks. Some can overlap; others require an earlier output. You can now explain why an agent sometimes waits, which tasks can run together, and why a tool call must finish before its result is reported. This is a programming foundation for understanding agent behavior, not another architecture to memorize.",
        },
      ],
      takeaway:
        "The same rule applies to a UI and an agent: wait for required data, overlap independent waits, and handle failure.",
    },
  ],
  practiceIntroduction:
    "Ten mixed questions: five application challenges and five predictions or diagnoses, drawn from thirty alternatives. These scenarios differ from the guided examples. Follow values, dependencies, and failure paths.",
  project: {
    title: "Plan a dashboard load",
    scenario:
      "A page needs a profile, notifications, and permissions. getProfile() and getNotifications() can start immediately and return Promises. getPermissions(profile.roleId) needs the roleId from the profile. All three results are required to show the dashboard. Assume the helpers reject on network failures, unsuccessful HTTP status, or invalid response data.",
    fields: [
      {
        label: "START",
        prompt: "Which operations already have their inputs?",
        suggestion:
          "Start getProfile() and getNotifications(). Neither needs the other’s result.",
      },
      {
        label: "DEPENDENCY",
        prompt: "When can permissions start? Must notifications finish first?",
        suggestion:
          "Start getPermissions(profile.roleId) as soon as the profile arrives. It does not need notifications. Write an async loadProfileAndPermissions() helper that awaits profile, then permissions, and returns both.",
      },
      {
        label: "AWAIT",
        prompt: "How would you join the work before rendering?",
        suggestion:
          "In an async handler, await Promise.all([loadProfileAndPermissions(), getNotifications()]). The first result contains profile and permissions; the second contains notifications. Render after both have fulfilled. The dependent chain overlaps the independent notification request.",
      },
      {
        label: "ERRORS AND LOADING",
        prompt: "Where do failures go, and how does loading stop?",
        suggestion:
          "Set loading true and clear the old error first. Put the awaited Promise.all inside try/catch. On success render the data; on failure show a retryable error. End loading in finally. A group rejection does not cancel other in-flight work.",
      },
    ],
    closing:
      "A simpler correct plan could await profile and notifications together, then request permissions. It respects dependencies but delays permissions if notifications is slower. The suggested plan starts permissions as soon as its actual prerequisite arrives. Explain the dependency before choosing syntax.",
  },
  recap: [
    "A Promise represents an eventual outcome, not the eventual value itself.",
    "async returns a Promise; await gives you its fulfilled value or throws its rejection.",
    "await does not move heavy computation off the main thread.",
    "Handle network, HTTP-status, and body-reading failures deliberately.",
    "Overlap independent waits; preserve dependencies. Promise.all does not cancel other work.",
  ],
  recapBlocks: [
    {
      kind: "cards",
      title: "Five things to keep",
      items: [
        {
          title: "Promise → outcome",
          text: "An operation can fulfill with a value or reject with a reason.",
        },
        {
          title: "async → Promise-returning function",
          text: "The caller receives a Promise for the function’s outcome.",
        },
        {
          title: "await → wait here",
          text: "Continue this async code with the value, or throw the rejection here.",
        },
        {
          title: "try / catch → failure path",
          text: "Handle errors thrown in the try, including rejections awaited there.",
        },
        {
          title: "Promise.all → join results",
          text: "Await started operations as a group; independent waits can overlap.",
        },
      ],
    },
  ],
  closingThought:
    "Async JavaScript is not about making JavaScript faster. It is about letting the program keep working while it waits.",
  sources: [
    {
      title: "MDN — Introducing asynchronous JavaScript",
      url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Async_JS/Introducing",
    },
    {
      title: "MDN — async functions",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function",
    },
    {
      title: "MDN — Using Fetch",
      url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch",
    },
    {
      title: "MDN — Promise.all",
      url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all",
    },
  ],
  exerciseBank: asyncExercises,
};
