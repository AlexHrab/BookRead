import { GridLoader } from "react-spinners";
import css from "./Loader.module.css";

export function Loader() {
  return (
    <div className={css.loaderContainer}>
      <GridLoader color="#ff6b08" />
    </div>
  );
}
