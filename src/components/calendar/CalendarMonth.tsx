import { useMemo } from 'react';
import { formatWeekDay, orderedWeekDays } from '../../types/week-days.ts';
import { getCalendarDays } from '../../utils/time.ts';
import { CalendarDay } from './CalendarDay.tsx';
import classes from './Calendar.module.scss';

// for now, it is current month. In the future I plan allow switching to the next months
export function CalendarMonth() {
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
