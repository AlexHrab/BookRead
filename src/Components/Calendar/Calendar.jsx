import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import css from "./Calendar.module.css";
import { FaAngleDown } from "react-icons/fa6";

export function Calendar({ title, date, setDate }) {
  const [calendarOpen, setCalendarOpen] = useState(false);

  return (
    <div className={css.picker}>
      <DatePicker
        className={css.timeInputLabel}
        selected={date}
        onCalendarOpen={() => setCalendarOpen(true)}
        onCalendarClose={() => setCalendarOpen(false)}
        onChange={(date) => {
          setDate(date);
        }}
        timeInputLabel="Time:"
        placeholderText={title}
        dateFormat="MM.dd.yyyy HH:mm aa"
        showTimeInput
        showIcon
        icon={
          <svg width="17" height="17" className={css.icon}>
            <use href="../../../public/symbol-defs.svg#icon-calendar-7-1"></use>
          </svg>
        }
      />
      <FaAngleDown
        className={css.iconInput}
        style={{
          transform: calendarOpen ? "rotate(180deg)" : "rotate(0deg)",
          transition: "transform 0.2s ease-in-out",
          fill: calendarOpen ? "#4d4d54" : "",
        }}
      />
    </div>
  );
}
