import { useRef, useState } from "react";
import type { Exercise as ExerciseData } from "../../data/types";
import { CodeExample } from "../lesson/LessonBlocks";

export function Exercise({
  exercise,
  questionNumber,
  questionCount,
}: {
  exercise: ExerciseData;
  questionNumber: number;
  questionCount: number;
}) {
  const firstAnswer = useRef<HTMLInputElement>(null);
  const [selected, setSelected] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const answer = exercise.options.find((option) => option.id === selected);
  const correct = selected === exercise.correctOptionId;

  return (
    <div className="exercise-card">
      <p className="eyebrow">QUESTION {questionNumber} OF {questionCount}</p>
      <h3 className="exercise-title">{exercise.title}</h3>
      <p>{exercise.prompt}</p>
      {exercise.code && (
        <CodeExample
          code={exercise.code}
          accessibleLabel="Exercise code example"
        />
      )}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (selected) setSubmitted(true);
        }}
      >
        <fieldset>
          <legend>Choose the answer that best fits.</legend>
          <div className="exercise-options">
            {exercise.options.map((option, index) => (
              <label
                className={`exercise-option ${selected === option.id ? "chosen" : ""}`}
                key={option.id}
              >
                <input
                  ref={index === 0 ? firstAnswer : undefined}
                  type="radio"
                  name="answer"
                  value={option.id}
                  checked={selected === option.id}
                  onChange={() => {
                    setSelected(option.id);
                    setSubmitted(false);
                  }}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
        </fieldset>
        <button className="button primary" type="submit" disabled={!selected}>
          Check my answer <span aria-hidden="true">↗</span>
        </button>
      </form>
      <div aria-live="polite" aria-atomic="true">
        {submitted && answer && (
          <div className={`exercise-feedback ${correct ? "correct" : ""}`}>
            <strong>
              {correct
                ? "Exactly. You spotted it!"
                : "A useful thought — take another look."}
            </strong>
            <p>{answer.explanation}</p>
            <button
              className="text-link"
              onClick={() => {
                setSelected("");
                setSubmitted(false);
                firstAnswer.current?.focus();
              }}
            >
              Try again <span aria-hidden="true">↻</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
