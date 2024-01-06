// 230.870204 -> 03:50
export const secondsToString = (seconds: number) => {
  const date = new Date(seconds * 1000);
  return date.toISOString().substring(14, 19);
};

//03:45.00 -> 225
export const stringToSeconds = (timeString: string) => {
  let secs = parseInt(timeString.slice(0, 2)) * 60;
  secs += parseInt(timeString.slice(3, 5));
  secs += parseInt(timeString.slice(6)) / 100;
  return secs;
};