import { Badge } from '@mantine/core';
import { useDispatch, useSelector } from 'react-redux';
import { CalendarTask } from './CalendarTask.tsx';
import classes from './Calendar.module.scss';
import { AppDispatch } from '../../stores/app.store.ts';
import { daySelected } from '../../stores/day.store.ts';
import { selectTasksIterationsByDay } from '../../stores/selectors.ts';

interface CalendarTasksProps {
  day: number;
}

export function CalendarTasks({ day }: CalendarTasksProps) {
  const dispatch = useDispatch<AppDispatch>();
  const tasksIterations = useSelector(selectTasksIterationsByDay(day));
  const onClick = () => dispatch(daySelected(day));

  return (
    <div className={classes.contentWrapper} onClick={onClick}>
      <Badge color="deepBlue.5">{day}</Badge>
      {tasksIterations?.map((iteration) => (
        <CalendarTask key={iteration.uuid} iteration={iteration} />
      ))}
    </div>
  );
}
