import { Field, Form, Formik, ErrorMessage } from "formik";

import { Button } from "../Button/Button";
import css from "./BookAddForm.module.css";
import { useMediaQuery } from "react-responsive";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { addBook } from "../../Redux/Auth/operations";
import { ToastContainer, toast } from "react-toastify";

const SignupSchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .min(2, "Too Short!")
    .max(80, "Too Long!")
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

export function BookForm() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const dispatch = useDispatch();

  function Submit(values, actions) {
    dispatch(addBook(values))
      .unwrap()
      .then((res) => {
        toast.info("Book successfully added");
        actions.resetForm();
      })
      .catch((error) => {
        toast.error(error.message);
      });
  }

  const initialValues = {
    title: "",
    author: "",
    publishYear: "",
    pagesTotal: "",
  };

  return (
    <Formik
      onSubmit={Submit}
      initialValues={initialValues}
      validationSchema={SignupSchema}
    >
      <Form className={css.BookForm}>
        <div className={css.labelBox}>
          <label htmlFor="title" className={css.label}>
            Book title
            <Field
              id="title"
              type="text"
              name="title"
              className={css.input}
              placeholder="..."
            />
            <ErrorMessage className={css.error} name="title" component="span" />
          </label>

          <label htmlFor="author" className={css.label}>
            Author
            <Field
              id="author"
              type="text"
              name="author"
              className={css.input}
              placeholder="..."
            />
            <ErrorMessage
              className={css.error}
              name="author"
              component="span"
            />
          </label>

          <label htmlFor="publishYear" className={css.label}>
            Publication date
            <Field
              id="publishYear"
              type="text"
              name="publishYear"
              className={css.input}
              placeholder="..."
            />
            <ErrorMessage
              className={css.error}
              name="publishYear"
              component="span"
            />
          </label>

          <label htmlFor="pagesTotal" className={css.label}>
            Amount of pages
            <Field
              id="pagesTotal"
              name="pagesTotal"
              type="text"
              className={css.input}
              placeholder="..."
            />
            <ErrorMessage
              className={css.error}
              name="pagesTotal"
              component="span"
            />
          </label>
        </div>
        <Button type={"submit"} title={"Add"} className={"BookFormBtn"} />
      </Form>
    </Formik>
  );
}
