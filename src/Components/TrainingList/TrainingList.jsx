import css from "./TrainingList.module.css";
import { Button } from "../Button/Button";
import { GoingToRead } from "../GoingToRead/GoingToRead";
import { selectTrainingBookList } from "../../Redux/Auth/selectors";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { trainingItemDelete } from "../../Redux/Auth/slice";

import {
  selectRunDate,
  selectFinishedReading,
} from "../../Redux/Auth/selectors";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import { useEffect } from "react";

export function TrainingList({ onClick, books }) {
  const dispatch = useDispatch();

  const runDate = useSelector(selectRunDate);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const finishedReading = useSelector(selectFinishedReading);

  function onClickDelete(id) {
    dispatch(trainingItemDelete(id));
  }

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
