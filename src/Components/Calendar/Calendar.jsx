import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import css from "./Calendar.module.css";

export function Calendar({ title, date, setDate }) {
  return (
    <div>
      <DatePicker
        className={css.timeInputLabel}
        selected={date}
        onChange={(date) => setDate(date)}
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
    </div>
  );
}
