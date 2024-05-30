// import { selectGoingToRead } from "../../Redux/Auth/selectors";
import { useSelector } from "react-redux";
import { Book } from "../Book/Book";
import css from "./GoingToRead.module.css";
import { useMediaQuery } from "react-responsive";
import { Button } from "../../Components/Button/Button";
import { selectLocation } from "../../Redux/Auth/selectors";
import clsx from "clsx";
import { DefaultElement } from "../DefaultElement/DefaultElement";

export function GoingToRead({ onClick, value, onClickDelete }) {
  const thisLocation = useSelector(selectLocation);
  const location = thisLocation === "/training" ? true : false;
  const isMobile = useMediaQuery({ maxWidth: 767 });
  // const GoingToRead = useSelector(selectGoingToRead);
  const element = DefaultElement();

  const trainingList = clsx(css.list, location && css.listforTraining);
  const trainingListAndButton = clsx(
    css.listAndButton,
    location && css.listAndButtonfotTraining
  );
  const trainingTitles = clsx(css.titles, location && css.titlesforTraining);
  const trainingYearAndTotal = clsx(
    css.yearAndTotal,
    location && css.yearAndTotalforTraining
  );
  const trainingAuthor = clsx(css.author, location && css.authorforTraining);

  return (
    <div>
      {!location && <h4 className={css.title}>Going to read</h4>}
      {!isMobile && (
        <div className={trainingTitles}>
          <p>Book title</p>

          <p className={trainingAuthor}>Author</p>
          <div className={trainingYearAndTotal}>
            <p>Year</p>
            <p>Pages</p>
          </div>
        </div>
      )}
      <div className={trainingListAndButton}>
        <ul className={trainingList}>
          {value.map((el) => (
            <Book key={el._id} book={el} onClickDelete={onClickDelete} />
          ))}
          {location && <li>{element}</li>}
        </ul>
        {isMobile && (
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
