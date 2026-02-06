import { useMemo } from 'react';
import { formatWeekDay, orderedWeekDays } from '../../types/week-days.ts';
import { getCalendarDays } from '../../utils/time.ts';
import { CalendarDay } from './CalendarDay.tsx';
import classes from './Calendar.module.scss';

export function Calendar() {
  const weekDaysLabels = useMemo(() => orderedWeekDays.map(formatWeekDay), []);
  const days = useMemo(() => getCalendarDays(orderedWeekDays), []);

  return (
    <div className={classes.calendarWrapper}>
      {weekDaysLabels.map((label: string) => (
        <div key={label}> {label} </div>
      ))}
      {days.map((day, index) => (
        <CalendarDay day={day} key={index}></CalendarDay>
      ))}
    </div>
  );
}
