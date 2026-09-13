import type { Exercise, ExerciseBank } from "../../types.ts";

// One local helper avoids repeating option objects and feedback text.
function question(
  id: string,
  title: string,
  prompt: string,
  choices: [string, string, string],
  correct: number,
  reason: string,
  code?: string,
): Exercise {
  return {
    id,
    title,
    prompt,
    ...(code ? { code } : {}),
    correctOptionId: String(correct),
    options: choices.map((label, index) => ({
      id: String(index),
      label,
      explanation: `${index === correct ? "Correct." : "Not quite."} ${reason}`,
    })),
  };
}

export const asyncExercises: ExerciseBank = [
  {
    id: "execution",
    apply: [
      question(
        "execution-apply-a",
        "An export spinner",
        "A button runs a ten-second synchronous calculation. Which change addresses main-thread blocking?",
        [
          "Put async before its function name.",
          "Move the suitable calculation to a worker.",
          "Add await before a call that performs the same synchronous calculation.",
        ],
        1,
        "A worker can run suitable computation off the main thread. async or await around synchronous work does not relocate it.",
      ),
      question(
        "execution-apply-b",
        "Scheduling a reminder",
        "A reminder should appear after a delay while the page remains usable. Which approach fits?",
        [
          "Use a busy loop until the time passes.",
          "Repeatedly calculate the current time without yielding.",
          "Use setTimeout to schedule the reminder callback.",
        ],
        2,
        "A timer registers work for later. Busy waiting occupies the main thread and prevents normal interaction.",
      ),
      question(
        "execution-apply-c",
        "A short filename cleanup",
        "You need to trim five strings already in memory. What is the simplest appropriate implementation?",
        [
          "Use ordinary synchronous array mapping.",
          "Create five async workers.",
          "Fetch the strings from a server again.",
        ],
        0,
        "A tiny deterministic transformation needs no asynchronous boundary. Normal synchronous code is appropriate when its work is small.",
      ),
    ],
    identify: [
      question(
        "execution-identify-a",
        "A delayed badge",
        "Assume a normal script. What output order occurs?",
        ["start, badge, end", "start, end, badge", "badge, start, end"],
        1,
        "The current script logs start and end before the scheduled timer callback can run.",
        'console.log("start");\nsetTimeout(() => console.log("badge"), 0);\nconsole.log("end");',
      ),
      question(
        "execution-identify-b",
        "An async calculation",
        "Why can this still make the UI unresponsive?",
        [
          "The await syntax is missing from the function name.",
          "async disables browser rendering permanently.",
          "expensiveCalculation still runs synchronously on the main thread.",
        ],
        2,
        "async changes the returned value into a Promise; it does not move the function body to another thread.",
        "async function calculateReport() {\n  return expensiveCalculation();\n}",
      ),
      question(
        "execution-identify-c",
        "A late timer",
        "A 500ms timer runs noticeably later during a busy script. Which explanation fits?",
        [
          "500ms makes the callback eligible; it may have to wait for JavaScript to be available.",
          "Timers are guaranteed to run at exactly 500ms.",
          "The timer must have become a rejected Promise.",
        ],
        0,
        "A timer delay is not an exact execution deadline. Blocking work and runtime scheduling can delay the callback.",
      ),
    ],
  },
  {
    id: "promise-values",
    apply: [
      question(
        "promise-values-apply-a",
        "A thumbnail chain",
        "makeThumbnail(file) returns a Promise. How should the first handler let upload wait for that thumbnail?",
        [
          "Call makeThumbnail without returning it.",
          "Return makeThumbnail(file) from the first handler.",
          "Return the filename instead of the thumbnail Promise.",
        ],
        1,
        "Returning the Promise connects its outcome to the chain. The next handler receives the generated thumbnail after fulfillment.",
        "readFile()\n  .then((file) => { /* complete this */ })\n  .then((thumbnail) => upload(thumbnail));",
      ),
      question(
        "promise-values-apply-b",
        "An offline reading list",
        "Offline mode deliberately uses an empty list. Which catch handler communicates that fallback through the chain?",
        [
          "catch(() => { return []; })",
          "catch(() => { throw new Error('offline'); })",
          "catch(() => { console.log('offline'); })",
        ],
        0,
        "Returning [] fulfills the next Promise with the documented fallback. Throwing propagates failure; logging alone returns undefined.",
      ),
      question(
        "promise-values-apply-c",
        "A reusable data helper",
        "A helper cannot recover from a failed request. Its caller owns the error UI. What should the helper do?",
        [
          "Catch it and return a success message.",
          "Catch it and return nothing.",
          "Let rejection propagate, or rethrow after adding useful context.",
        ],
        2,
        "The caller must be able to observe failure. Converting it to an unrelated fulfilled result hides the contract's failure path.",
      ),
    ],
    identify: [
      question(
        "promise-values-identify-a",
        "Formatting a price",
        "What reaches console.log?",
        ["10", "20", "undefined"],
        1,
        "The first handler returns 20; that value fulfills the next link.",
        "Promise.resolve(10)\n  .then((price) => price * 2)\n  .then(console.log);",
      ),
      question(
        "promise-values-identify-b",
        "A missing return",
        "What reaches the last handler?",
        ["draft", "A second copy of draft", "undefined"],
        2,
        "The first handler computes a string but does not return it. That handler returns undefined.",
        'Promise.resolve("draft")\n  .then((name) => { name.toUpperCase(); })\n  .then(console.log);',
      ),
      question(
        "promise-values-identify-c",
        "A documented fallback",
        "What is logged?",
        [
          "cached",
          "The original rejection reason",
          "Nothing; catch can never recover.",
        ],
        0,
        "The catch returns cached, so the following handler receives a fulfilled fallback value.",
        'Promise.reject(new Error("unavailable"))\n  .catch(() => "cached")\n  .then(console.log);',
      ),
    ],
  },
  {
    id: "await-contract",
    apply: [
      question(
        "await-contract-apply-a",
        "A translated label",
        "translate() returns Promise<string>. Inside an async handler, how do you pass its completed text to setLabel?",
        [
          "setLabel(translate());",
          "setLabel(await translate());",
          "await setLabel(translate());",
        ],
        1,
        "Await the operation whose value you need. Awaiting the outer setter does not unwrap a Promise already passed into it.",
      ),
      question(
        "await-contract-apply-b",
        "An ordinary event handler",
        "A normal, non-async callback needs to observe uploadFile() and its errors. Which is valid?",
        [
          "Use uploadFile().then(showDone).catch(showError).",
          "Use await directly without changing the callback.",
          "Ignore uploadFile() because the browser handles all errors.",
        ],
        0,
        "A Promise chain works in a normal callback. Alternatively make it async and deliberately handle failures; await is not valid in a non-async function.",
      ),
      question(
        "await-contract-apply-c",
        "Returning a save result",
        "The caller needs to await finishSave(). How should a normal function preserve the underlying save Promise?",
        [
          "Call save() and return undefined.",
          "Return true before save finishes.",
          "Return save().",
        ],
        2,
        "Returning the Promise exposes completion and rejection to the caller. A normal function can return a Promise without being marked async.",
      ),
    ],
    identify: [
      question(
        "await-contract-identify-a",
        "An async flag",
        "What does enabled() return?",
        [
          "A Promise that fulfills with true.",
          "The boolean true directly.",
          "Nothing until a timer runs.",
        ],
        0,
        "An async function always returns a Promise. The plain return value becomes its fulfillment value.",
        "async function enabled() {\n  return true;\n}",
      ),
      question(
        "await-contract-identify-b",
        "Local suspension",
        "While an async search function awaits a pending network request, what is paused?",
        [
          "Every browser feature.",
          "That function’s continuation after await.",
          "All network activity.",
        ],
        1,
        "The continuation waits for the outcome. Other work can proceed once current synchronous execution has yielded.",
      ),
      question(
        "await-contract-identify-c",
        "A classic script",
        "Why is this invalid in an ordinary classic script outside any function?",
        [
          "fetch never returns a Promise.",
          "await requires a variable named promise.",
          "await needs an async function or supported top-level module context.",
        ],
        2,
        "Top-level await is a module feature, not valid top-level syntax in an ordinary classic script.",
        'const response = await fetch("/api/theme");',
      ),
    ],
  },
  {
    id: "failure-paths",
    apply: [
      question(
        "failure-paths-apply-a",
        "A deleted document",
        "fetch returns HTTP 404 for a document. What should a helper that promises valid document data do before reading it as success?",
        [
          "Check response.ok and throw or explicitly handle the unsuccessful status.",
          "Assume await has already thrown.",
          "Treat every Response as document data.",
        ],
        0,
        "HTTP 404 can fulfill fetch. The application must inspect status and implement its intended missing-document or error behavior.",
      ),
      question(
        "failure-paths-apply-b",
        "An upload indicator",
        "Where should a loading indicator be cleared whether upload succeeds or fails?",
        [
          "Only after the success message.",
          "In finally surrounding the awaited work.",
          "Only inside catch.",
        ],
        1,
        "Finally runs after either path through try/catch. Success-only or failure-only cleanup leaves the other path incorrect.",
      ),
      question(
        "failure-paths-apply-c",
        "A reusable search function",
        "A catch logs an error and returns undefined; the caller expects an array on success. What is a sound fix when there is no fallback policy?",
        [
          "Return an empty array silently.",
          "Tell the caller it succeeded.",
          "Rethrow so the caller’s error path can run.",
        ],
        2,
        "Do not invent successful data to hide failure. Rethrow when the caller is responsible for recovery.",
      ),
    ],
    identify: [
      question(
        "failure-paths-identify-a",
        "Invalid JSON",
        "The server responds with HTTP 200 but invalid JSON. What happens here?",
        [
          "Catch runs because response.json() rejects.",
          "It always logs data because status is 200.",
          "JSON parsing errors cannot be handled.",
        ],
        0,
        "An HTTP success does not guarantee valid JSON. The awaited parsing rejection is caught by the surrounding try.",
        'try {\n  const response = await fetch("/api/preferences");\n  const data = await response.json();\n  console.log(data);\n} catch (error) {\n  console.log("Could not read preferences");\n}',
      ),
      question(
        "failure-paths-identify-b",
        "A rejection after try ends",
        "sendReceipt() returns a Promise that rejects later. Why does this catch not handle that rejection?",
        [
          "Promises can never be caught.",
          "The returned Promise is neither awaited nor connected to a catch handler.",
          "sendReceipt must return a string.",
        ],
        1,
        "The synchronous try finishes without observing the Promise's later failure. Await inside try or attach a rejection handler.",
        "try {\n  sendReceipt();\n} catch (error) {\n  showError(error);\n}",
      ),
      question(
        "failure-paths-identify-c",
        "A resolved HTTP failure",
        "Which statement is correct for an ordinary HTTP 503 Response from fetch?",
        [
          "fetch necessarily rejects.",
          "response.ok is true.",
          "fetch may fulfill while response.ok is false.",
        ],
        2,
        "A received HTTP error response normally fulfills fetch. Its status indicates failure at the HTTP/application level.",
      ),
    ],
  },
  {
    id: "scheduling",
    apply: [
      question(
        "scheduling-apply-a",
        "A location picker",
        "Two read-only helpers load countries and supported languages, with no dependencies or resource restrictions. How should you load both for a form?",
        [
          "Await countries before even calling languages.",
          "Call both and await Promise.all for their results.",
          "Put both synchronous calls in a busy loop.",
        ],
        1,
        "Both already have their inputs. Starting both allows the waits to overlap while Promise.all joins the results.",
      ),
      question(
        "scheduling-apply-b",
        "An attachment receipt",
        "createUpload() returns a token required by confirmUpload(token). Which schedule is correct?",
        [
          "Run both together with an undefined token.",
          "Call confirmUpload first.",
          "Await creation, then call confirmation using its token.",
        ],
        2,
        "Confirmation depends on a value that does not exist until creation completes. That dependency requires sequencing.",
      ),
      question(
        "scheduling-apply-c",
        "A mixed dependency graph",
        "A report needs exchange rates and an invoice. Tax details require the invoice ID but not exchange rates. What avoids unnecessary waiting?",
        [
          "Run an invoice-then-tax chain concurrently with the rates request.",
          "Always wait for rates before starting the invoice.",
          "Start tax details before obtaining the ID.",
        ],
        0,
        "Sequence only the dependent pair and overlap that chain with the independent request. This respects inputs without unnecessary waits.",
      ),
    ],
    identify: [
      question(
        "scheduling-identify-a",
        "Two independent waits",
        "A read takes 2 seconds and another takes 5 seconds. Both start together. Ignoring overhead, when can Promise.all fulfill?",
        [
          "After about 7 seconds.",
          "After about 5 seconds.",
          "After about 2 seconds.",
        ],
        1,
        "It needs both values, so total waiting is approximately the longer duration when independent waits overlap.",
      ),
      question(
        "scheduling-identify-b",
        "Fast result, stable order",
        "fast() finishes before slow(). What is the fulfilled result array order?",
        [
          "The fast value always comes first.",
          "A random order.",
          "[slowValue, fastValue], matching the input order.",
        ],
        2,
        "Promise.all preserves input order, not completion order.",
        "const results = await Promise.all([slow(), fast()]);",
      ),
      question(
        "scheduling-identify-c",
        "One task fails",
        "One Promise rejects while another request remains in progress. What does Promise.all do?",
        [
          "Rejects its result Promise without automatically cancelling the other request.",
          "Automatically cancels every request.",
          "Waits for all successes and ignores rejection.",
        ],
        0,
        "Group failure is not cancellation. Other operations may still finish or have side effects.",
      ),
    ],
  },
];
