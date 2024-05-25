import css from "./Book.module.css";
import { useMediaQuery } from "react-responsive";

export function Book({ book }) {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <li className={css.item}>
      <div className={css.titleAndSvg}>
        <svg className={css.icon} width="22" height="17">
          <use href="../../../public/symbol-defs.svg#icon-Flat"></use>
        </svg>
        <p className={css.title}>{book.title}</p>
      </div>
      <div className={css.yearAndTotalAndAuthor}>
        {isMobile && <span>Author:</span>}
        <p className={css.author}>{book.author}</p>

        <div className={css.yearAndTotal}>
          {isMobile && <span>Year:</span>}
          <p className={css.publishYear}>{book.publishYear}</p>

          <div className={css.pagesTotalBox}>
            {isMobile && <span>Pages:</span>}
            <p className={css.pagesTotal}>{book.pagesTotal}</p>
          </div>
        </div>
      </div>
    </li>
  );
}
