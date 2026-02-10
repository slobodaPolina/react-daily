import { Badge } from '@mantine/core';
import { useSelector } from 'react-redux';
import { selectTasksByDay } from '../../stores/task.store.ts';
import { getCurrentMonthDay } from '../../utils/time.ts';
import { CalendarTask } from './CalendarTask.tsx';
import classes from './Calendar.module.scss';

interface CalendarTasksProps {
  day: number;
}

export function CalendarTasks({ day }: CalendarTasksProps) {
  const date = getCurrentMonthDay(day);
  const tasks = useSelector(selectTasksByDay(date));

  return (
    <div className={classes.contentWrapper}>
      <Badge color="deepBlue.5">{day}</Badge>
      {tasks.map((task) => (
        // todo proper key
        <CalendarTask key={task.name} task={task} />
      ))}
    </div>
  );
}
