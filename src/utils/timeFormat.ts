export function timeFormat(timeStamp: number) {
  const { hour, minute, second } = timeParse(timeStamp);
  return `${hour}:${minute}:${second}`;
}

export function startedDadeTime(offset: number) {
  const timeStamp =
    new Date(new Date().setHours(0, 0, 0, 0)).getTime() +
    offset * 60 * 60 * 1000;
  return dateTimeFormat(timeStamp);
}

export function dateTimeFormat(timestamp: number) {
  const date = new Date(timestamp);
  const YYYY = date.getFullYear();
  const MM = fill(date.getMonth() + 1);
  const DD = fill(date.getDate());

  const hh = fill(date.getHours());
  const mm = fill(date.getMinutes());
  const ss = fill(date.getSeconds());

  return `${YYYY}-${MM}-${DD} ${hh}:${mm}:${ss}`;
}

export function timeParse(timeStamp: number) {
  if (timeStamp <= 0) {
    return { day: '00', hour: '00', minute: '00', second: '00' };
  }
  let time = Math.floor(timeStamp / 1000);
  const second = fill(time % 60);
  time = Math.floor(time / 60);
  const minute = fill(time % 60);
  time = Math.floor(time / 60);
  const hour = fill(time % 24);
  const day = fill(Math.floor(time / 24));

  return { day, hour, minute, second };
}

export function fill(num: number | string) {
  return num > 9 ? num.toString() : `0${num}`;
}
