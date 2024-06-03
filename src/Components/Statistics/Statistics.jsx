import css from "./Statistics.module.css";
import { StatisticsForm } from "./StatisticsForm";

export function Statistics({ statisticsDate, setStatisticsDate, submit }) {
  return (
    <StatisticsForm
      statisticsDate={statisticsDate}
      setStatisticsDate={setStatisticsDate}
      submit={submit}
    />
  );
}
