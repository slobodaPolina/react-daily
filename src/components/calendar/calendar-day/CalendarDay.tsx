import classes from '../Calendar.module.scss';

interface CalendarDayProps {
  day: undefined | number;
}

export function CalendarDay({ day }: CalendarDayProps) {
  const dayFragment = day ? (
    <span className={classes.dayNumber}>{day}</span>
  ) : null;

  return <div className={classes.dayWrapper}>{dayFragment}</div>;
}
