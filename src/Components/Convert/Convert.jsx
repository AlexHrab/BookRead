export function ConvertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = String(Math.floor(ms / day)).padStart(2, "0");
  const hours = String(Math.floor((ms % day) / hour)).padStart(2, "0");
  const minutes = String(Math.floor(((ms % day) % hour) / minute)).padStart(
    2,
    "0"
  );
  const seconds = String(
    Math.floor((((ms % day) % hour) % minute) / second)
  ).padStart(2, "0");

  return { days, hours, minutes, seconds };
}
