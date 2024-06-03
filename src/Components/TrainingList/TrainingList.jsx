import css from "./TrainingList.module.css";
import { Button } from "../Button/Button";
import { GoingToRead } from "../GoingToRead/GoingToRead";
import { selectTrainingBookList } from "../../Redux/Auth/selectors";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { trainingItemDelete } from "../../Redux/Auth/slice";
// import { selectRunDate } from "../../Redux/Other/selectors";
import { selectRunDate } from "../../Redux/Auth/selectors";

export function TrainingList({ onClick }) {
  const dispatch = useDispatch();
  const books = useSelector(selectTrainingBookList);
  const runDate = useSelector(selectRunDate);

  function onClickDelete(id) {
    dispatch(trainingItemDelete(id));
  }

  return (
    <div className={css.Box}>
      <GoingToRead value={books} onClickDelete={onClickDelete} />
      {books.length !== 0 && !runDate && (
        <div className={css.Button}>
          <Button
            onClick={onClick}
            type={"button"}
            title={"Start traning"}
            className={"startTraning"}
          />
        </div>
      )}
    </div>
  );
}
