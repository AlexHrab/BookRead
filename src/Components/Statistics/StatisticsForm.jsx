import css from "./Statistics.module.css";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../Button/Button";
import { FaAngleDown } from "react-icons/fa6";
import { selectStats } from "../../Redux/Auth/selectors";
import { useSelector } from "react-redux";

const SignupSchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .min(2, "Too Short!")
    .max(40, "Too Long!")
    .required("fild Required!"),
  author: yup
    .string()
    .trim()
    .min(2, "Too Short!")
    .max(30, "Too Long!")
    .required("fild Required!"),
  publishYear: yup
    .string()
    .trim()
    .min(2, "Too Short!")
    .max(4, "Too Long!")
    .required("fild Required!"),
  pagesTotal: yup
    .string()
    .trim()
    .min(1, "Too Short!")
    .max(4, "Too Long!")
    .required("fild Required!"),
});

export function StatisticsForm({ statisticsDate, setStatisticsDate, submit }) {
  //   const isMobile = useMediaQuery({ maxWidth: 767 });
  const dispath = useDispatch();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const stats = useSelector(selectStats);
  // console.log(stats);

  let total = 0;

  for (const stat of stats) {
    total += stat.pagesCount;
  }

  // console.log(total);

  // function Submit(values, actions) {

  //   actions.resetForm();
  // }

  const initialValues = {
    date: "",
    pages: "",
  };

  return (
    <Formik
      onSubmit={submit}
      initialValues={initialValues}
      // validationSchema={SignupSchema}
    >
      <Form className={css.BookForm}>
        <div className={css.labelBox}>
          {/* <label htmlFor="date" className={css.Label}>
            Date
            <Field name="date" id="date">
              {({ field }) => (
                <div className={css.timeInputWrapper}>
                  <DatePicker
                    className={css.timeInput}
                    selected={statisticsDate}
                    onCalendarOpen={() => setCalendarOpen(true)}
                    onCalendarClose={() => setCalendarOpen(false)}
                    onChange={(statisticsDate) => {
                      setStatisticsDate(statisticsDate);
                    }}
                    timeInputLabel="Time:"
                    //   placeholderText={title}
                    dateFormat="MM.dd.yyyy"
                    showTimeInput
                  />
                  <FaAngleDown
                    className={css.iconInput}
                    style={{
                      transform: calendarOpen
                        ? "rotate(180deg)"
                        : "rotate(0deg)",
                      transition: "transform 0.2s ease-in-out",
                      fill: calendarOpen ? "#4d4d54" : "",
                    }}
                  />
                </div>
              )}
            </Field>
          </label> */}

          <div className={css.totalPagesBoxWrapper}>
            <span className={css.totalPagesText}>Total of pages</span>
            <div className={css.totalPagesBox}>
              <span>{total}</span>
            </div>
          </div>

          <label htmlFor="pages" className={css.Label}>
            Amount of pages
            <Field
              id="pages"
              type="text"
              name="pages"
              className={css.pagesInput}
              placeholder="..."
            />
          </label>
        </div>
        <Button type={"submit"} title={"Add result"} className={"statistic"} />
      </Form>
    </Formik>
  );
}
