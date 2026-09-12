import { useId, useState } from "react";
import type { ClassificationData } from "../../data/study-blocks";

export function Classification({ activity }: { activity: ClassificationData }) {
  const id = useId();
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [checked, setChecked] = useState(false);
  const complete = activity.items.every((_, index) => answers[index]);
  const correct = activity.items.filter(
    (item, index) => answers[index] === item.answer,
  ).length;

  return (
    <form
      className="classification"
      onSubmit={(event) => {
        event.preventDefault();
        if (complete) setChecked(true);
      }}
    >
      <fieldset>
        <legend>{activity.title}</legend>
        <p>{activity.instruction}</p>
        {activity.items.map((item, index) => (
          <div className="classification-row" key={item.text}>
            <label htmlFor={`${id}-${index}`}>{item.text}</label>
            <select
              id={`${id}-${index}`}
              value={answers[index] || ""}
              aria-describedby={checked ? `${id}-${index}-feedback` : undefined}
              onChange={(event) => {
                setAnswers({ ...answers, [index]: event.target.value });
                setChecked(false);
              }}
            >
              <option value="">Choose a category</option>
              {activity.categories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
            {checked && (
              <p
                id={`${id}-${index}-feedback`}
                className="classification-feedback"
              >
                <strong>
                  {answers[index] === item.answer
                    ? "Correct."
                    : `This belongs in ${item.answer}.`}
                </strong>{" "}
                {item.explanation}
              </p>
            )}
          </div>
        ))}
      </fieldset>
      <button className="button primary" disabled={!complete}>
        Check classifications
      </button>
      <p role="status">
        {checked
          ? `${correct} of ${activity.items.length} correct. Review the explanations above; change any choice to try again.`
          : ""}
      </p>
    </form>
  );
}
