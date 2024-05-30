import css from "./DefaultElement.module.css";

export function DefaultElement() {
  return (
    <div className={css.spanBox}>
      <span className={css.span}>
        <svg className={css.icon} width="22" height="17">
          <use href="../../../public/symbol-defs.svg#icon-Flat"></use>
        </svg>
      </span>
      <span>...</span>
    </div>
  );
}
