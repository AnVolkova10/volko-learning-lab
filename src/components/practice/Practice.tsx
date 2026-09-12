import { useEffect, useRef, useState } from "react";
import type { ExerciseBank } from "../../data/types";
import { selectExercises } from "../../lib/selectExercises";
import { flushSync } from "react-dom";
import { Exercise, type ExerciseAnswer } from "./Exercise";

export function Practice({
  bank,
  introduction,
}: {
  bank: ExerciseBank;
  introduction?: string;
}) {
  const [exercises] = useState(() => selectExercises(bank));
  const [index, setIndex] = useState(0);
  const [finished, setFinished] = useState(false);
  const [answers, setAnswers] = useState<Record<string, ExerciseAnswer>>({});
  const page = useRef<HTMLDivElement>(null);
  const turn = useRef<Animation | null>(null);
  const [turning, setTurning] = useState(false);

  useEffect(() => () => turn.current?.cancel(), []);

  async function navigate(target: number) {
    const card = page.current;
    if (!card || turn.current || turning) return;
    const direction = target < index || finished ? -1 : 1;
    card.focus({ preventScroll: true });
    card.scrollIntoView({ block: "start", behavior: "instant" });
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const showTarget = () => {
      setFinished(target === exercises.length);
      setIndex(Math.min(target, exercises.length - 1));
    };
    if (reduced) {
      showTarget();
      return;
    }
    setTurning(true);
    try {
      // Swap content edge-on, then reveal the reverse face of the card.
      turn.current = card.animate(
        [
          { transform: "rotateY(0deg)" },
          { transform: `rotateY(${direction * -90}deg)` },
        ],
        {
          duration: 260,
          easing: "cubic-bezier(.55, 0, 1, .45)",
          fill: "forwards",
        },
      );
      await turn.current.finished;
      if (!card.isConnected) return;
      flushSync(showTarget);
      turn.current.cancel();
      turn.current = card.animate(
        [
          { transform: `rotateY(${direction * 90}deg)` },
          { transform: "rotateY(0deg)" },
        ],
        {
          duration: 340,
          easing: "cubic-bezier(0, .55, .45, 1)",
          fill: "forwards",
        },
      );
      await turn.current.finished;
    } catch {
      // Unmounting cancels the animation when leaving the topic.
    } finally {
      turn.current?.cancel();
      turn.current = null;
      if (card.isConnected) {
        setTurning(false);
        card.focus({ preventScroll: true });
      }
    }
  }
  return (
    <section id="practice" tabIndex={-1} className="practice-section">
      <p className="eyebrow">PUT IT INTO PRACTICE</p>
      <h2>Ten questions. One step at a time.</h2>
      <p>
        {introduction ||
          "Five challenges to apply what you learned, and five to identify the principle. Each visit brings a mixed selection from 30 questions. Check the explanations and try again whenever you need to."}
      </p>
      <div className="practice-progress" aria-label="Practice progress">
        <span role="status">
          {finished
            ? "Practice complete"
            : `Question ${index + 1} of ${exercises.length}`}
        </span>
        <progress
          value={
            Object.values(answers).filter((answer) => answer.submitted).length
          }
          max={exercises.length}
          aria-label="Questions completed"
        />
      </div>
      <div className="practice-stage">
        <div
          className="practice-pages"
          ref={page}
          tabIndex={-1}
          aria-label="Current practice question"
          aria-busy={turning}
        >
          <div inert={turning}>
            {finished ? (
              <div className="practice-complete">
                <p className="eyebrow">PRACTICE COMPLETE</p>
                <h3>Ten questions explored.</h3>
                <p>
                  Take a moment to explain one idea in your own words. Your
                  recap is just below.
                </p>
                <button className="button primary" onClick={() => navigate(0)}>
                  Review these questions
                </button>
              </div>
            ) : (
              <Exercise
                key={exercises[index].id}
                exercise={exercises[index]}
                questionNumber={index + 1}
                questionCount={exercises.length}
                state={
                  answers[exercises[index].id] || {
                    selected: "",
                    submitted: false,
                  }
                }
                onAnswerChange={(answer) =>
                  setAnswers((current) => ({
                    ...current,
                    [exercises[index].id]: answer,
                  }))
                }
                onNext={() => navigate(index + 1)}
              />
            )}
          </div>
        </div>
      </div>
      <div className="practice-navigation">
        <button
          className="text-link"
          disabled={turning || (!finished && index === 0)}
          onClick={() => navigate(finished ? exercises.length - 1 : index - 1)}
        >
          <span aria-hidden="true">{"\u2190"}</span> Previous question
        </button>
      </div>
    </section>
  );
}
