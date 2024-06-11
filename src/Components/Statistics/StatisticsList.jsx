import { selectStats } from "../../Redux/Auth/selectors";
import { useSelector } from "react-redux";
import { selectUserStartDate } from "../../Redux/Auth/selectors";
import { nanoid } from "nanoid";
import css from "./StatisticsList.module.css";

export function StatisticsList() {
  const stats = useSelector(selectStats);
  const startDate = useSelector(selectUserStartDate);
  //   const newStats = new Date(stats[3].time).getTime();
  const newStartDate = new Date(startDate).getTime();

  function getUserTime(milliseconds) {
    const hours = Math.floor(milliseconds / (1000 * 60 * 60))
      .toString()
      .padStart(2, "0");
    const minutes = Math.floor((milliseconds % (1000 * 60 * 60)) / (1000 * 60))
      .toString()
      .padStart(2, "0");

    return `${hours}:${minutes}`;
  }

  function getUserDate(milliseconds) {
    const date = new Date(milliseconds);
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");

    return ` ${day}.${month}.${year}`;
  }

  return (
    <div className={css.box}>
      <p className={css.mainTitle}>STATISTICS</p>
      <div className={css.titles}>
        <span>Date</span>
        <span className={css.timeTitle}>Time</span>
        <span>Pages</span>
      </div>
      <ul className={css.list}>
        {stats.map((stat, index) => (
          <li key={nanoid()} className={css.item}>
            <span className={css.dateSpan}>
              {getUserDate(new Date(stat.time).getTime())}
            </span>

            {index === 0 ? (
              <span className={css.timeSpan}>
                {getUserTime(new Date(stat.time).getTime() - newStartDate)}
              </span>
            ) : (
              <span className={css.timeSpan}>
                {getUserTime(
                  new Date(stat.time).getTime() -
                    new Date(stats[index - 1].time).getTime()
                )}
              </span>
            )}
            <span className={css.pagesSpan}>{stat.pagesCount}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
