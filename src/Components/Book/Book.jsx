import css from "./Book.module.css";
import { useMediaQuery } from "react-responsive";
import {
  selectLocation,
  selectFinishedReading,
} from "../../Redux/Auth/selectors";
import { useSelector } from "react-redux";
import clsx from "clsx";
import LinesEllipsis from "react-lines-ellipsis";
import { selectRunDate } from "../../Redux/Auth/selectors";
import { useState } from "react";
import { useEffect } from "react";
import { Button } from "../Button/Button";
import { RatingModal } from "./RatingModal";

export function Book({ book, onClickDelete, title, onClickRating }) {
  const thisLocation = useSelector(selectLocation);
  const RunDate = useSelector(selectRunDate);
  const location = thisLocation === "/training" ? true : false;
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isDesktop = useMediaQuery({ minWidth: 1150 });
  const finishBook = useSelector(selectFinishedReading);
  const [isChecked, setIsChecked] = useState(book.isChecked);

  // useEffect(() => {
  //   setIsChecked(book.isChecked);
  // }, [finishBook]);

  const trainingItem = clsx(css.item, location && css.itemForTraining);
  const trainingtitleAndSvg = clsx(
    css.titleAndSvg,
    location && css.trainingtitleAndSvg
  );
  const trainingTitle = clsx(css.title, location && css.titleForTraining);
  const trainingAuthor = clsx(
    css.author,
    location && css.authorForTraining,
    title === "Already read" && css.authorAlreadyRead
  );
  const trainingYearAndTotal = clsx(
    css.yearAndTotal,
    location && css.yearAndTotalForTraining,
    title === "Already read" && css.yearAndTotalAlreadyRead
  );
  const trainingYearAndTotalAndAuthor = clsx(
    css.yearAndTotalAndAuthor,
    location && css.yearAndTotalAndAuthorForTraining,
    title === "Already read" && css.yearAndTotalAndAuthorAlreadyRead
  );

  const itemTitles = clsx(css.span, location && css.spanForTraining);

  const bookSvg = clsx(css.icon, title === "Reading now" && css.iconReadingNow);

  function truncateText(text, maxLength) {
    if (text?.length <= maxLength) {
      return text;
    } else {
      const lastSpaceIndex = text.lastIndexOf(" ", maxLength - 3);
      return text.substring(0, lastSpaceIndex) + "...";
    }
  }

  const truncatedTitle = truncateText(book.title, 45);
  const truncatedTitleRead = truncateText(book.title, 25);

  return (
    <>
      <li className={trainingItem}>
        <div className={trainingtitleAndSvg}>
          {!location || !RunDate ? (
            <svg className={bookSvg} width="22" height="17">
              <use href="../../../public/symbol-defs.svg#icon-Flat"></use>
            </svg>
          ) : (
            <label className={css.checkboxContainer}>
              <input
                className={css.checkbox}
                type="checkbox"
                checked={book.isChecked}
                onChange={() => setIsChecked(book.isChecked)}
              />
              <span className={css.customCheckbox}></span>
            </label>
          )}
          {(!location || (location && isMobile)) && title !== "Already read" ? (
            <p className={trainingTitle}>{book.title}</p>
          ) : title !== "Already read" ? (
            <LinesEllipsis
              className={css.LinesEllipsis}
              text={truncatedTitle}
              ellipsis="..."
              basedOn="words"
              maxLine="1"
            />
          ) : (
            <LinesEllipsis
              className={css.LinesEllipsisAlreadyRead}
              text={truncatedTitleRead}
              ellipsis="..."
              basedOn="words"
              maxLine="1"
            />
          )}
          {/* {title === "Already read" && (
          <LinesEllipsis
            className={css.LinesEllipsis}
            text={truncatedTitleRead}
            ellipsis="..."
            basedOn="words"
            maxLine="1"
          />
        )} */}
        </div>
        <div className={trainingYearAndTotalAndAuthor}>
          {isMobile && <span className={itemTitles}>Author:</span>}
          <p className={trainingAuthor}>{book.author}</p>

          <div className={trainingYearAndTotal}>
            {isMobile && <span className={itemTitles}>Year:</span>}
            <p className={css.publishYear}>{book.publishYear}</p>

            <div className={css.pagesTotalBox}>
              {isMobile && <span className={itemTitles}>Pages:</span>}
              <p className={css.pagesTotal}>{book.pagesTotal}</p>
            </div>
          </div>
          {location && !RunDate && (
            <svg
              className={css.iconDelete}
              width="14"
              height="18"
              onClick={() => onClickDelete(book._id)}
            >
              <use href="../../../public/symbol-defs.svg#icon-delete"></use>
            </svg>
          )}
          {title === "Already read" && (
            <Button
              type={"button"}
              onClick={() => onClickRating(book._id)}
              title={"Resume"}
              className={"ResumeButton"}
            />
          )}
        </div>
      </li>
    </>
  );
}
