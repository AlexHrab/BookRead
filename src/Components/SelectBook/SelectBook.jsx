import css from "./SelectBook.module.css";
import Select from "react-select";
import "./SelectBook.css";
import { useState } from "react";
import { selectGoingToRead } from "../../Redux/Auth/selectors";
import { useSelector } from "react-redux";

export function SelectBook() {
  const [selectedBook, setSelectedBook] = useState();
  const books = useSelector(selectGoingToRead);
  const firstOption = { value: "", label: "" };
  const options = [
    firstOption,
    ...books.map((book) => ({ value: book._id, label: book.title })),
  ];

  const customStyles = {
    menu: (provided, state) => ({
      ...provided,
    }),
    dropdownIndicator: (provided, state) => ({
      ...provided,
      transform: state.selectProps.menuIsOpen ? "rotate(180deg)" : null,
      transition: "transform 0.2s ease-in-out",
    }),
    input: (provided, state) => ({
      ...provided,
    }),
  };

  return (
    <Select
      options={options}
      defaultValue={selectedBook}
      onChange={setSelectedBook}
      classNamePrefix="input"
      styles={customStyles}
      className="selectInput"
      placeholder="Choose books from the library "
    />
  );
}
