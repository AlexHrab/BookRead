import clsx from "clsx";
import css from "./Button.module.css";

export function Button({ type, onClick, title, className, children }) {
  const nameClass = clsx(css[className]);

  return (
    <button type={type} onClick={onClick} className={nameClass}>
      {title}
      {children}
    </button>
  );
}
