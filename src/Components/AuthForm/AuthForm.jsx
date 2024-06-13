import { Field, Form, Formik, ErrorMessage } from "formik";
import { NavLink } from "react-router-dom";
import { Button } from "../Button/Button";
import css from "./AuthForm.module.css";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";

export function AuthForm({ title, onSubmit, initialValues, validation }) {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const [showPass, setShowPass] = useState(false);

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
          <div className={css.labelBox}>
            <label htmlFor="name" className={css.label}>
              Name&nbsp;<span className={css.authFormSpan}>*</span>
            </label>
            <Field id="name" type="text" name="name" className={css.input} />
            <ErrorMessage className={css.error} name="name" component="span" />
          </div>
        )}
        <div className={css.labelBox}>
          <label htmlFor="email" className={css.label}>
            Email&nbsp;<span className={css.authFormSpan}>*</span>
          </label>
          <Field id="email" type="text" name="email" className={css.input} />
          <ErrorMessage className={css.error} name="email" component="span" />
        </div>
        <div className={css.labelBox}>
          <label htmlFor="password" className={css.label}>
            Password&nbsp;<span className={css.authFormSpan}>*</span>
          </label>
          <Field
            id="password"
            type={!showPass ? "password" : "text"}
            name="password"
            className={css.input}
          />
          <ErrorMessage
            className={css.error}
            name="password"
            component="span"
          />
        </div>
        {title === "register" && (
          <div className={css.labelBox}>
            <label htmlFor="confirmPassword" className={css.label}>
              Confirm password&nbsp;<span className={css.authFormSpan}>*</span>
            </label>
            <Field
              id="confirmPassword"
              name="confirmPassword"
              type={!showPass ? "password" : "text"}
              className={css.input}
            />
            <ErrorMessage
              className={css.error}
              name="confirmPassword"
              component="span"
            />
          </div>
        )}
        <label className={css.checkboxContainer}>
          Show password
          <input
            className={css.checkbox}
            type="checkbox"
            checked={showPass}
            onChange={() => setShowPass((prev) => !prev)}
          />
          <span className={css.customCheckbox}></span>
        </label>
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
