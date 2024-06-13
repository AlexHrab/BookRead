import { BookModal } from "../Modal/Modal";
import css from "./RatingModal.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { bookReview, getAllBooks } from "../../Redux/Auth/operations";
import { selectFinishedReading } from "../../Redux/Auth/selectors";
import { useSelector } from "react-redux";
import { Button } from "../../Components/Button/Button";
import { useEffect } from "react";

export function RatingModal({ isOpen, onClose, ratingValue }) {
  // console.log(ratingValue.rating);

  const dispatch = useDispatch();
  const finishBook = useSelector(selectFinishedReading);

  const [Rating, setRating] = useState(ratingValue.rating);
  const [RatingResume, setRatingResume] = useState("");
  console.log(ratingValue.resume);
  console.log(RatingResume);

  useEffect(() => {
    setRatingResume(ratingValue.resume || "");
  }, [ratingValue.resume]);

  useEffect(() => {
    setRating(ratingValue.rating);
  }, [ratingValue.rating]);

  const handleRatingChange = (event) => {
    const rating = event.target.value;
    if (rating === Rating) {
      setRating(Rating - 1);
    } else {
      setRating(rating);
    }
  };

  const handleResumeChange = (event) => {
    setRatingResume(event.target.value);
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
          onChange={handleRatingChange}
        />
        <svg width="20" height="20" className={css.customCheckbox}>
          <use href="../../../public/symbol-defs.svg#icon-Star-6"></use>
        </svg>
      </label>
    );
  }

  function Submit(evt) {
    evt.preventDefault();
    const form = evt.target;

    const value = form.elements.text.value;
    if (form.elements.text.value.trim() === "" && Rating === 0) {
      alert("Please enter search term!");
      return;
    }
    dispatch(
      bookReview({ id: ratingValue.id, rating: Rating, feedback: value })
    )
      .unwrap()
      .then((res) => dispatch(getAllBooks()))

      .catch((error) => alert(error.message));
    form.reset();
    onClose();
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
            value={RatingResume}
            onChange={handleResumeChange}
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
            onClick={onClose}
            title={"Back"}
            className={"RatingModalBtn"}
          />
          <Button type={"submit"} title={"Save"} className={"RatingModalBtn"} />
        </div>
      </form>
    </BookModal>
  );
}
