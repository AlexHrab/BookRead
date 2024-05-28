import css from "./TrainingList.module.css";
import { Button } from "../Button/Button";
import { GoingToRead } from "../GoingToRead/GoingToRead";

export function TrainingList({ onClick }) {
  return (
    <>
      {/* <GoingToRead /> */}

      <Button
        onClick={onClick}
        type={"button"}
        title={"Start traning"}
        className={"startTraning"}
      />
    </>
  );
}
