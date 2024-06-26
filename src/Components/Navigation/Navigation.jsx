import { NavLink, Outlet } from "react-router-dom";
import { Button } from "../Button/Button";
import { logout } from "../../Redux/Auth/operations";
import { useDispatch } from "react-redux";
import css from "./Navigation.module.css";
import { selectUserName } from "../../Redux/Auth/selectors";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../Redux/Auth/selectors";
import clsx from "clsx";
import { useMediaQuery } from "react-responsive";
import { BookModal } from "../Modal/Modal";
import { useState } from "react";
import { useEffect } from "react";

export function Navigation({ closeOn }) {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const isMobile = useMediaQuery({ maxWidth: 767 });

  const navItemActive = ({ isActive }) => {
    return clsx(css.item, isActive && css.active);
  };

  const boxMobile = clsx(css.box, isMobile && !isLoggedIn && css.boxMobile);

  return (
    <div className={boxMobile}>
      <a href="/" className={css.logo}>
        BR
      </a>
      {isLoggedIn && (
        <>
          <div className={css.userNameBox}>
            <span className={css.userNameLogo}>{userName.slice(0, 1)}</span>
            <span className={css.userName}>{userName}</span>
          </div>
          <div className={css.nav}>
            <ul className={css.navList}>
              <li>
                <NavLink to="/training" className={navItemActive}>
                  <svg className={css.icon} width="20" height="17">
                    <use href="/symbol-defs.svg#icon-Flat" />
                  </svg>
                </NavLink>
              </li>
              <li>
                <NavLink to="/" className={navItemActive}>
                  <svg className={css.icon} width="20" height="17">
                    <use href="/symbol-defs.svg#icon-icon-home" />
                  </svg>
                </NavLink>
              </li>
            </ul>

            <Button
              type={"button"}
              onClick={closeOn}
              title={"Logout"}
              className={"navigation"}
            />
          </div>
        </>
      )}
    </div>
  );
}
