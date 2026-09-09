import type { FiveExercises } from "../../data/types";
import { Exercise } from "./Exercise";

export function Practice({ exercises }: { exercises: FiveExercises }) {
  return (
    <section id="practice" tabIndex={-1} className="practice-section">
      <p className="eyebrow">PUT IT INTO PRACTICE</p>
      <h2>Five questions. One step at a time.</h2>
      <p>
        Try each question, check the explanation, and try again whenever you
        need to.
      </p>
      <div className="practice-questions">
        {exercises.map((exercise, index) => (
          <Exercise
            key={exercise.id}
            exercise={exercise}
            questionNumber={index + 1}
          />
        ))}
      </div>
    </section>
  );
}
