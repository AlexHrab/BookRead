import { BookForm } from "../../Components/BookAddForm/BookAddForm";
import css from "./Home.module.css";
import { useSelector } from "react-redux";

import { GoingToRead } from "../../Components/GoingToRead/GoingToRead";
import { useMediaQuery } from "react-responsive";
import { Button } from "../../Components/Button/Button";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { greating } from "../../Redux/Auth/operations";
import { useEffect } from "react";
// import { useSelector } from "react-redux";
import {
  selectGreating,
  selectAccessToken,
  selectGoingToRead,
  selectCurrentlyReading,
  selectFinishedReading,
} from "../../Redux/Auth/selectors";
import { BookModal } from "../../Components/Modal/Modal";
import { getAllBooks } from "../../Redux/Auth/operations";

export function Home() {
  const isMobile = useMediaQuery({ maxWidth: 767 });
  const goingToRead = useSelector(selectGoingToRead);
  const accessToken = useSelector(selectAccessToken);
  const userGreating = useSelector(selectGreating);
  const currentlyReading = useSelector(selectCurrentlyReading);
  const finishedReading = useSelector(selectFinishedReading);
  // const isMobile = useMediaQuery({ maxWidth: 767 });
  const dispatch = useDispatch();

  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (userGreating) {
      setModalIsOpen(true);
    }
  }, [userGreating, modalIsOpen]);

  // useEffect(() => {
  //   if (accessToken) {
  //     dispatch(getAllBooks());
  //   }
  // }, [dispatch, accessToken]);

  function close() {
    setModalIsOpen(false);
    dispatch(greating(false));
  }

  function content() {
    setShowContent(true);
  }

  function contentOff() {
    setShowContent(false);
    setModalIsOpen(false);
    dispatch(greating(false));
  }

  return (
    <div className={css.home}>
      {(showContent || userGreating) && isMobile && (
        <svg
          className={css.iconBack}
          width="24"
          height="12"
          onClick={contentOff}
        >
          <use href="../../../public/symbol-defs.svg#icon-back"></use>
        </svg>
      )}
      {(showContent || !isMobile) && <BookForm />}
      {!showContent && !userGreating && (
        <div className={css.readingList}>
          {finishedReading.length !== 0 && (
            <GoingToRead
              onClick={content}
              value={finishedReading}
              title={"Already read"}
            />
          )}
          {currentlyReading.length !== 0 && (
            <GoingToRead
              onClick={content}
              value={currentlyReading}
              title={"Reading now"}
            />
          )}
          {goingToRead.length !== 0 && (
            <GoingToRead
              onClick={content}
              value={goingToRead}
              title={"Going to read"}
            />
          )}
        </div>
      )}

      {userGreating && (
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
      )}
    </div>
  );
}
