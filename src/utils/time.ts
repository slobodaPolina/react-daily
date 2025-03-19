import { WeekDay } from '../types/week-days.ts';

const getFirstWeekDayOfMonth = (date = new Date()): WeekDay => {
  const dateCopy = new Date(date);
  dateCopy.setDate(1);

  return dateCopy.getDay();
};

const getMonthLength = (date = new Date()): number => {
  const dateCopy = new Date(date);
  const nextMonth = dateCopy.getMonth() + 1;
  dateCopy.setMonth(nextMonth);
  dateCopy.setDate(0); // last day of previous month

  return dateCopy.getDate();
};

export const getCalendarDays = (
  orderedWeekDays: WeekDay[],
  date = new Date(),
) => {
  const monthLength = getMonthLength(date);
  const firstWeekDayOfMonth = getFirstWeekDayOfMonth(date);
  const weekLength = orderedWeekDays.length;

  const skippedDays = Math.abs(
    (weekLength + firstWeekDayOfMonth - orderedWeekDays[0]) % weekLength,
  );

  return Array.from({ length: skippedDays + monthLength }, (_, index) => {
    const day = index + 1 - skippedDays;
    return day <= 0 ? undefined : day;
  });
};
