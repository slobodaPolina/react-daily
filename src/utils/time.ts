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

const getDate = (date?: string) => (date ? new Date(date) : new Date());

export const getStartOfDateInUTC = (date?: string): Date => {
  const dateCopy = getDate(date);
  dateCopy.setHours(0);
  dateCopy.setMinutes(0);
  dateCopy.setSeconds(0);
  dateCopy.setMilliseconds(0);

  return dateCopy;
};

export const getCurrentMonthDay = (day: number) => {
  const dateCopy = getStartOfDateInUTC();
  dateCopy.setDate(day);

  return dateCopy;
};

export const equalDates = (a: string, b: string) =>
  getStartOfDateInUTC(a).toString() === getStartOfDateInUTC(b).toString();

export const equalDaysOfWeek = (a: string, b: string) =>
  getStartOfDateInUTC(a).getUTCDay() === getStartOfDateInUTC(b).getUTCDay();

export const equalDaysOfMonth = (a: string, b: string) =>
  getStartOfDateInUTC(a).getUTCDate() === getStartOfDateInUTC(b).getUTCDate();

export const formatDate = (date: string) => new Date(date).toDateString();
