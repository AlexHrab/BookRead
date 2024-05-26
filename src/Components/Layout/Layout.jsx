import { Navigation } from "../Navigation/Navigation";
import { NavLink, Outlet } from "react-router-dom";
import { useState } from "react";
import { BookModal } from "../Modal/Modal";
import { useDispatch } from "react-redux";
import { logout } from "../../Redux/Auth/operations";
import css from "./Layout.module.css";
import { Button } from "../Button/Button";
import { showContent } from "../../Redux/Other/operations";

export function Layout() {
  const dispatch = useDispatch();
  const [modalOpen, setModalOpen] = useState(false);

  function onClose() {
    setModalOpen(false);
  }

  function logOut() {
    dispatch(logout());
    setModalOpen(false);
  }

  function closeOn() {
    setModalOpen(true);
    // dispatch(showContent(true));
  }

  return (
    <>
      <Navigation closeOn={closeOn} />
      <BookModal isOpen={modalOpen} onClose={onClose} className={css.modal}>
        <p className={css.logOutWindowText}>Do you really want to log out?</p>
        <div className={css.buttonBox}>
          <Button
            type={"button"}
            onClick={logOut}
            title={"Yes"}
            className={"logOutWindowBtn"}
          />
          <Button
            type={"button"}
            onClick={onClose}
            title={"No"}
            className={"logOutWindowBtn"}
          />
        </div>
      </BookModal>
      <Outlet />
    </>
  );
}
