import { Field, Form, Formik, ErrorMessage } from "formik";
import { NavLink } from "react-router-dom";
import { Button } from "../Button/Button";
import css from "./AuthForm.module.css";
import { useMediaQuery } from "react-responsive";

export function AuthForm({ title, onSubmit, initialValues, validation }) {
  const isMobile = useMediaQuery({ maxWidth: 767 });

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValues}
      validationSchema={validation}
    >
      <Form className={css.authForm}>
        <div className={css.authFormGoogleContainer}>
          <img
            src="../../../public/google icon.png"
            alt="google"
            className={css.authFormGoogleIcon}
          />
          <Button type={"button"} title={"Google"} className={"Google"} />
        </div>
        {title === "register" && (
          <label htmlFor="name" className={css.label}>
            Name&nbsp;<span className={css.authFormSpan}>*</span>
            <Field id="name" type="text" name="name" className={css.input} />
          </label>
        )}
        <label htmlFor="email" className={css.label}>
          Email&nbsp;<span className={css.authFormSpan}>*</span>
          <Field id="email" type="text" name="email" className={css.input} />
        </label>
        <label htmlFor="password" className={css.label}>
          Password&nbsp;<span className={css.authFormSpan}>*</span>
          <Field
            id="password"
            type="text"
            name="password"
            className={css.input}
          />
        </label>
        {title === "register" && (
          <label htmlFor="confirmPassword" className={css.label}>
            Confirm password&nbsp;<span className={css.authFormSpan}>*</span>
            <Field
              id="confirmPassword"
              name="confirmPassword"
              type="text"
              className={css.input}
            />
          </label>
        )}
        <Button type={"submit"} title={title} className={"authFormBtn"} />

        {title === "register" ? (
          <span className={css.authFormRegisterText}>
            Already have an account?&nbsp;
            <NavLink to="/login" className={css.authFormLink}>
              Log in
            </NavLink>
          </span>
        ) : (
          <NavLink to="/register" className={css.authFormLink}>
            Register
          </NavLink>
        )}
      </Form>
    </Formik>
  );
}
