import css from "./CountDisplays.module.css";

export function CountDisplays({ title, value }) {
  return (
    <div className={css.timerBox}>
      <p className={css.title}>{title}</p>
      <div className={css.timer}>
        <div className={css.field}>
          <div className={css.value}>
            <span data-days>{value?.days || "00"}</span>
          </div>
          <span className={css.label}>Days</span>
        </div>
        <span className={css.sign}>:</span>

        <div className={css.field}>
          <div className={css.value}>
            <span data-hours>{value?.hours || "00"}</span>
          </div>
          <span className={css.label}>Hrs</span>
        </div>
        <span className={css.sign}>:</span>

        <div className={css.field}>
          <span className={css.value} data-minutes>
            {value?.minutes || "00"}
          </span>
          <span className={css.label}>Mins</span>
        </div>
        <span className={css.sign}>:</span>

        <div className={css.field}>
          <span className={css.value} data-seconds>
            {value?.seconds || "00"}
          </span>
          <span className={css.label}>Secs</span>
        </div>
      </div>
    </div>
  );
}
