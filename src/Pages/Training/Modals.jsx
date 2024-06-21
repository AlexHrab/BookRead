import { BookModal } from "../../Components/Modal/Modal";
import { Button } from "../../Components/Button/Button";
import { NewTraining } from "../../Redux/Auth/slice";
import { useDispatch } from "react-redux";
import css from "./Modals.module.css";

export function ModalTime({
  isOpen,
  onClose,
  setModalTimeIsOpen,
  setStopGoalsInterval,
}) {
  const dispatch = useDispatch();

  function newTraining() {
    dispatch(NewTraining());
    setModalTimeIsOpen(false);
    // setStopGoalsInterval(false);
  }

  return (
    <BookModal isOpen={isOpen} onClose={onClose}>
      <div className={css.BookModalTime}>
        <svg width="54px" height="54px" className={css.BookModalTimeSvg}>
          <use href="../../../public/symbol-defs.svg#icon-thumb_up-24px-1"></use>
        </svg>
        <p className={css.BookModalTimeText}>
          Well done! but you need to be a little bit faster. You can do it)
        </p>
        <div className={css.btnBox}>
          <Button
            type={"button"}
            onClick={newTraining}
            title={"New training"}
            className={"logOutWindowBtn"}
          />
          <Button
            type={"button"}
            onClick={() => setModalTimeIsOpen(false)}
            title={"Back"}
            className={"logOutWindowBtn"}
          />
        </div>
      </div>
    </BookModal>
  );
}

export function ModalGoal({
  isOpen,
  onClose,
  setModalGoalIsOpen,
  setStopGoalsInterval,
}) {
  const dispatch = useDispatch();

  function newTraining() {
    dispatch(NewTraining());
    setModalGoalIsOpen(false);
    // setStopGoalsInterval(false);
  }

  return (
    <BookModal isOpen={isOpen} onClose={onClose}>
      <div className={css.BookModalGoal}>
        <svg width="54px" height="54px" className={css.BookModalGoalSvg}>
          <use href="../../../public/symbol-defs.svg#icon-thumb_up-24px-1"></use>
        </svg>
        <p className={css.BookModalGoalText}>
          Well done, congratulations! Good job!
        </p>
        <Button
          type={"button"}
          onClick={newTraining}
          title={"New training"}
          className={"logOutWindowBtn"}
        />
      </div>
    </BookModal>
  );
}

export function ModalBookRead({ isOpen, onClose, setModalBookReadOpen }) {
  function Done() {
    setModalBookReadOpen(false);
  }

  return (
    <BookModal isOpen={isOpen} onClose={onClose}>
      <div className={css.BookModalRead}>
        <svg width="54px" height="54px" className={css.BookModalReadSvg}>
          <use href="../../../public/symbol-defs.svg#icon-thumb_up-24px-1"></use>
        </svg>
        <p className={css.BookModalReadText}>
          Congratulations! Another book read.
        </p>
        <Button
          type={"button"}
          onClick={Done}
          title={"Done"}
          className={"logOutWindowBtn"}
        />
      </div>
    </BookModal>
  );
}
