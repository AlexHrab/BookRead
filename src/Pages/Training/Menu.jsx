import css from "./Menu.module.css";
import { MyTraining } from "../../Components/MyTraining/MyTraining";
import { Calendar } from "../../Components/Calendar/Calendar";
import { SelectBook } from "../../Components/SelectBook/SelectBook";
import { Button } from "../../Components/Button/Button";
import { useMediaQuery } from "react-responsive";

export function Menu({
  startDate,
  setStartDate,
  titleStart,
  finishDate,
  setFinishDate,
  titleFinish,
  onClick,
}) {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  return (
    <div className={css.trainingAndCalendars}>
      <MyTraining />

      <div className={css.calendars}>
        <Calendar title={titleStart} date={startDate} setDate={setStartDate} />
        <Calendar
          title={titleFinish}
          date={finishDate}
          setDate={setFinishDate}
        />
      </div>
      <SelectBook />
    </div>
  );
}
