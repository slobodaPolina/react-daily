import { Badge } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectTasksByDate } from '../../stores/task.store.ts';
import { getCurrentMonthDay } from '../../utils/time.ts';
import { CalendarTask } from './CalendarTask.tsx';
import classes from './Calendar.module.scss';
import { AppDispatch } from '../../stores/app.store.ts';
import { daySelected } from '../../stores/day.store.ts';

interface CalendarTasksProps {
  day: number;
}

export function CalendarTasks({ day }: CalendarTasksProps) {
  const dispatch = useDispatch<AppDispatch>();
  const date = getCurrentMonthDay(day).toString();
  const tasks = useSelector(selectTasksByDate(date));

  const onClick = () => dispatch(daySelected(date));

  return (
    <div className={classes.contentWrapper} onClick={onClick}>
      <Badge color="deepBlue.5">{day}</Badge>
      {tasks.map((task) => (
        <CalendarTask key={task.uuid} task={task} />
      ))}
    </div>
  );
}
