import { AuthForm } from "../../Components/AuthForm/AuthForm";
import * as yup from "yup";
import { register } from "../../Redux/Auth/operations";
import { useDispatch } from "react-redux";
import css from "./Register.module.css";
import { Text } from "../../Components/RegisterText/Text";
import { useMediaQuery } from "react-responsive";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { selectUserName } from "../../Redux/Auth/selectors";
import { useSelector } from "react-redux";

const SignupSchema = yup.object().shape({
  name: yup
    .string()
    .trim()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("fild Required!"),
  email: yup
    .string()
    .email("Email is not valid!")
    .trim()
    .min(2, "Too Short!")
    .max(30, "Too Long!")
    .required("fild Required!"),
  password: yup
    .string()
    .trim()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("fild Required!"),
  confirmPassword: yup
    .string()
    .trim()
    .min(2, "Too Short!")
    .max(20, "Too Long!")
    .required("fild Required!"),
});

export function Register() {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const navigate = useNavigate();
  const Name = useSelector(selectUserName);

  function Submit(values, actions) {
    if (values.password === values.confirmPassword) {
      dispatch(
        register({
          name: values.name,
          email: values.email,
          password: values.password,
        })
      )
        .unwrap()
        .then((res) => navigate("/"))
        .then((res) =>
          toast.info(
            `Congratulations ${Name}, you are successfully registered, please log in!`
          )
        )
        .catch((error) => toast.error(error.message));
      actions.resetForm();
    } else {
      toast.info("password is not correct");
    }
  }

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  return (
    <div className={css.box}>
      <div className={css.form}>
        <AuthForm
          title={"Register"}
          onSubmit={Submit}
          initialValues={initialValues}
          validation={SignupSchema}
        />
      </div>
      {!isMobile && <Text />}
    </div>
  );
}
