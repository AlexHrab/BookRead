import { Navigation } from "../Navigation/Navigation";
import { NavLink, Outlet } from "react-router-dom";

export function Layout() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}
