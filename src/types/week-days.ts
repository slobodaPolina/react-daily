export enum WeekDay {
  SUNDAY,
  MONDAY,
  TUESDAY,
  WEDNESDAY,
  THURSDAY,
  FRIDAY,
  SATURDAY,
}

export const formatWeekDay = (day: WeekDay) => {
  switch (day) {
    case WeekDay.SUNDAY:
      return 'Sun';
    case WeekDay.MONDAY:
      return 'Mon';
    case WeekDay.TUESDAY:
      return 'Tue';
    case WeekDay.WEDNESDAY:
      return 'Wed';
    case WeekDay.THURSDAY:
      return 'Thu';
    case WeekDay.FRIDAY:
      return 'Fri';
    case WeekDay.SATURDAY:
      return 'Sat';
  }
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
