import { selectIsLoggedIn } from "../src/Redux/Auth/selectors";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

export function PrivateRoute({ children }) {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const navigateTo = isMobile ? (
    <Navigate to="/information" />
  ) : (
    <Navigate to="/login" />
  );

  const isLoggedIn = useSelector(selectIsLoggedIn);
  return isLoggedIn ? children : navigateTo;
}
