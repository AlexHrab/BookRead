import css from "./Book.module.css";
import { useMediaQuery } from "react-responsive";
import { selectLocation } from "../../Redux/Auth/selectors";
import { useSelector } from "react-redux";
import clsx from "clsx";

export function Book({ book }) {
  const thisLocation = useSelector(selectLocation);
  const location = thisLocation === "/training" ? true : false;
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const list = clsx(css.item, location && css.itemGoingToRead);

  return (
    <li className={list}>
      <div className={css.titleAndSvg}>
        <svg className={css.icon} width="22" height="17">
          <use href="../../../public/symbol-defs.svg#icon-Flat"></use>
        </svg>
        <p className={css.title}>{book.title}</p>
      </div>
      <div className={css.yearAndTotalAndAuthor}>
        {isMobile && <span className={css.span}>Author:</span>}
        <p className={css.author}>{book.author}</p>

        <div className={css.yearAndTotal}>
          {isMobile && <span className={css.span}>Year:</span>}
          <p className={css.publishYear}>{book.publishYear}</p>

          <div className={css.pagesTotalBox}>
            {isMobile && <span className={css.span}>Pages:</span>}
            <p className={css.pagesTotal}>{book.pagesTotal}</p>
          </div>
        </div>
        {location && (
          <svg className={css.iconDelete} width="14" height="18">
            <use href="../../../public/symbol-defs.svg#icon-delete"></use>
          </svg>
        )}
      </div>
    </li>
  );
}
