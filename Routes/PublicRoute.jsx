import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../src/Redux/Auth/selectors";
import { Navigate } from "react-router-dom";

export function PublicRoute({ children, redirectTo }) {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? <Navigate to={redirectTo} /> : children;
}
