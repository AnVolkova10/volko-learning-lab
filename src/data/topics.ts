import type { Topic } from "./types.ts";
import { solid } from "./topics/solid/solid.ts";
import { agentDelegation } from "./topics/agent-delegation/agent-delegation.ts";
import { asyncJavascript } from "./topics/async-javascript/async-javascript.ts";

// Add a topic import here. The first entry is featured in the library.
export const topics: Topic[] = [asyncJavascript, agentDelegation, solid];
