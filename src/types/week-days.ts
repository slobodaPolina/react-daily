export enum WeekDay {
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
}

const dayNameMap = {
  [WeekDay.SUNDAY]: 'Sun',
  [WeekDay.MONDAY]: 'Mon',
  [WeekDay.TUESDAY]: 'Tue',
  [WeekDay.WEDNESDAY]: 'Wed',
  [WeekDay.THURSDAY]: 'Thu',
  [WeekDay.FRIDAY]: 'Fri',
  [WeekDay.SATURDAY]: 'Sat',
};

export const formatWeekDay = (day: WeekDay) => {
  return dayNameMap[day];
};

export const orderedWeekDays = [
  WeekDay.MONDAY,
  WeekDay.TUESDAY,
  WeekDay.WEDNESDAY,
  WeekDay.THURSDAY,
  WeekDay.FRIDAY,
  WeekDay.SATURDAY,
  WeekDay.SUNDAY,
];
