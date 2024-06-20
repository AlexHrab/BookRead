import { AuthForm } from "../../Components/AuthForm/AuthForm";
import * as yup from "yup";
import { login } from "../../Redux/Auth/operations";
import { useDispatch } from "react-redux";
import css from "./Login.module.css";

const SignupSchema = yup.object().shape({
  password: yup
    .string()
    .trim()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("fild Required!"),
  email: yup
    .string()
    .email()
    .trim()
    .min(2, "Too Short!")
    .max(30, "Too Long!")
    .required("fild Required!"),
});

export function Login() {
  const dispatch = useDispatch();

  function Submit(values, actions) {
    dispatch(login(values));
    actions.resetForm();
  }

  const initialValues = {
    email: "",
    password: "",
  };

  return (
    <div className={css.box}>
      <div className={css.form}>
        <AuthForm
          title={"Login"}
          onSubmit={Submit}
          initialValues={initialValues}
          validation={SignupSchema}
        />
      </div>
      <div className={css.text}>
        <span className={css.textSpan}>“</span>
        <p className={css.textTitle}>
          Books are the ships of thoughts, wandering through the waves of time.
        </p>
        <p className={css.textAuthor}>Francis Bacon</p>
      </div>
    </div>
  );
}
