const now = Date.now();
const Night = new Date(now).setHours(0, 0, 0, 0);
const beforeNight = new Date(Night - 1);
const midNight = new Date(Night);

export function calculateDate(startAt: Date, endAt: Date) {
  if (startAt >= endAt) {
    startAt = new Date(
      beforeNight.getTime() + startAt.getTime() + 18 * 3600 * 1000,
    );
    endAt = new Date(midNight.getTime() + endAt.getTime() + 18 * 3600 * 1000);
  } else {
    startAt = new Date(
      midNight.getTime() + startAt.getTime() + 18 * 3600 * 1000,
    );
    endAt = new Date(midNight.getTime() + endAt.getTime() + 18 * 3600 * 1000);
  }
  return { startAt, endAt };
}
