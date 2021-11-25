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

export function calculatePriority(
  age: number,
  isMale: boolean,
  equal: boolean,
) {
  return `
    WHEN (sample_target.age=${age} AND sample_target.isMale=${isMale}) AND
      (sample_target_time.startAt < STR_TO_DATE(NOW(), '%Y-%m-%d %h:%i') AND 
      sample_target_time.endAt > STR_TO_DATE(NOW(), '%Y-%m-%d %h:%i')) THEN 1
  `;
}
