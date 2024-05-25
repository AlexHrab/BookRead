import { Navigation } from "../Navigation/Navigation";
import { NavLink, Outlet } from "react-router-dom";
// import { BookModal } from "../Modal/Modal";
import { useState } from "react";
import { useSelector } from "react-redux";
import { selectGreating } from "../../Redux/Auth/selectors";
import { useEffect } from "react";
import { greating } from "../../Redux/Auth/operations";
import { useDispatch } from "react-redux";
import css from "./Layout.module.css";
import { Button } from "../Button/Button";
import { useMediaQuery } from "react-responsive";

export function Layout() {
  // const userGreating = useSelector(selectGreating);
  // const isMobile = useMediaQuery({ maxWidth: 767 });
  // const dispatch = useDispatch();

  // const [modalIsOpen, setModalIsOpen] = useState(false);

  // useEffect(() => {
  //   if (userGreating) {
  //     setModalIsOpen(true);
  //   }
  // }, [userGreating, modalIsOpen]);

  // function close() {
  //   setModalIsOpen(false);
  //   dispatch(greating(false));
  // }

  return (
    <>
      <Navigation />
      {/* {userGreating && (
        <BookModal isOpen={modalIsOpen} onClose={close}>
          <ul className={css.list}>
            <li className={css.listItem}>
              <h4 className={css.listTitle}>Step 1.</h4>
              <p className={css.listText}>
                <svg className={css.icon} width="22" height="17">
                  <use href="../../../public/symbol-defs.svg#icon-Flat" />
                </svg>
                Create your own library
              </p>
              <div className={css.listSpanBoxFirst}>
                <svg className={css.iconVector} width="10" height="12">
                  <use href="../../../public/symbol-defs.svg#icon-Vector" />
                </svg>
                <span className={css.listSpanFirst}>
                  Add there books which you are going to read.
                </span>
              </div>
            </li>
            <li className={css.listItem}>
              <h4 className={css.listTitle}>Step 2.</h4>
              <p className={css.listText}>
                <svg className={css.icon} width="15" height="17">
                  <use href="../../../public/symbol-defs.svg#icon-flag" />
                </svg>
                Create your first training
              </p>
              <div className={css.listSpanBoxSecond}>
                <svg className={css.iconVector} width="10" height="12">
                  <use href="../../../public/symbol-defs.svg#icon-Vector" />
                </svg>
                <span className={css.listSpanSecond}>
                  Set a goal, choose period, start training.{" "}
                </span>
              </div>
            </li>
          </ul>
          {isMobile && (
            <Button
              type={"button"}
              onClick={close}
              title={"Ok"}
              className={"modalTextButton"}
            />
          )}
        </BookModal>
      )} */}
      <Outlet />
    </>
  );
}
