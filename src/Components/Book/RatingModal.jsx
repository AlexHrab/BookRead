import { BookModal } from "../Modal/Modal";
import css from "./RatingModal.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { bookReview } from "../../Redux/Auth/operations";

import { Button } from "../../Components/Button/Button";

export function RatingModal({ isOpen, onClose, id }) {
  //   console.log(id);

  const dispatch = useDispatch();

  const [Rating, setRating] = useState(0);

  const handleQualityChange = (event) => {
    const rating = parseInt(event.target.value); // Перетворення значення чекбокса у числовий тип даних
    if (rating === Rating) {
      // Якщо значення чекбокса співпадає з поточним рейтингом, зніміть галочку
      setRating(Rating - 1);
    } else {
      setRating(rating);
    }
  };

  const checkboxes = [];
  for (let i = 1; i <= 5; i++) {
    checkboxes.push(
      <label className={css.checkboxContainer} key={i}>
        <input
          className={css.checkbox}
          key={i}
          type="checkbox"
          value={i}
          checked={i <= Rating}
          onChange={handleQualityChange}
        />
        <svg width="20" height="20" className={css.customCheckbox}>
          <use href="../../../public/symbol-defs.svg#icon-Star-6"></use>
        </svg>
        {/* <span className={css.customCheckbox}></span> */}
      </label>
    );
  }

  console.log(checkboxes);

  function Submit(evt) {
    evt.preventDefault();
    const form = evt.target;

    const value = form.elements.text.value;
    if (form.elements.text.value.trim() === "" && Rating === 0) {
      alert("Please enter search term!");
      return;
    }
    dispatch(bookReview({ id: id, rating: Rating, feedback: value }));
    form.reset();
  }

  return (
    <BookModal isOpen={isOpen} onClose={onClose}>
      <form onSubmit={Submit}>
        <p className={css.text}>Choose rating of the book</p>
        <ul className={css.list}>
          {checkboxes.map((el) => (
            <li key={el.key}>{el}</li>
          ))}
        </ul>
        <label htmlFor="text" className={css.label}>
          Resume
          <textarea
            id="text"
            name="text"
            type="text"
            autoComplete="off"
            placeholder="..."
            className={css.textarea}
          />
        </label>
        <div className={css.btnBox}>
          <Button
            type={"button"}
            title={"Back"}
            className={"logOutWindowBtn"}
          />
          <Button
            type={"submit"}
            title={"Save"}
            className={"logOutWindowBtn"}
          />
        </div>
      </form>
    </BookModal>
  );
}
