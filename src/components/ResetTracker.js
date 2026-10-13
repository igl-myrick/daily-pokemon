const utcResetHour = 19;

export function getNextReset(now = new Date()) {
  const nextDay = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    utcResetHour
  ));
  if (nextDay <= now) {
    nextDay.setUTCDate(nextDay.getUTCDate() + 1);
  }
  return nextDay;
}

export function getHoursRemaining(target) {
  const hoursInMs = Math.ceil((target - Date.now()) / 3600000);
  return hoursInMs <= 1 ? "less than 1 hour" : `${hoursInMs} hours`;
}