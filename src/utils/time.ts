import { WeekDay } from '../types/week-days.ts';

const getFirstWeekDayOfMonth = (date = new Date()): WeekDay => {
  const dateCopy = new Date(date);
  dateCopy.setDate(1);

  return dateCopy.getDay();
};

export const getMonthLength = (date = new Date()): number => {
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

export const getDate = (date?: string) => (date ? new Date(date) : new Date());
export const getDay = (date?: string) => getDate(date).getDate();

export const getStartOfDateInUTC = (date?: string): Date => {
  const dateCopy = getDate(date);
  dateCopy.setHours(0);
  dateCopy.setMinutes(0);
  dateCopy.setSeconds(0);
  dateCopy.setMilliseconds(0);

  return dateCopy;
};

export const getCurrentMonthDate = (day: number): Date | undefined => {
  const dateCopy = getStartOfDateInUTC();
  dateCopy.setDate(day);

  return isCurrentMonth(dateCopy) ? dateCopy : undefined;
};

export const getCurrentDay = () => getStartOfDateInUTC().getDate();

export const isCurrentMonth = (date: Date) => {
  const today = getStartOfDateInUTC();
  today.setDate(1);

  const dateCopy = new Date(date);
  dateCopy.setDate(1);

  return today.toString() === dateCopy.toString();
};

export const equalDates = (a: string, b: string) =>
  getStartOfDateInUTC(a).toString() === getStartOfDateInUTC(b).toString();

export const equalDaysOfWeek = (a: string, b: string) =>
  getStartOfDateInUTC(a).getDay() === getStartOfDateInUTC(b).getDay();

export const equalDaysOfMonth = (a: string, b: string) =>
  getStartOfDateInUTC(a).getDate() === getStartOfDateInUTC(b).getDate();

export const startingFrom = (from: string, testDate: string) =>
  getStartOfDateInUTC(from) <= getStartOfDateInUTC(testDate);

export const getCurrentMonthSameWeekdays = (startDate: string): Date[] => {
  const weekLength = 7;
  const weekday = getDate(startDate).getDay();
  const firstDay =
    ((weekLength + weekday - getFirstWeekDayOfMonth()) % weekLength) + 1;

  return [
    getCurrentMonthDate(firstDay),
    getCurrentMonthDate(firstDay + weekLength),
    getCurrentMonthDate(firstDay + 2 * weekLength),
    getCurrentMonthDate(firstDay + 3 * weekLength),
    getCurrentMonthDate(firstDay + 4 * weekLength),
  ].filter((date): date is Date => Boolean(date));
};

export const formatDate = (date: Date) => date.toDateString();
