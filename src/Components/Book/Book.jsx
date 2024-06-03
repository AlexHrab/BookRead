import css from "./Book.module.css";
import { useMediaQuery } from "react-responsive";
import { selectLocation } from "../../Redux/Auth/selectors";
import { useSelector } from "react-redux";
import clsx from "clsx";
import LinesEllipsis from "react-lines-ellipsis";
import { selectRunDate } from "../../Redux/Auth/selectors";
import { useState } from "react";

export function Book({ book, onClickDelete }) {
  const thisLocation = useSelector(selectLocation);
  const RunDate = useSelector(selectRunDate);
  const location = thisLocation === "/training" ? true : false;
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const isDesktop = useMediaQuery({ minWidth: 1150 });
  const [isChecked, setIsChecked] = useState(true);

  const trainingItem = clsx(css.item, location && css.itemForTraining);
  const trainingtitleAndSvg = clsx(
    css.titleAndSvg,
    location && css.trainingtitleAndSvg
  );
  const trainingTitle = clsx(css.title, location && css.titleForTraining);
  const trainingAuthor = clsx(css.author, location && css.authorForTraining);
  const trainingYearAndTotal = clsx(
    css.yearAndTotal,
    location && css.yearAndTotalForTraining
  );
  const trainingYearAndTotalAndAuthor = clsx(
    css.yearAndTotalAndAuthor,
    location && css.yearAndTotalAndAuthorForTraining
  );

  // const trainingTitle = clsx(css.title, location && css.titleForTraining);

  function truncateText(text, maxLength) {
    if (text?.length <= maxLength) {
      return text;
    } else {
      const lastSpaceIndex = text.lastIndexOf(" ", maxLength - 3);
      return text.substring(0, lastSpaceIndex) + "...";
    }
  }

  const truncatedTitle = truncateText(book.title, 45);

  return (
    <li className={trainingItem}>
      <div className={trainingtitleAndSvg}>
        {!location || !RunDate ? (
          <svg className={css.icon} width="22" height="17">
            <use href="../../../public/symbol-defs.svg#icon-Flat"></use>
          </svg>
        ) : (
          <input
            className={css.checkbox}
            type="checkbox"
            checked={isChecked}
            onChange={() => setIsChecked(!isChecked)}
          />
        )}
        {!location ? (
          <p className={trainingTitle}>{book.title}</p>
        ) : (
          <LinesEllipsis
            className={css.LinesEllipsis}
            text={truncatedTitle}
            ellipsis="..."
            basedOn="words"
            maxLine="1"
          />
        )}
      </div>
      <div className={trainingYearAndTotalAndAuthor}>
        {isMobile && <span className={css.span}>Author:</span>}
        <p className={trainingAuthor}>{book.author}</p>

        <div className={trainingYearAndTotal}>
          {isMobile && <span className={css.span}>Year:</span>}
          <p className={css.publishYear}>{book.publishYear}</p>

          <div className={css.pagesTotalBox}>
            {isMobile && <span className={css.span}>Pages:</span>}
            <p className={css.pagesTotal}>{book.pagesTotal}</p>
          </div>
        </div>
        {(location || !isDesktop) && !RunDate && (
          <svg
            className={css.iconDelete}
            width="14"
            height="18"
            onClick={() => onClickDelete(book._id)}
          >
            <use href="../../../public/symbol-defs.svg#icon-delete"></use>
          </svg>
        )}
      </div>
    </li>
  );
}
