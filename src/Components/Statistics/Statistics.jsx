import css from "./Statistics.module.css";
import { StatisticsForm } from "./StatisticsForm";
import { StatisticsList } from "./StatisticsList";

export function Statistics({ statisticsDate, setStatisticsDate, submit }) {
  return (
    <div className={css.wrapper}>
      <p className={css.wrapperTitle}>Results</p>
      <StatisticsForm
        statisticsDate={statisticsDate}
        setStatisticsDate={setStatisticsDate}
        submit={submit}
      />
      <StatisticsList />
    </div>
  );
}
