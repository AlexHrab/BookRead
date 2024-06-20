import { Navigation } from "../Navigation/Navigation";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { BookModal } from "../Modal/Modal";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/Auth/operations";
import css from "./Layout.module.css";
import { Button } from "../Button/Button";
// import { showContent } from "../../Redux/Other/operations";
import { selectLocation, selectRunDate } from "../../Redux/Auth/selectors";
import { useSelector } from "react-redux";

export function Layout() {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);
  const thisLocation = useSelector(selectLocation);
  const location = thisLocation === "/training" ? true : false;
  const RunDate = useSelector(selectRunDate);

  function onClose() {
    setModalOpen(false);
  }

  function logOut() {
    dispatch(logout());
    setModalOpen(false);
  }

  function closeOn() {
    setModalOpen(true);
  }

  return (
    <>
      <Navigation closeOn={closeOn} />
      <BookModal isOpen={modalOpen} onClose={onClose} className={css.modal}>
        <p className={css.logOutWindowText}>
          {!RunDate
            ? "Do you really want to log out?"
            : "The changes you made will be lost if you navigate away from this application"}
        </p>
        <div className={css.buttonBox}>
          <Button
            type={"button"}
            onClick={logOut}
            title={!RunDate ? "Yes" : "Leave"}
            className={"logOutWindowBtn"}
          />
          <Button
            type={"button"}
            onClick={onClose}
            title={!RunDate ? "No" : "Cancel"}
            className={"logOutWindowBtn"}
          />
        </div>
      </BookModal>
      <Outlet />
    </>
  );
}
