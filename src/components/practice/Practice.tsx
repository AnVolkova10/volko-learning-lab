import { useRef, useState } from "react";
import type { ExerciseBank } from "../../data/types";
import { selectExercises } from "../../lib/selectExercises";
import { Exercise } from "./Exercise";

export function Practice({ bank }: { bank: ExerciseBank }) {
  const [exercises] = useState(() => selectExercises(bank));
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const page = useRef<HTMLDivElement>(null);

  function advance() {
    if (index === exercises.length - 1) setFinished(true);
    else setIndex((current) => current + 1);
    // Keep the new sheet in view, including when the previous answer was long.
    page.current?.focus({ preventScroll: true });
    page.current?.scrollIntoView({ block: "start", behavior: "instant" });
  }
  return (
    <section id="practice" tabIndex={-1} className="practice-section">
      <p className="eyebrow">PUT IT INTO PRACTICE</p>
      <h2>Ten questions. One step at a time.</h2>
      <p>
        Five challenges to apply what you learned, and five to identify the
        principle. Each visit brings a mixed selection from 30 questions. Check
        the explanations and try again whenever you need to.
      </p>
      <div className="practice-progress" aria-label="Practice progress">
        <span role="status">
          {finished
            ? "Practice complete"
            : `Question ${index + 1} of ${exercises.length}`}
        </span>
        <progress
          value={finished ? exercises.length : index}
          max={exercises.length}
          aria-label="Questions completed"
        />
      </div>
      <div
        className="practice-pages"
        ref={page}
        tabIndex={-1}
        aria-label="Current practice question"
      >
        {finished ? (
          <div className="practice-complete">
            <p className="eyebrow">ONE MORE PAGE LEARNED</p>
            <h3>Ten questions explored.</h3>
            <p>
              Take a moment to explain one principle in your own words. Your
              recap is just below.
            </p>
            <button
              className="button primary"
              onClick={() => {
                setIndex(0);
                setFinished(false);
              }}
            >
              Review these questions
            </button>
          </div>
        ) : (
          <Exercise
            key={exercises[index].id}
            exercise={exercises[index]}
            questionNumber={index + 1}
            questionCount={exercises.length}
            onNext={advance}
          />
        )}
      </div>
    </section>
  );
}
