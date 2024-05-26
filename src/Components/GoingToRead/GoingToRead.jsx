import { selectGoingToRead } from "../../Redux/Auth/selectors";
import { useSelector } from "react-redux";
import { Book } from "../Book/Book";
import css from "./GoingToRead.module.css";
import { useMediaQuery } from "react-responsive";
import { Button } from "../../Components/Button/Button";

export function GoingToRead({ onClick }) {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const GoingToRead = useSelector(selectGoingToRead);
  return (
    <div>
      <h4 className={css.title}>Going to read</h4>
      {!isMobile && (
        <div className={css.titles}>
          <p>Book title</p>

          <p className={css.author}>Author</p>
          <div className={css.yearAndTotal}>
            <p>Year</p>
            <p>Pages</p>
          </div>
        </div>
      )}
      <div className={css.listAndButton}>
        <ul className={css.list}>
          {GoingToRead.map((el) => (
            <Book key={el._id} book={el} />
          ))}
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