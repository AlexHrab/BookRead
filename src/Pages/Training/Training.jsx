import css from "./Training.module.css";
import { MyTraining } from "../../Components/MyTraining/MyTraining";
import { Calendar } from "../../Components/Calendar/Calendar";
import { CountDisplays } from "../../Components/CountDisplays/CountDisplays";
import { Goals } from "../../Components/Goals/Goals";
import { TrainingList } from "../../Components/TrainingList/TrainingList";
import { useState } from "react";
import { useEffect } from "react";
import { ConvertMs } from "../../Components/Convert/Convert";
import { Menu } from "./Menu";
import { useMediaQuery } from "react-responsive";
// import { runDate } from "../../Redux/Auth/slice";
// import { selectRunDate } from "../../Redux/Auth/selectors";
import { useDispatch, useSelector } from "react-redux";
// import { useSelector } from "react-redux";

import { SelectBook } from "../../Components/SelectBook/SelectBook";
import {
  selectTrainingBookList,
  selectRunDate,
  selectUserFinishDate,
  selectUserStartDate,
  selectCurrentlyReading,
} from "../../Redux/Auth/selectors";

// import {
//   selectUserFinishDate,
//   selectUserStartDate,
// } from "../../Redux/Auth/selectors";
import { userStartDate, userFinishDate, runDate } from "../../Redux/Auth/slice";
import { DataFunction, formatDate } from "./DataFunction";
import { Statistics } from "../../Components/Statistics/Statistics";
import {
  startTraining,
  sendPages,
  getPlaning,
  deleteBook,
} from "../../Redux/Auth/operations";
import { Button } from "../../Components/Button/Button";

export function Training() {
  const dispatch = useDispatch();
  const userRunDate = useSelector(selectRunDate);
  const startDate = DataFunction(useSelector(selectUserStartDate));
  const finishDate = DataFunction(useSelector(selectUserFinishDate));
  const books = useSelector(selectTrainingBookList);
  const currentDate = Date.now();
  const currentlyReading = useSelector(selectCurrentlyReading);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isCurrentlyReading = currentlyReading.length !== 0 ? true : false;
  // console.log(isCurrentlyReading);

  const [goalsCount, setGoalsCount] = useState({});
  const [yearCount, setYearCount] = useState({});
  const [showMenu, setShowMenu] = useState(false);

  function menuShow() {
    setShowMenu(true);
  }

  console.log(showMenu);

  // console.log(formatDate(startDate));
  const booksId = [];

  for (const book of books) {
    booksId.push(book._id);
  }

  // const booksPages = books.map((book) => book.pagesTotal);
  // console.log(booksPages);
  // console.log(0 - 1);

  function setStartDate(date) {
    const startDateValue = date ? date.toString() : ""; // Перевіряємо, чи дата не порожня
    dispatch(userStartDate(startDateValue));
  }

  function setFinishDate(date) {
    const finishDateValue = date ? date.toString() : ""; // Перевіряємо, чи дата не порожня
    dispatch(userFinishDate(finishDateValue));
  }

  const days = userRunDate
    ? Math.floor(
        (new Date(finishDate).getTime() - startDate.getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : "0";

  function onClick() {
    if (
      startDate !== undefined &&
      finishDate !== undefined &&
      startDate.getTime() > Date.now()
    ) {
      dispatch(runDate(true));
      // dispatch(
      //   startTraining({
      //     startDate: formatDate(startDate),
      //     endDate: formatDate(finishDate),
      //     books: booksId,
      //   })
      // );
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

        const futureDate = new Date(finishDate).getTime();
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

  // useEffect(() => {
  //   dispatch(getPlaning());
  // }, [dispatch]);

  // ====================================================================================================

  const [statisticsDate, setStatisticsDate] = useState();

  function statisticsSubmit(values, actions) {
    dispatch(sendPages({ pages: values.pages }));
    // dispatch(deleteBook());
    actions.resetForm();
  }

  // ================================================================================================

  return (
    <div className={css.Training}>
      <div className={css.countsAndGoals}>
        <div className={css.listAndAll}>
          <div className={css.goalsAndTrainingList}>
            {(!showMenu || !isMobile) && <Goals days={days} />}
            {userRunDate && (
              <div className={css.counts}>
                <CountDisplays title={"Years countdown"} value={yearCount} />
                <CountDisplays title={"Goals countdown"} value={goalsCount} />
              </div>
            )}

            {(!isMobile || showMenu) && (
              <Menu
                startDate={startDate}
                setStartDate={setStartDate}
                titleStart={"Start"}
                finishDate={finishDate}
                setFinishDate={setFinishDate}
                titleFinish={"Finish"}
              />
            )}
          </div>

          {(!showMenu || !isMobile) && <TrainingList onClick={onClick} />}
        </div>
      </div>

      {(!showMenu || !isMobile) && (
        <div className={css.statisticsAndSchedule}>
          <div className={css.Schedule}>
            {isMobile && (
              <Button
                type={"button"}
                onClick={menuShow}
                className={"mobileForm"}
              >
                <svg className={css.iconBtn} width="16" height="16">
                  <use href="../../../public/symbol-defs.svg#icon-cross"></use>
                </svg>
              </Button>
            )}
          </div>

          {(userRunDate || !isMobile) && (
            <div className={css.statistics}>
              <Statistics
                statisticsDate={statisticsDate}
                setStatisticsDate={setStatisticsDate}
                submit={statisticsSubmit}
              />
            </div>
          )}
        </div>
      )}
    </div>
  );
}
