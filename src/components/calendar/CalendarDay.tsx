import classes from './Calendar.module.scss';
import { CalendarTasks } from './CalendarTasks.tsx';

interface CalendarDayProps {
  day: undefined | number;
}

export function CalendarDay({ day }: CalendarDayProps) {
  const dayContent = day ? <CalendarTasks day={day} /> : null;

  return <div className={classes.dayWrapper}>{dayContent}</div>;
}
