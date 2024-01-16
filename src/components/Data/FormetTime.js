export default function FormatTime (time){
    const hours = Math.floor(time / (60 * 60 * 1000));
    const minutes = Math.floor((time % (60 * 60 * 1000)) / (60 * 1000));
    const seconds = Math.floor((time % (60 * 1000)) / 1000);
    const milliseconds = Math.floor((time % 1000) / 10);

    const pad = (value) => (value < 10 ? `0${value}` : value);

    return `${hours !== 0 ? pad(hours) + ":" : ""}${
      minutes !== 0 ? pad(minutes) + ":" : ""
    }${pad(seconds)}.${pad(milliseconds)}`;
}