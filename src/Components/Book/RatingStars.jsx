import css from "./RatingModal.module.css";
import { useState } from "react";

export function RatingStars({ bookRating }) {
  const [rating, setRating] = useState(bookRating);

  const checkboxes = [];
  for (let i = 1; i <= 5; i++) {
    checkboxes.push(
      <label className={css.checkboxContainerRatingStars} key={i}>
        <input
          className={css.checkbox}
          key={i}
          type="checkbox"
          value={i}
          checked={i <= bookRating}
          onChange={setRating}
        />
        <svg width="20" height="20" className={css.customCheckboxRatingStars}>
          <use href="/symbol-defs.svg#icon-Star-6"></use>
        </svg>
      </label>
    );
  }
  return (
    <ul className={css.listRatingStars}>
      {checkboxes.map((el) => (
        <li key={el.key}>{el}</li>
      ))}
    </ul>
  );
}
