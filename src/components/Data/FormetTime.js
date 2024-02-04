 function FormatTime (time){
    const hours = Math.floor(time / (60 * 60 * 1000));
    const minutes = Math.floor((time % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((time % (60 * 1000)) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    const pad = (value) => (value < 10 ? `0${value}` : value);

    return `${hours !== 0 ? pad(hours) + ":" : ""}${
      minutes !== 0 ? pad(minutes) + ":" : ""
    }${pad(seconds)}.${pad(milliseconds)}`;
}
const timeStrToInt = (formattedTime) => {
  const parts = formattedTime.split(".");
  let totalMilliseconds = 0;

  // Extract hours, minutes, seconds, and milliseconds from the formatted string
  if (parts.length === 4) {
      // Format: HH.MM.SS.SS
      totalMilliseconds +=
          parseInt(parts[0]) * 60 * 60 * 1000 + // hours
          parseInt(parts[1]) * 60 * 1000 + // minutes
          parseInt(parts[2]) * 1000 + // seconds
          parseInt(parts[3]) * 10; // milliseconds
  } else if (parts.length === 3) {
      // Format: MM.SS.SS
      totalMilliseconds +=
          parseInt(parts[0]) * 60 * 1000 + // minutes
          parseInt(parts[1]) * 1000 + // seconds
          parseInt(parts[2]) * 10; // milliseconds
  } else if (parts.length === 2) {
      // Format: SS.SS
      totalMilliseconds +=
          parseInt(parts[0]) * 1000 + // seconds
          parseInt(parts[1]) * 10; // milliseconds
  } else {
      // Invalid format
      throw new Error("Invalid time format");
  }

  return totalMilliseconds;
};
export {FormatTime,timeStrToInt}