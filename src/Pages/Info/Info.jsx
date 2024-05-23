import { Text } from "../../Components/RegisterText/Text";
import { NavLink } from "react-router-dom";
import css from "./Info.module.css";

export function Info() {
  return (
    <div className={css.Box}>
      <Text />
      <div className={css.linkBox}>
        <NavLink className={css.link} to="/login">
          Log in
        </NavLink>
        <NavLink className={css.link} to="/register">
          Register
        </NavLink>
      </div>
    </div>
  );
}
