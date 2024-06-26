import { useState, lazy, Suspense } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Navigation } from "./Components/Navigation/Navigation";
import { Home } from "./Pages/Home/Home";
import { Training } from "./Pages/Training/Training";
import { Login } from "./Pages/Login/Login";
import { Register } from "./Pages/Register/Register";
import { refresh, fetchLocation } from "./Redux/Auth/operations";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { PrivateRoute } from "../Routes/PrivateRoute";
import { PublicRoute } from "../Routes/PublicRoute";
import { useLocation } from "react-router-dom";
import {
  selectIsLoggedIn,
  selectLocation,
  selectAccessToken,
  selectCurrentlyReading,
  selectGoingToRead,
  selectFinishedReading,
  selectRefresh,
} from "./Redux/Auth/selectors";
import { getAllBooks } from "./Redux/Auth/operations";
import { useSelector } from "react-redux";
import { Layout } from "./Components/Layout/Layout";
import { Info } from "./Pages/Info/Info";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@fontsource/abril-fatface/400.css";
import "@fontsource/montserrat/300.css";
import "@fontsource/montserrat/600.css";
import "@fontsource/montserrat/500.css";
import "@fontsource/roboto/700.css";
import "@fontsource/open-sans/700.css";
import { Loader } from "./Components/Loader/Loader";

function App() {
  const dispatch = useDispatch();
  const location = useLocation();
  const link = location.pathname;
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const thisLocation = useSelector(selectLocation);
  const accessToken = useSelector(selectAccessToken);
  const refreshBooks = useSelector(selectRefresh);

  const goingToRead = useSelector(selectGoingToRead);
  const finishedReading = useSelector(selectFinishedReading);
  const currentlyReading = useSelector(selectCurrentlyReading);

  // const Layout = lazy(() => import("./Components/Layout/Layout"));
  // const Home = lazy(() => import("./Pages/Home/Home"));
  // const Training = lazy(() => import("./Pages/Training/Training"));
  // const Login = lazy(() => import("./Pages/Login/Login"));
  // const Register = lazy(() => import("./Pages/Register/Register"));
  // const Info = lazy(() => import("./Pages/Info/Info"));

  useEffect(() => {
    if (isLoggedIn) {
      dispatch(refresh())
        .unwrap()
        .then((res) => dispatch(getAllBooks()))
        .catch((error) => toast.error(error.message));
    }
    if (isLoggedIn) {
      dispatch(fetchLocation(link));
    } else {
      return;
    }
  }, [dispatch, link]);

  return refreshBooks ? (
    <Loader />
  ) : (
    <>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <PrivateRoute>
                  <Home />
                </PrivateRoute>
              }
            />
            <Route
              path="training"
              element={
                <PrivateRoute>
                  <Training />
                </PrivateRoute>
              }
            />
            <Route
              path="login"
              element={
                <PublicRoute redirectTo={thisLocation}>
                  <Login />
                </PublicRoute>
              }
            />
            <Route
              path="register"
              element={
                <PublicRoute redirectTo={thisLocation}>
                  <Register />
                </PublicRoute>
              }
            />
            <Route
              path="information"
              element={
                <PublicRoute redirectTo={thisLocation}>
                  <Info />
                </PublicRoute>
              }
            />
          </Route>
        </Routes>
      </Suspense>
      <ToastContainer position="bottom-left" className="toast" />
    </>
  );
}

export default App;
