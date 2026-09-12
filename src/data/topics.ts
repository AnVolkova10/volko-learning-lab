import type { Topic } from "./types.ts";
import { solid } from "./topics/solid/solid.ts";
import { agentDelegation } from "./topics/agent-delegation/agent-delegation.ts";

// Add a topic import here. The first entry is featured in the library.
export const topics: Topic[] = [agentDelegation, solid];
