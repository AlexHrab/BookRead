import css from "./Statistics.module.css";
import { Field, Form, Formik, ErrorMessage } from "formik";
import * as yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Button } from "../Button/Button";
import { FaAngleDown } from "react-icons/fa6";
import { selectStats, selectSum } from "../../Redux/Auth/selectors";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

export function StatisticsForm({ statisticsDate, setStatisticsDate, submit }) {
  const sum = useSelector(selectSum);

  const dispath = useDispatch();
  const [calendarOpen, setCalendarOpen] = useState(false);
  const stats = useSelector(selectStats);

  let total = 0;

  for (const stat of stats) {
    total += stat.pagesCount;
  }

  const maxValue = sum - total;

  const SignupSchema = yup.object().shape({
    pages: yup
      .number()

      .min(1, "Too Short!")
      .max(maxValue, "Too much!")
      .required("fild Required!"),
  });

  const initialValues = {
    date: "",
    pages: "",
  };

  return (
    <Formik
      onSubmit={submit}
      initialValues={initialValues}
      validationSchema={SignupSchema}
    >
      <Form className={css.BookForm}>
        <div className={css.labelBox}>
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
              type="number"
              name="pages"
              className={css.pagesInput}
              placeholder="..."
            />
            <ErrorMessage className={css.error} name="pages" component="span" />
          </label>
        </div>
        <Button type={"submit"} title={"Add result"} className={"statistic"} />
      </Form>
    </Formik>
  );
}
