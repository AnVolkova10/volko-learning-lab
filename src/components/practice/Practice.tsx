import { useEffect, useRef, useState } from "react";
import type { ExerciseBank } from "../../data/types";
import { selectExercises } from "../../lib/selectExercises";
import { Exercise } from "./Exercise";

export function Practice({ bank }: { bank: ExerciseBank }) {
  const [exercises] = useState(() => selectExercises(bank));
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const page = useRef<HTMLDivElement>(null);
  const turn = useRef<Animation | null>(null);
  const [turning, setTurning] = useState(false);

  useEffect(() => () => turn.current?.cancel(), []);

  async function advance() {
    const sheet = page.current;
    if (!sheet || turn.current) return;
    sheet.focus({ preventScroll: true });
    sheet.scrollIntoView({ block: "start", behavior: "instant" });
    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTurning(true);
      // Turn the old sheet away before mounting the next question.
      turn.current = sheet.animate(
        [
          { transform: "perspective(1200px) rotateY(0deg)", opacity: 1 },
          {
            transform:
              "perspective(1200px) translateX(-12%) rotateY(-65deg) scale(.94)",
            opacity: 0,
          },
        ],
        { duration: 320, easing: "cubic-bezier(.55, .05, .8, .45)" },
      );
      await turn.current.finished.catch(() => {});
      turn.current = null;
      if (!sheet.isConnected) return;
      setTurning(false);
    }
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
        inert={turning}
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
