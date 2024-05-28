import css from "./Training.module.css";
import { MyTraining } from "../../Components/MyTraining/MyTraining";
import { Calendar } from "../../Components/Calendar/Calendar";
import { CountDisplays } from "../../Components/CountDisplays/CountDisplays";
import { Goals } from "../../Components/Goals/Goals";
import { TrainingList } from "../../Components/TrainingList/TrainingList";
import { useState } from "react";
import { useEffect } from "react";
import { ConvertMs } from "../../Components/Convert/Convert";
import { runDate } from "../../Redux/Other/operations";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  selectRunDate,
  selectUserStartDate,
  selectUserFinishDate,
} from "../../Redux/Other/selectors";
import { userStartDate, userFinishDate } from "../../Redux/Other/operations";
import { SelectBook } from "../../Components/SelectBook/SelectBook";

export function Training() {
  const dispatch = useDispatch();
  const userRunDate = useSelector(selectRunDate);
  const startDate = useSelector(selectUserStartDate);
  const finishDate = useSelector(selectUserFinishDate);

  function setStartDate(date) {
    dispatch(userStartDate(date));
  }

  function setFinishDate(date) {
    dispatch(userFinishDate(date));
  }

  const [goalsCount, setGoalsCount] = useState({});
  const [yearCount, setYearCount] = useState({});
  const currentDate = Date.now();

  const days = userRunDate
    ? Math.floor(
        (finishDate?.getTime() - startDate?.getTime()) / (1000 * 60 * 60 * 24)
      )
    : "0";

  function onClick() {
    if (
      startDate !== undefined &&
      finishDate !== undefined &&
      startDate.getTime() > Date.now()
    ) {
      dispatch(runDate(true));
    } else {
      alert(
        "поля повинні бути заповнені і дата початку тренування не повинна бути в минулому"
      );
    }
  }

  useEffect(() => {
    if (startDate && finishDate && userRunDate) {
      const intervalId = setInterval(() => {
        const currentDate = Date.now();

        const futureDate = finishDate.getTime();
        const diff = futureDate - currentDate;
        if (Date.now() >= startDate.getTime()) {
          setGoalsCount(ConvertMs(diff));
        }
        if (diff < 1000) {
          clearInterval(intervalId);
        }
      }, 1000);
    }
  }, [startDate, finishDate, userRunDate]);

  useEffect(() => {
    if (userRunDate) {
      const intervalId = setInterval(() => {
        const currentDate = Date.now();
        const nextYear = new Date().getFullYear() + 1;
        const lastDayOfYear = new Date(nextYear, 0, 0).getTime();
        const diff = lastDayOfYear - currentDate;
        setYearCount(ConvertMs(diff));

        if (diff < 1000) {
          clearInterval(intervalId);
        }
      }, 1000);
    }
  }, [userRunDate]);

  return (
    <div className={css.Training}>
      <div className={css.countsAndGoals}>
        <div className={css.countsAndTrainingAndCalendars}>
          {userRunDate && (
            <div className={css.counts}>
              <CountDisplays title={"Years countdown"} value={yearCount} />
              <CountDisplays title={"Goals countdown"} value={goalsCount} />
            </div>
          )}
          {!userRunDate && (
            <div className={css.trainingAndCalendars}>
              <MyTraining />

              <div className={css.calendars}>
                <Calendar
                  title={"Start"}
                  date={startDate}
                  setDate={setStartDate}
                />
                <Calendar
                  title={"Finish"}
                  date={finishDate}
                  setDate={setFinishDate}
                />
              </div>
              <SelectBook />
            </div>
          )}
          <TrainingList onClick={onClick} />
        </div>
        <Goals days={days} />
      </div>
    </div>
  );
}
