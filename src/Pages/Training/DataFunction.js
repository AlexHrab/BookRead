export function DataFunction(inputDate) {
  const dateObject = new Date(inputDate);

  const month = (dateObject.getMonth() + 1).toString().padStart(2, "0");
  const day = dateObject.getDate().toString().padStart(2, "0");
  const year = dateObject.getFullYear();
  let hours = dateObject.getHours();
  const minutes = dateObject.getMinutes();
  let period = "AM";

  if (hours >= 12) {
    period = "PM";
    hours -= 12;
  }
  if (hours === 0) {
    hours = 12;
  }

  const formattedDate = `${month}.${day}.${year} ${hours
    .toString()
    .padStart(2, "0")}:${minutes.toString().padStart(2, "0")} ${period}`;
  if (inputDate) {
    return new Date(formattedDate);
  }
  return "";
}

export function formatDate(inputDate) {
  const date = new Date(inputDate);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");

  return `${year}-${month}-${day}`;
}
