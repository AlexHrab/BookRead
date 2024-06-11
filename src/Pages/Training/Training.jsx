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
  selectSum,
  selectAccessToken,
  selectFinishedReading,
  selectOnlyRead,
} from "../../Redux/Auth/selectors";

import {
  userStartDate,
  userFinishDate,
  runDate,
  BooksPageSum,
  setBooksLeft,
} from "../../Redux/Auth/slice";
import { DataFunction, formatDate } from "./DataFunction";
import { Statistics } from "../../Components/Statistics/Statistics";
import {
  startTraining,
  sendPages,
  getPlaning,
  deleteBook,
  refresh,
  getAllBooks,
} from "../../Redux/Auth/operations";
import { Button } from "../../Components/Button/Button";
import { ModalTime, ModalGoal, ModalBookRead } from "./Modals";

export function Training() {
  const dispatch = useDispatch();
  const userRunDate = useSelector(selectRunDate);
  const defaultFinishDate = useSelector(selectUserFinishDate);
  const startDate = DataFunction(useSelector(selectUserStartDate));
  const finishDate = DataFunction(useSelector(selectUserFinishDate));
  const books = useSelector(selectTrainingBookList);
  const currentDate = Date.now();
  const currentlyReading = useSelector(selectCurrentlyReading);
  const isMobile = useMediaQuery({ maxWidth: 767 });
  // const isCurrentlyReading = currentlyReading.length !== 0 ? true : false;
  // const accessToken = useSelector(selectAccessToken);
  const finishBook = useSelector(selectFinishedReading);
  const pageSum = useSelector(selectSum);
  const onlyRead = useSelector(selectOnlyRead);
  console.log(finishBook);
  // console.log(finishDate.getTime());

  const [goalsCount, setGoalsCount] = useState({});
  const [yearCount, setYearCount] = useState({});
  const [showMenu, setShowMenu] = useState(false);
  const [stopGoalsInterval, setStopGoalsInterval] = useState(false);
  const [stopYearInterval, setStopYearInterval] = useState(false);
  const [modalTimeIsOpen, setModalTimeIsOpen] = useState(false);
  const [modalGoalIsOpen, setModalGoalIsOpen] = useState(false);
  const [modalBookReadOpen, setModalBookReadOpen] = useState(false);
  const [finishBookLenth, setFinishBookLenth] = useState(finishBook.length);
  const [finishBookLenthMemo] = useState(finishBook.length);

  function closeTime() {
    setModalTimeIsOpen(false);
  }

  function closeGoal() {
    setModalGoalIsOpen(false);
  }

  function closeBookRead() {
    setModalBookReadOpen(false);
  }

  function menuShow() {
    setShowMenu(true);
  }

  const booksId = [];

  for (const book of books) {
    booksId.push(book._id);
  }

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
      // console.log("hello");
      dispatch(
        startTraining({
          startDate: formatDate(startDate),
          endDate: formatDate(finishDate),
          books: booksId,
        })
      )
        .unwrap()
        .then((res) => dispatch(getAllBooks()))
        .catch((error) => alert(error.message), dispatch(getAllBooks()));
      dispatch(BooksPageSum());
      dispatch(setBooksLeft());
      // setShowMenu(false);
    } else {
      alert(
        "поля повинні бути заповнені і дата початку тренування не повинна бути в минулому"
      );
    }
  }

  function backClick() {
    setShowMenu(false);
  }

  useEffect(() => {
    if (
      finishBook.length === 0 ||
      finishBook.length === finishBookLenth ||
      onlyRead >= pageSum
    ) {
      return;
    } else {
      setModalBookReadOpen(true);
    }
    setFinishBookLenth(finishBook.length);
  }, [finishBook]);

  useEffect(() => {
    if (
      onlyRead < pageSum &&
      stopGoalsInterval &&
      userRunDate &&
      !modalGoalIsOpen
    ) {
      setModalTimeIsOpen(true);
    }
  }, [stopGoalsInterval, userRunDate, books, finishBook]);

  // console.log(finishBook.length + books.length - finishBook.length);
  // console.log(finishBook.length);
  // console.log(finishBookLenthMemo);
  // console.log(onlyRead);
  // console.log(modalGoalIsOpen);

  useEffect(() => {
    if (
      stopGoalsInterval &&
      stopYearInterval &&
      onlyRead >= pageSum &&
      // currentlyReading.length === 0 &&
      userRunDate
    ) {
      setModalGoalIsOpen(true);
      // setModalTimeIsOpen(false);
    }
  }, [stopGoalsInterval, stopYearInterval, books, finishBook, userRunDate]);

  useEffect(() => {
    if (startDate && finishDate && userRunDate) {
      const intervalGoalsId = setInterval(() => {
        if (stopGoalsInterval) {
          return;
        }

        const currentDate = Date.now();

        const futureDate = new Date(finishDate).getTime();
        const diff = futureDate - currentDate;

        if (Date.now() >= startDate.getTime()) {
          setGoalsCount(ConvertMs(diff));
        }
        if (diff < 1000 || !userRunDate) {
          setStopGoalsInterval(true);
        }
        if (onlyRead >= pageSum) {
          setStopGoalsInterval(true);
          // clearInterval(intervalGoalsId);
        }
      }, 1000);
      return () => clearInterval(intervalGoalsId);
    }
  }, [startDate, finishDate, userRunDate]);

  useEffect(() => {
    if (userRunDate) {
      const intervalYearId = setInterval(() => {
        if (stopYearInterval) {
          return;
        }

        const currentDate = Date.now();
        const nextYear = new Date().getFullYear() + 1;
        const lastDayOfYear = new Date(nextYear, 0, 0).getTime();
        const diff = lastDayOfYear - currentDate;
        setYearCount(ConvertMs(diff));

        if (diff < 1000 || !userRunDate) {
          setStopYearInterval(true);
          // clearInterval(intervalYearId);
        }
        if (onlyRead >= pageSum) {
          setStopYearInterval(true);
        }
      }, 1000);
      return () => clearInterval(intervalYearId);
    }
  }, [userRunDate, currentDate]);

  // console.log(userRunDate);

  useEffect(() => {
    if (userRunDate) {
      // dispatch(getPlaning());
      dispatch(BooksPageSum());
    }
  }, [dispatch, userRunDate]);

  // ====================================================================================================

  function statisticsSubmit(values, actions) {
    if (startDate.getTime() < Date.now()) {
      dispatch(sendPages({ pages: Number(values.pages) }))
        .unwrap()
        .then((res) => dispatch(getAllBooks()))
        .then((res) => dispatch(setBooksLeft()))
        .catch((error) => alert(error.message));
      // dispatch(setBooksLeft());
    } else {
      actions.resetForm();
    }

    actions.resetForm();
  }

  // console.log(books);

  // ================================================================================================

  return (
    <div className={css.Training}>
      {showMenu && (
        <svg
          className={css.iconBack}
          width="24"
          height="12"
          onClick={backClick}
        >
          <use href="../../../public/symbol-defs.svg#icon-back"></use>
        </svg>
      )}
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

            {((!isMobile && !userRunDate) || (showMenu && isMobile)) && (
              <Menu
                startDate={startDate}
                setStartDate={setStartDate}
                titleStart={"Start"}
                finishDate={finishDate}
                setFinishDate={setFinishDate}
                titleFinish={"Finish"}
                onClick={onClick}
              />
            )}
          </div>

          {(!showMenu || !isMobile) && (
            <TrainingList onClick={onClick} books={books} />
          )}
        </div>
      </div>

      {(!showMenu || !isMobile) && (
        <div className={css.statisticsAndSchedule}>
          <div className={css.Schedule}>
            {isMobile && !userRunDate && (
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
                // statisticsDate={statisticsDate}
                // setStatisticsDate={setStatisticsDate}
                submit={statisticsSubmit}
              />
            </div>
          )}
        </div>
      )}
      <ModalTime
        isOpen={modalTimeIsOpen}
        onClose={closeTime}
        setModalTimeIsOpen={setModalTimeIsOpen}
      />
      <ModalGoal
        isOpen={modalGoalIsOpen}
        onClose={closeGoal}
        setModalGoalIsOpen={setModalGoalIsOpen}
      />
      <ModalBookRead
        isOpen={modalBookReadOpen}
        onClose={closeBookRead}
        setModalBookReadOpen={setModalBookReadOpen}
      />
    </div>
  );
}
