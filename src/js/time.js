// 230.870204 -> 03:50
export function secondsToString(seconds) {
  var date = new Date(seconds * 1000);
  return date.toISOString().substr(14, 5);
}

//03:45.00 -> 225
export function stringToSeconds(timeString) {
  var secs = parseInt(timeString.slice(0, 2)) * 60;
  secs += parseInt(timeString.slice(3, 5));
  secs += parseInt(timeString.slice(6)) / 100;
  return secs;
}