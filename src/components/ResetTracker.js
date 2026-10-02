const RESET_HOUR_UTC = 19;

export function getNextReset(now = new Date()) {
  const nextDay = new Date(Date.UTC(
    now.getUTCFullYear(),
    now.getUTCMonth(),
    now.getUTCDate(),
    RESET_HOUR_UTC
  ));
  if (nextDay <= now) {
    nextDay.setUTCDate(nextDay.getUTCDate() + 1);
  }
  return nextDay;
}