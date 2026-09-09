import { useState } from "react";
import type { ExerciseBank } from "../../data/types";
import { selectExercises } from "../../lib/selectExercises";
import { Exercise } from "./Exercise";

export function Practice({ bank }: { bank: ExerciseBank }) {
  const [exercises] = useState(() => selectExercises(bank));
  return (
    <section id="practice" tabIndex={-1} className="practice-section">
      <p className="eyebrow">PUT IT INTO PRACTICE</p>
      <h2>Ten questions. One step at a time.</h2>
      <p>
        Five challenges to apply what you learned, and five to identify the
        principle. Each visit brings a mixed selection from 30 questions.
        Check the explanations and try again whenever you need to.
      </p>
      <div className="practice-questions">
        {exercises.map((exercise, index) => (
          <Exercise
            key={exercise.id}
            exercise={exercise}
            questionNumber={index + 1}
            questionCount={exercises.length}
          />
        ))}
      </div>
    </section>
  );
}
