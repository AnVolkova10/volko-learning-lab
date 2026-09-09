import type { ExerciseBank } from "../data/types.ts";

// Pick one alternative per concept and kind, then shuffle without changing the bank.
// Injecting random makes the selection rules testable without flaky probability tests.
export function selectExercises(bank: ExerciseBank, random = Math.random) {
  const questions = bank.flatMap((concept) =>
    [concept.apply, concept.identify].map(
      (variants) => variants[Math.floor(random() * variants.length)],
    ),
  );
  for (let index = questions.length - 1; index > 0; index--) {
    const other = Math.floor(random() * (index + 1));
    [questions[index], questions[other]] = [questions[other], questions[index]];
  }
  return questions;
}
