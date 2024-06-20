import css from "./SelectBook.module.css";
import Select from "react-select";
import "./SelectBook.css";
import { useState } from "react";
import {
  selectGoingToRead,
  selectTrainingBookList,
} from "../../Redux/Auth/selectors";
import { useSelector } from "react-redux";
import { Button } from "../Button/Button";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";

import { trainingBookList, trainingItemDelete } from "../../Redux/Auth/slice";

export function SelectBook() {
  const dispatch = useDispatch();

  const [selectedBook, setSelectedBook] = useState();

  const books = useSelector(selectGoingToRead);
  const trainingList = useSelector(selectTrainingBookList);
  const Book = trainingList.find((el) => el._id === selectedBook?.value);

  const firstOption = { value: "", label: "" };
  const options = [
    firstOption,
    ...books.map((book) => ({ value: book._id, label: book.title })),
  ];

  function onClick() {
    if (selectedBook?.value) {
      dispatch(trainingBookList(selectedBook?.value));
    }
    if (!selectedBook?.value) {
      toast.info("Select a book first!");
    }
    if (Book) {
      toast.info("The book has already been added!");
    }
  }

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
      transition: "transform 0.2s ease-in-out",
      stroke: "#b1b5c2",
      active: "#b1b5c2",
    }),
    input: (provided, state) => ({
      ...provided,
    }),
  };

  return (
    <div className={css.selectBox}>
      <Select
        options={options}
        defaultValue={selectedBook}
        onChange={setSelectedBook}
        classNamePrefix="input"
        styles={customStyles}
        className="selectInput"
        placeholder="Choose books from the library "
      />
      <Button
        type={"button"}
        title={"Add select"}
        className={"StatisticFormBtn"}
        onClick={onClick}
      />
    </div>
  );
}
