import css from "./Goals.module.css";
import { useSelector } from "react-redux";
import { selectRunDate } from "../../Redux/Auth/selectors";
import clsx from "clsx";
import { selectCurrentlyReading } from "../../Redux/Auth/selectors";

export function Goals({ days }) {
  const userRunDate = useSelector(selectRunDate);
  const currentlyReading = useSelector(selectCurrentlyReading);

  const value = clsx(css.value, !userRunDate && css.value_runDate);
  const description = clsx(
    css.description,
    !userRunDate && css.description_runDate
  );

  const valuesList = clsx(
    css.valuesList,
    userRunDate && css.valuesList_runDate
  );

  return (
    <div className={css.goals}>
      <p className={css.title}>My goals</p>
      <div className={css.values}>
        <ul className={valuesList}>
          <li className={css.valuesListItem}>
            <span className={value}>{currentlyReading.length}</span>
            <span className={description}>Amount of books</span>
          </li>
          <li className={css.valuesListItem}>
            <span className={value}>{days}</span>
            <span className={description}>Amount of days</span>
          </li>
          {userRunDate && (
            <li className={css.valuesListItem}>
              <span className={value}></span>
              <span className={description}>Books left</span>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
