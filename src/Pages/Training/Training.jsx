import css from "./Training.module.css";

import { CountDisplays } from "../../Components/CountDisplays/CountDisplays";
import { Goals } from "../../Components/Goals/Goals";
import { TrainingList } from "../../Components/TrainingList/TrainingList";
import { useState } from "react";
import { useEffect } from "react";
import { ConvertMs } from "../../Components/Convert/Convert";
import { Menu } from "./Menu";
import { useMediaQuery } from "react-responsive";

import { useDispatch, useSelector } from "react-redux";

import {
  selectTrainingBookList,
  selectRunDate,
  selectUserFinishDate,
  selectUserStartDate,
  selectSum,
  selectFinishedReading,
  selectOnlyRead,
  selectDurationPlan,
  selectGoalsInterval,
  selectYearInterval,
} from "../../Redux/Auth/selectors";

import {
  userStartDate,
  userFinishDate,
  runDate,
  BooksPageSum,
  setBooksLeft,
  GoalsInterval,
  YearInterval,
} from "../../Redux/Auth/slice";
import { DataFunction, formatDate } from "./DataFunction";
import { Statistics } from "../../Components/Statistics/Statistics";
import {
  startTraining,
  sendPages,
  getPlaning,
  getAllBooks,
} from "../../Redux/Auth/operations";
import { Button } from "../../Components/Button/Button";
import { ModalTime, ModalGoal, ModalBookRead } from "./Modals";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

import { Schedule } from "./Schedule";

export function Training() {
  const dispatch = useDispatch();
  const userRunDate = useSelector(selectRunDate);

  const startDate = DataFunction(useSelector(selectUserStartDate));
  const finishDate = DataFunction(useSelector(selectUserFinishDate));
  const books = useSelector(selectTrainingBookList);
  const currentDate = Date.now();

  const isMobile = useMediaQuery({ maxWidth: 767 });
  const stopGoalsInterval = useSelector(selectGoalsInterval);
  const stopYearInterval = useSelector(selectYearInterval);
  const finishBook = useSelector(selectFinishedReading);
  const pageSum = useSelector(selectSum);
  const onlyRead = useSelector(selectOnlyRead) || 0;
  const DurationPlan = useSelector(selectDurationPlan);

  const days = userRunDate
    ? Math.ceil((finishDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24))
    : 0;
  const currentlyPagesPerDay = onlyRead / (DurationPlan - days + 1);

  const [goalsCount, setGoalsCount] = useState({});
  const [yearCount, setYearCount] = useState({});
  const [showMenu, setShowMenu] = useState(false);

  const [modalTimeIsOpen, setModalTimeIsOpen] = useState(false);
  const [modalGoalIsOpen, setModalGoalIsOpen] = useState(false);
  const [modalBookReadOpen, setModalBookReadOpen] = useState(false);
  const [finishBookLenth, setFinishBookLenth] = useState(finishBook.length);

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
    const startDateValue = date ? date.toString() : "";
    dispatch(userStartDate(startDateValue));
  }

  function setFinishDate(date) {
    const finishDateValue = date ? date.toString() : "";
    dispatch(userFinishDate(finishDateValue));
  }

  function onClick() {
    if (startDate !== "" && finishDate !== "") {
      if (
        new Date(formatDate(startDate)).getTime() !==
        new Date(formatDate(finishDate)).getTime()
      ) {
        if (startDate.getTime() > Date.now()) {
          setGoalsCount({});
          setYearCount({});
          dispatch(runDate(true));

          dispatch(
            startTraining({
              startDate: formatDate(startDate),
              endDate: formatDate(finishDate),
              books: booksId,
            })
          )
            .unwrap()
            .then((res) => dispatch(getAllBooks()))
            .then((res) => dispatch(getPlaning()))
            .catch(
              (error) => toast.error(error.message),
              dispatch(getAllBooks())
            );

          dispatch(BooksPageSum());
          dispatch(setBooksLeft());
        } else {
          toast.info("Training start date should not be in the past!");
        }
      } else {
        toast.info(
          "The start time should not be equal to the end time of the training!"
        );
      }
    } else {
      toast.info("Select the start and end date!");
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

  useEffect(() => {
    if (
      stopGoalsInterval &&
      stopYearInterval &&
      onlyRead >= pageSum &&
      userRunDate
    ) {
      setModalGoalIsOpen(true);
    }
    setFinishBookLenth(finishBook.length);
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
          dispatch(GoalsInterval(true));
        }
        if (onlyRead >= pageSum) {
          dispatch(GoalsInterval(true));

          // setGoalsCount({});
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
          dispatch(YearInterval(true));
          // setYearCount({
          //   days: "000",
          //   hours: "00",
          //   minutes: "00",
          //   seconds: "00",
          // });
        }
        if (onlyRead >= pageSum) {
          dispatch(YearInterval(true));
          // setYearCount({});
        }
      }, 1000);
      return () => clearInterval(intervalYearId);
    }
  }, [userRunDate, currentDate]);

  useEffect(() => {
    if (userRunDate) {
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
        .catch((error) => toast.error(error.message));
    } else {
      toast.info("Training hasn't started yet!");
      actions.resetForm();
    }

    actions.resetForm();
  }

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
          <use href="/symbol-defs.svg#icon-back"></use>
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
            <p className={css.ScheduleTitle}>
              AMONT OF PAGES / DAY&nbsp;
              <span className={css.ScheduleTitleSpan}>
                {currentlyPagesPerDay || 0}
              </span>
            </p>
            <Schedule />
            {isMobile && !userRunDate && (
              <Button
                type={"button"}
                onClick={menuShow}
                className={"mobileForm"}
              >
                <svg className={css.iconBtn} width="16" height="16">
                  <use href="/symbol-defs.svg#icon-cross"></use>
                </svg>
              </Button>
            )}
          </div>

          {(userRunDate || !isMobile) && (
            <div className={css.statistics}>
              <Statistics submit={statisticsSubmit} />
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
