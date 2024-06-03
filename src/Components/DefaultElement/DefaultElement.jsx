import css from "./DefaultElement.module.css";
import { selectLocation } from "../../Redux/Auth/selectors";
import { useMediaQuery } from "react-responsive";
import { useSelector } from "react-redux";
import clsx from "clsx";

export function DefaultElement() {
  const thisLocation = useSelector(selectLocation);
  const location = thisLocation === "/training" ? true : false;
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const mainBox = clsx(css.spanBox, isMobile && css.Box);

  return (
    <div className={mainBox}>
      <div className={css.fild}>
        <svg className={css.icon} width="22" height="17">
          <use href="../../../public/symbol-defs.svg#icon-Flat"></use>
        </svg>
        <span>...</span>
      </div>

      {location && isMobile && (
        <div className={css.spanWrapper}>
          <div className={css.fild}>
            <p className={css.text}>Author:</p>
            <span className={css.span}>...</span>
          </div>
          <div className={css.fild}>
            <p className={css.text}>Year:</p>
            <span className={css.span}>...</span>
          </div>
          <div className={css.fild}>
            <p className={css.text}>Pages:</p>
            <span className={css.span}>...</span>
          </div>
        </div>
      )}
    </div>
  );
}
