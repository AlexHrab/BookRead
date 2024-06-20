import { useSelector } from "react-redux";
import { Book } from "../Book/Book";
import css from "./GoingToRead.module.css";
import { useMediaQuery } from "react-responsive";
import { Button } from "../../Components/Button/Button";
import { selectLocation } from "../../Redux/Auth/selectors";
import clsx from "clsx";
import { DefaultElement } from "../DefaultElement/DefaultElement";
import { selectTrainingBookList } from "../../Redux/Auth/selectors";

export function GoingToRead({
  onClick,
  value,
  onClickDelete,
  title,
  onClickRating,
}) {
  const thisLocation = useSelector(selectLocation);
  const location = thisLocation === "/training" ? true : false;
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const element = DefaultElement();
  const trainingBookList = useSelector(selectTrainingBookList);

  const trainingList = clsx(css.list, location && css.listforTraining);
  const trainingListAndButton = clsx(
    css.listAndButton,
    location && css.listAndButtonfotTraining
  );
  const trainingTitles = clsx(
    css.titles,
    location && css.titlesforTraining,
    title === "Already read" && css.titlesAlreadyRead
  );
  const trainingYearAndTotal = clsx(
    css.yearAndTotal,
    location && css.yearAndTotalforTraining,
    title === "Already read" && css.yearAndTotalAlreadyRead
  );
  const trainingAuthor = clsx(
    css.author,
    location && css.authorforTraining,
    title === "Already read" && css.authorAlreadyRead
  );

  return (
    <div>
      {!location && <h4 className={css.title}>{title}</h4>}
      {!isMobile && (
        <div className={trainingTitles}>
          <p>Book title</p>

          <p className={trainingAuthor}>Author</p>
          <div className={trainingYearAndTotal}>
            <p>Year</p>
            <p>Pages</p>
          </div>
          {title === "Already read" && <p className={css.rating}>Rating</p>}
        </div>
      )}
      <div className={trainingListAndButton}>
        <ul className={trainingList}>
          {value.map((el) => (
            <Book
              key={el._id}
              book={el}
              onClickDelete={onClickDelete}
              title={title}
              onClickRating={onClickRating}
            />
          ))}
          {location && (!trainingBookList.length || !isMobile) && (
            <li>{element}</li>
          )}
        </ul>
        {isMobile && !location && title === "Going to read" && (
          <Button type={"button"} onClick={onClick} className={"mobileForm"}>
            <svg className={css.icon} width="16" height="16">
              <use href="../../../public/symbol-defs.svg#icon-cross"></use>
            </svg>
          </Button>
        )}
      </div>
    </div>
  );
}
