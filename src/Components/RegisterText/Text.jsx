import css from "./Text.module.css";

export function Text() {
  return (
    <div className={css.text}>
      <div className={css.textBlockFirst}>
        <h2 className={css.textMainTitle}>Books Reading</h2>
        <h3 className={css.textTitle}>Will help you to</h3>
        <ul className={css.textList}>
          <li className={css.textListItem}>
            <svg className={css.icon} width="4" height="8">
              <use href="../../../public/symbol-defs.svg#icon-Vector1" />
            </svg>
            <p className={css.textListItemText}>
              Create your goal faster and proceed to read
            </p>
          </li>
          <li className={css.textListItem}>
            <svg className={css.icon} width="4" height="8">
              <use href="../../../public/symbol-defs.svg#icon-Vector1" />
            </svg>
            <p className={css.textListItemText}>
              Divide process proportionally for each day
            </p>
          </li>
          <li className={css.textListItem}>
            <svg className={css.icon} width="4" height="8">
              <use href="../../../public/symbol-defs.svg#icon-Vector1" />
            </svg>
            <p className={css.textListItemText}>Track your success</p>
          </li>
        </ul>
      </div>
      <div className={css.textBlockSecond}>
        <h3 className={css.textTitle}>You may also</h3>
        <ul className={css.textList}>
          <li className={css.textListItem}>
            <svg className={css.icon} width="4" height="8">
              <use href="../../../public/symbol-defs.svg#icon-Vector1" />
            </svg>
            <p className={css.textListItemText}>
              Pose your own independent point of view
            </p>
          </li>
          <li className={css.textListItem}>
            <svg className={css.icon} width="4" height="8">
              <use href="../../../public/symbol-defs.svg#icon-Vector1" />
            </svg>
            <p className={css.textListItemText}>
              Improve your professional skills according to new knowledge
            </p>
          </li>
          <li className={css.textListItem}>
            <svg className={css.icon} width="4" height="8">
              <use href="../../../public/symbol-defs.svg#icon-Vector1" />
            </svg>
            <p className={css.textListItemText}>
              Become an interesting interlocutor
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
}
