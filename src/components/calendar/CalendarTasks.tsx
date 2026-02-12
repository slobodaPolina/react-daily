import { Badge } from '@mantine/core';
import { useSelector } from 'react-redux';
import { selectTasksByDate } from '../../stores/task.store.ts';
import { getCurrentMonthDay } from '../../utils/time.ts';
import { CalendarTask } from './CalendarTask.tsx';
import classes from './Calendar.module.scss';

interface CalendarTasksProps {
  day: number;
}

export function CalendarTasks({ day }: CalendarTasksProps) {
  const date = getCurrentMonthDay(day).toString();
  const tasks = useSelector(selectTasksByDate(date));

  return (
    <div className={classes.contentWrapper}>
      <Badge color="deepBlue.5">{day}</Badge>
      {tasks.map((task) => (
        <CalendarTask key={task.uuid} task={task} />
      ))}
    </div>
  );
}
